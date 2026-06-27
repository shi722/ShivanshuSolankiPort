/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Trophy, Award, Shield, Cpu, Target, CheckCircle2, AwardIcon } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number; // ms
}

function AnimatedCounter({ value, suffix = "", duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalSteps = 60;
    const stepTime = duration / totalSteps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(start + (end - start) * easedProgress);

      setCount(currentVal);

      if (step >= totalSteps) {
        clearInterval(timer);
        setCount(end);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Achievements() {
  const stats = [
    {
      id: "stat1",
      label: "Professional Credentials",
      value: 100,
      suffix: "+",
      icon: Award,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
    },
    {
      id: "stat2",
      label: "Neural Networks Modeled",
      value: 45,
      suffix: "+",
      icon: Cpu,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    },
    {
      id: "stat3",
      label: "Competitive Hackathons",
      value: 12,
      suffix: "",
      icon: Trophy,
      color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
    },
    {
      id: "stat4",
      label: "Google Cloud Skill Badges",
      value: 150,
      suffix: "+",
      icon: Shield,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    }
  ];

  const cloudBadges = [
    "Google Cloud Fundamentals",
    "Infrastructure in Google Cloud",
    "Perform Foundation Infrastructure Tasks",
    "BigQuery Basics & Machine Learning",
    "Automate Infrastructure with Terraform",
    "Build and Secure Networks in GCP"
  ];

  return (
    <section id="achievements" className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Visual neon lighting background */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />

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
            Metrics & Shields
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-white"
          >
            System <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Statistics</span>
          </motion.h1>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Counters / Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/20 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl text-center group transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-tr from-cyan-500/5 to-purple-600/5 rounded-full blur-2xl" />
                
                {/* Floating animated icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${stat.color} group-hover:scale-105 transition-all duration-300`}>
                  <Icon className="w-5 h-5 animate-pulse" />
                </div>

                <div className="text-4xl md:text-5xl font-mono font-bold text-white mb-2 tracking-tight">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>

                <p className="text-xs font-mono text-slate-400 uppercase tracking-widest leading-relaxed">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Google Cloud Badges Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 md:p-10 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left info column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs rounded-full">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Skill Matrix</span>
            </div>
            <h3 className="text-3xl font-bold font-sans text-white tracking-tight">
              Google Cloud Skill Badges
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed text-justify">
              Rigorous cloud competencies audited and verified directly by Google Cloud Academy. Focuses on architecting multi-tier server clusters, automating deployments via cloud infrastructure-as-code, and securing dynamic IAM protocols.
            </p>
          </div>

          {/* Right badge list column */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cloudBadges.map((badge, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-center gap-3 p-3.5 bg-slate-950/45 border border-slate-900 rounded-2xl hover:border-cyan-500/25 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all duration-300">
                    <Target className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-xs text-slate-300 font-sans font-medium text-left">
                    {badge}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
