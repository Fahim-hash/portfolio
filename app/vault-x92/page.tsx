"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti"; // Terminal-e 'npm install react-confetti' koro

export default function BirthdayVault() {
  const [unlocked, setUnlocked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleUnlock = () => {
    setShowConfetti(true);
    setUnlocked(true);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center font-mono overflow-hidden">
      {showConfetti && <ReactConfetti recycle={false} numberOfPieces={500} gravity={0.1} />}

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div 
            key="lock"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center space-y-8"
          >
            <div className="text-xs tracking-[0.5em] text-zinc-500 uppercase italic">// Restricted_File_Locked</div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(99, 102, 241, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUnlock}
              className="px-10 py-4 border border-indigo-500 text-indigo-400 rounded-full font-bold uppercase tracking-widest bg-indigo-500/5 backdrop-blur-sm"
            >
              Initialize Sequence
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center max-w-lg px-6"
          >
            <h1 className="text-6xl font-black italic tracking-tighter mb-4 gradient-text">
              HBD <span className="text-indigo-500 font-outline-2">[NAME]</span>!
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              "Accessing friendship archives... Connection stable. 
              Wishing you another year of cinematic adventures."
            </p>
            
            {/* Project Link inside Surprise */}
            <div className="p-6 border border-zinc-900 bg-zinc-900/40 rounded-3xl">
              <span className="text-[10px] text-indigo-500 uppercase tracking-widest">Special Project</span>
              <h3 className="text-white mt-2">The Gift of Code</h3>
              <a href="https://github.com/pinakkk/website-for-girlfriend" className="text-xs text-zinc-500 underline mt-2 block hover:text-white">View Repository</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
