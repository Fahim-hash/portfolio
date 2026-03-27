"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { 
  ArrowUpRight, 
  Play, 
  X, 
  Github, 
  Mail, 
  ExternalLink, 
  Code, 
  Palette, 
  Zap, 
  Menu 
} from "lucide-react";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaWhatsapp, 
  FaXTwitter 
} from "react-icons/fa6";
import { SiBehance, SiAdobephotoshop, SiAdobepremierepro, SiFigma, SiPython } from "react-icons/si";

// --- DATA CONSTANTS ---

const CLIENT_LOGOS = [
  { name: "TongErKhobor", src: "/logos/tongerkhobor.png", url: "https://www.instagram.com/tongerkhobor" },
  { name: "ScienceBaze", src: "/logos/sciencebaze.png", url: "#" },
  { name: "Ta'atuf Foundation", src: "/logos/taatuf.png", url: "#" },
  { name: "Willes Literary", src: "/logos/vb.png", url: "#" },
  { name: "RelaxStudio", src: "/logos/relax.png", url: "#" },
  { name: "Omni Diplomatic", src: "/logos/odf.png", url: "#" },
];

const PROJECTS = [
  {
    id: 1,
    title: "Willian's Study Tour 26",
    tag: "Event Branding",
    desc: "A vibrant, 360-degree brand identity designed for a modern tour experience. Blending Neo-Noir with electric highlights.",
    img: "/designs/work5.png",
    link: "#",
    size: "large"
  },
  {
    id: 2,
    title: "26 March Poster",
    tag: "Visual Design",
    desc: "Cinematic photo manipulation for national independence day.",
    img: "/designs/work1.png",
    link: "#",
    size: "tall"
  },
  {
    id: 3,
    title: "WLC Event Banner",
    tag: "Branding",
    desc: "Clean, minimal typography for literary events.",
    img: "/designs/work2.jpg",
    link: "#",
    size: "wide"
  },
  {
    id: 4,
    title: "Member Recruitment",
    tag: "Social Media",
    desc: "High-contrast recruitment posters for Omni Diplomatic Forum.",
    img: "/designs/Artboard 1.png",
    link: "#",
    size: "square"
  },
  {
    id: 5,
    title: "Eid Mubarak Series",
    tag: "Illustration",
    desc: "A series of digital illustrations for RelaxStudio.",
    img: "/designs/eid.png",
    link: "#",
    size: "tall"
  },
  {
    id: 6,
    title: "Madesiho T-Shirt",
    tag: "Apparel",
    desc: "Custom apparel design and promotional campaign.",
    img: "/designs/work10.png",
    link: "#",
    size: "square"
  }
];

const VIDEOS = [
  {
    src: "/videos/AQOKsDmJ8VnS7Kh99V0l4Fwgiu0ViZnniPzTFvmS2aEfsrXe5twZkJd2N9GwZpx0a_GXkTcdIkd9GHhLY6R78DAylhJbnMZYT58KQvlAiZThIg.mp4",
    title: "Promotional Reel 2026",
    client: "Willian's Study Tour",
    thumb: "/videos/thumb1.jpg"
  },
  {
    src: "/videos/AQO1So12voezPc1KQwH5LFJPTGZYHbzCgfqvClz0-Bcafh9e06klMBh_tVCxjRZ4k2ZYZaQrbWI6BEyRbiZpBWqA4S6Y1Pg-e8SuMNNmVek7hw.mp4",
    title: "Nobinboron '25",
    client: "Willes Literary Club",
    thumb: "/videos/thumb2.jpg"
  }
];

const TESTIMONIALS = [
  { name: "Tahmid Rahman", role: "President, WLC", text: "Unar kaajer idea onk.. ekjon designer er jonno eta onk boro advantage." },
  { name: "Mohammad Nasir", role: "ScienceBaze", text: "Unique blend of design sense and technical automation. He optimizes workflows." },
  { name: "Shamiul Saad", role: "CEO, TEK", text: "Designs are clean, creative. He has demonstrated great potential and dedication." },
  { name: "Ahiya'r Ammu", role: "Art Collector", text: "Cinematic grading er baap! Protita poster e akta alada vibe thake." },
];

const SOCIALS = [
  { name: "Facebook", icon: FaFacebookF, url: "#" },
  { name: "Instagram", icon: FaInstagram, url: "#" },
  { name: "Behance", icon: SiBehance, url: "#" },
  { name: "LinkedIn", icon: FaLinkedinIn, url: "#" },
];

// --- ANIMATION VARIANTS ---

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.1 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } }
};

// --- SUB-COMPONENTS ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-[100] px-10 py-8 flex justify-between items-center mix-blend-difference pointer-events-none">
    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="pointer-events-auto">
      <span className="text-xl font-black tracking-tighter">SFM.</span>
    </motion.div>
    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex gap-8 pointer-events-auto">
      <Menu className="w-6 h-6 cursor-pointer" />
    </motion.div>
  </nav>
);

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-16">
    <motion.p {...fadeInUp} className="text-accent font-mono text-sm tracking-[0.4em] uppercase mb-4">{subtitle}</motion.p>
    <motion.h2 {...fadeInUp} className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic">{title}</motion.h2>
  </div>
);

// --- MAIN PAGE COMPONENT ---

export default function Portfolio() {
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEOS[0] | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Scroll Progress logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main ref={containerRef} className="relative bg-[#050505] selection:bg-accent/30 overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent z-[101] origin-left" style={{ scaleX }} />

      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 blur-[180px] rounded-full -z-10" />
        
        <div className="text-center z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-[10vw] font-black leading-[0.8] tracking-tighter uppercase italic text-white">
              Syed Fahim<br />
              <span className="text-zinc-800 outline-text hover:text-accent transition-all duration-700">Muddasir</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-xl text-zinc-500 font-medium tracking-[0.2em] uppercase"
          >
            Creative Lead — Media Strategist — Obsidian Soul
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="relative mt-20 w-full max-w-7xl aspect-[21/9] rounded-[3rem] overflow-hidden group shadow-2xl shadow-accent/5"
        >
          <Image src="/banner.jpg" alt="Banner" fill className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </motion.div>
      </section>

      {/* --- ABOUT & STATS SECTION --- */}
      <section className="py-40 px-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-20">
        <div className="md:col-span-7">
          <SectionHeader title="The Identity" subtitle="Who am I?" />
          <motion.p {...fadeInUp} className="text-3xl md:text-4xl text-zinc-400 leading-tight font-medium">
            I don’t just design visuals; I engineer <span className="text-white">Obsidian Complexity</span>. 
            Blending cinematic aesthetics with technical automation to create digital identities that are unbreakable.
          </motion.p>
          
          <div className="mt-16 flex flex-wrap gap-4">
            {['Visual Branding', 'Python Automation', 'UI/UX', 'Video Editing', 'Motion'].map(skill => (
              <motion.span 
                key={skill} 
                whileHover={{ scale: 1.1, color: '#6366f1' }}
                className="px-6 py-3 rounded-full border border-white/10 text-sm font-bold tracking-widest uppercase cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-5 flex flex-col justify-end space-y-12">
          {[
            { label: "Years Experience", value: "02+" },
            { label: "Successful Projects", value: "50+" },
            { label: "Happy Clients", value: "15+" }
          ].map((stat, i) => (
            <motion.div key={i} {...fadeInUp} className="border-b border-white/5 pb-8 group">
              <h4 className="text-6xl font-black text-white group-hover:text-accent transition-colors">{stat.value}</h4>
              <p className="text-zinc-500 uppercase tracking-widest text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SELECTED WORKS GRID (MASONRY) --- */}
      <section className="py-40 px-10 max-w-[1400px] mx-auto">
        <SectionHeader title="Case Archive" subtitle="Visual Showcase" />
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[300px]"
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className={`relative rounded-[2.5rem] overflow-hidden group bg-zinc-900 
                ${project.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                ${project.size === 'tall' ? 'md:row-span-2' : ''}
                ${project.size === 'wide' ? 'md:col-span-2' : ''}
              `}
            >
              <Image src={project.img} alt={project.title} fill className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end">
                <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-2">{project.tag}</span>
                <h3 className="text-3xl font-black text-white mb-4 group-hover:translate-x-2 transition-transform">{project.title}</h3>
                <p className="text-zinc-400 text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">{project.desc}</p>
              </div>
              <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="text-white w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- VIDEO MOTION SECTION --- */}
      <section className="py-40 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-10">
          <SectionHeader title="Motion Fluidity" subtitle="Video Graphics" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {VIDEOS.map((vid, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp}
                onClick={() => setSelectedVideo(vid)}
                className="relative aspect-video rounded-[3rem] overflow-hidden group cursor-pointer"
              >
                <video src={vid.src} muted loop autoPlay className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                    <Play className="fill-white w-8 h-8 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-8 left-10">
                  <p className="text-accent font-mono text-xs mb-1 uppercase tracking-widest">{vid.client}</p>
                  <h4 className="text-2xl font-bold text-white">{vid.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE MARQUEE (PARTNERS) --- */}
      <section className="py-40 overflow-hidden">
        <div className="marquee-mask">
          <div className="animate-marquee flex gap-20 items-center">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <div key={i} className="flex items-center gap-6 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <div className="relative w-16 h-16">
                   <Image src={logo.src} alt={logo.name} fill className="object-contain" />
                </div>
                <span className="text-4xl font-black text-white tracking-tighter uppercase">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (DRAG INTERACTIVE) --- */}
      <section className="py-40 px-10 max-w-7xl mx-auto overflow-hidden">
        <SectionHeader title="Collaborators" subtitle="Client Love" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={i}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              className="bg-zinc-900/40 p-10 rounded-[2.5rem] border border-white/5 cursor-grab active:cursor-grabbing hover:border-accent/50 transition-colors"
            >
              <p className="text-zinc-400 italic text-lg leading-relaxed mb-10">"{t.text}"</p>
              <h5 className="font-black text-white text-xl uppercase tracking-tighter">{t.name}</h5>
              <p className="text-accent text-xs font-mono mt-1 tracking-widest">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FOOTER / CONTACT --- */}
      <footer className="py-40 px-10 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-20">
          <div>
            <h2 className="text-[8vw] font-black leading-none tracking-tighter uppercase mb-10">
              Let's build<br />
              <span className="text-accent italic">Something Bold.</span>
            </h2>
            <div className="flex gap-4">
              <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-accent hover:text-white transition-all">
                Send a message
              </button>
              <button className="p-5 border border-white/10 rounded-full hover:border-white transition-all">
                <Mail className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex gap-8 mb-10 justify-end">
              {SOCIALS.map(s => (
                <a key={s.name} href={s.url} className="text-zinc-500 hover:text-white transition-colors">
                  <s.icon className="w-8 h-8" />
                </a>
              ))}
            </div>
            <p className="text-zinc-600 text-sm font-mono">
              PRODUCED BY RELAXSTUDIO © 2026<br />
              DHAKA, BANGLADESH — 23°42' N, 90°24' E
            </p>
          </div>
        </div>
      </footer>

      {/* --- VIDEO MODAL --- */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-[3rem] overflow-hidden bg-zinc-900 shadow-3xl"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelectedVideo(null)} className="absolute top-10 right-10 z-10 p-4 bg-white/10 rounded-full text-white">
                <X className="w-6 h-6" />
              </button>
              <video src={selectedVideo.src} controls autoPlay className="w-full h-full object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Mouse Cursor Gradient Glow */}
      <div 
        className="fixed w-[400px] h-[400px] bg-accent/20 blur-[120px] rounded-full pointer-events-none z-[-1]"
        style={{ left: mousePos.x - 200, top: mousePos.y - 200 }}
      />
    </main>
  );
}
