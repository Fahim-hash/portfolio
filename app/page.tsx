"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Play, 
  X, 
  Mail, 
  Github, 
  Layers, 
  Zap, 
  Monitor, 
  Smartphone,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

// Social Icons - React Icons
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaWhatsapp, 
  FaXTwitter 
} from "react-icons/fa6";
import { SiBehance } from "react-icons/si";

// --- CUSTOM COMPONENTS ---

/**
 * FloatingHeart Component
 * This uses your RelaxStudio logo as a decorative 3D floating element.
 */
const FloatingHeart = ({ delay = 0, style = {} }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: [0, 0.8, 0.8, 0],
      y: [20, -100],
      x: [0, 20, -20, 0],
      scale: [0.8, 1.1, 0.9, 0.7],
      rotate: [0, 15, -15, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        delay: delay,
        ease: 'easeInOut',
      },
    }}
    className="absolute pointer-events-none z-0"
    style={{ ...style }}
  >
    <div className="relative w-10 h-10">
      <Image 
        src="/logos/relax.png" 
        alt="floating-brand" 
        fill 
        className="object-contain drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]" 
      />
    </div>
  </motion.div>
);

// --- MAIN PORTFOLIO PAGE ---

export default function SyedFahimPortfolio() {
  
  // --- STATES ---
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- DATA OBJECTS ---

  const clientLogos = [
    { name: "TongErKhobor", src: "/logos/tongerkhobor.png", url: "https://instagram.com/tongerkhobor" },
    { name: "ScienceBaze", src: "/logos/sciencebaze.png", url: "https://facebook.com/generalscienceolympiad" },
    { name: "Ta'atuf Foundation", src: "/logos/taatuf.png", url: "https://facebook.com/taatuf.foundation" },
    { name: "Willes Literary Club", src: "/logos/vb.png", url: "https://facebook.com/profile.php?id=61560572355031" },
    { name: "RelaxStudio", src: "/logos/relax.png", url: "https://instagram.com/relaxstudio__" },
    { name: "Omni Diplomatic Forum", src: "/logos/odf.png", url: "https://facebook.com/OMNIDF" },
    { name: "WLFSC", src: "/logos/wlfsc.png", url: "#" },
  ];

  const designShowcase = [
    { id: 1, title: "26 March Post", brand: "TongErKhobor", src: "/designs/work1.png", type: "Social Media", size: "tall" },
    { id: 2, title: "Event Grand Banner", brand: "Willes Literary Club", src: "/designs/work2.jpg", type: "Large Format", size: "wide" },
    { id: 3, title: "Recruitment Drive", brand: "Omni Diplomatic", src: "/designs/Artboard 1.png", type: "Campaign", size: "square" },
    { id: 4, title: "Executive Board", brand: "Ta'atuf Foundation", src: "/designs/work3.png", type: "Official", size: "square" },
    { id: 5, title: "Cyber Aesthetic", brand: "Personal Project", src: "/designs/work4.png", type: "Conceptual", size: "tall" },
    { id: 6, title: "Branding Kit", brand: "RelaxStudio", src: "/designs/work5.png", type: "Identity", size: "wide" },
    { id: 7, title: "Tour Highlights", brand: "Willians Tour '26", src: "/designs/work6.png", type: "Cover", size: "square" },
    { id: 8, title: "Product Showcase", brand: "Jewelry Partner", src: "/designs/work7.png", type: "E-commerce", size: "square" },
    { id: 9, title: "Minimalist Identity", brand: "SplitPay BD", src: "/designs/work8.png", type: "Fintech", size: "wide" },
    { id: 10, title: "Cinematic Poster", brand: "Limitless 26", src: "/designs/work9.png", type: "Event", size: "tall" },
  ];

  const videoWorks = [
    { id: 1, title: "Official Motion Reveal", brand: "RelaxStudio", src: "/videos/main.mp4", tag: "Creative Production" },
    { id: 2, title: "Willian's Study Tour Reel", brand: "WLFSC", src: "/videos/reel1.mp4", tag: "Event Recap" },
    { id: 3, title: "3D Bus Simulation", brand: "Game Project", src: "/videos/bus-sim.mp4", tag: "Tech Showcase" },
    { id: 4, title: "Logo Animation", brand: "Omni Diplomatic", src: "/videos/logo-anim.mp4", tag: "Motion Design" },
  ];

  const testimonials = [
    { name: "Arifur Rahman Tahmid", text: "Unar sathe kaaj kora khubi interesting cz unar working experience er karone day by day new kichu shikha jay and shobcheye boro kotha unar kaajer idea onk..and ekjon designer er jonno eta onk boro advantage.", role: "President, Willes Literary Club (GEN-2)" },
    { name: "Mohammad Nasir", text: "What stands out about Fahim is his unique blend of design sense and technical automation. He doesn’t just design; he optimizes workflows. His contributions to our media strategy have been both innovative and impactful.", role: "ScienceBaze" },
    { name: "Shamiul Haque Saad", text: "Fahim’s designs are clean, creative, and improving consistently. He has demonstrated good potential and dedication in his work. With time and experience, he can develop into a very strong and creative designer.", role: "CEO, TongErKhobor" },
    { name: "Ahiya'r Ammu", text: "Cinematic grading er baap protita poster e akta alada vibe thake .amr onek valo lagse sob gula ,onek sundor kore banano hoise.", role: "Creative Enthusiast" },
    { name: "Md Ashraful Islam", text: "Fahim is a remarkable addition to our foundation. He thinks beyond aesthetics, delivering creative excellence. His growth has been steady and his impact on our visual identity is undeniable.", role: "Founder, Ta'atuf Foundation" },
    { name: "Insaf Mahmud", text: "Technically sound and creatively brave. Working with Fahim on digital branding revealed his attention to detail and ability to handle high-pressure delivery timelines.", role: "Founder, SplitPay Bangladesh" }
  ];

  const software = [
    { name: "Photoshop", img: "ps.png", level: "82%", color: "bg-blue-500", desc: "Advanced Image Manipulation" },
    { name: "Illustrator", img: "ai.png", level: "80%", color: "bg-orange-500", desc: "Vector Branding & Icons" },
    { name: "After Effects", img: "ae.png", level: "65%", color: "bg-purple-500", desc: "Motion Graphics & Compositing" },
    { name: "Premiere Pro", img: "pr.png", level: "55%", color: "bg-indigo-500", desc: "Cinematic Video Editing" },
    { name: "Lightroom", img: "lr.png", level: "60%", color: "bg-cyan-500", desc: "Color Grading & Retouching" },
    { name: "Figma", img: "figma.png", level: "70%", color: "bg-pink-500", desc: "UI/UX & Prototyping" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, url: "https://facebook.com/syedfahim.muddasir/", color: "hover:text-[#1877F2]" },
    { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/mr_relax_bro", color: "hover:text-[#E4405F]" },
    { name: "Behance", icon: SiBehance, url: "https://behance.net/fahimmuddasir", color: "hover:text-[#0057ff]" },
    { name: "WhatsApp", icon: FaWhatsapp, url: "https://wa.me/01855941177", color: "hover:text-[#25D366]" },
    { name: "LinkedIn", icon: FaLinkedinIn, url: "https://linkedin.com", color: "hover:text-[#0077B5]" },
    { name: "X", icon: FaXTwitter, url: "https://x.com/", color: "hover:text-white" },
  ];

  // --- ANIMATION VARIANTS ---

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const item = {
    hidden: { y: 40, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  };

  const navItem = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 }
  };

  const logoScrollTransition = {
    animate: {
      x: [0, -2000],
      transition: {
        x: { repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" }
      }
    }
  };

  // --- RENDER ---

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 p-4 md:p-12 lg:p-16 font-sans selection:bg-indigo-500/40 overflow-x-hidden">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/5 blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center" />
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        
        {/* --- HEADER / NAVIGATION --- */}
        <motion.nav variants={item} className="md:col-span-4 flex justify-between items-center mb-12 px-8 py-6 bg-zinc-900/20 border border-white/5 backdrop-blur-3xl rounded-[2.5rem]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 relative">
              <Image src="/logos/relax.png" alt="logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-black italic tracking-tighter uppercase">Syed<span className="text-indigo-500">Fahim</span></span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {['Works', 'Expertise', 'Clients', 'Feedback'].map((nav) => (
              <a key={nav} href={`#${nav.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">{nav}</a>
            ))}
            <a href="mailto:fahimnafiz70@gmail.com" className="px-6 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-indigo-500 hover:text-white transition-all">Hire Me</a>
          </div>
        </motion.nav>

        {/* --- HERO SECTION --- */}
        <motion.div variants={item} className="md:col-span-2 md:row-span-2 bg-zinc-900/30 border border-white/5 backdrop-blur-2xl rounded-[4rem] p-10 md:p-16 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Layers size={300} strokeWidth={1} />
          </div>
          
          <div className="flex flex-col items-start gap-12 relative z-10">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative group cursor-none"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition duration-1000"></div>
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-zinc-900/50 relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <Image src="/profile.jpg" alt="Syed Fahim Muddasir" width={256} height={256} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 p-4 rounded-full border-4 border-zinc-900 shadow-xl">
                <Zap size={24} className="text-white fill-white" />
              </div>
            </motion.div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-12 h-[1px] bg-indigo-500"></span>
                <h3 className="text-indigo-500 uppercase text-[10px] tracking-[0.6em] font-black italic">Creative Designer & Student</h3>
              </div>
              <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-[0.8] text-white uppercase italic">
                Fahim<br />
                <span className="text-zinc-800 outline-text group-hover:text-indigo-500 transition-colors duration-1000">Muddasir</span>
              </h1>
            </div>
          </div>

          <div className="mt-20 relative z-10 space-y-8">
            <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed max-w-md font-medium">
              Transforming concepts into <span className="text-white">cinematic visual stories</span> and high-performance branding solutions.
            </p>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-3xl font-black italic">02+</span>
                <span className="text-[8px] uppercase tracking-widest text-zinc-600 font-bold">Years Experience</span>
              </div>
              <div className="w-[1px] h-10 bg-zinc-800 mx-4" />
              <div className="flex flex-col">
                <span className="text-3xl font-black italic">50+</span>
                <span className="text-[8px] uppercase tracking-widest text-zinc-600 font-bold">Projects Done</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- FEATURED SHOWCASE --- */}
        <motion.div variants={item} className="md:col-span-2 bg-zinc-900/30 border border-white/5 backdrop-blur-2xl rounded-[3.5rem] p-10 md:p-12 group cursor-pointer overflow-hidden relative min-h-[400px]">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <span className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-500 text-[8px] font-black uppercase tracking-widest italic">
                  // Case Study 2026
                </span>
                <h2 className="text-5xl font-black italic tracking-tighter group-hover:text-indigo-400 transition-colors uppercase leading-none mt-4">
                  Willian's Study Tour '26
                </h2>
              </div>
              <div className="p-4 bg-zinc-950 rounded-full border border-white/5 group-hover:bg-indigo-600 transition-colors">
                <ArrowUpRight className="text-white w-6 h-6" />
              </div>
            </div>
            
            <div className="mt-8 space-y-6">
              <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-sm">
                A massive 360-degree event branding execution featuring high-fidelity posters, identity kits, and social media blitz.
              </p>
              <div className="flex gap-2">
                {['Branding', 'Event Identity', 'Social Media'].map(tag => (
                  <span key={tag} className="text-[9px] font-bold text-zinc-600 border border-zinc-800 px-3 py-1 rounded-md uppercase">{tag}</span>
                ))}
              </div>
            </div>

            <div className="absolute bottom-[-10%] right-[-5%] w-72 h-72 bg-indigo-600/10 blur-[100px] rounded-full group-hover:bg-indigo-600/20 transition-all duration-1000" />
          </div>
        </motion.div>

        {/* --- EXPERTISE / CORE SKILLS --- */}
        <motion.div variants={item} className="md:col-span-2 bg-zinc-900/30 border border-white/5 backdrop-blur-2xl rounded-[3.5rem] p-12 relative overflow-hidden flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-12">
            <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter">My <span className="text-indigo-500">Edge</span></h3>
            <Zap className="text-indigo-500 fill-indigo-500" size={20} />
          </div>
          
          <div className="grid grid-cols-2 gap-y-8 gap-x-4 relative z-10">
            {[
              { title: "Visual Branding", icon: Monitor },
              { title: "Motion Graphics", icon: Zap },
              { title: "Video Editing", icon: Play },
              { title: "Mobile UI", icon: Smartphone },
            ].map((skill, idx) => (
              <div key={idx} className="space-y-3 group/skill">
                <skill.icon className="text-zinc-700 group-hover/skill:text-indigo-500 transition-colors" size={24} />
                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 group-hover/skill:text-white transition-colors">{skill.title}</h4>
                <div className="h-0.5 w-8 bg-zinc-800 group-hover/skill:w-16 group-hover/skill:bg-indigo-500 transition-all duration-500" />
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex flex-wrap gap-2">
            {['Minimalism', 'Cinematic Grading', 'Cyber Aesthetics', 'Tech-wear Design'].map(tag => (
              <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-zinc-600 bg-white/5 px-4 py-2 rounded-full border border-white/5">{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* --- SOFTWARE TECH STACK --- */}
        <motion.div variants={item} className="md:col-span-4 mt-20 mb-12 border border-white/5 bg-zinc-900/10 backdrop-blur-3xl rounded-[4rem] p-12 md:p-20 overflow-hidden relative">
          <div className="relative z-10 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase text-white leading-none">
                Power <span className="text-zinc-800">Tools</span>
              </h2>
              <p className="text-zinc-600 font-mono text-xs tracking-[0.6em] uppercase">// Industry Standard Tech Stack</p>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Currently Mastering</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {software.map((sw) => (
              <motion.div 
                key={sw.name}
                whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.03)" }}
                className="group p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] transition-all"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="relative w-16 h-16">
                    <img src={`/logos/${sw.img}`} alt={sw.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <span className="font-mono text-xl text-zinc-700 group-hover:text-white transition-colors">{sw.level}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase italic text-zinc-400 group-hover:text-indigo-500 transition-colors">{sw.name}</h3>
                  <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">{sw.desc}</p>
                </div>
                <div className="mt-8 h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: sw.level }}
                    transition={{ duration: 2, ease: "circOut" }}
                    className={`h-full ${sw.color} opacity-40 group-hover:opacity-100 shadow-[0_0_20px_rgba(79,102,241,0.3)]`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- DESIGN PORTFOLIO GRID --- */}
        <motion.div id="works" variants={item} className="md:col-span-4 mt-20">
          <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-16 px-4">
            <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter italic uppercase text-white leading-none">
              Design <span className="text-indigo-600">Vault</span>
            </h2>
            <p className="text-zinc-600 font-mono text-[10px] tracking-[0.5em] uppercase italic">// Gallery of 2024-2026</p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {designShowcase.map((design) => (
              <motion.div 
                key={design.id}
                whileHover={{ y: -10 }}
                className={`relative group overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 cursor-crosshair
                  ${design.size === 'wide' ? 'aspect-video' : design.size === 'tall' ? 'aspect-[3/4]' : 'aspect-square'}
                `}
              >
                <Image 
                  src={design.src} 
                  alt={design.title} 
                  fill 
                  className="object-cover opacity-50 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2 italic">{design.brand}</span>
                  <h3 className="text-3xl font-black italic uppercase text-white leading-none tracking-tighter">{design.title}</h3>
                  <div className="flex gap-4 mt-6">
                    <span className="px-4 py-1.5 border border-white/20 rounded-full text-[8px] font-black uppercase text-white">{design.type}</span>
                  </div>
                </div>
                <div className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- VIDEO & MOTION SECTION --- */}
        <motion.div variants={item} className="md:col-span-4 mt-40">
          <div className="flex flex-col items-center text-center mb-24 space-y-6">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase text-white leading-none">
              Motion <span className="text-indigo-500">Studios</span>
            </h2>
            <div className="h-1.5 w-32 bg-indigo-600 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {videoWorks.map((video) => (
              <motion.div 
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                whileHover={{ scale: 0.98 }}
                className="group relative aspect-video rounded-[4rem] overflow-hidden border border-white/5 bg-zinc-950 cursor-pointer shadow-2xl"
              >
                <video src={video.src} autoPlay muted loop className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
                <div className="absolute inset-0 p-12 flex flex-col justify-between items-start">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/20 group-hover:bg-indigo-600 transition-all group-hover:scale-110">
                    <Play fill="white" className="text-white ml-1" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-indigo-500 text-xs font-black uppercase tracking-widest italic">{video.brand}</span>
                    <h3 className="text-4xl font-black italic uppercase text-white tracking-tighter">{video.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- INFINITE LOGO SCROLL (Refined) --- */}
        <motion.div id="clients" variants={item} className="md:col-span-4 mt-40 py-24 border-y border-white/5 relative overflow-hidden">
          <div className="flex flex-col items-center mb-16">
            <p className="text-zinc-600 font-mono text-[10px] tracking-[0.8em] uppercase mb-4">Collaborations & Partnerships</p>
            <div className="h-[1px] w-20 bg-zinc-800" />
          </div>
          
          <div className="flex overflow-hidden">
            <motion.div 
              variants={logoScrollTransition}
              animate="animate"
              className="flex gap-20 items-center whitespace-nowrap pr-20"
            >
              {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
                <a 
                  key={index} 
                  href={logo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-10 opacity-20 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-700 group/l"
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20 transition-transform duration-500 group-hover/l:scale-125">
                    <Image src={logo.src} alt={logo.name} fill className="object-contain" />
                  </div>
                  <span className="text-3xl md:text-5xl font-black italic tracking-[0.05em] text-white uppercase">{logo.name}</span>
                </a>
              ))}
            </motion.div>
          </div>
          
          {/* Edge Gradients */}
          <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-[#050505] to-transparent z-10" />
        </motion.div>

        {/* --- CLIENT FEEDBACK / TESTIMONIALS --- */}
        <motion.div id="feedback" variants={item} className="md:col-span-4 mt-40 relative px-6">
          
          {/* Background Floating Branding Icons */}
          <div className="absolute inset-0 flex items-center justify-center -translate-y-40 z-0 pointer-events-none">
            <div className="relative w-full max-w-4xl h-[400px]">
              <FloatingHeart delay={0} style={{ top: '10%', left: '10%' }} />
              <FloatingHeart delay={1.5} style={{ top: '60%', left: '25%' }} />
              <FloatingHeart delay={0.8} style={{ top: '20%', right: '15%' }} />
              <FloatingHeart delay={2.2} style={{ top: '75%', right: '30%' }} />
              <FloatingHeart delay={3.5} style={{ top: '-10%', left: '45%' }} />
            </div>
          </div>

          <div className="text-center mb-32 relative z-10 space-y-6">
            <h2 className="text-7xl md:text-[11rem] font-black tracking-tighter text-white italic uppercase leading-none">
              Client <span className="text-indigo-600">Love</span>
            </h2>
            <p className="text-zinc-600 font-mono text-xs uppercase tracking-[0.5em] font-black italic">
              // Collective Feedback From the Community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                drag
                dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  y: [0, index % 2 === 0 ? -12 : 12, 0],
                  transition: { duration: 7, repeat: Infinity, delay: index * 0.2, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 1 : -1, zIndex: 50 }}
                className={`p-12 bg-zinc-900/40 border border-white/5 backdrop-blur-[100px] rounded-[3.5rem] shadow-2xl cursor-grab active:cursor-grabbing group transition-all
                  ${index === 2 ? 'lg:scale-110 border-indigo-500/30 bg-zinc-900/60 shadow-indigo-500/10' : ''}
                `}
              >
                <div className="text-indigo-500 mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                   <Zap size={32} />
                </div>
                <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-12 italic font-bold group-hover:text-zinc-200 transition-colors">
                  "{t.text}"
                </p>
                <div className="flex flex-col border-l-4 border-indigo-600/50 pl-8">
                  <span className="text-white font-black text-sm uppercase tracking-[0.2em] italic mb-1">
                    {t.name}
                  </span>
                  <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
                    {t.role}
                  </span>
                </div>
                <div className="absolute top-12 right-12 text-zinc-800 text-8xl font-serif opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                  "
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- FINAL CTA / CONTACT SECTION --- */}
        <motion.div
          variants={item}
          className="md:col-span-4 bg-zinc-900/20 border border-white/5 backdrop-blur-[80px] rounded-[5rem] p-12 md:p-24 mt-40 relative overflow-hidden group shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16 relative z-10">
            <div className="max-w-2xl space-y-8">
              <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-white italic uppercase leading-[0.8]">
                Let's <br /><span className="text-indigo-600 outline-text group-hover:text-indigo-500 transition-colors">Connect</span>
              </h2>
              <p className="text-zinc-400 text-2xl font-bold leading-relaxed italic max-w-lg">
                Fueling cinematic visions with high-fidelity design. Open for revolutionary projects.
              </p>
            </div>
            
            <motion.a 
              href="mailto:fahimnafiz70@gmail.com" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-16 py-8 bg-indigo-600 text-white rounded-[3rem] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all flex items-center gap-6 shadow-[0_20px_60px_rgba(79,70,229,0.4)] group/btn text-xl"
            >
              Start Project
              <ArrowUpRight className="w-8 h-8 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </motion.a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-24 relative z-10">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className={`border border-white/5 bg-white/[0.02] rounded-[3rem] p-12 flex flex-col items-center justify-center gap-6 transition-all duration-300 ${link.color} group/social`}
                >
                  <Icon className="w-12 h-12 transition-transform duration-500 group-hover/social:scale-110" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover/social:text-white transition-colors">
                    {link.name}
                  </span>
                </motion.a>
              );
            })}
          </div>

          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full -z-10" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
        </motion.div>

        {/* --- FOOTER --- */}
        <motion.footer variants={item} className="md:col-span-4 text-center py-24 space-y-6">
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="w-20 h-[1px] bg-zinc-900" />
              <div className="w-12 h-12 relative opacity-20">
                <Image src="/logos/relax.png" alt="footer-logo" fill className="object-contain" />
              </div>
              <div className="w-20 h-[1px] bg-zinc-900" />
            </div>
            <p className="text-zinc-800 text-[10px] font-black uppercase tracking-[0.6em] italic">
                © 2026 Syed Fahim Muddasir. Engineered with Next.js, Framer & Passion in Dhaka.
            </p>
        </motion.footer>

      </motion.div>

      {/* --- VIDEO MODAL --- */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setSelectedVideo(null)} 
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-[50px] flex items-center justify-center p-4 md:p-12"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotateX: 20 }} 
              animate={{ scale: 1, opacity: 1, rotateX: 0 }} 
              exit={{ scale: 0.8, opacity: 0, rotateX: 20 }} 
              onClick={(e) => e.stopPropagation()} 
              className="relative bg-zinc-950 border border-white/10 rounded-[4rem] overflow-hidden max-w-6xl w-full shadow-[0_0_100px_rgba(0,0,0,1)]"
            >
              <div className="relative aspect-video bg-black group/modal">
                <video src={selectedVideo.src} controls autoPlay className="w-full h-full object-contain shadow-2xl" />
                <button 
                  onClick={() => setSelectedVideo(null)} 
                  className="absolute top-10 right-10 p-5 bg-white text-black rounded-full hover:bg-indigo-600 hover:text-white transition-all z-50 shadow-2xl"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-[1px] bg-indigo-500"></span>
                    <span className="text-indigo-500 text-xs font-black uppercase tracking-[0.4em] italic">{selectedVideo.tag}</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-none">{selectedVideo.title}</h2>
                  <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">{selectedVideo.brand} // Production 2026</p>
                </div>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2 text-zinc-500 px-6 py-3 border border-white/5 rounded-full">
                      <CheckCircle2 size={16} className="text-green-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest">4K Render</span>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @font-face {
          font-family: 'CosiAzure';
          src: url('/fonts/CosiAzure-Black.woff2') format('woff2');
          font-weight: 900;
          font-style: normal;
        }

        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #050505;
        }
        ::-webkit-scrollbar-thumb {
          background: #1a1a1a;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #4f46e5;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </main>
  );
}
