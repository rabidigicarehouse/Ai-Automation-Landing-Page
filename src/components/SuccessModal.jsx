import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm shadow-2xl"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#0a061e] p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-white/10"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary/20 blur-[60px]" />
            <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-secondary/20 blur-[60px]" />

            <div className="relative z-10">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-inner">
                <CheckCircle2 size={40} className="animate-pulse" />
              </div>
              <h3 className="mb-3 text-2xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
                Request Sent Successfully!
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-slate-600 dark:text-gray-400 font-light">
                Your message has been received. We'll review your project details and get back to you with a tactical plan shortly.
              </p>
              <button
                onClick={onClose}
                className="w-full rounded-2xl bg-primary py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95 shadow-primary/25"
              >
                Close Window
              </button>
            </div>
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-slate-400 hover:text-red-500"
            >
              <X size={18} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
