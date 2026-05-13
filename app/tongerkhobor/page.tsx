'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Upload, Download, RotateCcw, Layout, Image as ImageIcon, Type, Settings2, Sparkles, Newspaper, Move } from 'lucide-react'

type Template = 'minimal' | 'dark_overlay'

export default function PhotocardGenerator() {
  const [template, setTemplate] = useState<Template>('minimal')
  const [category, setCategory] = useState('জাতীয়')
  const [date, setDate] = useState('১৪ মে ২০২৬')
  const [headline, setHeadline] = useState('***টংগেরখবর*** এর নতুন ফটোকার্ড জেনারেটর এখন আরও উন্নত')
  const [subtext, setSubtext] = useState('এখন থেকে খুব সহজেই প্রফেশনাল নিউজ কার্ড তৈরি করা যাবে সরাসরি ব্রাউজার থেকেই।')
  const [photoCredit, setPhotoCredit] = useState('ছবি: সংগৃহীত')
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 })
  const [imageZoom, setImageZoom] = useState(1)
  
  const [headlineSize, setHeadlineSize] = useState(48)
  const [showWatermark, setShowWatermark] = useState(true)
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ')
    let lineIdx = 0
    const lines: { text: string; isBold: boolean }[][] = [[]]
    let testLine = ""

    for (let n = 0; n < words.length; n++) {
      const wordClean = words[n].replace(/\*\*\*/g, '')
      const testLineWithWord = testLine + wordClean + " "
      const metrics = ctx.measureText(testLineWithWord)
      
      if (metrics.width > maxWidth && n > 0) {
        lines.push([])
        lineIdx++
        testLine = wordClean + " "
      } else {
        testLine = testLineWithWord
      }
      
      const isHighlighted = words[n].startsWith('***') || (n > 0 && words[n-1].includes('***') && !words[n-1].endsWith('***'))
      lines[lineIdx].push({ 
        text: words[n].replace(/\*\*\*/g, ''), 
        isBold: words[n].includes('***') || isHighlighted 
      })
    }

    lines.forEach((line, i) => {
      let currentX = x
      line.forEach((word) => {
        ctx.fillStyle = word.isBold ? '#EF4444' : (template === 'minimal' ? '#111827' : '#FFFFFF')
        ctx.font = `bold ${headlineSize}px 'Arial', sans-serif`
        ctx.fillText(word.text + " ", currentX, y + (i * lineHeight))
        currentX += ctx.measureText(word.text + " ").width
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
    canvas.width = W
    canvas.height = H

    // 1. Background
    ctx.fillStyle = template === 'minimal' ? '#FFFFFF' : '#000000'
    ctx.fillRect(0, 0, W, H)

    // 2. Image Drawing
    if (image) {
      const targetH = H * 0.55
      const imgRatio = image.width / image.height
      let drawW = W * imageZoom
      let drawH = (W / imgRatio) * imageZoom

      if (drawH < targetH) {
        drawH = targetH * imageZoom
        drawW = (targetH * imgRatio) * imageZoom
      }

      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, W, targetH)
      ctx.clip()
      
      const x = (W - drawW) / 2 + imagePos.x
      const y = (targetH - drawH) / 2 + imagePos.y
      
      ctx.drawImage(image, x, y, drawW, drawH)
      ctx.restore()

      if (template === 'dark_overlay') {
        const grad = ctx.createLinearGradient(0, targetH - 300, 0, targetH)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(1, 'rgba(0,0,0,0.9)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, targetH)
      }
    }

    // 3. Category & Date
    const contentY = (H * 0.55) + 80
    ctx.fillStyle = '#EF4444'
    ctx.font = 'bold 28px Arial'
    ctx.fillText(category.toUpperCase(), 60, contentY)

    ctx.fillStyle = template === 'minimal' ? '#6B7280' : '#9CA3AF'
    ctx.font = '22px Arial'
    ctx.fillText(date, 60, contentY + 45)

    // 4. Headline
    ctx.textBaseline = 'top'
    const headHeight = wrapText(ctx, headline, 60, contentY + 100, W - 120, headlineSize * 1.3)

    // 5. Subtext
    if (subtext) {
      ctx.fillStyle = template === 'minimal' ? '#4B5563' : '#D1D5DB'
      ctx.font = '32px Arial'
      let words = subtext.split(' '), line = '', subY = contentY + 110 + headHeight
      for(let n=0; n<words.length; n++){
        if(ctx.measureText(line + words[n]).width > W-120){
          ctx.fillText(line, 60, subY); line = words[n] + ' '; subY += 50;
        } else line += words[n] + ' '
      }
      ctx.fillText(line, 60, subY)
    }

    // 6. Watermark / Official Logo (Black/White Logic)
    if (showWatermark && logoImg) {
      ctx.save()
      // যদি হোয়াইট টেমপ্লেট হয়, লোগোকে কালো করার জন্য ইনভার্ট ফিল্টার
      if (template === 'minimal') {
        ctx.filter = 'invert(1) contrast(200%)' 
      }
      
      const logoW = 200
      const logoH = (logoImg.height / logoImg.width) * logoW
      ctx.drawImage(logoImg, W - logoW - 60, H - logoH - 60, logoW, logoH)
      ctx.restore()
    } else if (showWatermark) {
        ctx.fillStyle = template === 'minimal' ? '#000000' : '#EF4444'
        ctx.font = 'black 40px Arial'
        ctx.textAlign = 'right'
        ctx.fillText('টংগেরখবর', W - 60, H - 70)
    }

    // 7. Photo Credit
    ctx.textAlign = 'left'
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 20px Arial'
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 4;
    ctx.fillText(photoCredit, 30, (H * 0.55) - 30)
    ctx.shadowBlur = 0

  }, [template, category, date, headline, subtext, photoCredit, image, imagePos, imageZoom, headlineSize, showWatermark, logoImg])

  useEffect(() => { render() }, [render])

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900">
      <header className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="text-red-600 w-8 h-8" />
            <h1 className="text-2xl font-black tracking-tighter uppercase">টংগের<span className="text-red-600">খবর</span></h1>
          </div>
          <button onClick={() => {
            const link = document.createElement('a')
            link.download = 'tongerkhobor-news.png'
            link.href = canvasRef.current?.toDataURL('image/png', 1.0) || ''
            link.click()
          }} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-200 transition-all active:scale-95">
            <Download className="w-5 h-5" /> ডাউনলোড
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-6 text-red-600">
              <Move className="w-5 h-5" />
              <h2 className="font-bold uppercase text-sm tracking-widest">ফটো অ্যাডজাস্টমেন্ট</h2>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase block mb-3">জুম</label>
                <input type="range" min="1" max="3" step="0.01" value={imageZoom} onChange={e => setImageZoom(parseFloat(e.target.value))} className="w-full accent-red-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-3">X পজিশন</label>
                  <input type="range" min="-600" max="600" value={imagePos.x} onChange={e => setImagePos(prev => ({...prev, x: parseInt(e.target.value)}))} className="w-full accent-slate-600" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-3">Y পজিশন</label>
                  <input type="range" min="-600" max="600" value={imagePos.y} onChange={e => setImagePos(prev => ({...prev, y: parseInt(e.target.value)}))} className="w-full accent-slate-600" />
                </div>
              </div>
              <button onClick={() => {setImagePos({x:0, y:0}); setImageZoom(1)}} className="w-full py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all uppercase tracking-widest">রিসেট করুন</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
            <input ref={fileInputRef} type="file" hidden onChange={handleImageUpload} />
            <button onClick={() => fileInputRef.current?.click()} className="w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-red-50 hover:border-red-200 transition-all group">
              <ImageIcon className="w-8 h-8 text-slate-300 group-hover:text-red-400" />
              <span className="text-sm font-bold text-slate-500">ছবি পরিবর্তন করুন</span>
            </button>

            <div className="grid grid-cols-2 gap-3 pt-2">
               <input type="text" placeholder="বিভাগ" value={category} onChange={e => setCategory(e.target.value)} className="bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 font-bold" />
               <input type="text" placeholder="তারিখ" value={date} onChange={e => setDate(e.target.value)} className="bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500" />
            </div>
            <textarea rows={2} placeholder="শিরোনাম..." value={headline} onChange={e => setHeadline(e.target.value)} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 font-bold" />
            <textarea rows={3} placeholder="উপ-শিরোনাম..." value={subtext} onChange={e => setSubtext(e.target.value)} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 text-sm" />
            <input type="text" placeholder="ছবির ক্রেডিট" value={photoCredit} onChange={e => setPhotoCredit(e.target.value)} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500" />
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex gap-3">
              <button onClick={() => setTemplate('minimal')} className={`flex-1 py-3 rounded-2xl font-bold transition-all ${template === 'minimal' ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>হোয়াইট</button>
              <button onClick={() => setTemplate('dark_overlay')} className={`flex-1 py-3 rounded-2xl font-bold transition-all ${template === 'dark_overlay' ? 'bg-black text-white shadow-lg shadow-slate-300' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>ডার্ক</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="sticky top-24 w-full flex flex-col items-center">
            <div className="w-full flex justify-between items-end mb-4 px-4">
               <div>
                 <h2 className="text-xl font-black flex items-center gap-2 tracking-tighter">লাইভ প্রিভিউ</h2>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">High Definition Output</p>
               </div>
               <div className="flex gap-1.5 bg-white p-2 rounded-full shadow-sm border">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
               </div>
            </div>
            <div className="bg-white p-3 rounded-[3rem] shadow-2xl border border-slate-100">
               <canvas ref={canvasRef} className="w-full h-auto rounded-[2.5rem] shadow-sm" style={{ maxWidth: '480px' }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
