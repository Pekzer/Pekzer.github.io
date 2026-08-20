import React, { useState } from 'react';

const SIZE = 15;

const createEmptyGrid = () =>
  Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => false));

const toggleAt = (grid, r, c) => {
  const next = grid.map((row) => [...row]);
  const cells = [
    [r, c],
    [r - 1, c],
    [r + 1, c],
    [r, c - 1],
    [r, c + 1],
  ];
  cells.forEach(([nr, nc]) => {
    if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
      next[nr][nc] = !next[nr][nc];
    }
  });
  return next;
};

// Apply random moves from the solved state so the puzzle is always solvable
const randomize = () => {
  let grid = createEmptyGrid();
  const moves = 20;
  for (let i = 0; i < moves; i += 1) {
    const r = Math.floor(Math.random() * SIZE);
    const c = Math.floor(Math.random() * SIZE);
    grid = toggleAt(grid, r, c);
  }
  return grid;
};

const LightsOutGame = () => {
  const [grid, setGrid] = useState(randomize);
  const [moves, setMoves] = useState(0);

  const isSolved = grid.every((row) => row.every((cell) => !cell));

  const handleClick = (r, c) => {
    if (isSolved) return;
    setGrid((prev) => toggleAt(prev, r, c));
    setMoves((m) => m + 1);
  };

  const reset = () => {
    setGrid(randomize());
    setMoves(0);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="inline-grid gap-[1px]"
        style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => handleClick(r, c)}
              className={`w-[16px] h-[16px] transition-colors duration-150 cursor-pointer border-0 p-0 ${
                cell
                  ? 'bg-portfolio-1 hover:bg-portfolio-2'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              aria-label={`Cell ${r}-${c}: ${cell ? 'on' : 'off'}`}
            />
          ))
        )}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <span className="text-[10px] text-gray-400 dark:text-gray-500 select-none">
          Lights Out · Moves: {moves}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-1.5">
        <button
          onClick={reset}
          className="px-3 py-1 text-xs font-medium rounded-full bg-portfolio-1 text-white hover:bg-portfolio-2 transition-colors duration-200"
        >
          New Game
        </button>
      </div>

      {isSolved && (
        <span className="text-[10px] font-medium text-portfolio-1 mt-1.5">
          Solved! 🎉 ({moves} moves)
        </span>
      )}
    </div>
  );
};

export default LightsOutGame;
