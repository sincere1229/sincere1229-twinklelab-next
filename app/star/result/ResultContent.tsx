'use client'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

function buildPrompt(p: {
  plan: string; name: string; birth: string; hour: string; gender: string
  theme: string; tarotPast: string; tarotPresent: string; tarotFuture: string
}) {
  const genderLabel = p.gender === 'female' ? '女性' : p.gender === 'male' ? '男性' : 'その他'
  const displayName = p.name || 'あなた'

  if (p.plan === 'sogo') return `あなたはプロの占い師です。以下の情報をもとにAI総合鑑定（完全版）を日本語で行ってください。

【依頼者】名前:${displayName} / 生年月日:${p.birth || '不明'} / 時間:${p.hour === '-1' ? '不明' : p.hour + '時台'} / 性別:${genderLabel}
【タロット】過去:${p.tarotPast || '不明'} / 現在:${p.tarotPresent || '不明'} / 未来:${p.tarotFuture || '不明'}

以下をすべて含む3,000〜5,000文字の鑑定文を書いてください:

## ✦ ${displayName}さんへ
（全体的なメッセージ。温かく具体的に）

## ✦ ホロスコープ分析
（生年月日から読む太陽星座・月星座の特徴、今の天体の影響）

## ✦ 四柱推命の流れ
（今がどんな時期か、いつ転機が来るか）

## ✦ タロット統合解釈
（3枚のカードを統合して読む。過去の流れ・現在・未来の展開）

## ✦ 恋愛運
（今の恋愛状況、出会い・関係の行方、具体的アドバイス）

## ✦ 仕事・金運
（向いている仕事、転機のタイミング、お金の流れ）

## ✦ 今月・来月の運気予報
（具体的な行動を含めた運気の流れ）

## ✦ 今すぐやるべきこと
（今日から始められる3つのアクション）

## ✦ 星からのメッセージ
（温かい締めくくり）

文体:温かく具体的に。押し売り感なし。`

  if (p.plan === 'mini') return `あなたはプロの占い師です。以下の情報をもとにミニ鑑定（3テーマ）を日本語で行ってください。

【依頼者】名前:${displayName} / 生年月日:${p.birth || '不明'} / 性別:${genderLabel}
【メインテーマ】${p.theme || '総合運'}

以下をすべて含む1,500〜2,500文字の鑑定文を書いてください:

## ✦ ${displayName}さんへ
（今の全体的な状況と流れ）

## ✦ 恋愛運
（今の恋愛の状況、近未来の展開、アドバイス）

## ✦ 仕事運
（今の仕事の流れ、転機のタイミング、アドバイス）

## ✦ 金運
（今のお金の流れ、増える時期、アドバイス）

## ✦ 3ヶ月で起きる転機
（具体的なタイミングと何が変わるか）

## ✦ 今すぐやるべきこと
（今日から始められる2つのアクション）

## ✦ 星からのメッセージ
（温かい締めくくり）

文体:温かく具体的に。押し売り感なし。`

  return `あなたはプロの占い師です。以下の情報をもとに1テーマ集中リーディングを日本語で行ってください。

【依頼者】名前:${displayName} / 生年月日:${p.birth || '不明'}
【テーマ】${p.theme || '総合運'}

以下を含む800〜1,200文字の鑑定文を書いてください:

## ✦ ${displayName}さんへ
## ✦ 今の流れ
## ✦ この先3日で起きること
## ✦ アドバイス
## ✦ 星からのメッセージ

文体:温かく具体的に。`
}

async function downloadPdf(el: HTMLElement, name: string) {
  if (!(window as any).html2pdf) {
    await new Promise<void>((res, rej) => {
      const s = document.createElement('script')
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
      s.onload = () => res()
      s.onerror = () => rej(new Error('load failed'))
      document.head.appendChild(s)
    })
  }
  ;(window as any).html2pdf().set({
    margin: 12,
    filename: `twinkle-oracle-${name || 'result'}.pdf`,
    image: { type: 'jpeg', quality: 0.97 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  }).from(el).save()
}

export default function ResultContent() {
  const params = useSearchParams()

  const paid    = params.get('paid')
  const plan    = params.get('plan') || 'sogo'

  const [result,     setResult]     = useState('')
  const [loading,    setLoading]    = useState(false)
  const [error,      setError]      = useState('')
  const [pdfLoading, setPdfLoading] = useState(false)
  const [started,    setStarted]    = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)

  const isAuthorized = paid === '1'

  // ★ 修正: URLパラメータ or sessionStorage どちらからでも取得
  const getInfo = () => {
    // まずsessionStorageを試みる
    let saved: any = {}
    try {
      const raw = sessionStorage.getItem('tso_reading_info')
      if (raw) saved = JSON.parse(raw)
    } catch {}

    return {
      plan:         plan,
      name:         saved.name         || params.get('name')         || '',
      birth:        saved.birth        || params.get('birth')        || '',
      hour:         saved.hour         || params.get('hour')         || '-1',
      gender:       saved.gender       || params.get('gender')       || 'other',
      theme:        saved.theme        || params.get('theme')        || '',
      tarotPast:    saved.tarotPast    || params.get('tarot_past')    || '',
      tarotPresent: saved.tarotPresent || params.get('tarot_present') || '',
      tarotFuture:  saved.tarotFuture  || params.get('tarot_future')  || '',
    }
  }

  // ★ 修正: paid=1 があれば即座に生成開始（nameがなくても実行）
  useEffect(() => {
    if (!isAuthorized || started) return
    setStarted(true)
    const info = getInfo()
    generateReading(info)
  }, [isAuthorized])

  const generateReading = async (info: ReturnType<typeof getInfo>) => {
    setLoading(true)
    setError('')
    try {
      const prompt = buildPrompt(info)
      const res = await fetch('/api/generate-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || `HTTP ${res.status}`)
      }
      const data = await res.json()
      setResult(data.text || '')
    } catch (e: any) {
      setError(e.message || 'エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const handlePdf = async () => {
    if (!reportRef.current) return
    setPdfLoading(true)

    // PDF用の白背景スタイルをheadに追加
    const styleEl = document.createElement('style')
    styleEl.id = 'pdf-print-style'
    styleEl.textContent = `
      #report-content, #report-content * {
        background: #ffffff !important;
        color: #222222 !important;
        box-shadow: none !important;
      }
      #report-content h2 {
        color: #7a5a10 !important;
        font-size: 14px !important;
        font-weight: bold !important;
        border-bottom: 1px solid #c9a84c !important;
        padding-bottom: 5px !important;
        margin: 18px 0 8px !important;
      }
      #report-content p {
        color: #222222 !important;
        font-size: 12px !important;
        line-height: 1.9 !important;
      }
    `
    document.head.appendChild(styleEl)

    try {
      await downloadPdf(reportRef.current, getInfo().name)
    } catch {
      alert('PDFの生成に失敗しました。ブラウザの印刷機能をご利用ください。')
    } finally {
      document.getElementById('pdf-print-style')?.remove()
      setPdfLoading(false)
    }
  }

  // ---- 未認証 ----
  if (!isAuthorized) {
    return (
      <div style={s.wrap}>
        <div style={s.centerBox}>
          <div style={{fontSize:'48px',marginBottom:'16px'}}>🔒</div>
          <div style={s.boxTitle}>このページは決済後のみご覧になれます</div>
          <p style={s.boxText}>直接URLにアクセスされた場合、鑑定結果は表示されません。</p>
          <a href="/star/sogo" style={s.goldBtn}>✦ AI総合鑑定を申し込む（¥3,980）</a>
          <a href="/star/mini" style={s.outlineBtn}>ミニ鑑定を申し込む（¥1,980）</a>
        </div>
      </div>
    )
  }

  // ---- 生成中 ----
  if (loading) {
    const info = getInfo()
    return (
      <div style={s.loadWrap}>
        <div style={s.spinner} />
        <div style={s.loadTitle}>✦ 鑑定文を生成しています ✦</div>
        <p style={s.loadText}>
          {info.name || 'あなた'}さんの情報をもとに<br/>
          {plan === 'sogo' ? '4つの占術を統合して' : '丁寧に'}分析しています…
        </p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  // ---- エラー ----
  if (error) {
    return (
      <div style={s.wrap}>
        <div style={s.centerBox}>
          <div style={s.boxTitle}>エラーが発生しました</div>
          <p style={s.boxText}>{error}</p>
          <button onClick={() => generateReading(getInfo())} style={s.goldBtn as any}>もう一度試す</button>
        </div>
      </div>
    )
  }

  const info = getInfo()
  const planLabel = plan === 'sogo' ? 'AI総合鑑定（完全版）' : plan === 'mini' ? 'ミニ鑑定 3テーマ' : '1テーマ集中リーディング'

  // ---- 結果 ----
  return (
    <div style={s.wrap}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .cv-card:hover{transform:translateY(-3px)!important;border-color:rgba(201,168,76,0.5)!important;}
        .pdf-btn:hover{background:rgba(201,168,76,0.2)!important;}
      `}</style>

      <div style={s.header}>
        <a href="/star" style={s.backLink}>← 占いポータル</a>
        <div style={s.headerLabel}>✦ {planLabel} ✦</div>
        <h1 style={s.headerTitle}>{info.name || 'あなた'}さんの鑑定結果</h1>
        <div style={s.goldLine} />
        <p style={s.headerSub}>決済が完了しました · ありがとうございます🙏</p>
      </div>

      <div style={s.pdfArea}>
        <button className="pdf-btn" onClick={handlePdf} disabled={pdfLoading || !result} style={s.pdfBtn}>
          {pdfLoading ? '⏳ 生成中...' : '📄 PDFをダウンロード'}
        </button>
        <p style={s.pdfNote}>A4サイズ · 日本語対応 · 何度でも保存できます</p>
      </div>

      <div ref={reportRef} id="report-content" style={s.reportWrap}>
        <div style={s.repHeader}>
          <div style={s.repHeaderTitle}>✦ TWINKLE STAR ORACLE ✦</div>
          <div style={s.repHeaderSub}>{planLabel} · {info.name || 'あなた'} · {new Date().toLocaleDateString('ja-JP')}</div>
        </div>

        {plan === 'sogo' && (info.tarotPast || info.tarotPresent || info.tarotFuture) && (
          <div style={s.tarotBox}>
            <div style={s.tarotBoxTitle}>🃏 引いたタロットカード</div>
            <div style={s.tarotRow}>
              {[
                { pos: '過去', val: info.tarotPast },
                { pos: '現在', val: info.tarotPresent },
                { pos: '未来', val: info.tarotFuture },
              ].filter(t => t.val).map(t => (
                <div key={t.pos} style={s.tarotItem}>
                  <span style={s.tarotPos}>{t.pos}</span>
                  <span style={s.tarotName}>{t.val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={s.resultCard}>
          {result ? result.split('\n').map((line, i) => {
            if (line.startsWith('## ') || line.startsWith('# ')) return <h2 key={i} style={s.secTitle}>{line.replace(/^#{1,2}\s*/, '')}</h2>
            if (line.trim() === '---' || line.trim() === '***') return <hr key={i} style={{border:'none',borderTop:'1px solid rgba(201,168,76,0.15)',margin:'8px 0'}} />
            if (line.trim() === '') return <br key={i} />
            return <p key={i} style={s.resLine}>{line.replace(/\*\*/g, '')}</p>
          }) : (
            <p style={{color:'rgba(240,234,220,0.4)',textAlign:'center',padding:'40px 0'}}>
              鑑定文を準備しています…
            </p>
          )}
        </div>

        <div style={s.repFooter}>© 2026 Twinkle Lab / Twinkle Star Oracle · twinkle-lab.jp</div>
      </div>

      <div style={{...s.pdfArea, marginTop:'8px'}}>
        <button className="pdf-btn" onClick={handlePdf} disabled={pdfLoading || !result} style={s.pdfBtn}>
          {pdfLoading ? '⏳ 生成中...' : '📄 PDFをダウンロード'}
        </button>
      </div>

      <div style={{textAlign:'center',margin:'10px 0 24px'}}>
        <button onClick={() => generateReading(getInfo())} style={s.retryBtn}>🔄 鑑定文を再生成する</button>
      </div>

      <div style={s.cvSection}>
        <div style={s.cvTitle}>✦ 次のステップ ✦</div>
        <p style={s.cvSub}>鑑定結果を受け取ったあなたへ</p>
        <div style={s.cvGrid}>
          <a href="/star" className="cv-card" style={s.cvCard}>
            <span style={{fontSize:'28px'}}>🔮</span>
            <div style={s.cvName}>別の占いを試す</div>
            <div style={s.cvDesc}>タロット・数秘術など<br/>11種類の無料占いへ</div>
          </a>
          {plan !== 'sogo' && (
            <a href="/star/sogo" className="cv-card" style={{...s.cvCard, borderColor:'rgba(201,168,76,0.35)', background:'linear-gradient(135deg,rgba(60,40,10,0.4),rgba(40,20,5,0.5))'}}>
              <span style={{fontSize:'28px'}}>⭐</span>
              <div style={s.cvName}>AI総合鑑定へ進む</div>
              <div style={s.cvDesc}>4占術統合の完全版<br/><span style={{color:'#c9a84c',fontWeight:600}}>¥3,980</span></div>
            </a>
          )}
          <a href="https://lin.ee/XHDFrA8" target="_blank" rel="noopener noreferrer" className="cv-card" style={{...s.cvCard, borderColor:'rgba(6,199,85,0.3)', background:'rgba(6,199,85,0.06)'}}>
            <span style={{fontSize:'28px'}}>💬</span>
            <div style={s.cvName}>LINEで続きを受け取る</div>
            <div style={s.cvDesc}>開運情報を無料配信</div>
          </a>
          <a href={plan === 'sogo' ? '/star/sogo' : '/star/mini'} className="cv-card" style={s.cvCard}>
            <span style={{fontSize:'28px'}}>🔁</span>
            <div style={s.cvName}>再鑑定する</div>
            <div style={s.cvDesc}>別の日時・情報で<br/>もう一度</div>
          </a>
        </div>
      </div>

      <footer style={s.footer}>© 2026 Twinkle Lab / Twinkle Star Oracle</footer>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  wrap: { background:'#0a0e1a', minHeight:'100vh', color:'#f0eadc', fontFamily:"'Noto Serif JP',serif", paddingBottom:'60px' },
  loadWrap: { background:'#0a0e1a', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'20px', padding:'40px 20px', fontFamily:"'Noto Serif JP',serif" },
  spinner: { width:'60px', height:'60px', border:'3px solid rgba(201,168,76,0.2)', borderTopColor:'#c9a84c', borderRadius:'50%', animation:'spin 1s linear infinite' },
  loadTitle: { fontFamily:'Cinzel,serif', fontSize:'14px', color:'#c9a84c', letterSpacing:'3px' },
  loadText: { fontSize:'13px', color:'rgba(240,234,220,0.5)', lineHeight:2, textAlign:'center' },
  centerBox: { maxWidth:'560px', margin:'80px auto', background:'rgba(26,32,64,0.9)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:'16px', padding:'40px 32px', textAlign:'center', display:'flex', flexDirection:'column', gap:'12px', alignItems:'center' },
  boxTitle: { fontFamily:'Cinzel,serif', fontSize:'16px', color:'#e8c97a', letterSpacing:'2px' },
  boxText: { fontSize:'13px', color:'rgba(240,234,220,0.6)', lineHeight:2 },
  goldBtn: { display:'block', background:'linear-gradient(135deg,#8a6a20,#c9a84c)', borderRadius:'10px', color:'#0a0e1a', fontFamily:'Cinzel,serif', fontSize:'13px', fontWeight:700, padding:'14px 28px', textDecoration:'none', letterSpacing:'1px', border:'none', cursor:'pointer', width:'100%', textAlign:'center' },
  outlineBtn: { display:'block', background:'transparent', border:'1px solid rgba(201,168,76,0.4)', borderRadius:'10px', color:'#c9a84c', fontFamily:'Cinzel,serif', fontSize:'13px', fontWeight:700, padding:'13px 28px', textDecoration:'none', letterSpacing:'1px', width:'100%', textAlign:'center' },
  header: { textAlign:'center', padding:'48px 20px 28px', background:'linear-gradient(180deg,rgba(201,168,76,0.06) 0%,transparent 100%)', borderBottom:'1px solid rgba(201,168,76,0.12)' },
  backLink: { display:'inline-block', fontSize:'12px', color:'rgba(201,168,76,0.5)', textDecoration:'none', letterSpacing:'2px', marginBottom:'16px' },
  headerLabel: { fontFamily:'Cinzel,serif', fontSize:'10px', color:'#c9a84c', letterSpacing:'4px', marginBottom:'10px', opacity:0.7 },
  headerTitle: { fontFamily:'Cinzel,serif', fontSize:'clamp(22px,5vw,34px)', color:'#e8c97a', letterSpacing:'2px', marginBottom:'8px' },
  goldLine: { width:'80px', height:'1px', background:'linear-gradient(90deg,transparent,#c9a84c,transparent)', margin:'12px auto' },
  headerSub: { fontSize:'12px', color:'rgba(240,234,220,0.4)', letterSpacing:'1px' },
  pdfArea: { textAlign:'center', padding:'16px 20px 0' },
  pdfBtn: { background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.4)', borderRadius:'10px', color:'#e8c97a', fontFamily:'Cinzel,serif', fontSize:'13px', fontWeight:700, letterSpacing:'1px', padding:'12px 28px', cursor:'pointer', transition:'all 0.2s' },
  pdfNote: { fontSize:'11px', color:'rgba(240,234,220,0.3)', marginTop:'6px' },
  reportWrap: { maxWidth:'680px', margin:'20px auto', padding:'0 20px', animation:'fadeUp 0.5s ease both' },
  repHeader: { textAlign:'center', padding:'20px 0 12px', borderBottom:'1px solid rgba(201,168,76,0.2)', marginBottom:'20px' },
  repHeaderTitle: { fontFamily:'Cinzel,serif', fontSize:'13px', color:'#c9a84c', letterSpacing:'4px' },
  repHeaderSub: { fontSize:'11px', color:'rgba(240,234,220,0.4)', marginTop:'4px', letterSpacing:'1px' },
  tarotBox: { background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:'12px', padding:'16px 20px', marginBottom:'16px' },
  tarotBoxTitle: { fontSize:'12px', color:'#c9a84c', letterSpacing:'2px', marginBottom:'10px' },
  tarotRow: { display:'flex', gap:'10px', flexWrap:'wrap' },
  tarotItem: { display:'flex', flexDirection:'column', gap:'2px', flex:1, minWidth:'80px', background:'rgba(10,14,26,0.4)', border:'1px solid rgba(201,168,76,0.15)', borderRadius:'8px', padding:'8px 12px' },
  tarotPos: { fontSize:'10px', color:'rgba(240,234,220,0.4)', letterSpacing:'1px' },
  tarotName: { fontSize:'13px', color:'#e8c97a', fontWeight:600 },
  resultCard: { background:'linear-gradient(135deg,rgba(26,32,64,0.9),rgba(15,22,40,0.95))', border:'1px solid rgba(201,168,76,0.18)', borderRadius:'16px', padding:'28px 24px' },
  secTitle: { fontFamily:'Cinzel,serif', fontSize:'14px', color:'#c9a84c', letterSpacing:'2px', margin:'24px 0 10px', paddingBottom:'8px', borderBottom:'1px solid rgba(201,168,76,0.15)' },
  resLine: { fontSize:'14px', color:'rgba(240,234,220,0.88)', lineHeight:2.1, margin:'4px 0' },
  repFooter: { textAlign:'center', padding:'20px 0 8px', fontSize:'10px', color:'rgba(240,234,220,0.2)', letterSpacing:'1px' },
  retryBtn: { background:'transparent', border:'1px solid rgba(240,234,220,0.15)', borderRadius:'8px', color:'rgba(240,234,220,0.4)', fontSize:'12px', padding:'8px 20px', cursor:'pointer', letterSpacing:'1px' },
  cvSection: { maxWidth:'680px', margin:'32px auto 0', padding:'0 20px' },
  cvTitle: { fontFamily:'Cinzel,serif', fontSize:'12px', color:'#c9a84c', letterSpacing:'3px', textAlign:'center', marginBottom:'8px' },
  cvSub: { fontSize:'12px', color:'rgba(240,234,220,0.45)', textAlign:'center', marginBottom:'16px', lineHeight:1.8 },
  cvGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' },
  cvCard: { display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', background:'rgba(26,32,64,0.8)', border:'1px solid rgba(201,168,76,0.18)', borderRadius:'14px', padding:'20px 14px', textDecoration:'none', transition:'all 0.25s', gap:'6px' },
  cvName: { fontSize:'13px', color:'#e8c97a', fontWeight:600, letterSpacing:'1px' },
  cvDesc: { fontSize:'11px', color:'rgba(240,234,220,0.45)', lineHeight:1.7 },
  footer: { textAlign:'center', marginTop:'40px', paddingTop:'20px', borderTop:'1px solid rgba(201,168,76,0.1)', fontSize:'11px', color:'rgba(240,234,220,0.2)' },
}
