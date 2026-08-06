import React, { useState, useEffect, useCallback, useRef } from 'react';

const ROWS = 10;
const COLS = 10;

const createEmptyGrid = () =>
  Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => false));

const randomGrid = () =>
  Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => Math.random() > 0.7)
  );

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
  const [grid, setGrid] = useState(randomGrid);
  const [isRunning, setIsRunning] = useState(true);
  const [generation, setGeneration] = useState(0);
  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  const step = useCallback(() => {
    setGrid((prev) => nextGeneration(prev));
    setGeneration((prev) => prev + 1);
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

  const resetRandom = () => {
    setGrid(randomGrid());
    setGeneration(0);
  };

  const clearGrid = () => {
    setGrid(createEmptyGrid());
    setGeneration(0);
  };

  return (
    <div className="hidden lg:block mt-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Game of Life
        </h4>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
          Gen: {generation}
        </span>
      </div>

      <div className="flex justify-center mb-3">
        <div
          className="inline-grid gap-[2px]"
          style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                className={`w-6 h-6 rounded-sm transition-all duration-150 cursor-pointer border border-gray-300 dark:border-gray-600 ${
                  cell
                    ? 'bg-gradient-to-br from-portfolio-1 to-portfolio-2 shadow-sm scale-100'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                title={`Cell (${r},${c})`}
                aria-label={`Cell ${r},${c}: ${cell ? 'alive' : 'dead'}`}
              />
            ))
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
            isRunning
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              : 'bg-portfolio-1 text-white hover:bg-portfolio-2 shadow-md'
          }`}
        >
          {isRunning ? '⏸ Pause' : '▶ Play'}
        </button>
        <button
          onClick={step}
          disabled={isRunning}
          className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⏭ Step
        </button>
        <button
          onClick={resetRandom}
          className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
        >
          🎲 Random
        </button>
        <button
          onClick={clearGrid}
          className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
        >
          🗑 Clear
        </button>
      </div>

      <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center mt-2 leading-tight">
        Click cells to toggle · Toroidal universe
      </p>
    </div>
  );
};

export default GameOfLife;
