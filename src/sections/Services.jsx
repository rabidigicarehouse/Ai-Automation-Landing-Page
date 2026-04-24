import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, MoveLeft, MoveRight } from 'lucide-react';
import ServiceModal from '../components/ServiceModal';
import { servicesData } from '../data/services';

const Services = () => {
  const [current, setCurrent] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent(curr => (curr === servicesData.length - 1 ? 0 : curr + 1));
  };

  const prev = () => {
    setDirection(-1);
    setCurrent(curr => (curr === 0 ? servicesData.length - 1 : curr - 1));
  };

  const openService = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection(1);
      setCurrent((curr) => (curr === servicesData.length - 1 ? 0 : curr + 1));
    }, 10000);

    return () => clearTimeout(timer);
  }, [current]);

  const activeService = servicesData[current];
  const headlineSuffix = 'Automation';
  const displayTitle = activeService.title
    .replace(/\bautomation\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  const isLongTitle = displayTitle.length > 14;
  const cardTitleClass = isLongTitle
    ? 'text-[1.35rem] sm:text-[1.85rem] md:text-[2.15rem] lg:text-[1.8rem] xl:text-[2rem]'
    : 'text-[2.1rem] md:text-[2.8rem] lg:text-[2.45rem] xl:text-[2.7rem]';
  const protocolTitleClass = isLongTitle
    ? 'text-[1.75rem] sm:text-[2.45rem] md:text-[3.6rem] lg:text-[3.3rem] xl:text-[3.7rem]'
    : 'text-[2.45rem] sm:text-[3.9rem] md:text-[5.6rem] lg:text-[5rem] xl:text-[5.45rem]';

  return (
    <section className="section-theme-cyan relative min-h-screen flex flex-col justify-center pt-8 pb-28 md:pt-11 md:pb-14 lg:pt-[5.6rem] lg:pb-[2.6rem] xl:pt-[6rem] xl:pb-[3rem] 2xl:pt-[5rem] 2xl:pb-12 overflow-hidden z-20" id="services">

      <div className="container laptop-scale-services mx-auto px-5 sm:px-6 relative z-10">
         <div className="relative max-w-7xl mx-auto">
            <AnimatePresence mode="wait" custom={direction}>
               <motion.div
                 key={current}
                 custom={direction}
                 initial={{ opacity: 0, x: direction > 0 ? 50 : -50, scale: 0.98 }}
                 animate={{ opacity: 1, x: 0, scale: 1 }}
                 exit={{ opacity: 0, x: direction > 0 ? -50 : 50, scale: 0.98 }}
                 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                 className="flex flex-col lg:flex-row items-start justify-between gap-7 sm:gap-10 lg:gap-6 xl:gap-8 2xl:gap-16"
               >
                  {/* Service Card Visual */}
                  <div className="hidden w-full lg:flex lg:w-[39%] xl:w-[41%] 2xl:w-[44%] justify-center lg:justify-start pt-1">
                     <div className="flex flex-col items-center lg:items-start w-full max-w-[450px]">
                     <div 
                        onClick={() => openService(servicesData[current])}
                        className="relative w-full max-w-[320px] aspect-square rounded-[3rem] bg-white dark:bg-dark-card border border-black/5 dark:border-white/5 shadow-2xl overflow-hidden group cursor-pointer flex flex-col items-center justify-center p-7 sm:max-w-[420px] sm:p-10 md:p-12 lg:max-w-[360px] lg:rounded-[3.5rem] lg:p-8 xl:max-w-[385px] xl:p-9 2xl:max-w-[420px] 2xl:p-12 text-center transition-all duration-700 hover:shadow-[0_0_40px_rgba(139,92,246,0.18)]"
                     >
                        <div className="absolute inset-0 rounded-[3.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(135deg,rgba(139,92,246,0.28),rgba(236,72,153,0.14),rgba(45,212,191,0.2))] p-[1px]">
                           <div className="h-full w-full rounded-[3.45rem] bg-white dark:bg-dark-card" />
                        </div>
                        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-primary/20 bg-primary/10 text-primary shadow-xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 sm:mb-8 sm:h-28 sm:w-28 md:mb-10 md:h-32 md:w-32 md:rounded-[2.5rem]">
                           {React.cloneElement(servicesData[current].icon, { size: 56 })}
                        </div>
                        
                        <h3 className={`relative z-10 mx-auto w-full max-w-[13ch] text-center font-black font-heading tracking-tighter uppercase italic leading-[0.92] text-slate-950 transition-transform duration-700 group-hover:translate-y-[-10px] dark:text-white [word-break:keep-all] break-normal ${cardTitleClass}`}>
                           {displayTitle}
                        </h3>

                        {/* Decorator Orb */}
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                     </div>

                     </div>
                  </div>

                  {/* Service Content Info */}
                  <div className="w-full pr-16 sm:pr-0 lg:w-[61%] xl:w-[59%] 2xl:w-[56%] flex min-h-[370px] lg:min-h-[375px] xl:min-h-[390px] 2xl:min-h-[500px] flex-col items-start text-left lg:items-start lg:text-left">
                     <div className="inline-block px-5 py-2 rounded-full bg-slate-100 dark:bg-white/5 text-primary text-[10px] font-black tracking-[0.3em] uppercase border border-primary/10 mb-2 self-center lg:self-auto">
                        Phase 0{current + 1}
                     </div>
                     
                     {/* Heading is the start of alignment protocol */}
                     <h2 className={`mb-2 w-full max-w-[13ch] px-0 text-left font-black font-heading tracking-tighter uppercase italic leading-[0.86] text-slate-950 dark:text-white sm:max-w-[15.5ch] lg:max-w-[17.2ch] xl:max-w-[18ch] 2xl:max-w-[18ch] ${protocolTitleClass}`}>
                        The {displayTitle} <span className="text-gradient">{headlineSuffix}.</span>
                     </h2>
                     
                     <p className="mb-4 min-h-[78px] px-0 text-[1.05rem] sm:text-xl md:min-h-[120px] md:text-2xl lg:min-h-[78px] lg:text-[0.96rem] xl:min-h-[88px] xl:text-[1.08rem] 2xl:min-h-[120px] 2xl:text-2xl dark:text-gray-400 text-slate-600 font-light leading-relaxed tracking-tight max-w-xl">
                        {activeService.desc}
                     </p>
                     
                     <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 w-full max-w-[19rem] sm:max-w-none lg:w-auto mb-6">
                        {activeService.features?.slice(0, 4).map((f, idx) => (
                           <div key={idx} className="flex items-center gap-4 justify-start group w-full">
                              <div className="w-10 h-10 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                 <Check size={18} />
                              </div>
                              <span className="text-[11px] font-black uppercase tracking-widest opacity-60 dark:text-white text-slate-900 group-hover:opacity-100 transition-opacity">{f}</span>
                           </div>
                        ))}
                     </div>

                     <div className="mt-auto pt-3 sm:pt-4 w-full flex justify-start overflow-visible">
                        <div className="hidden w-full max-w-[25rem] sm:max-w-none sm:flex sm:items-center sm:justify-center sm:gap-4 lg:gap-2.5 xl:gap-3.5 2xl:gap-8 px-2 sm:px-0">
                           <button onClick={prev} className="w-11 h-11 sm:w-16 sm:h-16 lg:w-10 lg:h-10 xl:w-11 xl:h-11 2xl:w-[4.5rem] 2xl:h-[4.5rem] rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white hover:border-primary/50 hover:text-primary dark:hover:text-primary transition-all duration-700 shadow-xl group bg-white/80 dark:bg-white/5 hover:shadow-[0_0_30px_rgba(139,92,246,0.28)]">
                              <MoveLeft className="w-4 h-4 sm:w-6 sm:h-6 group-hover:-translate-x-1 group-hover:scale-110 transition-all duration-500" />
                           </button>
                        <button 
                           onClick={() => openService(servicesData[current])}
                           className="group flex items-center gap-3 sm:gap-6 lg:gap-2.5 xl:gap-3.5 2xl:gap-8 px-6 sm:px-10 lg:px-5 xl:px-7 2xl:px-16 py-4 sm:py-5 lg:py-2.5 xl:py-3 2xl:py-6 rounded-full bg-primary/10 hover:bg-primary transition-all duration-700 border border-primary/20 shadow-2xl relative overflow-hidden min-w-0 w-full sm:min-w-[300px] lg:min-w-[205px] xl:min-w-[230px] 2xl:min-w-[360px] justify-center"
                        >
                           <span className="text-[1.05rem] sm:text-2xl lg:text-[0.98rem] xl:text-[1.12rem] 2xl:text-3xl font-black font-heading tracking-tighter uppercase dark:text-white text-slate-950 group-hover:text-white transition-colors relative z-10 text-center leading-none">Go Deeper</span>
                           <div className="w-9 h-9 sm:w-14 sm:h-14 lg:w-8 lg:h-8 xl:w-9 xl:h-9 2xl:w-14 2xl:h-14 rounded-full bg-white/10 flex items-center justify-center text-primary group-hover:text-white transition-all duration-700 relative z-10 shrink-0">
                              <ArrowUpRight className="w-5 h-5 sm:w-8 sm:h-8 group-hover:translate-x-1 sm:group-hover:translate-x-2 group-hover:-translate-y-1 sm:group-hover:-translate-y-2 transition-transform duration-700" />
                           </div>
                        </button>
                           <button onClick={next} className="w-11 h-11 sm:w-16 sm:h-16 lg:w-10 lg:h-10 xl:w-11 xl:h-11 2xl:w-[4.5rem] 2xl:h-[4.5rem] rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white hover:border-primary/50 hover:text-primary dark:hover:text-primary transition-all duration-700 shadow-xl group bg-white/80 dark:bg-white/5 hover:shadow-[0_0_30px_rgba(139,92,246,0.28)]">
                              <MoveRight className="w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-500" />
                           </button>
                        </div>
                        <div className="flex items-center gap-2 sm:hidden">
                           <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-slate-700 shadow-lg dark:border-white/10 dark:bg-white/5 dark:text-white">
                              <MoveLeft className="h-4 w-4" />
                           </button>
                           <button onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-slate-700 shadow-lg dark:border-white/10 dark:bg-white/5 dark:text-white">
                              <MoveRight className="h-4 w-4" />
                           </button>
                           <button onClick={() => openService(servicesData[current])} className="group flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2.5 text-[0.9rem] font-black uppercase tracking-tight text-slate-950 shadow-xl dark:text-primary">
                              <span>Go Deeper</span>
                              <ArrowUpRight className="h-4 w-4" />
                           </button>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </AnimatePresence>
         </div>
      </div>

      <ServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        service={selectedService} 
      />
    </section>
  );
};

export default Services;
