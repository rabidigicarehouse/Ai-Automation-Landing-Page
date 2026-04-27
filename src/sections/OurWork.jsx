import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { useSectionMedia } from '../hooks/useSectionMedia';

const workFrames = [
  { image: '/assets/aiautomation workflows/image (1).jpg', alt: 'Automation workflow 1' },
  { image: '/assets/aiautomation workflows/image (1).png', alt: 'Automation workflow 2' },
  { image: '/assets/aiautomation workflows/image (3).png', alt: 'Automation workflow 3' },
  { image: '/assets/aiautomation workflows/image (4).png', alt: 'Automation workflow 4' },
  { image: '/assets/aiautomation workflows/image (5).png', alt: 'Automation workflow 5' },
  { image: '/assets/aiautomation workflows/image (6).png', alt: 'Automation workflow 6' },
  { image: '/assets/aiautomation workflows/image (7).png', alt: 'Automation workflow 7' },
  { image: '/assets/aiautomation workflows/image (8).png', alt: 'Automation workflow 8' },
  { image: '/assets/aiautomation workflows/image (9).png', alt: 'Automation workflow 9' },
  { image: '/assets/aiautomation workflows/image (10).png', alt: 'Automation workflow 10' },
];

const reelFrames = [...workFrames, ...workFrames];

const OurWork = () => {
  const [activeFrame, setActiveFrame] = useState(null);
  const [sectionRef, shouldLoadMedia] = useSectionMedia();

  useEffect(() => {
    if (!activeFrame) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveFrame(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFrame]);

  return (
    <section
      ref={sectionRef}
      className="section section-theme-cyan box-border flex min-h-screen items-center overflow-hidden pb-16 pt-[140px] lg:pt-[160px] xl:pb-20 xl:pt-[180px] 2xl:pb-24 2xl:pt-[190px]"
      id="our-work"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1200px' }}
    >
      <div className="container laptop-scale-section mx-auto flex w-full flex-col justify-center px-4 sm:px-6 xl:px-8 2xl:px-10">
        <div className="mb-10 max-w-4xl xl:mb-12 2xl:mb-14">
          <SectionHeading title="Our Work Systems" subtitle="Automation Snapshots" />
          <p className="mt-5 max-w-2xl text-base font-light leading-relaxed tracking-tight text-slate-600 dark:text-gray-400 md:text-lg">
            A continuous reel of workflow maps, system layers, and automation snapshots that reflect the kind of production AI infrastructure we build.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2.8rem] border border-black/5 bg-white/38 px-4 py-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-white/8 dark:bg-white/[0.03] sm:px-5 lg:px-6"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f4fdff] via-[#f4fdff]/88 to-transparent dark:from-[#04101a] dark:via-[#04101a]/86 sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f4fdff] via-[#f4fdff]/88 to-transparent dark:from-[#04101a] dark:via-[#04101a]/86 sm:w-16" />
          <div className="pointer-events-none absolute left-0 right-0 top-4 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="pointer-events-none absolute left-0 right-0 bottom-4 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          <motion.div
            className="flex w-max gap-4 lg:gap-5"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
          >
            {reelFrames.map((frame, index) => (
              <button
                key={`${frame.alt}-${index}`}
                type="button"
                onClick={() => setActiveFrame(frame)}
                className="h-[20rem] w-[18rem] shrink-0 overflow-hidden rounded-[2.2rem] border border-black/5 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.1)] transition-transform duration-300 hover:scale-[1.02] dark:border-white/8 dark:bg-[#081723] sm:h-[24rem] sm:w-[21rem] lg:h-[28rem] lg:w-[24rem] xl:h-[31rem] xl:w-[27rem]"
              >
                {shouldLoadMedia ? (
                  <img src={frame.image} alt={frame.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                ) : (
                  <div className="h-full w-full bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(226,232,240,0.74),rgba(241,245,249,0.94))] dark:bg-[linear-gradient(135deg,rgba(8,23,35,0.98),rgba(15,23,42,0.78),rgba(8,23,35,0.98))]" />
                )}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {activeFrame && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/88 px-4 py-8 backdrop-blur-md"
          onClick={() => setActiveFrame(null)}
        >
          <div
            className="work-modal-frame relative"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveFrame(null)}
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-black/45 text-2xl text-white transition-colors hover:bg-black/65"
              aria-label="Close image preview"
            >
              x
            </button>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 shadow-[0_28px_100px_rgba(0,0,0,0.45)]">
              <img
                src={activeFrame.image}
                alt={activeFrame.alt}
                className="work-modal-image w-full object-contain bg-black"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OurWork;
