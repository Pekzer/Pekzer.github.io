import React, { useState, useEffect, useCallback, useRef } from 'react';

const ROWS = 16;
const COLS = 16;

// Heart pattern on a 16x16 grid
//    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5
// 0  . . . . . . . . . . . . . . . .
// 1  . . . # # . . . . . # # . . . .
// 2  . . # # # # . . . . # # # # . .
// 3  . . # # # # . . . . # # # # . .
// 4  . . . # # # . . . . # # # . . .
// 5  . . . . # # # . . # # # . . . .
// 6  . . . . . # # # # # # . . . . .
// 7  . . . . . . # # # # . . . . . .
// 8  . . . . . . . # # . . . . . . .
// 9  . . . . . . . . . . . . . . . .
const heartPattern = [
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, true,  true,  false, false, false, false, false, true,  true,  false, false, false, false],
  [false, false, true,  true,  true,  true,  false, false, false, false, true,  true,  true,  true,  false, false],
  [false, false, true,  true,  true,  true,  false, false, false, false, true,  true,  true,  true,  false, false],
  [false, false, false, true,  true,  true,  false, false, false, false, true,  true,  true,  false, false, false],
  [false, false, false, false, true,  true,  true,  false, false, true,  true,  true,  false, false, false, false],
  [false, false, false, false, false, true,  true,  true,  true,  true,  true,  false, false, false, false, false],
  [false, false, false, false, false, false, true,  true,  true,  true,  false, false, false, false, false, false],
  [false, false, false, false, false, false, false, true,  true,  false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
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
  const [grid, setGrid] = useState(heartPattern);
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

  const handleCellClick = (r, c) => {
    setGrid((prev) => {
      const newGrid = prev.map((row) => [...row]);
      newGrid[r][c] = !newGrid[r][c];
      return newGrid;
    });
  };

  return (
    <div className="hidden lg:block mt-4">
      <div
        className="inline-grid gap-[1px]"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => handleCellClick(r, c)}
              className={`w-[10px] h-[10px] rounded-sm transition-colors duration-150 cursor-pointer border-0 p-0 ${
                cell
                  ? 'bg-portfolio-1 hover:bg-portfolio-2'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              aria-label={`Cell ${r},${c}: ${cell ? 'alive' : 'dead'}`}
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
      </div>
    </div>
  );
};

export default GameOfLife;
