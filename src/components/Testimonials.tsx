/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS_DATA, Testimonial } from "../types";
import { Quote, ArrowLeft, ArrowRight, Star } from "lucide-react";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current: Testimonial = TESTIMONIALS_DATA[activeIndex];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Decorative background visual lights */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase inline-block"
          >
            Endorsements
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-white"
          >
            Client & Mentor <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Testimonials</span>
          </motion.h1>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Carousel block */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              {/* Massive back quote icon */}
              <Quote className="absolute -top-6 -right-6 w-32 h-32 text-cyan-400/5 rotate-12 pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                {/* Visual Avatar frame */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shrink-0">
                  {current.avatar}
                </div>

                {/* Testimonial review details */}
                <div className="space-y-6 text-center md:text-left grow">
                  {/* Rating stars */}
                  <div className="flex items-center justify-center md:justify-start gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-base sm:text-lg text-slate-200 italic leading-relaxed text-justify">
                    "{current.content}"
                  </p>

                  <div className="border-t border-slate-800/50 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-bold text-white">{current.name}</h4>
                      <p className="text-sm font-mono text-cyan-400">{current.role} at {current.company}</p>
                    </div>

                    {/* Left/Right carousel arrow controls */}
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={handlePrev}
                        className="p-3 bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white rounded-xl transition-all duration-300"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <span className="font-mono text-xs text-slate-500">
                        {activeIndex + 1} / {TESTIMONIALS_DATA.length}
                      </span>
                      <button
                        onClick={handleNext}
                        className="p-3 bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white rounded-xl transition-all duration-300"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
