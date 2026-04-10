import React, { useLayoutEffect, useRef } from 'react';
import ServiceForm from '../components/ServiceForm';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const Contact = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-visual', {
        scale: 0.8,
        opacity: 0,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="section section-theme-cyan relative overflow-hidden pt-28 pb-20 sm:pt-28 sm:pb-24 lg:pt-[9.2rem] lg:pb-[5.5rem] xl:pt-[10rem] xl:pb-24 2xl:pt-36 2xl:pb-28" id="contact">
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-full max-w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 opacity-30 blur-[150px] mix-blend-screen dark:opacity-60" />

      <div className="container laptop-scale-section relative z-10 mx-auto px-5 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-12 sm:gap-14 lg:flex-row lg:gap-10 xl:gap-12 2xl:gap-14">
          <div className="w-full text-left lg:w-[42%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2.5 sm:px-6"
            >
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-xs font-black tracking-widest text-primary uppercase">Deploy With Us</span>
            </motion.div>

            <h2 className="font-heading mb-7 text-[3.4rem] font-black tracking-tighter text-slate-950 uppercase leading-[0.8] dark:text-white sm:text-6xl md:mb-9 md:text-8xl lg:text-[4.1rem] xl:text-[4.6rem] 2xl:text-8xl">
              Built for <br />
              <span className="text-gradient italic">Automation.</span>
            </h2>

            <p className="mb-8 text-lg font-light leading-relaxed tracking-tight text-slate-600 dark:text-gray-400 sm:mb-16 sm:text-xl lg:text-[0.98rem] xl:text-[1.08rem] 2xl:text-2xl">
              Bring us the repetitive work, fragile handoffs, or messy operating flow. We&apos;ll design the AI system that makes it run cleanly.
            </p>

            <div className="contact-visual relative hidden lg:block">
              <div className="group h-72 w-72 xl:h-[18.5rem] xl:w-[18.5rem] 2xl:h-80 2xl:w-80 rotate-6 cursor-pointer rounded-[2.6rem] xl:rounded-[2.8rem] 2xl:rounded-[3rem] bg-gradient-to-tr from-primary to-secondary p-1 transition-transform duration-700 hover:rotate-0">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[2.8rem] bg-white dark:bg-dark-bg">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover grayscale brightness-125 contrast-125 opacity-40 dark:brightness-100"
                    src="https://cdn.dribbble.com/uploads/39417/original/310344bb197acba72ae3a3b2b4ed7f9b.mp4"
                  />
                  <Sparkles className="absolute h-20 w-20 animate-pulse text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[56%] xl:w-[52%]">
            <div className="relative w-full lg:ml-auto lg:max-w-[700px] lg:sticky lg:top-[108px] xl:max-w-[730px] xl:top-[116px]">
              <div className="absolute -inset-10 -z-10 animate-pulse rounded-full bg-primary/10 blur-[80px]" />
              <ServiceForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
