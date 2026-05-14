"use client";

import React, { useState, useRef } from 'react';
import { Camera, Calendar, Tag, Type, Share2, Sparkles, Download, Globe, RefreshCcw } from 'lucide-react';
import html2canvas from 'html2canvas';

export default function NewsCardGenerator() {
  const [headline, setHeadline] = useState("বাংলাদেশের বাজারে এলো নতুন প্রযুক্তির স্মার্টফোন");
  const [subHeadline, setSubHeadline] = useState("সাশ্রয়ী মূল্যে প্রিমিয়াম ফিচারের এই ফোনটি তরুণ প্রজন্মের নজর কেড়েছে। এতে রয়েছে শক্তিশালী প্রসেসর ও উন্নত ক্যামেরা।");
  const [date, setDate] = useState("মে ১৪, ২০২৬");
  const [category, setCategory] = useState("প্রযুক্তি");
  const [image, setImage] = useState("https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000");
  const [theme, setTheme] = useState('white'); // white, black, premium, viral
  const [aiCaption, setAiCaption] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);

  // AI Caption & Mock News Fetch Logic
  const handleAIFetch = async () => {
    setIsGenerating(true);
    // এখানে আপনি ভবিষ্যতে OpenAI বা Gemini API ইন্টিগ্রেট করতে পারবেন
    setTimeout(() => {
      const generatedText = `📌 ${headline}\n\n${subHeadline}\n\n#BreakingNews #Bangladesh #Update #${category}`;
      setAiCaption(generatedText);
      setIsGenerating(false);
    }, 1800);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) setImage(event.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const downloadCard = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, { useCORS: true, scale: 2 });
      const link = document.createElement('a');
      link.download = `news-card-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- Left Side: Controls (40%) --- */}
        <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-3">
              <RefreshCcw size={20} className="text-blue-600" /> কার্ড এডিটর
            </h2>
            
            <div className="space-y-5">
              {/* Theme Selector */}
              <div>
                <label className="block text-sm font-bold mb-3 text-slate-700">টেম্পলেট সিলেক্ট করুন</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'white', label: 'Light' },
                    { id: 'black', label: 'Dark' },
                    { id: 'premium', label: 'Premium' },
                    { id: 'viral', label: 'Viral' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all ${theme === t.id ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white hover:bg-slate-50 text-slate-600'}`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1">
                    <Type size={16} /> শিরোনাম (Headline)
                  </label>
                  <input 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1">
                    <Type size={16} /> বিস্তারিত (Sub-headline)
                  </label>
                  <textarea 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all h-24"
                    value={subHeadline}
                    onChange={(e) => setSubHeadline(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-slate-700 mb-1 block">বিভাগ</label>
                    <input 
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 mb-1 block">তারিখ</label>
                    <input 
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <Camera size={16} /> ছবি আপলোড
                  </label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                </div>
              </div>

              {/* AI Section */}
              <div className="mt-4 p-4 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl text-white shadow-lg shadow-indigo-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <Sparkles size={18} /> AI ম্যাজিক
                  </div>
                  <button 
                    onClick={handleAIFetch}
                    disabled={isGenerating}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold transition-all disabled:opacity-50"
                  >
                    {isGenerating ? "ফেচ হচ্ছে..." : "অটো জেনারেট"}
                  </button>
                </div>
                {aiCaption ? (
                  <div className="bg-white/10 p-3 rounded-xl text-[13px] leading-relaxed border border-white/10 italic">
                    {aiCaption}
                  </div>
                ) : (
                  <p className="text-[11px] opacity-80 text-center">শিরোনাম থেকে অটোমেটিক ক্যাপশন এবং হ্যাশট্যাগ জেনারেট করুন</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- Right Side: Card Preview (60%) --- */}
        <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Share2 size={20} className="text-blue-600" /> কার্ড প্রিভিউ
            </h2>
            <button 
              onClick={downloadCard}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition shadow-lg active:scale-95"
            >
              <Download size={18} /> ডাউনলোড করুন
            </button>
          </div>

          <div className="flex justify-center items-start">
            <div 
              ref={cardRef}
              id="news-card"
              className={`relative w-full max-w-[500px] aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-700
                ${theme === 'white' ? 'bg-white text-slate-900' : ''}
                ${theme === 'black' ? 'bg-[#0a0a0a] text-white' : ''}
                ${theme === 'premium' ? 'bg-gradient-to-br from-[#1a1a1a] to-[#4a4a4a] text-white border-4 border-[#c5a059]' : ''}
                ${theme === 'viral' ? 'bg-[#ff0000] text-white' : ''}
              `}
            >
              {/* Top Section: Logo & Category */}
              <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
                <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm">
                   <img src="/logo.png" alt="Logo" className="h-7" />
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg
                  ${theme === 'white' ? 'bg-blue-600 text-white' : 'bg-yellow-400 text-black'}`}>
                  {category}
                </div>
              </div>

              {/* News Image */}
              <div className="h-[55%] relative">
                <img src={image} alt="News" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent bottom-0"></div>
              </div>

              {/* Content Section */}
              <div className="p-8 relative flex flex-col h-[45%] justify-between">
                <div>
                  <div className="flex items-center gap-2 opacity-70 text-[11px] font-semibold mb-3">
                    <Calendar size={12} /> {date} | <Globe size={12} /> অনলাইন ডেস্ক
                  </div>
                  <h1 className={`text-2xl md:text-3xl font-black leading-tight mb-4 tracking-tight
                    ${theme === 'white' ? 'text-slate-900' : 'text-white'}`}>
                    {headline}
                  </h1>
                  <p className={`text-[14px] leading-relaxed opacity-90 line-clamp-2
                    ${theme === 'white' ? 'text-slate-600' : 'text-slate-300'}`}>
                    {subHeadline}
                  </p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-500/20 flex justify-between items-center opacity-60 text-[10px] font-bold tracking-widest uppercase">
                  <span>NEWS PORTAL 24</span>
                  <span className="flex items-center gap-1">LIVE UPDATE <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span></span>
                </div>
              </div>
              
              {/* Premium Decoration */}
              {theme === 'premium' && (
                <div className="absolute top-0 right-0 p-4 opacity-30">
                  <div className="w-20 h-20 border-r-4 border-t-4 border-[#c5a059]"></div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
             <p className="text-xs text-blue-800 text-center font-medium">
               টিপস: হাই-কোয়ালিটি ইমেজের জন্য বড় রেজোলিউশন এর ছবি ব্যবহার করুন।
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
