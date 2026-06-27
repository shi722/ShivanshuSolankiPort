/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { SERVICES_DATA, Service } from "../types";
import { Cpu, BrainCircuit, CloudLightning, Code2, Database, Layers } from "lucide-react";

// Mapping string names to actual Lucide component icons
const iconMap: Record<string, any> = {
  Cpu: Cpu,
  BrainCircuit: BrainCircuit,
  CloudLightning: CloudLightning,
  Code2: Code2,
  Database: Database,
  Layers: Layers,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-slate-950/10">
      {/* Decorative background visual lights */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />

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
            Capabilities
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-white"
          >
            Futuristic Tech <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Services</span>
          </motion.h1>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((srv: Service, idx: number) => {
            const IconComponent = iconMap[srv.iconName] || Code2;
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/35 rounded-3xl p-6 md:p-8 shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Visual hover-glow background orb */}
                <div className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-tr ${srv.color} opacity-5 rounded-full blur-2xl group-hover:opacity-15 transition-opacity duration-500`} />

                <div className="space-y-4">
                  {/* Icon Frame */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${srv.color} p-0.5 flex items-center justify-center`}>
                    <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-sans text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {srv.title}
                  </h3>
                  
                  <p className="text-sm text-slate-400 leading-relaxed text-justify">
                    {srv.description}
                  </p>
                </div>

                {/* Cyber style corner accent indicator */}
                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-cyan-500/20 group-hover:bg-cyan-400 rounded-full transition-colors" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
