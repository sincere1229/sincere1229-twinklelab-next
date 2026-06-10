// app/star/tesou-free/page.tsx
'use client'
import { useState } from 'react'
import { buildCliffhangers } from '../../../lib/tesouStock'

export default function TesouFreePage() {
  const [image, setImage] = useState<string | null>(null)
  const [mimeType, setMimeType] = useState('image/jpeg')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) { setError('画像ファイルを選択してください'); return }
    if (file.size > 10 * 1024 * 1024) { setError('10MB以下の画像を選択してください'); return }
    const reader = new FileReader()
    reader.onload = e => {
      const dataUrl = e.target?.result as string
      setImage(dataUrl.split(',')[1]); setMimeType(file.type || 'image/jpeg'); setError('')
    }
    reader.readAsDataURL(file)
  }

  const analyze = async () => {
    if (!image) return
    setLoading(true); setError(''); setResult(null)
    try {
      const res = await fetch('/api/uranai/tesou-free', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, mimeType }),
      })
      const data = await res.json()
      if (data.success && data.result) setResult(data.result)
      else setError(data.error || '診断に失敗しました')
    } catch (err: any) {
      setError(err.message || '診断中にエラーが発生しました')
    } finally { setLoading(false) }
  }

  const reset = () => { setImage(null); setResult(null); setError('') }

  const teal = '#8ad0e0', gold = '#f0d080', goldDeep = '#d4a843'
  const box = { background:'rgba(253,246,240,0.03)', border:'1px solid rgba(74,154,176,0.15)', borderRadius:14, padding:'18px', marginBottom:14 } as const
  const title = { fontSize:13, color:teal, fontWeight:700, margin:'0 0 8px' } as const
  const txt = { fontSize:13, lineHeight:1.9, color:'rgba(253,246,240,0.85)', margin:0 } as const

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#061418,#0a2028,#061418)', padding:'40px 20px 80px', fontFamily:"'Noto Serif JP',serif", color:'#fdf6f0' }}>
      <div style={{ maxWidth:560, margin:'0 auto' }}>

        <div style={{ textAlign:'center', marginBottom:30 }}>
          <div style={{ fontSize:12, letterSpacing:'0.35em', color:goldDeep, textTransform:'uppercase', marginBottom:12 }}>✦ Twinkle Star Oracle ✦</div>
          <div style={{ display:'inline-block', background:'rgba(74,154,176,0.15)', border:'1px solid rgba(74,154,176,0.4)', borderRadius:20, padding:'4px 16px', fontSize:11, color:teal, letterSpacing:'0.15em', marginBottom:14 }}>✨ 完全無料</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:300, marginBottom:6 }}>手相<span style={{ color:teal, fontStyle:'italic' }}>かんたん診断</span></h1>
          <div style={{ width:70, height:1, background:`linear-gradient(90deg,transparent,${goldDeep},transparent)`, margin:'12px auto' }} />
          <p style={{ fontSize:12, color:'rgba(253,246,240,0.45)', lineHeight:1.9 }}>手のひら1枚で、今のあなたを読み解きます<br />登録不要・すぐに結果が出ます</p>
        </div>

        <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(74,154,176,0.22)', borderRadius:20, padding:'30px 26px' }}>

          {!result && !loading && (
            <>
              <div style={{ textAlign:'center', marginBottom:20 }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, color:teal, marginBottom:5 }}>🤚 手相画像をアップロード</div>
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
              {error && <div style={{ background:'rgba(200,96,122,0.1)', border:'1px solid rgba(200,96,122,0.3)', borderRadius:10, padding:'12px 16px', fontSize:12, color:'#f0a8c0', textAlign:'center', marginBottom:12 }}>{error}</div>}
              <button onClick={analyze} disabled={!image}
                style={{ width:'100%', padding:16, border:'none', borderRadius:14, background:'linear-gradient(135deg,#4a9ab0,#8ad0e0,#f0d080)', color:'white', fontSize:14, letterSpacing:'0.1em', cursor:image?'pointer':'not-allowed', opacity:image?1:0.4 }}>
                ✨ 無料で手相を見てもらう
              </button>
            </>
          )}

          {loading && (
            <div style={{ textAlign:'center', padding:'48px 0' }}>
              <div style={{ fontSize:50, marginBottom:18 }}>🌊</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, color:teal, marginBottom:8 }}>手相を読んでいます…</div>
              <div style={{ fontSize:12, color:'rgba(253,246,240,0.4)', lineHeight:2 }}>あなたの手が語りかけています</div>
            </div>
          )}

          {result && (
            <>
              <div style={{ textAlign:'center', marginBottom:16 }}>
                <div style={{ fontSize:36, marginBottom:10 }}>🌊</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, color:teal }}>かんたん手相診断の結果</div>
              </div>
              <div style={{ width:70, height:1, background:`linear-gradient(90deg,transparent,${goldDeep},transparent)`, margin:'0 auto 16px' }} />

              {result.personality && <div style={box}><p style={title}>🌱 性格傾向</p><p style={txt}>{result.personality}</p></div>}
              {result.currentState && <div style={box}><p style={title}>🌊 現在の状態</p><p style={txt}>{result.currentState}</p></div>}
              {result.possibility && (
                <div style={{ ...box, background:'rgba(74,154,176,0.08)', borderColor:'rgba(74,154,176,0.3)' }}>
                  <p style={title}>✨ 可能性</p><p style={txt}>{result.possibility}</p>
                </div>
              )}

              {/* 続きを知りたくなる導線 */}
              <div style={{ background:'linear-gradient(135deg,rgba(200,96,122,0.08),rgba(212,168,67,0.06))', border:`1.5px solid ${goldDeep}`, borderRadius:18, padding:'22px 20px', marginBottom:14 }}>
                <p style={{ fontSize:13, color:'rgba(253,246,240,0.85)', lineHeight:1.9, margin:'0 0 4px', textAlign:'center' }}>
                  今回の手相には、まだ読み解かれていない特徴があります。
                </p>
                <p style={{ fontSize:12, color:'rgba(253,246,240,0.55)', lineHeight:1.8, margin:'0 0 14px', textAlign:'center' }}>
                  仕事運・恋愛運・金運・人生の転機は、詳細診断で確認できます。
                </p>

                <div style={{ display:'grid', gap:8, marginBottom:16 }}>
                  {buildCliffhangers().map((c, i) => (
                    <div key={i} style={{ background:'rgba(6,20,24,0.5)', border:'1px solid rgba(74,154,176,0.2)', borderRadius:12, padding:'12px 14px' }}>
                      <div style={{ fontSize:11, color:teal, marginBottom:4 }}>{c.head}</div>
                      <div style={{ fontSize:13, color:gold, fontWeight:600 }}>「{c.tail}」</div>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:10, letterSpacing:'0.2em', color:goldDeep, textTransform:'uppercase', marginBottom:6 }}>✦ 本来の自分を知る</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, color:gold, marginBottom:12 }}>手相詳細診断 ¥980</div>
                  <a href="/star/tesou"
                    style={{ display:'inline-block', padding:'14px 30px', background:'linear-gradient(135deg,#c8607a,#f0d080)', borderRadius:12, color:'white', fontSize:14, letterSpacing:'0.06em', textDecoration:'none', fontWeight:600 }}>
                    🌙 手相の本当の意味を見る ¥980
                  </a>
                </div>
              </div>

              <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:12 }}>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Twinkle Star Oracleで無料手相診断✨ #手相診断 #TwinkleStarOracle\nhttps://twinkle-lab.jp/star/tesou-free')}`} target="_blank" rel="noopener noreferrer"
                  style={{ padding:'9px 18px', borderRadius:10, border:'1px solid rgba(253,246,240,0.15)', background:'transparent', color:'rgba(253,246,240,0.5)', fontSize:11, textDecoration:'none' }}>𝕏 シェア</a>
                <a href="/star" style={{ padding:'9px 18px', borderRadius:10, border:'1px solid rgba(253,246,240,0.15)', background:'transparent', color:'rgba(253,246,240,0.5)', fontSize:11, textDecoration:'none' }}>🌟 占いポータルへ</a>
              </div>
              <button onClick={reset} style={{ width:'100%', padding:11, border:'none', borderRadius:10, background:'rgba(253,246,240,0.03)', color:'rgba(253,246,240,0.33)', fontSize:11, cursor:'pointer' }}>別の手相を診断する</button>
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
