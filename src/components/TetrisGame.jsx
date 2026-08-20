import React, { useState, useEffect, useRef } from 'react';
import { playSfx } from '@/audio/engine';

const ROWS = 15;
const COLS = 10;

// Classic Tetris piece colors — intentionally not tied to the site palette
const SHAPES = [
  { color: '#22d3ee', matrix: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]] }, // I
  { color: '#facc15', matrix: [[1, 1], [1, 1]] }, // O
  { color: '#a855f7', matrix: [[0, 1, 0], [1, 1, 1], [0, 0, 0]] }, // T
  { color: '#4ade80', matrix: [[0, 1, 1], [1, 1, 0], [0, 0, 0]] }, // S
  { color: '#ef4444', matrix: [[1, 1, 0], [0, 1, 1], [0, 0, 0]] }, // Z
  { color: '#3b82f6', matrix: [[1, 0, 0], [1, 1, 1], [0, 0, 0]] }, // J
  { color: '#f97316', matrix: [[0, 0, 1], [1, 1, 1], [0, 0, 0]] }, // L
];

const createBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(0));

const randomPiece = () => SHAPES[Math.floor(Math.random() * SHAPES.length)];

const rotate = (matrix) =>
  matrix[0].map((_, i) => matrix.map((row) => row[i]).reverse());

const collides = (board, matrix, row, col) => {
  for (let r = 0; r < matrix.length; r += 1) {
    for (let c = 0; c < matrix[r].length; c += 1) {
      if (!matrix[r][c]) continue;
      const nr = row + r;
      const nc = col + c;
      if (nc < 0 || nc >= COLS || nr >= ROWS) return true;
      if (nr >= 0 && board[nr][nc]) return true;
    }
  }
  return false;
};

const mergePiece = (board, matrix, row, col, color) => {
  const next = board.map((r) => [...r]);
  for (let r = 0; r < matrix.length; r += 1) {
    for (let c = 0; c < matrix[r].length; c += 1) {
      if (!matrix[r][c]) continue;
      const nr = row + r;
      const nc = col + c;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        next[nr][nc] = color;
      }
    }
  }
  return next;
};

const clearLines = (board) => {
  const remaining = board.filter((row) => row.some((cell) => !cell));
  const cleared = ROWS - remaining.length;
  const newRows = Array.from({ length: cleared }, () => Array(COLS).fill(0));
  return { board: [...newRows, ...remaining], cleared };
};

const TetrisGame = () => {
  const [status, setStatus] = useState('idle'); // idle | running | paused | over
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [, setTick] = useState(0);

  const boardRef = useRef(createBoard());
  const pieceRef = useRef(null);
  const nextRef = useRef(randomPiece());
  const scoreRef = useRef(0);
  const linesRef = useRef(0);

  const level = Math.floor(lines / 10);

  const spawnPiece = () => {
    const next = nextRef.current;
    const col = Math.floor((COLS - next.matrix[0].length) / 2);
    const piece = { matrix: next.matrix, color: next.color, row: 0, col };
    nextRef.current = randomPiece();
    if (collides(boardRef.current, piece.matrix, piece.row, piece.col)) {
      playSfx('gameOver');
      pieceRef.current = null;
      setStatus('over');
    } else {
      pieceRef.current = piece;
    }
  };

  const lockPiece = () => {
    const piece = pieceRef.current;
    if (!piece) return;
    const merged = mergePiece(
      boardRef.current,
      piece.matrix,
      piece.row,
      piece.col,
      piece.color
    );
    const { board, cleared } = clearLines(merged);
    boardRef.current = board;
    if (cleared > 0) {
      linesRef.current += cleared;
      scoreRef.current += cleared * 100 * (Math.floor(linesRef.current / 10) + 1);
      setLines(linesRef.current);
      setScore(scoreRef.current);
      playSfx('clear');
    } else {
      playSfx('lock');
    }
    spawnPiece();
    setTick((t) => t + 1);
  };

  const move = (dc) => {
    const piece = pieceRef.current;
    if (!piece) return;
    if (!collides(boardRef.current, piece.matrix, piece.row, piece.col + dc)) {
      pieceRef.current = { ...piece, col: piece.col + dc };
      playSfx('move');
      setTick((t) => t + 1);
    }
  };

  const rotatePiece = () => {
    const piece = pieceRef.current;
    if (!piece) return;
    const matrix = rotate(piece.matrix);
    if (!collides(boardRef.current, matrix, piece.row, piece.col)) {
      pieceRef.current = { ...piece, matrix };
      playSfx('rotate');
      setTick((t) => t + 1);
    }
  };

  const softDrop = () => {
    const piece = pieceRef.current;
    if (!piece) return;
    if (!collides(boardRef.current, piece.matrix, piece.row + 1, piece.col)) {
      pieceRef.current = { ...piece, row: piece.row + 1 };
      setTick((t) => t + 1);
    } else {
      lockPiece();
    }
  };

  const hardDrop = () => {
    const piece = pieceRef.current;
    if (!piece) return;
    let row = piece.row;
    while (!collides(boardRef.current, piece.matrix, row + 1, piece.col)) {
      row += 1;
    }
    pieceRef.current = { ...piece, row };
    setTick((t) => t + 1);
    lockPiece();
  };

  const reset = () => {
    boardRef.current = createBoard();
    pieceRef.current = null;
    nextRef.current = randomPiece();
    scoreRef.current = 0;
    linesRef.current = 0;
    setScore(0);
    setLines(0);
    setTick((t) => t + 1);
  };

  const start = () => {
    if (status === 'over') reset();
    if (!pieceRef.current) spawnPiece();
    playSfx('click');
    setStatus('running');
  };

  const togglePause = () => {
    playSfx('click');
    setStatus((s) => (s === 'running' ? 'paused' : 'running'));
  };

  useEffect(() => {
    if (status !== 'running') return;
    const speed = Math.max(110, 480 - level * 45);
    const interval = setInterval(() => {
      const piece = pieceRef.current;
      if (!piece) return;
      if (!collides(boardRef.current, piece.matrix, piece.row + 1, piece.col)) {
        pieceRef.current = { ...piece, row: piece.row + 1 };
      } else {
        lockPiece();
      }
      setTick((t) => t + 1);
    }, speed);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, level]);

  useEffect(() => {
    if (status !== 'running' && status !== 'paused') return;
    const handler = (e) => {
      if (e.key === 'p' || e.key === 'P') {
        setStatus((s) => (s === 'running' ? 'paused' : 'running'));
        return;
      }
      if (status !== 'running') return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        move(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        move(1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        softDrop();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        rotatePiece();
      } else if (e.key === ' ') {
        e.preventDefault();
        hardDrop();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const board = boardRef.current;
  const piece = pieceRef.current;
  const next = nextRef.current;
  const previewRows = next.matrix.length;
  const previewCols = next.matrix[0].length;
  const previewRowOffset = Math.floor((4 - previewRows) / 2);
  const previewColOffset = Math.floor((4 - previewCols) / 2);

  const display = board.map((row) => [...row]);
  if (piece) {
    for (let r = 0; r < piece.matrix.length; r += 1) {
      for (let c = 0; c < piece.matrix[r].length; c += 1) {
        if (piece.matrix[r][c]) {
          const nr = piece.row + r;
          const nc = piece.col + c;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
            display[nr][nc] = piece.color;
          }
        }
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-start gap-4">
        <div
          className="inline-grid gap-[1px]"
          style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
        >
          {display.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className="w-[16px] h-[16px] bg-gray-200 dark:bg-gray-700"
                style={cell ? { backgroundColor: cell } : undefined}
              />
            ))
          )}
        </div>

        <div className="flex flex-col gap-1 text-[10px] text-gray-500 dark:text-gray-400 select-none">
          <span>
            Score:{' '}
            <span className="font-medium text-gray-700 dark:text-gray-200">{score}</span>
          </span>
          <span>Lines: {lines}</span>
          <span>Level: {level}</span>
          <span className="mt-1">Next:</span>
          <div
            className="inline-grid gap-[1px]"
            style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
          >
            {Array.from({ length: 4 }).map((_, r) =>
              Array.from({ length: 4 }).map((_, c) => {
                const pr = r - previewRowOffset;
                const pc = c - previewColOffset;
                const filled =
                  pr >= 0 &&
                  pr < previewRows &&
                  pc >= 0 &&
                  pc < previewCols &&
                  next.matrix[pr][pc];
                return (
                  <div
                    key={`${r}-${c}`}
                    className="w-3 h-3 bg-gray-200 dark:bg-gray-700"
                    style={filled ? { backgroundColor: next.color } : undefined}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400 dark:text-gray-500 select-none">
        ← → move · ↑ rotate · ↓ drop · Space hard drop · P pause
      </div>

      <div className="flex items-center gap-2 mt-1.5">
        <button
          onClick={() => {
            if (status === 'running' || status === 'paused') togglePause();
            else start();
          }}
          className="px-3 py-1 text-xs font-medium rounded-full bg-portfolio-1 text-white hover:bg-portfolio-2 transition-colors duration-200"
        >
          {status === 'idle'
            ? 'Start'
            : status === 'running'
            ? 'Pause'
            : status === 'paused'
            ? 'Resume'
            : 'Restart'}
        </button>
      </div>

      {status === 'over' && (
        <span className="text-[10px] font-medium text-portfolio-1 mt-1.5">
          Game Over · Score: {score}
        </span>
      )}
    </div>
  );
};

export default TetrisGame;
