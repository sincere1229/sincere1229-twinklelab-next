'use client'
import { useState, useEffect, useRef } from 'react'

const DECK = [
  {num:'0',name:'愚者',symbol:'🌟',img:'/tarot/card_00_fool.jpg'},
  {num:'I',name:'魔術師',symbol:'⚗️',img:'/tarot/card_01_magician.jpg'},
  {num:'II',name:'女教皇',symbol:'🌙',img:'/tarot/card_02_high-priestess.jpg'},
  {num:'III',name:'女帝',symbol:'👑',img:'/tarot/card_03_empress.jpg'},
  {num:'IV',name:'皇帝',symbol:'⚔️',img:'/tarot/card_04_emperor.jpg'},
  {num:'V',name:'法王',symbol:'🔑',img:'/tarot/card_05_hierophant.jpg'},
  {num:'VI',name:'恋人',symbol:'💕',img:'/tarot/card_06_lovers.jpg'},
  {num:'VII',name:'戦車',symbol:'🏆',img:'/tarot/card_07_chariot.jpg'},
  {num:'VIII',name:'力',symbol:'🦁',img:'/tarot/card_08_strength.jpg'},
  {num:'IX',name:'隠者',symbol:'🔦',img:'/tarot/card_09_hermit.jpg'},
  {num:'X',name:'運命の輪',symbol:'🎡',img:'/tarot/card_10_wheel-of-fortune.jpg'},
  {num:'XI',name:'正義',symbol:'⚖️',img:'/tarot/card_11_justice.jpg'},
  {num:'XII',name:'吊られた男',symbol:'🔄',img:'/tarot/card_12_hanged-man.jpg'},
  {num:'XIII',name:'死神',symbol:'🌿',img:'/tarot/card_13_death.jpg'},
  {num:'XIV',name:'節制',symbol:'🌊',img:'/tarot/card_14_temperance.jpg'},
  {num:'XV',name:'悪魔',symbol:'🔗',img:'/tarot/card_15_devil.jpg'},
  {num:'XVI',name:'塔',symbol:'⚡',img:'/tarot/card_16_tower.jpg'},
  {num:'XVII',name:'星',symbol:'⭐',img:'/tarot/card_17_star.jpg'},
  {num:'XVIII',name:'月',symbol:'🌕',img:'/tarot/card_18_moon.jpg'},
  {num:'XIX',name:'太陽',symbol:'☀️',img:'/tarot/card_19_sun.jpg'},
  {num:'XX',name:'審判',symbol:'🎺',img:'/tarot/card_20_judgement.jpg'},
  {num:'XXI',name:'世界',symbol:'🌍',img:'/tarot/card_21_world.jpg'},
]
const POSITIONS = ['過去','現在','未来','課題','アドバイス']
function drawCards() {
  return [...DECK].sort(()=>Math.random()-0.5).slice(0,5).map((card,i)=>({...card, position:POSITIONS[i], reversed:Math.random()>0.7}))
}

const STRIPE_LINK = 'https://buy.stripe.com/14A8wIbTEf8C9ANfRx33W03'

export default function Tarot5Page() {
  const [step, setStep] = useState('top')
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [birthtime, setBirthtime] = useState('')
  const [birthplace, setBirthplace] = useState('')
  const [question, setQuestion] = useState('')
  const [cards, setCards] = useState([])
  const drawnCardsRef = useRef([])
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('payment') === 'success') setStep('form')
  }, [])

  const canStart = name && gender && birthdate && question

  const analyze = async () => {
    if (!canStart) return
    setStep('loading'); setError('')
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
      setStep('result')
    } catch (err) {
      setError(err.message || '鑑定中にエラーが発生しました')
      setStep('form')
    }
  }

  const copy = async () => { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(()=>setCopied(false),3000) }
  const reset = () => {
    setStep('top'); setName(''); setGender(''); setBirthdate(''); setBirthtime('')
    setBirthplace(''); setQuestion(''); setCards([]); setResult(''); setError('')
    if (typeof window !== 'undefined') window.history.replaceState({}, '', window.location.pathname)
  }

  const inputStyle = { width:'100%', background:'rgba(253,246,240,0.04)', border:'1px solid rgba(74,90,176,0.25)', borderRadius:10, padding:'11px 13px', color:'#fdf6f0', fontFamily:"'Noto Serif JP',serif", fontSize:13, outline:'none', boxSizing:'border-box' }

  const CardGrid = ({cardList}) => (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8 }}>
      {cardList.map((card,i)=>(
        <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
          <div style={{ position:'relative', width:'100%', aspectRatio:'2/3', borderRadius:10, overflow:'hidden', border:'1px solid rgba(138,155,224,0.4)', transform:card.reversed?'rotate(180deg)':'' }}>
            <img src={card.img} alt={card.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
          <div style={{ fontSize:8, color:'#8a9be0', textAlign:'center', lineHeight:1.3 }}>{card.name}</div>
          <div style={{ fontSize:7, color:'rgba(253,246,240,0.4)', textAlign:'center' }}>{card.position}</div>
          {card.reversed && <div style={{ fontSize:7, color:'#f0a8c0' }}>逆位置</div>}
        </div>
      ))}
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#080818,#100828,#080818)', padding:'40px 20px 80px', fontFamily:"'Noto Serif JP',serif", color:'#fdf6f0' }}>
      <div style={{ maxWidth:620, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ fontSize:12, letterSpacing:'0.35em', color:'#d4a843', textTransform:'uppercase', marginBottom:12 }}>✦ Twinkle Star Oracle ✦</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:300, marginBottom:6 }}>タロット5枚引き<br /><span style={{ color:'#8a9be0', fontStyle:'italic' }}>＋ホロスコープ鑑定</span></h1>
          <div style={{ width:70, height:1, background:'linear-gradient(90deg,transparent,#d4a843,transparent)', margin:'12px auto' }} />
          <p style={{ fontSize:12, color:'rgba(253,246,240,0.45)', lineHeight:1.9 }}>過去・現在・未来・課題・アドバイスを読み解き<br />星の配置と組み合わせた深層リーディング</p>
        </div>

        {step === 'top' && (
          <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(74,90,176,0.25)', borderRadius:20, padding:'36px 28px', textAlign:'center' }}>
            <div style={{ fontSize:36, marginBottom:16 }}>🃏</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:'#8a9be0', marginBottom:12 }}>タロット5枚＋ホロスコープ ¥1,980</div>
            <div style={{ fontSize:13, color:'rgba(253,246,240,0.55)', lineHeight:1.9, marginBottom:24 }}>
              大アルカナ22枚から5枚を引き<br />過去・現在・未来・課題・アドバイスを読み解く<br />生年月日からホロスコープも統合した本格鑑定
            </div>
            <button onClick={()=>window.location.href=STRIPE_LINK}
              style={{ width:'100%', padding:18, border:'none', borderRadius:14, background:'linear-gradient(135deg,#4a5ab0,#7b5ea7,#f0d080)', color:'white', fontFamily:"'Noto Serif JP',serif", fontSize:16, letterSpacing:'0.1em', cursor:'pointer', marginBottom:12 }}>
              🃏 ¥1,980 でリーディングをはじめる
            </button>
            <p style={{ fontSize:11, color:'rgba(253,246,240,0.35)' }}>決済完了後に情報入力ページへ進みます</p>
            <a href="/star" style={{ display:'block', marginTop:16, fontSize:12, color:'rgba(253,246,240,0.4)', textDecoration:'none' }}>← 占いポータルに戻る</a>
          </div>
        )}

        {step === 'form' && (
          <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(74,90,176,0.25)', borderRadius:20, padding:'32px 28px', backdropFilter:'blur(12px)' }}>
            <div style={{ background:'rgba(212,168,67,0.08)', border:'1px solid rgba(212,168,67,0.25)', borderRadius:12, padding:'14px 18px', textAlign:'center', fontSize:13, color:'#f0d080', marginBottom:24 }}>
              ✅ お支払いが完了しました！<br />
              <span style={{ fontSize:11, color:'rgba(253,246,240,0.5)' }}>以下の情報を入力してリーディングをお受けください</span>
            </div>
            <div style={{ textAlign:'center', marginBottom:20 }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:'#8a9be0' }}>🌟 基本情報の入力</div>
            </div>
            <div style={{ display:'grid', gap:14 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>お名前 *</div><input style={inputStyle} value={name} onChange={e=>setName(e.target.value)} placeholder="山田 花子" /></div>
                <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>性別 *</div>
                  <select style={{...inputStyle, color:'#fdf6f0', backgroundColor:'#100828'}} value={gender} onChange={e=>setGender(e.target.value)}>
                    <option value="">選択</option><option value="女性">女性</option><option value="男性">男性</option><option value="その他">その他</option>
                  </select>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>生年月日 *</div><input style={inputStyle} type="date" value={birthdate} onChange={e=>setBirthdate(e.target.value)} /></div>
                <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>出生時間（任意）</div><input style={inputStyle} type="time" value={birthtime} onChange={e=>setBirthtime(e.target.value)} /></div>
              </div>
              <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>出生地（任意）</div><input style={inputStyle} value={birthplace} onChange={e=>setBirthplace(e.target.value)} placeholder="例：東京都渋谷区" /></div>
              <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>今一番聞きたいこと *</div>
                <textarea style={{...inputStyle, resize:'none', height:75, lineHeight:1.7}} value={question} onChange={e=>setQuestion(e.target.value)} placeholder="例：仕事を変えるべき？　彼との関係は？など" />
              </div>
            </div>
            {error && <div style={{ background:'rgba(200,96,122,0.1)', border:'1px solid rgba(200,96,122,0.3)', borderRadius:10, padding:'12px 16px', fontSize:12, color:'#f0a8c0', textAlign:'center', marginTop:12 }}>{error}</div>}
            <button onClick={analyze} disabled={!canStart}
              style={{ width:'100%', padding:16, border:'none', borderRadius:14, background:'linear-gradient(135deg,#4a5ab0,#7b5ea7,#f0d080)', color:'white', fontFamily:"'Noto Serif JP',serif", fontSize:14, letterSpacing:'0.1em', cursor:canStart?'pointer':'not-allowed', opacity:canStart?1:0.4, marginTop:20 }}>
              🃏 カードを引いてリーディングをはじめる
            </button>
          </div>
        )}

        {step === 'loading' && (
          <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(74,90,176,0.25)', borderRadius:20, padding:'52px 28px', textAlign:'center' }}>
            <div style={{ fontSize:52, marginBottom:18 }}>🔮</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:'#8a9be0', marginBottom:8 }}>星とカードが語りかけています…</div>
            <div style={{ fontSize:12, color:'rgba(253,246,240,0.4)', lineHeight:2.2 }}>タロット5枚のメッセージと<br />あなたの星の配置を統合しています</div>
          </div>
        )}

        {step === 'result' && (
          <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(74,90,176,0.25)', borderRadius:20, padding:'32px 28px' }}>
            <div style={{ textAlign:'center', marginBottom:20 }}>
              <div style={{ fontSize:38, marginBottom:10 }}>✨</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:'#8a9be0' }}>リーディング結果</div>
              <div style={{ fontSize:11, color:'rgba(253,246,240,0.4)', marginTop:4 }}>{name}様 | Twinkle Star Oracle</div>
            </div>
            <div style={{ width:70, height:1, background:'linear-gradient(90deg,transparent,#d4a843,transparent)', margin:'0 auto 16px' }} />
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:'#f0d080', marginBottom:10, paddingLeft:10, borderLeft:'2px solid #d4a843' }}>🃏 引いたカード</div>
            <CardGrid cardList={drawnCardsRef.current.length > 0 ? drawnCardsRef.current : cards} />
            <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(74,90,176,0.15)', borderRadius:14, padding:20, fontSize:13, lineHeight:2, color:'rgba(253,246,240,0.82)', whiteSpace:'pre-wrap', wordBreak:'break-word', margin:'16px 0' }}>{result}</div>
            <button onClick={copy} style={{ width:'100%', padding:13, border:`1px solid ${copied?'rgba(240,168,192,0.5)':'rgba(74,90,176,0.4)'}`, borderRadius:12, background:'transparent', color:copied?'#f0a8c0':'#8a9be0', fontFamily:"'Noto Serif JP',serif", fontSize:13, cursor:'pointer', marginBottom:10 }}>
              {copied?'✅ コピーしました！':'📋 結果をコピー'}
            </button>
            <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:12 }}>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('タロット5枚＋ホロスコープ鑑定を受けました✨ #TwinkleStarOracle\nhttps://twinkle-lab.jp/star/tarot5')}`} target="_blank" rel="noopener noreferrer"
                style={{ padding:'10px 20px', borderRadius:10, border:'1px solid rgba(74,90,176,0.3)', background:'transparent', color:'rgba(253,246,240,0.5)', fontSize:12, textDecoration:'none' }}>𝕏 シェア</a>
              <a href="/star" style={{ padding:'10px 20px', borderRadius:10, border:'1px solid rgba(74,90,176,0.3)', background:'transparent', color:'rgba(253,246,240,0.5)', fontSize:12, textDecoration:'none' }}>🌟 占いポータルへ</a>
            </div>
            <button onClick={reset} style={{ width:'100%', padding:11, border:'none', borderRadius:10, background:'rgba(253,246,240,0.03)', color:'rgba(253,246,240,0.35)', fontFamily:"'Noto Serif JP',serif", fontSize:11, cursor:'pointer' }}>最初からやり直す</button>
          </div>
        )}

        <div style={{ marginTop:24, padding:14, background:'rgba(74,90,176,0.04)', borderRadius:12, fontSize:11, color:'rgba(253,246,240,0.28)', lineHeight:1.9, textAlign:'center' }}>
          鑑定結果はページを閉じると消えます<br />必ずコピーまたはスクリーンショットで保存してください
        </div>
      </div>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Noto+Serif+JP:wght@300;400&display=swap');"}</style>
    </div>
  )
}
