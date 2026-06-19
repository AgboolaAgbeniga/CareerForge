import { useState, useEffect } from 'react';

/**
 * Animates a number from 0 to `target` over `duration` milliseconds.
 * Returns the current animated value. Re-runs whenever `target` changes.
 */
export function useCountUp(target: number, duration = 800): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || target <= 0) {
      setCount(target);
      return;
    }
    let current = 0;
    const totalSteps = Math.ceil(duration / 16); // ~60fps
    const step = target / totalSteps;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.round(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}
