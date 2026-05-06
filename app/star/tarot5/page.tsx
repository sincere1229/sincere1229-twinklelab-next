'use client'
import { useState, useRef } from 'react'

const DECK = [
  {num:'0',name:'愚者',symbol:'🌟'},{num:'I',name:'魔術師',symbol:'⚗️'},
  {num:'II',name:'女教皇',symbol:'🌙'},{num:'III',name:'女帝',symbol:'👑'},
  {num:'IV',name:'皇帝',symbol:'⚔️'},{num:'V',name:'法王',symbol:'🔑'},
  {num:'VI',name:'恋人',symbol:'💕'},{num:'VII',name:'戦車',symbol:'🏆'},
  {num:'VIII',name:'力',symbol:'🦁'},{num:'IX',name:'隠者',symbol:'🔦'},
  {num:'X',name:'運命の輪',symbol:'🎡'},{num:'XI',name:'正義',symbol:'⚖️'},
  {num:'XII',name:'吊られた男',symbol:'🔄'},{num:'XIII',name:'死神',symbol:'🌿'},
  {num:'XIV',name:'節制',symbol:'🌊'},{num:'XV',name:'悪魔',symbol:'🔗'},
  {num:'XVI',name:'塔',symbol:'⚡'},{num:'XVII',name:'星',symbol:'⭐'},
  {num:'XVIII',name:'月',symbol:'🌕'},{num:'XIX',name:'太陽',symbol:'☀️'},
  {num:'XX',name:'審判',symbol:'🎺'},{num:'XXI',name:'世界',symbol:'🌍'},
]
const POSITIONS = ['過去','現在','未来','課題','アドバイス']

function drawCards() {
  return [...DECK].sort(()=>Math.random()-0.5).slice(0,5).map((card,i)=>({
    ...card, position: POSITIONS[i], reversed: Math.random() > 0.7
  }))
}

export default function Tarot5Page() {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [birthtime, setBirthtime] = useState('')
  const [birthplace, setBirthplace] = useState('')
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [cards, setCards] = useState<any[]>([])
  const drawnCardsRef = useRef<any[]>([])
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [paymentSuccess] = useState(
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('payment') === 'success'
  )

  const canStart = name && gender && birthdate && question

  const analyze = async () => {
    if (!canStart) return
    setLoading(true); setError(''); setResult('')
    const drawn = drawCards()
    try {
      const res = await fetch('/api/uranai/tarot5', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, gender, birthdate, birthtime, birthplace, question, cards: drawn }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '鑑定に失敗しました')
      drawnCardsRef.current = drawn
      setCards([...drawn])
      setResult(data.result)
    } catch (err: any) {
      setError(err.message || '鑑定中にエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => { setName(''); setGender(''); setBirthdate(''); setBirthtime(''); setBirthplace(''); setQuestion(''); setResult(''); setCards([]); setError('') }
  const copy = async () => { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(()=>setCopied(false),3000) }

  const s = { input: { width:'100%', background:'rgba(253,246,240,0.04)', border:'1px solid rgba(74,90,176,0.25)', borderRadius:10, padding:'11px 13px', color:'#fdf6f0', fontFamily:"'Noto Serif JP',serif", fontSize:13, outline:'none', boxSizing:'border-box' as const } }

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#080818,#100828,#080818)', padding:'40px 20px 80px', fontFamily:"'Noto Serif JP',serif", color:'#fdf6f0' }}>
      <div style={{ maxWidth:620, margin:'0 auto' }}>

        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ fontSize:12, letterSpacing:'0.35em', color:'#d4a843', textTransform:'uppercase', marginBottom:12 }}>✦ Twinkle Star Oracle ✦</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:300, marginBottom:6 }}>
            タロット5枚引き<br /><span style={{ color:'#8a9be0', fontStyle:'italic' }}>＋ホロスコープ鑑定</span>
          </h1>
          <div style={{ width:70, height:1, background:'linear-gradient(90deg,transparent,#d4a843,transparent)', margin:'12px auto' }} />
          <p style={{ fontSize:12, color:'rgba(253,246,240,0.45)', lineHeight:1.9 }}>過去・現在・未来・課題・アドバイスを読み解き<br />星の配置と組み合わせた深層リーディング</p>
        </div>

        {paymentSuccess && (
          <div style={{ background:'rgba(212,168,67,0.08)', border:'1px solid rgba(212,168,67,0.25)', borderRadius:12, padding:'14px 18px', textAlign:'center', fontSize:13, color:'#f0d080', marginBottom:24 }}>
            ✨ お支払いが完了しました。以下の情報を入力してリーディングをお受けください。
          </div>
        )}

        <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(74,90,176,0.25)', borderRadius:20, padding:'32px 28px', backdropFilter:'blur(12px)' }}>

          {!result && !loading && (
            <>
              <div style={{ textAlign:'center', marginBottom:24 }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:'#8a9be0', marginBottom:6 }}>🌟 基本情報の入力</div>
                <p style={{ fontSize:12, color:'rgba(253,246,240,0.4)', lineHeight:1.8 }}>ホロスコープ鑑定に使用します</p>
              </div>

              <div style={{ display:'grid', gap:14 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  <div>
                    <div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>お名前 <span style={{ color:'#f0a8c0' }}>*</span></div>
                    <input style={s.input} value={name} onChange={e=>setName(e.target.value)} placeholder="山田 花子" />
                  </div>
                  <div>
                    <div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>性別 <span style={{ color:'#f0a8c0' }}>*</span></div>
                    <select style={{ ...s.input, color:'#fdf6f0', backgroundColor:'#100828' }} value={gender} onChange={e=>setGender(e.target.value)}>
                      <option value="">選択</option>
                      <option value="女性">女性</option>
                      <option value="男性">男性</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  <div>
                    <div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>生年月日 <span style={{ color:'#f0a8c0' }}>*</span></div>
                    <input style={s.input} type="date" value={birthdate} onChange={e=>setBirthdate(e.target.value)} />
                  </div>
                  <div>
                    <div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>出生時間（任意）</div>
                    <input style={s.input} type="time" value={birthtime} onChange={e=>setBirthtime(e.target.value)} />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>出生地（任意）</div>
                  <input style={s.input} value={birthplace} onChange={e=>setBirthplace(e.target.value)} placeholder="例：東京都渋谷区" />
                </div>
                <div>
                  <div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>今一番聞きたいこと <span style={{ color:'#f0a8c0' }}>*</span></div>
                  <textarea style={{ ...s.input, resize:'none', height:75, lineHeight:1.7 }} value={question} onChange={e=>setQuestion(e.target.value)} placeholder="例：仕事を変えるべき？　彼との関係は？など" />
                </div>
              </div>

              {error && <div style={{ background:'rgba(200,96,122,0.1)', border:'1px solid rgba(200,96,122,0.3)', borderRadius:10, padding:'12px 16px', fontSize:12, color:'#f0a8c0', textAlign:'center', marginTop:12 }}>{error}</div>}

              <button onClick={analyze} disabled={!canStart}
                style={{ width:'100%', padding:16, border:'none', borderRadius:14, background:'linear-gradient(135deg,#4a5ab0,#7b5ea7,#f0d080)', color:'white', fontFamily:"'Noto Serif JP',serif", fontSize:14, letterSpacing:'0.1em', cursor:canStart?'pointer':'not-allowed', opacity:canStart?1:0.4, marginTop:20, transition:'all 0.3s' }}>
                🃏 カードを引く
              </button>
            </>
          )}

          {loading && (
            <div style={{ textAlign:'center', padding:'52px 0' }}>
              {drawnCardsRef.current.length > 0 && (
                <div style={{ marginBottom:28 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, color:'#f0d080', marginBottom:14 }}>🃏 あなたのカード</div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8 }}>
                    {drawnCardsRef.current.map((card,i)=>(
                      <div key={i} style={{ aspectRatio:'2/3', borderRadius:10, background:'linear-gradient(135deg,#1a0a30,#2a1050)', border:'1px solid rgba(138,155,224,0.4)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'6px 4px', textAlign:'center' }}>
                        <div style={{ fontSize:8, color:'#d4a843', marginBottom:3 }}>{card.num}</div>
                        <div style={{ fontSize:18, marginBottom:3, transform:card.reversed?'rotate(180deg)':'' }}>{card.symbol}</div>
                        <div style={{ fontSize:8, color:'#8a9be0', lineHeight:1.3 }}>{card.name}</div>
                        <div style={{ fontSize:7, color:'rgba(253,246,240,0.4)', marginTop:2 }}>{card.position}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ fontSize:52, marginBottom:18 }}>🔮</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:'#8a9be0', marginBottom:8 }}>星とカードが語りかけています…</div>
              <div style={{ fontSize:12, color:'rgba(253,246,240,0.4)', lineHeight:2.2 }}>タロット5枚のメッセージと<br />あなたの星の配置を統合しています</div>
            </div>
          )}

          {result && (
            <>
              <div style={{ textAlign:'center', marginBottom:20 }}>
                <div style={{ fontSize:38, marginBottom:10 }}>✨</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:'#8a9be0' }}>リーディング結果</div>
                <div style={{ fontSize:11, color:'rgba(253,246,240,0.4)', marginTop:4 }}>{name}様 | Twinkle Star Oracle</div>
              </div>
              <div style={{ width:70, height:1, background:'linear-gradient(90deg,transparent,#d4a843,transparent)', margin:'0 auto 16px' }} />

              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:'#f0d080', marginBottom:10, paddingLeft:10, borderLeft:'2px solid #d4a843' }}>🃏 引いたカード</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8, marginBottom:20 }}>
                {(drawnCardsRef.current.length > 0 ? drawnCardsRef.current : cards).map((card,i)=>(
                  <div key={i} style={{ aspectRatio:'2/3', borderRadius:10, background:'linear-gradient(135deg,#1a0a30,#2a1050)', border:'1px solid rgba(138,155,224,0.4)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'6px 4px', textAlign:'center' }}>
                    <div style={{ fontSize:8, color:'#d4a843', marginBottom:3 }}>{card.num}</div>
                    <div style={{ fontSize:16, marginBottom:3, transform:card.reversed?'rotate(180deg)':'' }}>{card.symbol}</div>
                    <div style={{ fontSize:8, color:'#8a9be0', lineHeight:1.3 }}>{card.name}</div>
                    <div style={{ fontSize:7, color:'rgba(253,246,240,0.4)', marginTop:2 }}>{card.position}</div>
                  </div>
                ))}
              </div>

              <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(74,90,176,0.15)', borderRadius:14, padding:22, fontSize:13, lineHeight:2, color:'rgba(253,246,240,0.82)', whiteSpace:'pre-wrap', wordBreak:'break-word', marginBottom:16 }}>
                {result}
              </div>

              <button onClick={copy} style={{ width:'100%', padding:13, border:`1px solid ${copied?'rgba(240,168,192,0.5)':'rgba(74,90,176,0.4)'}`, borderRadius:12, background:'transparent', color:copied?'#f0a8c0':'#8a9be0', fontFamily:"'Noto Serif JP',serif", fontSize:13, cursor:'pointer', marginBottom:10, transition:'all 0.3s' }}>
                {copied ? '✅ コピーしました！' : '📋 結果をコピー'}
              </button>
              <a href="https://buy.stripe.com/aFa5kw8Hs6C6dR3fRx33W02" target="_blank" style={{ display:'block', padding:15, borderRadius:12, background:'linear-gradient(135deg,rgba(200,96,122,0.3),rgba(212,168,67,0.2))', border:'1px solid rgba(212,168,67,0.3)', color:'#f0d080', fontFamily:"'Noto Serif JP',serif", fontSize:13, letterSpacing:'0.06em', textDecoration:'none', textAlign:'center', marginBottom:10 }}>
                🌙 さらに深く｜手相付き総合鑑定 ¥3,980
              </a>
              <button onClick={reset} style={{ width:'100%', padding:11, border:'none', borderRadius:10, background:'rgba(253,246,240,0.03)', color:'rgba(253,246,240,0.35)', fontFamily:"'Noto Serif JP',serif", fontSize:11, cursor:'pointer' }}>
                最初からやり直す
              </button>
            </>
          )}
        </div>

        <div style={{ marginTop:24, padding:14, background:'rgba(74,90,176,0.04)', borderRadius:12, fontSize:11, color:'rgba(253,246,240,0.28)', lineHeight:1.9, textAlign:'center' }}>
          鑑定結果はページを閉じると消えます<br />必ずコピーまたはスクリーンショットで保存してください
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Noto+Serif+JP:wght@300;400&display=swap');`}</style>
    </div>
  )
}
