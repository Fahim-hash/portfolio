'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { 
  Download, ImageIcon, Newspaper, Move, Type, QrCode, 
  RotateCcw, ZoomIn, ZoomOut, Maximize, Trash2, 
  Settings2, Palette, Layout, Save, Share2, Sun, Contrast, Layers
} from 'lucide-react'

// টেমপ্লেট টাইপস
type TemplateType = 'minimal_top' | 'dark_magazine' | 'branded_premium' | 'editorial_clean'

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
  // কনটেন্ট স্টেট
  const [template, setTemplate] = useState<TemplateType>('branded_premium')
  const [category, setCategory] = useState('আন্তর্জাতিক')
  const [date, setDate] = useState('মে ১৪, ২০২৬')
  const [headline, setHeadline] = useState('টংগেরখবর-এর নতুন এআই ভিত্তিক নিউজ জেনারেটর এখন সবার জন্য উন্মুক্ত')
  const [subtext, setSubtext] = useState('উন্নত গ্রাফিক্স এবং কাস্টমাইজেশন ফিচারের মাধ্যমে এখন যেকোনো সংবাদ মুহূর্তেই কার্ড আকারে প্রকাশ করা সম্ভব।')
  const [photoCredit, setPhotoCredit] = useState('ছবি: সংগৃহীত/টংগেরখবর')
  const [qrText, setQrText] = useState('www.tongerkhobor.com')

  // ক্যানভাস এবং ইমেজ স্টেট
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
  })

  const [headlineSize, setHeadlineSize] = useState(72)
  const [isLoading, setIsLoading] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // লোগো এবং QR ইনিশিয়াল লোড
  useEffect(() => {
    const loadDefaultAssets = async () => {
      const logo = new Image(); logo.src = '/logo-main.png';
      logo.onload = () => setCanvasState(prev => ({ ...prev, logo }))
      const qr = new Image(); qr.src = '/default-qr.png';
      qr.onload = () => setCanvasState(prev => ({ ...prev, qr }))
    }
    loadDefaultAssets()
  }, [])

  // ইমেজ আপলোড হ্যান্ডলার
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsLoading(true)
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          setCanvasState(prev => ({ 
            ...prev, 
            image: img, 
            pos: { x: 0, y: 0 }, 
            zoom: 1 
          }))
          setIsLoading(false)
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  // ফন্ট স্ট্যাক
  const fontMain = '"SolaimanLipi", "Kalpurush", serif'
  const fontEng = '"Inter", sans-serif'

  // ক্যানভাস রেন্ডারিং লজিক (Core Engine)
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = 1080
    const H = 1350
    canvas.width = W
    canvas.height = H

    // রিসেট ক্যানভাস
    ctx.clearRect(0, 0, W, H)

    // ১. ব্যাকগ্রাউন্ড নির্ধারণ
    if (template === 'dark_magazine') {
      ctx.fillStyle = '#0f172a'
    } else {
      ctx.fillStyle = '#ffffff'
    }
    ctx.fillRect(0, 0, W, H)

    // ২. লেআউট ক্যালকুলেশন
    let imageAreaY = 0
    let textAreaY = 0
    const headerHeight = template === 'branded_premium' ? 220 : 0
    
    if (template === 'branded_premium' || template === 'minimal_top') {
      textAreaY = headerHeight
      imageAreaY = 550 // টেক্সট এরিয়া ৫৫০px পর্যন্ত
    } else if (template === 'dark_magazine') {
      imageAreaY = 0
      textAreaY = 800 // ইমেজ আগে, টেক্সট নিচে
    }

    // ৩. ইমেজ রেন্ডারিং (ফিল্টার সহ)
    if (canvasState.image) {
      const { image, pos, zoom, brightness, contrast, saturation, grayscale } = canvasState
      const imgH = template === 'dark_magazine' ? 800 : H - imageAreaY
      
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, imageAreaY, W, imgH)
      ctx.clip()

      // ফিল্টার অ্যাপ্লাই
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) ${grayscale ? 'grayscale(100%)' : ''}`
      
      const imgRatio = image.width / image.height
      let dW = W * zoom
      let dH = (W / imgRatio) * zoom

      if (dH < imgH) {
        dH = imgH * zoom
        dW = (imgH * imgRatio) * zoom
      }

      ctx.drawImage(image, (W - dW) / 2 + pos.x, imageAreaY + (imgH - dH) / 2 + pos.y, dW, dH)
      ctx.restore()
      ctx.filter = 'none'

      // ইমেজের ওপর গ্রেডিয়েন্ট বা ওভারলে
      if (template === 'dark_magazine') {
        const grad = ctx.createLinearGradient(0, 600, 0, 800)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(1, '#0f172a')
        ctx.fillStyle = grad
        ctx.fillRect(0, 600, W, 200)
      }
    }

    // ৪. হেডার (Template: Branded Premium)
    if (template === 'branded_premium') {
      ctx.fillStyle = '#831843' // Deep Crimson
      ctx.fillRect(0, 0, W, 120)
      if (canvasState.logo) {
        const lH = 80; const lW = (canvasState.logo.width / canvasState.logo.height) * lH
        ctx.drawImage(canvasState.logo, 60, 20, lW, lH)
      }
    }

    // ৫. টেক্সট ড্রয়িং (Headline, Date, Category)
    const margin = 60
    ctx.textAlign = 'left'

    // ক্যাটেগরি
    ctx.fillStyle = '#be123c'
    ctx.font = `bold 34px ${fontMain}`
    ctx.fillText(category.toUpperCase(), margin, textAreaY + 60)

    // তারিখ
    ctx.fillStyle = template === 'dark_magazine' ? '#94a3b8' : '#64748b'
    ctx.font = `500 26px ${fontEng}`
    ctx.fillText(date, margin, textAreaY + 105)

    // হেডলাইন (অটো র‍্যাপিং)
    ctx.fillStyle = template === 'dark_magazine' ? '#f8fafc' : '#0f172a'
    ctx.font = `bold ${headlineSize}px ${fontMain}`
    
    const words = headline.split(' ')
    let currentLine = ''
    let lineY = textAreaY + 200
    const maxTextWidth = W - (margin * 2)

    words.forEach(word => {
      const testLine = currentLine + word + ' '
      if (ctx.measureText(testLine).width > maxTextWidth) {
        ctx.fillText(currentLine, margin, lineY)
        currentLine = word + ' '
        lineY += headlineSize * 1.2
      } else {
        currentLine = testLine
      }
    })
    ctx.fillText(currentLine, margin, lineY)

    // সাবটেক্সট
    ctx.fillStyle = template === 'dark_magazine' ? '#cbd5e1' : '#475569'
    ctx.font = `400 32px ${fontMain}`
    const subWords = subtext.split(' ')
    let subLine = ''
    let subY = lineY + 60
    subWords.forEach(w => {
      if (ctx.measureText(subLine + w).width > maxTextWidth) {
        ctx.fillText(subLine, margin, subY)
        subLine = w + ' '
        subY += 45
      } else subLine += w + ' '
    })
    ctx.fillText(subLine, margin, subY)

    // ৬. ফুটার এলিমেন্টস (QR & Credit)
    if (canvasState.qr) {
      const qrSize = 120
      ctx.drawImage(canvasState.qr, W - margin - qrSize, H - margin - qrSize, qrSize, qrSize)
      ctx.fillStyle = '#94a3b8'
      ctx.font = `18px ${fontEng}`
      ctx.textAlign = 'right'
      ctx.fillText(qrText, W - margin, H - margin + 25)
    }

    ctx.textAlign = 'left'
    ctx.fillStyle = 'rgba(255,255,255,0.6)'
    ctx.font = `italic 22px ${fontMain}`
    ctx.fillText(photoCredit, margin, imageAreaY + 40)

  }, [template, category, date, headline, subtext, photoCredit, canvasState, headlineSize, qrText])

  useEffect(() => { drawCanvas() }, [drawCanvas])

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row h-screen overflow-hidden">
        
        {/* বাম পাশের কন্ট্রোল প্যানেল (Scrollable) */}
        <aside className="w-full lg:w-[450px] bg-white border-r border-slate-200 overflow-y-auto p-6 space-y-8 no-scrollbar shadow-2xl z-10">
          <header className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-rose-600 rounded-lg text-white"><Newspaper className="w-5 h-5"/></div>
              <h1 className="text-xl font-black tracking-tight">টংগেরখবর <span className="text-rose-600">PRO</span></h1>
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Settings2 className="w-5 h-5 text-slate-400"/></button>
          </header>

          {/* টেমপ্লেট সিলেকশন */}
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Layout className="w-3 h-3"/> Layout Engine</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'branded_premium', label: 'Premium Red' },
                { id: 'dark_magazine', label: 'Dark Mode' },
                { id: 'minimal_top', label: 'Classic White' },
                { id: 'editorial_clean', label: 'Editorial' }
              ].map((t) => (
                <button 
                  key={t.id}
                  onClick={() => setTemplate(t.id as TemplateType)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${template === t.id ? 'border-rose-600 bg-rose-50 text-rose-700 shadow-sm' : 'border-slate-100 hover:border-slate-300'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* ইমেজ সেটিংস */}
          <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Image Processor</label>
              <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-rose-600 hover:underline">Replace Image</button>
            </div>
            <input ref={fileInputRef} type="file" hidden onChange={handleImageUpload} />
            
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                  <button onClick={() => setCanvasState(s => ({...s, zoom: Math.max(0.5, s.zoom - 0.1)}))} className="p-2 bg-white rounded-lg border shadow-sm"><ZoomOut className="w-4 h-4"/></button>
                  <input type="range" min="0.5" max="3" step="0.01" value={canvasState.zoom} onChange={e => setCanvasState(s => ({...s, zoom: parseFloat(e.target.value)}))} className="flex-1 accent-rose-600" />
                  <button onClick={() => setCanvasState(s => ({...s, zoom: Math.min(3, s.zoom + 0.1)}))} className="p-2 bg-white rounded-lg border shadow-sm"><ZoomIn className="w-4 h-4"/></button>
               </div>
               
               <div className="grid grid-cols-4 gap-1">
                 <button onClick={() => setCanvasState(s => ({...s, pos: { ...s.pos, y: s.pos.y - 20 }}))} className="p-2 bg-white border rounded-lg hover:bg-slate-50 flex justify-center"><Move className="w-4 h-4 rotate-0"/></button>
                 <button onClick={() => setCanvasState(s => ({...s, pos: { ...s.pos, y: s.pos.y + 20 }}))} className="p-2 bg-white border rounded-lg hover:bg-slate-50 flex justify-center"><Move className="w-4 h-4 rotate-180"/></button>
                 <button onClick={() => setCanvasState(s => ({...s, pos: { ...s.pos, x: s.pos.x - 20 }}))} className="p-2 bg-white border rounded-lg hover:bg-slate-50 flex justify-center"><Move className="w-4 h-4 -rotate-90"/></button>
                 <button onClick={() => setCanvasState(s => ({...s, pos: { ...s.pos, x: s.pos.x + 20 }}))} className="p-2 bg-white border rounded-lg hover:bg-slate-50 flex justify-center"><Move className="w-4 h-4 rotate-90"/></button>
               </div>
            </div>

            {/* ফিল্টার স্লাইডার্স */}
            <div className="pt-4 border-t space-y-3">
              <div className="flex items-center gap-3">
                <Sun className="w-4 h-4 text-slate-400" />
                <input type="range" min="50" max="150" value={canvasState.brightness} onChange={e => setCanvasState(s => ({...s, brightness: parseInt(e.target.value)}))} className="flex-1 accent-amber-500 h-1.5" />
              </div>
              <div className="flex items-center gap-3">
                <Contrast className="w-4 h-4 text-slate-400" />
                <input type="range" min="50" max="150" value={canvasState.contrast} onChange={e => setCanvasState(s => ({...s, contrast: parseInt(e.target.value)}))} className="flex-1 accent-indigo-500 h-1.5" />
              </div>
            </div>
          </div>

          {/* টেক্সট এডিটর */}
          <div className="space-y-4">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Type className="w-3 h-3"/> Editorial Content</label>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-rose-500 outline-none" />
                <input type="text" value={date} onChange={e => setDate(e.target.value)} placeholder="Date" className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-rose-500 outline-none" />
              </div>
              <textarea value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Headline..." className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold h-24 focus:ring-2 focus:ring-rose-500 outline-none resize-none" />
              
              <div className="flex items-center gap-3 bg-slate-100 p-2 rounded-xl">
                 <Maximize className="w-4 h-4 text-slate-400" />
                 <input type="range" min="40" max="100" value={headlineSize} onChange={e => setHeadlineSize(parseInt(e.target.value))} className="flex-1 accent-rose-600" />
              </div>

              <textarea value={subtext} onChange={e => setSubtext(e.target.value)} placeholder="Summary/Subtext..." className="w-full p-3 rounded-xl border border-slate-200 text-sm h-20 focus:ring-2 focus:ring-rose-500 outline-none resize-none" />
            </div>
          </div>

          {/* এক্সট্রা ফিগারেশন */}
          <div className="flex gap-2 pb-10">
             <button onClick={() => setCanvasState(s => ({...s, grayscale: !s.grayscale}))} className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${canvasState.grayscale ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'}`}>B&W Mode</button>
             <button onClick={() => { setCanvasState(s => ({...s, brightness: 100, contrast: 100, saturation: 100, zoom: 1, pos: {x:0, y:0}})) }} className="flex-1 py-3 rounded-xl text-xs font-bold border bg-white text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50"><RotateCcw className="w-3 h-3"/> Reset All</button>
          </div>
        </aside>

        {/* মাঝখানের প্রিভিউ এরিয়া */}
        <main className="flex-1 bg-slate-200 overflow-y-auto p-4 lg:p-12 flex flex-col items-center justify-start lg:justify-center">
           <div className="relative group">
              {/* স্টাইলিশ প্রিভিউ ব্যাকড্রপ */}
              <div className="absolute -inset-1 bg-gradient-to-br from-rose-500 to-indigo-600 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              
              <div className="relative bg-white p-3 rounded-[1.5rem] shadow-2xl">
                 <canvas 
                    ref={canvasRef} 
                    className="max-w-full h-auto rounded-lg"
                    style={{ width: '420px', height: 'auto', aspectRatio: '1080/1350' }}
                 />
                 
                 {isLoading && (
                   <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-[1.5rem]">
                      <div className="flex flex-col items-center gap-3">
                         <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
                         <p className="text-xs font-bold text-slate-600 uppercase tracking-tighter">Processing Image...</p>
                      </div>
                   </div>
                 )}
              </div>
           </div>

           {/* অ্যাকশন বাটন */}
           <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.download = `news-pro-${Date.now()}.png`;
                  link.href = canvasRef.current?.toDataURL('image/png', 1.0) || '';
                  link.click();
                }}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl hover:bg-black hover:-translate-y-1 transition-all active:scale-95"
              >
                <Download className="w-5 h-5"/> EXPORT ULTRA HD
              </button>
              
              <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-md hover:bg-slate-50 transition-all border border-slate-200">
                <Share2 className="w-5 h-5 text-rose-600"/> SHARE
              </button>
           </div>
        </main>

        {/* ডান পাশের ইনফো প্যানেল (Optional - for Pro feels) */}
        <aside className="hidden xl:flex w-[80px] bg-white border-l border-slate-100 flex-col items-center py-8 space-y-8">
           <div className="p-3 bg-rose-50 rounded-xl text-rose-600"><Layers className="w-5 h-5"/></div>
           <div className="p-3 hover:bg-slate-50 rounded-xl text-slate-300"><Palette className="w-5 h-5"/></div>
           <div className="p-3 hover:bg-slate-50 rounded-xl text-slate-300"><QrCode className="w-5 h-5"/></div>
           <div className="mt-auto p-3 hover:bg-rose-50 rounded-xl text-slate-300 hover:text-rose-600 cursor-pointer transition-colors"><Trash2 className="w-5 h-5"/></div>
        </aside>

      </div>
    </div>
  )
}
