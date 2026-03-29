"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function FunPage() {
  const [score, setScore] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);

  // Mouse move effect for background glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClick = () => {
    setScore(score + 1);
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 150);
  };

  return (
    <main className="relative min-h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-mono select-none">
      
      {/* Interactive Background Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.15), transparent)`,
        }}
      />

      {/* Main Game Area */}
      <motion.div 
        animate={isGlitching ? { x: [-2, 2, -2, 0], filter: "hue-rotate(90deg)" } : {}}
        className="z-10 text-center space-y-8"
      >
        <div className="text-[10px] tracking-[0.6em] text-zinc-600 uppercase italic">
          // Interactive_Playground_v1.0
        </div>

        <div className="relative inline-block">
          <motion.h1 
            className="text-8xl md:text-9xl font-black italic tracking-tighter text-white opacity-10 select-none"
          >
            {score.toString().padStart(3, '0')}
          </motion.h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-sm text-indigo-400 font-bold tracking-widest uppercase">System Points</span>
          </div>
        </div>

        <p className="text-zinc-500 text-xs max-w-xs mx-auto leading-relaxed">
          "The more you click, the more the reality glitches. Do not exceed system limits."
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
          className="mt-8 px-12 py-5 bg-white text-black font-black uppercase italic tracking-tighter text-xl hover:bg-indigo-500 hover:text-white transition-colors duration-300 rounded-full"
        >
          Inject Energy
        </motion.button>
      </motion.div>

      {/* Footer Navigation */}
      <div className="absolute bottom-10 z-10">
        <Link href="/" className="text-[10px] text-zinc-700 hover:text-white transition-all uppercase tracking-widest border-b border-zinc-900 pb-2">
          ← Exit Simulation
        </Link>
      </div>

      {/* Random Floating Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[1px] h-32 bg-gradient-to-b from-indigo-500 to-transparent" />
        <div className="absolute bottom-1/4 right-1/3 w-20 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </div>
    </main>
  );
}
