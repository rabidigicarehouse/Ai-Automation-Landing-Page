import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { companyPhoneHref, socialLinks, stickyBarClass, stickyCallLabel } from '../data/contact';

const FloatingContact = () => {
  const [hideRail, setHideRail] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setHideRail(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={`fixed bottom-24 right-3 z-40 flex flex-col gap-3 transition-all duration-300 md:bottom-8 md:right-5 xl:right-6 ${hideRail ? 'pointer-events-none translate-y-6 opacity-0' : 'opacity-100'}`}>
        {socialLinks.map(({ label, href, image }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-14 w-14 items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-105 md:h-12 md:w-12 xl:h-14 xl:w-14"
          >
            <img src={image} alt={label} className="h-12 w-12 rounded-full object-cover shadow-lg md:h-10 md:w-10 xl:h-12 xl:w-12" />
          </a>
        ))}
      </div>

      <a
        href={companyPhoneHref}
        className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 border-t border-white/10 px-5 py-4 text-white shadow-[0_-10px_30px_rgba(15,23,42,0.28)] md:hidden ${stickyBarClass}`}
      >
        <Phone size={18} />
        <span className="text-[12px] font-black uppercase tracking-[0.2em]">{stickyCallLabel}</span>
      </a>
    </>
  );
};

export default FloatingContact;
