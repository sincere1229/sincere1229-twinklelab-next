'use client'
import { useState } from 'react'

export default function TesouFreePage() {
  const [image, setImage] = useState<string | null>(null)
  const [mimeType, setMimeType] = useState('image/jpeg')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) { setError('画像ファイルを選択してください'); return }
    if (file.size > 10 * 1024 * 1024) { setError('10MB以下の画像を選択してください'); return }
    const reader = new FileReader()
    reader.onload = e => {
      const dataUrl = e.target?.result as string
      setImage(dataUrl.split(',')[1])
      setMimeType(file.type || 'image/jpeg')
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const analyze = async () => {
    if (!image) return
    setLoading(true); setError(''); setResult('')
    try {
      const res = await fetch('/api/uranai/tesou-free', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, mimeType }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '診断に失敗しました')
      setResult(data.result)
    } catch (err: any) {
      setError(err.message || '診断中にエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const copy = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const reset = () => {
    setImage(null); setResult(''); setError('')
  }

  const shareText = result
    ? `🌊 Twinkle Star Oracleで無料手相診断を受けました✨\n\n${result.substring(0, 60)}…\n\n#手相診断 #TwinkleStarOracle\nhttps://twinkle-lab.jp/star`
    : ''

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#061418,#0a2028,#061418)', padding:'40px 20px 80px', fontFamily:"'Noto Serif JP',serif", color:'#fdf6f0' }}>
      <div style={{ maxWidth:560, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div style={{ fontSize:12, letterSpacing:'0.35em', color:'#d4a843', textTransform:'uppercase', marginBottom:12 }}>✦ Twinkle Star Oracle ✦</div>
          <div style={{ display:'inline-block', background:'rgba(74,154,176,0.15)', border:'1px solid rgba(74,154,176,0.4)', borderRadius:20, padding:'4px 16px', fontSize:11, color:'#8ad0e0', letterSpacing:'0.15em', marginBottom:14 }}>✨ 完全無料</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:300, marginBottom:6 }}>
            手相<span style={{ color:'#8ad0e0', fontStyle:'italic' }}>かんたん診断</span>
          </h1>
          <div style={{ width:70, height:1, background:'linear-gradient(90deg,transparent,#d4a843,transparent)', margin:'12px auto' }} />
          <p style={{ fontSize:12, color:'rgba(253,246,240,0.45)', lineHeight:1.9 }}>手のひら1枚で、今のあなたを読み解きます<br />登録不要・すぐに結果が出ます</p>
        </div>

        {/* Card */}
        <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(74,154,176,0.22)', borderRadius:20, padding:'30px 26px', backdropFilter:'blur(12px)' }}>

          {!result && !loading && (
            <>
              <div style={{ textAlign:'center', marginBottom:20 }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, color:'#8ad0e0', marginBottom:5 }}>🤚 手相画像をアップロード</div>
                <p style={{ fontSize:12, color:'rgba(253,246,240,0.4)', lineHeight:1.8 }}>どちらの手でもOK・明るい場所で撮るとGOOD</p>
              </div>

              {image ? (
                <div style={{ position:'relative', marginBottom:16 }}>
                  <img src={`data:${mimeType};base64,${image}`} style={{ width:'100%', borderRadius:12, border:'1px solid rgba(74,154,176,0.3)', maxHeight:260, objectFit:'cover' }} alt="手相" />
                  <button onClick={()=>setImage(null)} style={{ position:'absolute', top:8, right:8, background:'rgba(200,96,122,0.8)', border:'none', color:'white', width:26, height:26, borderRadius:'50%', cursor:'pointer', fontSize:13 }}>✕</button>
                </div>
              ) : (
                <label style={{ border:'2px dashed rgba(74,154,176,0.3)', borderRadius:16, padding:'44px 20px', textAlign:'center', cursor:'pointer', display:'block', background:'rgba(74,154,176,0.02)', marginBottom:16 }}>
                  <input type="file" accept="image/*" style={{ display:'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
                  <div style={{ fontSize:44, marginBottom:12 }}>🌊</div>
                  <div style={{ fontSize:14, color:'rgba(253,246,240,0.65)', marginBottom:5 }}>写真をタップして選択</div>
                  <div style={{ fontSize:11, color:'rgba(253,246,240,0.35)' }}>JPG・PNG・HEIC対応</div>
                </label>
              )}

              <div style={{ padding:'14px 16px', background:'rgba(74,154,176,0.05)', borderRadius:12, borderLeft:'2px solid rgba(74,154,176,0.5)', marginBottom:16 }}>
                <div style={{ fontSize:11, color:'#8ad0e0', marginBottom:7 }}>📸 きれいに撮るコツ</div>
                <ul style={{ listStyle:'none', fontSize:11, color:'rgba(253,246,240,0.45)', lineHeight:1.9, padding:0 }}>
                  <li>✦ 手のひらを広げて線がよく見えるように</li>
                  <li>✦ 自然光または明るい室内で</li>
                  <li>✦ ピントを合わせて撮影</li>
                </ul>
              </div>

              {error && <div style={{ background:'rgba(200,96,122,0.1)', border:'1px solid rgba(200,96,122,0.3)', borderRadius:10, padding:'12px 16px', fontSize:12, color:'#f0a8c0', textAlign:'center', marginBottom:12 }}>{error}</div>}

              <button onClick={analyze} disabled={!image}
                style={{ width:'100%', padding:16, border:'none', borderRadius:14, background:'linear-gradient(135deg,#4a9ab0,#8ad0e0,#f0d080)', color:'white', fontFamily:"'Noto Serif JP',serif", fontSize:14, letterSpacing:'0.1em', cursor:image?'pointer':'not-allowed', opacity:image?1:0.4, transition:'all 0.3s' }}>
                ✨ 無料で手相を見てもらう
              </button>
            </>
          )}

          {loading && (
            <div style={{ textAlign:'center', padding:'48px 0' }}>
              <div style={{ fontSize:50, marginBottom:18 }}>🌊</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, color:'#8ad0e0', marginBottom:8 }}>手相を読んでいます…</div>
              <div style={{ fontSize:12, color:'rgba(253,246,240,0.4)', lineHeight:2 }}>あなたの手が語りかけています<br />少しだけお待ちください</div>
            </div>
          )}

          {result && (
            <>
              <div style={{ textAlign:'center', marginBottom:16 }}>
                <div style={{ fontSize:36, marginBottom:10 }}>🌊</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, color:'#8ad0e0' }}>かんたん手相診断の結果</div>
              </div>
              <div style={{ width:70, height:1, background:'linear-gradient(90deg,transparent,#d4a843,transparent)', margin:'0 auto 16px' }} />

              <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(74,154,176,0.15)', borderRadius:14, padding:22, fontSize:13, lineHeight:2.1, color:'rgba(253,246,240,0.85)', whiteSpace:'pre-wrap', wordBreak:'break-word', marginBottom:16 }}>
                {result}
              </div>

              {/* Upsell */}
              <div style={{ padding:20, background:'linear-gradient(135deg,rgba(200,96,122,0.08),rgba(212,168,67,0.06))', border:'1px solid rgba(212,168,67,0.25)', borderRadius:16, textAlign:'center', marginBottom:14 }}>
                <div style={{ fontSize:10, letterSpacing:'0.2em', color:'#d4a843', textTransform:'uppercase', marginBottom:8 }}>✦ もっと深く知りたい方へ</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, color:'#f0d080', marginBottom:6 }}>手相詳細診断 ¥980</div>
                <div style={{ fontSize:12, color:'rgba(253,246,240,0.5)', lineHeight:1.8, marginBottom:14 }}>
                  左右両手の詳細分析・本来の自分との「ズレ」分析<br />
                  行動アドバイス3つ・未来の流れまで<br />
                  1000文字以上の本格リーディング
                </div>
                <a href="https://buy.stripe.com/00w14g2j46C66oBcFl33W04" target="_blank"
                  style={{ display:'inline-block', padding:'13px 28px', background:'linear-gradient(135deg,#c8607a,#f0d080)', borderRadius:12, color:'white', fontFamily:"'Noto Serif JP',serif", fontSize:13, letterSpacing:'0.08em', textDecoration:'none' }}>
                  🌙 ¥980 詳細診断を受ける
                </a>
              </div>

              {/* Share */}
              <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:12 }}>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank"
                  style={{ padding:'9px 18px', borderRadius:10, border:'1px solid rgba(253,246,240,0.15)', background:'transparent', color:'rgba(253,246,240,0.5)', fontFamily:"'Noto Serif JP',serif", fontSize:11, textDecoration:'none' }}>
                  𝕏 シェア
                </a>
                <a href="/star" style={{ padding:'9px 18px', borderRadius:10, border:'1px solid rgba(253,246,240,0.15)', background:'transparent', color:'rgba(253,246,240,0.5)', fontFamily:"'Noto Serif JP',serif", fontSize:11, textDecoration:'none' }}>
                  🌟 占いポータルへ
                </a>
              </div>

              <button onClick={reset} style={{ width:'100%', padding:11, border:'none', borderRadius:10, background:'rgba(253,246,240,0.03)', color:'rgba(253,246,240,0.33)', fontFamily:"'Noto Serif JP',serif", fontSize:11, cursor:'pointer' }}>
                別の手相を診断する
              </button>
            </>
          )}
        </div>

        <div style={{ marginTop:24, padding:14, background:'rgba(74,154,176,0.04)', borderRadius:12, fontSize:11, color:'rgba(253,246,240,0.28)', lineHeight:1.9, textAlign:'center' }}>
          画像は鑑定後に保持されません<br />個人情報の入力は不要です
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Noto+Serif+JP:wght@300;400&display=swap');`}</style>
    </div>
  )
}
