"use client";

import React, { useState } from 'react';
import { Camera, Calendar, Tag, Type, Share2, Sparkles, Download } from 'lucide-react';

export default function NewsCardGenerator() {
  const [headline, setHeadline] = useState("Your News Headline Goes Here");
  const [subHeadline, setSubHeadline] = useState("A brief description or subheadline that provides more context to the story.");
  const [date, setDate] = useState("May 14, 2026");
  const [category, setCategory] = useState("NATIONAL");
  const [image, setImage] = useState("https://via.placeholder.com/800x450");
  const [theme, setTheme] = useState('white'); // white, black, custom1, custom2
  const [aiCaption, setAiCaption] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // AI Caption & News Fetch Logic (Simulation)
  const generateAICaption = async () => {
    setIsGenerating(true);
    // Simulate AI delay
    setTimeout(() => {
      setAiCaption(`🔥 Breaking: ${headline}. This is a significant development in the ${category} sector. #NewsUpdate #LatestNews`);
      setIsGenerating(false);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Side: Preview Card */}
        <div className="sticky top-10">
          <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center gap-2">
            <Share2 size={20} /> Live Preview
          </h2>
          
          <div 
            id="news-card"
            className={`relative w-full aspect-[4/5] overflow-hidden rounded-xl shadow-2xl transition-all duration-500
              ${theme === 'white' ? 'bg-white text-black' : ''}
              ${theme === 'black' ? 'bg-zinc-950 text-white' : ''}
              ${theme === 'custom1' ? 'bg-gradient-to-br from-blue-900 to-slate-900 text-white' : ''}
              ${theme === 'custom2' ? 'bg-gradient-to-br from-red-800 to-zinc-900 text-white' : ''}
            `}
          >
            {/* News Image */}
            <div className="h-1/2 w-full relative">
              <img src={image} alt="News" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <img src="/logo.png" alt="Logo" className="h-10 drop-shadow-md" />
              </div>
              <div className={`absolute bottom-0 left-0 px-4 py-1 font-bold text-xs tracking-widest
                ${theme === 'white' ? 'bg-red-600 text-white' : 'bg-yellow-500 text-black'}`}>
                {category.toUpperCase()}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col h-1/2 justify-between">
              <div>
                <p className="text-sm opacity-70 mb-2 font-medium">{date}</p>
                <h1 className={`text-2xl md:text-3xl font-extrabold leading-tight mb-4
                  ${theme === 'white' ? 'text-slate-900' : 'text-white'}`}>
                  {headline}
                </h1>
                <p className={`text-sm md:text-base opacity-80 line-clamp-3
                  ${theme === 'white' ? 'text-slate-600' : 'text-slate-300'}`}>
                  {subHeadline}
                </p>
              </div>
              
              <div className="border-t pt-4 flex justify-between items-center opacity-50 text-xs italic">
                <span>Breaking News Updates</span>
                <span>www.yournewsplatform.com</span>
              </div>
            </div>
          </div>
          
          <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition shadow-lg">
            <Download size={20} /> Download Photo Card
          </button>
        </div>

        {/* Right Side: Controls */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 text-slate-800 border-b pb-2">Customization Panel</h2>
          
          <div className="space-y-6">
            {/* Theme Selector */}
            <div>
              <label className="block text-sm font-semibold mb-3">Select Template</label>
              <div className="grid grid-cols-4 gap-2">
                {['white', 'black', 'custom1', 'custom2'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`py-2 text-xs rounded border transition capitalize ${theme === t ? 'bg-indigo-600 text-white border-indigo-600' : 'hover:bg-slate-50'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Headline Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Type size={16} /> Headline
              </label>
              <textarea 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                rows={2}
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>

            {/* Subheadline Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Type size={16} /> Sub Headline
              </label>
              <textarea 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                rows={3}
                value={subHeadline}
                onChange={(e) => setSubHeadline(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Calendar size={16} /> Date
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg text-sm"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Tag size={16} /> Category
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg text-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Camera size={16} /> News Image
              </label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            {/* AI Section */}
            <div className="mt-8 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-600" /> AI Caption Generator
                </h3>
                <button 
                  onClick={generateAICaption}
                  disabled={isGenerating}
                  className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-full hover:bg-indigo-700 disabled:bg-slate-400"
                >
                  {isGenerating ? "Processing..." : "Generate & Fetch"}
                </button>
              </div>
              {aiCaption && (
                <div className="bg-white p-3 rounded border border-indigo-200 text-xs text-slate-700 animate-in fade-in slide-in-from-bottom-2">
                  {aiCaption}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
