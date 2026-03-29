"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SecretVault() {
  return (
    <main className="min-h-screen bg-[#050505] text-zinc-500 flex flex-col items-center justify-center font-mono p-6">
      {/* Background Glow */}
      <div className="fixed inset-0 bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 max-w-xl"
      >
        <div className="inline-block px-3 py-1 border border-zinc-800 rounded-full text-[10px] tracking-[0.3em] uppercase text-zinc-600">
          // Restricted Archive_09
        </div>
        
        <h1 className="text-white text-4xl font-black tracking-tighter uppercase italic">
          The <span className="text-indigo-500">Vault</span>
        </h1>
        
        <p className="text-sm leading-relaxed text-zinc-400">
          Welcome, Fahim. Ekhane tomar unreleased projects, raw motion tests, 
          ebong experimental branding concepts thakbe jeta public portfolio-te nei.
        </p>

        <div className="grid grid-cols-1 gap-4 mt-12">
           {/* Ekhane tumi tomar hidden projects-er link ba image add korte paro */}
           <div className="p-8 border border-zinc-900 bg-zinc-900/20 rounded-[2rem] italic">
              "No files uploaded yet. Secure connection established."
           </div>
        </div>

        <Link href="/" className="mt-12 text-xs hover:text-white transition-colors uppercase tracking-widest border-b border-zinc-800 pb-1 inline-block">
          Return to Terminal
        </Link>
      </motion.div>
    </main>
  );
}
