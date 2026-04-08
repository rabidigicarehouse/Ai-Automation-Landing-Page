import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ title, subtitle, centered = false }) => {
  return (
    <div className={`mb-12 xl:mb-14 2xl:mb-16 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`flex items-center gap-3 mb-3 xl:mb-4 ${centered ? 'justify-center' : 'justify-start'}`}
      >
        <div className="w-8 h-[2px] rounded-full bg-gradient-funky hidden sm:block" />
        <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-secondary uppercase font-mono">
          {subtitle}
        </span>
        {centered && <div className="w-8 h-[2px] rounded-full bg-gradient-funky hidden sm:block" />}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-5xl xl:text-[3.6rem] 2xl:text-6xl font-black font-heading tracking-tight text-slate-950 dark:text-white"
      >
        {title.split(' ').map((word, i) => (
          <span key={i} className={i % 2 === 1 ? "text-gradient block sm:inline" : "block sm:inline mr-3"}>
            {word}{' '}
          </span>
        ))}
      </motion.h2>
    </div>
  );
};

export default SectionHeading;
