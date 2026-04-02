import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Fingerprint, Quote } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

import matthewImg from '../assets/Testimonials_clients/Matthew.png';
import rickImg from '../assets/Testimonials_clients/Rick cruz.jpeg';
import amandaImg from '../assets/Testimonials_clients/Amanda.jpg';
import georgeImg from '../assets/Testimonials_clients/George.jpeg';
import googleLogo from '../assets/google.png';
import verifiedBadge from '../assets/verified.png';

const testimonials = [
  {
    name: "Matthew Jacobs",
    role: "Founder, Health Beyond Hype",
    text: "Their AI follow-up system cut response lag immediately and gave our team a far cleaner sales workflow.",
    image: matthewImg
  },
  {
    name: "Rick Cruz",
    role: "Founder, Bestway RV",
    text: "What used to take multiple people now runs through one automation layer. The operational lift was huge.",
    image: rickImg
  },
  {
    name: "Amanda Parsi",
    role: "Operations Lead, Gateway Co.",
    text: "They translated our messy process map into a clean agent workflow the team actually trusts and uses every day.",
    image: amandaImg
  },
  {
    name: "George Grombacher",
    role: "Founder, Lifeblood",
    text: "The combination of strategy, systems thinking, and execution made this feel like a real operating upgrade, not a demo.",
    image: georgeImg
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent(curr => (curr === testimonials.length - 1 ? 0 : curr + 1));
  const prev = () => setCurrent(curr => (curr === 0 ? testimonials.length - 1 : curr - 1));

  return (
    <section className="section py-32 bg-slate-50 dark:bg-dark-bg overflow-hidden" id="testimonials">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row items-center gap-20">
           
           {/* Left Info Panel */}
           <div className="w-full lg:w-1/3 text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center mb-8"
              >
                <img src={googleLogo} alt="Google" className="h-10 w-auto object-contain" />
              </motion.div>
              <h2 className="text-6xl font-black font-heading tracking-tighter uppercase mb-10 dark:text-white text-slate-950 leading-[0.8]">
                 Proven <br />
                 <span className="text-gradient italic">Outcomes.</span>
              </h2>
              <p className="text-xl dark:text-gray-400 text-slate-600 font-light leading-relaxed mb-10 tracking-tight">
                 Teams trust us because the systems go live, the automations hold up, and the business impact is visible fast.
              </p>
              
              <div className="flex gap-4">
                <button onClick={prev} className="w-16 h-16 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 shadow-xl group">
                   <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <button onClick={next} className="w-16 h-16 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 shadow-xl group">
                   <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
           </div>

           {/* Right Carousel Panel */}
           <div className="w-full lg:w-2/3 relative">
              <div className="absolute -inset-10 bg-primary/10 blur-[100px] -z-10 rounded-full animate-pulse" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                   <div className="relative p-12 md:p-20 rounded-[4rem] dark:bg-dark-card/60 bg-white border border-black/5 dark:border-white/5 shadow-2xl overflow-hidden group">
                      <Quote className="absolute top-10 right-10 text-primary opacity-20 group-hover:opacity-40 transition-opacity duration-700 w-24 h-24" />
                      
                      <div className="flex items-center gap-4 mb-10">
                        <div className="flex gap-1">
                           {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-primary text-primary" />)}
                        </div>
                        <img src={verifiedBadge} alt="Verified" className="w-6 h-6 object-contain" />
                      </div>

                      <p className="text-2xl md:text-4xl dark:text-white text-slate-950 font-black italic leading-[1.1] mb-12 tracking-tighter uppercase">
                         "{testimonials[current].text}"
                      </p>

                      <div className="flex items-center gap-6 mt-auto">
                        <img 
                           src={testimonials[current].image} 
                           alt={testimonials[current].name} 
                           className="w-20 h-20 rounded-3xl object-cover shadow-2xl border-2 border-primary/20"
                        />
                        <div>
                           <h4 className="text-2xl font-black dark:text-white text-slate-950 font-heading tracking-tighter uppercase leading-none mb-2">{testimonials[current].name}</h4>
                           <p className="text-xs font-black tracking-widest uppercase dark:text-gray-500 text-slate-400 opacity-60">{testimonials[current].role}</p>
                        </div>
                      </div>
                   </div>
                </motion.div>
              </AnimatePresence>
           </div>

        </div>

        {/* Mobile Tracker Icons */}
        <div className="flex items-center justify-center mt-12 gap-4">
           {testimonials.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-700 ${i === current ? 'w-20 bg-primary' : 'w-4 bg-slate-300 dark:bg-white/10'}`} 
              />
           ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
