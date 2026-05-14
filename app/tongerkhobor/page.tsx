"use client";

import React, { useState, useRef } from 'react';
import { Camera, Calendar, Tag, Type, Share2, Sparkles, Download, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function NewsCardGenerator() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [headline, setHeadline] = useState("আপনার সংবাদের শিরোনাম এখানে লিখুন");
  const [subHeadline, setSubHeadline] = useState("সংবাদের বিস্তারিত অংশ বা সাব-হেডলাইন এখানে থাকবে।");
  const [date, setDate] = useState(new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }));
  const [category, setCategory] = useState("NATIONAL");
  const [image, setImage] = useState("https://images.unsplash.com/photo-1504711432869-efd597cdd042?q=80&w=1000");
  const [theme, setTheme] = useState('white');
  const [aiCaption, setAiCaption] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = ["NATIONAL", "INTERNATIONAL", "SPORTS", "ENTERTAINMENT", "TECH", "POLITICS"];

  // --- Real AI & Fetch Logic ---
  const generateWithAI = async () => {
    if (!headline) return alert("Please enter a headline first!");
    setIsGenerating(true);
    
    try {
      // Ekhane tumi tomar backend API call korbe jekhane Gemini ba OpenAI connect kora
      // For now, ami logic ta simulate korchi kintu structure ready rakchi
      const response = await fetch('/api/generate-news', {
        method: 'POST',
        body: JSON.stringify({ headline }),
      });
      
      // Simulation for the Demo:
      setTimeout(() => {
        setSubHeadline("AI fetched context: Eita ekti guruttopurno সংবাদ। AI er maddhome amra internet theke data analyze kore ekti summary generate korechi.");
        setAiCaption(`📌 ${headline}\n\nEita niye aro jante porun amader platform e। #News #Update #${category.toLowerCase()}`);
        setIsGenerating(false);
      }, 2000);

    } catch (error) {
      console.error("AI Fetch Error:", error);
      setIsGenerating(false);
    }
  };

  // --- Download Card as Image ---
  const downloadCard = async () => {
    if (cardRef.current === null) return;
    
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `news-card-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* --- Card Preview Section --- */}
        <div className="flex flex-col items-center">
          <div className="sticky top-8 w-full max-w-[450px]">
            <h2 className="text-lg font-bold mb-4 text-slate-700 flex items-center gap-2">
              <Share2 size={18} /> Live News Card Preview
            </h2>
            
            {/* The Actual Card to Download */}
            <div 
              ref={cardRef}
              className={`relative w-full aspect-[4/5] overflow-hidden shadow-2xl transition-all duration-300
                ${theme === 'white' ? 'bg-white text-black' : ''}
                ${theme === 'black' ? 'bg-black text-white' : ''}
                ${theme === 'custom1' ? 'bg-gradient-to-br from-indigo-900 to-black text-white' : ''}
                ${theme === 'custom2' ? 'bg-[#1a1a1a] border-t-8 border-red-600 text-white' : ''}
              `}
            >
              <div className="h-[45%] w-full relative">
                <img src={image} alt="News" className="w-full h-full object-cover" />
                <div className="absolute top-5 left-5">
                  {/* Logo Placeholder */}
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded">
                    <img src="/logo.png" alt="LOGO" className="h-8 object-contain" 
                      onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/100x40?text=LOGO")} />
                  </div>
                </div>
                <div className={`absolute bottom-0 left-0 px-6 py-2 font-black text-sm tracking-tighter
                  ${theme === 'white' ? 'bg-red-600 text-white' : 'bg-white text-black'}`}>
                  {category}
                </div>
              </div>

              <div className="p-8 flex flex-col h-[55%] justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 opacity-60 text-xs font-bold uppercase tracking-widest">
                    <Calendar size={12} /> {date}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black leading-[1.1] mb-4 tracking-tight">
                    {headline}
                  </h1>
                  <div className={`w-12 h-1 mb-4 ${theme === 'white' ? 'bg-red-600' : 'bg-white'}`}></div>
                  <p className={`text-base leading-relaxed opacity-90 line-clamp-4 font-medium`}>
                    {subHeadline}
                  </p>
                </div>
                
                <div className="border-t border-current/10 pt-4 flex justify-between items-center opacity-60 text-[10px] font-bold tracking-widest uppercase">
                  <span>Official News Platform</span>
                  <span>Verified News</span>
                </div>
              </div>
            </div>

            <button 
              onClick={downloadCard}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-xl"
            >
              <Download size={20} /> Download HD Photo Card
            </button>
          </div>
        </div>

        {/* --- Configuration Section --- */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-800">Editor Panel</h2>
            <span className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-bold uppercase">v2.0 Beta</span>
          </div>
          
          <div className="space-y-6">
            {/* Theme & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Template Style</label>
                <select 
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full p-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 font-semibold"
                >
                  <option value="white">Minimal White</option>
                  <option value="black">Dark Premium</option>
                  <option value="custom1">Gradient Blue</option>
                  <option value="custom2">Red Accent</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 font-semibold"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            {/* Headline with AI Trigger */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-600">Main Headline</label>
                <button 
                  onClick={generateWithAI}
                  disabled={isGenerating}
                  className="text-[10px] bg-indigo-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-indigo-700 disabled:opacity-50 transition-all uppercase tracking-tighter"
                >
                  {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                  AI Generate & Fetch
                </button>
              </div>
              <textarea 
                className="w-full p-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
                rows={2}
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>

            {/* Subheadline */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600">Brief Description</label>
              <textarea 
                className="w-full p-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm"
                rows={3}
                value={subHeadline}
                onChange={(e) => setSubHeadline(e.target.value)}
              />
            </div>

            {/* Image Upload */}
            <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-indigo-400 transition-colors cursor-pointer group">
              <input type="file" id="img-up" hidden onChange={handleImageUpload} />
              <label htmlFor="img-up" className="flex flex-col items-center gap-2 cursor-pointer">
                <Camera className="text-slate-400 group-hover:text-indigo-500" size={32} />
                <span className="text-xs font-bold text-slate-500 uppercase">Change News Image</span>
              </label>
            </div>

            {/* AI Caption Display */}
            {aiCaption && (
              <div className="mt-4 p-4 bg-slate-900 rounded-2xl text-white">
                <p className="text-[10px] text-indigo-400 font-black mb-2 uppercase">AI Generated Caption:</p>
                <p className="text-xs leading-relaxed opacity-90">{aiCaption}</p>
                <button 
                  onClick={() => navigator.clipboard.writeText(aiCaption)}
                  className="mt-3 text-[10px] underline hover:text-indigo-300"
                >
                  Copy Caption
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
