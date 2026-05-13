'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Download, ImageIcon, Newspaper, Move, RotateCcw, Type, Sun, Contrast, Layout } from 'lucide-react'

type Template = 'minimal' | 'dark_overlay'

export default function ProPhotocardGenerator() {
  const [template, setTemplate] = useState<Template>('dark_overlay')
  const [category, setCategory] = useState('জাতীয়')
  const [date, setDate] = useState('১৪ মে ২০২৬')
  const [headline, setHeadline] = useState('***টংগেরখবর*** এর নতুন ফটোকার্ড জেনারেটর এখন আরও উন্নত')
  const [subtext, setSubtext] = useState('এখন থেকে খুব সহজেই প্রফেশনাল নিউজ কার্ড তৈরি করা যাবে সরাসরি ব্রাউজার থেকেই।')
  const [photoCredit, setPhotoCredit] = useState('ছবি: সংগৃহীত')
  
  // ইমেজ সেটিংস
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 })
  const [imageZoom, setImageZoom] = useState(1)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  
  // ফন্ট এবং লোগো সেটিংস
  const [headlineSize, setHeadlineSize] = useState(54)
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ফন্ট স্ট্যাক: বাংলা এবং ইংরেজির জন্য প্রফেশনাল ফন্ট
  const fontStack = '"SolaimanLipi", "Kalpurush", "Arial", sans-serif'

  useEffect(() => {
    const img = new Image()
    img.src = '/logo.png' 
    img.onload = () => setLogoImg(img)
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          setImage(img)
          setImagePos({ x: 0, y: 0 })
          setImageZoom(1)
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const drawHeadline = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, fontSize: number) => {
    const words = text.split(' ')
    let lines: { text: string; isBold: boolean }[][] = [[]]
    let currentLineWidth = 0
    let lineIdx = 0
    const lineHeight = fontSize * 1.35

    ctx.font = `bold ${fontSize}px ${fontStack}`

    words.forEach((word) => {
      const isBold = word.includes('***')
      const cleanWord = word.replace(/\*\*\*/g, '')
      const wordWidth = ctx.measureText(cleanWord + ' ').width

      if (currentLineWidth + wordWidth > maxWidth) {
        lineIdx++
        lines[lineIdx] = []
        currentLineWidth = 0
      }

      lines[lineIdx].push({ text: cleanWord, isBold })
      currentLineWidth += wordWidth
    })

    lines.forEach((line, i) => {
      let startX = x
      line.forEach((word) => {
        ctx.fillStyle = word.isBold ? '#EF4444' : (template === 'minimal' ? '#111827' : '#FFFFFF')
        ctx.font = `bold ${fontSize}px ${fontStack}`
        ctx.fillText(word.text + ' ', startX, y + (i * lineHeight))
        startX += ctx.measureText(word.text + ' ').width
      })
    })

    return lines.length * lineHeight
  }

  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = 1080
    const H = 1350
    const imgH = H * 0.55 
    canvas.width = W
    canvas.height = H

    // ব্যাকগ্রাউন্ড
    ctx.fillStyle = template === 'minimal' ? '#FFFFFF' : '#000000'
    ctx.fillRect(0, 0, W, H)

    // ইমেজ রেন্ডারিং
    if (image) {
      const imgRatio = image.width / image.height
      let drawW = W * imageZoom
      let drawH = (W / imgRatio) * imageZoom

      if (drawH < imgH) {
        drawH = imgH * imageZoom
        drawW = (imgH * imgRatio) * imageZoom
      }

      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, W, imgH)
      ctx.clip()
      
      // ফিল্টার অ্যাপ্লাই
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`
      
      const posX = (W - drawW) / 2 + imagePos.x
      const posY = (imgH - drawH) / 2 + imagePos.y
      ctx.drawImage(image, posX, posY, drawW, drawH)
      
      // ডার্ক ওভারলে গ্রেডিয়েন্ট
      const grad = ctx.createLinearGradient(0, imgH - 250, 0, imgH)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(1, 'rgba(0,0,0,0.8)')
      ctx.fillStyle = grad
      ctx.filter = 'none'
      ctx.fillRect(0, imgH - 250, W, 250)
      ctx.restore()
    }

    // লোগো (নিচে বাম পাশে - ইমেজের ওপর)
    if (logoImg) {
      ctx.save()
      const lW = 210
      const lH = (logoImg.height / logoImg.width) * lW
      ctx.drawImage(logoImg, 60, imgH - lH - 40, lW, lH)
      ctx.restore()
    }

    // ফটো ক্রেডিট
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    ctx.font = `600 22px ${fontStack}`
    ctx.textAlign = 'right'
    ctx.fillText(photoCredit, W - 60, imgH - 45)
    ctx.textAlign = 'left'

    // টেক্সট এরিয়া
    const contentY = imgH + 80
    
    // ক্যাটেগরি
    ctx.fillStyle = '#EF4444'
    ctx.font = `bold 36px ${fontStack}`
    ctx.fillText(category.toUpperCase(), 60, contentY)

    // তারিখ
    ctx.fillStyle = template === 'minimal' ? '#64748b' : '#94a3b8'
    ctx.font = `26px ${fontStack}`
    ctx.fillText(date, 60, contentY + 50)

    // হেডলাইন
    const headHeight = drawHeadline(ctx, headline, 60, contentY + 120, W - 120, headlineSize)

    // সাবটেক্সট
    if (subtext) {
      ctx.fillStyle = template === 'minimal' ? '#334155' : '#cbd5e1'
      ctx.font = `400 34px ${fontStack}`
      const words = subtext.split(' ')
      let line = ''
      let subY = contentY + 120 + headHeight + 30
      words.forEach(w => {
        if (ctx.measureText(line + w).width > W - 120) {
          ctx.fillText(line, 60, subY)
          line = w + ' '
          subY += 50
        } else line += w + ' '
      })
      ctx.fillText(line, 60, subY)
    }
  }, [template, category, date, headline, subtext, photoCredit, image, imagePos, imageZoom, headlineSize, logoImg, brightness, contrast])

  useEffect(() => { render() }, [render])

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col lg:flex-row">
      {/* বাম পাশের কন্ট্রোল প্যানেল */}
      <aside className="w-full lg:w-[450px] bg-white border-r h-screen overflow-y-auto p-6 space-y-8 scrollbar-hide">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="bg-red-600 p-2 rounded-xl"><Newspaper className="text-white w-6 h-6" /></div>
          <h1 className="text-xl font-black">টংগের<span className="text-red-600">খবর</span> প্রো</h1>
        </div>

        {/* ইমেজ কন্ট্রোল */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold flex items-center gap-2 text-slate-500 uppercase"><Move className="w-4 h-4"/> ইমেজ অ্যাডজাস্টমেন্ট</h3>
          <div className="bg-slate-50 p-4 rounded-2xl space-y-5">
            <button onClick={() => fileInputRef.current?.click()} className="w-full py-4 bg-white border-2 border-dashed rounded-xl text-slate-400 font-bold hover:bg-red-50 hover:border-red-200 transition-all">
              <ImageIcon className="inline mr-2 w-5 h-5"/> ছবি পরিবর্তন
            </button>
            <input ref={fileInputRef} type="file" hidden onChange={handleImageUpload} />
            
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-600 flex justify-between">জুম <span>{imageZoom.toFixed(1)}x</span></label>
              <input type="range" min="1" max="5" step="0.1" value={imageZoom} onChange={e => setImageZoom(parseFloat(e.target.value))} className="w-full accent-red-600" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button onMouseDown={() => setImagePos(p => ({...p, x: p.x - 20}))} className="bg-white p-2 rounded-lg border text-xs font-bold">বামে</button>
              <button onMouseDown={() => setImagePos(p => ({...p, x: p.x + 20}))} className="bg-white p-2 rounded-lg border text-xs font-bold">ডানে</button>
              <button onMouseDown={() => setImagePos(p => ({...p, y: p.y - 20}))} className="bg-white p-2 rounded-lg border text-xs font-bold">উপরে</button>
              <button onMouseDown={() => setImagePos(p => ({...p, y: p.y + 20}))} className="bg-white p-2 rounded-lg border text-xs font-bold">নিচে</button>
            </div>
          </div>
        </section>

        {/* ফিল্টার কন্ট্রোল */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold flex items-center gap-2 text-slate-500 uppercase"><Sun className="w-4 h-4"/> ফিল্টার</h3>
          <div className="bg-slate-50 p-4 rounded-2xl space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold flex justify-between"><Sun className="w-3 h-3"/> ব্রাইটনেস</label>
              <input type="range" min="50" max="150" value={brightness} onChange={e => setBrightness(parseInt(e.target.value))} className="w-full accent-slate-800" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold flex justify-between"><Contrast className="w-3 h-3"/> কন্ট্রাস্ট</label>
              <input type="range" min="50" max="150" value={contrast} onChange={e => setContrast(parseInt(e.target.value))} className="w-full accent-slate-800" />
            </div>
          </div>
        </section>

        {/* টেক্সট সেটিংস */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold flex items-center gap-2 text-slate-500 uppercase"><Type className="w-4 h-4"/> টেক্সট সেটিংস</h3>
          <div className="space-y-3">
             <div className="grid grid-cols-2 gap-2">
               <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 bg-white border rounded-xl text-sm" placeholder="বিভাগ" />
               <input type="text" value={date} onChange={e => setDate(e.target.value)} className="w-full p-3 bg-white border rounded-xl text-sm" placeholder="তারিখ" />
             </div>
             <textarea value={headline} onChange={e => setHeadline(e.target.value)} className="w-full p-3 bg-white border rounded-xl text-sm font-bold" rows={3} placeholder="শিরোনাম" />
             <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl">
                <Type className="w-4 h-4 text-slate-400" />
                <input type="range" min="30" max="80" value={headlineSize} onChange={e => setHeadlineSize(parseInt(e.target.value))} className="flex-1 accent-red-600" />
             </div>
             <textarea value={subtext} onChange={e => setSubtext(e.target.value)} className="w-full p-3 bg-white border rounded-xl text-sm" rows={2} placeholder="উপ-শিরোনাম" />
             <input type="text" value={photoCredit} onChange={e => setPhotoCredit(e.target.value)} className="w-full p-3 bg-white border rounded-xl text-sm" placeholder="ফটো ক্রেডিট" />
          </div>
        </section>

        <section className="flex gap-2">
           <button onClick={() => setTemplate('minimal')} className={`flex-1 py-3 rounded-xl font-bold text-xs ${template === 'minimal' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}>WHITE</button>
           <button onClick={() => setTemplate('dark_overlay')} className={`flex-1 py-3 rounded-xl font-bold text-xs ${template === 'dark_overlay' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-400'}`}>DARK</button>
        </section>
      </aside>

      {/* প্রিভিউ প্যানেল */}
      <main className="flex-1 flex flex-col items-center justify-center p-10 bg-slate-100 overflow-y-auto">
        <div className="relative group scale-90 lg:scale-100 transition-transform">
           <div className="absolute -inset-4 bg-gradient-to-tr from-red-500/20 to-blue-500/20 rounded-[4rem] blur-2xl"></div>
           <div className="relative bg-white p-4 rounded-[3.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] border-8 border-white">
              <canvas ref={canvasRef} className="w-full h-auto rounded-[2.8rem] bg-black" style={{ width: '450px' }} />
           </div>
        </div>
        
        <button onClick={() => {
          const link = document.createElement('a');
          link.download = `news_card_${Date.now()}.png`;
          link.href = canvasRef.current?.toDataURL('image/png', 1.0) || '';
          link.click();
        }} className="mt-10 px-12 py-5 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-lg shadow-2xl transition-all active:scale-95 flex items-center gap-3">
          <Download className="w-6 h-6" /> এক্সপোর্ট নিউজ কার্ড
        </button>
      </main>
    </div>
  )
}
