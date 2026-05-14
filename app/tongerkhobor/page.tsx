"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Download, Camera, Sparkles, RefreshCcw, ZoomIn, ZoomOut, Sliders } from 'lucide-react';

export default function NewsTemplateExact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  // Content State
  const [headline, setHeadline] = useState('টংগেরখবর-এর নতুন এআই ভিত্তিক নিউজ জেনারেটর এখন সবার জন্য উন্মুক্ত');
  const [subHeadline, setSubHeadline] = useState('উন্নত গ্রাফিক্স এবং কাস্টমাইজেশন ফিচারের মাধ্যমে এখন যেকোনো সংবাদ মুহূর্তেই কার্ড আকারে প্রকাশ করা সম্ভব।');
  const [category, setCategory] = useState('আন্তর্জাতিক');
  const [date, setDate] = useState('মে ১৪, ২০২৬');
  const [credit, setCredit] = useState('ছবি: সংগৃহীত/টংগেরখবর');
  
  // Image Config
  const [imgObj, setImgObj] = useState<HTMLImageElement | null>(null);
  const [imgConfig, setImgConfig] = useState({ zoom: 1, x: 0, y: 0, bright: 100 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Standard High-Res Portrait (4:5)
    const W = 1080;
    const H = 1350;
    canvas.width = W;
    canvas.height = H;

    // 1. Bottom Dark Background (Exactly like image_a3d78f.jpg)
    ctx.fillStyle = '#0f172a'; // Deep Navy/Black
    ctx.fillRect(0, 0, W, H);

    // 2. Image Area (Top 60% of the canvas)
    const imgAreaH = 800; 
    if (imgObj) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, W, imgAreaH);
      ctx.clip();

      ctx.filter = `brightness(${imgConfig.bright}%)`;
      const ratio = imgObj.width / imgObj.height;
      let drawW = W * imgConfig.zoom;
      let drawH = (W / ratio) * imgConfig.zoom;
      
      ctx.drawImage(
        imgObj, 
        (W - drawW) / 2 + imgConfig.x, 
        (imgAreaH - drawH) / 2 + imgConfig.y, 
        drawW, 
        drawH
      );
      ctx.restore();

      // 3. Gradient Overlap (Image er niche black shade)
      const grad = ctx.createLinearGradient(0, 500, 0, imgAreaH);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 500, W, 300);
    }

    // 4. Photo Credit (Top Left - Subtle)
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '22px Arial';
    ctx.fillText(credit, 40, 50);

    // 5. Text Content
    const margin = 60;
    let currentY = imgAreaH + 60;

    // Category (Red Text)
    ctx.fillStyle = '#e11d48'; // Rose/Red
    ctx.font = 'bold 38px Arial';
    ctx.fillText(category, margin, currentY);

    // Date (Grey Text)
    currentY += 55;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '30px Arial';
    ctx.fillText(date, margin, currentY);

    // Headline (White Bold Text)
    currentY += 100;
    ctx.fillStyle = '#ffffff';
    const hFontSize = 68;
    ctx.font = `bold ${hFontSize}px Arial`;
    
    const words = headline.split(' ');
    let line = '';
    const maxW = W - (margin * 2);

    words.forEach(word => {
      let testLine = line + word + ' ';
      if (ctx.measureText(testLine).width > maxW) {
        ctx.fillText(line, margin, currentY);
        line = word + ' ';
        currentY += hFontSize * 1.3;
      } else {
        line = testLine;
      }
    });
    ctx.fillText(line, margin, currentY);

    // Subheadline (Light Grey Text)
    currentY += 60;
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '36px Arial';
    
    const subWords = subHeadline.split(' ');
    let sLine = '';
    subWords.forEach(w => {
      if (ctx.measureText(sLine + w).width > maxW) {
        ctx.fillText(sLine, margin, currentY);
        sLine = w + ' ';
        currentY += 55;
      } else sLine += w + ' ';
    });
    ctx.fillText(sLine, margin, currentY);

  }, [headline, subHeadline, category, date, credit, imgObj, imgConfig]);

  useEffect(() => { draw(); }, [draw]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const img = new Image();
      img.onload = () => setImgObj(img);
      img.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-900 text-white">
      {/* Settings Side */}
      <aside className="w-full lg:w-96 bg-slate-800 p-6 space-y-6 border-r border-slate-700">
        <h2 className="text-xl font-bold border-b border-slate-700 pb-4">Editor Control</h2>
        
        <div className="space-y-4">
          <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 bg-slate-700 rounded border border-slate-600 text-sm" placeholder="Category" />
          <textarea value={headline} onChange={e => setHeadline(e.target.value)} className="w-full p-2 bg-slate-700 rounded border border-slate-600 text-sm h-24" placeholder="Headline" />
          <textarea value={subHeadline} onChange={e => setSubHeadline(e.target.value)} className="w-full p-2 bg-slate-700 rounded border border-slate-600 text-sm h-24" placeholder="Sub-headline" />
        </div>

        <div className="pt-4 border-t border-slate-700">
          <button onClick={() => fileInput.current?.click()} className="w-full py-3 bg-rose-600 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-rose-700">
            <Camera size={18}/> Upload Photo
          </button>
          <input type="file" ref={fileInput} hidden onChange={onImageChange} />
        </div>

        {imgObj && (
          <div className="space-y-4 bg-slate-900/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><ZoomIn size={14}/> ZOOM</div>
            <input type="range" min="0.5" max="3" step="0.01" value={imgConfig.zoom} onChange={e => setImgConfig(s => ({...s, zoom: parseFloat(e.target.value)}))} className="w-full accent-rose-600" />
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><Sliders size={14}/> BRIGHTNESS</div>
            <input type="range" min="50" max="150" value={imgConfig.bright} onChange={e => setImgConfig(s => ({...s, bright: parseInt(e.target.value)}))} className="w-full accent-rose-600" />
          </div>
        )}

        <button 
          onClick={() => {
            const link = document.createElement('a');
            link.download = 'tonger-khobor-card.png';
            link.href = canvasRef.current?.toDataURL('image/png') || '';
            link.click();
          }}
          className="w-full py-4 bg-white text-slate-900 rounded-xl font-black shadow-lg hover:bg-slate-100 transition-all"
        >
          DOWNLOAD IMAGE
        </button>
      </aside>

      {/* Preview Side */}
      <main className="flex-1 flex items-center justify-center p-4 bg-black/50">
        <div className="shadow-2xl border-[12px] border-slate-800 rounded-3xl overflow-hidden">
          <canvas ref={canvasRef} style={{ width: '100%', maxWidth: '400px', height: 'auto' }} />
        </div>
      </main>
    </div>
  );
}
