import React, { useState, useEffect, useCallback, useRef } from 'react';

const ROWS = 32;
const COLS = 32;

// Hollow Minecraft-style heart, centered within a 32×32 grid.
// Filled heart spans rows 9–23 (15 rows) and cols 7–24 (18 cols).
// Only the outline cells are alive.
const filledHeartCells = new Set();
for (let r = 9; r <= 23; r++) {
  for (let c = 7; c <= 24; c++) {
    filledHeartCells.add(`${r},${c}`);
  }
}
// Carve out the top cleft (between the two lobes)
for (let r = 9; r <= 11; r++) {
  for (let c = 15; c <= 16; c++) {
    filledHeartCells.delete(`${r},${c}`);
  }
}
// Carve out inner area to make it hollow
// The filled shape at its widest: rows 13-15 have cols 7-24 (18 wide)
// We remove everything except the outline
for (let r = 12; r <= 22; r++) {
  for (let c = 9; c <= 22; c++) {
    filledHeartCells.delete(`${r},${c}`);
  }
}
// But keep the cleft edges and inner lobe edges
// Row 10 cleft edges: 14,17
filledHeartCells.add('10,14');
filledHeartCells.add('10,17');
// Row 11 cleft bottom: 15,16
filledHeartCells.add('11,15');
filledHeartCells.add('11,16');
// Keep bottom tip fill for rows 22-23 center
for (let r = 22; r <= 23; r++) {
  for (let c = 14; c <= 17; c++) {
    filledHeartCells.add(`${r},${c}`);
  }
}
// Keep row 21 center
filledHeartCells.add('21,15');
filledHeartCells.add('21,16');

const createHeartGrid = () => {
  const grid = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => false)
  );
  for (const key of filledHeartCells) {
    const [r, c] = key.split(',').map(Number);
    grid[r][c] = true;
  }
  return grid;
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

const GameOfLife = () => {
  const [grid, setGrid] = useState(createHeartGrid);
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
    <div className="hidden lg:flex flex-col items-center mt-4">
      <div
        className="inline-grid gap-[1px]"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => handleCellClick(r, c)}
              className={`w-[7px] h-[7px] transition-colors duration-150 cursor-pointer border-0 p-0 ${
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
