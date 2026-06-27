/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { BLOG_DATA, BlogPost } from "../types";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";

export default function BlogSection() {
  const getBlogGradient = (imgKey: string) => {
    if (imgKey === "blog_vertex") return "from-indigo-600 to-purple-600";
    if (imgKey === "blog_perf") return "from-cyan-500 to-blue-600";
    return "from-emerald-500 to-teal-600";
  };

  return (
    <section id="blog" className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-slate-950/10">
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase inline-block"
          >
            Insights
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-white"
          >
            The Cyber <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Journal</span>
          </motion.h1>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_DATA.map((post: BlogPost, index: number) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/35 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col h-full group"
            >
              {/* Blog Cover Gradient Image Header */}
              <div className="h-44 relative overflow-hidden bg-slate-950 flex items-center justify-center shrink-0">
                <div className={`absolute inset-0 bg-gradient-to-tr ${getBlogGradient(post.image)} opacity-25 group-hover:opacity-40 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:16px_16px]" />
                
                {/* Visual tech category icon */}
                <div className="z-10 text-center space-y-1.5">
                  <BookOpen className="w-10 h-10 text-slate-400 group-hover:text-cyan-300 transition-colors" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 group-hover:text-white">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Blog body detail content */}
              <div className="p-6 md:p-8 flex flex-col justify-between grow space-y-5">
                <div className="space-y-3">
                  <span className="text-xs font-mono tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase inline-block">
                    {post.category}
                  </span>

                  <h3 className="text-xl font-bold font-sans text-white group-hover:text-cyan-400 transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed text-justify">
                    {post.summary}
                  </p>
                </div>

                {/* Footer specs of the blog post */}
                <div className="flex items-center justify-between border-t border-slate-800/40 pt-4 mt-4 text-[11px] font-mono text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      alert(`Loading full article: "${post.title}" (Sandbox Demo)`);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white font-sans font-bold text-xs rounded-xl transition-all duration-300"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
