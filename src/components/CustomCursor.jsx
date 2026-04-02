import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Play } from 'lucide-react';

const CustomCursor = () => {
  const [hoverType, setHoverType] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const ringX = useSpring(x, { damping: 28, stiffness: 240, mass: 0.55 });
  const ringY = useSpring(y, { damping: 28, stiffness: 240, mass: 0.55 });
  const coreX = useSpring(x, { damping: 36, stiffness: 520, mass: 0.28 });
  const coreY = useSpring(y, { damping: 36, stiffness: 520, mass: 0.28 });
  const crossX = useSpring(x, { damping: 22, stiffness: 220, mass: 0.5 });
  const crossY = useSpring(y, { damping: 22, stiffness: 220, mass: 0.5 });

  useEffect(() => {
    const onMouseMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsVisible(true);

      const target = e.target;
      const videoZone = target?.closest?.('.cursor-video, video');
      const buttonZone = target?.closest?.('a, button, input, textarea, select, [role="button"], .cursor-pointer');

      if (videoZone) {
        setHoverType('video');
      } else if (buttonZone) {
        setHoverType('button');
      } else {
        setHoverType('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      <motion.div
        className="absolute h-16 w-16 rounded-full border border-primary/50 bg-[radial-gradient(circle,rgba(41,211,255,0.16),rgba(109,124,255,0.05)_45%,rgba(139,255,176,0.05)_80%)] shadow-[0_0_35px_rgba(41,211,255,0.22)] backdrop-blur-[2px]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hoverType === 'default' ? 1 : 0.74,
          opacity: isVisible && hoverType === 'default' ? 1 : 0,
        }}
      />
      <motion.div
        className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-teal shadow-[0_0_24px_rgba(139,255,176,0.7)]"
        style={{ x: coreX, y: coreY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hoverType === 'default' ? 0.35 : hoverType === 'button' ? 0.42 : 1,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.span
          className="flex items-center justify-center"
          animate={{ opacity: hoverType === 'video' ? 1 : 0, scale: hoverType === 'video' ? 1 : 0.65 }}
          transition={{ duration: 0.18 }}
        >
          <Play className="ml-0.5 h-4 w-4 fill-[#07111f] text-[#07111f]" />
        </motion.span>
      </motion.div>
      <motion.div
        className="absolute h-8 w-8"
        style={{ x: crossX, y: crossY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          rotate: 0,
          scale: hoverType === 'default' ? 0.82 : 0.5,
          opacity: isVisible && hoverType === 'default' ? 0.5 : 0,
        }}
      >
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/0 via-primary/75 to-primary/0" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-primary/0 via-primary/75 to-primary/0" />
      </motion.div>
    </div>
  );
};

export default CustomCursor;
