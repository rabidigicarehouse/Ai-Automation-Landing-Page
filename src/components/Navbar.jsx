import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Bot, Sparkles, Palette, Code2 } from 'lucide-react';
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
  const [creativeOpen, setCreativeOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const creativeRef = useRef(null);
  const designPageUrl = import.meta.env.VITE_DESIGN_PAGE_URL || 'http://localhost:5173';
  const developmentPageUrl = import.meta.env.VITE_DEVELOPMENT_PAGE_URL || 'http://localhost:5175';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDarkMode(root.classList.contains('dark'));

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (creativeRef.current && !creativeRef.current.contains(event.target)) {
        setCreativeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const headerOnHero = !isScrolled;
  const desktopNavTextClass = headerOnHero || isDarkMode ? 'text-white' : 'text-slate-700';
  const switchButtonClass = headerOnHero
    ? 'border-primary/15 bg-white/[0.04] text-white'
    : isDarkMode
      ? 'border-primary/15 bg-white/[0.04] text-white'
      : 'border-primary/15 bg-white/92 text-slate-800';
  const switchButtonTitleClass = headerOnHero || isDarkMode ? 'text-white' : 'text-slate-800';

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'dark:bg-dark-bg/80 bg-white/80 backdrop-blur-3xl py-3 lg:py-2.25 xl:py-2.75 shadow-xl border-b border-black/5 dark:border-white/5' : 'bg-transparent py-6 lg:py-3.25 xl:py-4.25 2xl:py-8'
        }`}
    >
      <div className="container laptop-scale-navbar mx-auto px-5 sm:px-6 lg:pl-10 lg:pr-6 xl:pl-12 xl:pr-7 2xl:px-6 flex items-center justify-between">
        
        {/* Brand Identity - ENLARGED LOGO */}
        <a href="#" onClick={(e) => handleScrollTo(e, '#')} className="flex items-center group relative lg:ml-2 xl:ml-3">
          <div className="hidden relative h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-[linear-gradient(145deg,rgba(41,211,255,0.16),rgba(109,124,255,0.16),rgba(139,255,176,0.14))] shadow-[0_0_30px_rgba(41,211,255,0.16)] transition-all duration-700 group-hover:scale-105 group-hover:rotate-6">
            <Bot className="h-6 w-6 text-primary" />
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-teal shadow-[0_0_18px_rgba(139,255,176,0.65)]" />
          </div>
          <img src={logo} alt="AI Automation" className="h-14 sm:h-16 md:h-[4.5rem] lg:h-[2.8rem] xl:h-[3.2rem] 2xl:h-[3.8rem] max-w-[220px] lg:max-w-[200px] xl:max-w-[240px] 2xl:max-w-[280px] w-auto object-contain object-left transition-all duration-700 group-hover:scale-105" />
        </a>

        {/* Agency Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-[1.35rem] xl:gap-[1.8rem] 2xl:gap-10 lg:ml-auto xl:ml-auto lg:mr-2 xl:mr-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={`group relative overflow-hidden text-[7px] xl:text-[8px] 2xl:text-[10px] font-black uppercase tracking-[0.13em] xl:tracking-[0.17em] 2xl:tracking-[0.2em] transition-all duration-500 hover:text-primary dark:hover:text-primary ${desktopNavTextClass}`}
            >
              <span className="block group-hover:-translate-y-full transition-transform duration-500">{link.name}</span>
              <span className="absolute top-full left-0 block text-primary transition-transform duration-500 group-hover:-translate-y-full">{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Action Center */}
        <div className="flex items-center gap-4 lg:gap-3.5 xl:gap-4.5">
           <ThemeToggle />
           <div className={`hidden lg:block h-6 xl:h-7 mx-1.5 border-l ${isScrolled ? 'border-black/10 dark:border-white/10' : 'border-white/12'}`} />
           <div ref={creativeRef} className="relative hidden lg:block">
             <motion.button
               whileHover={{ y: -2 }}
               whileTap={{ scale: 0.98 }}
               onClick={() => setCreativeOpen((prev) => !prev)}
              className={`group relative inline-flex items-center gap-2.5 xl:gap-3 overflow-hidden rounded-full border px-3.5 xl:px-4.5 py-2 lg:py-2 xl:py-2.25 2xl:py-3 text-[6.25px] xl:text-[7.25px] 2xl:text-[10px] font-black uppercase tracking-[0.12em] xl:tracking-[0.16em] shadow-[0_18px_50px_rgba(15,23,42,0.16)] transition-all duration-500 backdrop-blur-2xl hover:border-primary/35 hover:shadow-[0_0_30px_rgba(41,211,255,0.22)] ${switchButtonClass}`}
             >
               <span className="absolute inset-0 bg-[linear-gradient(115deg,rgba(41,211,255,0.12),rgba(109,124,255,0.14),rgba(139,255,176,0.12))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative flex h-6 w-6 xl:h-7 xl:w-7 2xl:h-9 2xl:w-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(41,211,255,0.28)]">
                <Sparkles className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
              </span>
              <span className="relative flex flex-col items-start leading-none">
                <span className="text-[5.25px] xl:text-[6.25px] 2xl:text-[9px] font-black tracking-[0.16em] xl:tracking-[0.2em] text-primary/80">Switch To</span>
                <span className={`mt-1 text-[6.25px] xl:text-[7.25px] 2xl:text-[10px] font-black tracking-[0.1em] xl:tracking-[0.14em] ${switchButtonTitleClass}`}>The Design Hands</span>
              </span>
               <ArrowUpRight className={`relative h-4 w-4 text-primary transition-transform duration-500 ${creativeOpen ? 'rotate-45' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
             </motion.button>

             <AnimatePresence>
               {creativeOpen && (
                 <motion.div
                   initial={{ opacity: 0, y: 14, scale: 0.96 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: 12, scale: 0.97 }}
                   transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                   className="absolute right-0 top-[calc(100%+16px)] w-[320px] rounded-[2rem] border border-primary/15 bg-white/95 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:bg-[#07101d]/95"
                 >
                   <div className="mb-3 flex items-center gap-2 px-2">
                     <div className="h-px flex-1 bg-gradient-to-r from-primary/0 via-primary/35 to-primary/0" />
                     <span className="text-[9px] font-black uppercase tracking-[0.35em] text-primary">Creative Routes</span>
                     <div className="h-px flex-1 bg-gradient-to-r from-primary/0 via-primary/35 to-primary/0" />
                   </div>

                   <div className="grid gap-3">
                     <a
                       href={designPageUrl}
                       className="group flex items-center justify-between rounded-[1.5rem] border border-black/5 bg-slate-50/90 px-4 py-4 transition-all duration-500 hover:border-primary/25 hover:bg-primary/5 dark:border-white/8 dark:bg-white/[0.03]"
                     >
                       <span className="flex items-center gap-3">
                         <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-[0_0_22px_rgba(41,211,255,0.12)]">
                           <Palette className="h-5 w-5" />
                         </span>
                         <span className="flex flex-col">
                         <span className="text-sm font-black uppercase tracking-[0.18em] text-slate-900 dark:text-white">The Design Hands</span>
                           <span className="text-[11px] font-medium tracking-[0.08em] text-slate-500 dark:text-gray-400">Brand, UI/UX, and web art direction</span>
                         </span>
                       </span>
                       <ArrowUpRight className="h-5 w-5 text-primary transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                     </a>

                     <a
                       href={developmentPageUrl}
                       className="group flex items-center justify-between rounded-[1.5rem] border border-black/5 bg-slate-50/90 px-4 py-4 transition-all duration-500 hover:border-primary/25 hover:bg-primary/5 dark:border-white/8 dark:bg-white/[0.03]"
                     >
                       <span className="flex items-center gap-3">
                         <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10 text-secondary shadow-[0_0_22px_rgba(109,124,255,0.12)]">
                           <Code2 className="h-5 w-5" />
                         </span>
                         <span className="flex flex-col">
                         <span className="text-sm font-black uppercase tracking-[0.18em] text-slate-900 dark:text-white">The Tech Synidicate</span>
                           <span className="text-[11px] font-medium tracking-[0.08em] text-slate-500 dark:text-gray-400">Builds, systems, and product delivery</span>
                         </span>
                       </span>
                       <ArrowUpRight className="h-5 w-5 text-primary transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                     </a>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
           <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="hidden sm:block">
             <Button variant="primary" className="text-[6.25px] xl:text-[7.25px] 2xl:text-[10px] font-black tracking-[0.12em] xl:tracking-[0.15em] 2xl:tracking-widest uppercase px-4 xl:px-5 2xl:px-8 py-2 lg:py-2 xl:py-2.25 2xl:py-3 rounded-full hover:scale-110 shadow-lg shadow-primary/20 group">
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
            <div className="mx-auto flex h-full w-full max-w-sm flex-col rounded-[2rem] border border-black/5 bg-white px-6 pb-8 pt-6 shadow-[0_30px_80px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-[#07101d]">
            <div className="mb-6 flex items-center gap-2">
              <a href={designPageUrl} className="group inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-black/5 bg-slate-50/95 px-3 py-2.5 text-slate-900 shadow-lg transition-all duration-500 hover:border-primary/20 hover:text-primary dark:border-white/10 dark:bg-white/[0.04] dark:text-white">
                <Palette className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate text-[8px] font-black uppercase tracking-[0.14em]">The Design Hands</span>
              </a>
              <a href={developmentPageUrl} className="group inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-black/5 bg-slate-50/95 px-3 py-2.5 text-slate-900 shadow-lg transition-all duration-500 hover:border-secondary/20 hover:text-secondary dark:border-white/10 dark:bg-white/[0.04] dark:text-white">
                <Code2 className="h-4 w-4 text-secondary shrink-0" />
                <span className="truncate text-[8px] font-black uppercase tracking-[0.14em]">The Tech Synidicate</span>
              </a>
              <button onClick={() => setMobileMenuOpen(false)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/5 bg-slate-100/90 text-slate-700 shadow-lg transition-all hover:text-primary dark:border-white/10 dark:bg-white/5 dark:text-white"><X size={19} /></button>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;