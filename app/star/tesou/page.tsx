// app/star/tesou/page.tsx
'use client'
import { useState, useRef } from 'react'
import PayjpCheckoutButton from '../../components/PayjpCheckoutButton'
import { CTA_OPTIONS } from '../../../lib/tesouStock'

const CTA_LABEL = `${CTA_OPTIONS[0]} ¥980`
const gold = '#f0d080', goldDeep = '#d4a843'

// PAY.JP公開鍵があるかどうか（無ければ決済準備中の導線に切替）
const PAYJP_READY = !!process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY

const HAND_EXPLAIN = `手相では一般的に、
左手＝生まれ持った本質・才能・潜在的な性格
右手＝現在の状態・社会で発揮している力・未来への変化
を表すと考えられています。
詳細診断では左右両方の手を読み解くことで、本来の自分と現在の自分の関係、人生の流れや今後の可能性まで深く分析します。`

const PAID_TEASERS = [
  { icon:'🔄', label:'本来の自分と現在の自分のズレ' },
  { icon:'💎', label:'隠れた才能' },
  { icon:'💼', label:'仕事運・副業適性' },
  { icon:'💰', label:'金運' },
  { icon:'💗', label:'恋愛運' },
  { icon:'🌅', label:'人生の転機' },
  { icon:'🍀', label:'開運アクション' },
  { icon:'🗺️', label:'人生ロードマップ（30日/90日/半年/1年）' },
]

export default function TesouPage() {
  const [step, setStep] = useState<'top'|'form'|'loading'|'result'>('top')
  const [imageL, setImageL] = useState<string|null>(null)
  const [imageR, setImageR] = useState<string|null>(null)
  const [mimeTypeL, setMimeTypeL] = useState('image/jpeg')
  const [mimeTypeR, setMimeTypeR] = useState('image/jpeg')
  const [memo, setMemo] = useState('')
  const chargeRef = useRef<string>('')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const bothHands = !!(imageL && imageR)

  const handleFile = (side:'L'|'R', file:File) => {
    if (!file.type.startsWith('image/')) { setError('画像ファイルを選択してください'); return }
    if (file.size > 10*1024*1024) { setError('10MB以下の画像を選択してください'); return }
    const reader = new FileReader()
    reader.onload = e => {
      const base64 = (e.target!.result as string).split(',')[1]
      if (side==='L') { setImageL(base64); setMimeTypeL(file.type) } else { setImageR(base64); setMimeTypeR(file.type) }
      setError('')
    }
    reader.readAsDataURL(file)
  }

  // 決済成功時（PAY.JP）
  const onPaid = (chargeId:string) => { chargeRef.current = chargeId; setStep('form') }
  // 決済準備中のテスト導線（鍵が無いとき）
  const startTest = () => { chargeRef.current = 'TEST_BYPASS'; setStep('form') }

  const analyze = async () => {
    if (!bothHands) return
    setStep('loading'); setError('')
    try {
      const res = await fetch('/api/uranai/tesou', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageL, imageR, mimeTypeL, mimeTypeR, memo, chargeId: chargeRef.current }),
      })
      const data = await res.json()
      if (data.success && data.result) { setResult(data.result); setStep('result') }
      else { setError(data.error || '鑑定に失敗しました'); setStep('form') }
    } catch (err:any) { setError(err.message || '鑑定中にエラーが発生しました'); setStep('form') }
  }

  const reset = () => { setStep('top'); setImageL(null); setImageR(null); setMemo(''); setResult(null); chargeRef.current=''; setError('') }

  const inputStyle = { width:'100%', background:'rgba(253,246,240,0.04)', border:'1px solid rgba(212,168,67,0.2)', borderRadius:10, padding:'11px 13px', color:'#fdf6f0', fontFamily:"'Noto Serif JP',serif", fontSize:13, outline:'none', boxSizing:'border-box' as const }
  const box = { background:'rgba(253,246,240,0.04)', border:'1px solid rgba(212,168,67,0.15)', borderRadius:14, padding:'18px', marginBottom:14 } as const
  const title = { fontSize:13, color:gold, fontWeight:700, margin:'0 0 8px' } as const
  const txt = { fontSize:13, lineHeight:1.9, color:'rgba(253,246,240,0.85)', margin:0, whiteSpace:'pre-wrap' as const } as const

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#1a0a10,#2a1020,#1a0818)', padding:'40px 20px 80px', fontFamily:"'Noto Serif JP',serif", color:'#fdf6f0' }}>
      <div style={{ maxWidth:580, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:30 }}>
          <div style={{ fontSize:12, letterSpacing:'0.3em', color:goldDeep, textTransform:'uppercase', marginBottom:12 }}>✦ Twinkle Star Oracle ✦</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:300, marginBottom:6 }}>手相<span style={{ color:gold, fontStyle:'italic' }}>詳細診断</span></h1>
          <div style={{ width:70, height:1, background:`linear-gradient(90deg,transparent,${goldDeep},transparent)`, margin:'12px auto' }} />
          <p style={{ fontSize:13, color:gold, lineHeight:1.7, fontWeight:600 }}>左右両方の手から読み解く、本格手相鑑定</p>
        </div>

        {/* トップ：訴求＋説明＋ロック＋導線 */}
        {step === 'top' && (
          <div style={{ background:'rgba(253,246,240,0.04)', border:`1.5px solid ${goldDeep}`, borderRadius:20, padding:'28px 24px' }}>
            <div style={{ textAlign:'center', marginBottom:16 }}>
              <div style={{ fontSize:34, marginBottom:8 }}>🤚🤚</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:gold }}>本来の自分を知る、手相詳細診断 ¥980</div>
            </div>

            {/* 無料との違い */}
            <div style={{ display:'flex', gap:10, marginBottom:16 }}>
              <div style={{ flex:1, background:'rgba(74,154,176,0.08)', border:'1px solid rgba(74,154,176,0.25)', borderRadius:12, padding:'12px', textAlign:'center' }}>
                <div style={{ fontSize:11, color:'#8ad0e0', marginBottom:4 }}>無料診断</div>
                <div style={{ fontSize:12, color:'rgba(253,246,240,0.7)' }}>片手のみ・簡易</div>
              </div>
              <div style={{ flex:1, background:'rgba(212,168,67,0.1)', border:`1px solid ${goldDeep}`, borderRadius:12, padding:'12px', textAlign:'center' }}>
                <div style={{ fontSize:11, color:gold, marginBottom:4 }}>詳細診断 ¥980</div>
                <div style={{ fontSize:12, color:'rgba(253,246,240,0.85)', fontWeight:600 }}>左右両手を分析</div>
              </div>
            </div>

            {/* 左手・右手の説明 */}
            <div style={{ background:'rgba(253,246,240,0.03)', borderLeft:`2px solid ${goldDeep}`, borderRadius:8, padding:'14px 16px', marginBottom:18 }}>
              <p style={{ fontSize:12, color:'rgba(253,246,240,0.78)', lineHeight:1.9, margin:0, whiteSpace:'pre-wrap' }}>{HAND_EXPLAIN}</p>
            </div>

            <p style={{ fontSize:12, color:gold, fontWeight:700, margin:'0 0 10px' }}>🔒 詳細診断でわかること</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:18 }}>
              {PAID_TEASERS.map(t=>(
                <div key={t.label} style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(253,246,240,0.03)', borderRadius:10, padding:'10px', border:'1px solid rgba(212,168,67,0.15)' }}>
                  <span style={{ fontSize:16 }}>{t.icon}</span>
                  <span style={{ fontSize:11, color:'rgba(253,246,240,0.85)', flex:1 }}>{t.label}</span>
                  <span style={{ fontSize:11, opacity:0.5 }}>🔒</span>
                </div>
              ))}
            </div>

            {error && <p style={{ color:'#f0a8c0', fontSize:13, textAlign:'center', marginBottom:10 }}>{error}</p>}

            {PAYJP_READY ? (
              <PayjpCheckoutButton product="tesou" label={CTA_LABEL} onPaid={onPaid} />
            ) : (
              <>
                <button onClick={startTest}
                  style={{ width:'100%', padding:17, border:'none', borderRadius:14, background:'linear-gradient(135deg,#c8607a,#f0d080)', color:'white', fontSize:15, fontWeight:600, letterSpacing:'0.06em', cursor:'pointer' }}>
                  🌙 {CTA_LABEL}
                </button>
                <p style={{ fontSize:11, color:'rgba(253,246,240,0.4)', textAlign:'center', margin:'10px 0 0' }}>※ 決済は準備中です。先に詳細診断の流れ（画像アップロード）をご確認いただけます</p>
              </>
            )}
            <p style={{ fontSize:11, color:'rgba(253,246,240,0.35)', textAlign:'center', marginTop:10 }}>決済後、左右の手相画像をアップロードして鑑定をお受け取りいただけます</p>
            <a href="/star/tesou-free" style={{ display:'block', textAlign:'center', marginTop:14, fontSize:12, color:'rgba(138,208,224,0.75)', textDecoration:'none' }}>← まずは無料のかんたん診断（片手）を試す</a>
            <a href="/star" style={{ display:'block', textAlign:'center', marginTop:8, fontSize:12, color:'rgba(253,246,240,0.4)', textDecoration:'none' }}>占いポータルに戻る</a>
          </div>
        )}

        {/* 決済後：左右両手アップロード */}
        {step === 'form' && (
          <div style={{ background:'rgba(253,246,240,0.04)', border:'1px solid rgba(212,168,67,0.2)', borderRadius:20, padding:'30px 26px' }}>
            <div style={{ background:'rgba(212,168,67,0.08)', border:'1px solid rgba(212,168,67,0.25)', borderRadius:12, padding:'14px 18px', textAlign:'center', fontSize:13, color:gold, marginBottom:20 }}>
              {chargeRef.current === 'TEST_BYPASS' ? '🧪 テスト導線（決済準備中）' : '✅ お支払いが完了しました！'}<br />
              <span style={{ fontSize:11, color:'rgba(253,246,240,0.5)' }}>左手・右手の2枚をアップロードしてください</span>
            </div>
            <div style={{ background:'rgba(253,246,240,0.03)', borderLeft:`2px solid ${goldDeep}`, borderRadius:8, padding:'12px 14px', marginBottom:16 }}>
              <p style={{ fontSize:11.5, color:'rgba(253,246,240,0.7)', lineHeight:1.8, margin:0 }}>左手＝本来の資質・才能、右手＝現在の生き方・これから。両方を読み解いて「本来の自分と今の自分のズレ」まで分析します。</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
              {(['L','R'] as const).map(side=>(
                <div key={side}>
                  <div style={{ fontSize:11, color:'rgba(253,246,240,0.55)', textAlign:'center', marginBottom:6 }}>{side==='L'?'🤚 左手（本来の自分）':'🤚 右手（今の自分）'}</div>
                  {(side==='L'?imageL:imageR) ? (
                    <div style={{ position:'relative' }}>
                      <img src={`data:${side==='L'?mimeTypeL:mimeTypeR};base64,${side==='L'?imageL:imageR}`} style={{ width:'100%', borderRadius:10, border:'1px solid rgba(212,168,67,0.3)', maxHeight:160, objectFit:'cover' }} alt="" />
                      <button onClick={()=>side==='L'?setImageL(null):setImageR(null)} style={{ position:'absolute', top:6, right:6, background:'rgba(200,96,122,0.8)', border:'none', color:'white', width:24, height:24, borderRadius:'50%', cursor:'pointer', fontSize:12 }}>✕</button>
                    </div>
                  ) : (
                    <label style={{ border:`2px dashed ${(side==='L'?imageL:imageR)?'rgba(212,168,67,0.3)':'rgba(212,168,67,0.4)'}`, borderRadius:14, padding:'24px 10px', textAlign:'center', cursor:'pointer', display:'block', background:'rgba(212,168,67,0.02)' }}>
                      <input type="file" accept="image/*" style={{ display:'none' }} onChange={e=>e.target.files?.[0]&&handleFile(side,e.target.files[0])} />
                      <div style={{ fontSize:24, marginBottom:6 }}>{side==='L'?'✋':'🤚'}</div>
                      <div style={{ fontSize:11, color:'rgba(253,246,240,0.6)' }}>タップして選択</div>
                    </label>
                  )}
                </div>
              ))}
            </div>
            <div style={{ fontSize:10, color: bothHands ? 'rgba(138,208,224,0.7)' : 'rgba(253,246,240,0.4)', textAlign:'center', marginBottom:14 }}>
              {bothHands ? '✓ 左右そろいました' : '※ 詳細診断は左右両方の手が必要です'}
            </div>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:12, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>💭 気になることがあればお書きください（任意）</div>
              <textarea value={memo} onChange={e=>setMemo(e.target.value)} placeholder="例：恋愛のこと、仕事のこと、最近気になっていること"
                style={{...inputStyle, resize:'none', height:80, lineHeight:1.7}} />
            </div>
            {error && <div style={{ background:'rgba(200,96,122,0.1)', border:'1px solid rgba(200,96,122,0.3)', borderRadius:10, padding:'12px 16px', fontSize:12, color:'#f0a8c0', textAlign:'center', marginBottom:12 }}>{error}</div>}
            <button onClick={analyze} disabled={!bothHands}
              style={{ width:'100%', padding:16, border:'none', borderRadius:14, background:'linear-gradient(135deg,#c8607a,#f0d080)', color:'white', fontSize:14, letterSpacing:'0.1em', cursor:bothHands?'pointer':'not-allowed', opacity:bothHands?1:0.4 }}>
              ✨ 左右両手から手相詳細診断を受け取る
            </button>
          </div>
        )}

        {step === 'loading' && (
          <div style={{ background:'rgba(253,246,240,0.04)', border:'1px solid rgba(212,168,67,0.2)', borderRadius:20, padding:'48px 28px', textAlign:'center' }}>
            <div style={{ fontSize:50, marginBottom:18 }}>🔮</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:gold, marginBottom:8 }}>本来のあなたを読み解いています…</div>
            <div style={{ fontSize:12, color:'rgba(253,246,240,0.4)', lineHeight:2 }}>左右の手から、資質と今の流れを分析しています</div>
          </div>
        )}

        {/* 詳細結果 */}
        {step === 'result' && result && (
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:'linear-gradient(135deg,rgba(200,96,122,0.15),rgba(240,208,128,0.1))', border:`1px solid ${goldDeep}`, borderRadius:14, padding:12, marginBottom:16 }}>
              <span style={{ fontSize:18 }}>✨</span><span style={{ fontSize:13, fontWeight:900, color:gold }}>本来のあなたを読み解きました</span>
            </div>
            {result.specialNote && (
              <div style={{ ...box, textAlign:'center', background:'linear-gradient(135deg,rgba(240,208,128,0.14),rgba(200,96,122,0.08))', borderColor:goldDeep }}>
                <span style={{ fontSize:13, color:gold, fontWeight:600 }}>🌟 {result.specialNote}</span>
              </div>
            )}
            {result.gapAnalysis && (
              <div style={{ ...box, background:'rgba(200,96,122,0.06)', borderColor:'rgba(200,96,122,0.3)' }}>
                <p style={title}>🔄 本来の自分と、今の自分のズレ</p><p style={txt}>{result.gapAnalysis}</p>
              </div>
            )}
            {result.hiddenTalent && <div style={box}><p style={title}>💎 あなたの隠れた才能</p><p style={txt}>{result.hiddenTalent}</p></div>}
            {result.work && <div style={box}><p style={title}>💼 仕事運・副業適性</p><p style={txt}>{result.work}</p></div>}
            {result.money && <div style={box}><p style={title}>💰 金運</p><p style={txt}>{result.money}</p></div>}
            {result.love && <div style={box}><p style={title}>💗 恋愛運</p><p style={txt}>{result.love}</p></div>}
            {result.turningPoint && (
              <div style={{ ...box, background:'rgba(240,208,128,0.07)', borderColor:'rgba(240,208,128,0.3)' }}>
                <p style={title}>🌅 人生の転機</p><p style={txt}>{result.turningPoint}</p>
              </div>
            )}
            {Array.isArray(result.luckActions) && result.luckActions.length>0 && (
              <div style={box}><p style={title}>🍀 開運アクション</p>
                {result.luckActions.map((a:string,i:number)=>(
                  <div key={i} style={{ fontSize:12.5, color:'rgba(253,246,240,0.82)', lineHeight:1.8, marginBottom:6 }}><span style={{ color:goldDeep, marginRight:8 }}>✦</span>{a}</div>
                ))}
              </div>
            )}
            {Array.isArray(result.roadmap) && result.roadmap.length>0 && (
              <div style={{ ...box, background:'linear-gradient(135deg,rgba(200,96,122,0.08),rgba(26,10,16,0.4))', borderColor:'rgba(212,168,67,0.3)' }}>
                <p style={title}>🗺️ あなた専用ロードマップ</p>
                {result.roadmap.map((r:any,i:number)=>(
                  <div key={i} style={{ display:'flex', gap:12, marginBottom:12, paddingBottom:12, borderBottom:i<result.roadmap.length-1?'1px solid rgba(212,168,67,0.15)':'none' }}>
                    <div style={{ fontSize:12, fontWeight:700, color:gold, minWidth:64 }}>🗓 {r.period}</div>
                    <div style={{ fontSize:12.5, color:'rgba(253,246,240,0.85)', lineHeight:1.7, flex:1 }}>{r.action}</div>
                  </div>
                ))}
              </div>
            )}
            {result.piyochanMessage && (
              <div style={{ background:'rgba(240,208,128,0.07)', border:'1px solid rgba(240,208,128,0.25)', borderRadius:16, padding:'20px', textAlign:'center', marginBottom:14 }}>
                <div style={{ fontSize:30, marginBottom:6 }}>🐥</div>
                <p style={{ fontSize:13, color:gold, lineHeight:1.8, margin:0 }}>{result.piyochanMessage}</p>
              </div>
            )}
            {result.disclaimer && <p style={{ fontSize:11, color:'rgba(253,246,240,0.4)', lineHeight:1.6, textAlign:'center', padding:12, border:'1px solid rgba(212,168,67,0.2)', borderRadius:10, marginBottom:14 }}>{result.disclaimer}</p>}
            <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:12 }}>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('手相詳細診断で本来の自分を読み解きました✨ #TwinkleStarOracle\nhttps://twinkle-lab.jp/star/tesou-free')}`} target="_blank" rel="noopener noreferrer"
                style={{ padding:'10px 20px', borderRadius:10, border:'1px solid rgba(212,168,67,0.3)', background:'transparent', color:'rgba(253,246,240,0.5)', fontSize:12, textDecoration:'none' }}>𝕏 シェア</a>
              <a href="/star" style={{ padding:'10px 20px', borderRadius:10, border:'1px solid rgba(212,168,67,0.3)', background:'transparent', color:'rgba(253,246,240,0.5)', fontSize:12, textDecoration:'none' }}>🌟 占いポータルへ</a>
            </div>
            <button onClick={reset} style={{ width:'100%', padding:11, border:'none', borderRadius:10, background:'rgba(253,246,240,0.04)', color:'rgba(253,246,240,0.35)', fontSize:11, cursor:'pointer' }}>最初からやり直す</button>
          </div>
        )}

      </div>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Noto+Serif+JP:wght@300;400&display=swap');"}</style>
    </div>
  )
}
