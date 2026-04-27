import React, { memo, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { companyPhoneHref } from '../data/contact';
import { handlePrimaryContactAction } from '../utils/contactActions';

const ensureVideoPlayback = (video) => {
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.defaultPlaybackRate = 1.5;
  video.playbackRate = 1.5;

  const playPromise = video.play();
  if (playPromise?.catch) {
    playPromise.catch(() => {});
  }
};

const projects = [
  {
    title: 'OpsPilot Command',
    category: 'AI Control Layer',
    video: '/assets/Animated_video/1.mp4',
  },
  {
    title: 'VoiceGrid Agent',
    category: 'Conversational AI',
    video: '/assets/Animated_video/2.mp4',
  },
  {
    title: 'FlowForge Engine',
    category: 'Automation Systems',
    video: '/assets/Animated_video/3.mp4',
  },
  {
    title: 'NeuralMesh Ops',
    category: 'Multi-Agent Stack',
    video: '/assets/Animated_video/4.mp4',
  },
];

const PortfolioCard = memo(function PortfolioCard({ project, index }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(index < 2);
  const [isActive, setIsActive] = useState(index < 2);

  useEffect(() => {
    if (shouldLoad || !cardRef.current) return;

    const preloadObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          preloadObserver.disconnect();
        }
      },
      { rootMargin: '220px 0px' }
    );

    preloadObserver.observe(cardRef.current);
    return () => preloadObserver.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsActive(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.35 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!shouldLoad || !video) return;

    const applyPlayback = () => ensureVideoPlayback(video);
    const restartPlayback = () => {
      video.currentTime = 0;
      ensureVideoPlayback(video);
    };
    const syncVisibilityPlayback = () => {
      if (document.visibilityState === 'visible' && isActive) {
        applyPlayback();
      } else {
        video.pause();
      }
    };

    if (video.readyState >= 2 && isActive) {
      applyPlayback();
    } else {
      video.addEventListener('loadedmetadata', syncVisibilityPlayback);
    }

    video.addEventListener('canplay', syncVisibilityPlayback);
    video.addEventListener('playing', syncVisibilityPlayback);
    video.addEventListener('waiting', syncVisibilityPlayback);
    video.addEventListener('stalled', syncVisibilityPlayback);
    video.addEventListener('ended', restartPlayback);
    document.addEventListener('visibilitychange', syncVisibilityPlayback);

    syncVisibilityPlayback();

    return () => {
      video.removeEventListener('loadedmetadata', syncVisibilityPlayback);
      video.removeEventListener('canplay', syncVisibilityPlayback);
      video.removeEventListener('playing', syncVisibilityPlayback);
      video.removeEventListener('waiting', syncVisibilityPlayback);
      video.removeEventListener('stalled', syncVisibilityPlayback);
      video.removeEventListener('ended', restartPlayback);
      document.removeEventListener('visibilitychange', syncVisibilityPlayback);
      video.pause();
    };
  }, [shouldLoad, isActive]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }}
      className="cursor-video group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[4rem] border border-slate-200/90 bg-white shadow-2xl transition-all duration-700 dark:border-white/5 dark:bg-[#09090f]"
      style={{ contain: 'layout paint', transform: 'translateZ(0)' }}
    >
      {shouldLoad ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          src={project.video}
          autoPlay
          muted
          loop
          playsInline
          preload={index < 2 ? 'auto' : 'metadata'}
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback"
          aria-hidden="true"
          style={{ willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
        />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(226,232,240,0.72),rgba(241,245,249,0.94))] dark:bg-[linear-gradient(135deg,rgba(9,9,15,0.98),rgba(17,24,39,0.84),rgba(9,9,15,0.98))]" />
      )}

      <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_18%_18%,rgba(41,211,255,0.08),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(109,124,255,0.08),transparent_24%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-transparent via-transparent to-transparent dark:from-[#09090f] dark:via-[#09090f]/84 dark:to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
        <div className="mb-5 inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary shadow-[0_10px_30px_rgba(41,211,255,0.16)] dark:border-primary/30 dark:bg-primary/12 dark:text-white">
          {project.category}
        </div>
        <h3 className="font-heading w-full text-[2.3rem] font-black uppercase leading-[0.9] tracking-tighter text-white md:text-[3rem]">
          {project.title}
        </h3>
      </div>
    </motion.article>
  );
});

const Portfolio = () => {

  return (
    <section className="section section-theme-mint relative overflow-hidden py-24 xl:py-28 2xl:py-32 z-30" id="work">
      <div className="absolute top-1/2 right-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/10 blur-[120px] opacity-15 -z-10" />

      <div className="container laptop-scale-section mx-auto px-6">
        <div className="mb-16 xl:mb-20 2xl:mb-24 flex flex-col gap-6 xl:gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading subtitle="Automation Use Cases" title="Scaling Systems" />
          <Button
            variant="outline"
            onClick={(e) => handlePrimaryContactAction(e, companyPhoneHref)}
            className="group self-start rounded-full border-primary/10 bg-primary/5 px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-primary shadow-sm"
          >
            Connect Us
            <ArrowUpRight className="ml-3 h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:gap-10 2xl:gap-12 md:gap-12 xl:md:gap-14 lg:grid-cols-2">
          {projects.map((project, index) => (
            <PortfolioCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
