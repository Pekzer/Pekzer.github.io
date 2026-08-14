import React, { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';

/**
 * Reveals its children with a subtle fade + slide-up animation the first
 * time they enter the viewport.
 *
 * Animations only run on desktop and are skipped when the user prefers
 * reduced motion, keeping mobile rendering fast and accessible.
 */
export default function Reveal({ children, className = '', delay = 0, ...rest }) {
  const ref = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const shouldAnimate = isDesktop && !reduceMotion;

  const [phase, setPhase] = useState(shouldAnimate ? 'hidden' : 'done');

  useEffect(() => {
    if (!shouldAnimate) {
      setPhase('done');
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
  }, [shouldAnimate]);

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
