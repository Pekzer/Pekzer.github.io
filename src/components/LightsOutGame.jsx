import React, { useState } from 'react';
import { playSfx } from '@/audio/engine';

const SIZE = 15;
const MODES = [1, 2, 3];

// Red intensity ramp (dim → bright). The brightest matches the site palette.
const ON_COLORS = ['#dcb0ba', '#a3485b', '#7c1427'];

const createEmptyGrid = () =>
  Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => 0));

const toggleAt = (grid, r, c, states) => {
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
      next[nr][nc] = (next[nr][nc] + 1) % states;
    }
  });
  return next;
};

// Generate a solvable board by applying random moves from the solved state.
// Move count scales with the board size so patterns are denser/more complex.
const randomize = (states) => {
  const total = SIZE * SIZE;
  const moveCount = Math.floor(total * 0.25);
  const minLit = Math.floor(total * 0.15);
  let grid;
  let lit;
  do {
    grid = createEmptyGrid();
    for (let i = 0; i < moveCount; i += 1) {
      const r = Math.floor(Math.random() * SIZE);
      const c = Math.floor(Math.random() * SIZE);
      grid = toggleAt(grid, r, c, states);
    }
    lit = grid.flat().filter((v) => v !== 0).length;
  } while (lit < minLit);
  return grid;
};

const colorForValue = (value, mode) => ON_COLORS[value - 1 + (3 - mode)];

const LightsOutGame = () => {
  const [mode, setMode] = useState(1);
  const [grid, setGrid] = useState(() => randomize(2));
  const [moves, setMoves] = useState(0);

  const states = mode + 1;
  const isSolved = grid.every((row) => row.every((cell) => cell === 0));

  const handleClick = (r, c) => {
    if (isSolved) return;
    const next = toggleAt(grid, r, c, states);
    setGrid(next);
    setMoves((m) => m + 1);
    playSfx('click');
    if (next.every((row) => row.every((v) => v === 0))) {
      playSfx('win');
    }
  };

  const reset = () => {
    setGrid(randomize(states));
    setMoves(0);
    playSfx('click');
  };

  const changeMode = (m) => {
    setMode(m);
    setGrid(randomize(m + 1));
    setMoves(0);
    playSfx('click');
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
                cell > 0
                  ? ''
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              style={cell > 0 ? { backgroundColor: colorForValue(cell, mode) } : undefined}
              aria-label={`Cell ${r}-${c}: level ${cell}`}
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
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => changeMode(m)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
              mode === m
                ? 'bg-portfolio-1 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Mod {m}
          </button>
        ))}
        <button
          onClick={reset}
          className="px-3 py-1 text-xs font-medium rounded-full bg-portfolio-1 text-white hover:bg-portfolio-2 transition-colors duration-200"
        >
          New Game
        </button>
      </div>

      {isSolved && (
        <span className="text-[10px] font-medium text-portfolio-1 mt-1.5">
          Solved! ({moves} moves)
        </span>
      )}
    </div>
  );
};

export default LightsOutGame;
