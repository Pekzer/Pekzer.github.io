import React, { useState, useRef, useEffect } from 'react';

/**
 * Wrapper that defers rendering children until the section is near the viewport.
 * Reduces initial DOM size and painting cost on mobile.
 */
export default function LazySection({ children, rootMargin = '200px', placeholderHeight = '100px' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? undefined : placeholderHeight }}>
      {isVisible ? children : null}
    </div>
  );
}
