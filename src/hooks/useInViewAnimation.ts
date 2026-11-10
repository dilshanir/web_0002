import { useEffect, useRef, useState } from 'react';

/**
 * Flips `isInView` to true the first time the element enters the viewport
 * (threshold 0.1). It never resets.
 */
export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isInView) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isInView]);

  return { ref, isInView };
}

/** Class + style for a staggered fade-in-up entrance. */
export function fadeUp(isInView: boolean, delay: number) {
  return {
    className: isInView ? 'animate-fade-in-up' : 'opacity-0',
    style: { animationDelay: `${delay}s` },
  };
}
