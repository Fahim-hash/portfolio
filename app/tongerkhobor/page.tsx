"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Download, Camera, Sliders, Type, RotateCcw } from 'lucide-react';

export default function TongerKhoborFinal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  // Content
  const [headline, setHeadline] = useState('টংগেরখবর-এর নতুন এআই ভিত্তিক নিউজ জেনারেটর এখন সবার জন্য উন্মুক্ত');
  const [subHeadline, setSubHeadline] = useState('উন্নত গ্রাফিক্স এবং কাস্টমাইজেশন ফিচারের মাধ্যমে এখন যেকোনো সংবাদ মুহূর্তেই কার্ড আকারে প্রকাশ করা সম্ভব।');
  const [category, setCategory] = useState('আন্তর্জাতিক');
  const [date, setDate] = useState('মে ১৪, ২০২৬');
  const [credit, setCredit] = useState('ছবি: সংগৃহীত/টংগেরখবর');
  
  // Image Stats
  const [imgObj, setImgObj] = useState<HTMLImageElement | null>(null);
  const [imgConfig, setImgConfig] = useState({ zoom: 1.1, x: 0, y: 0, bright: 100 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Exact 4:5 Portrait High-Res
    const W = 1080;
    const H = 1350;
    canvas.width = W;
    canvas.height = H;

    // 1. Fill Dark Base (Matching image_a3cf58.png palette)
    ctx.fillStyle = '#0a0f1d'; 
    ctx.fillRect(0, 0, W, H);

    // 2. Main Image Logic (Top Position)
    const imgHeight = 920; 
    if (imgObj) {
      ctx.save();
      ctx.rect(0, 0, W, imgHeight);
      ctx.clip();
      
      ctx.filter = `brightness(${imgConfig.bright}%)`;
      const ratio = imgObj.width / imgObj.height;
      let dW = W * imgConfig.zoom;
      let dH = (W / ratio) * imgConfig.zoom;
      
      ctx.drawImage(imgObj, (W - dW) / 2 + imgConfig.x, (imgHeight - dH) / 2 + imgConfig.y, dW, dH);
      ctx.restore();

      // 3. Dense Smooth Gradient Overlay
      const grad = ctx.createLinearGradient(0, 450, 0, imgHeight);
      grad.addColorStop(0, 'rgba(10, 15, 29, 0)');
      grad.addColorStop(0.6, 'rgba(10, 15, 29, 0.8)');
      grad.addColorStop(1, '#0a0f1d');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 450, W, imgHeight - 450 + 5);
    }

    // 4. Branding & Credits
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '24px Arial';
    ctx.fillText(credit, 50, 60);

    // 5. Typography Layout (Matching the user image exactly)
    const margin = 70;
    let textY = 930;

    // Category
    ctx.fillStyle = '#f43f5e'; // Vibrant Rose
    ctx.font = 'bold 42px Arial';
    ctx.fillText(category, margin, textY);

    // Date
    textY += 60;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '32px Arial';
    ctx.fillText(date, margin, textY);

    // Headline (The Big One)
    textY += 100;
    ctx.fillStyle = '#ffffff';
    const hSize = 72;
    ctx.font = `bold ${hSize}px Arial`;
    
    const wrapText = (text: string, maxWidth: number) => {
      const words = text.split(' ');
      let lines = [];
      let currentLine = words[0];
      for (let i = 1; i < words.length; i++) {
        let testLine = currentLine + " " + words[i];
        if (ctx.measureText(testLine).width < maxWidth) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = words[i];
        }
      }
      lines.push(currentLine);
      return lines;
    };

    const headlineLines = wrapText(headline, W - (margin * 2));
    headlineLines.forEach((line) => {
      ctx.fillText(line, margin, textY);
      textY += hSize * 1.25;
    });

    // Subtext
    textY += 20;
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '38px Arial';
    const subLines = wrapText(subHeadline, W - (margin * 2));
    subLines.forEach((line) => {
      ctx.fillText(line, margin, textY);
      textY += 55;
    });

  }, [headline, subHeadline, category, date, credit, imgObj, imgConfig]);

  useEffect(() => { draw(); }, [draw]);

  return (
    <div className="flex h-screen bg-black overflow-hidden font-sans">
      {/* Control Sidebar */}
      <aside className="w-[450px] bg-zinc-900 border-r border-zinc-800 p-8 flex flex-col gap-8 overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-600 rounded-lg flex items-center justify-center font-black">TK</div>
          <h1 className="text-xl font-bold tracking-tighter text-white">টংগেরখবর <span className="text-rose-500">PRO</span></h1>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-bold text-zinc-500 uppercase">Editorial News Data</label>
          <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-zinc-800 border-zinc-700 p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-rose-600" placeholder="Category" />
          <textarea value={headline} onChange={e => setHeadline(e.target.value)} className="w-full bg-zinc-800 border-zinc-700 p-3 rounded-xl text-white outline-none h-28 text-lg font-bold" placeholder="Headline" />
          <textarea value={subHeadline} onChange={e => setSubHeadline(e.target.value)} className="w-full bg-zinc-800 border-zinc-700 p-3 rounded-xl text-zinc-300 outline-none h-24" placeholder="Sub-headline" />
        </div>

        <div className="space-y-4">
          <label className="text-xs font-bold text-zinc-500 uppercase">Visual Settings</label>
          <button onClick={() => fileInput.current?.click()} className="w-full bg-white text-black py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all">
            <Camera size={20}/> REPLACE MAIN PHOTO
          </button>
          <input type="file" ref={fileInput} hidden onChange={(e) => {
            const file = e.target.files?.[0];
            if(file) {
              const img = new Image();
              img.onload = () => setImgObj(img);
              img.src = URL.createObjectURL(file);
            }
          }} />

          {imgObj && (
            <div className="bg-zinc-800/50 p-5 rounded-2xl border border-zinc-700 space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-zinc-400 font-bold"><span>ZOOM</span><span>{Math.round(imgConfig.zoom * 100)}%</span></div>
                <input type="range" min="0.5" max="3" step="0.01" value={imgConfig.zoom} onChange={e => setImgConfig(s => ({...s, zoom: parseFloat(e.target.value)}))} className="w-full accent-rose-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-zinc-400 font-bold"><span>BRIGHTNESS</span><span>{imgConfig.bright}%</span></div>
                <input type="range" min="50" max="150" value={imgConfig.bright} onChange={e => setImgConfig(s => ({...s, bright: parseInt(e.target.value)}))} className="w-full accent-amber-500" />
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={() => {
            const link = document.createElement('a');
            link.download = `news-card-${Date.now()}.png`;
            link.href = canvasRef.current?.toDataURL('image/png', 1.0) || '';
            link.click();
          }}
          className="mt-auto w-full bg-rose-600 text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-rose-900/20 hover:bg-rose-500 active:scale-95 transition-all"
        >
          <Download className="inline mr-2" size={24}/> EXPORT ULTRA HD
        </button>
      </aside>

      {/* Preview Area */}
      <main className="flex-1 bg-[#050505] flex items-center justify-center p-12">
        <div className="relative group">
          <div className="absolute -inset-4 bg-rose-600/10 rounded-[3rem] blur-3xl group-hover:bg-rose-600/20 transition-all duration-700"></div>
          <div className="relative bg-zinc-900 p-2 rounded-[2rem] shadow-2xl overflow-hidden border border-zinc-800">
            <canvas 
              ref={canvasRef} 
              style={{ width: '450px', height: 'auto', aspectRatio: '1080/1350' }}
              className="rounded-[1.5rem]"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
