import React, { useState, useEffect, useRef, useCallback } from 'react';

const SIZE = 15;
const TICK_MS = 160;

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
        setStatus('over');
        return;
      }

      const ate =
        newHead.r === foodRef.current.r && newHead.c === foodRef.current.c;

      const newSnake = [newHead, ...snake];
      if (ate) {
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

  return (
    <div className="flex flex-col items-center">
      <div
        className="inline-grid gap-[1px]"
        style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}
      >
        {Array.from({ length: SIZE }).map((_, r) =>
          Array.from({ length: SIZE }).map((_, c) => {
            const isHead = snake[0].r === r && snake[0].c === c;
            const isBody = snake
              .slice(1)
              .some((s) => s.r === r && s.c === c);
            const isFood = food.r === r && food.c === c;
            return (
              <div
                key={`${r}-${c}`}
                className={`w-[16px] h-[16px] ${
                  isHead
                    ? 'bg-portfolio-1'
                    : isBody
                    ? 'bg-portfolio-2'
                    : isFood
                    ? 'bg-blue-800'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
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
