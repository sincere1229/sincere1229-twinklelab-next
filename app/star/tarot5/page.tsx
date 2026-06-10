// app/star/tarot5/page.tsx
'use client'
import { useState, useRef } from 'react'
import PayjpCheckoutButton from '../../components/PayjpCheckoutButton'
import { buildCliffhangers, CTA_OPTIONS } from '../../../lib/tarot5Stock'

const DECK = [
  {num:'0',name:'愚者',img:'/tarot/card_00_fool.jpg'},
  {num:'I',name:'魔術師',img:'/tarot/card_01_magician.jpg'},
  {num:'II',name:'女教皇',img:'/tarot/card_02_high-priestess.jpg'},
  {num:'III',name:'女帝',img:'/tarot/card_03_empress.jpg'},
  {num:'IV',name:'皇帝',img:'/tarot/card_04_emperor.jpg'},
  {num:'V',name:'法王',img:'/tarot/card_05_hierophant.jpg'},
  {num:'VI',name:'恋人',img:'/tarot/card_06_lovers.jpg'},
  {num:'VII',name:'戦車',img:'/tarot/card_07_chariot.jpg'},
  {num:'VIII',name:'力',img:'/tarot/card_08_strength.jpg'},
  {num:'IX',name:'隠者',img:'/tarot/card_09_hermit.jpg'},
  {num:'X',name:'運命の輪',img:'/tarot/card_10_wheel-of-fortune.jpg'},
  {num:'XI',name:'正義',img:'/tarot/card_11_justice.jpg'},
  {num:'XII',name:'吊られた男',img:'/tarot/card_12_hanged-man.jpg'},
  {num:'XIII',name:'死神',img:'/tarot/card_13_death.jpg'},
  {num:'XIV',name:'節制',img:'/tarot/card_14_temperance.jpg'},
  {num:'XV',name:'悪魔',img:'/tarot/card_15_devil.jpg'},
  {num:'XVI',name:'塔',img:'/tarot/card_16_tower.jpg'},
  {num:'XVII',name:'星',img:'/tarot/card_17_star.jpg'},
  {num:'XVIII',name:'月',img:'/tarot/card_18_moon.jpg'},
  {num:'XIX',name:'太陽',img:'/tarot/card_19_sun.jpg'},
  {num:'XX',name:'審判',img:'/tarot/card_20_judgement.jpg'},
  {num:'XXI',name:'世界',img:'/tarot/card_21_world.jpg'},
]
const POSITIONS = ['過去','現在','未来','課題','アドバイス']
function drawCards() {
  return [...DECK].sort(()=>Math.random()-0.5).slice(0,5).map((card,i)=>({...card, position:POSITIONS[i], reversed:Math.random()>0.7}))
}

const CTA_LABEL = `${CTA_OPTIONS[0]} ¥1,980`

const PAID_TEASERS = [
  { icon:'🃏', label:'5枚それぞれの詳しい意味' },
  { icon:'🔮', label:'今後3か月の流れ' },
  { icon:'👣', label:'具体的な行動指針' },
  { icon:'⚠️', label:'避けるべき行動' },
  { icon:'🍀', label:'開運アクション' },
  { icon:'🗺️', label:'あなた専用ロードマップ' },
  { icon:'💞', label:'テーマ別の深掘り' },
]

const blue = '#8a9be0'
const gold = '#f0d080'
const goldDeep = '#d4a843'

export default function Tarot5Page() {
  const [step, setStep] = useState<'form'|'loadingFree'|'free'>('form')
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [birthtime, setBirthtime] = useState('')
  const [birthplace, setBirthplace] = useState('')
  const [question, setQuestion] = useState('')
  const drawnRef = useRef<any[]>([])
  const [cards, setCards] = useState<any[]>([])
  const [freeResult, setFreeResult] = useState<any>(null)
  const [paidResult, setPaidResult] = useState<any>(null)
  const [paidLoading, setPaidLoading] = useState(false)
  const [error, setError] = useState('')

  const canStart = name && gender && birthdate && question

  const payload = (mode: string, chargeId?: string) => ({
    name, gender, birthdate, birthtime, birthplace, question,
    cards: drawnRef.current, mode, chargeId,
  })

  // 無料：カードを引いて浅い見立てを生成
  const handleFree = async () => {
    if (!canStart) return
    const drawn = drawCards()
    drawnRef.current = drawn
    setCards(drawn)
    setStep('loadingFree'); setError('')
    try {
      const res = await fetch('/api/uranai/tarot5', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload('free')),
      })
      const data = await res.json()
      if (data.success && data.result) { setFreeResult(data.result); setStep('free') }
      else { setError(data.error || 'エラーが発生しました'); setStep('form') }
    } catch {
      setError('通信エラーが発生しました。'); setStep('form')
    }
  }

  // 決済後：詳細を生成
  const handlePaid = async (chargeId: string) => {
    setPaidLoading(true); setError('')
    try {
      const res = await fetch('/api/uranai/tarot5', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload('paid', chargeId)),
      })
      const data = await res.json()
      if (data.success && data.result) setPaidResult(data.result)
      else setError(data.error || '鑑定の生成に失敗しました。お手数ですがお問い合わせください。')
    } catch {
      setError('通信エラーが発生しました。')
    } finally {
      setPaidLoading(false)
    }
  }

  const reset = () => {
    setStep('form'); setName(''); setGender(''); setBirthdate(''); setBirthtime('')
    setBirthplace(''); setQuestion(''); setCards([]); setFreeResult(null); setPaidResult(null); setError('')
  }

  const inputStyle = { width:'100%', background:'rgba(253,246,240,0.04)', border:'1px solid rgba(74,90,176,0.25)', borderRadius:10, padding:'11px 13px', color:'#fdf6f0', fontFamily:"'Noto Serif JP',serif", fontSize:13, outline:'none', boxSizing:'border-box' as const }

  const CardGrid = ({cardList}: {cardList:any[]}) => (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8 }}>
      {cardList.map((card,i)=>(
        <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
          <div style={{ position:'relative', width:'100%', aspectRatio:'2/3', borderRadius:10, overflow:'hidden', border:'1px solid rgba(138,155,224,0.4)', transform:card.reversed?'rotate(180deg)':'' }}>
            <img src={card.img} alt={card.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
          <div style={{ fontSize:8, color:blue, textAlign:'center', lineHeight:1.3 }}>{card.name}</div>
          <div style={{ fontSize:7, color:'rgba(253,246,240,0.4)', textAlign:'center' }}>{card.position}</div>
          {card.reversed && <div style={{ fontSize:7, color:'#f0a8c0' }}>逆位置</div>}
        </div>
      ))}
    </div>
  )

  const sectionBox = { background:'rgba(253,246,240,0.03)', border:'1px solid rgba(74,90,176,0.18)', borderRadius:14, padding:'18px 18px', marginBottom:14 } as const
  const sectionTitle = { fontSize:13, color:gold, fontWeight:700, margin:'0 0 8px' } as const
  const bodyText = { fontSize:13, lineHeight:1.9, color:'rgba(253,246,240,0.85)', margin:0, whiteSpace:'pre-wrap' as const }

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#080818,#100828,#080818)', padding:'40px 20px 80px', fontFamily:"'Noto Serif JP',serif", color:'#fdf6f0' }}>
      <div style={{ maxWidth:620, margin:'0 auto' }}>

        <div style={{ textAlign:'center', marginBottom:34 }}>
          <div style={{ fontSize:12, letterSpacing:'0.35em', color:goldDeep, textTransform:'uppercase', marginBottom:12 }}>✦ Twinkle Star Oracle ✦</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:300, marginBottom:6 }}>タロット5枚引き<br /><span style={{ color:blue, fontStyle:'italic' }}>＋ホロスコープ鑑定</span></h1>
          <div style={{ width:70, height:1, background:`linear-gradient(90deg,transparent,${goldDeep},transparent)`, margin:'12px auto' }} />
          <p style={{ fontSize:12, color:'rgba(253,246,240,0.45)', lineHeight:1.9 }}>まずは無料で5枚を引いて、今の流れを見てみましょう</p>
        </div>

        {/* 入力フォーム（無料スタート） */}
        {step === 'form' && (
          <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(74,90,176,0.25)', borderRadius:20, padding:'30px 26px' }}>
            <div style={{ textAlign:'center', marginBottom:18 }}>
              <div style={{ fontSize:34, marginBottom:10 }}>🃏</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:blue }}>5枚を引く前に教えてください</div>
              <p style={{ fontSize:11, color:'rgba(253,246,240,0.4)', marginTop:6 }}>無料・登録不要</p>
            </div>
            <div style={{ display:'grid', gap:14 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>お名前 *</div><input style={inputStyle} value={name} onChange={e=>setName(e.target.value)} placeholder="山田 花子" /></div>
                <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>性別 *</div>
                  <select style={{...inputStyle, backgroundColor:'#100828'}} value={gender} onChange={e=>setGender(e.target.value)}>
                    <option value="">選択</option><option value="女性">女性</option><option value="男性">男性</option><option value="その他">その他</option>
                  </select>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>生年月日 *</div><input style={inputStyle} type="date" value={birthdate} onChange={e=>setBirthdate(e.target.value)} /></div>
                <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>出生時間（任意）</div><input style={inputStyle} type="time" value={birthtime} onChange={e=>setBirthtime(e.target.value)} /></div>
              </div>
              <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>出生地（任意）</div><input style={inputStyle} value={birthplace} onChange={e=>setBirthplace(e.target.value)} placeholder="例：東京都渋谷区" /></div>
              <div><div style={{ fontSize:11, color:'rgba(253,246,240,0.5)', marginBottom:6 }}>今いちばん聞きたいこと *</div>
                <textarea style={{...inputStyle, resize:'none', height:75, lineHeight:1.7}} value={question} onChange={e=>setQuestion(e.target.value)} placeholder="例：仕事を変えるべき？　彼との関係は？など" />
              </div>
            </div>
            {error && <div style={{ background:'rgba(200,96,122,0.1)', border:'1px solid rgba(200,96,122,0.3)', borderRadius:10, padding:'12px 16px', fontSize:12, color:'#f0a8c0', textAlign:'center', marginTop:12 }}>{error}</div>}
            <button onClick={handleFree} disabled={!canStart}
              style={{ width:'100%', padding:16, border:'none', borderRadius:14, background:'linear-gradient(135deg,#4a5ab0,#7b5ea7,#f0d080)', color:'white', fontFamily:"'Noto Serif JP',serif", fontSize:15, letterSpacing:'0.08em', cursor:canStart?'pointer':'not-allowed', opacity:canStart?1:0.4, marginTop:18 }}>
              🆓 無料で5枚を引く
            </button>
            <a href="/star" style={{ display:'block', textAlign:'center', marginTop:14, fontSize:12, color:'rgba(253,246,240,0.4)', textDecoration:'none' }}>← 占いポータルに戻る</a>
          </div>
        )}

        {step === 'loadingFree' && (
          <div style={{ background:'rgba(253,246,240,0.03)', border:'1px solid rgba(74,90,176,0.25)', borderRadius:20, padding:'52px 28px', textAlign:'center' }}>
            <div style={{ fontSize:52, marginBottom:18 }}>🔮</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:blue, marginBottom:8 }}>カードが語りかけています…</div>
            <div style={{ fontSize:12, color:'rgba(253,246,240,0.4)', lineHeight:2.2 }}>5枚のカードから、今の流れを読み解いています</div>
          </div>
        )}

        {/* 無料結果 */}
        {step === 'free' && freeResult && (
          <div>
            {/* カード */}
            <div style={{ ...sectionBox }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:gold, marginBottom:10, paddingLeft:10, borderLeft:`2px solid ${goldDeep}` }}>🃏 引いた5枚</div>
              <CardGrid cardList={cards} />
            </div>

            {/* 今のテーマ */}
            {freeResult.theme && (
              <div style={{ textAlign:'center', marginBottom:14 }}>
                <span style={{ fontSize:11, color:'rgba(253,246,240,0.45)' }}>今のテーマ</span>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:blue, marginTop:4 }}>“{freeResult.theme}”</div>
              </div>
            )}

            {/* 5枚の簡単な見立て */}
            <div style={{ ...sectionBox }}>
              <p style={sectionTitle}>🔍 5枚の見立て</p>
              {cards.map((c, i) => (
                <div key={i} style={{ display:'flex', gap:10, padding:'8px 0', borderBottom:i<4?'1px solid rgba(74,90,176,0.12)':'none' }}>
                  <div style={{ fontSize:11, color:blue, minWidth:64 }}>{c.position}・{c.name}</div>
                  <div style={{ fontSize:12, color:'rgba(253,246,240,0.8)', lineHeight:1.6, flex:1 }}>{freeResult.cardReads?.[i] || ''}</div>
                </div>
              ))}
            </div>

            {freeResult.overallTrend && (
              <div style={sectionBox}><p style={sectionTitle}>🌊 全体の傾向</p><p style={bodyText}>{freeResult.overallTrend}</p></div>
            )}
            {freeResult.possibilityLine && (
              <div style={{ ...sectionBox, background:'rgba(138,155,224,0.08)', borderColor:'rgba(138,155,224,0.3)' }}>
                <p style={sectionTitle}>✨ 可能性を感じる一言</p><p style={bodyText}>{freeResult.possibilityLine}</p>
              </div>
            )}
            {freeResult.hookMessage && (
              <div style={{ background:'linear-gradient(135deg,rgba(138,155,224,0.12),rgba(240,208,128,0.08))', border:`1px solid rgba(212,168,67,0.3)`, borderRadius:16, padding:'20px', textAlign:'center', marginBottom:18 }}>
                <div style={{ fontSize:28, marginBottom:6 }}>🐥</div>
                <p style={{ fontSize:13, color:gold, lineHeight:1.85, margin:0 }}>{freeResult.hookMessage}</p>
              </div>
            )}

            {/* 有料：詳細 or ロック */}
            {paidResult ? (
              <PaidView result={paidResult} cards={cards} sectionBox={sectionBox} sectionTitle={sectionTitle} bodyText={bodyText} />
            ) : paidLoading ? (
              <div style={{ ...sectionBox, textAlign:'center', padding:'40px 20px' }}>
                <div style={{ fontSize:38, marginBottom:10 }}>🔓</div>
                <p style={{ fontSize:15, fontWeight:700, color:gold, margin:'0 0 6px' }}>完全鑑定を読み解いています…</p>
                <p style={{ fontSize:12, color:'rgba(253,246,240,0.5)', margin:0 }}>5枚の意味と今後の流れを詳しく分析中です</p>
              </div>
            ) : (
              <div style={{ background:'linear-gradient(135deg,rgba(74,90,176,0.12),rgba(20,12,40,0.5))', border:`1.5px solid ${goldDeep}`, borderRadius:20, padding:'24px 20px', marginBottom:18 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                  <span style={{ fontSize:28 }}>🔒</span>
                  <div>
                    <p style={{ fontSize:16, fontWeight:700, color:gold, margin:'0 0 2px' }}>完全版でわかること</p>
                    <p style={{ fontSize:11, color:'rgba(253,246,240,0.5)', margin:0 }}>5枚の本当の意味と、未来・行動まで</p>
                  </div>
                </div>

                {/* クリフハンガー（引いたカードに対応） */}
                <div style={{ display:'grid', gap:8, marginBottom:14 }}>
                  {buildCliffhangers(cards).map((c, i) => (
                    <div key={i} style={{ background:'rgba(8,8,24,0.5)', border:'1px solid rgba(138,155,224,0.2)', borderRadius:12, padding:'12px 14px' }}>
                      <div style={{ fontSize:11, color:blue, marginBottom:4 }}>{c.head}（{c.card}）</div>
                      <div style={{ fontSize:13, color:gold, fontWeight:600 }}>「{c.tail}」</div>
                    </div>
                  ))}
                </div>

                {/* ティーザー一覧 */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
                  {PAID_TEASERS.map(t => (
                    <div key={t.label} style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(253,246,240,0.03)', borderRadius:10, padding:'10px 10px', border:'1px solid rgba(74,90,176,0.15)' }}>
                      <span style={{ fontSize:16 }}>{t.icon}</span>
                      <span style={{ fontSize:11, color:'rgba(253,246,240,0.85)', flex:1 }}>{t.label}</span>
                      <span style={{ fontSize:11, opacity:0.5 }}>🔒</span>
                    </div>
                  ))}
                </div>

                {error && <p style={{ color:'#f0a8c0', fontSize:13, textAlign:'center', marginBottom:10 }}>{error}</p>}
                <PayjpCheckoutButton product="tarot5" label={CTA_LABEL} onPaid={handlePaid} />
                <p style={{ fontSize:11, color:'rgba(253,246,240,0.4)', textAlign:'center', margin:'10px 0 0' }}>決済後すぐに、このページで完全鑑定が開きます</p>
              </div>
            )}

            <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:12 }}>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('タロット5枚引きをやってみた✨ #TwinkleStarOracle\nhttps://twinkle-lab.jp/star/tarot5')}`} target="_blank" rel="noopener noreferrer"
                style={{ padding:'10px 20px', borderRadius:10, border:'1px solid rgba(74,90,176,0.3)', background:'transparent', color:'rgba(253,246,240,0.5)', fontSize:12, textDecoration:'none' }}>𝕏 シェア</a>
              <a href="/star" style={{ padding:'10px 20px', borderRadius:10, border:'1px solid rgba(74,90,176,0.3)', background:'transparent', color:'rgba(253,246,240,0.5)', fontSize:12, textDecoration:'none' }}>🌟 占いポータルへ</a>
            </div>
            <button onClick={reset} style={{ width:'100%', padding:11, border:'none', borderRadius:10, background:'rgba(253,246,240,0.03)', color:'rgba(253,246,240,0.35)', fontFamily:"'Noto Serif JP',serif", fontSize:11, cursor:'pointer' }}>最初からやり直す</button>
          </div>
        )}

      </div>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Noto+Serif+JP:wght@300;400&display=swap');"}</style>
    </div>
  )
}

/* 有料の詳細表示 */
function PaidView({ result, cards, sectionBox, sectionTitle, bodyText }: any) {
  const gold = '#f0d080', blue = '#8a9be0', goldDeep = '#d4a843'
  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:'linear-gradient(135deg,rgba(138,155,224,0.12),rgba(240,208,128,0.1))', border:`1px solid ${goldDeep}`, borderRadius:14, padding:12, marginBottom:16 }}>
        <span style={{ fontSize:18 }}>✨</span>
        <span style={{ fontSize:13, fontWeight:900, color:gold }}>完全鑑定が解放されました</span>
      </div>

      {result.specialNote && (
        <div style={{ background:'linear-gradient(135deg,rgba(240,208,128,0.14),rgba(138,155,224,0.08))', border:`1px solid ${goldDeep}`, borderRadius:14, padding:'14px 16px', marginBottom:16, textAlign:'center' }}>
          <span style={{ fontSize:13, color:gold, fontWeight:600 }}>🌟 {result.specialNote}</span>
        </div>
      )}

      <div style={sectionBox}>
        <p style={sectionTitle}>🃏 5枚それぞれの詳しい意味</p>
        {(result.cardMeanings || []).map((m: any, i: number) => (
          <div key={i} style={{ padding:'10px 0', borderBottom:i<(result.cardMeanings.length-1)?'1px solid rgba(74,90,176,0.12)':'none' }}>
            <div style={{ fontSize:12, color:blue, fontWeight:700, marginBottom:4 }}>{m.position}・{m.name}</div>
            <div style={{ fontSize:12.5, color:'rgba(253,246,240,0.85)', lineHeight:1.8 }}>{m.meaning}</div>
          </div>
        ))}
      </div>

      {(result.flow30days || result.flow90days || result.halfYearGoal) && (
        <div style={sectionBox}>
          <p style={sectionTitle}>🔮 未来の流れ</p>
          {result.flow30days && (
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:12, color:blue, fontWeight:700, marginBottom:4 }}>🗓 今後30日</div>
              <p style={{ ...bodyText, fontSize:12.5 }}>{result.flow30days}</p>
            </div>
          )}
          {result.flow90days && (
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:12, color:blue, fontWeight:700, marginBottom:4 }}>🗓 今後90日</div>
              <p style={{ ...bodyText, fontSize:12.5 }}>{result.flow90days}</p>
            </div>
          )}
          {result.halfYearGoal && (
            <div>
              <div style={{ fontSize:12, color:blue, fontWeight:700, marginBottom:4 }}>🗓 半年後の到達地点</div>
              <p style={{ ...bodyText, fontSize:12.5 }}>{result.halfYearGoal}</p>
            </div>
          )}
        </div>
      )}
      {result.forecast3months && !result.flow90days && <div style={sectionBox}><p style={sectionTitle}>🔮 今後3か月の流れ</p><p style={bodyText}>{result.forecast3months}</p></div>}
      {result.themeDeepDive && <div style={sectionBox}><p style={sectionTitle}>💞 テーマ別の深掘り</p><p style={bodyText}>{result.themeDeepDive}</p></div>}
      {result.actionGuide && <div style={sectionBox}><p style={sectionTitle}>👣 具体的な行動指針</p><p style={bodyText}>{result.actionGuide}</p></div>}

      {Array.isArray(result.avoidActions) && result.avoidActions.length > 0 && (
        <div style={sectionBox}>
          <p style={sectionTitle}>⚠️ 避けるべき行動</p>
          {result.avoidActions.map((a: string, i: number) => (
            <div key={i} style={{ fontSize:12.5, color:'rgba(253,246,240,0.82)', lineHeight:1.8, marginBottom:6 }}><span style={{ color:'#f0a8c0', marginRight:8 }}>✕</span>{a}</div>
          ))}
        </div>
      )}
      {Array.isArray(result.luckActions) && result.luckActions.length > 0 && (
        <div style={sectionBox}>
          <p style={sectionTitle}>🍀 開運アクション</p>
          {result.luckActions.map((a: string, i: number) => (
            <div key={i} style={{ fontSize:12.5, color:'rgba(253,246,240,0.82)', lineHeight:1.8, marginBottom:6 }}><span style={{ color:goldDeep, marginRight:8 }}>✦</span>{a}</div>
          ))}
        </div>
      )}
      {Array.isArray(result.roadmap) && result.roadmap.length > 0 && (
        <div style={sectionBox}>
          <p style={sectionTitle}>🗺️ あなた専用ロードマップ</p>
          {result.roadmap.map((r: any, i: number) => (
            <div key={i} style={{ display:'flex', gap:12, marginBottom:10 }}>
              <div style={{ fontSize:11, fontWeight:700, color:blue, minWidth:88 }}>{r.period}</div>
              <div style={{ fontSize:12.5, color:'rgba(253,246,240,0.82)', lineHeight:1.7, flex:1 }}>{r.action}</div>
            </div>
          ))}
        </div>
      )}

      {result.piyochanMessage && (
        <div style={{ background:'rgba(138,155,224,0.08)', border:'1px solid rgba(138,155,224,0.25)', borderRadius:16, padding:'20px', textAlign:'center', marginBottom:14 }}>
          <div style={{ fontSize:30, marginBottom:6 }}>🐥</div>
          <p style={{ fontSize:13, color:gold, lineHeight:1.8, margin:0 }}>{result.piyochanMessage}</p>
        </div>
      )}
      {result.disclaimer && <p style={{ fontSize:11, color:'rgba(253,246,240,0.4)', lineHeight:1.6, textAlign:'center', padding:12, border:'1px solid rgba(74,90,176,0.2)', borderRadius:10, marginBottom:14 }}>{result.disclaimer}</p>}
    </div>
  )
}
