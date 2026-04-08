import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import Button from '../components/Button';
import { handleScrollTo } from '../utils/scrollTo';

const CTA = () => {
  return (
    <section className="section overflow-hidden bg-slate-50 dark:bg-dark-bg py-20 xl:py-24 2xl:py-[50px]" id="cta">
      {/* Dynamic colorful blur backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-full pointer-events-none flex justify-between z-0">
        <div className="w-[400px] h-[400px] bg-primary/30 rounded-full blur-[150px] mix-blend-screen" />
        <div className="w-[300px] h-[300px] bg-indigo-600/30 rounded-full blur-[120px] mix-blend-screen -translate-y-20" />
      </div>

      <div className="container laptop-scale-section mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="p-10 md:p-14 xl:p-14 2xl:p-16 rounded-[2.5rem] xl:rounded-[2.7rem] 2xl:rounded-[3rem] border border-slate-200 dark:border-white/5 relative overflow-hidden shadow-2xl bg-white dark:bg-[#0c0c1d]"
        >
          {/* Inner glow effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 xl:px-6 py-2.5 xl:py-3 rounded-full dark:bg-white/[0.05] bg-black/[0.05] border dark:border-white/10 border-black/10 mb-6 xl:mb-7 2xl:mb-8"
            >
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium tracking-wide uppercase dark:text-gray-300 text-slate-700">Ready to build?</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl xl:text-[3.8rem] 2xl:text-6xl font-black tracking-tight dark:text-white text-slate-950 mb-5 xl:mb-6 font-heading">
              Let's create something <br />
              <span className="text-gradient">extraordinary.</span>
            </h2>
            
            <p className="text-lg xl:text-[1.15rem] 2xl:text-xl dark:text-gray-400 text-slate-600 max-w-2xl mx-auto mb-10 xl:mb-11 2xl:mb-12 font-light">
              Whether you need a cutting-edge application, a high-converting storefront, or a complete digital overhaul, our team is ready to deliver.
            </p>

            <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="w-full md:w-auto inline-block">
              <Button variant="primary" className="text-base xl:text-[1.05rem] 2xl:text-lg px-8 xl:px-9 2xl:px-10 py-[1.125rem] xl:py-[1.15rem] 2xl:py-5 rounded-full shadow-2xl shadow-primary/40 hover:scale-105 group w-full md:w-auto">
                Connect Us 
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
