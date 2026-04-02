import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Eye, Bot, ShieldCheck } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const steps = [
  { icon: <Search />, title: "Audit", desc: "Mapping current tools, bottlenecks, handoffs, and repetitive work across your operation." },
  { icon: <Zap />, title: "System Design", desc: "Architecting the ideal automation flow, agent logic, and integration pathways." },
  { icon: <Eye />, title: "Data Mapping", desc: "Structuring inputs, outputs, routing rules, and observability across the stack." },
  { icon: <Bot />, title: "Agent Build", desc: "Deploying copilots, automations, and decision loops that execute real work." },
  { icon: <ShieldCheck />, title: "Optimize", desc: "Hardening guardrails, QA, analytics, and ongoing iteration for production scale." }
];

const Process = () => {
  return (
    <section className="section bg-slate-50 dark:bg-dark-bg overflow-hidden" id="process">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Automation Delivery Framework" title="Built To Run" centered />

        <div className="mt-24 relative">
          {/* Static Centered Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-0 w-full px-20 pointer-events-none -z-0">
             <div className="h-[1px] w-full border-t-2 border-dashed border-slate-200 dark:border-white/10 opacity-30" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.02,
                  transition: { duration: 0.4, ease: "easeOut" } 
                }}
                className="relative flex flex-col items-center text-center group p-8 rounded-[3rem] dark:bg-dark-card/40 bg-white border border-slate-200 dark:border-white/5 shadow-xl transition-all duration-500 z-10 hover:border-primary/50 overflow-hidden"
              >
                {/* Moving Gradient Highlight on Hover */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                
                <div className="w-20 h-20 rounded-3xl dark:bg-white/5 bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 z-10 border border-slate-200 dark:border-white/10 mb-8 shadow-sm">
                  {React.cloneElement(step.icon, { className: "w-8 h-8" })}
                </div>
                
                <h4 className="text-2xl font-black dark:text-white text-slate-900 mb-4 font-heading relative z-10 uppercase tracking-tighter leading-none">{step.title}</h4>
                <p className="text-sm dark:text-gray-400 text-slate-600 font-light leading-relaxed relative z-10 tracking-tight">{step.desc}</p>
                
                {/* Step number hint */}
                <span className="absolute -top-4 -right-2 text-7xl font-black opacity-[0.03] dark:group-hover:opacity-[0.1] group-hover:opacity-[0.05] transition-opacity font-heading">0{idx + 1}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
