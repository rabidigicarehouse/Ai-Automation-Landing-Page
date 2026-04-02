import React, { useLayoutEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Services from './sections/Services';
import TechStack from './sections/TechStack';
import Portfolio from './sections/Portfolio';
import Process from './sections/Process';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import CTA from './sections/CTA';
import Pricing from './sections/Pricing';
import Footer from './sections/Footer';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useLayoutEffect(() => {
    let cleanupPanelStarts = null;
    let ctx = gsap.context(() => {
      gsap.fromTo("body", { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.inOut" });

      const panels = gsap.utils.toArray('.panel-shell');
      const tops = panels.map((panel) =>
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
        })
      );

      panels.forEach((panel, index) => {
        ScrollTrigger.create({
          trigger: panel,
          start: () => (panel.offsetHeight < window.innerHeight ? 'top top' : 'bottom bottom'),
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
          id: `panel-pin-${index}`,
        });
      });

      const updatePanelStarts = () => {
        window.__panelStarts = tops.reduce((acc, st) => {
          const panelId = st.trigger?.dataset?.panelId;
          if (panelId) {
            acc[panelId] = st.start;
          }
          return acc;
        }, {});
      };

      updatePanelStarts();
      ScrollTrigger.addEventListener('refresh', updatePanelStarts);
      cleanupPanelStarts = () => {
        ScrollTrigger.removeEventListener('refresh', updatePanelStarts);
        delete window.__panelStarts;
      };
    });
    return () => {
      cleanupPanelStarts?.();
      ctx.revert();
    };
  }, []);

  const sections = [
    { id: 'hero', node: <Hero key="hero" /> },
    { id: 'services', node: <Services key="services" /> },
    { id: 'tech', node: <TechStack key="tech-stack" /> },
    { id: 'work', node: <Portfolio key="portfolio" /> },
    { id: 'cta', node: <CTA key="cta" /> },
    { id: 'pricing', node: <Pricing key="pricing" /> },
    { id: 'process', node: <Process key="process" /> },
    { id: 'testimonials', node: <Testimonials key="testimonials" /> },
    { id: 'contact', node: <Contact key="contact" /> },
    { id: 'footer', node: <Footer key="footer" /> },
  ];

  return (
    <SmoothScroll>
    <CustomCursor />
    <div className="relative w-full dark:bg-dark-bg bg-slate-50 min-h-screen dark:text-[#eef4ff] text-slate-900 transition-colors duration-300">
      {/* Background glowing orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/12 blur-[150px]" />
        <div className="absolute top-[35%] right-[-10%] w-[30%] h-[40%] rounded-full bg-secondary/12 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-teal/10 blur-[130px]" />
        <div className="absolute inset-0 ai-grid opacity-50 dark:opacity-30" />
      </div>

      <Navbar />
      
      <main className="flex flex-col items-center justify-center w-full">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="panel-shell w-full relative"
            style={{ zIndex: index + 1 }}
            data-panel-id={section.id}
          >
            {section.node}
          </div>
        ))}
      </main>
    </div>
    </SmoothScroll>
  );
}

export default App;
