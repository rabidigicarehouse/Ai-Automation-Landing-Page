import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import { handleScrollTo } from '../utils/scrollTo';
import logo from '../assets/Digiicare.png';
import { assetSrc } from '../utils/assetSrc';

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
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  const headerOnHero = !isScrolled;
  const desktopNavTextClass = headerOnHero || isDarkMode ? 'text-white' : 'text-slate-700';
  const dividerClass = headerOnHero ? 'border-white/12' : 'border-black/10 dark:border-white/10';

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-700 ${
        isScrolled
          ? 'border-b border-black/5 bg-white/80 py-3 shadow-xl backdrop-blur-3xl dark:border-white/5 dark:bg-dark-bg/80 lg:py-2.25 xl:py-2.75'
          : 'bg-transparent py-6 lg:py-3.25 xl:py-4.25 2xl:py-8'
      }`}
    >
      <div className="container laptop-scale-navbar mx-auto flex items-center justify-between px-5 sm:px-6 lg:pl-10 lg:pr-6 xl:pl-12 xl:pr-7 2xl:px-6">
        <a href="#" onClick={(e) => handleScrollTo(e, '#')} className="group relative flex items-center lg:ml-2 xl:ml-3">
          <img src={assetSrc(logo)} alt="AI Automation" className="h-14 w-auto max-w-[220px] object-contain object-left transition-all duration-700 group-hover:scale-105 sm:h-16 md:h-[4.5rem] lg:h-[2.8rem] lg:max-w-[200px] xl:h-[3.2rem] xl:max-w-[240px] 2xl:h-[3.8rem] 2xl:max-w-[280px]" />
        </a>

        <nav className="hidden items-center gap-[1.35rem] lg:ml-auto lg:mr-2 lg:flex xl:mr-3 xl:gap-[1.8rem] 2xl:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={`group relative overflow-hidden text-[7px] font-black uppercase tracking-[0.13em] transition-all duration-500 hover:text-primary dark:hover:text-primary xl:text-[8px] xl:tracking-[0.17em] 2xl:text-[10px] 2xl:tracking-[0.2em] ${desktopNavTextClass}`}
            >
              <span className="block transition-transform duration-500 group-hover:-translate-y-full">{link.name}</span>
              <span className="absolute left-0 top-full block text-primary transition-transform duration-500 group-hover:-translate-y-full">{link.name}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 lg:gap-3.5 xl:gap-4.5">
          <ThemeToggle />
          <div className={`mx-1.5 hidden h-6 border-l lg:block xl:h-7 ${dividerClass}`} />
          <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="hidden sm:block">
            <Button variant="primary" className="group rounded-full px-4 py-2 text-[6.25px] font-black uppercase tracking-[0.12em] shadow-lg shadow-primary/20 hover:scale-110 lg:py-2 xl:px-5 xl:py-2.25 xl:text-[7.25px] xl:tracking-[0.15em] 2xl:px-8 2xl:py-3 2xl:text-[10px] 2xl:tracking-widest">
              Connect Us <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:rotate-45" />
            </Button>
          </a>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-white/80 text-slate-700 shadow-lg backdrop-blur-2xl transition-all hover:border-primary/20 hover:text-primary active:scale-90 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 lg:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-0 z-[100] h-screen w-full bg-white p-4 dark:bg-dark-bg lg:hidden"
          >
            <div className="mx-auto flex h-full w-full max-w-sm flex-col rounded-[2rem] border border-black/5 bg-white px-6 pb-8 pt-6 shadow-[0_30px_80px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-[#07101d]">
              <div className="mb-6 flex items-center justify-between gap-2">
                <img src={assetSrc(logo)} alt="AI Automation" className="h-12 w-auto object-contain" />
                <button onClick={() => setMobileMenuOpen(false)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/5 bg-slate-100/90 text-slate-700 shadow-lg transition-all hover:text-primary dark:border-white/10 dark:bg-white/5 dark:text-white">
                  <X size={19} />
                </button>
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
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="group flex items-center justify-between rounded-[1.4rem] border border-black/5 bg-slate-50/90 px-5 py-4 text-[2.15rem] font-black uppercase tracking-tighter text-slate-950 transition-all hover:border-primary/20 hover:bg-primary/5 hover:text-primary dark:border-white/8 dark:bg-white/[0.03] dark:text-white dark:hover:text-primary"
                    onClick={(e) => {
                      handleScrollTo(e, link.href);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-6 w-6 translate-x-0 opacity-50 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100" />
                  </motion.a>
                ))}
              </div>

              <a href="#contact" onClick={(e) => { handleScrollTo(e, '#contact'); setMobileMenuOpen(false); }} className="mt-6 block sm:hidden">
                <Button variant="primary" className="w-full justify-center rounded-full px-8 py-4 text-[10px] font-black uppercase tracking-[0.24em]">
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
