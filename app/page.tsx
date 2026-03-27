"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
// New Social Icons
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { SiBehance } from "react-icons/si";

export default function Portfolio() {
  
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
  { name: "Shamiul Haque Saad", text: "Fahim’s designs are clean, creative, and improving consistently. He has demonstrated good potential and dedication in his work.  With time and experience, he can develop into a very strong and creative designer.", role: "CEO, TongErKhobor" },
  { name: "Ahiya'r Ammu", text: "Cinematic grading er baap protita poster e akta alada vibe thake .amr onek valo lagse sob gula ,onek sundor kore banano hoise", role: "Friend" },
];
  // --- STATES ---
  const [selectedVideo, setSelectedVideo] = useState<{src: string, title: string, tag: string} | null>(null);

  // Staggered entrance animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  // Hover animation for social icon cards
  const iconCardHover = {
    rest: { scale: 1, y: 0, backgroundColor: "rgba(24, 24, 27, 0.5)" }, // zinc-900/50
    hover: { 
      scale: 1.05, 
      y: -5,
      backgroundColor: "rgba(79, 70, 229, 0.1)", // indigo-600/10
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, url: "https://www.facebook.com/syedfahim.muddasir/", color: "hover:text-[#1877F2]" },
    { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/mr_relax_bro", color: "hover:text-[#E4405F]" },
    { name: "Behance", icon: SiBehance, url: "https://www.behance.net/fahimmuddasir", color: "hover:text-[#0057ff]" },
    { name: "WhatsApp", icon: FaWhatsapp, url: "https://wa.me/01855941177", color: "hover:text-[#25D366]" },
    { name: "LinkedIn", icon: FaLinkedinIn, url: "https://linkedin.com", color: "hover:text-[#0077B5]" },
    { name: "X (Twitter)", icon: FaXTwitter, url: "https://x.com/", color: "hover:text-white" },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 p-6 md:p-16 font-sans selection:bg-indigo-500/30">
      
      {/* Background Decorative Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[130px] rounded-full" />
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        
        {/* --- MAIN BIO CARD + PICTURE --- */}
        <motion.div 
          variants={item}
          className="md:col-span-2 row-span-2 bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-md rounded-[3rem] p-12 flex flex-col justify-between overflow-hidden relative"
        >
          {/* Layout Container */}
          <div className="flex flex-col items-start gap-8 relative z-10">
            
            {/* Profile Picture (Bigger & Glow Effect) */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-zinc-800 ring-4 ring-indigo-500/10 shrink-0 relative">
                <Image 
                  src="/profile.jpg" 
                  alt="Syed Fahim Muddasir Profile"
                  width={176} 
                  height={176}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  priority 
                />
              </div>
            </div>

            {/* Big Name Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <h3 className="text-zinc-500 uppercase text-sm tracking-[0.3em] font-bold">Creative Designer</h3>
              </div>
              
              <h1 className="text-7xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                Syed Fahim<br />
                <span className="text-zinc-600 hover:text-indigo-400 transition-all duration-500">Muddasir</span>
              </h1>
            </div>
          </div>
          
          {/* Bio Text with more padding-top */}
          <div className="relative z-10 mt-12">
            <p className="text-zinc-400 text-xl leading-relaxed max-w-xl font-medium">
              Based in Dhaka, I specialize in crafting cinematic visual identities, advanced photo manipulation, and automated digital tools that bridge aesthetics with function.
            </p>
          </div>
        </motion.div>

        {/* Project Card 1 - Now Clickable */}
        <motion.a 
          href="https://www.behance.net/gallery/243588815/Willians-Study-Tour-26-Full-Event-Branding" 
          target="_blank"
          rel="noopener noreferrer"
          variants={item}
          whileHover={{ scale: 0.98 }}
          className="md:col-span-2 bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-md rounded-[2.5rem] p-8 group cursor-pointer overflow-hidden relative block"
        >
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-zinc-500 uppercase text-xs tracking-[0.2em] mb-2 font-bold">Featured Project</h3>
                    <h2 className="text-3xl font-bold group-hover:text-indigo-400 transition-colors">Willian's Study Tour 26'</h2>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <ArrowUpRight className="text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <span className="text-[10px] text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono uppercase tracking-widest">View Case Study</span>
                </div>
            </div>
            <p className="text-zinc-400 mt-4 max-w-sm">
              Willian’s Study Tour '26 is a vibrant, 360-degree brand identity designed for a modern tour experience. 
              The project blends a sophisticated "dark mode" aesthetic with electric neon highlights.
            </p>
          </div>
          
          {/* Animated Glow Effect on Hover */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500" />
        </motion.a>

{/* Expertise Tag Cloud */}
<motion.div 
  variants={item}
  className="md:col-span-2 bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-md rounded-[2.5rem] p-8 relative overflow-hidden group"
>
  {/* Big Highlight Section */}
  <div className="mb-10">
    <div className="flex flex-col">
      {/* Big Number */}
      <span className="text-7xl font-black text-white tracking-tighter leading-none">
        2<span className="text-indigo-500">yr+</span>
      </span>
      
      {/* Label Below the Number */}
      <div className="flex items-center gap-3 mt-2">
        <div className="w-8 h-[1px] bg-indigo-500/50" />
        <h3 className="text-zinc-500 uppercase text-xs tracking-[0.4em] font-bold">
          Creative Expertise In
        </h3>
      </div>
    </div>
  </div>

  {/* Tags Section */}
  <div className="flex flex-wrap gap-2.5 relative z-10">
    {[
      'Visual Branding', 'Logo Design', 'Social Media Poster Design', 
      'Event Branding', 'T-Shirt Design', 'Motion Graphics', 
      'Video Editing', 'Photography'
    ].map((skill) => (
      <span 
        key={skill} 
        className="px-5 py-2.5 bg-zinc-800/30 rounded-full text-sm border border-zinc-800/50 hover:border-indigo-500/50 hover:bg-zinc-800 transition-all duration-300 cursor-default text-zinc-400 hover:text-white font-medium"
      >
        {skill}
      </span>
    ))}
  </div>

  {/* Background Glow */}
  <div className="absolute top-[-10%] left-[-5%] w-32 h-32 bg-indigo-600/10 blur-[60px] rounded-full group-hover:bg-indigo-600/20 transition-all duration-700" />
</motion.div>
        {/* --- DESIGNS SHOWCASE SECTION (FIXED 10 CARDS - NO GAPS) --- */}
        <motion.div variants={item} className="md:col-span-4 mt-12 mb-6">
          <div className="flex items-end gap-4 mb-8">
            <h2 className="text-5xl font-black tracking-tighter">Selected <span className="text-indigo-500">Designs</span></h2>
            <div className="h-[2px] flex-1 bg-zinc-800 mb-3 hidden md:block" />
            <p className="text-zinc-500 font-mono text-sm mb-2">Visual Showcase 2024-2026</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 grid-flow-row-dense">
            
            {/* 1. Portrait (1080x1350) */}
            <motion.div whileHover={{ y: -10 }} className="md:row-span-2 group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 aspect-[4/5]">
              <Image src="/designs/work1.png" alt="W1" fill className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                <span className="text-[#5865F2] text-xs font-bold tracking-widest uppercase mb-1">TongErKhobor</span>
                <h3 className="text-3xl font-bold text-white leading-tight">26 March Poster</h3>
              </div>
            </motion.div>

            {/* 2. Wide Card (FB Cover Style) */}
            <motion.div whileHover={{ y: -10 }} className="md:col-span-2 group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 aspect-video">
              <Image src="/designs/work2.jpg" alt="W2" fill className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                <span className="text-[#5865F2] text-xs font-bold tracking-widest uppercase mb-1">Willes Literary Club</span>
                <h3 className="text-3xl font-bold text-white leading-tight">Event Banner</h3>
              </div>
            </motion.div>

            {/* 3. Square */}
            <motion.div whileHover={{ y: -10 }} className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 aspect-square">
              <Image src="/designs/work3.png" alt="W3" fill className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[#5865F2] text-[10px] font-bold uppercase mb-1">Ta'atuf Foundation</span>
                <h3 className="text-xl font-bold text-white">Executive Panel Post</h3>
              </div>
            </motion.div>

            {/* 4. Square */}
            <motion.div whileHover={{ y: -10 }} className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 aspect-square">
              <Image src="/designs/Artboard 1.png" alt="W4" fill className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[#5865F2] text-[10px] font-bold uppercase mb-1">Omni Diplomatic Forum</span>
                <h3 className="text-xl font-bold text-white">Member Recruit Post</h3>
              </div>
            </motion.div>

            {/* 5. Wide Card */}
            <motion.div whileHover={{ y: -10 }} className="md:col-span-2 group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 aspect-video">
              <Image src="/designs/work5.png" alt="W5" fill className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[#5865F2] text-xs font-bold uppercase mb-1">Willian's study tour 26</span>
                <h3 className="text-3xl font-bold text-white">Full Event Branding</h3>
              </div>
            </motion.div>

            {/* 6. Tall Card (Right Side) */}
            <motion.div whileHover={{ y: -10 }} className="md:row-span-2 group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 aspect-[4/5]">
              <Image src="/designs/eid.png" alt="W6" fill className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[#5865F2] text-xs font-bold uppercase mb-1">Relax Studio</span>
                <h3 className="text-3xl font-bold text-white">Eid Mubarak Post</h3>
              </div>
            </motion.div>

            {/* 7. Square */}
            <motion.div whileHover={{ y: -10 }} className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 aspect-square">
              <Image src="/designs/work7.png" alt="W7" fill className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-[#5865F2] text-xs font-bold uppercase mb-1">Willes Literary Club</span>
                <h3 className="text-xl font-bold text-white">Poet Birthday Post</h3>
              </div>
            </motion.div>

            {/* 8. Square */}
            <motion.div whileHover={{ y: -10 }} className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 aspect-square">
              <Image src="/designs/work8.png" alt="W8" fill className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-[#5865F2] text-xs font-bold uppercase mb-1">Willes Literary Club</span>
                <h3 className="text-xl font-bold text-white">Mourn Post</h3>
              </div>
            </motion.div>

            {/* 9. Wide Card */}
            <motion.div whileHover={{ y: -10 }} className="md:col-span-2 group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 aspect-video">
              <Image src="/designs/banner.png" alt="W9" fill className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[#5865F2] text-xs font-bold uppercase mb-1">Concept Design</span>
                <h3 className="text-3xl font-bold text-white">Practice Design</h3>
              </div>
            </motion.div>

            {/* 10. Final Square */}
            <motion.div whileHover={{ y: -10 }} className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 aspect-square">
              <Image src="/designs/work10.png" alt="W10" fill className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-[#5865F2] text-xs font-bold uppercase mb-1">Madesiho</span>
                <h3 className="text-xl font-bold text-white">T-Shirt Design And Poster</h3>
              </div>
            </motion.div>

          </div>
        </motion.div> 

{/* --- VIDEO SHOWCASE SECTION --- */}
        <motion.div variants={item} className="md:col-span-4 mt-16 mb-12">
          <div className="flex items-end gap-4 mb-8">
            <h2 className="text-5xl font-black tracking-tighter">Motion <span className="text-indigo-500">Graphics</span></h2>
            <div className="h-[2px] flex-1 bg-zinc-800 mb-3 hidden md:block" />
            <p className="text-zinc-500 font-mono text-sm mb-2">Selected Motion Video Works</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Video Card 1 - Full Width/Large */}
            <motion.div 
              onClick={() => setSelectedVideo({
                src: "/videos/main.mp4",
                title: "Promotional Motion",
                tag: "Relax Studio"
              })}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 aspect-video cursor-pointer"
            >
              <video 
                src="/videos/main.mp4" 
                poster="/videos/thumb1.jpg"
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-8 flex flex-col justify-end">
                <span className="text-[#5865F2] text-xs font-bold uppercase tracking-widest mb-1">Relax Studio</span>
                <h3 className="text-3xl font-bold text-white">Promotional Motion</h3>
              </div>
            </motion.div>

            {/* Video Card 2 */}
            <motion.div 
              onClick={() => setSelectedVideo({
                src: "/videos/AQMKKr8tc8mqMomgTp0yvDM0SonscX5DheqZb0A8PcLMvAL8fWWTL8KIQtvSoHBa4R9aOyVBFYzo2xlyDSysz_57MMNuIhtx65L1Im45Kg.mp4",
                title: "New Year Video",
                tag: "Willian's study tour 26"
              })}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 aspect-video cursor-pointer"
            >
              <video 
                src="/videos/AQMKKr8tc8mqMomgTp0yvDM0SonscX5DheqZb0A8PcLMvAL8fWWTL8KIQtvSoHBa4R9aOyVBFYzo2xlyDSysz_57MMNuIhtx65L1Im45Kg.mp4" 
                poster="/videos/thumb2.jpg"
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-8 flex flex-col justify-end">
                <span className="text-[#5865F2] text-xs font-bold uppercase tracking-widest mb-1">Willian's study tour 26</span>
                <h3 className="text-3xl font-bold text-white">New Year Video</h3>
              </div>
            </motion.div>

          </div>
        </motion.div>
       
        {/* --- VIDEO EDITING SECTION (WITH POPUP & SOUND) --- */}
        <motion.div variants={item} className="md:col-span-4 mt-20 mb-12">
          <div className="flex items-end gap-4 mb-8">
            <h2 className="text-5xl font-black tracking-tighter text-white">Video<span className="text-indigo-500"> Editing</span></h2>
            <div className="h-[2px] flex-1 bg-zinc-800 mb-3 hidden md:block" />
            <p className="text-zinc-500 font-mono text-sm mb-2">Selected Video-Editing Works</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Video Card 1 */}
            <motion.div 
              onClick={() => setSelectedVideo({
                src: "/videos/AQOKsDmJ8VnS7Kh99V0l4Fwgiu0ViZnniPzTFvmS2aEfsrXe5twZkJd2N9GwZpx0a_GXkTcdIkd9GHhLY6R78DAylhJbnMZYT58KQvlAiZThIg.mp4",
                title: "Willian's Study Tour 26",
                tag: "Official Promotional Reel"
              })}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 aspect-video cursor-pointer"
            >
              <video 
                src="/videos/AQOKsDmJ8VnS7Kh99V0l4Fwgiu0ViZnniPzTFvmS2aEfsrXe5twZkJd2N9GwZpx0a_GXkTcdIkd9GHhLY6R78DAylhJbnMZYT58KQvlAiZThIg.mp4" 
                autoPlay muted loop playsInline
                className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent p-10 flex flex-col justify-end">
                <span className="text-[#5865F2] text-xs font-bold uppercase tracking-widest mb-1">Willian's Study Tour 26</span>
                <h3 className="text-3xl font-black text-white leading-tight">Official Promotional Reel</h3>
              </div>
            </motion.div>

            {/* Video Card 2 */}
            <motion.div 
              onClick={() => setSelectedVideo({
                src: "/videos/AQO1So12voezPc1KQwH5LFJPTGZYHbzCgfqvClz0-Bcafh9e06klMBh_tVCxjRZ4k2ZYZaQrbWI6BEyRbiZpBWqA4S6Y1Pg-e8SuMNNmVek7hw.mp4",
                title: "WLC Nobinboron 25",
                tag: "Official Promotional Reel"
              })}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 aspect-video cursor-pointer"
            >
              <video 
                src="/videos/AQO1So12voezPc1KQwH5LFJPTGZYHbzCgfqvClz0-Bcafh9e06klMBh_tVCxjRZ4k2ZYZaQrbWI6BEyRbiZpBWqA4S6Y1Pg-e8SuMNNmVek7hw.mp4" 
                autoPlay muted loop playsInline
                className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent p-10 flex flex-col justify-end">
                <span className="text-[#5865F2] text-xs font-bold uppercase tracking-widest mb-1">WLC Nobinboron 25</span>
                <h3 className="text-3xl font-black text-white leading-tight">Official Promotional Reel</h3>
              </div>
            </motion.div>
          </div>

          {/* --- VIDEO POPUP MODAL --- */}
          <AnimatePresence>
            {selectedVideo && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedVideo(null)}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
              >
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative bg-zinc-950 border border-zinc-800 rounded-[3rem] overflow-hidden max-w-5xl w-full shadow-2xl"
                >
                  <div className="relative aspect-video w-full bg-black">
                    <video 
                      src={selectedVideo.src} 
                      controls 
                      autoPlay 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-8 md:p-10 border-t border-zinc-800">
                    <span className="text-[#5865F2] text-sm font-bold uppercase tracking-tighter mb-2 block">{selectedVideo.tag}</span>
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-none">{selectedVideo.title}</h2>
                    <button 
                      onClick={() => setSelectedVideo(null)}
                      className="mt-8 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-full text-white font-bold hover:bg-zinc-800 transition-all text-sm"
                    >
                      Close Video
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
        
          </AnimatePresence>
        </motion.div>

{/* --- INFINITE LOGO SCROLL SECTION --- */}
<motion.div variants={item} className="md:col-span-4 mt-20 overflow-hidden relative py-10">
  
  {/* Header Text */}
  <div className="text-center mb-10">
    <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase mb-2">
      Working With
    </p>
  </div>

  {/* Side Fades (Video-r moto side e halka shadow/fade) */}
  <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
  <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

  {/* The Marquee Container */}
  <div className="flex overflow-hidden group">
    <div className="animate-marquee flex gap-12 items-center whitespace-nowrap">
      
      {/* 1st Set of Logos */}
      {[...clientLogos, ...clientLogos].map((logo, index) => (
        <a 
          key={index} 
          href={logo.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-4 px-8 py-4 opacity-50 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0"
        >
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <Image 
              src={logo.src} 
              alt={logo.name} 
              fill 
              className="object-contain" 
            />
          </div>
          <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {logo.name}
          </span>
        </a>
      ))}
    </div>
  </div>
</motion.div>
{/* --- TESTIMONIALS SECTION --- */}
<motion.div variants={item} className="md:col-span-4 mt-20 mb-12 px-6">
  <div className="text-center mb-16 relative z-10">
    <h2 className="text-4xl font-black tracking-tighter text-white">Client <span className="text-indigo-500">Love</span></h2>
    <p className="text-zinc-500 font-mono text-[10px] mt-1 uppercase tracking-[0.3em]">Interactive Feedback Cloud</p>
  </div>

  {/* Grid Layout: PC-te 3 column, Tablet-e 2, Mobile-e 1 */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative">
    {testimonials.map((t, index) => (
      <motion.div
        key={index}
        drag
        dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          y: [0, index % 2 === 0 ? -8 : 8, 0],
          transition: { 
            duration: 5, 
            repeat: Infinity, 
            delay: index * 0.1, 
            ease: "easeInOut" 
          }
        }}
        whileHover={{ 
          scale: 1.02, 
          rotate: index % 2 === 0 ? 1 : -1,
          zIndex: 50 
        }}
        // "Ahiya'r Ammu" ba special card gulo highlight korar jonno logic
        className={`p-6 bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md rounded-[2.5rem] shadow-xl cursor-grab active:cursor-grabbing transition-all
          ${index === 2 ? 'lg:scale-110 border-indigo-500/20 bg-zinc-900/60' : ''}
          ${index === 6 ? 'lg:col-span-1 border-pink-500/10' : ''}
        `}
      >
        <p className="text-zinc-300 text-[13px] leading-relaxed mb-4 italic font-medium leading-relaxed">
          "{t.text}"
        </p>
        <div className="flex flex-col border-l-2 border-indigo-500/40 pl-4">
          <span className="text-white font-black text-[10px] uppercase tracking-[0.2em]">
            {t.name}
          </span>
          <span className="text-zinc-500 text-[9px] font-mono mt-0.5">
            {t.role}
          </span>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>
        {/* --- CONTACT SECTION (The End) --- */}
        <motion.div
          variants={item}
          className="md:col-span-4 bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm rounded-[2.5rem] p-10 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <h2 className="text-4xl font-bold tracking-tight">Let's connect</h2>
              <p className="text-zinc-500 text-lg mt-2">Open for collaborations and interesting projects.</p>
            </div>
            <a href="mailto:fahimnafiz70@gmail.com" className="px-8 py-4 bg-indigo-600 rounded-full font-semibold hover:bg-indigo-500 transition-colors flex items-center gap-2 group">
              Drop an Email
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={iconCardHover}
                  initial="rest"
                  whileHover="hover"
                  className={`border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 transition-colors ${link.color}`}
                >
                  <Icon className="w-8 h-8" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-zinc-300">{link.name}</span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Footer info */}
        <motion.div variants={item} className="md:col-span-4 text-center text-zinc-700 py-8 text-sm font-mono">
            © 2026 Syed Fahim Muddasir. Built with Next.js & Framer Motion.
        </motion.div>

      </motion.div>
    </main>
  );
}
