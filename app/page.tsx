"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ArrowUpRight, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  Download,
  Menu,
  X,
  Plus
} from "lucide-react";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaWhatsapp, 
  FaXTwitter, 
  FaGithub,
  FaYoutube
} from "react-icons/fa6";
import { SiBehance, SiAdobephotoshop, SiAdobeillustrator, SiAdobeaftereffects, SiAdobepremierepro, SiAdobelightroom } from "react-icons/si";

// --- DATA ARRAYS ---

const clientLogos = [
  { name: "TongErKhobor", src: "/logos/tongerkhobor.png", url: "https://www.instagram.com/tongerkhobor" },
  { name: "General Science Olympiad", src: "/logos/sciencebaze.png", url: "https://www.facebook.com/generalscienceolympiad" },
  { name: "Ta'atuf Foundation", src: "/logos/taatuf.png", url: "https://www.facebook.com/taatuf.foundation" },
  { name: "Willes Literary Club", src: "/logos/vb.png", url: "https://www.facebook.com/profile.php?id=61560572355031" },
  { name: "RelaxStudio", src: "/logos/relax.png", url: "https://www.instagram.com/relaxstudio__" },
  { name: "Omni Diplomatic Forum", src: "/logos/odf.png", url: "https://www.facebook.com/OMNIDF" },
];

const skills = [
  { name: "Photoshop", icon: SiAdobephotoshop, level: "82%", color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Illustrator", icon: SiAdobeillustrator, level: "85%", color: "text-orange-500", bg: "bg-orange-500/10" },
  { name: "After Effects", icon: SiAdobeaftereffects, level: "65%", color: "text-purple-500", bg: "bg-purple-500/10" },
  { name: "Premiere Pro", icon: SiAdobepremierepro, level: "55%", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { name: "Lightroom", icon: SiAdobelightroom, level: "60%", color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { name: "Visual Identity", icon: CheckCircle2, level: "90%", color: "text-green-500", bg: "bg-green-500/10" },
];

const testimonials = [
  { 
    name: "Arifur Rahman Tahmid", 
    text: "Unar sathe kaaj kora khubi interesting cz unar working experience er karone day by day new kichu shikha jay and shobcheye boro kotha unar kaajer idea onk..and ekjon designer er jonno eta onk boro advantage.", 
    role: "President, Willes Literary Club (GEN-2)",
    img: "/clients/tahmid.jpg"
  },
  { 
    name: "Mohammad Nasir", 
    text: "What stands out about Fahim is his unique blend of design sense and technical automation. He doesn’t just design; he optimizes workflows. His contributions to our media strategy have been both innovative and impactful", 
    role: "ScienceBaze",
    img: "/clients/nasir.jpg"
  },
  { 
    name: "Shamiul Haque Saad", 
    text: "Fahim’s designs are clean, creative, and improving consistently. He has demonstrated good potential and dedication in his work.", 
    role: "CEO, TongErKhobor",
    img: "/clients/saad.jpg"
  },
  { 
    name: "Md Ashraful Islam", 
    text: "Fahim is a remarkable addition to our foundation. He thinks beyond aesthetics, optimizing processes while delivering creative excellence.", 
    role: "Founder & President, Ta'atuf Foundation",
    img: "/clients/ashraf.jpg"
  }
];

const projects = [
  { id: 1, title: "Study Tour Branding", category: "Event Identity", src: "/designs/work5.png", wide: true },
  { id: 2, title: "26 March Poster", category: "Manipulation", src: "/designs/work1.png", wide: false },
  { id: 3, title: "Executive Panel", category: "Corporate", src: "/designs/work3.png", wide: false },
  { id: 4, title: "Member Recruitment", category: "Social Media", src: "/designs/Artboard 1.png", wide: false },
  { id: 5, title: "Eid Mubarak Post", category: "Typography", src: "/designs/eid.png", tall: true },
  { id: 6, title: "Banner Design", category: "Print Media", src: "/designs/banner.png", wide: true },
  { id: 7, title: "Poet Birthday", category: "Creative", src: "/designs/work7.png", wide: false },
  { id: 8, title: "Mourn Post", category: "Minimalism", src: "/designs/work8.png", wide: false },
  { id: 9, title: "T-Shirt Design", category: "Apparel", src: "/designs/work10.png", wide: false },
  { id: 10, title: "Identity Reveal", category: "Motion Graphics", src: "/designs/work2.jpg", wide: true },
];

export default function CompletePortfolio() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string, title: string, tag: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Animation Variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const fadeInUp = {
    hidden: { y: 40, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white selection:bg-indigo-500/30 selection:text-white">
      
      {/* --- FLOATING NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black group-hover:rotate-12 transition-transform">R</div>
            <span className="text-xl font-black tracking-tighter uppercase">Relax<span className="text-indigo-500">Studio</span></span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 bg-zinc-900/50 backdrop-blur-md border border-zinc-800/50 px-8 py-4 rounded-full">
            {["Work", "Expertise", "Testimonials", "Contact"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">{link}</a>
            ))}
          </div>

          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white text-black px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all"
          >
            Let's Talk
          </motion.button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full" />
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
        >
          <div className="md:col-span-7">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-full mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Available for 2026 Projects</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8">
              CRAFTING<br />
              <span className="text-zinc-700">VISUAL</span><br />
              IDENTITY.
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-zinc-400 max-w-lg leading-relaxed mb-10 font-medium">
              Based in Dhaka, I specialize in advanced manipulation, cinematic grading, and building digital brands that stand out.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <button className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all">
                View Showcase <ArrowUpRight className="w-4 h-4" />
              </button>
              <button className="px-10 py-5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-full font-black uppercase tracking-widest text-xs transition-all">
                The Process
              </button>
            </motion.div>
          </div>

          <div className="md:col-span-5 relative">
            <motion.div 
              variants={fadeInUp}
              className="relative aspect-square md:aspect-[4/5] rounded-[4rem] overflow-hidden border border-zinc-800 group shadow-2xl"
            >
              <Image 
                src="/profile.jpg" 
                alt="Profile" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-10 left-10">
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">// Syed Fahim Muddasir</p>
                <h2 className="text-3xl font-black italic uppercase">Creative Lead</h2>
              </div>
            </motion.div>
            
            {/* Stats Badge */}
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: -12 }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute -top-6 -right-6 w-32 h-32 bg-white text-black rounded-full flex flex-col items-center justify-center p-4 text-center border-[8px] border-[#050505]"
            >
              <span className="text-3xl font-black leading-none">2+</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter leading-tight mt-1">Years of Creative Excellence</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* --- MARQUEE --- */}
      <section className="py-20 border-y border-zinc-900 overflow-hidden bg-zinc-950/50">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...clientLogos, ...clientLogos].map((client, i) => (
            <div key={i} className="flex items-center gap-12 px-12 opacity-30 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
              <div className="relative w-12 h-12">
                <Image src={client.src} alt={client.name} fill className="object-contain" />
              </div>
              <span className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-zinc-200">{client.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- EXPERTISE / SKILLS SECTION --- */}
      <section id="expertise" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end mb-24">
            <div>
              <h2 className="text-xs font-mono text-indigo-500 uppercase tracking-[0.5em] mb-6">// TECHNICAL STACK</h2>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                MASTERY OVER<br />
                <span className="text-zinc-700">THE PIXELS.</span>
              </h3>
            </div>
            <p className="text-zinc-400 text-lg max-w-md">
              I leverage the industry's most powerful tools to transform abstract ideas into cinematic reality. Each project is a blend of precision and artistic intuition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                whileHover={{ y: -10 }}
                className="group p-10 rounded-[3rem] bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm relative overflow-hidden"
              >
                <div className={`w-16 h-16 ${skill.bg} ${skill.color} rounded-2xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <skill.icon size={32} />
                </div>
                <h4 className="text-2xl font-bold mb-4">{skill.name}</h4>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className={`h-full bg-indigo-500 opacity-80`}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Level: Professional</span>
                  <span className="text-lg font-black text-indigo-500">{skill.level}</span>
                </div>
                
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <skill.icon size={120} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WORK GRID SECTION --- */}
      <section id="work" className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              WORKS <br /> <span className="text-indigo-500">2024-2026</span>
            </h2>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">Graphic Design</button>
              <button className="px-8 py-3 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">Motion</button>
            </div>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`relative group rounded-[2.5rem] overflow-hidden border border-zinc-800 bg-zinc-900 cursor-pointer break-inside-avoid`}
              >
                <div className={`relative ${project.wide ? "aspect-video" : project.tall ? "aspect-[3/4]" : "aspect-square"}`}>
                  <Image 
                    src={project.src} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-[2px] opacity-80 group-hover:opacity-100" 
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <span className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-2">{project.category}</span>
                    <div className="flex justify-between items-center">
                      <h4 className="text-2xl font-black uppercase italic tracking-tighter">{project.title}</h4>
                      <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <Plus size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button className="group relative px-12 py-6 bg-transparent border border-zinc-800 rounded-full overflow-hidden transition-all">
              <span className="relative z-10 text-xs font-black uppercase tracking-[0.3em] group-hover:text-black transition-colors">Load More Projects</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]" />
            </button>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section id="testimonials" className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-xs font-mono text-indigo-500 uppercase tracking-[0.5em] mb-4">THE FEEDBACK</h2>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">KIND WORDS.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 0.98 }}
                className="p-12 rounded-[3.5rem] bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-md relative"
              >
                <div className="absolute top-10 right-10 text-zinc-800">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5C12.017 3.89543 12.9216 3 14.0261 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM3.01691 21L3.01691 18C3.01691 16.8954 3.91234 16 5.01691 16H8.01691C8.56919 16 9.01691 15.5523 9.01691 15V9C9.01691 8.44772 8.56919 8 8.01691 8H4.01691C3.46462 8 3.01691 8.44772 3.01691 9V11C3.01691 11.5523 2.56919 12 2.01691 12H1.01691V5C1.01691 3.89543 1.92148 3 3.026 3H8.01691C10.226 3 12.0169 4.79086 12.0169 7V15C12.0169 18.3137 9.33062 21 6.01691 21H3.01691Z" /></svg>
                </div>
                <p className="text-2xl font-medium text-zinc-300 leading-relaxed mb-10 relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-5 border-t border-zinc-800 pt-8">
                  <div className="w-14 h-14 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="w-full h-full bg-indigo-500/20 flex items-center justify-center text-indigo-500 font-bold">{t.name[0]}</div>
                  </div>
                  <div>
                    <h5 className="text-lg font-black uppercase tracking-tight">{t.name}</h5>
                    <span className="text-sm font-mono text-zinc-500 uppercase tracking-widest">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-[4rem] p-8 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/5 blur-[120px] rounded-full -z-10" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none mb-10">
                  LET'S <br /> <span className="text-indigo-500">TALK.</span>
                </h2>
                <p className="text-xl text-zinc-400 mb-12 max-w-md">
                  Have a vision? Let’s bring it to life with cinematic precision. Now accepting select projects for Q3 2026.
                </p>
                
                <div className="space-y-6">
                  <a href="mailto:fahimnafiz70@gmail.com" className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-600 transition-all group-hover:scale-110">
                      <Mail size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Email Me</span>
                      <span className="text-xl font-bold">fahimnafiz70@gmail.com</span>
                    </div>
                  </a>
                  <a href="https://wa.me/01855941177" className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-green-600 transition-all group-hover:scale-110">
                      <FaWhatsapp size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">WhatsApp</span>
                      <span className="text-xl font-bold">+880 1855 941177</span>
                    </div>
                  </a>
                </div>

                <div className="flex gap-4 mt-16">
                  {[FaFacebookF, FaInstagram, SiBehance, FaLinkedinIn].map((Icon, idx) => (
                    <motion.a 
                      key={idx}
                      whileHover={{ y: -5, scale: 1.1 }}
                      href="#"
                      className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="bg-black/40 border border-zinc-800 p-10 rounded-[3rem] backdrop-blur-md">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 ml-4">Full Name</label>
                      <input type="text" placeholder="John Doe" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 ml-4">Email Address</label>
                      <input type="email" placeholder="john@example.com" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 ml-4">Subject</label>
                    <select className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 focus:border-indigo-500 outline-none transition-all appearance-none">
                      <option>Visual Identity</option>
                      <option>Motion Graphics</option>
                      <option>Event Branding</option>
                      <option>Other Collaboration</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 ml-4">Message</label>
                    <textarea rows={5} placeholder="Tell me about your project..." className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 focus:border-indigo-500 outline-none transition-all resize-none"></textarea>
                  </div>
                  <button className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-indigo-500 hover:text-white transition-all transform active:scale-95">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black">R</div>
              <span className="text-lg font-black tracking-tighter uppercase">RelaxStudio</span>
            </div>
            <p className="text-zinc-500 text-sm font-medium">© 2026 Syed Fahim Muddasir. All Rights Reserved.</p>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Terms of Service</a>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest italic">Built with Next.js & Framer Motion</span>
            <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white transition-all cursor-pointer">
              <FaGithub size={18} />
            </div>
          </div>
        </div>
      </footer>

      {/* --- POPUP MODAL (HSC '26 PAUSE) --- */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              className="max-w-md w-full bg-[#0a0a0a] border border-zinc-800/50 p-10 rounded-[4rem] shadow-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              
              <div className="w-20 h-20 bg-indigo-600/10 text-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Play size={32} />
              </div>
              
              <h2 className="text-white text-3xl font-black italic mb-4 uppercase leading-none">Temporary <span className="text-indigo-500">Pause</span></h2>
              <p className="text-zinc-500 text-sm mb-10 leading-relaxed">
                I am currently focused on my <span className="text-white font-bold">HSC '26 Board Examinations</span>. Creative services will resume in full capacity starting <span className="text-white font-bold">July 2026</span>.
              </p>
              
              <button 
                onClick={() => setShowPopup(false)} 
                className="w-full py-4 bg-white text-black font-black uppercase italic tracking-[0.2em] text-[10px] rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5"
              >
                Enter Portfolio
              </button>
              
              <div className="mt-8 pt-8 border-t border-zinc-900 flex justify-center gap-6">
                 <FaFacebookF className="text-zinc-700 hover:text-white cursor-pointer" />
                 <FaInstagram className="text-zinc-700 hover:text-white cursor-pointer" />
                 <FaWhatsapp className="text-zinc-700 hover:text-white cursor-pointer" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
