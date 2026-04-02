import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Sparkles, ArrowRight, Bot, Gauge, Cpu, Building2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';

const pricingData = [
  {
    name: 'Launch',
    icon: <Bot className="h-9 w-9 text-primary" />,
    tagline: 'A focused automation build for one high-value workflow',
    monthly: 3500,
    annual: 2800,
    features: [
      { text: '1 Workflow Automation', included: true },
      { text: 'AI Intake or Routing Layer', included: true },
      { text: 'CRM / App Integration', included: true },
      { text: 'Operator Dashboard', included: true },
      { text: '2 Optimization Rounds', included: true },
      { text: 'Basic Analytics', included: true },
      { text: 'Multi-Agent Orchestration', included: false },
    ],
  },
  {
    name: 'Scale',
    icon: <Gauge className="h-9 w-9 text-secondary" />,
    tagline: 'Multi-step automation across the core revenue or operations loop',
    monthly: 7500,
    annual: 6000,
    features: [
      { text: 'Everything in Launch', included: true },
      { text: 'Cross-Team Workflow Design', included: true },
      { text: 'Agent-Assisted Qualification', included: true },
      { text: 'Approval & Escalation Logic', included: true },
      { text: 'Data Warehouse Sync', included: true },
      { text: 'Unlimited Iteration Window', included: true },
    ],
  },
  {
    name: 'Autopilot',
    icon: <Cpu className="h-9 w-9 text-teal" />,
    tagline: 'Advanced agent systems for teams ready to operationalize AI deeply',
    monthly: 15000,
    annual: 12000,
    popular: true,
    features: [
      { text: 'Everything in Scale', included: true },
      { text: 'Multi-Agent Architecture', included: true },
      { text: 'AI Copilot Deployment', included: true },
      { text: 'Autonomous Task Execution', included: true },
      { text: 'Observability & Alerts', included: true },
      { text: 'Dedicated Automation Lead', included: true },
    ],
  },
  {
    name: 'Command',
    icon: <Building2 className="h-9 w-9 text-slate-500 dark:text-slate-300" />,
    tagline: 'Enterprise automation transformation across teams, tools, and data',
    monthly: 'Custom',
    annual: 'Custom',
    features: [
      { text: 'Enterprise Automation Retainer', included: true },
      { text: 'Department-Wide AI Rollout', included: true },
      { text: 'Governance & Security Layer', included: true },
      { text: 'Custom Tooling & Integrations', included: true },
      { text: 'Change Management Support', included: true },
      { text: '90-Day Performance QA', included: true },
    ],
  },
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="section overflow-hidden bg-slate-50 py-32 dark:bg-dark-bg" id="pricing">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <SectionHeading title="Automation Programs" subtitle="Deployment Tiers" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 dark:bg-white/5 bg-black/5 backdrop-blur-3xl p-3 rounded-full border border-black/5 dark:border-white/10 mb-10 shadow-lg"
          >
            <button onClick={() => setIsAnnual(false)} className={`text-xs font-black tracking-widest uppercase px-6 py-2.5 rounded-full transition-all duration-500 ${!isAnnual ? 'bg-primary text-slate-950' : 'opacity-40 hover:opacity-100'}`}>
              Standard
            </button>
            <button onClick={() => setIsAnnual(true)} className={`text-xs font-black tracking-widest uppercase px-6 py-2.5 rounded-full transition-all duration-500 flex items-center gap-2 ${isAnnual ? 'bg-primary text-slate-950' : 'opacity-40 hover:opacity-100'}`}>
              Annual <span className="text-[10px] px-2 py-0.5 bg-white/20 rounded-full">-20%</span>
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {pricingData.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.8, ease: 'easeOut' }}
              className={`relative flex flex-col p-10 rounded-[4rem] border transition-all duration-700 hover:-translate-y-6 ${
                plan.popular
                  ? 'bg-white dark:bg-dark-card border-primary/40 shadow-2xl scale-105 z-10'
                  : 'dark:bg-dark-card/30 bg-white border-black/5 dark:border-white/5 hover:border-primary/20 shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest text-slate-950 shadow-lg flex items-center gap-2 z-10">
                  <Sparkles className="w-4 h-4" /> Most Requested
                </div>
              )}

              <div className="mb-12">
                <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-8 border border-black/5 dark:border-white/10 group-hover:rotate-12 transition-transform duration-700 shadow-sm">
                  {plan.icon}
                </div>
                <h3 className="text-3xl font-black font-heading tracking-tighter mb-4 text-slate-950 dark:text-white uppercase leading-none">{plan.name}</h3>
                <p className="text-xs dark:text-gray-400 text-slate-600 font-light leading-relaxed tracking-tight">{plan.tagline}</p>
              </div>

              <div className="mb-12 h-20">
                <span className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter uppercase leading-none flex items-baseline gap-2">
                  {typeof plan.monthly === 'number' && <span className="text-lg font-light text-primary tracking-widest">$</span>}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isAnnual ? 'annual' : 'monthly'}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.5 }}
                    >
                      {isAnnual ? plan.annual : plan.monthly}
                    </motion.span>
                  </AnimatePresence>
                  {typeof plan.monthly === 'number' && <span className="text-xs font-light tracking-[0.2em] opacity-40"> / Build</span>}
                </span>
              </div>

              <ul className="flex flex-col gap-5 mb-12 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className={`flex items-start gap-4 text-xs font-medium tracking-tight ${feature.included ? 'dark:text-slate-300 text-slate-700' : 'opacity-20'}`}>
                    {feature.included ? <Check className="w-4 h-4 shrink-0 text-primary" /> : <X className="w-4 h-4 shrink-0" />}
                    <span className={feature.included ? '' : 'line-through'}>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <Button variant={plan.popular ? 'primary' : 'outline'} className={`w-full justify-center group/btn shadow-xl rounded-full py-5 text-sm font-black uppercase tracking-widest ${plan.popular ? 'bg-primary text-slate-950' : 'border-primary text-primary hover:bg-primary/5'}`}>
                {plan.name === 'Command' ? 'Book Consultation' : 'Start Deployment'}
                <ArrowRight className="ml-3 w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-500" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
