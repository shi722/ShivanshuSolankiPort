/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import LoadingScreen from "./components/LoadingScreen";
import Background3D from "./components/Background3D";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills3D from "./components/Skills3D";
import ExperienceSection from "./components/Experience";
import CertificatesSection from "./components/Certificates";
import ProjectsSection from "./components/Projects";
import Achievements from "./components/Achievements";
import ServicesSection from "./components/Services";
import TestimonialsSection from "./components/Testimonials";
import BlogSection from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative text-white font-sans bg-[#020208] min-h-screen selection:bg-cyan-500/35 selection:text-white overflow-x-hidden antialiased scroll-smooth">
      <AnimatePresence mode="wait">
        {loading ? (
          // @ts-ignore
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col min-h-screen relative"
          >
            {/* Immersive 3D Cyber Background Canvas */}
            <Background3D />

            {/* Custom Mouse Glow cursor decoration backplane */}
            <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_var(--mouse-x,_50%)_var(--mouse-y,_50%),_rgba(0,240,255,0.03)_0%,_transparent_55%)]" />

            {/* Main Interactive Sections */}
            <Navbar />

            <main className="grow space-y-12 relative z-10">
              <Home />
              
              <div id="about" className="relative">
                <About />
              </div>

              <div id="skills" className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Embedded 3D Skills Constellation */}
                <div className="text-center space-y-3 mb-16">
                  <span className="text-xs font-mono tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase inline-block">
                    Synaptic Nodes
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-white">
                    3D Interactive <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Skills</span>
                  </h1>
                  <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
                </div>
                <Skills3D />
              </div>

              <ExperienceSection />
              <CertificatesSection />
              <ProjectsSection />
              <Achievements />
              <ServicesSection />
              <TestimonialsSection />
              <BlogSection />
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

