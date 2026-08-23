// components/HeroSection.tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap, CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6"; // [source: 1]

export default function HeroSection() {
  const WHATSAPP_LINK = "https://wa.me/8801855941177"; // [source: 1]

  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 text-center flex flex-col items-center">
        
        {/* Availability Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for 2 Monthly Retainer Slots This Month</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-black tracking-tight leading-[1.05] text-white max-w-4xl"
        >
          Visuals That Turn Feed Scrollers Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Paying Customers.</span>
        </motion.h1>

        {/* Value Proposition */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-zinc-400 text-lg md:text-xl max-w-2xl font-normal leading-relaxed"
        >
          I help F-commerce brands, tech shops, and content creators boost conversions through high-CTR ad designs, social media kits, and video edits [source: 1].
        </motion.p>

        {/* High CTR Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a 
            href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Hi Fahim, I would like to discuss a design project for my brand.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-black font-extrabold rounded-2xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 text-base"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span>Chat on WhatsApp (Instant Response)</span>
          </a>

          <a 
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 text-zinc-200 font-bold rounded-2xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 text-base"
          >
            <span>View Pricing Packages</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-400" />
          </a>
        </motion.div>

        {/* Quick Social Proof Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-14 pt-8 border-t border-zinc-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl text-zinc-400 text-sm font-mono"
        >
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>2+ Years Experience</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Fast 24-48h Delivery</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Photoshop & AI Expert</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Source Files Included</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
