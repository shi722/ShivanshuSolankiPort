/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Download, Send, Github, Linkedin, Sparkles, MessageSquare } from "lucide-react";
// @ts-ignore
import avatarImg from "../assets/images/profile_avatar_1782464414116.jpg";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const titles = [
    "Computer Science Engineer",
    "AI & Machine Learning Specialist",
    "Data Science Researcher",
    "Cloud Solutions Architect"
  ];
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let speed = isDeleting ? 30 : 70;

    // Pause at the end of typing
    if (!isDeleting && charIndex === currentTitle.length) {
      speed = 1800; // hold
      const timeout = setTimeout(() => setIsDeleting(true), speed);
      return () => clearTimeout(timeout);
    }

    // Pause when fully erased
    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
      return;
    }

    const timer = setTimeout(() => {
      setTypedText(
        isDeleting
          ? currentTitle.substring(0, charIndex - 1)
          : currentTitle.substring(0, charIndex + 1)
      );
      setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, titleIndex]);

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      const offset = 80;
      const elementPosition = contactEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left column: Bio text and buttons */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs rounded-full shadow-lg shadow-cyan-950/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Welcome to my Digital Cosmos</span>
          </motion.div>

          <div className="space-y-3">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-slate-400 text-lg font-mono font-medium"
            >
              Hi, I'm
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-white leading-tight"
            >
              Shivanshu <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Solanki</span>
            </motion.h1>

            <div className="h-8 flex items-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-lg sm:text-2xl font-mono text-cyan-400 font-semibold"
              >
                {typedText}
                <span className="animate-pulse text-cyan-400 ml-1">|</span>
              </motion.p>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-400 font-sans text-base max-w-xl leading-relaxed"
          >
            Computer Science Engineer specializing in building intelligent neural systems, cloud data architecture, and full-stack interactive visualizations. Dedicated to bridging rigorous research with performant software solutions.
          </motion.p>

          {/* Subtitle list of domains requested */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-2 pt-2"
          >
            {["AI", "Machine Learning", "Data Science", "Cloud Computing"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-slate-900/60 border border-slate-800/80 text-slate-400 font-mono text-xs rounded-full hover:border-purple-500/40 hover:text-purple-300 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Call-to-actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto"
          >
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-sans font-bold tracking-wide rounded-2xl shadow-xl shadow-cyan-950/20 hover:scale-102 hover:shadow-cyan-500/20 transition-all duration-300 w-full sm:w-auto cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Hire Me</span>
            </a>

            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white font-sans font-semibold rounded-2xl hover:scale-102 transition-all duration-300 w-full sm:w-auto cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact</span>
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Downloading Shivanshu Solanki's Resume (Demo File Generation)...");
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-950/30 hover:bg-slate-900/30 border border-slate-800/60 hover:border-purple-500/40 text-slate-400 hover:text-white font-mono text-xs rounded-2xl hover:scale-102 transition-all duration-300 w-full sm:w-auto"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </motion.div>

          {/* Social connections */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-4 pt-6"
          >
            <a
              href="https://github.com/shivanshusolanki"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-950/40 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/30 text-slate-400 hover:text-cyan-400 rounded-xl hover:scale-105 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href="https://linkedin.com/in/shivanshusolanki"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-950/40 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/30 text-slate-400 hover:text-cyan-400 rounded-xl hover:scale-105 transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Right column: 3D Floating profile avatar card */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          {/* Animated decorative particle cloud behind profile */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-80 h-80 bg-gradient-to-tr from-cyan-500/5 to-purple-600/5 rounded-full blur-3xl absolute"
            />
            {/* Spinning orbital light points */}
            <svg className="w-96 h-96 absolute animate-spin" style={{ animationDuration: "30s" }}>
              <circle cx="50%" cy="10%" r="3" fill="#00f0ff" className="animate-pulse" />
              <circle cx="85%" cy="80%" r="4" fill="#bd00ff" className="animate-pulse" />
              <circle cx="15%" cy="75%" r="2" fill="#00ffcc" />
            </svg>
          </div>

          {/* Interactive 3D Card tilt container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 18,
              delay: 0.3,
            }}
            whileHover={{ y: -8 }}
            className="relative"
          >
            {/* Outer neon animated glowing frame */}
            <div className="absolute inset-0.5 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 blur-md opacity-70 animate-pulse" />
            
            {/* Main glass frame */}
            <div className="relative p-2 bg-slate-950/80 backdrop-blur-2xl rounded-full border border-slate-800 shadow-2xl shadow-cyan-950/30">
              <div className="relative overflow-hidden rounded-full w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] bg-slate-950">
                <img
                  src={avatarImg}
                  alt="Shivanshu Solanki Profile"
                  className="w-full h-full object-cover rounded-full scale-102 hover:scale-108 transition-all duration-700 ease-out"
                />
                
                {/* Visual grid overlay to make it look like a futuristic interface */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-slate-950/40 pointer-events-none" />
              </div>

              {/* Glowing decorative interface elements around circle */}
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-purple-500 rounded-bl-lg" />
            </div>

            {/* Custom status pill on image */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-slate-900/95 border border-purple-500/30 text-purple-300 font-mono text-[10px] uppercase tracking-widest rounded-full shadow-lg shadow-black/50 backdrop-blur-md whitespace-nowrap">
              🟢 System Active: AI Ready
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
