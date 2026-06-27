/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";
import ThreeDGlobe from "./ThreeDGlobe";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Identification signature required.";
    
    if (!formData.email.trim()) {
      newErrors.email = "Transmission vector (Email) required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid transmission vector signature.";
    }
    
    if (!formData.subject.trim()) newErrors.subject = "Subject classification required.";
    if (!formData.message.trim()) newErrors.message = "Transmission payload required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate real high-fidelity integration with EmailJS
    // Real-world setup of EmailJS can be plugged directly here
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Decorative background visual lights */}
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
            Terminal Connection
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-white"
          >
            Initiate <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Transmission</span>
          </motion.h1>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Glass Contact Form */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl h-full flex flex-col justify-between"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-slate-400 pl-1 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950/50 border border-slate-800/80 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all font-sans"
                      placeholder="e.g. John Doe"
                    />
                    {errors.name && (
                      <span className="text-[11px] font-mono text-pink-500 pl-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-slate-400 pl-1 uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950/50 border border-slate-800/80 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all font-sans"
                      placeholder="e.g. john@example.com"
                    />
                    {errors.email && (
                      <span className="text-[11px] font-mono text-pink-500 pl-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-slate-400 pl-1 uppercase tracking-wider">
                    Subject Class
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-950/50 border border-slate-800/80 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all font-sans"
                    placeholder="e.g. Neural Architecture Collaboration"
                  />
                  {errors.subject && (
                    <span className="text-[11px] font-mono text-pink-500 pl-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-slate-400 pl-1 uppercase tracking-wider">
                    Transmission Payload (Message)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950/50 border border-slate-800/80 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all font-sans resize-none"
                    placeholder="Compile your thoughts here..."
                  />
                  {errors.message && (
                    <span className="text-[11px] font-mono text-pink-500 pl-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Action button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:from-slate-800 disabled:to-slate-800 text-white font-sans font-bold text-sm tracking-wider rounded-2xl transition-all duration-300 shadow-lg shadow-cyan-950/20 active:scale-98 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2 font-mono text-xs">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        COMPILING TRANSMISSION...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Transmission</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Success/Error animation panels */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Transmission Successful</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Your message payload has been successfully compiled and routed. Shivanshu will establish sync shortly.
                      </p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 p-4 bg-pink-500/10 border border-pink-500/20 rounded-2xl flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-pink-500 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Transmission Failed</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Failed to pipe coordinates. Please verify your internet connection link and resubmit.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Globe with details */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-slate-900/30 border border-slate-800/50 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Mounted 3D interactive Globe */}
            <div className="grow flex items-center justify-center relative">
              <ThreeDGlobe />
            </div>

            {/* Direct specs contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800/40 pt-6">
              <div className="flex items-center gap-3 p-3.5 bg-slate-950/30 border border-slate-900 rounded-2xl">
                <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Direct Email</p>
                  <a
                    href="mailto:shivanshusolanki68@gmail.com"
                    className="text-xs font-mono text-white hover:text-cyan-400 transition-colors"
                  >
                    shivanshusolanki68@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-slate-950/30 border border-slate-900 rounded-2xl">
                <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Operational Node</p>
                  <p className="text-xs font-mono text-white">Delhi, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
