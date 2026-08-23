'use client';

import React, { useState } from 'react';

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<'retainers' | 'alacarte' | 'campaigns'>('retainers');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-semibold uppercase tracking-wider">
            Rate Card & Service Packages
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Transparent Pricing for Local Brands & Creators
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg">
            High-converting visual design packages tailored for Bangladeshi F-commerce, tech shops, and content creators.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center border-b border-slate-800 pb-4">
          <nav className="flex space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('retainers')}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'retainers'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Monthly Retainers
            </button>
            <button
              onClick={() => setActiveTab('alacarte')}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'alacarte'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Ala-Carte Menu
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'campaigns'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Event Combos
            </button>
          </nav>
        </div>

        {/* Section 1: Monthly Retainer Packages */}
        {(activeTab === 'retainers' || activeTab === 'retainers') && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-white">Monthly Retainer Packages</h2>
              <p className="text-slate-400 text-sm mt-1">Predictable monthly design coverage to scale your brand consistently.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {/* Starter Business */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                  <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Starter Business</div>
                  <p className="text-xs text-slate-500 mt-1">Best suited for Small F-Commerce / New Startups</p>
                  <div className="mt-4 text-3xl font-bold text-white">
                    8,000 – 10,000 <span className="text-sm font-normal text-slate-400">BDT / mo</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckIcon /> 8 Single Social Posts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon /> 2 Carousel Posts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon /> 1 Cover Banner Update
                    </li>
                  </ul>
                </div>
                <button className="mt-8 w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium rounded-xl text-sm transition">
                  Select Starter
                </button>
              </div>

              {/* Growth Retainer (Featured) */}
              <div className="relative bg-slate-900 border-2 border-indigo-500/80 rounded-2xl p-6 flex flex-col justify-between shadow-2xl shadow-indigo-950/50 scale-105 z-10">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Popular Choice
                </span>
                <div>
                  <div className="text-sm font-semibold text-indigo-400 uppercase tracking-wide">Growth Retainer</div>
                  <p className="text-xs text-slate-400 mt-1">Best suited for Active F-Commerce & Local Tech Shops</p>
                  <div className="mt-4 text-3xl font-bold text-white">
                    12,000 – 15,000 <span className="text-sm font-normal text-slate-400">BDT / mo</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-200">
                    <li className="flex items-center gap-2">
                      <CheckIcon /> 12 Single Social Posts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon /> 4 Carousel Posts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon /> 2 Thumbnails / Ad visuals
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon /> 1 Cover Banner Update
                    </li>
                  </ul>
                </div>
                <button className="mt-8 w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-sm transition shadow-lg shadow-indigo-600/30">
                  Get Growth Package
                </button>
              </div>

              {/* Creator / YouTube Combo */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                  <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Creator / YouTube Combo</div>
                  <p className="text-xs text-slate-500 mt-1">Best suited for YouTubers & Video Content Creators</p>
                  <div className="mt-4 text-3xl font-bold text-white">
                    8,000 – 12,000 <span className="text-sm font-normal text-slate-400">BDT / mo</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckIcon /> 8–10 YouTube Thumbnails
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon /> Channel Art / Banner Update
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon /> 4 Short-form Promo Cards
                    </li>
                  </ul>
                </div>
                <button className="mt-8 w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium rounded-xl text-sm transition">
                  Select Creator Combo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Ala-Carte Menu */}
        {activeTab === 'alacarte' && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-white">Itemized Base Rates (Ala-Carte)</h2>
              <p className="text-slate-400 text-sm mt-1">Standalone pricing for quick, single-asset client deliverables.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition">
                <div className="text-indigo-400 font-medium text-sm">01. Single Post</div>
                <h3 className="text-lg font-semibold text-white mt-1">Promotional Post</h3>
                <p className="text-xs text-slate-400 mt-2">Single square/portrait product or announcement image.</p>
                <div className="mt-4 text-xl font-bold text-indigo-300">500 – 800 BDT</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition">
                <div className="text-indigo-400 font-medium text-sm">02. Carousel</div>
                <h3 className="text-lg font-semibold text-white mt-1">Carousel Post</h3>
                <p className="text-xs text-slate-400 mt-2">3–5 slides educational or feature-breakdown deck.</p>
                <div className="mt-4 text-xl font-bold text-indigo-300">1,200 – 1,800 BDT</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition">
                <div className="text-indigo-400 font-medium text-sm">03. Thumbnail</div>
                <h3 className="text-lg font-semibold text-white mt-1">YouTube / FB Thumbnail</h3>
                <p className="text-xs text-slate-400 mt-2">High-CTR visual with crisp typography & subject cutoff.</p>
                <div className="mt-4 text-xl font-bold text-indigo-300">500 – 1,000 BDT</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition">
                <div className="text-indigo-400 font-medium text-sm">04. Header Visual</div>
                <h3 className="text-lg font-semibold text-white mt-1">Cover Banner / Header</h3>
                <p className="text-xs text-slate-400 mt-2">Optimized for FB, LinkedIn & Web viewports across devices.</p>
                <div className="mt-4 text-xl font-bold text-indigo-300">1,000 – 1,500 BDT</div>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Event & Campaign Combos */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-white">Event & Campaign Combos</h2>
              <p className="text-slate-400 text-sm mt-1">High-value packages for product launches and festive sales.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Festive Campaign Package */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white">Festive Campaign Package</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Designed for Eid, Puja, New Year & Clearance Sales</p>
                    </div>
                    <span className="text-lg font-extrabold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
                      10,000 BDT
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckIcon /> 1× Main Offer Announcement Banner / Cover
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon /> 5× Product Promotion Single Posts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon /> 2× Carousel Posts (Discount catalogs)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon /> 3× IG/FB Story Templates (Static/Editable)
                    </li>
                  </ul>
                </div>
                <button className="mt-8 w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium rounded-xl text-sm transition">
                  Order Festive Combo
                </button>
              </div>

              {/* Brand Launch Combo */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white">Brand Launch Combo</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Complete kickstart identity for new businesses</p>
                    </div>
                    <span className="text-lg font-extrabold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
                      12k – 15k BDT
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckIcon /> Full Brand Identity Starter (Logo polish, Palette, Fonts)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon /> 1× Facebook & Instagram Banner
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon /> 6× Launch & Product Showcase Posts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon /> Business Card / Package Label Print Design
                    </li>
                  </ul>
                </div>
                <button className="mt-8 w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium rounded-xl text-sm transition">
                  Order Launch Combo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Client Presentation Pitch Tips */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm uppercase tracking-wide">
            <LightbulbIcon /> Client Onboarding Playbook
          </div>
          <h2 className="text-xl font-bold text-white">How to Present Packages to Local Clients</h2>
          
          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-300 pt-2">
            <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
              <div className="font-semibold text-indigo-300 mb-1">1. Offer a Low-Risk Entry First</div>
              <p className="text-slate-400">
                Never push the Growth Retainer in your first message. Pitch a <span className="text-slate-200 font-medium">"3-Post Test Package for BDT 1,500"</span> so they can test your turnaround time and visual quality risk-free.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
              <div className="font-semibold text-indigo-300 mb-1">2. Upsell Script to Monthly</div>
              <p className="text-slate-400">
                After timely delivery of the test package, say:
              </p>
              <blockquote className="mt-2 text-xs italic bg-slate-900 border-l-2 border-indigo-500 pl-3 py-1.5 text-slate-300 rounded-r">
                "Ami apnar branding-er consistency dhorer jonno Monthly Starter ba Growth package suggest korbo—alada alada order korar cheye cost 20% kom porbe."
              </blockquote>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Sub-components for icons
function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}
