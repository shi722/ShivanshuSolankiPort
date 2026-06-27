/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative border-t border-slate-900/80 bg-slate-950/60 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left column brand name */}
        <div className="flex items-center gap-2 font-mono text-sm font-semibold text-slate-400">
          <span className="text-white">Shivanshu Solanki</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-500">Portfolio Core v3.0</span>
        </div>

        {/* Central social coordinates */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/shi722"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-cyan-400 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href="https://www.linkedin.com/in/shivanshu-solanki-16292a248/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-cyan-400 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href="mailto:shivanshusolanki68@gmail.com"
            className="p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-cyan-400 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Back to Top button */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-slate-500 font-mono text-xs hidden sm:inline-block">
            Syncing Status: Online
          </span>

          <a
            href="#home"
            onClick={handleScrollToTop}
            className="p-3 bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500 text-cyan-400 hover:text-white rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowUp className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center mt-8 pt-6 border-t border-slate-900/40 text-[10px] font-mono text-slate-600">
        © {new Date().getFullYear()} Shivanshu Solanki. All rights and systems reserved.
      </div>
    </footer>
  );
}
