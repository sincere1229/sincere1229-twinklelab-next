'use client'
import { useState, useEffect } from 'react'

const STRIPE_LINK = 'https://buy.stripe.com/00w14g2j46C66oBcFl33W04'

export default function TesouPage() {
  const [step, setStep] = useState('top')
  const [imageL, setImageL] = useState(null)
  const [imageR, setImageR] = useState(null)
  const [mimeTypeL, setMimeTypeL] = useState('image/jpeg')
  const [mimeTypeR, setMimeTypeR] = useState('image/jpeg')
  const [memo, setMemo] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('payment') === 'success') setStep('form')
  }, [])

  const hasImage = imageL || imageR

  const handleFile = (side, file) => {
    if (!file.type.startsWith('image/')) { setError('画像ファイルを選択してください'); return }
    if (file.size > 10*1024*1024) { setError('10MB以下の画像を選択してください'); return }
    const reader = new FileReader()
    reader.onload = e => {
      const base64 = (e.target!.result as string).split(',')[1]
      if (side==='L') { setImageL(base64); setMimeTypeL(file.type) }
      else { setImageR(base64); setMimeTypeR(file.type) }
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const analyze = async () => {
    if (!hasImage) return
    setStep('loading'); setError('')
    try {
      const res = await fetch('/api/uranai/tesou', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageL, imageR, mimeTypeL, mimeTypeR, memo }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '鑑定に失敗しました')
      setResult(data.result)
      setStep('result')
    } catch (err) {
      setError(err.message || '鑑定中にエラーが発生しました')
      setStep('form')
    }
  }

  const copy = async () => { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(()=>setCopied(false),3000) }
  const reset = () => {
    setStep('top'); setImageL(null); setImageR(null); setMemo(''); setResult(''); setError('')
    if (typeof window !== 'undefined') window.history.replaceState({}, '', window.location.pathname)
  }

  const inputStyle = { width:'100%', background:'rgba(253,246,240,0.04)', border:'1px solid rgba(212,168,67,0.2)', borderRadius:10, padding:'11px 13px', color:'#fdf6f0', fontFamily:"'Noto Serif JP',serif", fontSize:13, outline:'none', boxSizing:'border-box' }

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#1a0a10,#2a1020,#1a0818)', padding:'40px 20px 80px', fontFamily:"'Noto Serif JP',serif", color:'#fdf6f0' }}>
      <div style={{ maxWidth:580, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ fontSize:12, letterSpacing:'0.3em', color:'#d4a843', textTransform:'uppercase', marginBottom:12 }}>✦ Twinkle Star Oracle ✦</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:300, marginBottom:6 }}>手相<span style={{ color:'#f0d080', fontStyle:'italic' }}>詳細診断</span></h1>
          <div style={{ width:70, height:1, background:'linear-gradient(90deg,transparent,#d4a843,transparent)', margin:'12px auto' }} />
          <p style={{ fontSize:12, color:'rgba(253,246,240,0.5)', lineHeight:1.8 }}>あなたの手が語る、本来の姿と今の流れ</p>
        </div>

        {step === 'top' && (
          <div style={{ background:'rgba(253,246,240,0.04)', border:'1px solid rgba(212,168,67,0.2)', borderRadius:20, padding:'36px 28px', textAlign:'center', backdropFilter:'blur(10px)' }}>
            <div style={{ fontSize:36, marginBottom:16 }}>🤚</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:'#f0d080', marginBottom:12 }}>手相詳細診断 ¥980</div>
            <div style={{ fontSize:13, color:'rgba(253,246,240,0.55)', lineHeight:1.9, marginBottom:24 }}>
              左右両手の詳細分析<br />本来の自分と今の状態の「ズレ」分析<br />行動アドバイス3つ・未来の流れまで<br />1000文字以上の本格リーディング
            </div>
            <button onClick={()=>window.location.href=STRIPE_LINK}
              style={{ width:'100%', padding:18, border:'none', borderRadius:14, background:'linear-gradient(135deg,#c8607a,#f0d080)', color:'white', fontFamily:"'Noto Serif JP',serif", fontSize:16, letterSpacing:'0.1em', cursor:'pointer', marginBottom:12 }}>
              🌙 ¥980 で手相診断をはじめる
            </button>
            <p style={{ fontSize:11, color:'rgba(253,246,240,0.35)' }}>決済完了後に画像アップロードページへ進みます</p>
            <a href="/star" style={{ display:'block', marginTop:16, fontSize:12, color:'rgba(253,246,240,0.4)', textDecoration:'none' }}>← 占いポータルに戻る</a>
          </div>
        )}

        {step === 'form' && (
          <div style={{ background:'rgba(253,246,240,0.04)', border:'1px solid rgba(212,168,67,0.2)', borderRadius:20, padding:'32px 28px', backdropFilter:'blur(10px)' }}>
            <div style={{ background:'rgba(212,168,67,0.08)', border:'1px solid rgba(212,168,67,0.25)', borderRadius:12, padding:'14px 18px', textAlign:'center', fontSize:13, color:'#f0d080', marginBottom:24 }}>
              ✅ お支払いが完了しました！<br />
              <span style={{ fontSize:11, color:'rgba(253,246,240,0.5)' }}>手相画像をアップロードして鑑定をお受けください</span>
            </div>
            <div style={{ textAlign:'center', marginBottom:20 }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, color:'#f0d080' }}>🤚 手相画像をアップロード</div>
              <p style={{ fontSize:12, color:'rgba(253,246,240,0.45)', marginTop:6 }}>明るい場所で撮影すると精度が上がります</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16 }}>
              {['L','R'].map(side=>(
                <div key={side}>
                  <div style={{ fontSize:11, color:'rgba(253,246,240,0.45)', textAlign:'center', marginBottom:6 }}>{side==='L'?'🤚 左手':'🤚 右手'}</div>
                  {(side==='L'?imageL:imageR) ? (
                    <div style={{ position:'relative' }}>
                      <img src={`data:${side==='L'?mimeTypeL:mimeTypeR};base64,${side==='L'?imageL:imageR}`} style={{ width:'100%', borderRadius:10, border:'1px solid rgba(212,168,67,0.3)', maxHeight:160, objectFit:'cover' }} alt="" />
                      <button onClick={()=>side==='L'?setImageL(null):setImageR(null)} style={{ position:'absolute', top:6, right:6, background:'rgba(200,96,122,0.8)', border:'none', color:'white', width:24, height:24, borderRadius:'50%', cursor:'pointer', fontSize:12 }}>✕</button>
                    </div>
                  ) : (
                    <label style={{ border:'2px dashed rgba(212,168,67,0.3)', borderRadius:14, padding:'24px 10px', textAlign:'center', cursor:'pointer', display:'block', background:'rgba(212,168,67,0.02)' }}>
                      <input type="file" accept="image/*" style={{ display:'none' }} onChange={e=>e.target.files?.[0]&&handleFile(side,e.target.files[0])} />
                      <div style={{ fontSize:24, marginBottom:6 }}>{side==='L'?'✋':'🤚'}</div>
                      <div style={{ fontSize:11, color:'rgba(253,246,240,0.6)' }}>タップして選択</div>
                    </label>
                  )}
                </div>
              ))}
            </div>
            <div style={{ fontSize:10, color:'rgba(253,246,240,0.3)', textAlign:'center', marginBottom:16 }}>※片手のみでも鑑定できます</div>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:12, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>💭 気になることがあればお書きください（任意）</div>
              <textarea value={memo} onChange={e=>setMemo(e.target.value)} placeholder="例：恋愛のこと、仕事のこと、最近気になっていること"
                style={{...inputStyle, resize:'none', height:80, lineHeight:1.7}} />
            </div>
            {error && <div style={{ background:'rgba(200,96,122,0.1)', border:'1px solid rgba(200,96,122,0.3)', borderRadius:10, padding:'12px 16px', fontSize:12, color:'#f0a8c0', textAlign:'center', marginBottom:12 }}>{error}</div>}
            <button onClick={analyze} disabled={!hasImage}
              style={{ width:'100%', padding:16, border:'none', borderRadius:14, background:'linear-gradient(135deg,#c8607a,#f0d080)', color:'white', fontFamily:"'Noto Serif JP',serif", fontSize:14, letterSpacing:'0.1em', cursor:hasImage?'pointer':'not-allowed', opacity:hasImage?1:0.4 }}>
              ✨ AI手相鑑定をはじめる
            </button>
          </div>
        )}

        {step === 'loading' && (
          <div style={{ background:'rgba(253,246,240,0.04)', border:'1px solid rgba(212,168,67,0.2)', borderRadius:20, padding:'48px 28px', textAlign:'center' }}>
            <div style={{ fontSize:50, marginBottom:18 }}>🔮</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:'#f0d080', marginBottom:8 }}>手相を読み解いています…</div>
            <div style={{ fontSize:12, color:'rgba(253,246,240,0.4)', lineHeight:2 }}>あなたの手が語る言葉に<br />静かに耳を傾けています</div>
          </div>
        )}

        {step === 'result' && (
          <div style={{ background:'rgba(253,246,240,0.04)', border:'1px solid rgba(212,168,67,0.2)', borderRadius:20, padding:'32px 28px' }}>
            <div style={{ textAlign:'center', marginBottom:20 }}>
              <div style={{ fontSize:36, marginBottom:10 }}>✨</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:'#f0d080' }}>鑑定結果</div>
              <div style={{ fontSize:11, color:'rgba(253,246,240,0.4)', marginTop:4 }}>Twinkle Star Oracle より</div>
            </div>
            <div style={{ width:70, height:1, background:'linear-gradient(90deg,transparent,#d4a843,transparent)', margin:'0 auto 16px' }} />
            <div style={{ background:'rgba(253,246,240,0.04)', border:'1px solid rgba(212,168,67,0.15)', borderRadius:14, padding:22, fontSize:13, lineHeight:2, color:'rgba(253,246,240,0.85)', whiteSpace:'pre-wrap', wordBreak:'break-word', marginBottom:16 }}>{result}</div>
            <button onClick={copy} style={{ width:'100%', padding:13, border:`1px solid ${copied?'rgba(240,168,192,0.5)':'rgba(212,168,67,0.4)'}`, borderRadius:12, background:'transparent', color:copied?'#f0a8c0':'#f0d080', fontFamily:"'Noto Serif JP',serif", fontSize:13, cursor:'pointer', marginBottom:10 }}>
              {copied?'✅ コピーしました！':'📋 テキストをコピー'}
            </button>
            <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:12 }}>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('AI手相診断を受けました✨ #TwinkleStarOracle\nhttps://twinkle-lab.jp/star/tesou')}`} target="_blank" rel="noopener noreferrer"
                style={{ padding:'10px 20px', borderRadius:10, border:'1px solid rgba(212,168,67,0.3)', background:'transparent', color:'rgba(253,246,240,0.5)', fontSize:12, textDecoration:'none' }}>𝕏 シェア</a>
              <a href="/star" style={{ padding:'10px 20px', borderRadius:10, border:'1px solid rgba(212,168,67,0.3)', background:'transparent', color:'rgba(253,246,240,0.5)', fontSize:12, textDecoration:'none' }}>🌟 占いポータルへ</a>
            </div>
            <button onClick={reset} style={{ width:'100%', padding:11, border:'none', borderRadius:10, background:'rgba(253,246,240,0.04)', color:'rgba(253,246,240,0.35)', fontFamily:"'Noto Serif JP',serif", fontSize:11, cursor:'pointer' }}>最初からやり直す</button>
          </div>
        )}

        <div style={{ marginTop:24, padding:14, background:'rgba(240,168,192,0.04)', borderRadius:12, fontSize:11, color:'rgba(253,246,240,0.3)', lineHeight:1.9, textAlign:'center' }}>
          ご入力いただいた画像は鑑定後に保持されません<br />結果はコピーして保存してください
        </div>
      </div>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Noto+Serif+JP:wght@300;400&display=swap');"}</style>
    </div>
  )
}
