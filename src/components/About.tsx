/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Award, BookOpen, GraduationCap, Compass, Trophy, Star } from "lucide-react";
// @ts-ignore
import avatarImg from "../assets/images/profile_avatar_1782464414116.jpg";

export default function About() {
  const education = [
    {
      degree: "Bachelor of Technology",
      specialization: "Computer Science & Engineering",
      institution: "G.L.A. University,Mathura",
      period: "2022 - 2026",
      grade: "CGPA: 7.8/10 (First Class with Distinction)",
      details: "Specializing in Deep Learning architectures, Distributed Cloud Databases, and Data Visualizations. Head of the AI & Robotics Club, coordinating university hackathons."
    },
    {
      degree: "Intermediate",
      specialization: "PCM",
      institution: "S.V.M. Kasganj",
      period: "2020 - 2022",
      grade: "Percentage: 81.33%",
    }
  ];

  const achievements = [
    {
      title: "Google Cloud Facilitator Program",
      desc: "Architected a high-throughput live telemetry analytics dashboard under GCP protocols.and Google Cloud Swags"
    },
    {
      title: "100+ Professional Certifications",
      desc: "Successfully finished certifications across AI, TensorFlow, Data Science, and cloud infrastructure."
    },
    {
      title: "Shortlisted for the Indian Army TES SSB Interview through the competitive selection process.",
      desc: "Demonstrated aptitude, leadership potential, and problem-solving abilities during the assessment process."
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Visual glowing elements */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />

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
            Core Matrix
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-white"
          >
            About My <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Journey</span>
          </motion.h1>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Glass Card with profile info & Career Objective */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl shadow-slate-950/20 relative overflow-hidden group"
            >
              {/* Profile card picture with futuristic borders */}
              <div className="relative w-28 h-28 mx-auto mb-6">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-600 blur-sm group-hover:scale-105 transition-all duration-500" />
                <div className="relative w-full h-full rounded-2xl bg-slate-950 p-1">
                  <img
                    src={avatarImg}
                    alt="Shivanshu Solanki portrait"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>

              <div className="text-center space-y-1.5 mb-6">
                <h3 className="text-2xl font-sans font-bold text-white">Shivanshu Solanki</h3>
                <p className="text-sm font-mono text-cyan-400">Computer Science Engineer</p>
                <p className="text-xs text-slate-500 font-mono">Location: India • Active Connection</p>
              </div>

              {/* Career Objective */}
              <div className="border-t border-slate-800/60 pt-6 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
                  <Compass className="w-4 h-4" />
                  <span>Career Mission</span>
                </div>
                <p className="text-sm font-sans text-slate-300 leading-relaxed text-justify">
                  To push the frontier of computational intelligence by engineer-designing performant machine learning algorithms and robust multi-cloud data systems. Dedicated to architecting cohesive software products that solve high-stakes analytical, mathematical, and enterprise difficulties.
                </p>
              </div>
            </motion.div>

            {/* Achievements highlight panel */}
            <div className="space-y-4">
              <h4 className="font-mono text-slate-400 text-xs uppercase tracking-widest pl-2">
                Operational Milestones
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {achievements.map((ach, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-slate-900/40 border border-slate-800/60 rounded-2xl backdrop-blur-md hover:border-cyan-500/20 transition-all duration-300"
                  >
                    <div className="p-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-white">{ach.title}</h5>
                      <p className="text-xs text-slate-400 mt-0.5">{ach.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Timeline Education */}
          <div className="lg:col-span-7 space-y-6">
            <h4 className="font-mono text-slate-400 text-xs uppercase tracking-widest flex items-center gap-2 pl-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Academic Engineering Matrix</span>
            </h4>

            <div className="space-y-6">
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-slate-900/30 border border-slate-800/50 hover:border-purple-500/20 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl transition-all duration-300 relative group"
                >
                  {/* Decorative timeline bullet anchor */}
                  <div className="absolute top-8 -left-3.5 w-7 h-7 rounded-full bg-slate-950 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-950/50 hidden md:flex">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800/40 pb-4 mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-sans font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-mono text-cyan-400 mt-1">
                        {edu.specialization}
                      </p>
                    </div>
                    <div className="flex flex-col md:items-end gap-1 font-mono text-xs text-right shrink-0">
                      <span className="px-3 py-1 bg-slate-950 text-purple-400 rounded-full border border-purple-500/20">
                        {edu.period}
                      </span>
                      <span className="text-emerald-400 mt-1 font-semibold">{edu.grade}</span>
                    </div>
                  </div>

                  <p className="text-sm font-mono text-slate-400 text-left mb-2">
                    📍 {edu.institution}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed text-justify">
                    {edu.details}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
