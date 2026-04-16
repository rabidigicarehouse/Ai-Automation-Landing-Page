import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import ServiceForm from '../components/ServiceForm';
import { handleScrollTo } from '../utils/scrollTo';
import heroVideo from '../assets/Animated_video/hero.mp4';
import { assetSrc } from '../utils/assetSrc';

const stats = [
  { label: 'Flows Automated', value: '180+' },
  { label: 'Avg. Time Saved', value: '72%' },
  { label: 'Agent Coverage', value: '24/7' },
];

const Hero = () => {
  const heroVideoRef = useRef(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const syncPlayback = () => {
      video.defaultPlaybackRate = 2;
      video.playbackRate = 2;
      void video.play().catch(() => {});
    };

    const resumePlayback = () => {
      if (document.visibilityState === 'visible') {
        syncPlayback();
      }
    };

    video.addEventListener('loadedmetadata', syncPlayback);
    video.addEventListener('canplay', syncPlayback);
    video.addEventListener('playing', syncPlayback);
    video.addEventListener('waiting', syncPlayback);
    video.addEventListener('stalled', syncPlayback);
    document.addEventListener('visibilitychange', resumePlayback);

    return () => {
      video.removeEventListener('loadedmetadata', syncPlayback);
      video.removeEventListener('canplay', syncPlayback);
      video.removeEventListener('playing', syncPlayback);
      video.removeEventListener('waiting', syncPlayback);
      video.removeEventListener('stalled', syncPlayback);
      document.removeEventListener('visibilitychange', resumePlayback);
    };
  }, []);

  return (
    <section id="hero" className="section relative flex min-h-screen items-center overflow-hidden pb-[90px] pt-[216px] sm:pb-[120px] sm:pt-[145px] md:pb-[150px] lg:pt-[98px] xl:pt-[106px] 2xl:pt-[180px] lg:pb-[52px] xl:pb-[62px] 2xl:pb-[170px]">
      <div className="cursor-video absolute inset-0 -z-20 overflow-hidden">
        <video
          ref={heroVideoRef}
          className="h-full w-full object-cover"
          src={assetSrc(heroVideo)}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.45)_0%,rgba(2,6,23,0.25)_28%,rgba(2,6,23,0.55)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(41,211,255,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(109,124,255,0.14),transparent_34%)]" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] opacity-40 -z-10" />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-orb orb-3" />
        <div className="hero-ai-ring ring-1" />
        <div className="hero-ai-ring ring-2" />
        <div className="hero-ai-beam" />
      </div>

      <div className="container mx-auto grid w-full grid-cols-1 items-center gap-10 px-6 sm:gap-12 md:px-8 lg:grid-cols-12 lg:gap-0 xl:gap-1 xl:px-12 z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="laptop-scale-hero-left flex flex-col items-start text-left lg:col-span-6 2xl:col-span-7"
        >
          <div className="pt-12 sm:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-[#071425]/88 px-5 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:mb-8"
            >
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-white/90">Open For AI System Deployments</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08 }}
              className="mb-5 max-w-full text-[2.95rem] font-black uppercase leading-[0.92] tracking-tight text-white sm:mb-8 sm:text-6xl sm:leading-[0.9] md:text-8xl lg:text-[3.15rem] xl:text-[3.55rem] 2xl:text-8xl"
            >
              <span className="block">Building</span>
              <span className="block text-gradient break-words">Autonomous</span>
              <span className="mt-2 inline-block max-w-full rounded-2xl bg-primary px-3.5 py-2 text-white shadow-2xl shadow-primary/20 break-words sm:px-6">
                Operations.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.16 }}
              className="mb-5 max-w-xl text-base font-light leading-relaxed tracking-tight text-white sm:mb-10 sm:text-lg lg:max-w-[22rem] lg:text-[0.86rem] xl:mb-7 xl:max-w-[24rem] xl:text-[0.92rem] 2xl:max-w-xl 2xl:text-xl"
            >
              The AI Syndicates build AI systems that automate, analyze, and execute work across your business without adding complexity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.24 }}
              className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
            >
              <a href="#work" onClick={(e) => handleScrollTo(e, '#work')} className="block w-full sm:w-auto">
                <Button variant="primary" className="group w-full rounded-full px-10 py-5 text-sm font-black uppercase tracking-widest shadow-[0_0_24px_rgba(41,211,255,0.22)] hover:shadow-[0_0_38px_rgba(109,124,255,0.32)] sm:w-auto">
                  Explore Systems <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="block w-full sm:w-auto">
                <Button variant="outline" className="w-full rounded-full border-white/20 bg-white/[0.02] px-10 py-5 text-sm font-black tracking-widest text-white uppercase hover:border-primary hover:text-primary sm:w-auto">
                  Book Strategy
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-4 grid w-full max-w-xl grid-cols-3 gap-x-4 gap-y-4 border-t border-white/10 pt-6 sm:mt-16 sm:gap-x-8 sm:pt-10 lg:mt-1 lg:gap-x-3 lg:pt-3 xl:mt-3 xl:gap-x-4 xl:pt-4"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <div className="font-heading text-[2rem] font-black leading-none text-white sm:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/50 sm:text-[10px] sm:tracking-widest">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="laptop-scale-hero-right relative w-full lg:col-span-6 lg:max-w-[39rem] lg:justify-self-end xl:max-w-[41rem] xl:justify-self-end 2xl:col-span-5 2xl:max-w-[32rem] 2xl:justify-self-end">
          <div className="absolute -inset-10 -z-10 rounded-full bg-primary/20 blur-[100px] opacity-20" />
          <ServiceForm forceDark />
        </div>
      </div>
    </section>
  );
};

export default Hero;
