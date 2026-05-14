"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Download, ImageIcon, Newspaper, Move, Type, QrCode, 
  RotateCcw, ZoomIn, ZoomOut, Maximize, Trash2, 
  Settings2, Palette, Layout, Share2, Sun, Contrast, Sparkles, Loader2
} from 'lucide-react';

type TemplateType = 'minimal_top' | 'dark_magazine' | 'branded_premium' | 'editorial_clean';

interface CanvasState {
  image: HTMLImageElement | null;
  logo: HTMLImageElement | null;
  qr: HTMLImageElement | null;
  zoom: number;
  pos: { x: number; y: number };
  brightness: number;
  contrast: number;
  saturation: number;
  grayscale: boolean;
}

export default function UltimateNewsCardPro() {
  // --- Content State ---
  const [template, setTemplate] = useState<TemplateType>('branded_premium');
  const [category, setCategory] = useState('আন্তর্জাতিক');
  const [date, setDate] = useState('মে ১৪, ২০২৬');
  const [headline, setHeadline] = useState('টংগেরখবর-এর নতুন এআই ভিত্তিক নিউজ জেনারেটর এখন সবার জন্য উন্মুক্ত');
  const [subtext, setSubtext] = useState('উন্নত গ্রাফিক্স এবং কাস্টমাইজেশন ফিচারের মাধ্যমে এখন যেকোনো সংবাদ মুহূর্তেই কার্ড আকারে প্রকাশ করা সম্ভব।');
  const [photoCredit, setPhotoCredit] = useState('ছবি: সংগৃহীত/টংগেরখবর');
  const [qrText, setQrText] = useState('www.tongerkhobor.com');
  const [headlineSize, setHeadlineSize] = useState(70);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  // --- Canvas State ---
  const [canvasState, setCanvasState] = useState<CanvasState>({
    image: null,
    logo: null,
    qr: null,
    zoom: 1,
    pos: { x: 0, y: 0 },
    brightness: 100,
    contrast: 100,
    saturation: 100,
    grayscale: false
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fontMain = '"SolaimanLipi", "Inter", sans-serif';

  // --- Initial Assets Load ---
  useEffect(() => {
    const loadAssets = () => {
      const logo = new Image();
      logo.src = '/logo.png'; // Path updated to /logo.png as requested
      logo.crossOrigin = "anonymous";
      logo.onload = () => setCanvasState(prev => ({ ...prev, logo }));

      const qr = new Image();
      qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrText)}`;
      qr.crossOrigin = "anonymous";
      qr.onload = () => setCanvasState(prev => ({ ...prev, qr }));
    };
    loadAssets();
  }, [qrText]);

  // --- Image Upload ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setCanvasState(prev => ({ ...prev, image: img, pos: { x: 0, y: 0 }, zoom: 1 }));
          setIsLoading(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // --- AI Logic (Simulation with dynamic context) ---
  const handleAiMagic = async () => {
    if (!headline) return;
    setIsAiProcessing(true);
    // Real API call ekhane hobe (e.g. Gemini/OpenAI)
    setTimeout(() => {
      setSubtext(`AI Analysis: ${headline}। এই বিষয়টি বর্তমানে ইন্টারনেটে বেশ ট্রেন্ডিং এবং গুরুত্বপূর্ণ। টংগেরখবর-এর পক্ষ থেকে বিস্তারিত আপডেট আসছে শীঘ্রই।`);
      setIsAiProcessing(false);
    }, 1500);
  };

  // --- Core Canvas Drawing Engine ---
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1080;
    const H = 1350;
    canvas.width = W;
    canvas.height = H;

    // 1. Background
    ctx.fillStyle = template === 'dark_magazine' ? '#0f172a' : '#ffffff';
    ctx.fillRect(0, 0, W, H);

    let imageAreaY = 0;
    let textAreaY = 0;
    const headerHeight = template === 'branded_premium' ? 220 : 0;

    if (template === 'branded_premium' || template === 'minimal_top') {
      textAreaY = headerHeight;
      imageAreaY = 550;
    } else if (template === 'dark_magazine') {
      imageAreaY = 0;
      textAreaY = 820;
    }

    // 2. Image Rendering
    if (canvasState.image) {
      const { image, pos, zoom, brightness, contrast, saturation, grayscale } = canvasState;
      const imgH = template === 'dark_magazine' ? 820 : H - imageAreaY;

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, imageAreaY, W, imgH);
      ctx.clip();

      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) ${grayscale ? 'grayscale(100%)' : ''}`;
      
      const imgRatio = image.width / image.height;
      let dW = W * zoom;
      let dH = (W / imgRatio) * zoom;
      if (dH < imgH) { dH = imgH * zoom; dW = (imgH * imgRatio) * zoom; }

      ctx.drawImage(image, (W - dW) / 2 + pos.x, imageAreaY + (imgH - dH) / 2 + pos.y, dW, dH);
      ctx.restore();
      ctx.filter = 'none';

      // Gradient for Dark Mode
      if (template === 'dark_magazine') {
        const grad = ctx.createLinearGradient(0, 600, 0, 820);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, '#0f172a');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 600, W, 220);
      }
    }

    // 3. Header (Premium Style)
    if (template === 'branded_premium') {
      ctx.fillStyle = '#831843'; // Deep Crimson
      ctx.fillRect(0, 0, W, 120);
      if (canvasState.logo) {
        const lH = 70; const lW = (canvasState.logo.width / canvasState.logo.height) * lH;
        ctx.drawImage(canvasState.logo, 60, 25, lW, lH);
      }
    }

    // 4. Text Content
    const margin = 70;
    ctx.textAlign = 'left';

    // Category
    ctx.fillStyle = template === 'dark_magazine' ? '#fbbf24' : '#be123c';
    ctx.font = `bold 32px ${fontMain}`;
    ctx.fillText(category.toUpperCase(), margin, textAreaY + 80);

    // Date
    ctx.fillStyle = template === 'dark_magazine' ? '#94a3b8' : '#64748b';
    ctx.font = `500 24px ${fontMain}`;
    ctx.fillText(date, margin, textAreaY + 120);

    // Headline with Wrapping
    ctx.fillStyle = template === 'dark_magazine' ? '#f8fafc' : '#0f172a';
    ctx.font = `bold ${headlineSize}px ${fontMain}`;
    const words = headline.split(' ');
    let line = '';
    let lineY = textAreaY + 220;
    const maxWidth = W - (margin * 2);

    words.forEach(word => {
      const testLine = line + word + ' ';
      if (ctx.measureText(testLine).width > maxWidth) {
        ctx.fillText(line, margin, lineY);
        line = word + ' ';
        lineY += headlineSize * 1.2;
      } else { line = testLine; }
    });
    ctx.fillText(line, margin, lineY);

    // Subtext
    ctx.fillStyle = template === 'dark_magazine' ? '#cbd5e1' : '#475569';
    ctx.font = `400 34px ${fontMain}`;
    const subWords = subtext.split(' ');
    let sLine = '';
    let sY = lineY + 70;
    subWords.forEach(w => {
      if (ctx.measureText(sLine + w).width > maxWidth) {
        ctx.fillText(sLine, margin, sY);
        sLine = w + ' ';
        sY += 50;
      } else sLine += w + ' ';
    });
    ctx.fillText(sLine, margin, sY);

    // 5. Footer (QR & Branding)
    if (canvasState.qr) {
      const qrSize = 130;
      ctx.drawImage(canvasState.qr, W - margin - qrSize, H - margin - qrSize, qrSize, qrSize);
      ctx.fillStyle = '#94a3b8';
      ctx.font = `18px sans-serif`;
      ctx.textAlign = 'right';
      ctx.fillText(qrText, W - margin, H - margin + 25);
    }

    // Photo Credit
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = `italic 22px ${fontMain}`;
    ctx.fillText(photoCredit, margin, imageAreaY + 45);

  }, [template, category, date, headline, subtext, photoCredit, canvasState, headlineSize, qrText]);

  useEffect(() => { drawCanvas(); }, [drawCanvas]);

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 font-sans flex flex-col lg:flex-row h-screen overflow-hidden">
      
      {/* Sidebar: Controls */}
      <aside className="w-full lg:w-[450px] bg-white border-r border-slate-200 overflow-y-auto p-6 space-y-6 no-scrollbar shadow-xl z-20">
        <header className="flex items-center gap-3 border-b pb-4">
          <div className="p-2 bg-rose-600 rounded-lg text-white"><Newspaper size={20}/></div>
          <h1 className="text-xl font-black">টংগেরখবর <span className="text-rose-600">EDITOR</span></h1>
        </header>

        {/* Templates */}
        <div className="space-y-3">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Layout size={14}/> Template Selection</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'branded_premium', label: 'Premium Red' },
              { id: 'dark_magazine', label: 'Magazine Dark' },
              { id: 'minimal_top', label: 'Clean White' },
              { id: 'editorial_clean', label: 'Editorial' }
            ].map(t => (
              <button 
                key={t.id} 
                onClick={() => setTemplate(t.id as TemplateType)}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${template === t.id ? 'border-rose-600 bg-rose-50 text-rose-700 shadow-sm' : 'border-slate-100'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Image Processor */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Image Processor</label>
            <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-rose-600">Change Photo</button>
          </div>
          <input ref={fileInputRef} type="file" hidden onChange={handleImageUpload} />
          <div className="flex items-center gap-4">
            <button onClick={() => setCanvasState(s => ({...s, zoom: Math.max(0.5, s.zoom-0.1)}))} className="p-2 bg-white rounded-lg border shadow-sm"><ZoomOut size={16}/></button>
            <input type="range" min="0.5" max="3" step="0.01" value={canvasState.zoom} onChange={e => setCanvasState(s => ({...s, zoom: parseFloat(e.target.value)}))} className="flex-1 accent-rose-600 h-1.5" />
            <button onClick={() => setCanvasState(s => ({...s, zoom: Math.min(3, s.zoom+0.1)}))} className="p-2 bg-white rounded-lg border shadow-sm"><ZoomIn size={16}/></button>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2"><Sun size={14} className="text-slate-400"/><input type="range" min="50" max="150" value={canvasState.brightness} onChange={e => setCanvasState(s => ({...s, brightness: parseInt(e.target.value)}))} className="flex-1 h-1 accent-amber-500" /></div>
            <div className="flex items-center gap-2"><Contrast size={14} className="text-slate-400"/><input type="range" min="50" max="150" value={canvasState.contrast} onChange={e => setCanvasState(s => ({...s, contrast: parseInt(e.target.value)}))} className="flex-1 h-1 accent-indigo-500" /></div>
          </div>
        </div>

        {/* Editorial Content */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Editorial Content</label>
            <button 
              onClick={handleAiMagic} 
              disabled={isAiProcessing}
              className="text-[10px] bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-rose-600 transition-colors"
            >
              {isAiProcessing ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12}/>} AI FETCH
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-rose-500 outline-none" />
            <input type="text" value={date} onChange={e => setDate(e.target.value)} placeholder="Date" className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-rose-500 outline-none" />
          </div>
          <textarea value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Headline..." className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold h-20 focus:ring-2 focus:ring-rose-500 outline-none resize-none" />
          <div className="flex items-center gap-3 bg-white p-2 border rounded-xl">
             <Maximize size={16} className="text-slate-400" />
             <input type="range" min="40" max="100" value={headlineSize} onChange={e => setHeadlineSize(parseInt(e.target.value))} className="flex-1 accent-rose-600" />
          </div>
          <textarea value={subtext} onChange={e => setSubtext(e.target.value)} placeholder="Summary/Subtext..." className="w-full p-3 rounded-xl border border-slate-200 text-sm h-24 focus:ring-2 focus:ring-rose-500 outline-none resize-none" />
          <input type="text" value={photoCredit} onChange={e => setPhotoCredit(e.target.value)} placeholder="Photo Credit" className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-rose-500" />
        </div>

        {/* Global Reset */}
        <div className="flex gap-2 pb-6">
          <button onClick={() => setCanvasState(s => ({...s, grayscale: !s.grayscale}))} className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${canvasState.grayscale ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'}`}>B&W Mode</button>
          <button onClick={() => { setCanvasState(s => ({...s, brightness: 100, contrast: 100, saturation: 100, zoom: 1, pos: {x:0, y:0}})) }} className="flex-1 py-3 rounded-xl text-xs font-bold border bg-white text-slate-600 flex items-center justify-center gap-2"><RotateCcw size={12}/> Reset</button>
        </div>
      </aside>

      {/* Main Preview */}
      <main className="flex-1 bg-slate-200 p-4 lg:p-10 flex flex-col items-center justify-center overflow-y-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-rose-500 to-indigo-600 rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative bg-white p-3 rounded-[1.5rem] shadow-2xl">
            <canvas 
              ref={canvasRef} 
              style={{ width: '400px', height: 'auto', aspectRatio: '1080/1350' }} 
              className="rounded-lg max-w-full h-auto"
            />
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-[1.5rem]">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="animate-spin text-rose-600" size={32} />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Processing...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button 
            onClick={() => {
              const link = document.createElement('a');
              link.download = `news-card-${Date.now()}.png`;
              link.href = canvasRef.current?.toDataURL('image/png', 1.0) || '';
              link.click();
            }}
            className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl hover:bg-black transition-all active:scale-95"
          >
            <Download size={20}/> EXPORT ULTRA HD
          </button>
          <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-md border border-slate-200 hover:bg-slate-50 transition-all">
            <Share2 size={20} className="text-rose-600"/> SHARE
          </button>
        </div>
      </main>
    </div>
  );
}
