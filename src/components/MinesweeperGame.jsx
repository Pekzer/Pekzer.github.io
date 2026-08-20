import React, { useState } from 'react';
import { playSfx } from '@/audio/engine';

const ROWS = 15;
const COLS = 15;

const DIFFICULTIES = [
  { key: 'easy', label: 'Easy', mines: 15 },
  { key: 'medium', label: 'Medium', mines: 30 },
  { key: 'hard', label: 'Hard', mines: 45 },
];

const NUMBER_COLORS = {
  1: 'text-blue-600',
  2: 'text-green-600',
  3: 'text-red-600',
  4: 'text-purple-700',
  5: 'text-yellow-700',
  6: 'text-teal-600',
  7: 'text-light-700 dark:text-dark-200',
  8: 'text-pink-700',
};

const createEmptyBoard = () =>
  Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
    }))
  );

const neighborsOf = (r, c) => {
  const out = [];
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) out.push({ r: nr, c: nc });
    }
  }
  return out;
};

const computeAdjacent = (board) => {
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      if (board[r][c].mine) continue;
      let count = 0;
      for (const n of neighborsOf(r, c)) {
        if (board[n.r][n.c].mine) count += 1;
      }
      board[r][c].adjacent = count;
    }
  }
};

// Places mines, keeping the 3x3 area around the first click mine-free so the
// first click is always a "0" that flood-opens a safe region.
const placeMines = (safeR, safeC, mines) => {
  const board = createEmptyBoard();
  let placed = 0;
  let guard = 0;
  while (placed < mines && guard < 50000) {
    guard += 1;
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (board[r][c].mine) continue;
    if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
    board[r][c].mine = true;
    placed += 1;
  }
  computeAdjacent(board);
  return board;
};

const floodReveal = (board, r, c) => {
  const next = board.map((row) => row.map((cell) => ({ ...cell })));
  const stack = [[r, c]];
  while (stack.length) {
    const [cr, cc] = stack.pop();
    const cell = next[cr][cc];
    if (cell.revealed || cell.flagged || cell.mine) continue;
    cell.revealed = true;
    if (cell.adjacent === 0) {
      for (const n of neighborsOf(cr, cc)) stack.push([n.r, n.c]);
    }
  }
  return next;
};

const cellKey = (r, c) => `${r},${c}`;

// Deterministic "no-guess" solver. It only uses the information a player has
// (revealed numbers + remaining mine count) to prove which cells are safe or
// mined. Returns { solvable } for a board state.
const solveLogic = (board, mines) => {
  const revealed = board.map((row) => row.map((cell) => cell.revealed));
  const flagged = board.map((row) => row.map((cell) => cell.flagged));

  const isDone = () => {
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        if (!board[r][c].mine && !revealed[r][c]) return false;
      }
    }
    return true;
  };

  const unique = (arr) => {
    const seen = new Set();
    return arr.filter(({ r, c }) => {
      const k = cellKey(r, c);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  };

  const applySafe = (m) => {
    if (!revealed[m.r][m.c] && !flagged[m.r][m.c]) revealed[m.r][m.c] = true;
  };
  const applyMine = (m) => {
    if (!revealed[m.r][m.c] && !flagged[m.r][m.c]) flagged[m.r][m.c] = true;
  };

  const MAX_FRONTIER = 13;

  while (true) {
    if (isDone()) return { solvable: true };

    let flagCount = 0;
    const hidden = [];
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        if (flagged[r][c]) flagCount += 1;
        else if (!revealed[r][c]) hidden.push({ r, c });
      }
    }

    const safeMoves = [];
    const mineMoves = [];

    // Remaining-mine-count rules.
    if (flagCount === mines) {
      hidden.forEach((h) => safeMoves.push(h));
    } else if (hidden.length === mines - flagCount) {
      hidden.forEach((h) => mineMoves.push(h));
    }

    // Per-cell constraints.
    const constraints = [];
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        if (!revealed[r][c] || board[r][c].adjacent === 0) continue;
        const unknown = [];
        let flaggedNbs = 0;
        for (const n of neighborsOf(r, c)) {
          if (revealed[n.r][n.c]) continue;
          if (flagged[n.r][n.c]) flaggedNbs += 1;
          else unknown.push(n);
        }
        if (unknown.length === 0) continue;
        const remaining = board[r][c].adjacent - flaggedNbs;
        if (remaining < 0 || remaining > unknown.length) return { solvable: false };
        constraints.push({ unknown, remaining });
        if (remaining === 0) unknown.forEach((u) => safeMoves.push(u));
        else if (remaining === unknown.length) unknown.forEach((u) => mineMoves.push(u));
      }
    }

    if (safeMoves.length || mineMoves.length) {
      unique(safeMoves).forEach(applySafe);
      unique(mineMoves).forEach(applyMine);
      continue;
    }

    // Subset reasoning between pairs of constraints.
    const subsetSafe = [];
    const subsetMines = [];
    for (let i = 0; i < constraints.length; i += 1) {
      for (let j = 0; j < constraints.length; j += 1) {
        if (i === j) continue;
        const a = constraints[i];
        const b = constraints[j];
        const aSet = new Set(a.unknown.map((u) => cellKey(u.r, u.c)));
        const bSet = new Set(b.unknown.map((u) => cellKey(u.r, u.c)));
        const isSubset = a.unknown.every((u) => bSet.has(cellKey(u.r, u.c)));
        if (!isSubset) continue;
        const extra = b.unknown.filter((u) => !aSet.has(cellKey(u.r, u.c)));
        if (extra.length === 0) continue;
        const diff = b.remaining - a.remaining;
        if (diff === 0) extra.forEach((u) => subsetSafe.push(u));
        else if (diff === extra.length) extra.forEach((u) => subsetMines.push(u));
      }
    }

    if (subsetSafe.length || subsetMines.length) {
      unique(subsetSafe).forEach(applySafe);
      unique(subsetMines).forEach(applyMine);
      continue;
    }

    // Exhaustive reasoning over the frontier when it is small enough.
    const frontierSet = new Set();
    constraints.forEach((con) =>
      con.unknown.forEach((u) => frontierSet.add(cellKey(u.r, u.c)))
    );
    const frontier = [...frontierSet].map((k) => {
      const [r, c] = k.split(',').map(Number);
      return { r, c };
    });

    if (frontier.length > 0 && frontier.length <= MAX_FRONTIER) {
      const index = new Map(frontier.map((u, i) => [cellKey(u.r, u.c), i]));
      const n = frontier.length;
      const mineInAll = new Array(n).fill(true);
      const safeInAll = new Array(n).fill(true);
      let solutions = 0;
      let capped = false;
      const limit = 1 << n;
      for (let mask = 0; mask < limit; mask += 1) {
        let ok = true;
        for (const con of constraints) {
          let cnt = 0;
          for (const u of con.unknown) {
            if (mask & (1 << index.get(cellKey(u.r, u.c)))) cnt += 1;
          }
          if (cnt !== con.remaining) {
            ok = false;
            break;
          }
        }
        if (!ok) continue;
        solutions += 1;
        for (let i = 0; i < n; i += 1) {
          if (mask & (1 << i)) safeInAll[i] = false;
          else mineInAll[i] = false;
        }
        if (solutions > 4096) {
          capped = true;
          break;
        }
      }

      if (solutions > 0 && !capped) {
        const enumSafe = [];
        const enumMines = [];
        for (let i = 0; i < n; i += 1) {
          if (safeInAll[i]) enumSafe.push(frontier[i]);
          else if (mineInAll[i]) enumMines.push(frontier[i]);
        }
        if (enumSafe.length || enumMines.length) {
          enumSafe.forEach(applySafe);
          enumMines.forEach(applyMine);
          continue;
        }
      }
    }

    return { solvable: false };
  }
};

// Regenerates mines until the board can be finished by logic alone, so the
// player is never forced to guess.
const generateSolvableBoard = (safeR, safeC, mines) => {
  const MAX_ATTEMPTS = 30;
  let board = placeMines(safeR, safeC, mines);
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    board = placeMines(safeR, safeC, mines);
    const revealed = floodReveal(board, safeR, safeC);
    if (solveLogic(revealed, mines).solvable) return board;
  }
  return board;
};

const MinesweeperGame = () => {
  const [board, setBoard] = useState(createEmptyBoard);
  const [status, setStatus] = useState('playing'); // playing | won | lost
  const [minesPlaced, setMinesPlaced] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');

  const mines = DIFFICULTIES.find((d) => d.key === difficulty).mines;

  const flagCount = board.flat().filter((c) => c.flagged).length;
  const minesLeft = mines - flagCount;

  const reset = () => {
    setBoard(createEmptyBoard());
    setStatus('playing');
    setMinesPlaced(false);
  };

  const selectDifficulty = (key) => {
    setDifficulty(key);
    setBoard(createEmptyBoard());
    setStatus('playing');
    setMinesPlaced(false);
  };

  const handleReveal = (r, c) => {
    if (status !== 'playing') return;
    let next = board;
    if (!minesPlaced) {
      next = generateSolvableBoard(r, c, mines);
      setMinesPlaced(true);
    }
    if (next[r][c].mine) {
      playSfx('gameOver');
      const lost = next.map((row) =>
        row.map((cell) => (cell.mine ? { ...cell, revealed: true } : { ...cell }))
      );
      setBoard(lost);
      setStatus('lost');
      return;
    }
    playSfx('click');
    const revealed = floodReveal(next, r, c);
    setBoard(revealed);
    const won = revealed.flat().every((cell) => cell.revealed || cell.mine);
    if (won) {
      playSfx('win');
      const flaggedAll = revealed.map((row) =>
        row.map((cell) => (cell.mine ? { ...cell, flagged: true } : cell))
      );
      setBoard(flaggedAll);
      setStatus('won');
    }
  };

  const handleFlag = (e, r, c) => {
    e.preventDefault();
    if (status !== 'playing') return;
    playSfx('flag');
    setBoard((prev) =>
      prev.map((row, ri) =>
        ri === r
          ? row.map((cell, ci) =>
              ci === c && !cell.revealed
                ? { ...cell, flagged: !cell.flagged }
                : cell
            )
          : row
      )
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="inline-grid gap-[1px]"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => {
            let content = null;
            let bg = 'bg-light-200 dark:bg-dark-700';
            if (cell.revealed) {
              bg = 'bg-light-100 dark:bg-dark-800';
              if (cell.mine) content = '💣';
              else if (cell.adjacent > 0) content = cell.adjacent;
            } else if (cell.flagged) {
              content = '🚩';
            }
            return (
              <button
                key={`${r}-${c}`}
                onClick={() => handleReveal(r, c)}
                onContextMenu={(e) => handleFlag(e, r, c)}
                className={`w-[16px] h-[16px] flex items-center justify-center text-[10px] leading-none font-bold ${bg} ${
                  cell.revealed && cell.adjacent > 0
                    ? NUMBER_COLORS[cell.adjacent]
                    : ''
                }`}
              >
                {content}
              </button>
            );
          })
        )}
      </div>

      <div className="flex items-center gap-1.5 mt-2">
        {DIFFICULTIES.map((d) => {
          const active = d.key === difficulty;
          return (
            <button
              key={d.key}
              onClick={() => selectDifficulty(d.key)}
              className={`px-2 py-1 rounded-full text-[10px] font-medium transition-colors duration-200 ${
                active
                  ? 'bg-portfolio-1 text-white'
                  : 'bg-light-200 dark:bg-dark-700 text-light-600 dark:text-dark-300 hover:bg-light-300 dark:hover:bg-dark-600'
              }`}
            >
              {d.label} · {d.mines}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <span className="text-[10px] text-light-400 dark:text-dark-500 select-none">
          Minesweeper · 💣 {minesLeft}
        </span>
      </div>

      {status !== 'playing' && (
        <div className="flex flex-col items-center gap-1.5 mt-1">
          <span className="text-[10px] font-medium text-portfolio-1">
            {status === 'won' ? 'You Win!' : 'Boom! 💥'}
          </span>
          <button
            onClick={reset}
            className="px-3 py-1 text-xs font-medium rounded-full bg-portfolio-1 text-white hover:bg-portfolio-2 transition-colors duration-200"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default MinesweeperGame;
