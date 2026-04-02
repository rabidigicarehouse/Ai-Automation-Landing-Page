import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Bot } from 'lucide-react';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import { handleScrollTo } from '../utils/scrollTo';
import logo from '../assets/Digiicare.png';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'Process', href: '#process' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'dark:bg-dark-bg/80 bg-white/80 backdrop-blur-3xl py-4 shadow-xl border-b border-black/5 dark:border-white/5' : 'bg-transparent py-8'
        }`}
    >
      <div className="container mx-auto px-5 sm:px-6 flex items-center justify-between">
        
        {/* Brand Identity */}
        <a href="#" onClick={(e) => handleScrollTo(e, '#')} className="flex items-center group relative">
          <div className="hidden relative h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-[linear-gradient(145deg,rgba(41,211,255,0.16),rgba(109,124,255,0.16),rgba(139,255,176,0.14))] shadow-[0_0_30px_rgba(41,211,255,0.16)] transition-all duration-700 group-hover:scale-105 group-hover:rotate-6">
            <Bot className="h-6 w-6 text-primary" />
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-teal shadow-[0_0_18px_rgba(139,255,176,0.65)]" />
          </div>
          <img src={logo} alt="AI Automation" className="h-11 sm:h-14 md:h-16 w-auto object-contain transition-all duration-700 group-hover:scale-105" />
        </a>

        {/* Agency Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="group relative text-[10px] font-black uppercase tracking-[0.2em] dark:text-gray-400 text-slate-600 dark:hover:text-primary hover:text-primary transition-all duration-500 overflow-hidden"
            >
              <span className="block group-hover:-translate-y-full transition-transform duration-500">{link.name}</span>
              <span className="absolute top-full left-0 block text-primary transition-transform duration-500 group-hover:-translate-y-full">{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Action Center */}
        <div className="flex items-center gap-4">
           <ThemeToggle />
           <div className="hidden lg:block border-l border-black/10 dark:border-white/10 h-6 mx-2" />
           <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="hidden sm:block">
             <Button variant="primary" className="text-[10px] font-black tracking-widest uppercase px-8 py-3 rounded-full hover:scale-110 shadow-lg shadow-primary/20 group">
               Connect Us <ArrowUpRight className="ml-2 w-4 h-4 group-hover:rotate-45 transition-transform" />
             </Button>
           </a>
           
           {/* Mobile Menu Trigger */}
           <button
             className="lg:hidden flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-white/80 text-slate-700 shadow-lg backdrop-blur-2xl transition-all hover:border-primary/20 hover:text-primary active:scale-90 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
           >
             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </div>
      </div>

      {/* Cinematic Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-0 left-0 z-[100] h-screen w-full bg-white p-4 dark:bg-dark-bg lg:hidden"
          >
            <div className="mx-auto flex h-full w-full max-w-sm flex-col rounded-[2rem] border border-black/5 bg-white px-6 pb-8 pt-20 shadow-[0_30px_80px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-[#07101d]">
            <div className="absolute top-7 right-7">
               <button onClick={() => setMobileMenuOpen(false)} className="flex h-14 w-14 items-center justify-center rounded-full border border-black/5 bg-slate-100/90 text-slate-700 shadow-lg transition-all hover:text-primary dark:border-white/10 dark:bg-white/5 dark:text-white"><X size={30} /></button>
            </div>

            <div className="mb-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-primary">Navigate</span>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />
            </div>

            <div className="flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="group flex items-center justify-between rounded-[1.4rem] border border-black/5 bg-slate-50/90 px-5 py-4 text-[2.15rem] font-black font-heading tracking-tighter uppercase text-slate-950 transition-all hover:border-primary/20 hover:bg-primary/5 hover:text-primary dark:border-white/8 dark:bg-white/[0.03] dark:text-white dark:hover:text-primary"
                  onClick={(e) => { handleScrollTo(e, link.href); setMobileMenuOpen(false); }}
               >
                  <span>{link.name}</span>
                  <ArrowUpRight className="h-6 w-6 translate-x-0 opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                </motion.a>
              ))}
            </div>

            <a href="#contact" onClick={(e) => { handleScrollTo(e, '#contact'); setMobileMenuOpen(false); }} className="mt-6 block sm:hidden">
              <Button variant="primary" className="w-full justify-center rounded-full px-8 py-4 text-[10px] font-black tracking-[0.24em] uppercase">
                Connect Us <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </a>

            <div className="mt-auto flex flex-col gap-4 border-t border-black/5 pt-7 dark:border-white/5">
               <a href="tel:+18483843773" className="text-2xl font-black tracking-tight text-primary">+1 (848) 384 3773</a>
               <p className="max-w-[20rem] text-sm font-light leading-relaxed text-slate-500 dark:text-gray-500">Deploying automation systems and AI workflows globally.</p>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
