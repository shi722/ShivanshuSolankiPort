/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CERTIFICATES_DATA, Certificate } from "../types";
import { Award, Calendar, Check, ExternalLink, ShieldCheck, X } from "lucide-react";

export default function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Helper to resolve beautiful colored vector symbols for different certificate issuers
  const getIssuerBadge = (issuer: string) => {
    if (issuer.includes("Google")) return "from-blue-500 to-yellow-500 text-yellow-100";
    if (issuer.includes("IBM")) return "from-indigo-600 to-blue-400 text-indigo-100";
    if (issuer.includes("Infosys")) return "from-sky-500 to-emerald-500 text-sky-100";
    return "from-purple-600 to-pink-500 text-purple-100";
  };

  return (
    <section id="certificates" className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-slate-950/20">
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10" />

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
            Credentials
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-white"
          >
            Verified <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Certificates</span>
          </motion.h1>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATES_DATA.map((cert: Certificate, index: number) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedCert(cert)}
              className="bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 rounded-2xl p-6 shadow-xl hover:shadow-cyan-950/5 cursor-pointer transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Certificate Vector Header */}
                <div className={`h-36 rounded-xl bg-gradient-to-tr ${getIssuerBadge(cert.issuer)} p-0.5 relative overflow-hidden flex items-center justify-center`}>
                  {/* Grid background */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-black/30 pointer-events-none" />
                  
                  {/* Certificate Hologram Style */}
                  <div className="text-center space-y-1.5 z-10">
                    <Award className="w-12 h-12 text-white mx-auto drop-shadow-lg scale-102 group-hover:scale-110 transition-transform duration-300" />
                    <p className="font-mono text-[9px] uppercase tracking-widest opacity-80 text-white">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold font-sans text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{cert.issuer} verified</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800/60 pt-4 mt-6">
                <span className="font-mono text-[10px] text-slate-500">{cert.date}</span>
                <span className="font-mono text-[10px] text-cyan-400 group-hover:underline flex items-center gap-1">
                  View Credentials <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Popup overlay */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Blurry dark background mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/35 rounded-3xl p-6 md:p-8 shadow-2xl shadow-cyan-950/20 overflow-hidden"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/50 border border-slate-800/60 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-sans text-white leading-snug">
                      {selectedCert.title}
                    </h2>
                    <p className="text-xs font-mono text-cyan-400 mt-0.5">{selectedCert.issuer}</p>
                  </div>
                </div>

                <div className="space-y-4 border-t border-b border-slate-800/60 py-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-500" /> Issued Date
                    </span>
                    <span className="font-mono text-white">{selectedCert.date}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono text-slate-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-slate-500" /> Credential ID
                    </span>
                    <span className="font-mono text-cyan-300 font-semibold">{selectedCert.credentialId}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                    Credentials Competencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 font-sans"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      alert(`Opening external portal for Verification ID: ${selectedCert.credentialId}`);
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-sans font-bold text-sm tracking-wider rounded-2xl transition-all duration-300"
                  >
                    Verify Credential Integrity
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
