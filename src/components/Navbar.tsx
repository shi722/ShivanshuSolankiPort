/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Terminal, Cpu, GraduationCap, FolderCode, Mail, HelpCircle, Trophy } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "#home", icon: Terminal },
  { name: "About", href: "#about", icon: HelpCircle },
  { name: "Skills", href: "#skills", icon: Cpu },
  { name: "Experience", href: "#experience", icon: GraduationCap },
  { name: "Projects", href: "#projects", icon: FolderCode },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll height to make navbar glassmorphic
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section based on scroll offset
      const sections = NAV_ITEMS.map((item) => item.href.slice(1));
      let currentSection = "home";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section occupies the center of the viewport
          if (rect.top <= 160 && rect.bottom >= 160) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.slice(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/80 border-b border-slate-900/80 backdrop-blur-md shadow-lg shadow-slate-950/40"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2.5 font-mono text-lg font-bold tracking-tight text-white group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-purple-500/35 group-hover:scale-105 transition-all duration-300">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent group-hover:text-cyan-300 transition-colors duration-300">
              Shivanshu<span className="text-purple-400">.solanki</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/40 border border-slate-900/50 rounded-full px-1.5 py-1 backdrop-blur-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 text-xs font-mono font-medium tracking-wide rounded-full transition-all duration-300 ${
                    isActive ? "text-cyan-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navBubble"
                      className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Social / Action button on right */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="px-5 py-2 text-xs font-mono font-medium tracking-wider text-slate-300 border border-slate-800 rounded-full hover:text-white hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-950/40 transition-all duration-300 bg-slate-950/30"
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-950/50 border border-slate-800/60 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Side-Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-20 w-full h-[calc(100vh-80px)] bg-slate-950/95 backdrop-blur-xl z-40 border-t border-slate-900/60 flex flex-col md:hidden px-6 py-8"
          >
            <div className="space-y-4">
              <p className="font-mono text-slate-500 text-[10px] uppercase tracking-widest mb-6">
                Navigation Mesh
              </p>
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center gap-4 py-3.5 px-4 rounded-2xl border font-sans text-base font-semibold tracking-wide transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-lg shadow-cyan-950/10"
                        : "text-slate-400 border-transparent hover:text-white hover:bg-slate-900/40"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>

            <div className="mt-auto border-t border-slate-900/80 pt-6">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="w-full inline-flex items-center justify-center py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-sans font-bold tracking-wider rounded-2xl hover:scale-102 hover:shadow-lg hover:shadow-cyan-500/15 transition-all duration-300"
              >
                Hire Me Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
