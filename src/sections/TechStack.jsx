import React from 'react';

const technologies = [
  "Figma",
  "Adobe After Effects",
  "Spline 3D",
  "Lottie",
  "Webflow",
  "Framer",
  "Three.js",
  "GSAP",
  "Adobe Illustrator",
  "Photoshop",
  "Maya",
  "Sketch",
  "ProtoPie",
  "SVG Pathing"
];

const TechStack = () => {
  const list = [...technologies, ...technologies];

  return (
    <section className="section py-16 xl:py-[4.5rem] 2xl:py-20 border-y border-black/[0.1] dark:border-white/[0.05] bg-slate-50 dark:bg-dark-bg overflow-hidden" id="tech">
      <div className="flex items-center space-x-12 animate-marquee whitespace-nowrap">
        {list.map((tech, idx) => (
          <div key={idx} className="flex items-center justify-center">
            <span className="px-9 xl:px-10 2xl:px-12 text-3xl md:text-5xl xl:text-[2.8rem] 2xl:text-5xl font-black uppercase tracking-tighter font-heading text-slate-300 dark:text-white/10 hover:text-primary dark:hover:text-primary transition-all duration-700">
              {tech}
            </span>
            <span className="mx-6 text-5xl text-secondary opacity-30">&bull;</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
