import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playSfx } from '@/audio/engine';

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
  const queuedDirRef = useRef(null);
  const ghostsRef = useRef([
    { r: 7, c: 5, dir: { r: 0, c: -1 } },
    { r: 7, c: 9, dir: { r: 0, c: 1 } },
  ]);
  const scoreRef = useRef(0);
  const dotsEatenRef = useRef(0);
  const cherryRef = useRef(null);
  const powerRef = useRef(0);

  const freeCells = () => {
    const pac = pacRef.current;
    const ghosts = ghostsRef.current;
    const cells = [];
    for (let r = 0; r < SIZE; r += 1) {
      for (let c = 0; c < SIZE; c += 1) {
        if (MAZE[r][c] === '#') continue;
        if (pac.r === r && pac.c === c) continue;
        if (ghosts.some((g) => g.r === r && g.c === c)) continue;
        cells.push({ r, c });
      }
    }
    return cells;
  };

  const changeDirection = useCallback((d) => {
    const pac = pacRef.current;
    const nr = pac.r + d.r;
    const nc = pac.c + d.c;
    if (
      nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && MAZE[nr][nc] !== '#'
    ) {
      dirRef.current = d;
      queuedDirRef.current = null;
    } else {
      queuedDirRef.current = d;
    }
  }, []);

  const spawnCherry = () => {
    const free = freeCells();
    if (free.length === 0) return;
    const cell = free[Math.floor(Math.random() * free.length)];
    cherryRef.current = { r: cell.r, c: cell.c, ttl: 35 };
  };

  const reset = () => {
    dotsRef.current = MAZE.map((row) => row.split('').map((c) => c === '.'));
    pacRef.current = { r: 1, c: 1 };
    dirRef.current = { r: 0, c: 1 };
    queuedDirRef.current = null;
    ghostsRef.current = [
      { r: 7, c: 5, dir: { r: 0, c: -1 } },
      { r: 7, c: 9, dir: { r: 0, c: 1 } },
    ];
    scoreRef.current = 0;
    dotsEatenRef.current = 0;
    cherryRef.current = null;
    powerRef.current = 0;
    setScore(0);
    setTick((t) => t + 1);
  };

  const start = () => {
    if (status === 'over' || status === 'won') reset();
    playSfx('click');
    setStatus('running');
  };

  useEffect(() => {
    if (status !== 'running') return;
    const interval = setInterval(() => {
      const pac = pacRef.current;
      const pacPrev = { r: pac.r, c: pac.c };

      // Apply a buffered turn as soon as it becomes possible
      const queued = queuedDirRef.current;
      if (queued) {
        const qr = pac.r + queued.r;
        const qc = pac.c + queued.c;
        if (
          qr >= 0 && qr < SIZE && qc >= 0 && qc < SIZE && MAZE[qr][qc] !== '#'
        ) {
          dirRef.current = queued;
          queuedDirRef.current = null;
        }
      }

      const dir = dirRef.current;
      const nr = pac.r + dir.r;
      const nc = pac.c + dir.c;

      if (MAZE[nr][nc] !== '#') {
        pacRef.current = { r: nr, c: nc };
        if (dotsRef.current[nr][nc]) {
          dotsRef.current[nr][nc] = false;
          dotsEatenRef.current += 1;
          scoreRef.current += 10;
          setScore(scoreRef.current);
          playSfx('dot');
          if (dotsEatenRef.current >= totalDotsRef.current) {
            playSfx('win');
            setStatus('won');
            setTick((t) => t + 1);
            return;
          }
          if (dotsEatenRef.current % 10 === 0 && !cherryRef.current) {
            spawnCherry();
          }
        }

        const cherry = cherryRef.current;
        if (cherry && cherry.r === nr && cherry.c === nc) {
          playSfx('power');
          scoreRef.current += 100;
          setScore(scoreRef.current);
          cherryRef.current = null;
          powerRef.current = 40;
        }
      }

      if (cherryRef.current) {
        cherryRef.current.ttl -= 1;
        if (cherryRef.current.ttl <= 0) cherryRef.current = null;
      }

      if (powerRef.current > 0) {
        powerRef.current -= 1;
      }

      // Move ghosts, tracking previous positions to detect crossings
      const pacNow = pacRef.current;
      const finalGhosts = [];
      let hit = false;

      ghostsRef.current.forEach((g) => {
        const prev = { r: g.r, c: g.c };
        const next = moveGhost(g, pacNow);
        const sameCell = next.r === pacNow.r && next.c === pacNow.c;
        const crossing =
          prev.r === pacNow.r &&
          prev.c === pacNow.c &&
          next.r === pacPrev.r &&
          next.c === pacPrev.c;

        if (sameCell || crossing) {
          if (powerRef.current > 0) {
            playSfx('ghost');
            scoreRef.current += 50;
            setScore(scoreRef.current);
            const occupied = [pacNow, ...finalGhosts];
            const cells = [];
            for (let r = 0; r < SIZE; r += 1) {
              for (let c = 0; c < SIZE; c += 1) {
                if (MAZE[r][c] === '#') continue;
                if (occupied.some((o) => o.r === r && o.c === c)) continue;
                cells.push({ r, c });
              }
            }
            if (cells.length) {
              const cell = cells[Math.floor(Math.random() * cells.length)];
              finalGhosts.push({ r: cell.r, c: cell.c, dir: { r: 0, c: 1 } });
            } else {
              finalGhosts.push(next);
            }
          } else {
            hit = true;
            finalGhosts.push(next);
          }
        } else {
          finalGhosts.push(next);
        }
      });

      ghostsRef.current = finalGhosts;

      if (hit) {
        playSfx('gameOver');
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
  const cherry = cherryRef.current;

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
            const isCherry = cherry && cherry.r === r && cherry.c === c;
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
                ) : isCherry ? (
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#ef4444' }}
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
          {powerRef.current > 0 ? ' · 🔥' : ''}
        </span>
      </div>

      {(status === 'idle' || status === 'over' || status === 'won') && (
        <div className="flex flex-col items-center gap-1.5 mt-1">
          {status !== 'idle' && (
            <span className="text-[10px] font-medium text-portfolio-1">
              {status === 'won' ? 'You Win!' : 'Game Over · Score: ' + score}
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
