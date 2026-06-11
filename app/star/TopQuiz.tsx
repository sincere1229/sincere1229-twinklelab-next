"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const QUIZ_STEPS = [
  {
    q: '今、一番気になっていることは？',
    opts: [
      { label: '💗 恋愛・片思い・復縁', val: 'love' },
      { label: '💼 仕事・転職・人間関係', val: 'work' },
      { label: '🌟 自分の運勢・これからの流れ', val: 'fortune' },
      { label: '🤝 パートナーとの関係', val: 'partner' },
    ],
  },
  {
    q: '今の気持ちに近いのは？',
    opts: [
      { label: '😔 モヤモヤして答えが出ない', val: 'unclear' },
      { label: '💭 相手の気持ちが知りたい', val: 'other' },
      { label: '🔮 未来の流れを知りたい', val: 'future' },
      { label: '✨ 今の自分の状態を知りたい', val: 'self' },
    ],
  },
  {
    q: 'どのくらい本気で悩んでいますか？',
    opts: [
      { label: '🔥 かなり真剣に悩んでいる', val: 'serious' },
      { label: '🌙 ちょっと気になっている', val: 'casual' },
      { label: '💫 背中を押してほしい', val: 'push' },
      { label: '🌸 純粋に占いを楽しみたい', val: 'fun' },
    ],
  },
]

type Rec = { icon: string; title: string; desc: string; href: string; price: string; cta: string }

function getRecommend(answers: string[]): Rec {
  const [theme, mood, depth] = answers
  if (theme === 'love' || theme === 'partner') {
    if (mood === 'other') return { icon:'💞', title:'相性診断', desc:'相手の本音と二人の未来を鑑定します', href:'/star/compatibility-ai', price:'¥980', cta:'相性を鑑定する' }
    if (depth === 'serious') return { icon:'✨', title:'AI総合鑑定', desc:'手相・タロット・星座すべてで徹底鑑定します', href:'/star/sogo', price:'¥3,980', cta:'総合鑑定を受ける' }
    return { icon:'🖐️', title:'手相詳細診断', desc:'手相からあなたの恋愛運と縁を読み解きます', href:'/star/tesou', price:'¥980', cta:'手相を鑑定する' }
  }
  if (theme === 'fortune' || mood === 'future') {
    if (depth === 'serious') return { icon:'✨', title:'AI総合鑑定', desc:'今後の流れと人生の転機を徹底鑑定します', href:'/star/sogo', price:'¥3,980', cta:'総合鑑定を受ける' }
    return { icon:'🔮', title:'タロット5枚引き', desc:'過去・現在・未来・課題・アドバイスを読みます', href:'/star/tarot5', price:'¥1,980', cta:'タロットを引く' }
  }
  if (depth === 'fun' || depth === 'casual') {
    return { icon:'⭐', title:'無料タロット占い', desc:'気軽に引いてみましょう', href:'/star/tarot', price:'無料', cta:'タロットを引く（無料）' }
  }
  return { icon:'✨', title:'AI総合鑑定', desc:'あなたの状況をすべて統合して鑑定します', href:'/star/sogo', price:'¥3,980', cta:'総合鑑定を受ける' }
}

export default function TopQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [rec, setRec] = useState<Rec | null>(null)

  const choose = (val: string) => {
    const next = [...answers, val]
    if (next.length >= 3) { setAnswers(next); setRec(getRecommend(next)) }
    else { setAnswers(next); setStep(step + 1) }
  }
  const reset = () => { setStep(0); setAnswers([]); setRec(null) }

  const gold = '#c9a84c'
  const pink = '#e91e8c'

  if (rec) return (
    <div style={{ margin:'12px 14px 4px', background:'linear-gradient(135deg,rgba(255,240,247,0.98),rgba(255,248,252,0.98))', border:'1.5px solid rgba(201,168,76,0.4)', borderRadius:16, padding:'20px 16px', textAlign:'center' }}>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:'0.25em', color:gold, marginBottom:12 }}>✦ YOUR READING ✦</div>
      <div style={{ fontSize:36, marginBottom:8 }}>{rec.icon}</div>
      <div style={{ fontSize:18, fontWeight:700, color:'#3d1a40', marginBottom:6 }}>{rec.title}</div>
      <div style={{ fontSize:13, color:'#8a6a9a', lineHeight:1.7, marginBottom:16 }}>{rec.desc}</div>
      <Link href={rec.href} style={{ display:'block', padding:'14px 0', borderRadius:50, background:`linear-gradient(135deg,${pink},#c2185b)`, color:'#fff', fontSize:15, fontWeight:700, textDecoration:'none', marginBottom:10 }}>
        {rec.cta} →
      </Link>
      <div style={{ fontSize:13, fontWeight:700, color:gold, marginBottom:12 }}>{rec.price}</div>
      <button onClick={reset} style={{ fontSize:11, color:'#b08ba0', background:'none', border:'none', cursor:'pointer', textDecoration:'underline' }}>もう一度診断する</button>
    </div>
  )

  const current = QUIZ_STEPS[step]
  const progress = Math.round((step / 3) * 100)

  return (
    <div style={{ margin:'12px 14px 4px', background:'linear-gradient(135deg,rgba(255,240,247,0.98),rgba(255,248,252,0.98))', border:'1.5px solid rgba(201,168,76,0.35)', borderRadius:16, padding:'18px 16px' }}>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:'0.25em', color:gold, textAlign:'center', marginBottom:10 }}>✦ FIND YOUR READING ✦</div>
      <div style={{ background:'rgba(201,168,76,0.15)', borderRadius:4, height:4, marginBottom:14, overflow:'hidden' }}>
        <div style={{ width:`${progress}%`, height:'100%', background:`linear-gradient(90deg,${gold},${pink})`, borderRadius:4, transition:'width 0.4s' }} />
      </div>
      <p style={{ fontSize:14, fontWeight:700, color:'#3d1a40', textAlign:'center', marginBottom:14, lineHeight:1.6 }}>{current.q}</p>
      <div style={{ display:'grid', gap:8 }}>
        {current.opts.map(o => (
          <button key={o.val} onClick={() => choose(o.val)} style={{ padding:'11px 14px', background:'rgba(255,255,255,0.85)', border:'1px solid rgba(201,168,76,0.3)', borderRadius:10, fontSize:13, color:'#3d1a40', cursor:'pointer', textAlign:'left', transition:'all 0.2s', fontFamily:'inherit' }}>
            {o.label}
          </button>
        ))}
      </div>
      <p style={{ fontSize:10, color:'#b08ba0', textAlign:'center', marginTop:10 }}>質問 {step+1} / 3</p>
    </div>
  )
}
