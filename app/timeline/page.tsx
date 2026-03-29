"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const careerEvents = [
  {
    year: "2026",
    title: "Founder & Creative Lead",
    organization: "RelaxStudio",
    description: "Launched a full-scale creative agency focusing on cinematic branding and visual strategy.",
  },
  {
    year: "2025",
    title: "Media Department Lead",
    organization: "Ta'atuf Foundation",
    description: "Leading media operations, content strategy, and digital identity for community initiatives.",
  },
  {
    year: "2024",
    title: "Lead Designer",
    organization: "ODF (Omni Diplomatic Forum)",
    description: "Managed event branding, motion graphics, and visual communication for student-led forums.",
  },
  {
    year: "2023",
    title: "Junior Creative Designer",
    organization: "Freelance",
    description: "Started the journey by crafting minimalist logos and tech-wear inspired digital art.",
  },
];

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white p-8 md:p-24 font-sans">
      <div className="max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl font-black italic tracking-tighter mb-16 text-indigo-500"
        >
          CAREER_JOURNEY
        </motion.h1>

        <div className="relative border-l border-zinc-900 ml-3 md:ml-6 space-y-12">
          {careerEvents.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Dot on the timeline */}
              <div className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              
              <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase">
                {event.year}
              </span>
              
              <h3 className="text-xl font-bold mt-1 text-zinc-100">
                {event.title} <span className="text-zinc-600 font-normal">@ {event.organization}</span>
              </h3>
              
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed max-w-md">
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>

        <Link href="/" className="mt-20 inline-block text-[10px] uppercase tracking-[0.5em] text-zinc-600 hover:text-white transition-all border-b border-zinc-900 pb-2">
          ← Return to Terminal
        </Link>
      </div>
    </main>
  );
}
