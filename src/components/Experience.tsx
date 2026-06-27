/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { EXPERIENCE_DATA, Experience } from "../types";
import { Briefcase, Calendar, CheckCircle2, ChevronRight, GraduationCap } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-slate-950/10">
      {/* Decorative side lighting */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase inline-block"
          >
            Chronicle
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-white"
          >
            Professional <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Expeditions</span>
          </motion.h1>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Timeline body */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central path line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-600 to-slate-900 -translate-x-1/2 pointer-events-none hidden md:block" />

          {/* Experience list mapping */}
          <div className="space-y-12 relative">
            {EXPERIENCE_DATA.map((exp: Experience, idx: number) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={exp.id}
                  className={`flex flex-col md:flex-row relative items-start md:items-center justify-between gap-8 md:gap-16 w-full ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central Node Indicator */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center -translate-x-1/2 z-10 shadow-lg shadow-cyan-500/20 hidden md:flex">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                  </div>

                  {/* Spacer or placeholder to keep symmetry */}
                  <div className="hidden md:block w-1/2" />

                  {/* Real Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className="w-full md:w-[48%] bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/25 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl hover:shadow-cyan-950/5 hover:-translate-y-1 transition-all duration-300 relative group"
                  >
                    {/* Futuristic corner lighting glow */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-tr from-cyan-500/5 to-purple-600/5 rounded-full blur-2xl" />

                    <div className="flex items-start justify-between gap-4 border-b border-slate-800/60 pb-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold font-sans text-white group-hover:text-cyan-400 transition-colors duration-300">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-mono text-cyan-300 mt-1">{exp.company}</p>
                      </div>

                      <div className="shrink-0 flex flex-col items-end">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-slate-800 rounded-full font-mono text-[10px] text-purple-400">
                          <Calendar className="w-3 h-3 text-purple-400" />
                          <span>{exp.period}</span>
                        </span>
                      </div>
                    </div>

                    {/* Description bullet lists */}
                    <ul className="space-y-3 mb-6">
                      {exp.description.map((desc, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed text-justify">
                          <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-1.5 border-t border-slate-800/40 pt-4">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-slate-950/80 border border-slate-800 text-slate-400 font-mono text-[10px] rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
