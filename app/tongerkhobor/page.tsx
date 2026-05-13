'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Upload, Download, RotateCcw, Layout, Image as ImageIcon, Type, Settings2, Sparkles,Newspaper } from 'lucide-react'

type Template = 'minimal' | 'dark_overlay' | 'classic'

export default function PhotocardGenerator() {
  const [template, setTemplate] = useState<Template>('minimal')
  const [category, setCategory] = useState('জাতীয়')
  const [date, setDate] = useState('১৪ মে ২০২৬')
  const [headline, setHeadline] = useState('***টংগেরখবর*** এর নতুন ফটোকার্ড জেনারেটর এখন আরও উন্নত')
  const [subtext, setSubtext] = useState('এখন থেকে খুব সহজেই প্রফেশনাল নিউজ কার্ড তৈরি করা যাবে সরাসরি ব্রাউজার থেকেই।')
  const [photoCredit, setPhotoCredit] = useState('ছবি: সংগৃহীত')
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [imageScale, setImageScale] = useState(1)
  const [headlineSize, setHeadlineSize] = useState(48)
  const [showWatermark, setShowWatermark] = useState(true)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => setImage(img)
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const parts = text.split(/(\*\*\*.*?\*\*\*)/g)
    let currentLine = ""
    let currentY = y
    const lines: { text: string; isBold: boolean }[][] = [[]]

    // প্রথম ধাপে টেক্সটগুলোকে লাইনে ভাগ করা
    const words = text.split(' ')
    let lineIdx = 0
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

    // ড্রয়িং পার্ট
    lines.forEach((line, i) => {
      let currentX = x
      line.forEach((word) => {
        ctx.fillStyle = word.isBold ? '#EF4444' : (template === 'minimal' ? '#111827' : '#FFFFFF')
        ctx.font = `${word.isBold ? 'bold' : 'bold'} ${headlineSize}px 'Arial', sans-serif`
        ctx.fillText(word.text + " ", currentX, currentY + (i * lineHeight))
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

    // 2. Image Drawing (Smart Crop)
    if (image) {
      const imgRatio = image.width / image.height
      const targetH = H * 0.55
      let drawW = W
      let drawH = W / imgRatio
      
      if (drawH < targetH) {
        drawH = targetH
        drawW = targetH * imgRatio
      }

      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, W, targetH)
      ctx.clip()
      ctx.drawImage(image, (W - drawW) / 2, 0, drawW, drawH)
      ctx.restore()

      // Gradient Overlay for dark template
      if (template === 'dark_overlay') {
        const grad = ctx.createLinearGradient(0, 0, 0, targetH)
        grad.addColorStop(0.7, 'transparent')
        grad.addColorStop(1, 'rgba(0,0,0,0.8)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, targetH)
      }
    }

    // 3. Category Tag
    const tagY = (H * 0.55) + 60
    ctx.fillStyle = '#EF4444'
    ctx.font = 'bold 24px Arial'
    ctx.fillText(category.toUpperCase(), 60, tagY)

    // 4. Date
    ctx.fillStyle = template === 'minimal' ? '#6B7280' : '#9CA3AF'
    ctx.font = '20px Arial'
    ctx.fillText(date, 60, tagY + 40)

    // 5. Headline (The complicated part)
    ctx.textBaseline = 'top'
    const headY = tagY + 90
    const headlineHeight = wrapText(ctx, headline, 60, headY, W - 120, headlineSize * 1.3)

    // 6. Subtext
    if (subtext) {
      ctx.fillStyle = template === 'minimal' ? '#4B5563' : '#D1D5DB'
      ctx.font = '30px Arial'
      const subY = headY + headlineHeight + 20
      
      // Simple wrap for subtext
      let words = subtext.split(' ')
      let line = ''
      let subLineY = subY
      for(let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' '
        if (ctx.measureText(testLine).width > W - 120) {
          ctx.fillText(line, 60, subLineY)
          line = words[n] + ' '
          subLineY += 45
        } else { line = testLine }
      }
      ctx.fillText(line, 60, subLineY)
    }

    // 7. Footer / Logo
    if (showWatermark) {
      ctx.fillStyle = '#EF4444'
      ctx.font = 'bold 32px Arial'
      ctx.textAlign = 'right'
      ctx.fillText('টংগেরখবর', W - 60, H - 60)
      
      ctx.strokeStyle = '#EF4444'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(W - 220, H - 45)
      ctx.lineTo(W - 60, H - 45)
      ctx.stroke()
    }

    // 8. Photo Credit
    ctx.textAlign = 'left'
    ctx.fillStyle = '#FFFFFF'
    ctx.font = '18px Arial'
    ctx.fillText(photoCredit, 20, (H * 0.55) - 20)

  }, [template, category, date, headline, subtext, photoCredit, image, headlineSize, showWatermark])

  useEffect(() => {
    render()
  }, [render])

  const download = () => {
    const link = document.createElement('a')
    link.download = 'tongerkhobor-card.png'
    link.href = canvasRef.current?.toDataURL() || ''
    link.click()
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-1.5 rounded-lg">
              <Newspaper className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase">টংগের<span className="text-red-600">খবর</span></h1>
          </div>
          <button 
            onClick={download}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-200"
          >
            <Download className="w-4 h-4" /> ডাউনলোড কার্ড
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Section: Template */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4 text-slate-500">
              <Layout className="w-4 h-4" />
              <h2 className="text-sm font-bold uppercase tracking-wider">টেমপ্লেট স্টাইল</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setTemplate('minimal')}
                className={`py-3 rounded-xl border-2 transition-all ${template === 'minimal' ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-100 hover:border-slate-200'}`}
              >
                মিনিমাল হোয়াইট
              </button>
              <button 
                onClick={() => setTemplate('dark_overlay')}
                className={`py-3 rounded-xl border-2 transition-all ${template === 'dark_overlay' ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-100 hover:border-slate-200'}`}
              >
                ডার্ক ওভারলে
              </button>
            </div>
          </div>

          {/* Section: Image */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4 text-slate-500">
              <ImageIcon className="w-4 h-4" />
              <h2 className="text-sm font-bold uppercase tracking-wider">ছবি আপলোড</h2>
            </div>
            <input ref={fileInputRef} type="file" hidden onChange={handleImageUpload} accept="image/*" />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-video border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-all group"
            >
              <div className="bg-slate-100 p-3 rounded-full group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-slate-400" />
              </div>
              <span className="text-sm font-medium text-slate-500">ক্লিক করে ছবি সিলেক্ট করুন</span>
            </button>
          </div>

          {/* Section: Content */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 mb-2 text-slate-500">
              <Type className="w-4 h-4" />
              <h2 className="text-sm font-bold uppercase tracking-wider">তথ্য ও শিরোনাম</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" placeholder="বিভাগ" value={category} onChange={e => setCategory(e.target.value)}
                className="bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500"
              />
              <input 
                type="text" placeholder="তারিখ" value={date} onChange={e => setDate(e.target.value)}
                className="bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500"
              />
            </div>
            <textarea 
              rows={2} placeholder="শিরোনাম (হাইলাইট করতে ***বোল্ড*** লিখুন)" value={headline} onChange={e => setHeadline(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500"
            />
            <textarea 
              rows={3} placeholder="বিস্তারিত বিবরণ..." value={subtext} onChange={e => setSubtext(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500"
            />
             <input 
                type="text" placeholder="ছবির ক্রেডিট" value={photoCredit} onChange={e => setPhotoCredit(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500"
              />
          </div>

          {/* Section: Settings */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6 text-slate-500">
              <Settings2 className="w-4 h-4" />
              <h2 className="text-sm font-bold uppercase tracking-wider">কনফিগারেশন</h2>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold">শিরোনামের সাইজ</span>
                  <span className="text-red-600 font-mono">{headlineSize}px</span>
                </div>
                <input type="range" min="30" max="70" value={headlineSize} onChange={e => setHeadlineSize(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-600" />
              </div>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-bold">ওয়াটারমার্ক দেখান</span>
                <input type="checkbox" checked={showWatermark} onChange={e => setShowWatermark(e.target.checked)} className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-red-500 relative transition-all before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:left-5 before:transition-all" />
              </label>
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="lg:col-span-7">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold flex items-center gap-2"><Sparkles className="w-5 h-5 text-yellow-500" /> লাইভ প্রিভিউ</h2>
              <span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600 uppercase tracking-widest font-bold">1080 × 1350</span>
            </div>
            <div className="bg-slate-200 p-4 rounded-3xl overflow-hidden shadow-inner flex justify-center">
              <canvas 
                ref={canvasRef} 
                className="max-w-full h-auto shadow-2xl rounded-sm transition-all duration-300"
                style={{ maxHeight: '75vh' }}
              />
            </div>
            <p className="text-center text-slate-400 text-sm mt-4">টিপস: ভালো রেজোলিউশনের জন্য বড় ছবি ব্যবহার করুন।</p>
          </div>
        </div>

      </main>
    </div>
  )
}
