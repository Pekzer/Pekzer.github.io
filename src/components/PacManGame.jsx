import React, { useState, useEffect, useRef, useCallback } from 'react';

const SIZE = 15;
const TICK_MS = 220;

const MAZE = [
  '###############',
  '#.....#...#...#',
  '#.###.#.#.#.#.#',
  '#.#.....#...#.#',
  '#.#.#####.###.#',
  '#.#...#...#...#',
  '#.###.#.#.###.#',
  '#.....#.#.....#',
  '#.###.#.#.###.#',
  '#.#...#...#...#',
  '#.#.#####.###.#',
  '#.#.....#...#.#',
  '#.###.#.#.#.#.#',
  '#.....#...#...#',
  '###############',
];

const DIRS = [
  { r: -1, c: 0 },
  { r: 1, c: 0 },
  { r: 0, c: -1 },
  { r: 0, c: 1 },
];

const validDirs = (r, c) =>
  DIRS.filter((d) => {
    const nr = r + d.r;
    const nc = c + d.c;
    return (
      nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && MAZE[nr][nc] !== '#'
    );
  });

const moveGhost = (g, pac) => {
  const options = validDirs(g.r, g.c);
  const reverse = { r: -g.dir.r, c: -g.dir.c };
  let choices = options.filter((d) => !(d.r === reverse.r && d.c === reverse.c));
  if (choices.length === 0) choices = options;

  let pick;
  if (Math.random() < 0.45) {
    pick = [...choices].sort((a, b) => {
      const da = Math.abs(g.r + a.r - pac.r) + Math.abs(g.c + a.c - pac.c);
      const db = Math.abs(g.r + b.r - pac.r) + Math.abs(g.c + b.c - pac.c);
      return da - db;
    })[0];
  } else {
    pick = choices[Math.floor(Math.random() * choices.length)];
  }

  return { r: g.r + pick.r, c: g.c + pick.c, dir: pick };
};

const PacManGame = () => {
  const [status, setStatus] = useState('idle'); // idle | running | over | won
  const [score, setScore] = useState(0);
  const [, setTick] = useState(0);

  const dotsRef = useRef(MAZE.map((row) => row.split('').map((c) => c === '.')));
  const totalDotsRef = useRef(
    MAZE.reduce(
      (acc, row) => acc + row.split('').filter((c) => c === '.').length,
      0
    )
  );
  const pacRef = useRef({ r: 1, c: 1 });
  const dirRef = useRef({ r: 0, c: 1 });
  const dirQueueRef = useRef([]);
  const ghostsRef = useRef([
    { r: 7, c: 5, dir: { r: 0, c: -1 } },
    { r: 7, c: 9, dir: { r: 0, c: 1 } },
  ]);
  const scoreRef = useRef(0);

  const changeDirection = useCallback((d) => {
    const current = dirRef.current;
    if (d.r === -current.r && d.c === -current.c) return;
    const q = dirQueueRef.current;
    const last = q[q.length - 1] || current;
    if (d.r === -last.r && d.c === -last.c) return;
    q.push(d);
    if (q.length > 2) q.shift();
  }, []);

  const reset = () => {
    dotsRef.current = MAZE.map((row) => row.split('').map((c) => c === '.'));
    pacRef.current = { r: 1, c: 1 };
    dirRef.current = { r: 0, c: 1 };
    dirQueueRef.current = [];
    ghostsRef.current = [
      { r: 7, c: 5, dir: { r: 0, c: -1 } },
      { r: 7, c: 9, dir: { r: 0, c: 1 } },
    ];
    scoreRef.current = 0;
    setScore(0);
    setTick((t) => t + 1);
  };

  const start = () => {
    if (status === 'over' || status === 'won') reset();
    setStatus('running');
  };

  useEffect(() => {
    if (status !== 'running') return;
    const interval = setInterval(() => {
      if (dirQueueRef.current.length) {
        dirRef.current = dirQueueRef.current.shift();
      }
      const pac = pacRef.current;
      const dir = dirRef.current;
      const nr = pac.r + dir.r;
      const nc = pac.c + dir.c;

      if (MAZE[nr][nc] !== '#') {
        pacRef.current = { r: nr, c: nc };
        if (dotsRef.current[nr][nc]) {
          dotsRef.current[nr][nc] = false;
          scoreRef.current += 10;
          setScore(scoreRef.current);
          if (scoreRef.current / 10 >= totalDotsRef.current) {
            setStatus('won');
            setTick((t) => t + 1);
            return;
          }
        }
      }

      ghostsRef.current = ghostsRef.current.map((g) =>
        moveGhost(g, pacRef.current)
      );

      const hit = ghostsRef.current.some(
        (g) => g.r === pacRef.current.r && g.c === pacRef.current.c
      );
      if (hit) {
        setStatus('over');
      }

      setTick((t) => t + 1);
    }, TICK_MS);
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status !== 'running') return;
    const handler = (e) => {
      let d = null;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') d = { r: -1, c: 0 };
      else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') d = { r: 1, c: 0 };
      else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') d = { r: 0, c: -1 };
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') d = { r: 0, c: 1 };
      if (d) {
        e.preventDefault();
        changeDirection(d);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [status, changeDirection]);

  const pac = pacRef.current;
  const ghosts = ghostsRef.current;
  const dots = dotsRef.current;

  return (
    <div className="flex flex-col items-center">
      <div
        className="inline-grid gap-[1px]"
        style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}
      >
        {Array.from({ length: SIZE }).map((_, r) =>
          Array.from({ length: SIZE }).map((_, c) => {
            const ch = MAZE[r][c];
            if (ch === '#') {
              return (
                <div
                  key={`${r}-${c}`}
                  className="w-[16px] h-[16px] bg-gray-500 dark:bg-gray-600"
                />
              );
            }
            const isPac = pac.r === r && pac.c === c;
            const ghostIndex = ghosts.findIndex((g) => g.r === r && g.c === c);
            const hasDot = dots[r][c];
            return (
              <div
                key={`${r}-${c}`}
                className="w-[16px] h-[16px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
              >
                {isPac ? (
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                ) : ghostIndex !== -1 ? (
                  <div
                    className={`w-3 h-3 rounded-t-full ${
                      ghostIndex === 0 ? 'bg-portfolio-1' : 'bg-blue-800'
                    }`}
                  />
                ) : hasDot ? (
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-300" />
                ) : null}
              </div>
            );
          })
        )}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <span className="text-[10px] text-gray-400 dark:text-gray-500 select-none">
          Pac-Man · Score: {score}
        </span>
      </div>

      {(status === 'idle' || status === 'over' || status === 'won') && (
        <div className="flex flex-col items-center gap-1.5 mt-1">
          {status !== 'idle' && (
            <span className="text-[10px] font-medium text-portfolio-1">
              {status === 'won' ? 'You Win! 🎉' : 'Game Over · Score: ' + score}
            </span>
          )}
          <button
            onClick={start}
            className="px-3 py-1 text-xs font-medium rounded-full bg-portfolio-1 text-white hover:bg-portfolio-2 transition-colors duration-200"
          >
            {status === 'idle' ? 'Start' : 'Restart'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PacManGame;
