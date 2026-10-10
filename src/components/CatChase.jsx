import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import CatSprite from './CatSprite';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const CatChase = ({ onMeow }) => {
  const areaRef = useRef(null);
  const pointerTargetRef = useRef({ x: 50, y: 48 });
  const pointerPositionRef = useRef({ x: 50, y: 48 });
  const catPositionRef = useRef({ x: 40, y: 55 });
  const automaticProgressRef = useRef(0);
  const automaticPointRef = useRef({ x: 50, y: 48 });
  const lastTimestampRef = useRef(null);
  const catFacingRef = useRef('right');
  const nextDashRef = useRef(2500);
  const dashUntilRef = useRef(0);
  const [pointerPosition, setPointerPosition] = useState({ x: 50, y: 48 });
  const [catPosition, setCatPosition] = useState({ x: 40, y: 55 });
  const [isPointerInside, setIsPointerInside] = useState(false);
  const [catFacing, setCatFacing] = useState('right');
  const [isCatMoving, setIsCatMoving] = useState(true);
  const [isDashing, setIsDashing] = useState(false);

  const updateFacing = useCallback((pointX, catX) => {
    const facing = pointX >= catX ? 'right' : 'left';
    if (catFacingRef.current !== facing) {
      catFacingRef.current = facing;
      setCatFacing(facing);
    }
  }, []);

  const setPointerTarget = useCallback((x, y) => {
    pointerTargetRef.current = { x, y };
    setIsCatMoving(true);
  }, []);

  const handlePointerMove = useCallback((event) => {
    const area = areaRef.current;
    if (!area) return;

    const bounds = area.getBoundingClientRect();
    const x = clamp(((event.clientX - bounds.left) / bounds.width) * 100, 5, 95);
    const y = clamp(((event.clientY - bounds.top) / bounds.height) * 100, 12, 82);
    setPointerTarget(x, y);
  }, [setPointerTarget]);

  useEffect(() => {
    let animationFrame;

    const animatePointer = (timestamp) => {
      const previousTimestamp = lastTimestampRef.current ?? timestamp;
      const delta = Math.min(timestamp - previousTimestamp, 50);
      lastTimestampRef.current = timestamp;

      if (!isPointerInside) {
        const automaticPoint = automaticPointRef.current;
        const cat = catPositionRef.current;
        const distanceToCat = Math.hypot(cat.x - automaticPoint.x, cat.y - automaticPoint.y);
        const pointSpeed = distanceToCat < 34 ? 2.4 : 1;
        automaticProgressRef.current += (delta / 7600) * pointSpeed;
        const progress = automaticProgressRef.current;
        const angle = progress * Math.PI * 2;
        let x = 50 + Math.cos(angle) * 37 + Math.sin(angle * 0.5) * 7;
        let y = 50 + Math.sin(angle) * 37;
        const previousPoint = automaticPoint;
        const isOverCat = Math.abs(x - cat.x) < 13 && Math.abs(y - cat.y) < 18;

        if (isOverCat) {
          const movingRight = x >= previousPoint.x;
          x = clamp(cat.x + (movingRight ? 16 : -16), 3, 97);
          y = clamp(y + (y >= cat.y ? 14 : -14), 4, 96);
        }

        automaticPointRef.current = { x, y };
        pointerTargetRef.current = { x, y };
        setIsCatMoving(true);
      }

      const current = pointerPositionRef.current;
      const target = pointerTargetRef.current;
      const vectorToCat = {
        x: catPositionRef.current.x - current.x,
        y: catPositionRef.current.y - current.y,
      };
      const pointVector = {
        x: target.x - current.x,
        y: target.y - current.y,
      };
      const pointDistance = Math.hypot(vectorToCat.x, vectorToCat.y);
      const pointMovingTowardCat = (
        !isPointerInside
        && pointDistance < 34
        && (pointVector.x * vectorToCat.x + pointVector.y * vectorToCat.y) > 0
      );
      const easing = 1 - Math.exp(-delta / (
        isPointerInside ? 150 : pointMovingTowardCat ? 280 : 700
      ));
      const next = {
        x: current.x + (target.x - current.x) * easing,
        y: current.y + (target.y - current.y) * easing,
      };
      pointerPositionRef.current = next;
      setPointerPosition(next);
      updateFacing(next.x, catPositionRef.current.x);

      if (timestamp >= nextDashRef.current) {
        dashUntilRef.current = timestamp + 280;
        nextDashRef.current = timestamp + 3200 + Math.random() * 2200;
      }

      const catTarget = {
        x: clamp(next.x - (catFacingRef.current === 'right' ? 10 : -10), 12, 88),
        y: clamp(next.y + 7, 24, 70),
      };
      const catCurrent = catPositionRef.current;
      const isDashing = timestamp < dashUntilRef.current;
      setIsDashing(isDashing);
      const catEasing = 1 - Math.exp(-delta / (isDashing ? 180 : 620));
      const nextCatPosition = {
        x: catCurrent.x + (catTarget.x - catCurrent.x) * catEasing,
        y: catCurrent.y + (catTarget.y - catCurrent.y) * catEasing,
      };
      catPositionRef.current = nextCatPosition;
      setCatPosition(nextCatPosition);
      animationFrame = window.requestAnimationFrame(animatePointer);
    };

    animationFrame = window.requestAnimationFrame(animatePointer);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      lastTimestampRef.current = null;
    };
  }, [isPointerInside, updateFacing]);

  const areaBounds = areaRef.current?.getBoundingClientRect();
  const cursorX = areaBounds ? areaBounds.left + (areaBounds.width * pointerPosition.x) / 100 : 0;
  const cursorY = areaBounds ? areaBounds.top + (areaBounds.height * pointerPosition.y) / 100 : 0;

  return (
    <>
      <style>{`
        .cat-chase-area { cursor: none; touch-action: pan-y; }
        .cat-chase-cat {
          position: absolute;
          z-index: 2;
          padding: 0;
          border: 0;
          background: transparent;
          transform: translate(-50%, -50%);
          line-height: 0;
          will-change: left, top;
        }
        .cat-sprite {
          display: block;
          overflow: visible;
          transform-origin: center;
          will-change: transform;
        }
        .cat-body {
          transform-box: fill-box;
          transform-origin: center;
          animation: cat-breathe 2.1s ease-in-out infinite;
        }
        .cat-head {
          transform-box: fill-box;
          transform-origin: 15% 85%;
          animation: cat-head-look 3.8s ease-in-out infinite;
        }
        .cat-tail {
          transform-box: view-box;
          transform-origin: 27px 44px;
          animation: cat-tail-idle 1.8s ease-in-out infinite alternate;
        }
        .cat-eye {
          transform-box: fill-box;
          transform-origin: center;
          animation: cat-blink 4.7s infinite;
        }
        .cat-head path:nth-of-type(1) {
          transform-box: fill-box;
          transform-origin: center;
          animation: cat-ear-twitch 5.2s ease-in-out infinite;
        }
        .cat-sprite.is-walking .cat-leg {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: cat-leg-walk 330ms ease-in-out infinite alternate;
        }
        .cat-sprite.is-walking .cat-leg-back { animation-delay: -165ms; }
        .cat-sprite.is-walking .cat-leg-front-2 { animation-delay: -165ms; }
        .cat-sprite.is-walking .cat-paw {
          animation: cat-paw-walk 330ms ease-in-out infinite alternate;
        }
        .cat-sprite.is-walking .cat-paw-front { animation-delay: -165ms; }
        .cat-sprite.is-walking .cat-body {
          animation: cat-breathe 450ms ease-in-out infinite alternate, cat-walk-bob 330ms ease-in-out infinite alternate;
        }
        .cat-sprite.is-dashing .cat-body { animation: cat-crouch 180ms ease-in-out infinite alternate; }
        .cat-sprite.is-dashing .cat-head { animation: cat-dash-head 180ms ease-in-out infinite alternate; }
        .cat-sprite.is-dashing .cat-leg, .cat-sprite.is-dashing .cat-paw { animation-duration: 125ms; }
        .cat-sprite.is-dashing .cat-tail { animation: cat-tail-dash 250ms ease-in-out infinite alternate; }
        .cat-chase-dot {
          position: fixed;
          z-index: 50;
          width: 9px;
          height: 9px;
          border: 2px solid rgba(255,255,255,.9);
          border-radius: 9999px;
          background: #7c1427;
          box-shadow: 0 0 0 4px rgba(124,20,39,.13), 0 0 14px rgba(124,20,39,.55);
          transform: translate(-50%, -50%);
          pointer-events: none;
          transition: scale 150ms ease;
        }
        .cat-chase-area:hover .cat-chase-dot { scale: 1.15; }
        .cat-chase-cursor { animation: cat-cursor-blink 1s steps(2, start) infinite; }
        .cat-chase-hint { opacity: .75; transition: opacity 180ms ease; }
        .cat-chase-area:hover .cat-chase-hint { opacity: .25; }
        @keyframes cat-cursor-blink { to { visibility: hidden; } }
        @keyframes cat-breathe { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.025); } }
        @keyframes cat-walk-bob { from { translate: 0 0; } to { translate: 0 -2px; } }
        @keyframes cat-head-look { 0%, 38%, 45%, 100% { rotate: 0deg; } 41% { rotate: -4deg; } }
        @keyframes cat-tail-idle { from { rotate: -12deg; } to { rotate: 15deg; } }
        @keyframes cat-tail-dash { from { rotate: -25deg; } to { rotate: 25deg; } }
        @keyframes cat-leg-walk { from { translate: 0 0; } to { translate: 0 -2px; } }
        @keyframes cat-paw-walk { from { translate: 0 0; } to { translate: 0 -2px; } }
        @keyframes cat-crouch { from { scale: 1 1; translate: 0 0; } to { scale: 1.04 .88; translate: 2px 3px; } }
        @keyframes cat-dash-head { from { rotate: 0deg; } to { rotate: -5deg; } }
        @keyframes cat-blink { 0%, 44%, 47%, 100% { scale: 1 1; } 45%, 46% { scale: 1 .08; } }
        @keyframes cat-ear-twitch { 0%, 80%, 86%, 100% { rotate: 0deg; } 83% { rotate: -8deg; } }
        @media (prefers-reduced-motion: reduce) {
          .cat-sprite, .cat-sprite *, .cat-chase-cat, .cat-chase-dot, .cat-chase-cursor { animation: none !important; transition: none !important; }
        }
        @media (pointer: coarse) {
          .cat-chase-area { cursor: default; }
        }
      `}</style>
      <div
        ref={areaRef}
        className="cat-chase-area relative flex-1 min-h-[150px] mt-3 overflow-hidden rounded-2xl border border-light-200/60 dark:border-dark-700/60 bg-light-50/70 dark:bg-dark-800/50"
        aria-label="Mueve el puntero por esta zona para que el gato lo persiga; cuando no haya hover, seguirá un puntero automático"
        onPointerEnter={(event) => {
          setIsPointerInside(true);
          handlePointerMove(event);
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          setIsPointerInside(false);
        }}
      >
        <button
          type="button"
          onClick={onMeow}
          className="cat-chase-cat text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-portfolio-1 rounded-sm"
          style={{ left: `${catPosition.x}%`, top: `${catPosition.y}%` }}
          title="Meow!"
          aria-label="Abrir imagen del gato"
        >
          <CatSprite facing={catFacing} moving={isCatMoving} dashing={isDashing} />
        </button>
        <span className="cat-chase-hint absolute bottom-2 left-3 font-mono text-[10px] text-light-500 dark:text-dark-400 select-none pointer-events-none" aria-hidden="true">
          $ hover_to_play<span className="cat-chase-cursor">_</span>
        </span>
      </div>
      {typeof document !== 'undefined' && createPortal(
        <span
          className="cat-chase-dot"
          aria-hidden="true"
          style={{ left: `${cursorX}px`, top: `${cursorY}px` }}
        />,
        document.body,
      )}
    </>
  );
};

export default CatChase;
