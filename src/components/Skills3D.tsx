/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { SKILLS_DATA, Skill } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Sparkles, BookOpen, Cpu } from "lucide-react";

interface Tag3D {
  skill: Skill;
  x: number;
  y: number;
  z: number;
  projectedX: number;
  projectedY: number;
  scale: number;
  alpha: number;
}

export default function Skills3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(SKILLS_DATA[0]);
  const [hoveredSkillName, setHoveredSkillName] = useState<string | null>(null);

  const tagsRef = useRef<Tag3D[]>([]);
  const rotationRef = useRef({ x: 0.005, y: 0.005 });
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize 3D positions distributed on a sphere
    const count = SKILLS_DATA.length;
    const radius = 160; // sphere radius
    const tags: Tag3D[] = SKILLS_DATA.map((skill, index) => {
      // Golden spiral distribution on sphere
      const phi = Math.acos(-1 + (2 * index) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      return {
        skill,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        projectedX: 0,
        projectedY: 0,
        scale: 1,
        alpha: 1,
      };
    });

    tagsRef.current = tags;

    // Handle Resize using ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      if (!canvas || !containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 450;
      canvas.width = w;
      canvas.height = h;
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Capture mouse positions to adjust rotation speed/direction
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - canvas.width / 2;
      const y = e.clientY - rect.top - canvas.height / 2;
      
      mousePosRef.current = { x, y };
      
      // Calculate rotation speed based on distance from center
      rotationRef.current = {
        y: x * 0.00004,
        x: -y * 0.00004,
      };
    };

    const handleMouseLeave = () => {
      // Default slow idle rotation
      rotationRef.current = { x: 0.003, y: 0.003 };
    };

    // Handle Click to select skill
    const handleCanvasClick = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Find closest projected tag within bounds
      let closestTag: Tag3D | null = null;
      let minDistance = 35; // click sensitivity radius in px

      tagsRef.current.forEach((tag) => {
        const dx = clickX - tag.projectedX;
        const dy = clickY - tag.projectedY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Prefer tags in foreground (z > 0)
        if (dist < minDistance && (closestTag === null || tag.z > closestTag.z)) {
          minDistance = dist;
          closestTag = tag;
        }
      });

      if (closestTag) {
        setSelectedSkill(closestTag.skill);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleCanvasClick);

    // Render loop
    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Rotate tags around axes
      const rx = rotationRef.current.x;
      const ry = rotationRef.current.y;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      // 1. Calculate positions and update tag projection
      tagsRef.current.forEach((tag) => {
        // Rotate around Y axis
        const x1 = tag.x * cosY - tag.z * sinY;
        const z1 = tag.z * cosY + tag.x * sinY;

        // Rotate around X axis
        const y2 = tag.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + tag.y * sinX;

        tag.x = x1;
        tag.y = y2;
        tag.z = z2;

        // Perspective projection
        const depth = 280; // virtual focal depth
        const scale = depth / (depth + z2); // smaller for negative Z, larger for positive Z
        tag.scale = scale;
        tag.projectedX = cx + x1 * scale;
        tag.projectedY = cy + y2 * scale;
        tag.alpha = Math.max(0.18, scale - 0.25); // fade out items in the back
      });

      // 2. Sort tags by Z (depth sorting) so foreground tags are drawn on top
      const sortedTags = [...tagsRef.current].sort((a, b) => a.z - b.z);

      // Check mouse hovering over any tag in sorted order (foreground first)
      let currentHovered: Tag3D | null = null;
      const mX = mousePosRef.current.x + cx;
      const mY = mousePosRef.current.y + cy;

      for (let i = sortedTags.length - 1; i >= 0; i--) {
        const tag = sortedTags[i];
        const dx = mX - tag.projectedX;
        const dy = mY - tag.projectedY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Tags in foreground are easier to hover
        const radiusLimit = 24 * tag.scale;
        if (dist < radiusLimit && tag.z > -50) {
          currentHovered = tag;
          break; // found top-most hovered element
        }
      }

      setHoveredSkillName(currentHovered ? currentHovered.skill.name : null);

      // 3. Draw connection lines between nearby foreground elements to look like a neural constellation
      ctx.lineWidth = 0.5;
      for (let i = 0; i < sortedTags.length; i++) {
        const tagA = sortedTags[i];
        if (tagA.z < -40) continue; // Skip deep background connections

        for (let j = i + 1; j < sortedTags.length; j++) {
          const tagB = sortedTags[j];
          if (tagB.z < -40) continue;

          // Connect if they are spatially close in 3D
          const dx = tagA.x - tagB.x;
          const dy = tagA.y - tagB.y;
          const dz = tagA.z - tagB.z;
          const distance3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance3D < 110) {
            const grad = ctx.createLinearGradient(
              tagA.projectedX,
              tagA.projectedY,
              tagB.projectedX,
              tagB.projectedY
            );
            const opacity = (1 - distance3D / 110) * 0.15 * tagA.alpha * tagB.alpha;
            grad.addColorStop(0, `rgba(0, 240, 255, ${opacity})`);
            grad.addColorStop(1, `rgba(189, 0, 255, ${opacity})`);
            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(tagA.projectedX, tagA.projectedY);
            ctx.lineTo(tagB.projectedX, tagB.projectedY);
            ctx.stroke();
          }
        }
      }

      // 4. Draw tags
      sortedTags.forEach((tag) => {
        const isSelected = selectedSkill?.name === tag.skill.name;
        const isHovered = hoveredSkillName === tag.skill.name;

        ctx.save();

        // Label fonts
        const baseSize = 13;
        const fontSize = Math.round(baseSize * tag.scale);
        ctx.font = `500 ${fontSize}px "Space Grotesk", sans-serif`;

        // Measure text size to draw backgrounds
        const textWidth = ctx.measureText(tag.skill.name).width;
        const padX = 10 * tag.scale;
        const padY = 6 * tag.scale;
        const rectW = textWidth + padX * 2;
        const rectH = fontSize + padY * 2;

        // Draw pill card background for foreground items
        if (tag.z > -60) {
          ctx.beginPath();
          const r = 6 * tag.scale; // roundness
          const rx = tag.projectedX - rectW / 2;
          const ry = tag.projectedY - rectH / 2;

          ctx.roundRect ? ctx.roundRect(rx, ry, rectW, rectH, r) : ctx.rect(rx, ry, rectW, rectH);

          if (isSelected) {
            // Selected Neon cyan/purple gradient fill
            const grad = ctx.createLinearGradient(rx, ry, rx + rectW, ry);
            grad.addColorStop(0, `rgba(0, 240, 255, ${tag.alpha * 0.85})`);
            grad.addColorStop(1, `rgba(189, 0, 255, ${tag.alpha * 0.85})`);
            ctx.fillStyle = grad;
            ctx.shadowColor = "#00f0ff";
            ctx.shadowBlur = 15;
          } else if (isHovered) {
            // Hover background
            ctx.fillStyle = `rgba(15, 23, 42, ${tag.alpha * 0.9})`;
            ctx.strokeStyle = `rgba(0, 240, 255, ${tag.alpha * 0.85})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.shadowColor = "#00f0ff";
            ctx.shadowBlur = 8;
          } else {
            // Standard dark glass look
            ctx.fillStyle = `rgba(2, 6, 23, ${tag.alpha * 0.65})`;
            ctx.strokeStyle = `rgba(255, 255, 255, ${tag.alpha * 0.08})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          ctx.fill();
        }

        // Reset shadow
        ctx.shadowBlur = 0;

        // Draw text
        if (isSelected) {
          ctx.fillStyle = "#ffffff";
        } else if (isHovered) {
          ctx.fillStyle = "#00f0ff";
        } else {
          // Color text slightly differently based on category
          if (tag.skill.category === "Programming") {
            ctx.fillStyle = `rgba(0, 240, 255, ${tag.alpha})`;
          } else if (tag.skill.category === "Machine Learning") {
            ctx.fillStyle = `rgba(189, 0, 255, ${tag.alpha})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${tag.alpha * 0.95})`;
          }
        }

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(tag.skill.name, tag.projectedX, tag.projectedY);

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [selectedSkill, hoveredSkillName]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* 3D Tag Sphere Canvas */}
      <div
        ref={containerRef}
        className="lg:col-span-7 h-[400px] md:h-[480px] w-full relative flex items-center justify-center bg-slate-950/20 border border-slate-900/50 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl shadow-indigo-950/10"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none" />
        
        {/* Canvas for 3D Tags */}
        <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />

        {/* Floating Instruction overlay */}
        <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-xs text-slate-500 bg-slate-900/60 backdrop-blur-sm border border-slate-800/40 px-3 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Interactive 3D Neural Constellation</span>
        </div>

        <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-500 animate-pulse">
          Click any tag to inspect metrics
        </div>
      </div>

      {/* Metric Inspector Card */}
      <div className="lg:col-span-5 flex flex-col h-full justify-center">
        <AnimatePresence mode="wait">
          {selectedSkill ? (
            <motion.div
              key={selectedSkill.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900/70 border border-cyan-500/20 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl shadow-cyan-950/5 relative overflow-hidden"
            >
              {/* Decorative radial lighting in background */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />

              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase">
                  {selectedSkill.category}
                </span>
                
                {selectedSkill.category === "Machine Learning" ? (
                  <Brain className="w-6 h-6 text-purple-400" />
                ) : selectedSkill.category === "Programming" ? (
                  <Cpu className="w-6 h-6 text-cyan-400" />
                ) : (
                  <BookOpen className="w-6 h-6 text-emerald-400" />
                )}
              </div>

              <h3 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mb-2">
                {selectedSkill.name}
              </h3>

              <div className="space-y-6 mt-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-mono text-slate-400">Core Expertise</span>
                    <span className="text-lg font-mono font-semibold text-cyan-400">
                      {selectedSkill.level}%
                    </span>
                  </div>
                  {/* Dynamic Skill bar */}
                  <div className="h-2 w-full bg-slate-950/80 rounded-full overflow-hidden border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${selectedSkill.color} rounded-full`}
                    />
                  </div>
                </div>

                <div className="border-t border-slate-800/60 pt-5 text-sm text-slate-300 leading-relaxed font-sans space-y-3">
                  <p>
                    Demonstrated extensive architectural and deployment expertise utilizing{" "}
                    <strong className="text-white font-medium">{selectedSkill.name}</strong> to construct scalable systems, orchestrate robust models, or pipeline efficient analytical architectures.
                  </p>
                  <p className="text-xs text-slate-400 italic">
                    * Interactive metrics collected through real-world enterprise internships, academic engineering assessments, and professional GCP/IBM certification milestones.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center p-8 bg-slate-900/40 border border-slate-800/60 backdrop-blur-md rounded-3xl">
              <Sparkles className="w-10 h-10 text-cyan-400/50 mx-auto mb-4 animate-bounce" />
              <p className="text-slate-400 font-mono text-sm">
                Select a skill from the 3D Neural Constellation to view proficiencies and projects.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
