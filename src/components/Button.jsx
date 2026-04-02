import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[#030014] focus:ring-offset-slate-50";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] focus:ring-primary",
    secondary: "glass-card dark:text-white text-slate-800 dark:hover:bg-white/[0.08] hover:bg-black/[0.05] dark:focus:ring-white/20 focus:ring-black/20",
    outline: "border dark:border-white/20 border-black/20 dark:text-white text-slate-800 dark:hover:bg-white/[0.05] hover:bg-black/[0.02] dark:focus:ring-white/20 focus:ring-black/20",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
