/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS_DATA, Project } from "../types";
import { ExternalLink, Github, Monitor, Sparkles } from "lucide-react";

// Interactive 3D tilt card component
function ProjectTiltCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Map coordinates to small rotation angles
    const rotX = -(mouseY / (height / 2)) * 10; // max 10 degrees tilt
    const rotY = (mouseX / (width / 2)) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Map keys to beautiful procedural neon gradients for project covers instead of broken images
  const getGradientCover = (imgKey: string) => {
    if (imgKey === "project_vision") return "from-blue-600 via-indigo-700 to-cyan-500";
    if (imgKey === "project_cloud") return "from-orange-500 via-yellow-600 to-red-500";
    if (imgKey === "project_3d") return "from-purple-600 via-pink-700 to-blue-500";
    return "from-teal-600 via-emerald-700 to-cyan-500";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/25 rounded-3xl overflow-hidden shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col h-full group"
    >
      {/* Dynamic Cover Banner with Grid Overlay */}
      <div className="relative h-48 overflow-hidden bg-slate-950 flex items-center justify-center shrink-0">
        {/* Animated procedural neon canvas back-glow */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${getGradientCover(project.image)} opacity-30 group-hover:opacity-45 transition-all duration-500`} />
        
        {/* Cyber Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        {/* Floating tech nodes */}
        <div className="absolute flex gap-1.5 bottom-3 left-4 pointer-events-none">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="px-2 py-0.5 bg-slate-950/90 border border-slate-800/80 rounded-md font-mono text-[9px] text-cyan-400">
              {t}
            </span>
          ))}
        </div>

        {/* Procedural Visual Symbol */}
        <div className="text-center z-10 space-y-1.5 transition-all duration-500 group-hover:scale-105">
          <Monitor className="w-10 h-10 text-white mx-auto opacity-80 group-hover:text-cyan-300" />
          <h4 className="font-mono text-xs uppercase tracking-widest text-slate-400 group-hover:text-white">
            {project.title.split(":")[0]}
          </h4>
        </div>
      </div>

      {/* Description Content */}
      <div className="p-6 md:p-8 flex flex-col justify-between grow space-y-6">
        <div className="space-y-3">
          <h3 className="text-2xl font-bold font-sans text-white group-hover:text-cyan-300 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed text-justify">
            {project.description}
          </p>
        </div>

        {/* Buttons and actions */}
        <div className="flex items-center gap-3 border-t border-slate-800/40 pt-5">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 hover:border-cyan-500/35 text-slate-300 hover:text-white font-mono text-xs rounded-xl hover:scale-102 transition-all duration-300 grow justify-center"
          >
            <Github className="w-4 h-4" />
            <span>Repository</span>
          </a>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 hover:from-cyan-500/20 hover:to-purple-600/20 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 font-mono text-xs rounded-xl hover:scale-102 transition-all duration-300 grow justify-center"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Atmospheric lighting */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />

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
            Deployments
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-white"
          >
            Futuristic 3D <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Projects</span>
          </motion.h1>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS_DATA.map((project: Project) => (
            <div key={project.id}>
              <ProjectTiltCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
