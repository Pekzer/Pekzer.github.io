import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { playSfx } from '@/audio/engine';
import useMediaQuery from '@/hooks/useMediaQuery';

const ROWS = 15;
const COLS = 15;

// Heart outline pattern for 15×15
const heartPattern = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
  [0,0,0,1,0,0,1,1,1,0,0,1,0,0,0],
  [0,0,1,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,1,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
  [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

const createHeartGrid = () => {
  return heartPattern.map((row) => row.map((cell) => cell === 1));
};

const createEmptyGrid = () =>
  Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => false));

// Pattern 1 — centered 5×3 in 15×15
// 010
// 010
// 101
// 010
// 010
const pattern1 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

// Pattern 2 — centered 4×5 in 15×15
// 10001
// 01010
// 00100
// 01110
const pattern2 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

// Pattern 3 — centered 4×7 in 15×15
// 0001000
// 0001000
// 1100011
// 0010100
const pattern3 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
  [0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
];

const createPattern1Grid = () => {
  return pattern1.map((row) => row.map((cell) => cell === 1));
};

const createPattern2Grid = () => {
  return pattern2.map((row) => row.map((cell) => cell === 1));
};

const createPattern3Grid = () => {
  return pattern3.map((row) => row.map((cell) => cell === 1));
};

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

// Memoized cell to avoid re-rendering unchanged cells
const Cell = memo(({ alive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-[16px] h-[16px] transition-colors duration-150 cursor-pointer border-0 p-0 ${
      alive
        ? 'bg-portfolio-1 hover:bg-portfolio-2'
        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
    }`}
    aria-label={`Cell: ${alive ? 'alive' : 'dead'}`}
  />
));

Cell.displayName = 'Cell';

const GameOfLife = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [grid, setGrid] = useState(createHeartGrid);
  const [isRunning, setIsRunning] = useState(false);
  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  const step = useCallback(() => {
    setGrid((prev) => nextGeneration(prev));
  }, []);

  useEffect(() => {
    // Only run simulation on desktop
    if (!isRunning || !isDesktop) return;
    const interval = setInterval(() => {
      if (runningRef.current) {
        step();
      }
    }, 350);
    return () => clearInterval(interval);
  }, [isRunning, step, isDesktop]);

  // Don't render anything on mobile — save CPU/battery
  if (!isDesktop) return null;

  const handleCellClick = (r, c) => {
    playSfx('click');
    setGrid((prev) => {
      const newGrid = prev.map((row) => [...row]);
      newGrid[r][c] = !newGrid[r][c];
      return newGrid;
    });
  };

  const clearGrid = () => {
    setGrid(createEmptyGrid());
    setIsRunning(false);
  };

  const resetToHeart = () => {
    setGrid(createHeartGrid());
    setIsRunning(false);
  };

  const resetToPattern1 = () => {
    setGrid(createPattern1Grid());
    setIsRunning(false);
  };

  const resetToPattern2 = () => {
    setGrid(createPattern2Grid());
    setIsRunning(false);
  };

  const resetToPattern3 = () => {
    setGrid(createPattern3Grid());
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="inline-grid gap-[1px]"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <Cell
              key={`${r}-${c}`}
              alive={cell}
              onClick={() => handleCellClick(r, c)}
            />
          ))
        )}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 ${
            isRunning
              ? 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              : 'bg-portfolio-1 hover:bg-portfolio-2'
          }`}
          title={isRunning ? 'Pause' : 'Start'}
          aria-label={isRunning ? 'Pause' : 'Start'}
        >
          {isRunning ? (
            <svg className="w-3 h-3 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>
        <span className="text-[10px] text-gray-400 dark:text-gray-500 select-none">Game of Life</span>
        <button
          onClick={clearGrid}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
          title="Clear"
          aria-label="Clear grid"
        >
          <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-2 mt-1.5">
        <button
          onClick={resetToHeart}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-portfolio-1/15 hover:bg-portfolio-1/30 dark:hover:bg-portfolio-1/30 transition-all duration-200"
          title="Heart"
          aria-label="Heart pattern"
        >
          <svg className="w-3 h-3 text-portfolio-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
        <button
          onClick={resetToPattern1}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
          title="Pattern 1"
          aria-label="Pattern 1"
        >
          <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <rect x="8" y="4" width="2" height="16" rx="1"/>
            <rect x="14" y="4" width="2" height="16" rx="1"/>
          </svg>
        </button>
        <button
          onClick={resetToPattern2}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
          title="Pattern 2"
          aria-label="Pattern 2"
        >
          <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="8" cy="8" r="2"/>
            <circle cx="16" cy="8" r="2"/>
            <circle cx="12" cy="16" r="2"/>
          </svg>
        </button>
        <button
          onClick={resetToPattern3}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
          title="Pattern 3"
          aria-label="Pattern 3"
        >
          <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <rect x="4" y="6" width="4" height="4" rx="0.5"/>
            <rect x="16" y="6" width="4" height="4" rx="0.5"/>
            <rect x="10" y="14" width="4" height="4" rx="0.5"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GameOfLife;
