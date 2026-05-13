'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Download, Image as ImageIcon, Sparkles, Newspaper, Move } from 'lucide-react'

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
  
  const [headlineSize, setHeadlineSize] = useState(54) // একটু বড় ফন্ট সাইজ
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

  // ফিক্সড র‍্যাপ টেক্সট ফাংশন
  const drawHeadline = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ')
    let lines: { text: string; isBold: boolean }[][] = [[]]
    let currentLineWidth = 0
    let lineIdx = 0

    ctx.font = `bold ${headlineSize}px 'Arial', sans-serif`

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
    ctx.textBaseline = 'top'
    ctx.textAlign = 'left'
    
    ctx.fillStyle = '#EF4444'
    ctx.font = 'bold 30px Arial'
    ctx.fillText(category.toUpperCase(), 60, contentY)

    ctx.fillStyle = template === 'minimal' ? '#6B7280' : '#9CA3AF'
    ctx.font = '24px Arial'
    ctx.fillText(date, 60, contentY + 45)

    // 4. Headline (Fixed)
    const headY = contentY + 110
    const headHeight = drawHeadline(ctx, headline, 60, headY, W - 120, headlineSize * 1.3)

    // 5. Subtext
    if (subtext) {
      ctx.fillStyle = template === 'minimal' ? '#4B5563' : '#D1D5DB'
      ctx.font = '34px Arial'
      const words = subtext.split(' ')
      let line = ''
      let subTextY = headY + headHeight + 20
      
      words.forEach(word => {
        const testLine = line + word + ' '
        if (ctx.measureText(testLine).width > W - 120) {
          ctx.fillText(line, 60, subTextY)
          line = word + ' '
          subTextY += 50
        } else {
          line = testLine
        }
      })
      ctx.fillText(line, 60, subTextY)
    }

    // 6. Watermark / Logo
    if (showWatermark && logoImg) {
      ctx.save()
      if (template === 'minimal') ctx.filter = 'invert(1) contrast(200%)'
      const logoW = 200
      const logoH = (logoImg.height / logoImg.width) * logoW
      ctx.drawImage(logoImg, W - logoW - 60, H - logoH - 60, logoW, logoH)
      ctx.restore()
    }

    // 7. Photo Credit
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 22px Arial'
    ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 6;
    ctx.fillText(photoCredit, 40, (H * 0.55) - 45)
    ctx.shadowBlur = 0

  }, [template, category, date, headline, subtext, photoCredit, image, imagePos, imageZoom, headlineSize, showWatermark, logoImg])

  useEffect(() => { render() }, [render])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <header className="bg-white border-b sticky top-0 z-20 px-6 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Newspaper className="text-red-600 w-7 h-7" />
          <h1 className="text-xl font-black">টংগের<span className="text-red-600">খবর</span></h1>
        </div>
        <button onClick={() => {
          const link = document.createElement('a')
          link.download = 'news-card.png'
          link.href = canvasRef.current?.toDataURL('image/png', 1.0) || ''
          link.click()
        }} className="bg-red-600 text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 text-sm">
          <Download className="w-4 h-4" /> ডাউনলোড
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-red-600 border-b pb-3">
              <Move className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">কন্ট্রোল প্যানেল</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">ফটো জুম</label>
                <input type="range" min="1" max="3" step="0.01" value={imageZoom} onChange={e => setImageZoom(parseFloat(e.target.value))} className="w-full accent-red-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setImagePos(p => ({...p, x: p.x - 20}))} className="bg-slate-100 p-2 rounded-lg text-xs font-bold">Left</button>
                <button onClick={() => setImagePos(p => ({...p, x: p.x + 20}))} className="bg-slate-100 p-2 rounded-lg text-xs font-bold">Right</button>
              </div>
            </div>

            <input ref={fileInputRef} type="file" hidden onChange={handleImageUpload} />
            <button onClick={() => fileInputRef.current?.click()} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-sm hover:bg-slate-50 transition-all">
              + ছবি আপলোড করুন
            </button>

            <div className="grid grid-cols-2 gap-3">
               <input type="text" placeholder="বিভাগ" value={category} onChange={e => setCategory(e.target.value)} className="bg-slate-50 p-3 rounded-xl text-sm border-none ring-1 ring-slate-200 focus:ring-red-500" />
               <input type="text" placeholder="তারিখ" value={date} onChange={e => setDate(e.target.value)} className="bg-slate-50 p-3 rounded-xl text-sm border-none ring-1 ring-slate-200 focus:ring-red-500" />
            </div>
            <textarea rows={2} placeholder="শিরোনাম (বোল্ড করতে ***ব্যবহার করুন***)" value={headline} onChange={e => setHeadline(e.target.value)} className="w-full bg-slate-50 p-3 rounded-xl text-sm border-none ring-1 ring-slate-200 focus:ring-red-500 font-bold" />
            <textarea rows={2} placeholder="উপ-শিরোনাম" value={subtext} onChange={e => setSubtext(e.target.value)} className="w-full bg-slate-50 p-3 rounded-xl text-sm border-none ring-1 ring-slate-200 focus:ring-red-500" />
            <input type="text" placeholder="ছবি ক্রেডিট" value={photoCredit} onChange={e => setPhotoCredit(e.target.value)} className="w-full bg-slate-50 p-3 rounded-xl text-sm border-none ring-1 ring-slate-200 focus:ring-red-500" />
          </div>

          <div className="flex gap-3">
             <button onClick={() => setTemplate('minimal')} className={`flex-1 py-3 rounded-2xl font-bold text-sm border-2 ${template === 'minimal' ? 'border-red-600 bg-red-50 text-red-600' : 'border-transparent bg-white shadow-sm'}`}>হোয়াইট মোড</button>
             <button onClick={() => setTemplate('dark_overlay')} className={`flex-1 py-3 rounded-2xl font-bold text-sm border-2 ${template === 'dark_overlay' ? 'border-red-600 bg-red-50 text-red-600' : 'border-transparent bg-white shadow-sm'}`}>ডার্ক মোড</button>
          </div>
        </div>

        <div className="lg:col-span-7 flex justify-center">
          <div className="sticky top-24 w-fit">
            <div className="mb-4 flex items-center justify-between px-2">
              <h2 className="text-sm font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-yellow-500"/> প্রিভিউ</h2>
              <span className="text-[10px] text-slate-400 font-bold">1080 x 1350</span>
            </div>
            <div className="bg-white p-3 rounded-[2.5rem] shadow-2xl shadow-slate-200 border">
              <canvas ref={canvasRef} className="w-full h-auto rounded-[2rem]" style={{ maxWidth: '420px' }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
