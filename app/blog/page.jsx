'use client';

import React from 'react';
import Navbar from '../../src/components/Navbar';
import Footer from '../../src/sections/Footer';
import blogs from '../../src/data/blogs.json';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock, Sparkles } from 'lucide-react';

const BlogListing = () => {
  return (
    <div className="bg-slate-50 dark:bg-[#06060e] min-h-screen transition-colors duration-500">
      <Navbar />
      
      <main className="pt-[160px] pb-24 px-6 md:px-12 xl:px-24">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="mb-20 max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">AI Automation Hub</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-poppins text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-black uppercase tracking-tighter leading-[0.9] text-gray-900 dark:text-white mb-8"
            >
              Intelligence <br className="hidden sm:block" /> 
              Meets <span className="text-gradient">Efficiency</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 font-light leading-relaxed tracking-tight max-w-2xl mx-auto px-4"
            >
              Explore our insights on intelligent systems, automated workflows, and the future of digital efficiency.
            </motion.p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="group relative flex flex-col bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                     <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest">
                       Read Article
                     </span>
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 bg-primary/5 dark:bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-lg">
                      {blog.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[9px] font-bold uppercase tracking-widest">
                      <Clock className="w-3 h-3" />
                      {blog.readTime}
                    </div>
                  </div>
                  
                  <h3 className="font-poppins text-xl md:text-2xl font-black uppercase leading-[1.1] tracking-tight text-gray-900 dark:text-white mb-6 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  
                  <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed text-sm mb-8 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <Calendar className="w-3 h-3" />
                      {blog.date}
                    </div>
                    
                    <Link href={`/blog/${blog.slug}`} className="p-3 bg-black/5 dark:bg-white/5 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogListing;
