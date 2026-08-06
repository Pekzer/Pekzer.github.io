import React, { useState, useEffect, useCallback, useRef } from 'react';

const ROWS = 10;
const COLS = 10;

// Smiley face pattern on a 10x10 grid
//    0 1 2 3 4 5 6 7 8 9
// 0  . . . . . . . . . .
// 1  . . # # . . # # . .   ← eyes
// 2  . # . . # # . . # .
// 3  . # . . . . . . # .   ← face sides
// 4  . . # . . . . # . .
// 5  . . . # # # # . . .   ← smile
// 6  . . . . . . . . . .
// 7  . . . . . . . . . .
// 8  . . . . . . . . . .
// 9  . . . . . . . . . .
const smileyPattern = [
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, true,  true,  false, false, true,  true,  false, false],
  [false, true,  false, false, true,  true,  false, false, true,  false],
  [false, true,  false, false, false, false, false, false, true,  false],
  [false, false, true,  false, false, false, false, true,  false, false],
  [false, false, false, true,  true,  true,  true,  false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
];

const countNeighbors = (grid, row, col) => {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const r = (row + dr + ROWS) % ROWS;
      const c = (col + dc + COLS) % COLS;
      if (grid[r][c]) count++;
    }
  }
  return count;
};

const nextGeneration = (grid) => {
  return grid.map((row, r) =>
    row.map((cell, c) => {
      const neighbors = countNeighbors(grid, r, c);
      if (cell) {
        return neighbors === 2 || neighbors === 3;
      } else {
        return neighbors === 3;
      }
    })
  );
};

const GameOfLife = () => {
  const [grid, setGrid] = useState(smileyPattern);
  const [isRunning, setIsRunning] = useState(false);
  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  const step = useCallback(() => {
    setGrid((prev) => nextGeneration(prev));
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      if (runningRef.current) {
        step();
      }
    }, 350);
    return () => clearInterval(interval);
  }, [isRunning, step]);

  return (
    <div className="hidden lg:flex items-center gap-3 mt-4">
      <div
        className="inline-grid gap-[2px]"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className={`w-[14px] h-[14px] rounded-sm transition-colors duration-200 ${
                cell
                  ? 'bg-portfolio-1 dark:bg-portfolio-1'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))
        )}
      </div>

      <button
        onClick={() => setIsRunning(!isRunning)}
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
          isRunning
            ? 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            : 'bg-portfolio-1 hover:bg-portfolio-2'
        }`}
        title={isRunning ? 'Pause' : 'Start'}
        aria-label={isRunning ? 'Pause' : 'Start'}
      >
        {isRunning ? (
          <svg className="w-3.5 h-3.5 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default GameOfLife;
