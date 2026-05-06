'use client'
import { useState, useRef } from 'react'

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

export default function SogoPage() {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [birthtime, setBirthtime] = useState('')
  const [birthplace, setBirthplace] = useState('')
  const [concern, setConcern] = useState('')
  const [imageL, setImageL] = useState<string|null>(null)
  const [imageR, setImageR] = useState<string|null>(null)
  const [mimeTypeL, setMimeTypeL] = useState('image/jpeg')
  const [mimeTypeR, setMimeTypeR] = useState('image/jpeg')
  const [cards, setCards] = useState<any[]>([])
  const drawnCardsRef = useRef<any[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [paymentSuccess] = useState(
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('payment') === 'success'
  )

  const hasImage = imageL || imageR
  const canStart = name && gender && birthdate && concern && hasImage

  const handleImage = (side: 'L'|'R', file: File) => {
    if (!file.type.startsWith('image/')) { setError('画像ファイルを選択してください'); return }
    if (file.size > 10*1024*1024) { setError('10MB以下の画像を選択してください'); return }
    const reader = new FileReader()
    reader.onload = e => {
      const base64 = (e.target?.result as string).split(',')[1]
      if (side==='L') { setImageL(base64); setMimeTypeL(file.type) }
      else { setImageR(base64); setMimeTypeR(file.type) }
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const analyze = async () => {
    if (!canStart) return
    setLoading(true); setError(''); setResult('')
    const drawn = drawCards()
    try {
      const res = await fetch('/api/uranai/sogo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, gender, birthdate, birthtime, birthplace, concern, imageL, imageR, mimeTypeL, mimeTypeR, cards: drawn }),
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

  const copy = async () => { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(()=>setCopied(false),3000) }
  const reset = () => { setName(''); setGender(''); setBirthdate(''); setBirthtime(''); setBirthplace(''); setConcern(''); setImageL(null); setImageR(null); setCards([]); setResult(''); setError('') }

  const s = { input: { width:'100%', background:'rgba(253,246,240,0.04)', border:'1px solid rgba(155,106,176,0.25)', borderRadius:10, padding:'11px 13px', color:'#fdf6f0', fontFamily:"'Noto Serif JP',serif", fontSize:13, outline:'none', boxSizing:'border-box' as const } }

  const CardGrid = ({cardList}:{cardList:any[]}) => (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8 }}>
      {cardList.map((card,i)=>(
        <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
          <div style={{ position:'relative', width:'100%', aspectRatio:'2/3', borderRadius:10, overflow:'hidden', border:'1px solid rgba(196,160,216,0.4)', transform:card.reversed?'rotate(180deg)':'' }}>
            <img src={card.img} alt={card.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
          <div style={{ fontSize:8, color:'#c4a0d8', textAlign:'center', lineHeight:1.3 }}>{card.name}</div>
          <div style={{ fontSize:7, color:'rgba(253,246,240,0.4)', textAlign:'center' }}>{card.position}</div>
          {card.reversed && <div style={{ fontSize:7, color:'#f0a8c0' }}>逆位置</div>}
        </div>
      ))}
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#120818,#1e0a28,#120618)', padding:'40px 20px 80px', fontFamily:"'Noto Serif JP',serif", color:'#fdf6f0' }}>
      <div style={{ maxWidth:620, margin:'0 auto' }}>

        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ fontSize:12, letterSpacing:'0.35em', color:'#d4a843', textTransform:'uppercase', marginBottom:12 }}>✦ Twinkle Star Oracle ✦</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:300, marginBottom:6 }}>
            AI<span style={{ color:'#c4a0d8', fontStyle:'italic' }}>総合鑑定</span>
          </h1>
          <div style={{ width:70, height:1, background:'linear-gradient(90deg,transparent,#d4a843,transparent)', margin:'12px auto' }} />
          <p style={{ fontSize:12, color:'rgba(253,246,240,0.45)', lineHeight:1.9 }}>手相・タロット・数秘術・ホロスコープを統合した<br />あなただけの本格リーディング</p>
        </div>

        {paymentSuccess && (
          <div style={{ background:'rgba(212,168,67,0.08)', border:'1px solid rgba(212,168,67,0.25)', borderRadius:12, padding:'14px 18px', textAlign:'center', fontSize:13, color:'#f0d080', marginBottom:24 }}>
            ✨ お支払いが完了しました。以下のフォームにご入力の上、手相画像をアップロードしてください。
          </div>
        )}

        <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(155,106,176,0.25)', borderRadius:20, padding:'32px 28px', backdropFilter:'blur(12px)' }}>

          {!result && !loading && (
            <>
              <div style={{ textAlign:'center', marginBottom:24 }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:'#c4a0d8', marginBottom:6 }}>🌙 お客様情報</div>
                <p style={{ fontSize:12, color:'rgba(253,246,240,0.45)', lineHeight:1.8 }}>正確な鑑定のため、できる限りご入力ください</p>
              </div>

              <div style={{ display:'grid', gap:14 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>お名前 <span style={{color:'#f0a8c0'}}>*</span></div><input style={s.input} value={name} onChange={e=>setName(e.target.value)} placeholder="山田 花子" /></div>
                  <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>性別 <span style={{color:'#f0a8c0'}}>*</span></div>
                    <select style={{...s.input, color:'#fdf6f0', backgroundColor:'#1e0a28'}} value={gender} onChange={e=>setGender(e.target.value)}>
                      <option value="" style={{background:'#1e0a28',color:'#fdf6f0'}}>選択</option><option value="女性" style={{background:'#1e0a28',color:'#fdf6f0'}}>女性</option><option value="男性" style={{background:'#1e0a28',color:'#fdf6f0'}}>男性</option><option value="その他" style={{background:'#1e0a28',color:'#fdf6f0'}}>その他</option>
                    </select>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>生年月日 <span style={{color:'#f0a8c0'}}>*</span></div><input style={s.input} type="date" value={birthdate} onChange={e=>setBirthdate(e.target.value)} /></div>
                  <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>出生時間（任意）</div><input style={s.input} type="time" value={birthtime} onChange={e=>setBirthtime(e.target.value)} /></div>
                </div>
                <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>出生地（任意）</div><input style={s.input} value={birthplace} onChange={e=>setBirthplace(e.target.value)} placeholder="例：東京都新宿区" /></div>
                <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>相談内容 <span style={{color:'#f0a8c0'}}>*</span></div><textarea style={{...s.input,resize:'none',height:80,lineHeight:1.7}} value={concern} onChange={e=>setConcern(e.target.value)} placeholder="例：仕事を変えるべきか迷っています。恋愛がうまくいかず悩んでいます。など" /></div>

                {/* 手相アップロード */}
                <div>
                  <div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:8 }}>手相画像 <span style={{color:'#f0a8c0'}}>*</span>（左右どちらか1枚以上）</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
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
                  <div style={{ fontSize:10, color:'rgba(253,246,240,0.3)', textAlign:'center', marginTop:8 }}>明るい場所で撮影・ピントを合わせてください</div>
                </div>
              </div>

              {error && <div style={{ background:'rgba(200,96,122,0.1)', border:'1px solid rgba(200,96,122,0.3)', borderRadius:10, padding:'12px 16px', fontSize:12, color:'#f0a8c0', textAlign:'center', marginTop:12 }}>{error}</div>}

              <button onClick={analyze} disabled={!canStart}
                style={{ width:'100%', padding:17, border:'none', borderRadius:14, background:'linear-gradient(135deg,#9b6ab0,#c4a0d8,#f0d080)', color:'white', fontFamily:"'Noto Serif JP',serif", fontSize:14, letterSpacing:'0.1em', cursor:canStart?'pointer':'not-allowed', opacity:canStart?1:0.4, marginTop:20, transition:'all 0.3s' }}>
                🔮 AI総合鑑定をはじめる
              </button>
            </>
          )}

          {loading && (
            <div style={{ textAlign:'center', padding:'52px 0' }}>
              {cards.length>0 && (
                <div style={{ marginBottom:28 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, color:'#f0d080', marginBottom:14 }}>🃏 あなたのタロットカード</div>
                  <CardGrid cardList={cards} />
                  <div style={{ fontSize:11, color:'rgba(253,246,240,0.4)', textAlign:'center', marginTop:10 }}>カードと手相・星の配置を統合しています…</div>
                </div>
              )}
              <div style={{ fontSize:56, marginBottom:20 }}>🌟</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:'#c4a0d8', marginBottom:10 }}>深く読み解いています…</div>
              <div style={{ fontSize:12, color:'rgba(253,246,240,0.4)', lineHeight:2 }}>手相・タロット・数秘術・ホロスコープ<br />すべてを統合して鑑定しています</div>
            </div>
          )}

          {result && (
            <>
              <div style={{ textAlign:'center', marginBottom:20 }}>
                <div style={{ fontSize:40, marginBottom:10 }}>✨</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:'#c4a0d8' }}>総合鑑定結果</div>
                <div style={{ fontSize:11, color:'rgba(253,246,240,0.4)', marginTop:4 }}>{name}様 | Twinkle Star Oracle</div>
              </div>
              <div style={{ width:70, height:1, background:'linear-gradient(90deg,transparent,#d4a843,transparent)', margin:'0 auto 16px' }} />

              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:'#f0d080', marginBottom:10, paddingLeft:10, borderLeft:'2px solid #d4a843' }}>🃏 引いたタロットカード</div>
              <CardGrid cardList={drawnCardsRef.current.length > 0 ? drawnCardsRef.current : cards} />

              <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(155,106,176,0.15)', borderRadius:14, padding:22, fontSize:13, lineHeight:2, color:'rgba(253,246,240,0.85)', whiteSpace:'pre-wrap', wordBreak:'break-word', margin:'16px 0' }}>
                {result}
              </div>

              <button onClick={copy} style={{ width:'100%', padding:13, border:`1px solid ${copied?'rgba(240,168,192,0.5)':'rgba(155,106,176,0.4)'}`, borderRadius:12, background:'transparent', color:copied?'#f0a8c0':'#c4a0d8', fontFamily:"'Noto Serif JP',serif", fontSize:13, cursor:'pointer', marginBottom:10, transition:'all 0.3s' }}>
                {copied?'✅ コピーしました！':'📋 テキストをコピー'}
              </button>
              <button onClick={reset} style={{ width:'100%', padding:11, border:'none', borderRadius:10, background:'rgba(253,246,240,0.04)', color:'rgba(253,246,240,0.35)', fontFamily:"'Noto Serif JP',serif", fontSize:11, cursor:'pointer' }}>
                最初からやり直す
              </button>
            </>
          )}
        </div>

        <div style={{ marginTop:24, padding:14, background:'rgba(155,106,176,0.04)', borderRadius:12, fontSize:11, color:'rgba(253,246,240,0.28)', lineHeight:1.9, textAlign:'center' }}>
          ご入力いただいた情報・画像は鑑定後に保持されません<br />結果はコピーして保存してください
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Noto+Serif+JP:wght@300;400&display=swap');`}</style>
    </div>
  )
}
