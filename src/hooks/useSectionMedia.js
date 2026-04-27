import { useEffect, useRef, useState } from 'react';

export const useSectionMedia = (rootMargin = '280px 0px', threshold = 0.01) => {
  const sectionRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element || shouldLoad) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, shouldLoad, threshold]);

  return [sectionRef, shouldLoad];
};
