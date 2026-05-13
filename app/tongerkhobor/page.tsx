'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Download, Image as ImageIcon, Sparkles, Newspaper, Move, RefreshCw } from 'lucide-react'

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
  
  const [headlineSize, setHeadlineSize] = useState(54)
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
    const imageAreaHeight = H * 0.55 // ছবির এলাকা
    
    canvas.width = W
    canvas.height = H

    // 1. Background
    ctx.fillStyle = template === 'minimal' ? '#FFFFFF' : '#000000'
    ctx.fillRect(0, 0, W, H)

    // 2. Image Drawing
    if (image) {
      const imgRatio = image.width / image.height
      let drawW = W * imageZoom
      let drawH = (W / imgRatio) * imageZoom

      if (drawH < imageAreaHeight) {
        drawH = imageAreaHeight * imageZoom
        drawW = (imageAreaHeight * imgRatio) * imageZoom
      }

      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, W, imageAreaHeight)
      ctx.clip()
      
      const x = (W - drawW) / 2 + imagePos.x
      const y = (imageAreaHeight - drawH) / 2 + imagePos.y
      
      ctx.drawImage(image, x, y, drawW, drawH)
      ctx.restore()

      // Gradient for text legibility on image
      if (template === 'dark_overlay') {
        const grad = ctx.createLinearGradient(0, imageAreaHeight - 300, 0, imageAreaHeight)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(1, 'rgba(0,0,0,0.85)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, imageAreaHeight)
      }
    }

    // 3. Logo (ছবির ভেতরে বাম পাশে - Bottom Left of IMAGE)
    if (logoImg) {
      ctx.save()
      const logoW = 180
      const logoH = (logoImg.height / logoImg.width) * logoW
      
      // পজিশন: ছবির নিচে বাম পাশে (মার্জিন ৬০)
      ctx.drawImage(logoImg, 60, imageAreaHeight - logoH - 40, logoW, logoH)
      ctx.restore()
    }

    // 4. Photo Credit (ছবির ভেতরে ডান পাশে)
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 20px Arial'
    ctx.textAlign = 'right'
    ctx.shadowColor = 'rgba(0,0,0,0.7)'; ctx.shadowBlur = 6;
    ctx.fillText(photoCredit, W - 40, imageAreaHeight - 30)
    ctx.shadowBlur = 0
    ctx.textAlign = 'left' // Reset

    // 5. Text Content Area (নিচের অংশ)
    const contentY = imageAreaHeight + 70
    ctx.textBaseline = 'top'
    
    // Category & Date
    ctx.fillStyle = '#EF4444'
    ctx.font = 'bold 32px Arial'
    ctx.fillText(category.toUpperCase(), 60, contentY)

    ctx.fillStyle = template === 'minimal' ? '#64748b' : '#94a3b8'
    ctx.font = '24px Arial'
    ctx.fillText(date, 60, contentY + 45)

    // Headline
    const headY = contentY + 115
    const headHeight = drawHeadline(ctx, headline, 60, headY, W - 120, headlineSize * 1.3)

    // Subtext
    if (subtext) {
      ctx.fillStyle = template === 'minimal' ? '#475569' : '#cbd5e1'
      ctx.font = '34px Arial'
      const words = subtext.split(' ')
      let line = ''
      let subTextY = headY + headHeight + 25
      
      words.forEach(word => {
        const testLine = line + word + ' '
        if (ctx.measureText(testLine).width > W - 120) {
          ctx.fillText(line, 60, subTextY)
          line = word + ' '
          subTextY += 55
        } else {
          line = testLine
        }
      })
      ctx.fillText(line, 60, subTextY)
    }

  }, [template, category, date, headline, subtext, photoCredit, image, imagePos, imageZoom, headlineSize, logoImg])

  useEffect(() => { render() }, [render])

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white/70 backdrop-blur-md border-b sticky top-0 z-30 px-10 h-16 flex items-center justify-between">
        <h1 className="text-xl font-black">টংগের<span className="text-red-600">খবর</span></h1>
        <button onClick={() => {
          const link = document.createElement('a')
          link.download = `card.png`
          link.href = canvasRef.current?.toDataURL('image/png', 1.0) || ''
          link.click()
        }} className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-xl font-bold transition-all shadow-lg active:scale-95">
          ডাউনলোড করুন
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-6">
            <input ref={fileInputRef} type="file" hidden onChange={handleImageUpload} />
            <button onClick={() => fileInputRef.current?.click()} className="w-full py-10 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold hover:bg-slate-50 transition-colors">
               + ইমেজ আপলোড
            </button>
            <div className="grid grid-cols-2 gap-4">
               <input type="text" placeholder="বিভাগ" value={category} onChange={e => setCategory(e.target.value)} className="bg-slate-50 p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-500" />
               <input type="text" placeholder="তারিখ" value={date} onChange={e => setDate(e.target.value)} className="bg-slate-50 p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-500" />
            </div>
            <textarea placeholder="শিরোনাম (***বোল্ড***)" value={headline} onChange={e => setHeadline(e.target.value)} className="w-full bg-slate-50 p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-500 font-bold" rows={3} />
            <textarea placeholder="সাবটেক্সট" value={subtext} onChange={e => setSubtext(e.target.value)} className="w-full bg-slate-50 p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-500" rows={2} />
            <input type="text" placeholder="ছবি ক্রেডিট" value={photoCredit} onChange={e => setPhotoCredit(e.target.value)} className="w-full bg-slate-50 p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-500" />
          </div>
          
          <div className="bg-slate-900 p-2 rounded-2xl flex">
             <button onClick={() => setTemplate('minimal')} className={`flex-1 py-3 rounded-xl font-bold text-xs ${template === 'minimal' ? 'bg-white text-slate-900 shadow' : 'text-slate-400'}`}>WHITE</button>
             <button onClick={() => setTemplate('dark_overlay')} className={`flex-1 py-3 rounded-xl font-bold text-xs ${template === 'dark_overlay' ? 'bg-red-600 text-white shadow' : 'text-slate-400'}`}>DARK</button>
          </div>
        </div>

        <div className="lg:col-span-7 flex justify-center">
          <div className="sticky top-28 w-full max-w-[500px]">
             <div className="bg-white p-4 rounded-[3.5rem] shadow-2xl border">
                <canvas ref={canvasRef} className="w-full h-auto rounded-[2.8rem]" />
             </div>
          </div>
        </div>
      </main>
    </div>
  )
}
