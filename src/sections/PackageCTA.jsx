import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Check, Sparkles, Workflow, Wrench } from 'lucide-react';
import Button from '../components/Button';
import { companyPhoneHref } from '../data/contact';
import { handlePrimaryContactAction } from '../utils/contactActions';

const packageServices = [
  'AI agent design',
  'Workflow automation',
  'CRM and tool integrations',
  'Operational rollout planning',
  'Monitoring and optimization',
  'Team enablement support',
];

const PackageCTA = () => {
  return (
    <section className="section section-theme-cyan flex min-h-screen items-center overflow-hidden pb-8 pt-[115px] sm:pb-16 sm:pt-[140px] lg:pb-20 lg:pt-[160px] xl:pb-24 xl:pt-[180px] 2xl:pb-24 2xl:pt-[190px]" id="packages">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="container laptop-scale-pricing relative z-10 mx-auto w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2.2rem] sm:rounded-[3rem] border border-black/5 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(248,250,252,0.94))] px-4 py-6 sm:px-6 sm:py-8 shadow-[0_28px_90px_rgba(15,23,42,0.1)] dark:border-white/8 dark:bg-[linear-gradient(145deg,rgba(10,8,26,0.98),rgba(18,16,36,0.94))] md:px-10 md:py-10 lg:px-10 lg:py-8 xl:px-12 xl:py-10 2xl:px-14 2xl:py-12"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(41,211,255,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(139,255,176,0.08),transparent_32%)]" />
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-primary/10 blur-[70px]" />
          <div className="absolute right-8 top-12 hidden h-20 w-20 rounded-[1.8rem] border border-primary/18 bg-white/60 backdrop-blur-xl dark:bg-white/[0.04] lg:flex lg:items-center lg:justify-center">
            <Bot className="h-8 w-8 text-primary" />
          </div>

          <div className="relative grid gap-6 sm:gap-8 lg:grid-cols-[1.06fr_.94fr] lg:items-center lg:gap-10 xl:gap-12">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
                <Sparkles className="h-4 w-4" />
                Custom System Scope
              </div>
              <h4 className="font-heading text-gradient mb-3 max-w-[17ch] text-[1.85rem] font-black uppercase leading-[0.95] tracking-tight sm:text-[2.35rem] md:text-[3.15rem] lg:max-w-[14ch] lg:text-[3rem] xl:max-w-[15ch] xl:text-[3.45rem] 2xl:text-[4rem]">
                Packages fit for your AI/Automation Services .
              </h4>
              <p className="max-w-2xl text-[0.92rem] sm:text-base font-light leading-relaxed tracking-tight text-slate-600 dark:text-gray-400 md:text-lg lg:text-[0.95rem] xl:text-[1.02rem] 2xl:text-[1.08rem]">
                AI agents, workflow orchestration, and rollout support are mapped to your bottlenecks, team structure, and stack.
              </p>

              <div className="mt-5 sm:mt-8 grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3">
                <div className="rounded-[1.8rem] border border-primary/10 bg-white/75 p-4 shadow-sm dark:bg-white/[0.03]">
                  <Bot className="mb-3 h-5 w-5 text-primary" />
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-900 dark:text-white">AI Agents</p>
                </div>
                <div className="rounded-[1.8rem] border border-secondary/10 bg-white/75 p-4 shadow-sm dark:bg-white/[0.03]">
                  <Workflow className="mb-3 h-5 w-5 text-secondary" />
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-900 dark:text-white">Workflow Design</p>
                </div>
                <div className="rounded-[1.8rem] border border-teal/10 bg-white/75 p-4 shadow-sm dark:bg-white/[0.03]">
                  <Wrench className="mb-3 h-5 w-5 text-teal" />
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-900 dark:text-white">System Rollout</p>
                </div>
              </div>

              <div className="mt-5 sm:mt-8 grid gap-2.5 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                {packageServices.map((service) => (
                  <div key={service} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </span>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center lg:self-center lg:justify-end">
              <div className="w-full rounded-[2.4rem] border border-primary/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.82))] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] md:p-8 lg:max-w-[34rem]">
                <p className="mb-6 text-sm font-black uppercase tracking-[0.22em] text-slate-500 dark:text-white/55">
                  Best Fit For
                </p>
                <div className="mb-8 grid gap-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <div>Teams with workflow bottlenecks, fragmented handoffs, or repetitive manual operations</div>
                  <div>Companies needing AI agents, workflow design, and CRM-connected automation support</div>
                  <div>Operators who want a custom automation package built around their real stack and rollout needs</div>
                </div>
                <Button
                  variant="primary"
                  onClick={(e) => handlePrimaryContactAction(e, companyPhoneHref)}
                  className="group w-full justify-center rounded-full py-4 text-[12px] font-black uppercase tracking-[0.18em] shadow-xl text-slate-950"
                >
                  Connect Us
                  <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PackageCTA;
