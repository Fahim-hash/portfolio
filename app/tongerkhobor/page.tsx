"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Download, Camera, Newspaper, Layers, Type, Sparkles, 
  Settings, RefreshCcw, ZoomIn, ZoomOut, Move, Sliders 
} from 'lucide-react';

// --- Types ---
type Theme = 'premium_red' | 'dark_minimal' | 'editorial' | 'clean_white';

export default function TongerKhoborPro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  // --- Content State ---
  const [headline, setHeadline] = useState('টংগেরখবর-এর নতুন এআই নিউজ জেনারেটর');
  const [subHeadline, setSubHeadline] = useState('এখন সহজেই প্রফেশনাল নিউজ কার্ড তৈরি করুন মুহূর্তের মধ্যেই।');
  const [category, setCategory] = useState('জাতীয়');
  const [date, setDate] = useState('১৪ মে, ২০২৬');
  const [credit, setCredit] = useState('ছবি: সংগৃহীত');
  
  // --- UI & Style State ---
  const [theme, setTheme] = useState<Theme>('premium_red');
  const [fontSize, setFontSize] = useState(72);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // --- Canvas Image Engine State ---
  const [imgObj, setImgObj] = useState<HTMLImageElement | null>(null);
  const [imgConfig, setImgConfig] = useState({ zoom: 1, x: 0, y: 0, bright: 100 });

  // --- AI Context Generator (Direct Logic) ---
  const fetchAiContext = async () => {
    if (!headline) return;
    setIsAiLoading(true);
    // Simulation for AI News Fetching
    setTimeout(() => {
      setSubHeadline(`${headline} নিয়ে বিস্তারিত সংবাদ সংগ্রহ করা হয়েছে। এটি বর্তমান সময়ের একটি আলোচিত ঘটনা।`);
      setIsAiLoading(false);
    }, 1200);
  };

  // --- Main Draw Logic (Optimized) ---
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Standard High-Res Social Media Size (4:5)
    const W = 1080;
    const H = 1350;
    canvas.width = W;
    canvas.height = H;

    // 1. Theme Background
    ctx.fillStyle = theme === 'dark_minimal' ? '#0a0a0a' : '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // 2. Image Drawing Section
    const imgAreaH = theme === 'dark_minimal' ? 850 : 750;
    const imgStartY = theme === 'dark_minimal' ? 0 : 600;

    if (imgObj) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, imgStartY, W, imgAreaH);
      ctx.clip();

      ctx.filter = `brightness(${imgConfig.bright}%)`;
      const ratio = imgObj.width / imgObj.height;
      let drawW = W * imgConfig.zoom;
      let drawH = (W / ratio) * imgConfig.zoom;
      
      ctx.drawImage(
        imgObj, 
        (W - drawW) / 2 + imgConfig.x, 
        imgStartY + (imgAreaH - drawH) / 2 + imgConfig.y, 
        drawW, 
        drawH
      );
      ctx.restore();
    }

    // 3. UI Overlays (Branding)
    if (theme === 'premium_red') {
      ctx.fillStyle = '#cc0000';
      ctx.fillRect(0, 0, W, 140); // Header Strip
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 45px sans-serif';
      ctx.fillText('টংগেরখবর', 60, 85);
    }

    // 4. Text Rendering Logic
    const margin = 70;
    const textStartY = theme === 'dark_minimal' ? 900 : 180;
    
    // Category Badge
    ctx.fillStyle = '#cc0000';
    ctx.font = 'bold 35px SolaimanLipi, sans-serif';
    ctx.fillText(category.toUpperCase(), margin, textStartY);

    // Date
    ctx.fillStyle = theme === 'dark_minimal' ? '#888' : '#666';
    ctx.font = '30px sans-serif';
    ctx.fillText(date, margin, textStartY + 50);

    // Headline (Auto-Wrap)
    ctx.fillStyle = theme === 'dark_minimal' ? '#fff' : '#1a1a1a';
    ctx.font = `bold ${fontSize}px SolaimanLipi, sans-serif`;
    
    const words = headline.split(' ');
    let line = '';
    let currentY = textStartY + 150;
    const maxW = W - (margin * 2);

    words.forEach(word => {
      let testLine = line + word + ' ';
      if (ctx.measureText(testLine).width > maxW) {
        ctx.fillText(line, margin, currentY);
        line = word + ' ';
        currentY += fontSize * 1.2;
      } else {
        line = testLine;
      }
    });
    ctx.fillText(line, margin, currentY);

    // Subheadline
    ctx.fillStyle = theme === 'dark_minimal' ? '#ccc' : '#444';
    ctx.font = '40px SolaimanLipi, sans-serif';
    const subWords = subtextWrap(ctx, subHeadline, maxW);
    let subY = currentY + 80;
    subWords.forEach(s => {
      ctx.fillText(s, margin, subY);
      subY += 55;
    });

    // 5. Photo Credit
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = 'italic 25px sans-serif';
    ctx.fillText(credit, margin, imgStartY + 50);

  }, [headline, subHeadline, category, date, credit, theme, fontSize, imgObj, imgConfig]);

  // Wrap function for subheadline
  const subtextWrap = (ctx: any, text: string, maxW: number) => {
    let words = text.split(' ');
    let lines = [];
    let currentLine = '';
    words.forEach(w => {
      if (ctx.measureText(currentLine + w).width > maxW) {
        lines.push(currentLine);
        currentLine = w + ' ';
      } else currentLine += w + ' ';
    });
    lines.push(currentLine);
    return lines.slice(0, 3); // Max 3 lines
  };

  useEffect(() => { draw(); }, [draw]);

  // --- Handlers ---
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const img = new Image();
      img.onload = () => setImgObj(img);
      img.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const download = () => {
    const link = document.createElement('a');
    link.download = `news-card-${Date.now()}.png`;
    link.href = canvasRef.current?.toDataURL('image/png', 1.0) || '';
    link.click();
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-zinc-100 font-sans">
      
      {/* --- Left: Configuration Panel --- */}
      <aside className="w-full lg:w-[480px] bg-white shadow-2xl p-6 overflow-y-auto">
        <div className="flex items-center gap-3 mb-8">
          <Newspaper className="text-red-600" size={32} />
          <h1 className="text-2xl font-black italic">TONGER<span className="text-red-600">PRO</span></h1>
        </div>

        <section className="space-y-6">
          {/* Theme Switcher */}
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Design Theme</label>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setTheme('premium_red')} className={`p-3 rounded-lg border text-sm font-bold ${theme === 'premium_red' ? 'bg-red-600 text-white' : 'bg-zinc-50'}`}>Premium Red</button>
              <button onClick={() => setTheme('dark_minimal')} className={`p-3 rounded-lg border text-sm font-bold ${theme === 'dark_minimal' ? 'bg-zinc-900 text-white' : 'bg-zinc-50'}`}>Dark Magazine</button>
            </div>
          </div>

          {/* Content Inputs */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-400 uppercase">Editorial</label>
              <button onClick={fetchAiContext} disabled={isAiLoading} className="text-xs font-bold text-red-600 flex items-center gap-1 hover:underline disabled:opacity-50">
                {isAiLoading ? <RefreshCcw className="animate-spin" size={12}/> : <Sparkles size={12}/>} AI FETCH
              </button>
            </div>
            <input type="text" value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Main Headline" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-600 outline-none text-sm font-bold" />
            <textarea value={subHeadline} onChange={e => setSubHeadline(e.target.value)} placeholder="Summary..." className="w-full p-3 border rounded-xl h-24 text-sm outline-none" />
          </div>

          {/* Controls */}
          <div className="grid grid-cols-2 gap-4">
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="p-3 border rounded-xl text-sm" placeholder="Category" />
            <input type="text" value={date} onChange={e => setDate(e.target.value)} className="p-3 border rounded-xl text-sm" placeholder="Date" />
          </div>

          {/* Image Processor */}
          <div className="bg-zinc-50 p-4 rounded-2xl border border-dashed border-zinc-300">
            <input type="file" ref={fileInput} hidden onChange={onImageChange} />
            <button onClick={() => fileInput.current?.click()} className="w-full py-4 flex flex-col items-center gap-2 text-zinc-500 hover:text-red-600 transition">
              <Camera size={24} />
              <span className="text-xs font-bold uppercase">Replace Image</span>
            </button>
            
            {imgObj && (
              <div className="mt-4 space-y-4 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <ZoomOut size={16}/>
                  <input type="range" min="0.5" max="3" step="0.01" value={imgConfig.zoom} onChange={e => setImgConfig(s => ({...s, zoom: parseFloat(e.target.value)}))} className="flex-1 accent-red-600" />
                  <ZoomIn size={16}/>
                </div>
                <div className="flex items-center gap-3">
                  <Sliders size={16}/>
                  <input type="range" min="50" max="150" value={imgConfig.bright} onChange={e => setImgConfig(s => ({...s, bright: parseInt(e.target.value)}))} className="flex-1 accent-amber-500" />
                </div>
              </div>
            )}
          </div>

          {/* Download Button */}
          <button onClick={download} className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95 shadow-xl">
            <Download size={20} /> DOWNLOAD HD CARD
          </button>
        </section>
      </aside>

      {/* --- Right: Live Preview Area --- */}
      <main className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="relative group">
          {/* Canvas Preview Container */}
          <div className="bg-white p-3 rounded-[1.8rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transition-transform group-hover:scale-[1.01]">
            <canvas 
              ref={canvasRef} 
              style={{ width: '420px', height: 'auto', aspectRatio: '1080/1350' }}
              className="rounded-xl"
            />
          </div>
          
          {/* Float Badge */}
          <div className="absolute -top-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
            Live Preview
          </div>
        </div>
      </main>

    </div>
  );
}
