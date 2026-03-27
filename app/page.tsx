"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  ArrowUpRight, 
  Play, 
  X, 
  Mail, 
  Code, 
  Palette, 
  Zap, 
  Menu,
  ChevronRight,
  Monitor,
  Camera,
  Layers
} from "lucide-react";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaWhatsapp, 
  FaXTwitter 
} from "react-icons/fa6";
import { SiBehance } from "react-icons/si";

// --- 1. DATA PRESERVATION (NO CHANGES MADE TO CONTENT) ---

const clientLogos = [
  { name: "TongErKhobor", src: "/logos/tongerkhobor.png", url: "https://www.instagram.com/tongerkhobor" },
  { name: "General Science Olympiad", src: "/logos/sciencebaze.png", url: "https://www.facebook.com/generalscienceolympiad" },
  { name: "Ta'atuf Foundation", src: "/logos/taatuf.png", url: "https://www.facebook.com/taatuf.foundation" },
  { name: "Willes Literary Club", src: "/logos/vb.png", url: "https://www.facebook.com/profile.php?id=61560572355031" },
  { name: "RelaxStudio", src: "/logos/relax.png", url: "https://www.instagram.com/relaxstudio__" },
  { name: "Omni Diplomatic Forum", src: "/logos/odf.png", url: "https://www.facebook.com/OMNIDF" },
];

const testimonials = [
  { name: "Arifur Rahman Tahmid", text: "Unar sathe kaaj kora khubi interesting cz unar working experience er karone day by day new kichu shikha jay and shobcheye boro kotha unar kaajer idea onk..and ekjon designer er jonno eta onk boro advantage.", role: "President, Willes Literary Club (GEN-2)" },
  { name: "Mohammad Nasir", text: "What stands out about Fahim is his unique blend of design sense and technical automation. He doesn’t just design; he optimizes workflows. His contributions to our media strategy have been both innovative and impactful", role: "ScienceBaze" },
  { name: "Shamiul Haque Saad", text: "Fahim’s designs are clean, creative, and improving consistently. He has demonstrated good potential and dedication in his work. With time and experience, he can develop into a very strong and creative designer.", role: "CEO, TongErKhobor" },
  { name: "TongErKhobor Team", text: "Quick delivery ar professional branding-er jonno Fahim-i best choice.", role: "Media Department" },
  { name: "Samin", text: "Event branding-er logic gulo joss! Willian's Study Tour-er kaaj-ta fire chhilo.", role: "HSC '26 Cohort" },
  { name: "Ahiya'r Ammu", text: "Cinematic grading er baap protita poster e akta alada vibe thake .amr onek valo lagse sob gula ,onek sundor kore banano hoise", role: "Friend" },
  { name: "Labib", text: "Tech stack ar UI design-er combination-ta Fahim-er moto kew pare na.", role: "Tech Lead" }
];

const socialLinks = [
  { name: "Facebook", icon: FaFacebookF, url: "https://www.facebook.com/syedfahim.muddasir/", color: "hover:text-[#1877F2]" },
  { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/mr_relax_bro", color: "hover:text-[#E4405F]" },
  { name: "Behance", icon: SiBehance, url: "https://www.behance.net/fahimmuddasir", color: "hover:text-[#0057ff]" },
  { name: "WhatsApp", icon: FaWhatsapp, url: "https://wa.me/01855941177", color: "hover:text-[#25D366]" },
  { name: "LinkedIn", icon: FaLinkedinIn, url: "https://linkedin.com", color: "hover:text-[#0077B5]" },
  { name: "X (Twitter)", icon: FaXTwitter, url: "https://x.com/", color: "hover:text-white" },
];

// --- 2. ANIMATION VARIANTS ---

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
};

const item = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// --- 3. COMPONENTS ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-[100] px-10 py-8 flex justify-between items-center mix-blend-difference">
    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <span className="text-2xl font-black tracking-tighter">SFM.</span>
    </motion.div>
    <div className="flex gap-8 items-center">
      <div className="hidden md:flex gap-8 text-[10px] font-bold tracking-[0.3em] uppercase">
        <a href="#work" className="hover:text-indigo-500 transition-colors">Work</a>
        <a href="#identity" className="hover:text-indigo-500 transition-colors">Identity</a>
        <a href="#testimonials" className="hover:text-indigo-500 transition-colors">Clients</a>
      </div>
      <Menu className="w-6 h-6 cursor-pointer" />
    </div>
  </nav>
);

export default function Portfolio() {
  const [selectedVideo, setSelectedVideo] = useState<{src: string, title: string, tag: string} | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative bg-[#050505] selection:bg-indigo-500/30 overflow-x-hidden min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-[101] origin-left" style={{ scaleX }} />
      
      <Navbar />

      {/* Background Decorative Glows */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[130px] rounded-full" />
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1440px] mx-auto p-6 md:p-16 grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {/* --- MAIN BIO CARD + YOUR PICTURE --- */}
        <motion.div 
          variants={item}
          id="identity"
          className="md:col-span-2 row-span-2 bg-zinc-900/40 border border-white/5 backdrop-blur-3xl rounded-[3.5rem] p-12 flex flex-col justify-between overflow-hidden relative group"
        >
          <div className="flex flex-col items-start gap-10 relative z-10">
            {/* PROFILE PICTURE INTEGRATION */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="w-56 h-56 rounded-[2.5rem] overflow-hidden border-2 border-zinc-800 relative">
                <Image 
                  src="/image_c8477c.png" 
                  alt="Syed Fahim Muddasir"
                  fill
                  className="object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out"
                  priority 
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <h3 className="text-zinc-500 uppercase text-xs tracking-[0.4em] font-black">Creative Designer & Media Lead</h3>
              </div>
              
              <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.85] italic">
                SYED FAHIM<br />
                <span className="text-zinc-700 group-hover:text-indigo-400 transition-all duration-700">MUDDASIR</span>
              </h1>
            </div>
          </div>
          
          <div className="relative z-10 mt-16">
            <p className="text-zinc-400 text-2xl leading-snug max-w-xl font-medium">
              Based in Dhaka, I specialize in crafting cinematic visual identities, advanced photo manipulation, and automated digital tools. <span className="text-white italic">"Obsidian soul—unbreakable design."</span>
            </p>
          </div>

          {/* Decorative Corner */}
          <div className="absolute bottom-0 right-0 p-8 opacity-10">
            <Layers className="w-32 h-32" />
          </div>
        </motion.div>

        {/* --- FEATURED PROJECT CARD --- */}
        <motion.a 
          href="https://www.behance.net/gallery/243588815/Willians-Study-Tour-26-Full-Event-Branding" 
          target="_blank"
          variants={item}
          whileHover={{ y: -5 }}
          className="md:col-span-2 bg-zinc-900/40 border border-white/5 backdrop-blur-3xl rounded-[3rem] p-10 group cursor-pointer overflow-hidden relative"
        >
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-indigo-500 uppercase text-[10px] tracking-[0.4em] mb-4 font-black">Featured Project</h3>
                <h2 className="text-4xl font-black tracking-tight group-hover:text-white transition-colors italic">Willian's Study Tour '26</h2>
              </div>
              <div className="bg-white/5 p-4 rounded-full group-hover:bg-indigo-600 transition-colors">
                <ArrowUpRight className="text-white w-6 h-6" />
              </div>
            </div>
            <p className="text-zinc-500 mt-8 text-lg max-w-sm leading-relaxed">
              A vibrant, 360-degree brand identity designed for a modern tour experience. 
              Sophisticated "dark mode" aesthetic with electric neon highlights.
            </p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-600/10 blur-[80px] group-hover:bg-indigo-600/20 transition-all duration-700" />
        </motion.a>

        {/* --- EXPERTISE TAGS --- */}
        <motion.div 
          variants={item}
          className="md:col-span-2 bg-zinc-900/40 border border-white/5 backdrop-blur-3xl rounded-[3rem] p-10 relative overflow-hidden group"
        >
          <div className="flex items-end gap-6 mb-12">
            <span className="text-8xl font-black text-white tracking-tighter leading-none italic">2<span className="text-indigo-500 italic">Y+</span></span>
            <div className="mb-2">
              <h3 className="text-zinc-500 uppercase text-[10px] tracking-[0.4em] font-black">Professional Creative Sector</h3>
              <div className="w-12 h-1 bg-indigo-500 mt-2 rounded-full" />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 relative z-10">
            {[
              'Visual Branding', 'Logo Design', 'Social Media Poster', 
              'Event Branding', 'T-Shirt Design', 'Motion Graphics', 
              'Video Editing', 'Python Automation'
            ].map((skill) => (
              <span key={skill} className="px-6 py-3 bg-white/5 rounded-full text-xs font-bold border border-white/5 hover:border-indigo-500 transition-all cursor-default text-zinc-400 hover:text-white uppercase tracking-widest">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* --- DESIGN GRID (SAME SIZES PRESERVED) --- */}
        <motion.div variants={item} id="work" className="md:col-span-4 mt-24 mb-10">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic">The <span className="text-indigo-500">Vault</span></h2>
            <div className="text-right hidden md:block">
              <p className="text-zinc-500 font-mono text-[10px] tracking-[0.3em] uppercase">Visual Showcase</p>
              <p className="text-zinc-400 font-bold">2024 — 2026</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 1. Portrait (Masonry logic preserved) */}
            <motion.div whileHover={{ y: -10 }} className="md:row-span-2 group relative overflow-hidden rounded-[3.5rem] bg-zinc-900 border border-white/5 aspect-[4/5]">
              <Image src="/designs/work1.png" alt="W1" fill className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-10 flex flex-col justify-end">
                <span className="text-indigo-500 text-xs font-black tracking-[0.4em] uppercase mb-2">TongErKhobor</span>
                <h3 className="text-4xl font-black text-white italic">26 March Manipulation</h3>
              </div>
            </motion.div>

            {/* 2. Wide Card */}
            <motion.div whileHover={{ y: -10 }} className="md:col-span-2 group relative overflow-hidden rounded-[3.5rem] bg-zinc-900 border border-white/5 aspect-video">
              <Image src="/designs/work2.jpg" alt="W2" fill className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-10 flex flex-col justify-end">
                <span className="text-indigo-500 text-xs font-black tracking-[0.4em] uppercase mb-2">Willes Literary Club</span>
                <h3 className="text-4xl font-black text-white italic">Main Event Banner</h3>
              </div>
            </motion.div>

            {/* 3. Square */}
            <motion.div whileHover={{ y: -10 }} className="group relative overflow-hidden rounded-[3.5rem] bg-zinc-900 border border-white/5 aspect-square">
              <Image src="/designs/work3.png" alt="W3" fill className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter">Ta'atuf Foundation</h3>
              </div>
            </motion.div>

            {/* 4. Square */}
            <motion.div whileHover={{ y: -10 }} className="group relative overflow-hidden rounded-[3.5rem] bg-zinc-900 border border-white/5 aspect-square">
              <Image src="/designs/Artboard 1.png" alt="W4" fill className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter">Omni Diplomatic Forum</h3>
              </div>
            </motion.div>

            {/* 5. Wide Card */}
            <motion.div whileHover={{ y: -10 }} className="md:col-span-2 group relative overflow-hidden rounded-[3.5rem] bg-zinc-900 border border-white/5 aspect-video">
              <Image src="/designs/work5.png" alt="W5" fill className="object-cover opacity-60 group-hover:opacity-100 transition-all" />
              <div className="absolute inset-0 bg-gradient-to-t from-black p-10 flex flex-col justify-end">
                <span className="text-indigo-500 text-xs font-black tracking-[0.4em] uppercase mb-2">Study Tour '26</span>
                <h3 className="text-4xl font-black text-white italic">Full Event Identity</h3>
              </div>
            </motion.div>

            {/* 6. Tall Card */}
            <motion.div whileHover={{ y: -10 }} className="md:row-span-2 group relative overflow-hidden rounded-[3.5rem] bg-zinc-900 border border-white/5 aspect-[4/5]">
              <Image src="/designs/eid.png" alt="W6" fill className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black p-10 flex flex-col justify-end">
                <span className="text-indigo-500 text-xs font-black tracking-[0.4em] uppercase mb-2">Relax Studio</span>
                <h3 className="text-4xl font-black text-white italic">Eid Greetings</h3>
              </div>
            </motion.div>

            {/* 7. Square */}
            <motion.div whileHover={{ y: -10 }} className="group relative overflow-hidden rounded-[3.5rem] bg-zinc-900 border border-white/5 aspect-square">
              <Image src="/designs/work7.png" alt="W7" fill className="object-cover opacity-60 group-hover:opacity-100 transition-all" />
              <div className="absolute inset-0 bg-gradient-to-t from-black p-8 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white italic">WLC Poet B-Day</h3>
              </div>
            </motion.div>

            {/* 8. Square */}
            <motion.div whileHover={{ y: -10 }} className="group relative overflow-hidden rounded-[3.5rem] bg-zinc-900 border border-white/5 aspect-square">
              <Image src="/designs/work8.png" alt="W8" fill className="object-cover opacity-60 group-hover:opacity-100 transition-all" />
              <div className="absolute inset-0 bg-gradient-to-t from-black p-8 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white italic">WLC Mourn Post</h3>
              </div>
            </motion.div>

            {/* 9. Wide Card */}
            <motion.div whileHover={{ y: -10 }} className="md:col-span-2 group relative overflow-hidden rounded-[3.5rem] bg-zinc-900 border border-white/5 aspect-video">
              <Image src="/designs/banner.png" alt="W9" fill className="object-cover opacity-60 group-hover:opacity-100 transition-all" />
              <div className="absolute inset-0 bg-gradient-to-t from-black p-10 flex flex-col justify-end">
                <h3 className="text-4xl font-black text-white italic">Creative Practice</h3>
              </div>
            </motion.div>

            {/* 10. Final Square */}
            <motion.div whileHover={{ y: -10 }} className="group relative overflow-hidden rounded-[3.5rem] bg-zinc-900 border border-white/5 aspect-square">
              <Image src="/designs/work10.png" alt="W10" fill className="object-cover opacity-60 group-hover:opacity-100 transition-all" />
              <div className="absolute inset-0 bg-gradient-to-t from-black p-8 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white italic uppercase tracking-tighter">Madesiho Branding</h3>
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* --- VIDEO SECTION --- */}
        <motion.div variants={item} className="md:col-span-4 mt-32 mb-20">
          <div className="flex items-end gap-6 mb-16">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic">Dynamic <span className="text-indigo-500">Flow</span></h2>
            <div className="h-[1px] flex-1 bg-white/10 mb-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { src: "/videos/main.mp4", title: "Promotional Motion", tag: "Relax Studio" },
              { src: "/videos/AQMKKr8tc8mqMomgTp0yvDM0SonscX5DheqZb0A8PcLMvAL8fWWTL8KIQtvSoHBa4R9aOyVBFYzo2xlyDSysz_57MMNuIhtx65L1Im45Kg.mp4", title: "New Year Celebration", tag: "Willian's Study Tour '26" }
            ].map((vid, i) => (
              <motion.div 
                key={i}
                onClick={() => setSelectedVideo(vid)}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-[4rem] bg-zinc-900 border border-white/5 aspect-video cursor-pointer"
              >
                <video src={vid.src} autoPlay muted loop className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-indigo-600/90 backdrop-blur-xl flex items-center justify-center scale-75 group-hover:scale-100 transition-all">
                    <Play className="fill-white w-8 h-8 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 p-12 bg-gradient-to-t from-black to-transparent w-full">
                  <span className="text-indigo-500 text-[10px] font-black tracking-[0.4em] uppercase mb-2 block">{vid.tag}</span>
                  <h3 className="text-3xl font-black text-white italic">{vid.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- PARTNERS MARQUEE --- */}
        <motion.div variants={item} className="md:col-span-4 mt-20 overflow-hidden relative py-20 bg-white/[0.02] rounded-[4rem]">
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#050505] to-transparent z-10" />
          <div className="flex overflow-hidden group">
            <div className="animate-marquee flex gap-20 items-center whitespace-nowrap">
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <a key={index} href={logo.url} target="_blank" className="flex items-center gap-6 px-4 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                  <div className="relative w-16 h-16">
                    <Image src={logo.src} alt={logo.name} fill className="object-contain" />
                  </div>
                  <span className="text-4xl font-black text-white tracking-tighter uppercase italic">{logo.name}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* --- TESTIMONIALS --- */}
        <motion.div variants={item} id="testimonials" className="md:col-span-4 mt-40 px-6">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white italic">Client <span className="text-indigo-500">Echoes</span></h2>
            <p className="text-zinc-500 font-mono text-xs mt-4 uppercase tracking-[0.5em]">Collaborative Feedback</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                drag dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-10 bg-zinc-900/30 border border-white/5 backdrop-blur-2xl rounded-[3rem] shadow-2xl relative"
              >
                <div className="absolute top-8 right-10 text-6xl text-white/5 font-black">"</div>
                <p className="text-zinc-400 text-lg leading-relaxed mb-10 italic">"{t.text}"</p>
                <div className="border-l-2 border-indigo-500 pl-6">
                  <span className="text-white font-black text-xs uppercase tracking-[0.2em]">{t.name}</span>
                  <p className="text-zinc-600 text-[10px] font-mono mt-1">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- SOCIALS & CONTACT --- */}
        <motion.div variants={item} className="md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6 mt-40">
          <div className="md:col-span-2 bg-zinc-900/40 border border-white/5 rounded-[3.5rem] p-16 flex flex-col justify-between">
            <div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic leading-none">Let's craft<br /> <span className="text-indigo-500">Tomorrow.</span></h2>
              <p className="text-zinc-500 mt-8 text-xl max-w-md">Open for high-end cinematic branding, automation, and UI/UX projects.</p>
            </div>
            <div className="mt-16 flex flex-wrap gap-4">
               <a href="mailto:fahimnafiz70@gmail.com" className="px-12 py-6 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-indigo-600 hover:text-white transition-all">Initiate Contact</a>
               <div className="flex gap-4">
                  {socialLinks.slice(0, 3).map((s, i) => (
                    <a key={i} href={s.url} className={`w-16 h-16 rounded-full border border-white/5 flex items-center justify-center text-zinc-500 ${s.color} transition-all bg-white/5 hover:bg-white/10`}>
                       <s.icon className="w-6 h-6" />
                    </a>
                  ))}
               </div>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-[3.5rem] p-16 flex flex-col justify-between group overflow-hidden relative">
            <div className="relative z-10">
               <h3 className="text-white text-4xl font-black italic tracking-tighter">Ready to<br />Elevate?</h3>
               <p className="text-indigo-200 mt-4 font-medium uppercase tracking-widest text-xs">Direct WhatsApp Line</p>
            </div>
            <a href="https://wa.me/01855941177" className="relative z-10 w-24 h-24 rounded-full bg-white text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
               <FaWhatsapp className="w-10 h-10" />
            </a>
            <div className="absolute -bottom-10 -right-10 opacity-10">
               <Zap className="w-64 h-64 text-white" />
            </div>
          </div>
        </motion.div>

        {/* --- FOOTER --- */}
        <footer className="md:col-span-4 py-20 text-center border-t border-white/5 mt-20">
          <p className="text-zinc-600 font-mono text-[10px] tracking-[0.5em] uppercase">
            Visuals by RelaxStudio • Dev by SFM Automation • © 2026 Dhaka, BD
          </p>
        </footer>

      </motion.div>

      {/* --- VIDEO POPUP MODAL --- */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-6xl aspect-video rounded-[3rem] overflow-hidden bg-zinc-950 border border-white/10"
            >
              <button onClick={() => setSelectedVideo(null)} className="absolute top-10 right-10 z-10 p-4 bg-white/10 rounded-full text-white backdrop-blur-xl">
                <X className="w-6 h-6" />
              </button>
              <video src={selectedVideo.src} controls autoPlay className="w-full h-full object-contain" />
              <div className="absolute bottom-10 left-10 p-8 bg-black/60 backdrop-blur-md rounded-3xl border border-white/5">
                <p className="text-indigo-500 font-black uppercase text-[10px] tracking-widest mb-1">{selectedVideo.tag}</p>
                <h2 className="text-3xl font-black italic">{selectedVideo.title}</h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Interactive Cursor Glow */}
      <div 
        className="fixed w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none z-[-1]"
        style={{ left: mousePos.x - 300, top: mousePos.y - 300 }}
      />
    </main>
  );
}
