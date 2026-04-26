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

export default function ResultPage() {
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
        setData(d)
        setLoading(false)
      })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [sessionId])

  const handlePrint = () => window.print()

  if (loading) return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:#0a0e1a;color:#f0eadc;font-family:'Noto Serif JP',serif;min-height:100vh;display:flex;align-items:center;justify-content:center;}
        .loading{text-align:center;}
        .spinner{width:60px;height:60px;border:3px solid rgba(201,168,76,0.2);border-top-color:#c9a84c;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 24px;}
        @keyframes spin{to{transform:rotate(360deg);}}
        .loading-text{font-family:'Cinzel',serif;font-size:14px;color:#c9a84c;letter-spacing:3px;animation:blink 1.5s ease-in-out infinite;}
        @keyframes blink{0%,100%{opacity:0.4;}50%{opacity:1;}}
        .loading-sub{font-size:12px;color:rgba(240,234,220,0.4);margin-top:10px;}
      `}</style>
      <div className="loading">
        <div className="spinner"></div>
        <div className="loading-text">✦ 鑑定文を生成しています ✦</div>
        <div className="loading-sub">AIが4つの占術を統合分析中です…<br/>少々お待ちください（30秒〜1分程度）</div>
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

  const gogyouMax = Object.entries(data.gogyou).reduce((a,b) => a[1]>b[1]?a:b)[0]
  const gogyouColors: Record<string,string> = {wood:'#4caf7c',fire:'#e87a7a',earth:'#c9a84c',metal:'#a0b8d0',water:'#6090c0'}

  return (
    <>
      <style>{`
        :root{--navy:#0a0e1a;--gold:#c9a84c;--gold2:#e8c97a;--white:#f0eadc;}
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background-color:var(--navy);color:var(--white);font-family:'Noto Serif JP',serif;min-height:100vh;}
        .wrap{max-width:720px;margin:0 auto;padding:40px 20px 80px;}
        .header{text-align:center;padding:40px 0 32px;border-bottom:1px solid rgba(201,168,76,0.15);margin-bottom:28px;}
        .header-label{font-family:'Cinzel',serif;font-size:10px;letter-spacing:4px;color:var(--gold);text-transform:uppercase;margin-bottom:12px;opacity:0.7;}
        .header-title{font-family:'Cinzel',serif;font-size:clamp(22px,5vw,32px);color:var(--gold2);letter-spacing:3px;margin-bottom:8px;}
        .header-name{font-size:16px;color:rgba(240,234,220,0.7);margin-bottom:20px;}
        .print-btn{background:transparent;border:1px solid rgba(201,168,76,0.4);border-radius:8px;color:var(--gold2);font-family:'Cinzel',serif;font-size:12px;letter-spacing:2px;padding:10px 24px;cursor:pointer;}

        .summary-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:24px;}
        @media(max-width:480px){.summary-grid{grid-template-columns:1fr;}}
        .summary-item{background:rgba(26,32,64,0.7);border:1px solid rgba(201,168,76,0.15);border-radius:12px;padding:16px;}
        .sum-key{font-family:'Cinzel',serif;font-size:10px;color:var(--gold);letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;opacity:0.7;}
        .sum-val{font-size:15px;color:var(--white);font-weight:500;}

        .gogyou-section{background:rgba(26,32,64,0.7);border:1px solid rgba(201,168,76,0.15);border-radius:12px;padding:20px;margin-bottom:24px;}
        .gogyou-title{font-family:'Cinzel',serif;font-size:11px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;}
        .gogyou-bars{display:flex;flex-direction:column;gap:8px;}
        .gogyou-row{display:flex;align-items:center;gap:10px;}
        .gogyou-label{font-size:12px;color:rgba(240,234,220,0.6);width:20px;}
        .gogyou-bar{flex:1;height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;}
        .gogyou-fill{height:100%;border-radius:3px;}
        .gogyou-pct{font-size:11px;color:rgba(240,234,220,0.5);width:32px;text-align:right;}

        .tarot-section{background:rgba(26,32,64,0.7);border:1px solid rgba(201,168,76,0.15);border-radius:12px;padding:20px;margin-bottom:24px;}
        .tarot-title{font-family:'Cinzel',serif;font-size:11px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;}
        .tarot-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
        .tarot-item{text-align:center;background:rgba(10,14,26,0.5);border:1px solid rgba(201,168,76,0.12);border-radius:8px;padding:14px 8px;}
        .tarot-pos{font-size:10px;color:var(--gold);letter-spacing:1px;margin-bottom:6px;}
        .tarot-card{font-size:13px;color:var(--white);}

        .reading-section{background:linear-gradient(135deg,rgba(26,32,64,0.9),rgba(15,22,40,0.95));border:1px solid rgba(201,168,76,0.2);border-radius:16px;padding:32px;margin-bottom:24px;}
        .reading-title{font-family:'Cinzel',serif;font-size:12px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid rgba(201,168,76,0.15);}
        .reading-text{font-size:14px;line-height:2.4;color:rgba(240,234,220,0.88);white-space:pre-wrap;}

        .bottom-cta{text-align:center;margin-top:32px;}
        .back-link{display:inline-block;color:rgba(201,168,76,0.6);font-size:13px;text-decoration:none;margin-bottom:16px;}
        .share-btn{background:transparent;border:1px solid rgba(201,168,76,0.3);border-radius:8px;color:var(--gold2);font-family:'Cinzel',serif;font-size:12px;letter-spacing:2px;padding:10px 20px;cursor:pointer;margin:0 6px;}

        @media print{
          body{background:white;color:black;}
          .wrap{padding:20px;}
          .print-btn,.back-link,.share-btn,.bottom-cta{display:none;}
          .reading-section{background:white;border:1px solid #ccc;}
          .reading-text{color:black;}
          .summary-item,.gogyou-section,.tarot-section{background:#f5f5f5;border:1px solid #ddd;}
        }
      `}</style>

      <div className="wrap">
        <div className="header">
          <div className="header-label">✦ AI総合鑑定 完全版 ✦</div>
          <h1 className="header-title">Your Reading</h1>
          <div className="header-name">{data.name}様の鑑定結果</div>
          <button className="print-btn" onClick={handlePrint}>✦ PDFとして保存・印刷</button>
        </div>

        {/* 命式サマリー */}
        <div className="summary-grid">
          <div className="summary-item">
            <div className="sum-key">星座</div>
            <div className="sum-val">{data.zodiac.name}</div>
          </div>
          <div className="summary-item">
            <div className="sum-key">日干（日主）</div>
            <div className="sum-val">{data.nisshu}</div>
          </div>
          <div className="summary-item">
            <div className="sum-key">命式</div>
            <div className="sum-val">{data.kanshi.year}年 {data.kanshi.month}月 {data.kanshi.day}日</div>
          </div>
          <div className="summary-item">
            <div className="sum-key">運命数</div>
            <div className="sum-val">{data.destinyNum}</div>
          </div>
        </div>

        {/* 五行バランス */}
        <div className="gogyou-section">
          <div className="gogyou-title">✦ 五行バランス</div>
          <div className="gogyou-bars">
            {[
              {key:'wood',label:'木',emoji:'🌿'},
              {key:'fire',label:'火',emoji:'🔥'},
              {key:'earth',label:'土',emoji:'🌍'},
              {key:'metal',label:'金',emoji:'⚙️'},
              {key:'water',label:'水',emoji:'💧'},
            ].map(g => (
              <div key={g.key} className="gogyou-row">
                <div className="gogyou-label">{g.emoji}</div>
                <div className="gogyou-label">{g.label}</div>
                <div className="gogyou-bar">
                  <div className="gogyou-fill" style={{width:`${data.gogyou[g.key as keyof typeof data.gogyou]}%`,background:gogyouColors[g.key]}}></div>
                </div>
                <div className="gogyou-pct">{data.gogyou[g.key as keyof typeof data.gogyou]}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* タロット */}
        <div className="tarot-section">
          <div className="tarot-title">✦ 引いたタロットカード</div>
          <div className="tarot-grid">
            {[
              {pos:'PAST / 過去', card: data.tarot.past},
              {pos:'PRESENT / 現在', card: data.tarot.present},
              {pos:'FUTURE / 未来', card: data.tarot.future},
            ].map(t => (
              <div key={t.pos} className="tarot-item">
                <div className="tarot-pos">{t.pos}</div>
                <div className="tarot-card">✦ {t.card} ✦</div>
              </div>
            ))}
          </div>
        </div>

        {/* 鑑定文 */}
        <div className="reading-section">
          <div className="reading-title">✦ AI総合鑑定レポート</div>
          <div className="reading-text">{data.reading}</div>
        </div>

        <div className="bottom-cta">
          <a href="/star" className="back-link">← 占いポータルに戻る</a>
          <br/>
          <button className="share-btn" onClick={handlePrint}>✦ PDFとして保存</button>
        </div>
      </div>
    </>
  )
}
