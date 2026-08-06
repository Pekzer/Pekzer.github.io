import React, { useState, useRef, useEffect } from 'react';

/**
 * Wrapper that defers rendering children until the section is near the viewport.
 * Reduces initial DOM size and painting cost on mobile.
 */
export default function LazySection({ children, rootMargin = '200px', placeholderHeight = '100px', forceRender = false }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || forceRender) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, forceRender]);

  const showChildren = forceRender || isVisible;

  return (
    <div ref={ref} style={{ minHeight: showChildren ? undefined : placeholderHeight }}>
      {showChildren ? children : null}
    </div>
  );
}
