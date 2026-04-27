'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

type ReadingData = {
  name: string
  birth: string
  zodiac: { name: string; en: string }
  kanshi: { year: string; month: string; day: string }
  gogyou: { wood: number; fire: number; earth: number; metal: number; water: number }
  destinyNum: number
  nisshu: string
  ageGroup: string
  tarot: { past: string; present: string; future: string }
  reading: string
}

export default function ResultContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [data, setData] = useState<ReadingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) { setError('セッションIDがありません'); setLoading(false); return }
    fetch(`/api/reading?session_id=${sessionId}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error)
        setData(d); setLoading(false)
      })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [sessionId])

  const gogyouColors: Record<string,string> = {wood:'#4caf7c',fire:'#e87a7a',earth:'#c9a84c',metal:'#a0b8d0',water:'#6090c0'}

  if (loading) return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:#0a0e1a;color:#f0eadc;font-family:'Noto Serif JP',serif;min-height:100vh;display:flex;align-items:center;justify-content:center;}
        .spinner{width:60px;height:60px;border:3px solid rgba(201,168,76,0.2);border-top-color:#c9a84c;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 24px;}
        @keyframes spin{to{transform:rotate(360deg);}}
        .lt{font-family:'Cinzel',serif;font-size:14px;color:#c9a84c;letter-spacing:3px;animation:blink 1.5s ease-in-out infinite;text-align:center;}
        @keyframes blink{0%,100%{opacity:0.4;}50%{opacity:1;}}
        .ls{font-size:12px;color:rgba(240,234,220,0.4);margin-top:10px;text-align:center;}
        .lw{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;}
      `}</style>
      <div className="lw">
        <div className="spinner"></div>
        <div className="lt">✦ 鑑定文を生成しています ✦</div>
        <div className="ls">AIが4つの占術を統合分析中です…<br/>30秒〜1分程度お待ちください</div>
      </div>
    </>
  )

  if (error) return (
    <>
      <style>{`*{margin:0;padding:0;box-sizing:border-box;}body{background:#0a0e1a;color:#f0eadc;font-family:'Noto Serif JP',serif;min-height:100vh;display:flex;align-items:center;justify-content:center;}`}</style>
      <div style={{textAlign:'center',padding:'40px'}}>
        <p style={{color:'#e87a7a',marginBottom:'16px'}}>エラーが発生しました：{error}</p>
        <a href="/star/sogo" style={{color:'#c9a84c',textDecoration:'none'}}>← 鑑定ページに戻る</a>
      </div>
    </>
  )

  if (!data) return null

  return (
    <>
      <style>{`
        :root{--navy:#0a0e1a;--gold:#c9a84c;--gold2:#e8c97a;--white:#f0eadc;}
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background-color:var(--navy);color:var(--white);font-family:'Noto Serif JP',serif;min-height:100vh;}
        .wrap{max-width:720px;margin:0 auto;padding:40px 20px 80px;}
        .hdr{text-align:center;padding:40px 0 32px;border-bottom:1px solid rgba(201,168,76,0.15);margin-bottom:28px;}
        .hdr-label{font-family:'Cinzel',serif;font-size:10px;letter-spacing:4px;color:var(--gold);text-transform:uppercase;margin-bottom:12px;opacity:0.7;}
        .hdr-title{font-family:'Cinzel',serif;font-size:clamp(22px,5vw,32px);color:var(--gold2);letter-spacing:3px;margin-bottom:8px;}
        .hdr-name{font-size:16px;color:rgba(240,234,220,0.7);margin-bottom:20px;}
        .print-btn{background:transparent;border:1px solid rgba(201,168,76,0.4);border-radius:8px;color:var(--gold2);font-family:'Cinzel',serif;font-size:12px;letter-spacing:2px;padding:10px 24px;cursor:pointer;}
        .sum-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:24px;}
        @media(max-width:480px){.sum-grid{grid-template-columns:1fr;}}
        .sum-item{background:rgba(26,32,64,0.7);border:1px solid rgba(201,168,76,0.15);border-radius:12px;padding:16px;}
        .sum-key{font-family:'Cinzel',serif;font-size:10px;color:var(--gold);letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;opacity:0.7;}
        .sum-val{font-size:15px;color:var(--white);font-weight:500;}
        .gg-sec{background:rgba(26,32,64,0.7);border:1px solid rgba(201,168,76,0.15);border-radius:12px;padding:20px;margin-bottom:24px;}
        .gg-title{font-family:'Cinzel',serif;font-size:11px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;}
        .gg-bars{display:flex;flex-direction:column;gap:8px;}
        .gg-row{display:flex;align-items:center;gap:10px;}
        .gg-lbl{font-size:12px;color:rgba(240,234,220,0.6);width:20px;}
        .gg-bar{flex:1;height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;}
        .gg-fill{height:100%;border-radius:3px;}
        .gg-pct{font-size:11px;color:rgba(240,234,220,0.5);width:32px;text-align:right;}
        .tr-sec{background:rgba(26,32,64,0.7);border:1px solid rgba(201,168,76,0.15);border-radius:12px;padding:20px;margin-bottom:24px;}
        .tr-title{font-family:'Cinzel',serif;font-size:11px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;}
        .tr-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
        .tr-item{text-align:center;background:rgba(10,14,26,0.5);border:1px solid rgba(201,168,76,0.12);border-radius:8px;padding:14px 8px;}
        .tr-pos{font-size:10px;color:var(--gold);letter-spacing:1px;margin-bottom:6px;}
        .tr-card{font-size:13px;color:var(--white);}
        .rd-sec{background:linear-gradient(135deg,rgba(26,32,64,0.9),rgba(15,22,40,0.95));border:1px solid rgba(201,168,76,0.2);border-radius:16px;padding:32px;margin-bottom:24px;}
        .rd-title{font-family:'Cinzel',serif;font-size:12px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid rgba(201,168,76,0.15);}
        .rd-text{font-size:14px;line-height:2.4;color:rgba(240,234,220,0.88);white-space:pre-wrap;}
        .bot{text-align:center;margin-top:32px;}
        .back-link{display:inline-block;color:rgba(201,168,76,0.6);font-size:13px;text-decoration:none;margin-bottom:16px;}
        .share-btn{background:transparent;border:1px solid rgba(201,168,76,0.3);border-radius:8px;color:var(--gold2);font-family:'Cinzel',serif;font-size:12px;letter-spacing:2px;padding:10px 20px;cursor:pointer;margin:0 6px;}
        @media print{body{background:white;color:black;}.wrap{padding:20px;}.print-btn,.back-link,.share-btn,.bot{display:none;}.rd-sec{background:white;border:1px solid #ccc;}.rd-text{color:black;}.sum-item,.gg-sec,.tr-sec{background:#f5f5f5;border:1px solid #ddd;}}
      `}</style>
      <div className="wrap"><div id="report-content">
        <div className="hdr">
          <div className="hdr-label">✦ AI総合鑑定 完全版 ✦</div>
          <h1 className="hdr-title">Your Reading</h1>
          <div className="hdr-name">{data.name}様の鑑定結果</div>
          <button className="print-btn" onClick={downloadPDF}>✦ PDFをダウンロード</button>
        </div>
        <div className="sum-grid">
          {[
            {k:'星座', v:data.zodiac.name},
            {k:'日干（日主）', v:data.nisshu},
            {k:'命式', v:`${data.kanshi.year}年 ${data.kanshi.month}月 ${data.kanshi.day}日`},
            {k:'運命数', v:String(data.destinyNum)},
          ].map(s => (
            <div key={s.k} className="sum-item">
              <div className="sum-key">{s.k}</div>
              <div className="sum-val">{s.v}</div>
            </div>
          ))}
        </div>
        <div className="gg-sec">
          <div className="gg-title">✦ 五行バランス</div>
          <div className="gg-bars">
            {[{k:'wood',l:'木',e:'🌿'},{k:'fire',l:'火',e:'🔥'},{k:'earth',l:'土',e:'🌍'},{k:'metal',l:'金',e:'⚙️'},{k:'water',l:'水',e:'💧'}].map(g => (
              <div key={g.k} className="gg-row">
                <div className="gg-lbl">{g.e}</div>
                <div className="gg-lbl">{g.l}</div>
                <div className="gg-bar"><div className="gg-fill" style={{width:`${data.gogyou[g.k as keyof typeof data.gogyou]}%`,background:gogyouColors[g.k]}}></div></div>
                <div className="gg-pct">{data.gogyou[g.k as keyof typeof data.gogyou]}%</div>
              </div>
            ))}
          </div>
        </div>
        <div className="tr-sec">
          <div className="tr-title">✦ 引いたタロットカード</div>
          <div className="tr-grid">
            {[{pos:'PAST / 過去',card:data.tarot.past},{pos:'PRESENT / 現在',card:data.tarot.present},{pos:'FUTURE / 未来',card:data.tarot.future}].map(t => (
              <div key={t.pos} className="tr-item">
                <div className="tr-pos">{t.pos}</div>
                <div className="tr-card">✦ {t.card} ✦</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rd-sec">
          <div className="rd-title">✦ AI総合鑑定レポート</div>
          <div className="rd-text">{data.reading}</div>
        </div>
        </div>{/* /report-content */}
        <div className="bot">
          <a href="/star" className="back-link">← 占いポータルに戻る</a><br/>
          <button className="share-btn" onClick={downloadPDF}>✦ PDFをダウンロード</button>
        </div>
      </div>
    </>
  )
}
