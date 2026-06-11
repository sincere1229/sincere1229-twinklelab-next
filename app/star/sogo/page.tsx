// app/star/sogo/page.tsx
'use client'
import { useState, useRef } from 'react'
import PayjpCheckoutButton from '../../components/PayjpCheckoutButton'
import { buildCliffhangers, CTA_OPTIONS } from '../../../lib/sogoStock'

const DECK = [
  {num:'0',name:'愚者',img:'/tarot/card_00_fool.jpg'},{num:'I',name:'魔術師',img:'/tarot/card_01_magician.jpg'},
  {num:'II',name:'女教皇',img:'/tarot/card_02_high-priestess.jpg'},{num:'III',name:'女帝',img:'/tarot/card_03_empress.jpg'},
  {num:'IV',name:'皇帝',img:'/tarot/card_04_emperor.jpg'},{num:'V',name:'法王',img:'/tarot/card_05_hierophant.jpg'},
  {num:'VI',name:'恋人',img:'/tarot/card_06_lovers.jpg'},{num:'VII',name:'戦車',img:'/tarot/card_07_chariot.jpg'},
  {num:'VIII',name:'力',img:'/tarot/card_08_strength.jpg'},{num:'IX',name:'隠者',img:'/tarot/card_09_hermit.jpg'},
  {num:'X',name:'運命の輪',img:'/tarot/card_10_wheel-of-fortune.jpg'},{num:'XI',name:'正義',img:'/tarot/card_11_justice.jpg'},
  {num:'XII',name:'吊られた男',img:'/tarot/card_12_hanged-man.jpg'},{num:'XIII',name:'死神',img:'/tarot/card_13_death.jpg'},
  {num:'XIV',name:'節制',img:'/tarot/card_14_temperance.jpg'},{num:'XV',name:'悪魔',img:'/tarot/card_15_devil.jpg'},
  {num:'XVI',name:'塔',img:'/tarot/card_16_tower.jpg'},{num:'XVII',name:'星',img:'/tarot/card_17_star.jpg'},
  {num:'XVIII',name:'月',img:'/tarot/card_18_moon.jpg'},{num:'XIX',name:'太陽',img:'/tarot/card_19_sun.jpg'},
  {num:'XX',name:'審判',img:'/tarot/card_20_judgement.jpg'},{num:'XXI',name:'世界',img:'/tarot/card_21_world.jpg'},
]
const POSITIONS = ['過去','現在','未来','課題','アドバイス']
const drawCards = () => [...DECK].sort(()=>Math.random()-0.5).slice(0,5).map((c,i)=>({...c, position:POSITIONS[i], reversed:Math.random()>0.7}))

const CTA_LABEL = `${CTA_OPTIONS[0]} ¥3,980`

const purple = '#c4a0d8', gold = '#f0d080', goldDeep = '#d4a843'

const PAID_TEASERS = [
  { icon:'💗', label:'恋愛運（出会い・関係・流れ）' },
  { icon:'💼', label:'仕事運（適職・転職・才能）' },
  { icon:'💰', label:'金運（収入・付き合い方）' },
  { icon:'🤝', label:'人間関係（大切な縁・離れる縁）' },
  { icon:'🍀', label:'開運アクション' },
  { icon:'🗓', label:'人生ロードマップ（30日/90日/半年/1年）' },
]

export default function SogoPage() {
  const [step, setStep] = useState<'form'|'loadingFree'|'free'|'palmUpload'|'loadingPaid'|'paid'>('form')
  const [name, setName] = useState(''); const [gender, setGender] = useState('')
  const [birthdate, setBirthdate] = useState(''); const [birthtime, setBirthtime] = useState('')
  const [birthplace, setBirthplace] = useState(''); const [concern, setConcern] = useState('')
  const [imageL, setImageL] = useState<string|null>(null); const [imageR, setImageR] = useState<string|null>(null)
  const [mimeTypeL, setMimeTypeL] = useState('image/jpeg'); const [mimeTypeR, setMimeTypeR] = useState('image/jpeg')
  const cardsRef = useRef<any[]>([])
  const [freeResult, setFreeResult] = useState<any>(null)
  const [paidResult, setPaidResult] = useState<any>(null)
  const chargeRef = useRef<string>('')
  const [error, setError] = useState('')

  const canStart = name && gender && birthdate && concern

  const handleImage = (side:'L'|'R', file:File) => {
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

  const base = () => ({ name, gender, birthdate, birthtime, birthplace, concern, cards: cardsRef.current })

  const handleFree = async () => {
    if (!canStart) return
    cardsRef.current = drawCards()
    setStep('loadingFree'); setError('')
    try {
      const res = await fetch('/api/uranai/sogo', { method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ ...base(), mode:'free' }) })
      const data = await res.json()
      if (data.success && data.result) { setFreeResult(data.result); setStep('free') }
      else { setError(data.error || 'エラーが発生しました'); setStep('form') }
    } catch { setError('通信エラーが発生しました。'); setStep('form') }
  }

  const onPaid = (chargeId:string) => { chargeRef.current = chargeId; setStep('palmUpload') }

  const handleGeneratePaid = async () => {
    setStep('loadingPaid'); setError('')
    try {
      const res = await fetch('/api/uranai/sogo', { method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ ...base(), mode:'paid', chargeId: chargeRef.current, imageL, imageR, mimeTypeL, mimeTypeR }) })
      const data = await res.json()
      if (data.success && data.result) { setPaidResult(data.result); setStep('paid') }
      else { setError(data.error || '鑑定の生成に失敗しました。お手数ですがお問い合わせください。'); setStep('palmUpload') }
    } catch { setError('通信エラーが発生しました。'); setStep('palmUpload') }
  }

  const reset = () => {
    setStep('form'); setName(''); setGender(''); setBirthdate(''); setBirthtime(''); setBirthplace(''); setConcern('')
    setImageL(null); setImageR(null); setFreeResult(null); setPaidResult(null); chargeRef.current=''; setError('')
  }

  const inputStyle = { width:'100%', background:'rgba(253,246,240,0.04)', border:'1px solid rgba(155,106,176,0.25)', borderRadius:10, padding:'11px 13px', color:'#fdf6f0', fontFamily:"'Noto Serif JP',serif", fontSize:13, outline:'none', boxSizing:'border-box' as const }
  const box = { background:'rgba(253,246,240,0.03)', border:'1px solid rgba(155,106,176,0.18)', borderRadius:14, padding:'18px', marginBottom:14 } as const
  const title = { fontSize:13, color:gold, fontWeight:700, margin:'0 0 8px' } as const
  const txt = { fontSize:13, lineHeight:1.9, color:'rgba(253,246,240,0.85)', margin:0, whiteSpace:'pre-wrap' as const }

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#120818,#1e0a28,#120618)', padding:'40px 20px 80px', fontFamily:"'Noto Serif JP',serif", color:'#fdf6f0' }}>
      <div style={{ maxWidth:620, margin:'0 auto' }}>

        <div style={{ textAlign:'center', marginBottom:34 }}>
          <div style={{ fontSize:12, letterSpacing:'0.35em', color:goldDeep, textTransform:'uppercase', marginBottom:12 }}>✦ Twinkle Star Oracle ✦</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:300, marginBottom:6 }}>人生<span style={{ color:purple, fontStyle:'italic' }}>ロードマップ鑑定</span></h1>
          <div style={{ width:70, height:1, background:`linear-gradient(90deg,transparent,${goldDeep},transparent)`, margin:'12px auto' }} />
          <p style={{ fontSize:12, color:'rgba(253,246,240,0.45)', lineHeight:1.9 }}>手相・タロット・数秘・星を統合し、<br />「これからどう進むか」を設計する最上位鑑定</p>
        </div>

        {/* 入力 */}
        {step === 'form' && (
          <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(155,106,176,0.25)', borderRadius:20, padding:'30px 26px' }}>
            <div style={{ textAlign:'center', marginBottom:18 }}>
              <div style={{ fontSize:34, marginBottom:10 }}>🔮</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:purple }}>まずは無料で、今の人生地図を見てみましょう</div>
              <p style={{ fontSize:11, color:'rgba(253,246,240,0.4)', marginTop:6 }}>無料・登録不要（手相画像は完全版のときに使います）</p>
            </div>
            <div style={{ display:'grid', gap:14 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>お名前 *</div><input style={inputStyle} value={name} onChange={e=>setName(e.target.value)} placeholder="山田 花子" /></div>
                <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>性別 *</div>
                  <select style={{...inputStyle, backgroundColor:'#1e0a28'}} value={gender} onChange={e=>setGender(e.target.value)}>
                    <option value="">選択</option><option value="女性">女性</option><option value="男性">男性</option><option value="その他">その他</option>
                  </select>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>生年月日 *</div><input style={inputStyle} type="date" value={birthdate} onChange={e=>setBirthdate(e.target.value)} /></div>
                <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>出生時間（任意）</div><input style={inputStyle} type="time" value={birthtime} onChange={e=>setBirthtime(e.target.value)} /></div>
              </div>
              <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>出生地（任意）</div><input style={inputStyle} value={birthplace} onChange={e=>setBirthplace(e.target.value)} placeholder="例：東京都新宿区" /></div>
              <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>いま向き合っていること *</div>
                <textarea style={{...inputStyle, resize:'none', height:80, lineHeight:1.7}} value={concern} onChange={e=>setConcern(e.target.value)} placeholder="例：これからの生き方に迷っています。" />
              </div>
            </div>
            {error && <div style={{ background:'rgba(200,96,122,0.1)', border:'1px solid rgba(200,96,122,0.3)', borderRadius:10, padding:'12px 16px', fontSize:12, color:'#f0a8c0', textAlign:'center', marginTop:12 }}>{error}</div>}
            <button onClick={handleFree} disabled={!canStart}
              style={{ width:'100%', padding:16, border:'none', borderRadius:14, background:'linear-gradient(135deg,#9b6ab0,#c4a0d8,#f0d080)', color:'white', fontSize:15, letterSpacing:'0.08em', cursor:canStart?'pointer':'not-allowed', opacity:canStart?1:0.4, marginTop:18 }}>
              🆓 無料で人生地図を見る
            </button>
            <a href="/star" style={{ display:'block', textAlign:'center', marginTop:14, fontSize:12, color:'rgba(253,246,240,0.4)', textDecoration:'none' }}>← 占いポータルに戻る</a>
          </div>
        )}

        {(step === 'loadingFree' || step === 'loadingPaid') && (
          <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(155,106,176,0.25)', borderRadius:20, padding:'52px 28px', textAlign:'center' }}>
            <div style={{ fontSize:52, marginBottom:18 }}>🌟</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:purple, marginBottom:8 }}>{step==='loadingPaid' ? '人生の地図を描いています…' : '今の人生地図を読み解いています…'}</div>
            <div style={{ fontSize:12, color:'rgba(253,246,240,0.4)', lineHeight:2.2 }}>手相・タロット・数秘・星を統合しています</div>
          </div>
        )}

        {/* 無料の俯瞰 */}
        {step === 'free' && freeResult && (
          <div>
            <div style={{ ...box, textAlign:'center', background:'linear-gradient(135deg,rgba(155,106,176,0.1),rgba(30,10,40,0.5))' }}>
              <p style={{ fontSize:11, color:'rgba(253,246,240,0.45)', margin:'0 0 4px' }}>あなたの現在地</p>
              <p style={{ fontSize:15, color:'#fdf6f0', lineHeight:1.8, margin:0 }}>{freeResult.currentPosition}</p>
            </div>

            {Array.isArray(freeResult.lifeThemes) && freeResult.lifeThemes.length>0 && (
              <div style={{ ...box, textAlign:'center' }}>
                <p style={title}>🧭 今後の人生テーマ</p>
                <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', marginTop:4 }}>
                  {freeResult.lifeThemes.map((t:string,i:number)=>(
                    <span key={i} style={{ fontSize:14, color:purple, border:`1px solid rgba(196,160,216,0.4)`, borderRadius:999, padding:'6px 16px' }}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {freeResult.strength && <div style={box}><p style={title}>💪 あなたの強み</p><p style={txt}>{freeResult.strength}</p></div>}
            {freeResult.possibility && (
              <div style={{ ...box, background:'rgba(196,160,216,0.08)', borderColor:'rgba(196,160,216,0.3)' }}>
                <p style={title}>✨ これからの可能性</p><p style={txt}>{freeResult.possibility}</p>
              </div>
            )}
            {freeResult.specialNote && (
              <div style={{ background:'linear-gradient(135deg,rgba(240,208,128,0.14),rgba(196,160,216,0.08))', border:`1px solid ${goldDeep}`, borderRadius:14, padding:'14px 16px', marginBottom:14, textAlign:'center' }}>
                <span style={{ fontSize:13, color:gold, fontWeight:600 }}>🌟 {freeResult.specialNote}</span>
              </div>
            )}
            {freeResult.hookMessage && (
              <div style={{ background:'linear-gradient(135deg,rgba(196,160,216,0.12),rgba(240,208,128,0.08))', border:`1px solid rgba(212,168,67,0.3)`, borderRadius:16, padding:'20px', textAlign:'center', marginBottom:18 }}>
                <div style={{ fontSize:28, marginBottom:6 }}>🐥</div>
                <p style={{ fontSize:13, color:gold, lineHeight:1.85, margin:0 }}>{freeResult.hookMessage}</p>
              </div>
            )}

            {/* ロック */}
            <div style={{ background:'linear-gradient(135deg,rgba(155,106,176,0.14),rgba(20,8,24,0.5))', border:`1.5px solid ${goldDeep}`, borderRadius:20, padding:'24px 20px', marginBottom:18 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                <span style={{ fontSize:28 }}>🔒</span>
                <div>
                  <p style={{ fontSize:16, fontWeight:700, color:gold, margin:'0 0 2px' }}>完全版＝人生ロードマップ</p>
                  <p style={{ fontSize:11, color:'rgba(253,246,240,0.5)', margin:0 }}>恋愛・仕事・金運・人間関係と、1年後までの未来設計</p>
                </div>
              </div>
              <div style={{ display:'grid', gap:8, marginBottom:14 }}>
                {buildCliffhangers().map((c,i)=>(
                  <div key={i} style={{ background:'rgba(18,8,24,0.5)', border:'1px solid rgba(196,160,216,0.2)', borderRadius:12, padding:'12px 14px' }}>
                    <div style={{ fontSize:11, color:purple, marginBottom:4 }}>{c.head}</div>
                    <div style={{ fontSize:13, color:gold, fontWeight:600 }}>「{c.tail}」</div>
                  </div>
                ))}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
                {PAID_TEASERS.map(t=>(
                  <div key={t.label} style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(253,246,240,0.03)', borderRadius:10, padding:'10px', border:'1px solid rgba(155,106,176,0.15)' }}>
                    <span style={{ fontSize:16 }}>{t.icon}</span>
                    <span style={{ fontSize:11, color:'rgba(253,246,240,0.85)', flex:1 }}>{t.label}</span>
                    <span style={{ fontSize:11, opacity:0.5 }}>🔒</span>
                  </div>
                ))}
              </div>
              {error && <p style={{ color:'#f0a8c0', fontSize:13, textAlign:'center', marginBottom:10 }}>{error}</p>}
              <PayjpCheckoutButton product="sogo" label={CTA_LABEL} onPaid={onPaid} />
              <p style={{ fontSize:11, color:'rgba(253,246,240,0.4)', textAlign:'center', margin:'10px 0 0' }}>決済後、手相画像をアップロードして人生設計をお受け取りいただけます</p>
            </div>

            <button onClick={reset} style={{ width:'100%', padding:11, border:'none', borderRadius:10, background:'rgba(253,246,240,0.03)', color:'rgba(253,246,240,0.35)', fontSize:11, cursor:'pointer' }}>最初からやり直す</button>
          </div>
        )}

        {/* 決済後：手相アップロード */}
        {step === 'palmUpload' && (
          <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(155,106,176,0.25)', borderRadius:20, padding:'30px 26px' }}>
            <div style={{ background:'rgba(212,168,67,0.08)', border:'1px solid rgba(212,168,67,0.25)', borderRadius:12, padding:'14px 18px', textAlign:'center', fontSize:13, color:gold, marginBottom:20 }}>
              ✅ お支払いが完了しました！<br />
              <span style={{ fontSize:11, color:'rgba(253,246,240,0.5)' }}>手相画像をアップロードすると、より正確な人生設計になります（任意）</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16 }}>
              {(['L','R'] as const).map(side=>(
                <div key={side}>
                  <div style={{ fontSize:11, color:'rgba(253,246,240,0.4)', textAlign:'center', marginBottom:6 }}>{side==='L'?'🤚 左手':'🤚 右手'}</div>
                  {(side==='L'?imageL:imageR) ? (
                    <div style={{ position:'relative' }}>
                      <img src={`data:${side==='L'?mimeTypeL:mimeTypeR};base64,${side==='L'?imageL:imageR}`} style={{ width:'100%', borderRadius:10, border:'1px solid rgba(155,106,176,0.3)', maxHeight:160, objectFit:'cover' }} alt="" />
                      <button onClick={()=>side==='L'?setImageL(null):setImageR(null)} style={{ position:'absolute', top:6, right:6, background:'rgba(200,96,122,0.8)', border:'none', color:'white', width:24, height:24, borderRadius:'50%', cursor:'pointer', fontSize:12 }}>✕</button>
                    </div>
                  ) : (
                    <label style={{ border:'2px dashed rgba(155,106,176,0.3)', borderRadius:14, padding:'20px 10px', textAlign:'center', cursor:'pointer', display:'block', background:'rgba(155,106,176,0.02)' }}>
                      <input type="file" accept="image/*" style={{ display:'none' }} onChange={e=>e.target.files?.[0]&&handleImage(side,e.target.files[0])} />
                      <div style={{ fontSize:22, marginBottom:5 }}>{side==='L'?'✋':'🤚'}</div>
                      <div style={{ fontSize:11, color:'rgba(253,246,240,0.55)' }}>タップして選択</div>
                    </label>
                  )}
                </div>
              ))}
            </div>
            {error && <div style={{ background:'rgba(200,96,122,0.1)', border:'1px solid rgba(200,96,122,0.3)', borderRadius:10, padding:'12px 16px', fontSize:12, color:'#f0a8c0', textAlign:'center', marginBottom:12 }}>{error}</div>}
            <button onClick={handleGeneratePaid}
              style={{ width:'100%', padding:16, border:'none', borderRadius:14, background:'linear-gradient(135deg,#9b6ab0,#c4a0d8,#f0d080)', color:'white', fontSize:15, letterSpacing:'0.08em', cursor:'pointer' }}>
              🔮 人生ロードマップを受け取る
            </button>
            <p style={{ fontSize:11, color:'rgba(253,246,240,0.4)', textAlign:'center', marginTop:10 }}>画像なしでも鑑定できます（生年月日・星・数秘で読み解きます）</p>
          </div>
        )}

        {/* 有料：人生設計 */}
        {step === 'paid' && paidResult && (
          <div>
            <div style={{ marginBottom:16 }}>
              <p style={{ fontSize:13, fontWeight:700, color:gold, textAlign:'center', marginBottom:12 }}>🃏 今回引いたカード</p>
              <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:6 }}>
                {cardsRef.current.map((card:any, i:number) => (
                  <div key={i} style={{ flex:'0 0 auto', width:70, textAlign:'center' }}>
                    <div style={{ position:'relative', width:70, height:110 }}>
                      <img
                        src={card.img}
                        alt={card.name}
                        style={{
                          width:70, height:110, objectFit:'cover', borderRadius:8,
                          border:`1px solid ${goldDeep}`,
                          transform: card.reversed ? 'rotate(180deg)' : 'none',
                          display:'block'
                        }}
                      />
                      {card.reversed && (
                        <span style={{ position:'absolute', top:2, right:2, fontSize:9, background:'rgba(200,96,122,0.85)', color:'#fff', borderRadius:3, padding:'1px 3px' }}>逆</span>
                      )}
                    </div>
                    <p style={{ fontSize:9, color:'rgba(253,246,240,0.6)', margin:'4px 0 0', lineHeight:1.3 }}>{card.position}</p>
                    <p style={{ fontSize:10, color:gold, margin:'2px 0 0', lineHeight:1.3, fontWeight:600 }}>{card.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:'linear-gradient(135deg,rgba(196,160,216,0.12),rgba(240,208,128,0.1))', border:`1px solid ${goldDeep}`, borderRadius:14, padding:12, marginBottom:16 }}>
              <span style={{ fontSize:18 }}>✨</span><span style={{ fontSize:13, fontWeight:900, color:gold }}>{name}様の人生ロードマップ</span>
            </div>
            {paidResult.specialNote && (
              <div style={{ ...box, textAlign:'center', background:'linear-gradient(135deg,rgba(240,208,128,0.14),rgba(196,160,216,0.08))', borderColor:goldDeep }}>
                <span style={{ fontSize:13, color:gold, fontWeight:600 }}>🌟 {paidResult.specialNote}</span>
              </div>
            )}
            {paidResult.love && <div style={box}><p style={title}>💗 恋愛運</p><p style={txt}>{paidResult.love}</p></div>}
            {paidResult.work && <div style={box}><p style={title}>💼 仕事運</p><p style={txt}>{paidResult.work}</p></div>}
            {paidResult.money && <div style={box}><p style={title}>💰 金運</p><p style={txt}>{paidResult.money}</p></div>}
            {paidResult.relationships && <div style={box}><p style={title}>🤝 人間関係</p><p style={txt}>{paidResult.relationships}</p></div>}

            {Array.isArray(paidResult.luckActions) && paidResult.luckActions.length>0 && (
              <div style={box}><p style={title}>🍀 開運アクション</p>
                {paidResult.luckActions.map((a:string,i:number)=>(
                  <div key={i} style={{ fontSize:12.5, color:'rgba(253,246,240,0.82)', lineHeight:1.8, marginBottom:6 }}><span style={{ color:goldDeep, marginRight:8 }}>✦</span>{a}</div>
                ))}
              </div>
            )}

            {Array.isArray(paidResult.roadmap) && paidResult.roadmap.length>0 && (
              <div style={{ ...box, background:'linear-gradient(135deg,rgba(155,106,176,0.1),rgba(20,8,24,0.4))', borderColor:'rgba(196,160,216,0.35)' }}>
                <p style={title}>🗺️ 人生ロードマップ</p>
                {paidResult.roadmap.map((r:any,i:number)=>(
                  <div key={i} style={{ display:'flex', gap:12, marginBottom:12, paddingBottom:12, borderBottom:i<paidResult.roadmap.length-1?'1px solid rgba(196,160,216,0.15)':'none' }}>
                    <div style={{ fontSize:12, fontWeight:700, color:gold, minWidth:64 }}>🗓 {r.period}</div>
                    <div style={{ fontSize:12.5, color:'rgba(253,246,240,0.85)', lineHeight:1.7, flex:1 }}>{r.action}</div>
                  </div>
                ))}
              </div>
            )}

            {paidResult.coreMessage && (
              <div style={{ ...box, background:'rgba(196,160,216,0.08)', borderColor:'rgba(196,160,216,0.3)' }}>
                <p style={title}>🌙 最も大切なメッセージ</p><p style={txt}>{paidResult.coreMessage}</p>
              </div>
            )}
            {paidResult.piyochanMessage && (
              <div style={{ background:'rgba(196,160,216,0.08)', border:'1px solid rgba(196,160,216,0.25)', borderRadius:16, padding:'20px', textAlign:'center', marginBottom:14 }}>
                <div style={{ fontSize:30, marginBottom:6 }}>🐥</div>
                <p style={{ fontSize:13, color:gold, lineHeight:1.8, margin:0 }}>{paidResult.piyochanMessage}</p>
              </div>
            )}
            {paidResult.disclaimer && <p style={{ fontSize:11, color:'rgba(253,246,240,0.4)', lineHeight:1.6, textAlign:'center', padding:12, border:'1px solid rgba(155,106,176,0.2)', borderRadius:10, marginBottom:14 }}>{paidResult.disclaimer}</p>}

            <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:12 }}>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('人生ロードマップ鑑定を受けました✨ #TwinkleStarOracle\nhttps://twinkle-lab.jp/star/sogo')}`} target="_blank" rel="noopener noreferrer"
                style={{ padding:'10px 20px', borderRadius:10, border:'1px solid rgba(155,106,176,0.3)', background:'transparent', color:'rgba(253,246,240,0.5)', fontSize:12, textDecoration:'none' }}>𝕏 シェア</a>
              <a href="/star" style={{ padding:'10px 20px', borderRadius:10, border:'1px solid rgba(155,106,176,0.3)', background:'transparent', color:'rgba(253,246,240,0.5)', fontSize:12, textDecoration:'none' }}>🌟 占いポータルへ</a>
            </div>
            <button onClick={reset} style={{ width:'100%', padding:11, border:'none', borderRadius:10, background:'rgba(253,246,240,0.03)', color:'rgba(253,246,240,0.35)', fontSize:11, cursor:'pointer' }}>最初からやり直す</button>
          </div>
        )}

      </div>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Noto+Serif+JP:wght@300;400&display=swap');"}</style>
    </div>
  )
}
