import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';

const RevealGroupContext = createContext(null);

const DEFAULT_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const VARIANTS = ['up', 'down', 'left', 'right', 'zoom', 'flip', 'blur'];

/**
 * Groups a set of <Reveal> children so they all start animating at once when
 * the group first enters the viewport, even if some of them are still below
 * the fold. Each child receives a small delay based on how far down it sits.
 */
export function RevealGroup({ children, className = '', ...rest }) {
  const containerRef = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const shouldAnimate = isDesktop && !reduceMotion;

  const [active, setActive] = useState(!shouldAnimate);

  useEffect(() => {
    if (!shouldAnimate) {
      setActive(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldAnimate]);

  const contextValue = useMemo(() => ({ active, containerRef }), [active]);

  return (
    <RevealGroupContext.Provider value={contextValue}>
      <div ref={containerRef} className={className} {...rest}>
        {children}
      </div>
    </RevealGroupContext.Provider>
  );
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 800,
  easing = DEFAULT_EASING,
  variant = 'up',
  ...rest
}) {
  const group = useContext(RevealGroupContext);
  const grouped = group !== null;
  const groupActive = grouped ? group.active : false;
  const containerRef = grouped ? group.containerRef : null;

  const ref = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const shouldAnimate = isDesktop && !reduceMotion;

  const [phase, setPhase] = useState(() => (shouldAnimate ? 'hidden' : 'done'));
  const [positionDelay, setPositionDelay] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) {
      setPhase('done');
      return;
    }

    if (grouped) {
      if (!groupActive) return;

      let posDelay = 0;
      const el = ref.current;
      const container = containerRef && containerRef.current;
      if (el && container) {
        const elTop = el.getBoundingClientRect().top;
        const containerTop = container.getBoundingClientRect().top;
        posDelay = Math.min(600, Math.max(0, Math.round((elTop - containerTop) * 0.08)));
      }
      setPositionDelay(posDelay);
      setPhase('visible');
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldAnimate, grouped, groupActive, containerRef]);

  const stateClass =
    phase === 'done'
      ? 'reveal-done'
      : phase === 'visible'
        ? 'reveal-visible'
        : 'reveal';

  const safeVariant = VARIANTS.includes(variant) ? variant : 'up';

  const style =
    phase === 'visible'
      ? {
          '--reveal-delay': `${delay + positionDelay}ms`,
          '--reveal-duration': `${duration}ms`,
          '--reveal-ease': easing,
        }
      : undefined;

  return (
    <div
      ref={ref}
      data-variant={safeVariant}
      className={`${className} ${stateClass}`}
      style={style}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && phase === 'visible') {
          setPhase('done');
        }
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
