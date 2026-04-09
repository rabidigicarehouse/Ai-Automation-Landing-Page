import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, ArrowUpRight, Bot } from 'lucide-react';
import logo from '../assets/Digiicare.png';
import ServiceModal from '../components/ServiceModal';
import { servicesData } from '../data/services';
import { handleScrollTo } from '../utils/scrollTo';

const Footer = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openService = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "https://www.facebook.com/digicarehouseagency" },
    { icon: <Instagram size={20} />, href: "https://www.instagram.com/digicarehouseagency/" },
    { icon: <Youtube size={20} />, href: "https://www.youtube.com/@digicarehouseagency" },
    { icon: <Linkedin size={20} />, href: "http://linkedin.com/company/digicarehouseagency" },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-light border-t border-black/5 dark:border-white/5 pt-16 xl:pt-[4.5rem] 2xl:pt-20 pb-10 xl:pb-11 2xl:pb-12 overflow-hidden min-h-screen flex items-center">
      <div className="container laptop-scale-section mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 xl:gap-14 2xl:gap-16 mb-16 xl:mb-[4.5rem] 2xl:mb-20 border-b border-black/5 dark:border-white/5 pb-16 xl:pb-[4.5rem] 2xl:pb-20">
          <div className="max-w-md w-full">
            <a href="#" onClick={(e) => handleScrollTo(e, '#')} className="flex items-center group mb-10">
              <div className="hidden relative h-14 w-14 items-center justify-center rounded-[1.4rem] border border-primary/30 bg-[linear-gradient(145deg,rgba(41,211,255,0.16),rgba(109,124,255,0.16),rgba(139,255,176,0.14))] shadow-[0_0_36px_rgba(41,211,255,0.18)] transition-transform group-hover:scale-105">
                <Bot className="h-7 w-7 text-primary" />
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-teal shadow-[0_0_18px_rgba(139,255,176,0.7)]" />
              </div>
              <img src={logo} alt="AI Automation" className="h-16 md:h-20 w-auto object-contain transition-transform group-hover:scale-105" />
            </a>
            <p className="text-xl font-light dark:text-gray-400 text-slate-600 leading-relaxed mb-10 tracking-tight">
              We engineer intelligent workflows, AI copilots, and autonomous operating systems that turn manual chaos into measurable scale.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-500"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,.8fr)_minmax(0,1fr)] gap-12 w-full lg:w-auto">
            <div className="min-w-0">
              <h4 className="dark:text-white/70 text-slate-950/70 font-black uppercase text-xs tracking-widest mb-10">Services</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5 text-sm font-light">
                {servicesData.map((s, i) => (
                  <li key={i}>
                    <button onClick={() => openService(s)} className="inline-flex max-w-full text-slate-800 dark:text-slate-300 hover:text-primary transition-all text-left uppercase font-bold tracking-tight duration-300 leading-tight hover:-translate-y-0.5 hover:drop-shadow-[0_0_12px_rgba(41,211,255,0.3)]">
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="dark:text-white/70 text-slate-950/70 font-black uppercase text-xs tracking-widest mb-10">Company</h4>
              <ul className="flex flex-col gap-6 text-sm font-light">
                <li><a href="#services" onClick={(e) => handleScrollTo(e, '#services')} className="inline-flex max-w-full text-slate-800 dark:text-slate-300 hover:text-primary transition-all uppercase font-bold tracking-tighter duration-300 hover:-translate-y-0.5 hover:drop-shadow-[0_0_12px_rgba(41,211,255,0.3)]">Automation Systems</a></li>
                <li><a href="#process" onClick={(e) => handleScrollTo(e, '#process')} className="inline-flex max-w-full text-slate-800 dark:text-slate-300 hover:text-primary transition-all uppercase font-bold tracking-tighter duration-300 hover:-translate-y-0.5 hover:drop-shadow-[0_0_12px_rgba(41,211,255,0.3)]">Delivery Framework</a></li>
                <li><a href="#work" onClick={(e) => handleScrollTo(e, '#work')} className="inline-flex max-w-full text-slate-800 dark:text-slate-300 hover:text-primary transition-all uppercase font-bold tracking-tighter duration-300 hover:-translate-y-0.5 hover:drop-shadow-[0_0_12px_rgba(41,211,255,0.3)]">Automation Use Cases</a></li>
                <li><a href="#pricing" onClick={(e) => handleScrollTo(e, '#pricing')} className="inline-flex max-w-full text-slate-800 dark:text-slate-300 hover:text-primary transition-all uppercase font-bold tracking-tighter duration-300 hover:-translate-y-0.5 hover:drop-shadow-[0_0_12px_rgba(41,211,255,0.3)]">Programs</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 xl:col-span-1">
              <h4 className="dark:text-white/70 text-slate-950/70 font-black uppercase text-xs tracking-widest mb-10">Ops Desk</h4>
              <p className="font-light text-slate-600 dark:text-gray-400 text-lg mb-8 leading-relaxed italic">
                Remote-first automation partner <br />
                Shipping globally, 24/7
              </p>
              <div className="flex flex-col gap-4">
                <a href="mailto:info@theaisyndicates.com" className="flex items-center gap-2 group text-primary font-bold">
                  <Mail size={16} /> info@theaisyndicates.com
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="tel:+18886247689" className="flex items-center gap-2 group text-primary font-bold">
                  <Phone size={16} /> +1 (888) 624 7689
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs font-black tracking-widest uppercase text-slate-500 dark:text-slate-500">
          <p>&copy; {new Date().getFullYear()} NeuroFlow AI Automation.</p>
          <div className="flex gap-10 mt-6 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Data Security</a>
            <a href="#" className="hover:text-primary transition-colors">Automation Terms</a>
          </div>
        </div>
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </footer>
  );
};

export default Footer;
