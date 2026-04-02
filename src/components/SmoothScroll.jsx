import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      lerp: 0.11,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      wheelMultiplier: 0.95,
      mouseMultiplier: 0.95,
      smoothTouch: false,
      syncTouch: false,
      touchMultiplier: 1.2,
      infinite: false,
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (window.lenis === lenis) {
        delete window.lenis;
      }
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
