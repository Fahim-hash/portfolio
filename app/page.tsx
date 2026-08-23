"use client";
import React from "react";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import { CLIENT_LOGOS, TESTIMONIALS } from "@/data/portfolioData";
import { ArrowUpRight, Palette } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { SiBehance } from "react-icons/si";

export default function Portfolio() {
  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, url: "https://www.facebook.com/syedfahim.muddasir/", color: "hover:text-[#1877F2]" },
    { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/mr_relax_bro", color: "hover:text-[#E4405F]" },
    { name: "Behance", icon: SiBehance, url: "https://www.behance.net/fahimmuddasir", color: "hover:text-[#0057ff]" },
    { name: "WhatsApp", icon: FaWhatsapp, url: "https://wa.me/8801855941177", color: "hover:text-[#25D366]" },
    { name: "LinkedIn", icon: FaLinkedinIn, url: "https://linkedin.com", color: "hover:text-[#0077B5]" },
  ];

  const featuredProjects = [
    {
      title: "26 March Promotional Campaign",
      client: "TongErKhobor",
      image: "/designs/work1.png",
      span: "md:row-span-2 aspect-[4/5]",
      tags: ["Branding", "Photoshop", "Poster Design"],
    },
    {
      title: "Literary Club Event Identity",
      client: "Willes Literary Club",
      image: "/designs/work2.jpg",
      span: "md:col-span-2 aspect-video",
      tags: ["Banner Layout", "Typography", "Illustrator"],
    },
    {
      title: "Executive Social Post System",
      client: "Ta'atuf Foundation",
      image: "/designs/work3.png",
      span: "aspect-square",
      tags: ["Social Media", "Brand Identity"],
    },
    {
      title: "Festive Campaign Graphics",
      client: "RelaxStudio",
      image: "/designs/eid.png",
      span: "aspect-square",
      tags: ["Creative Direction", "Digital Media"],
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-indigo-500/30">
      
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Client Logos Marquee */}
      <div className="py-10 border-y border-zinc-800/40 bg-zinc-950/50 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-4 mb-4 text-center">
          <span className="text-zinc-500 text-xs font-mono uppercase tracking-[0.3em]">Collaborations & Trusted Brands</span>
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

      {/* 3. Featured Portfolio (Moved above Pricing to build trust first) */}
      <section className="py-24 max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-indigo-400 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
              <Palette className="w-3.5 h-3.5" /> Selected Showcase
            </span>
            <h2 className="text-4xl font-black text-white mt-1">
              Visual <span className="text-zinc-500">Craftsmanship</span>
            </h2>
          </div>
          <a 
            href="https://www.behance.net/fahimmuddasir" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 group"
          >
            Explore Behance Archive <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-3xl overflow-hidden bg-zinc-900/80 border border-zinc-800/80 group ${project.span}`}
            >
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent p-6 flex flex-col justify-end">
                <span className="text-xs text-indigo-400 font-mono font-semibold">{project.client}</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{project.title}</h3>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Service Packages & Pricing */}
      <PricingSection />

      {/* 5. Client Testimonials */}
      <section className="py-20 bg-zinc-950/60 border-t border-zinc-800/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-mono text-xs uppercase tracking-widest">Endorsements</span>
            <h2 className="text-4xl font-black text-white mt-1">Client <span className="text-zinc-500">Feedback</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/60 flex flex-col justify-between hover:border-zinc-700/80 transition-colors">
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

      {/* 6. Contact Footer */}
      <footer className="py-20 border-t border-zinc-800/60 text-center relative">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Let's Build Something Memorable.</h2>
          <p className="text-zinc-400 mt-4 text-base">Have a project in mind or need tailored brand design & web application development?</p>
          
          <a 
            href="https://wa.me/8801855941177?text=Hi%20Fahim,%20I'd%20like%20to%20discuss%20a%20project." 
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-black font-extrabold rounded-2xl hover:bg-emerald-400 transition-all text-base shadow-xl shadow-emerald-500/10"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span>Start a Conversation on WhatsApp</span>
          </a>

          <div className="mt-12 flex justify-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 transition-all ${link.color} hover:border-zinc-700`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          <p className="mt-12 text-zinc-600 text-xs font-mono">
            © {new Date().getFullYear()} Syed Fahim Muddasir. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </footer>

    </main>
  );
}
