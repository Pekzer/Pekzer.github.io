import { useState, useEffect } from 'react';

/**
 * Hook to detect if a media query matches.
 * @param {string} query - CSS media query string, e.g. '(min-width: 1024px)'
 * @returns {boolean}
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
