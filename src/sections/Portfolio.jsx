import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { handleScrollTo } from '../utils/scrollTo';
import video1 from '../assets/Animated_video/1.mp4';
import video2 from '../assets/Animated_video/2.mp4';
import video3 from '../assets/Animated_video/3.mp4';
import video4 from '../assets/Animated_video/4.mp4';

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
    video: video1,
  },
  {
    title: 'VoiceGrid Agent',
    category: 'Conversational AI',
    video: video2,
  },
  {
    title: 'FlowForge Engine',
    category: 'Automation Systems',
    video: video3,
  },
  {
    title: 'NeuralMesh Ops',
    category: 'Multi-Agent Stack',
    video: video4,
  },
];

const Portfolio = () => {
  const videoRefs = useRef([]);

  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean);
    const cleanups = [];

    videos.forEach((video) => {
      const applyPlayback = () => ensureVideoPlayback(video);
      const restartPlayback = () => {
        video.currentTime = 0;
        ensureVideoPlayback(video);
      };

      if (video.readyState >= 2) {
        applyPlayback();
      } else {
        video.addEventListener('loadedmetadata', applyPlayback);
      }

      video.addEventListener('canplay', applyPlayback);
      video.addEventListener('playing', applyPlayback);
      video.addEventListener('waiting', applyPlayback);
      video.addEventListener('stalled', applyPlayback);
      video.addEventListener('ended', restartPlayback);

      cleanups.push(() => {
        video.removeEventListener('loadedmetadata', applyPlayback);
        video.removeEventListener('canplay', applyPlayback);
        video.removeEventListener('playing', applyPlayback);
        video.removeEventListener('waiting', applyPlayback);
        video.removeEventListener('stalled', applyPlayback);
        video.removeEventListener('ended', restartPlayback);
      });
    });

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        videos.forEach(ensureVideoPlayback);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      cleanups.forEach((cleanup) => cleanup());
      videos.forEach((video) => {
        video.pause();
      });
    };
  }, []);

  return (
    <section className="section relative overflow-hidden bg-white dark:bg-dark-bg z-30" id="work">
      <div className="absolute top-1/2 right-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/10 blur-[120px] opacity-15 -z-10" />

      <div className="container mx-auto px-6">
        <div className="mb-24 flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <SectionHeading subtitle="Automation Use Cases" title="Scaling Systems" />
          <motion.a
            href="#"
            onClick={(e) => handleScrollTo(e, '#')}
            whileHover={{ scale: 1.03 }}
            className="flex items-center rounded-full border border-primary/10 bg-primary/5 px-10 py-4 text-[10px] font-black tracking-[0.2em] text-primary uppercase shadow-sm"
          >
            VIEW SYSTEM BLUEPRINTS <ExternalLink className="ml-3 h-4 w-4" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }}
              className="cursor-video group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[4rem] border border-slate-200/90 bg-white shadow-2xl transition-all duration-700 dark:border-white/5 dark:bg-[#09090f]"
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                controlsList="nodownload nofullscreen noremoteplayback"
                aria-hidden="true"
                style={{ willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
              />

              <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_18%_18%,rgba(41,211,255,0.08),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(109,124,255,0.08),transparent_24%)]" />
              <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-transparent via-transparent to-transparent dark:from-[#09090f] dark:via-[#09090f]/84 dark:to-transparent" />

              <div className="absolute right-6 top-6 flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white/88 text-slate-700 shadow-sm backdrop-blur-md transition-all duration-500 group-hover:text-primary dark:border-white/10 dark:bg-white/6 dark:text-white/80">
                <ArrowUpRight className="h-8 w-8 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                <div className="mb-5 inline-flex items-center rounded-full border border-slate-200 bg-white/88 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 dark:border-white/10 dark:bg-white/6 dark:text-white/78">
                  {project.category}
                </div>
                <h3 className="font-heading w-full text-[2.3rem] font-black uppercase leading-[0.9] tracking-tighter text-white md:text-[3rem]">
                  {project.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
