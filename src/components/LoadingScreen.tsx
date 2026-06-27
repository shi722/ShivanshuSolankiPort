/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Sparkles } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState("ESTABLISHING ENCRYPTED CORRELATION LINK...");

  const logs = [
    "INGESTING CLOUD PROTOCOL STACKS...",
    "MAPPING INTERACTIVE NEURAL CONSTELLATIONS...",
    "RESOLVING THREE.JS GRAPHIC BUFFER MATRICES...",
    "ESTABLISHING PERSISTENT CORE PIPELINES...",
    "COHESIVE WEB INTERFACES ACTIVE.",
  ];

  useEffect(() => {
    // Increment loading bar percentage sequentially
    let start = 0;
    const interval = setInterval(() => {
      start += Math.floor(Math.random() * 8) + 3;
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
      setProgress(start);

      // Rotate log indicators based on progress percentages
      if (start < 25) {
        setLogText(logs[0]);
      } else if (start < 50) {
        setLogText(logs[1]);
      } else if (start < 75) {
        setLogText(logs[2]);
      } else if (start < 95) {
        setLogText(logs[3]);
      } else {
        setLogText(logs[4]);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#020208] flex flex-col items-center justify-center p-6 select-none">
      <div className="max-w-md w-full space-y-6 text-center">
        {/* Glowing Logo Circle */}
        <div className="relative w-16 h-16 mx-auto mb-2">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-600 blur-md opacity-70 animate-pulse" />
          <div className="relative w-full h-full rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
            <Terminal className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
        </div>

        {/* Loading Logs and Status */}
        <div className="space-y-1.5">
          <h2 className="text-sm font-mono text-cyan-400 tracking-widest font-semibold uppercase">
            SHIVANSHU SOLANKI • SECURE NODE
          </h2>
          <div className="h-6 flex items-center justify-center">
            <p className="text-[10px] font-mono text-slate-500 tracking-wider">
              {logText}
            </p>
          </div>
        </div>

        {/* Loading Bar Frame */}
        <div className="space-y-2 pt-2">
          <div className="h-1.5 w-full bg-slate-950 rounded-full border border-slate-900 overflow-hidden relative p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 rounded-full shadow-lg shadow-cyan-500/50"
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="flex justify-between items-center font-mono text-[10px] text-slate-500">
            <span>SYNCING PORTFOLIO CORE</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
