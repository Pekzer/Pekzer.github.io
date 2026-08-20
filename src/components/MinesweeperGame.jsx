import React, { useState } from 'react';

const ROWS = 15;
const COLS = 15;
const MINES = 30;

const NUMBER_COLORS = {
  1: 'text-blue-600',
  2: 'text-green-600',
  3: 'text-red-600',
  4: 'text-purple-700',
  5: 'text-yellow-700',
  6: 'text-teal-600',
  7: 'text-gray-700 dark:text-gray-200',
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

const placeMines = (board, safeR, safeC) => {
  const next = board.map((row) => row.map((cell) => ({ ...cell })));
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (next[r][c].mine || (r === safeR && c === safeC)) continue;
    next[r][c].mine = true;
    placed += 1;
  }
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      if (next[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr += 1) {
        for (let dc = -1; dc <= 1; dc += 1) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && next[nr][nc].mine
          ) {
            count += 1;
          }
        }
      }
      next[r][c].adjacent = count;
    }
  }
  return next;
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
      for (let dr = -1; dr <= 1; dr += 1) {
        for (let dc = -1; dc <= 1; dc += 1) {
          if (dr === 0 && dc === 0) continue;
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
            stack.push([nr, nc]);
          }
        }
      }
    }
  }
  return next;
};

const MinesweeperGame = () => {
  const [board, setBoard] = useState(createEmptyBoard);
  const [status, setStatus] = useState('playing'); // playing | won | lost
  const [minesPlaced, setMinesPlaced] = useState(false);

  const flagCount = board.flat().filter((c) => c.flagged).length;
  const minesLeft = MINES - flagCount;

  const reset = () => {
    setBoard(createEmptyBoard());
    setStatus('playing');
    setMinesPlaced(false);
  };

  const handleReveal = (r, c) => {
    if (status !== 'playing') return;
    let next = board;
    if (!minesPlaced) {
      next = placeMines(board, r, c);
      setMinesPlaced(true);
    }
    if (next[r][c].mine) {
      const lost = next.map((row) =>
        row.map((cell) => (cell.mine ? { ...cell, revealed: true } : { ...cell }))
      );
      setBoard(lost);
      setStatus('lost');
      return;
    }
    const revealed = floodReveal(next, r, c);
    setBoard(revealed);
    const won = revealed.flat().every((cell) => cell.revealed || cell.mine);
    if (won) {
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
            let bg = 'bg-gray-200 dark:bg-gray-700';
            if (cell.revealed) {
              bg = 'bg-gray-100 dark:bg-gray-800';
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

      <div className="flex items-center gap-2 mt-2">
        <span className="text-[10px] text-gray-400 dark:text-gray-500 select-none">
          Minesweeper · 💣 {minesLeft}
        </span>
      </div>

      {status !== 'playing' && (
        <div className="flex flex-col items-center gap-1.5 mt-1">
          <span className="text-[10px] font-medium text-portfolio-1">
            {status === 'won' ? 'You Win! 🎉' : 'Boom! 💥'}
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
