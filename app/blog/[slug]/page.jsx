'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../src/components/Navbar';
import Footer from '../../../src/sections/Footer';
import blogs from '../../../src/data/blogs.json';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, Share2, Sparkles } from 'lucide-react';
import Link from 'next/link';

const BlogInternal = () => {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return <div>404 Not Found</div>;

  return (
    <div className="bg-white dark:bg-[#06060e] min-h-screen transition-colors duration-500">
      <Navbar />
      
      <main className="pt-[140px] pb-24 px-6 md:px-12 xl:px-24">
        <div className="container mx-auto">
          {/* Top Navigation */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors mb-12">
            <ChevronLeft className="w-4 h-4" />
            Back to AI Automation Hub
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Meta */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-primary">
                <Sparkles className="w-3 h-3" />
                {blog.category}
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-[9px] font-bold uppercase tracking-widest">
                <Calendar className="w-3 h-3" />
                {blog.date}
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-[9px] font-bold uppercase tracking-widest">
                <Clock className="w-3 h-3" />
                {blog.readTime}
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-poppins text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[1.0] text-gray-900 dark:text-white mb-16"
            >
              <span className="text-gradient leading-tight block">{blog.title}</span>
            </motion.h1>

            {/* Main Featured Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative h-[300px] sm:h-[400px] md:h-[600px] w-full rounded-[2rem] sm:rounded-[3rem] overflow-hidden mb-12 sm:mb-20 shadow-2xl"
            >
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Content Body */}
            <motion.article 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg sm:prose-xl md:prose-2xl prose-slate dark:prose-invert max-w-none px-2
                prose-h1:font-poppins prose-h1:font-black prose-h1:uppercase prose-h1:tracking-tighter prose-h1:text-3xl sm:prose-h1:text-4xl md:prose-h1:text-5xl
                prose-h2:font-poppins prose-h2:font-black prose-h2:uppercase prose-h2:tracking-tight prose-h2:text-2xl sm:prose-h2:text-3xl
                prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:font-light prose-p:leading-relaxed
                prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-3xl
                prose-strong:text-primary prose-strong:font-black"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Footer / Share Info */}
            <div className="mt-20 pt-16 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex items-center gap-6">
                 <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-[#06060e] bg-slate-200 overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                     </div>
                   ))}
                 </div>
                 <span className="text-xs font-bold text-slate-500">Liked by 1,240+ digital thinkers</span>
               </div>
               
               <button className="flex items-center gap-3 px-8 py-4 bg-primary text-slate-900 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                 <Share2 className="w-5 h-5" />
                 Share Insight
               </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogInternal;
