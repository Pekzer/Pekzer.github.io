import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';

const RevealGroupContext = createContext(null);

/**
 * Groups a set of <Reveal> children so they all start animating at once when
 * the group first enters the viewport, even if some of them are still below
 * the fold. Useful for animating a whole section together.
 */
export function RevealGroup({ children, className = '', ...rest }) {
  const ref = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const shouldAnimate = isDesktop && !reduceMotion;

  const [active, setActive] = useState(!shouldAnimate);

  useEffect(() => {
    if (!shouldAnimate) {
      setActive(true);
      return;
    }

    const el = ref.current;
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

  return (
    <RevealGroupContext.Provider value={{ active }}>
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    </RevealGroupContext.Provider>
  );
}

/**
 * Reveals its children with a subtle fade + slide-up animation the first
 * time they enter the viewport.
 *
 * When used inside a <RevealGroup>, it animates as soon as the group becomes
 * visible. Otherwise it animates on its own when it enters the viewport.
 * Animations only run on desktop and are skipped for reduced motion.
 */
export default function Reveal({ children, className = '', delay = 0, ...rest }) {
  const group = useContext(RevealGroupContext);
  const grouped = group !== null;
  const groupActive = grouped ? group.active : false;

  const ref = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const shouldAnimate = isDesktop && !reduceMotion;

  const [phase, setPhase] = useState(() => {
    if (!shouldAnimate) return 'done';
    if (grouped) return groupActive ? 'visible' : 'hidden';
    return 'hidden';
  });

  useEffect(() => {
    if (!shouldAnimate) {
      setPhase('done');
      return;
    }

    if (grouped) {
      if (groupActive) setPhase('visible');
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
  }, [shouldAnimate, grouped, groupActive]);

  const stateClass =
    phase === 'done'
      ? 'reveal-done'
      : phase === 'visible'
        ? 'reveal-visible'
        : 'reveal';

  return (
    <div
      ref={ref}
      className={`${className} ${stateClass}`}
      style={phase === 'visible' ? { animationDelay: `${delay}ms` } : undefined}
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
