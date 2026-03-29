"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SecretPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-zinc-500 flex items-center justify-center font-mono p-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full border border-zinc-900 bg-zinc-950/50 p-10 rounded-[2.5rem] text-center"
      >
        <div className="text-[10px] tracking-[0.4em] uppercase mb-6 text-zinc-700">
          // Private_Archive
        </div>
        
        <h1 className="text-white text-xl mb-4 tracking-tighter italic font-bold">
          Under Development
        </h1>
        
        <p className="text-sm leading-relaxed text-zinc-500">
          This space is currently reserved for experimental projects and personal logs. 
          Nothing to see here for now.
        </p>

        <div className="mt-10 h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        
        <Link 
          href="/" 
          className="mt-8 inline-block text-[10px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors underline underline-offset-8"
        >
          Return Home
        </Link>
      </motion.div>
    </main>
  );
}
