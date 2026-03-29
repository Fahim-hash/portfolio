"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const careerEvents = [
  {
    year: "2026",
    title: "Founder & Creative Lead",
    org: "RelaxStudio",
    desc: "Spearheading a creative powerhouse, focusing on cinematic brand identities and high-fidelity digital experiences.",
    status: "Current"
  },
  {
    year: "2025",
    title: "Media Department Lead",
    org: "Ta'atuf Foundation",
    desc: "Orchestrating visual storytelling and digital outreach for large-scale social initiatives.",
    status: "Active"
  },
  {
    year: "2024",
    title: "Branding Lead",
    org: "ODF (Omni Diplomatic Forum)",
    desc: "Defined the visual language for international student forums and high-profile diplomatic events.",
    status: "Completed"
  },
  {
    year: "2023",
    title: "Visual Artist",
    org: "Freelance",
    desc: "Deep-dived into tech-wear aesthetics and minimalist logo systems for global clients.",
    status: "Legacy"
  }
];

export default function PremiumTimeline() {
  return (
    <main className="min-h-screen bg-[#020202] text-zinc-400 p-6 md:p-24 selection:bg-indigo-500/30">
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-20 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] tracking-[0.5em] text-indigo-500 uppercase font-mono"
          >
            // Sequential_Data_Stream
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black italic tracking-tighter text-white"
          >
            HISTORY<span className="text-zinc-800">.LOG</span>
          </motion.h1>
        </header>

        {/* Timeline Container */}
        <div className="relative">
          {/* Animated Central Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 w-[1px] bg-gradient-to-b from-indigo-500 via-zinc-800 to-transparent top-0"
          />

          <div className="space-y-24">
            {careerEvents.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Node (The Dot) */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 mt-2 w-6 h-6 flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${
                  index % 2 === 0 ? "md:pr-16 text-left md:text-right" : "md:pl-16 text-left"
                }`}>
                  <div className="group p-8 rounded-[2rem] border border-zinc-900 bg-zinc-950/40 hover:border-indigo-500/50 transition-all duration-500 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4 justify-start md:group-hover:justify-normal">
                       <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full uppercase tracking-widest">
                         {event.year}
                       </span>
                       <span className="text-[10px] text-zinc-600 font-mono tracking-tighter uppercase">
                         STATUS: {event.status}
                       </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:italic transition-all">
                      {event.title}
                    </h3>
                    <div className="text-sm text-zinc-500 font-medium mb-4 italic">
                      @ {event.org}
                    </div>
                    
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {event.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Link */}
        <footer className="mt-32 text-center pb-20">
          <Link 
            href="/" 
            className="group inline-flex flex-col items-center gap-4 text-zinc-600 hover:text-white transition-all"
          >
            <div className="w-px h-12 bg-zinc-800 group-hover:bg-indigo-500 transition-all" />
            <span className="text-[10px] uppercase tracking-[0.8em]">End of Archive_09</span>
          </Link>
        </footer>
      </div>
    </main>
  );
}
