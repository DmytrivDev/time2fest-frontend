import { useState, useEffect } from 'react';

export function useMediaQuery(maxWidth) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(`(max-width: ${maxWidth}px)`).matches
      : false
  );

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const handler = () => setMatches(media.matches);
    handler();

    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [maxWidth]);

  return matches;
}
