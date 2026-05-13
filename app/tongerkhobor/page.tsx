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
    canvas.width = W
    canvas.height = H

    // 1. Background
    ctx.fillStyle = template === 'minimal' ? '#FFFFFF' : '#000000'
    ctx.fillRect(0, 0, W, H)

    // 2. Image Drawing
    const imageBottomLimit = H * 0.55
    if (image) {
      const targetH = imageBottomLimit
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
        const grad = ctx.createLinearGradient(0, targetH - 350, 0, targetH)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(1, 'rgba(0,0,0,0.95)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, targetH)
      }
    }

    // 3. Logo (নিচে বাম পাশে - ফিক্সড)
    if (logoImg) {
      ctx.save()
      if (template === 'minimal') ctx.filter = 'invert(1) contrast(200%)'
      
      const logoW = 200
      const logoH = (logoImg.height / logoImg.width) * logoW
      // একদম নিচে বাম পাশে পজিশন
      ctx.drawImage(logoImg, 60, H - logoH - 60, logoW, logoH)
      ctx.restore()
    }

    // 4. Photo Credit (লোগোর সাথে যাতে না লাগে তাই ইমেজের একটু উপরে সরানো হয়েছে)
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 22px Arial'
    ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 8;
    ctx.fillText(photoCredit, 40, imageBottomLimit - 30)
    ctx.shadowBlur = 0

    // 5. Category & Date
    const contentY = imageBottomLimit + 70
    ctx.textBaseline = 'top'
    ctx.textAlign = 'left'
    
    ctx.fillStyle = '#EF4444'
    ctx.font = 'bold 32px Arial'
    ctx.fillText(category.toUpperCase(), 60, contentY)

    ctx.fillStyle = template === 'minimal' ? '#64748b' : '#94a3b8'
    ctx.font = '24px Arial'
    ctx.fillText(date, 60, contentY + 45)

    // 6. Headline
    const headY = contentY + 115
    const headHeight = drawHeadline(ctx, headline, 60, headY, W - 120, headlineSize * 1.3)

    // 7. Subtext
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
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900">
      <header className="bg-white border-b sticky top-0 z-30 px-8 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Newspaper className="text-red-600 w-6 h-6" />
          <h1 className="text-xl font-black">টংগের<span className="text-red-600">খবর</span></h1>
        </div>
        <button onClick={() => {
          const link = document.createElement('a')
          link.download = `card_${Date.now()}.png`
          link.href = canvasRef.current?.toDataURL('image/png', 1.0) || ''
          link.click()
        }} className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-md">
          <Download className="w-4 h-4" /> ডাউনলোড
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
               <span className="text-xs font-black uppercase text-slate-400">ইমেজ সেটিংস</span>
               <button onClick={() => {setImagePos({x:0, y:0}); setImageZoom(1)}} className="text-slate-400 hover:text-red-600 transition-colors">
                  <RefreshCw className="w-4 h-4" />
               </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">জুম</label>
                <input type="range" min="1" max="4" step="0.01" value={imageZoom} onChange={e => setImageZoom(parseFloat(e.target.value))} className="w-full accent-red-600" />
              </div>
              <input ref={fileInputRef} type="file" hidden onChange={handleImageUpload} />
              <button onClick={() => fileInputRef.current?.click()} className="w-full py-6 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-sm hover:bg-slate-50">
                + নতুন ছবি দিন
              </button>
            </div>

            <div className="space-y-3">
               <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="বিভাগ" value={category} onChange={e => setCategory(e.target.value)} className="bg-slate-50 p-3.5 rounded-xl text-sm border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-500" />
                  <input type="text" placeholder="তারিখ" value={date} onChange={e => setDate(e.target.value)} className="bg-slate-50 p-3.5 rounded-xl text-sm border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-500" />
               </div>
               <textarea rows={2} placeholder="শিরোনাম" value={headline} onChange={e => setHeadline(e.target.value)} className="w-full bg-slate-50 p-3.5 rounded-xl text-sm border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-500 font-bold" />
               <textarea rows={2} placeholder="উপ-শিরোনাম" value={subtext} onChange={e => setSubtext(e.target.value)} className="w-full bg-slate-50 p-3.5 rounded-xl text-sm border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-500" />
               <input type="text" placeholder="ক্রেডিট" value={photoCredit} onChange={e => setPhotoCredit(e.target.value)} className="w-full bg-slate-50 p-3.5 rounded-xl text-sm border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-500" />
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-2xl shadow-sm border flex gap-2">
             <button onClick={() => setTemplate('minimal')} className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase ${template === 'minimal' ? 'bg-slate-900 text-white' : 'text-slate-400'}`}>White</button>
             <button onClick={() => setTemplate('dark_overlay')} className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase ${template === 'dark_overlay' ? 'bg-red-600 text-white' : 'text-slate-400'}`}>Dark</button>
          </div>
        </div>

        <div className="lg:col-span-7 flex justify-center">
          <div className="sticky top-28 w-full max-w-[480px]">
            <div className="bg-white p-3 rounded-[2.8rem] shadow-2xl border">
               <canvas ref={canvasRef} className="w-full h-auto rounded-[2.3rem]" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
