// app/page.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image"; // [source: 1]
import { motion, AnimatePresence } from "framer-motion"; // [source: 1]
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import { CLIENT_LOGOS, TESTIMONIALS } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react"; // [source: 1]
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6"; // [source: 1]
import { SiBehance } from "react-icons/si"; // [source: 1]

export default function Portfolio() {
  const [selectedVideo, setSelectedVideo] = useState<{src: string, title: string, tag: string} | null>(null); // [source: 1]

  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, url: "https://www.facebook.com/syedfahim.muddasir/", color: "hover:text-[#1877F2]" },
    { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/mr_relax_bro", color: "hover:text-[#E4405F]" },
    { name: "Behance", icon: SiBehance, url: "https://www.behance.net/fahimmuddasir", color: "hover:text-[#0057ff]" },
    { name: "WhatsApp", icon: FaWhatsapp, url: "https://wa.me/8801855941177", color: "hover:text-[#25D366]" },
    { name: "LinkedIn", icon: FaLinkedinIn, url: "https://linkedin.com", color: "hover:text-[#0077B5]" },
  ]; // [source: 1]

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-indigo-500/30">
      
      {/* 1. Conversion Hero */}
      <HeroSection />

      {/* 2. Client Logos Marquee */}
      <div className="py-10 border-y border-zinc-800/40 bg-zinc-950/50 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-4 mb-4 text-center">
          <span className="text-zinc-500 text-xs font-mono uppercase tracking-[0.3em]">Trusted By Brands & Organizations</span>
        </div>
        <div className="flex overflow-hidden group">
          <div className="animate-marquee flex gap-12 items-center whitespace-nowrap">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
              <a 
                key={index} 
                href={logo.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"
              >
                <Image src={logo.src} alt={logo.name} width={40} height={40} className="object-contain" />
                <span className="text-lg font-bold text-zinc-300">{logo.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Pricing & Retainer Packages */}
      <PricingSection />

      {/* 4. Selected Design Showcase */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-indigo-400 font-mono text-xs uppercase tracking-widest">Portfolio Showcase</span>
            <h2 className="text-4xl font-black text-white mt-1">High-Impact <span className="text-zinc-500">Designs</span></h2>
          </div>
          <a href="https://www.behance.net/fahimmuddasir" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-indigo-400 hover:underline flex items-center gap-1">
            View Behance <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Responsive Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:row-span-2 relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[4/5] group">
            <Image src="/designs/work1.png" alt="W1" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent p-6 flex flex-col justify-end">
              <span className="text-xs text-indigo-400 font-mono">TongErKhobor</span>
              <h3 className="text-xl font-bold text-white">26 March Promotional Poster</h3>
            </div>
          </div>

          <div className="md:col-span-2 relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 aspect-video group">
            <Image src="/designs/work2.jpg" alt="W2" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent p-6 flex flex-col justify-end">
              <span className="text-xs text-indigo-400 font-mono">Willes Literary Club</span>
              <h3 className="text-2xl font-bold text-white">Event Banner Design</h3>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 aspect-square group">
            <Image src="/designs/work3.png" alt="W3" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent p-6 flex flex-col justify-end">
              <span className="text-xs text-indigo-400 font-mono">Ta'atuf Foundation</span>
              <h3 className="text-lg font-bold text-white">Executive Social Post</h3>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 aspect-square group">
            <Image src="/designs/eid.png" alt="Eid" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent p-6 flex flex-col justify-end">
              <span className="text-xs text-indigo-400 font-mono">RelaxStudio</span>
              <h3 className="text-lg font-bold text-white">Festive Campaign Graphics</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Client Testimonials */}
      <section className="py-20 bg-zinc-950/60 border-t border-zinc-800/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-mono text-xs uppercase tracking-widest">Client Feedback</span>
            <h2 className="text-4xl font-black text-white mt-1">What Clients <span className="text-zinc-500">Say</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/60 flex flex-col justify-between">
                <p className="text-zinc-300 text-sm italic leading-relaxed">"{t.text}"</p>
                <div className="mt-6 pt-4 border-t border-zinc-800/50">
                  <h4 className="text-white font-bold text-sm">{t.name}</h4>
                  <span className="text-zinc-500 text-xs font-mono">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. High-Converting Contact Footer */}
      <footer className="py-20 border-t border-zinc-800/60 text-center relative">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Ready to Upgrade Your Brand's Visuals?</h2>
          <p className="text-zinc-400 mt-4 text-base">Let's discuss how we can improve your social media engagement and sales conversion this month.</p>
          
          <a 
            href="https://wa.me/8801855941177?text=Hi%20Fahim,%20I'm%20ready%20to%20start%20a%20design%20project." 
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-black font-extrabold rounded-2xl hover:bg-emerald-400 transition-all text-base shadow-xl shadow-emerald-500/10"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span>Start a Project on WhatsApp</span>
          </a>

          <div className="mt-12 flex justify-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className={`p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 transition-colors ${link.color}`}>
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          <p className="mt-12 text-zinc-600 text-xs font-mono">
            © 2026 Syed Fahim Muddasir. Optimized for Client Conversions. [source: 1]
          </p>
        </div>
      </footer>

    </main>
  );
}
