import React, { useState } from 'react';
import { Mail, Phone, ArrowUpRight, MapPin } from 'lucide-react';
import ServiceModal from '../components/ServiceModal';
import { servicesData } from '../data/services';
import { socialLinks, companyPhoneDisplay, companyPhoneHref } from '../data/contact';
import { handleScrollTo } from '../utils/scrollTo';

const Footer = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openService = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <footer className="section-theme-mint flex min-h-screen items-center justify-center overflow-hidden border-t border-black/5 pb-10 pt-16 text-slate-900 dark:border-white/5 dark:text-light xl:pb-11 xl:pt-[4.5rem] 2xl:pb-12 2xl:pt-20">
      <div className="container laptop-scale-section relative z-10 mx-auto flex w-full flex-col justify-center px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-12 border-b border-black/5 pb-16 dark:border-white/5 lg:flex-row xl:mb-[4.5rem] xl:gap-14 xl:pb-[4.5rem] 2xl:mb-20 2xl:gap-16 2xl:pb-20">
          <div className="w-full max-w-md">
            <a href="#" onClick={(e) => handleScrollTo(e, '#')} className="group mb-10 flex items-center">
              <img src="/assets/Digiicare.png" alt="AI Automation" className="h-16 w-auto object-contain transition-transform group-hover:scale-105 md:h-20" />
            </a>
            <p className="mb-10 text-xl font-light leading-relaxed tracking-tight text-slate-600 dark:text-gray-400">
              We engineer intelligent workflows, AI copilots, and autonomous operating systems that turn manual chaos into measurable scale.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ label, href, image }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center transition-all duration-500 hover:-translate-y-1 md:h-16 md:w-16"
                >
                  <img src={image} alt={label} className="h-12 w-12 rounded-full object-cover shadow-md md:h-14 md:w-14" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,.8fr)_minmax(0,1fr)] lg:w-auto">
            <div className="min-w-0">
              <h4 className="mb-10 text-xs font-black uppercase tracking-widest text-slate-950/70 dark:text-white/70">Services</h4>
              <ul className="grid grid-cols-1 gap-x-12 gap-y-5 text-sm font-light sm:grid-cols-2">
                {servicesData.map((service) => (
                  <li key={service.title}>
                    <button onClick={() => openService(service)} className="inline-flex max-w-full text-left text-slate-800 transition-all duration-300 hover:text-primary dark:text-slate-300 font-bold uppercase tracking-tight leading-tight hover:-translate-y-0.5 hover:drop-shadow-[0_0_12px_rgba(41,211,255,0.3)]">
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-10 text-xs font-black uppercase tracking-widest text-slate-950/70 dark:text-white/70">Company</h4>
              <ul className="flex flex-col gap-6 text-sm font-light">
                <li><a href="#services" onClick={(e) => handleScrollTo(e, '#services')} className="inline-flex max-w-full font-bold uppercase tracking-tighter text-slate-800 transition-all duration-300 hover:text-primary dark:text-slate-300 hover:-translate-y-0.5 hover:drop-shadow-[0_0_12px_rgba(41,211,255,0.3)]">Automation Systems</a></li>
                <li><a href="#process" onClick={(e) => handleScrollTo(e, '#process')} className="inline-flex max-w-full font-bold uppercase tracking-tighter text-slate-800 transition-all duration-300 hover:text-primary dark:text-slate-300 hover:-translate-y-0.5 hover:drop-shadow-[0_0_12px_rgba(41,211,255,0.3)]">Delivery Framework</a></li>
                <li><a href="#our-work" onClick={(e) => handleScrollTo(e, '#our-work')} className="inline-flex max-w-full font-bold uppercase tracking-tighter text-slate-800 transition-all duration-300 hover:text-primary dark:text-slate-300 hover:-translate-y-0.5 hover:drop-shadow-[0_0_12px_rgba(41,211,255,0.3)]">Our Work</a></li>
                <li><a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="inline-flex max-w-full font-bold uppercase tracking-tighter text-slate-800 transition-all duration-300 hover:text-primary dark:text-slate-300 hover:-translate-y-0.5 hover:drop-shadow-[0_0_12px_rgba(41,211,255,0.3)]">Contact</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 xl:col-span-1">
              <h4 className="mb-10 text-xs font-black uppercase tracking-widest text-slate-950/70 dark:text-white/70">Ops Desk</h4>
              <div className="flex flex-col gap-4">
                <a href="https://maps.google.com/?q=BEST-CFO%2099%20Wallstreet%20New%20York%20NY%2010005" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-sm font-bold text-primary">
                  <MapPin size={18} /> BEST-CFO - 99 WALLSTREET, NEW YORK.NY 10005
                  <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <a href="mailto:info@theaisyndicates.com" className="group flex items-center gap-2 font-bold text-primary">
                  <Mail size={16} /> info@theaisyndicates.com
                  <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <a href={companyPhoneHref} className="group flex items-center gap-2 font-bold text-primary">
                  <Phone size={16} /> {companyPhoneDisplay}
                  <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 md:flex-row">
          <p>&copy; {new Date().getFullYear()} NeuroFlow AI Automation.</p>
          <div className="mt-6 flex gap-10 md:mt-0">
            <span className="rounded-full border border-black/10 px-4 py-2 text-[10px] tracking-[0.18em] dark:border-white/10">Data Security</span>
            <span className="rounded-full border border-black/10 px-4 py-2 text-[10px] tracking-[0.18em] dark:border-white/10">Automation Terms</span>
          </div>
        </div>
      </div>

      <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} service={selectedService} />
    </footer>
  );
};

export default Footer;
