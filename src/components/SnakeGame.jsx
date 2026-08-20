import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playSfx } from '@/audio/engine';

const SIZE = 15;
const TICK_MS = 160;

const HEAD_COLOR = '#7c1427';
const TAIL_COLOR = '#330000';

const lerpColor = (c1, c2, t) => {
  const hex = (c) => [
    parseInt(c.slice(1, 3), 16),
    parseInt(c.slice(3, 5), 16),
    parseInt(c.slice(5, 7), 16),
  ];
  const a = hex(c1);
  const b = hex(c2);
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
};

const createInitialSnake = () => [
  { r: 7, c: 8 },
  { r: 7, c: 7 },
  { r: 7, c: 6 },
];

const randomFood = (snake) => {
  let cell;
  do {
    cell = {
      r: Math.floor(Math.random() * SIZE),
      c: Math.floor(Math.random() * SIZE),
    };
  } while (snake.some((s) => s.r === cell.r && s.c === cell.c));
  return cell;
};

const SnakeGame = () => {
  const snakeRef = useRef(createInitialSnake());
  const foodRef = useRef(randomFood(snakeRef.current));
  const dirRef = useRef({ r: 0, c: 1 });
  const dirQueueRef = useRef([]);
  const [status, setStatus] = useState('idle'); // idle | running | over
  const [score, setScore] = useState(0);
  const [, setTick] = useState(0);

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
    snakeRef.current = createInitialSnake();
    foodRef.current = randomFood(snakeRef.current);
    dirRef.current = { r: 0, c: 1 };
    dirQueueRef.current = [];
    setScore(0);
    setTick((t) => t + 1);
  };

  const start = () => {
    if (status === 'over') reset();
    playSfx('click');
    setStatus('running');
  };

  useEffect(() => {
    if (status !== 'running') return;
    const interval = setInterval(() => {
      if (dirQueueRef.current.length) {
        dirRef.current = dirQueueRef.current.shift();
      }
      const dir = dirRef.current;
      const snake = snakeRef.current;
      const head = snake[0];
      const newHead = { r: head.r + dir.r, c: head.c + dir.c };

      const hitWall =
        newHead.r < 0 || newHead.r >= SIZE || newHead.c < 0 || newHead.c >= SIZE;
      const hitSelf = snake
        .slice(0, -1)
        .some((s) => s.r === newHead.r && s.c === newHead.c);

      if (hitWall || hitSelf) {
        playSfx('gameOver');
        setStatus('over');
        return;
      }

      const ate =
        newHead.r === foodRef.current.r && newHead.c === foodRef.current.c;

      const newSnake = [newHead, ...snake];
      if (ate) {
        playSfx('eat');
        foodRef.current = randomFood(newSnake);
        setScore((s) => s + 1);
      } else {
        newSnake.pop();
      }
      snakeRef.current = newSnake;
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

  const snake = snakeRef.current;
  const food = foodRef.current;

  const snakeCells = {};
  snake.forEach((seg, i) => {
    const t = snake.length > 1 ? i / (snake.length - 1) : 0;
    snakeCells[`${seg.r}-${seg.c}`] = lerpColor(HEAD_COLOR, TAIL_COLOR, t);
  });

  return (
    <div className="flex flex-col items-center">
      <div
        className="inline-grid gap-[1px]"
        style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}
      >
        {Array.from({ length: SIZE }).map((_, r) =>
          Array.from({ length: SIZE }).map((_, c) => {
            const segColor = snakeCells[`${r}-${c}`];
            const isFood = food.r === r && food.c === c;
            return (
              <div
                key={`${r}-${c}`}
                className={`w-[16px] h-[16px] ${
                  segColor
                    ? ''
                    : isFood
                    ? 'bg-[#1e1b4b]'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
                style={segColor ? { backgroundColor: segColor } : undefined}
              />
            );
          })
        )}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <span className="text-[10px] text-gray-400 dark:text-gray-500 select-none">
          Snake · Score: {score}
        </span>
      </div>

      {(status === 'idle' || status === 'over') && (
        <div className="flex flex-col items-center gap-1.5 mt-1">
          {status === 'over' && (
            <span className="text-[10px] font-medium text-portfolio-1">
              Game Over · Score: {score}
            </span>
          )}
          <button
            onClick={start}
            className="px-3 py-1 text-xs font-medium rounded-full bg-portfolio-1 text-white hover:bg-portfolio-2 transition-colors duration-200"
          >
            {status === 'over' ? 'Restart' : 'Start'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
