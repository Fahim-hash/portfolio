// components/PricingSection.tsx
"use client";
import { PACKAGES } from "@/data/portfolioData";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6"; // [source: 1]

export default function PricingSection() {
  const WHATSAPP_LINK = "https://wa.me/8801855941177"; // [source: 1]

  return (
    <section id="pricing" className="py-20 relative border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-indigo-400 font-mono text-xs uppercase tracking-[0.3em]">Transparent Investment</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2 tracking-tight">
            Design Packages & <span className="text-zinc-500">Monthly Retainers</span>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-lg mx-auto">
            Choose a flexible monthly retainer or test out my design quality with a low-risk test run.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => (
            <div 
              key={pkg.id}
              className={`relative rounded-[2.5rem] p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular 
                  ? "bg-zinc-900/90 border-2 border-indigo-500/80 shadow-2xl shadow-indigo-500/10 scale-105" 
                  : "bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" /> Most Popular For Brands
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                <p className="text-zinc-400 text-xs mt-2 min-h-[32px]">{pkg.tagline}</p>
                
                {/* Price Display */}
                <div className="my-6">
                  <span className="text-4xl font-black text-white">{pkg.price}</span>
                  <span className="text-zinc-500 text-sm font-mono ml-1">{pkg.period}</span>
                </div>

                {/* Deliverables List */}
                <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Button */}
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent(pkg.waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 w-full py-4 rounded-xl font-extrabold flex items-center justify-center gap-2 transition-all ${
                  pkg.popular
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                }`}
              >
                <span>Select Package</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Custom Order Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h4 className="text-lg font-bold text-white">Need a Custom Deliverable or One-Off Design?</h4>
            <p className="text-zinc-400 text-sm">Single post redesigns start at 600 BDT. YouTube Thumbnails at 800 BDT.</p>
          </div>
          <a
            href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Hi Fahim, I need a custom design quote for my project.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold rounded-xl text-sm transition-all shrink-0"
          >
            Get Custom Quote
          </a>
        </div>

      </div>
    </section>
  );
}
