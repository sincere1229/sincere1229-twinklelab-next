'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FormInputs {
  yourType: string; yourWeekend: string; yourAloneTime: string; yourFriends: string
  yourFamily: string; yourFamilyPriority: string; yourHobbies: string
  partnerType: string; partnerWeekend: string; partnerAloneTime: string; partnerFriends: string
  partnerFamily: string; partnerFamilyPriority: string; partnerHobbies: string
  recentEvent: string; recentHappy: string; memorableEvent: string
}

interface AdviceItem { title: string; detail: string; conversationExample: string }

interface DiagnosisResult {
  score: string; positiveSummary: string; coreGap: string
  realScene: string; familyAndFriendImpact: string; conflictReason: string
  advice: AdviceItem[]; futureStoryPreview: string; futureStoryFull: string
  piyochanMessage: string; disclaimer: string
}

const PERSONALITY_TYPES = [
  { value: 'active-outdoor', label: '🌟 アクティブ派（外出・冒険が好き）' },
  { value: 'homebody', label: '🏠 インドア派（家でのんびりが好き）' },
  { value: 'social-butterfly', label: '🦋 社交的（人と会うのが好き）' },
  { value: 'introvert', label: '🌙 内向的（少人数が落ち着く）' },
  { value: 'balanced', label: '⚖️ バランス型（状況による）' },
]
const WEEKEND_TYPES = [
  { value: 'travel', label: '✈️ 旅行・お出かけ' },
  { value: 'sports', label: '⚽ スポーツ・運動' },
  { value: 'friends', label: '👫 友達と遊ぶ' },
  { value: 'hobby', label: '🎨 趣味に没頭' },
  { value: 'relaxing', label: '😌 ゆっくり休む' },
  { value: 'shopping', label: '🛍️ ショッピング' },
]
const ALONE_TIME = [
  { value: 'very-much', label: '🔋 かなり必要（週に数時間は一人の時間が必要）' },
  { value: 'sometimes', label: '🌿 ときどき必要（疲れたら一人になりたい）' },
  { value: 'not-really', label: '🌞 あまり必要ない（一緒にいると元気になる）' },
]
const FAMILY_PRIORITY = [
  { value: 'top', label: '👨‍👩‍👧 最優先（家族行事は絶対参加）' },
  { value: 'important', label: '💛 大切だが調整可能' },
  { value: 'flexible', label: '🍃 状況次第' },
  { value: 'low', label: '🕊️ あまり重視しない' },
]

const pink = '#f472b6'
const pinkLight = '#fce7f3'
const pinkDark = '#db2777'
const purple = '#a855f7'
const textMain = '#1e1b4b'
const textSub = '#64748b'

export function CompatibilityAIClient() {
  const [step, setStep] = useState(0)
  const [inputs, setInputs] = useState<FormInputs>({
    yourType: '', yourWeekend: '', yourAloneTime: '', yourFriends: '',
    yourFamily: '', yourFamilyPriority: '', yourHobbies: '',
    partnerType: '', partnerWeekend: '', partnerAloneTime: '', partnerFriends: '',
    partnerFamily: '', partnerFamilyPriority: '', partnerHobbies: '',
    recentEvent: '', recentHappy: '', memorableEvent: '',
  })
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isPaid, setIsPaid] = useState(false)
  const [paidResult, setPaidResult] = useState<DiagnosisResult | null>(null)
  const [paidLoading, setPaidLoading] = useState(false)
  const [paidError, setPaidError] = useState('')

  const update = (key: keyof FormInputs, value: string) =>
    setInputs(prev => ({ ...prev, [key]: value }))

  const handleDiagnose = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/compatibility-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs, mode: 'free' }),
      })
      const data = await res.json()
      if (data.success && data.result) {
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem('compatibility_inputs', JSON.stringify(inputs))
            window.localStorage.setItem('compatibility_free_result', JSON.stringify(data.result))
          } catch(e) { console.error('localStorage error:', e) }
        }
        setResult(data.result)
        setStep(5)
      } else {
        setError(data.error || 'エラーが発生しました')
      }
    } catch {
      setError('通信エラーが発生しました。もう一度お試しください。')
    } finally {
      setLoading(false)
    }
  }

  const handlePaidTest = async () => {
    setPaidLoading(true)
    setPaidError('')
    try {
      const res = await fetch('/api/compatibility-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs, mode: 'paid' }),
      })
      const data = await res.json()
      if (data.success && data.result) {
        setPaidResult(data.result)
        setIsPaid(true)
        setTimeout(() => {
          document.getElementById('paid-result-anchor')?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      } else {
        setPaidError(data.error || 'エラーが発生しました')
      }
    } catch {
      setPaidError('通信エラーが発生しました。もう一度お試しください。')
    } finally {
      setPaidLoading(false)
    }
  }

  const resetAll = () => {
    setStep(0); setResult(null); setPaidResult(null)
    setIsPaid(false); setError(''); setPaidError('')
  }

  // ランディング
  if (step === 0) return (
    <div style={s.page}>
      <div style={s.container}>
        <div style={s.header}><Link href="/star" style={s.backLink}>← 占いトップへ</Link></div>
        <div style={s.hero}>
          <div style={s.badge}>💘 NEW</div>
          <h1 style={s.heroTitle}>この関係、<br />このままでいい？</h1>
          <p style={s.heroSub}>AIが読み解く<br /><span style={s.heroAccent}>「すれ違いの正体」</span>と1年後の未来</p>
          <div style={s.piyochan}>🐥</div>
          <p style={s.piyoMsg}>大丈夫だよ。ふたりのすれ違いには、ちゃんと理由があるんだよ🌸</p>
          <button style={s.primaryBtn} onClick={() => setStep(1)}>✨ 無料で診断する</button>
          <p style={s.freeNote}>入力データは保存されません・完全無料</p>
        </div>
        <div style={s.features}>
          {[['💬','すれ違いの\n本質を解説'],['📖','1年後の\nストーリー'],['💡','改善策＆\n会話テンプレ']].map(([icon,text]) => (
            <div key={text} style={s.featureItem}>
              <span style={s.featureIcon}>{icon}</span>
              <p style={s.featureText}>{text}</p>
            </div>
          ))}
        </div>
        <div style={s.priceCard}>
          <p style={s.priceLabel}>💘 AI相性診断（詳細版）</p>
          <p style={s.price}><span style={s.origPrice}>通常 ¥1,980</span><span style={s.salePrice}> → 初回限定 ¥980</span></p>
          <p style={s.priceDesc}>具体シーン・喧嘩の理由・会話テンプレ付き</p>
        </div>
        <div style={{textAlign:'center',marginBottom:'24px'}}>
          <Link href="/star/compatibility-ai/sample" style={s.sampleBtn}>📋 サンプル診断結果を見る</Link>
        </div>
      </div>
    </div>
  )

  // STEP1
  if (step === 1) return (
    <div style={s.page}><div style={s.container}>
      <StepHeader step={1} total={4} title="性格タイプ" onBack={() => setStep(0)} />
      <Section title="あなたの性格タイプ" emoji="💫">
        {PERSONALITY_TYPES.map(o => <ChoiceBtn key={o.value} label={o.label} selected={inputs.yourType===o.value} onClick={() => update('yourType',o.value)} />)}
      </Section>
      <Section title="相手の性格タイプ" emoji="💖">
        {PERSONALITY_TYPES.map(o => <ChoiceBtn key={o.value} label={o.label} selected={inputs.partnerType===o.value} onClick={() => update('partnerType',o.value)} />)}
      </Section>
      <NavBtns onNext={() => setStep(2)} nextDisabled={!inputs.yourType||!inputs.partnerType} />
    </div></div>
  )

  // STEP2
  if (step === 2) return (
    <div style={s.page}><div style={s.container}>
      <StepHeader step={2} total={4} title="生活スタイル" onBack={() => setStep(1)} />
      <Section title="あなたの休日の過ごし方" emoji="☀️">
        {WEEKEND_TYPES.map(o => <ChoiceBtn key={o.value} label={o.label} selected={inputs.yourWeekend===o.value} onClick={() => update('yourWeekend',o.value)} />)}
      </Section>
      <Section title="相手の休日の過ごし方" emoji="🌙">
        {WEEKEND_TYPES.map(o => <ChoiceBtn key={o.value} label={o.label} selected={inputs.partnerWeekend===o.value} onClick={() => update('partnerWeekend',o.value)} />)}
      </Section>
      <Section title="あなたの「一人の時間」の必要性" emoji="🔋">
        {ALONE_TIME.map(o => <ChoiceBtn key={o.value} label={o.label} selected={inputs.yourAloneTime===o.value} onClick={() => update('yourAloneTime',o.value)} />)}
      </Section>
      <Section title="相手の「一人の時間」の必要性" emoji="🌿">
        {ALONE_TIME.map(o => <ChoiceBtn key={o.value} label={o.label} selected={inputs.partnerAloneTime===o.value} onClick={() => update('partnerAloneTime',o.value)} />)}
      </Section>
      <NavBtns onBack={() => setStep(1)} onNext={() => setStep(3)} nextDisabled={!inputs.yourWeekend||!inputs.partnerWeekend||!inputs.yourAloneTime||!inputs.partnerAloneTime} />
    </div></div>
  )

  // STEP3
  if (step === 3) return (
    <div style={s.page}><div style={s.container}>
      <StepHeader step={3} total={4} title="人間関係" onBack={() => setStep(2)} />
      <Section title="あなたの友人関係" emoji="👫">
        <textarea style={s.textarea} placeholder="例：少人数の仲の良い友達が数人いる..." value={inputs.yourFriends} onChange={e => update('yourFriends',e.target.value)} />
      </Section>
      <Section title="相手の友人関係" emoji="🤝">
        <textarea style={s.textarea} placeholder="例：友達が多くていつも誰かと遊んでいる..." value={inputs.partnerFriends} onChange={e => update('partnerFriends',e.target.value)} />
      </Section>
      <Section title="あなたの家族との関係" emoji="🏡">
        <textarea style={s.textarea} placeholder="例：家族仲が良くよく連絡を取る..." value={inputs.yourFamily} onChange={e => update('yourFamily',e.target.value)} />
      </Section>
      <Section title="相手の家族との関係" emoji="💕">
        <textarea style={s.textarea} placeholder="例：家族の仲がとても密で行事を大切にする..." value={inputs.partnerFamily} onChange={e => update('partnerFamily',e.target.value)} />
      </Section>
      <Section title="あなたの趣味・コミュニティ" emoji="🎨">
        <textarea style={s.textarea} placeholder="例：週1回テニスサークル、Netflix..." value={inputs.yourHobbies} onChange={e => update('yourHobbies',e.target.value)} />
      </Section>
      <Section title="相手の趣味・コミュニティ" emoji="⚽">
        <textarea style={s.textarea} placeholder="例：サッカー観戦、ゲーム仲間と集まる..." value={inputs.partnerHobbies} onChange={e => update('partnerHobbies',e.target.value)} />
      </Section>
      <Section title="あなたの家族行事の優先度" emoji="👨‍👩‍👧">
        {FAMILY_PRIORITY.map(o => <ChoiceBtn key={o.value} label={o.label} selected={inputs.yourFamilyPriority===o.value} onClick={() => update('yourFamilyPriority',o.value)} />)}
      </Section>
      <Section title="相手の家族行事の優先度" emoji="💛">
        {FAMILY_PRIORITY.map(o => <ChoiceBtn key={o.value} label={o.label} selected={inputs.partnerFamilyPriority===o.value} onClick={() => update('partnerFamilyPriority',o.value)} />)}
      </Section>
      <NavBtns onBack={() => setStep(2)} onNext={() => setStep(4)} nextDisabled={!inputs.yourFamilyPriority||!inputs.partnerFamilyPriority} />
    </div></div>
  )

  // STEP4
  if (step === 4) return (
    <div style={s.page}><div style={s.container}>
      <StepHeader step={4} total={4} title="最近のエピソード" onBack={() => setStep(3)} />
      <div style={s.episodeNote}><p>🐥 具体的なエピソードがあると、より精度の高い診断ができるよ！</p></div>
      <Section title="最近の小さな出来事" emoji="📝">
        <textarea style={s.textarea} placeholder="例：相手に誘われたけど疲れていて断ったら空気が悪くなった..." value={inputs.recentEvent} onChange={e => update('recentEvent',e.target.value)} />
      </Section>
      <Section title="最近嬉しかったこと" emoji="😊">
        <textarea style={s.textarea} placeholder="例：ふたりで料理を作って楽しかった..." value={inputs.recentHappy} onChange={e => update('recentHappy',e.target.value)} />
      </Section>
      <Section title="印象的な出来事（気になっていること）" emoji="💭">
        <textarea style={s.textarea} placeholder="例：友達の誘いを優先されてもやもやした..." value={inputs.memorableEvent} onChange={e => update('memorableEvent',e.target.value)} />
      </Section>
      {error && <p style={s.errorText}>{error}</p>}
      <button style={{...s.primaryBtn, opacity: loading ? 0.7 : 1}} onClick={handleDiagnose} disabled={loading}>
        {loading ? '✨ AI診断中...' : '💫 診断結果を見る'}
      </button>
      <button style={s.backBtn2} onClick={() => setStep(3)}>← 戻る</button>
    </div></div>
  )

  // RESULT
  if (step === 5 && result) {
    const score = parseInt(result.score) || 70
    return (
      <div style={s.page}><div style={s.container}>

        {/* スコア */}
        <div style={s.scoreCard}>
          <p style={s.scoreLabel}>💘 ふたりの相性スコア</p>
          <div style={s.scoreCircle}>
            <span style={s.scoreNum}>{score}</span>
            <span style={s.scorePct}>点</span>
          </div>
          <div style={s.scoreBar}><div style={{...s.scoreBarFill, width:`${score}%`}} /></div>
        </div>

        {/* 無料結果 */}
        <ResultSection title="💖 ふたりの良いところ" text={result.positiveSummary} />
        <ResultSection title="💬 すれ違いの正体" text={result.coreGap} />

        {/* ストーリー */}
        <div style={s.storyCard}>
          <p style={s.storyTitle}>📖 1年後のふたりのストーリー...</p>
          <p style={s.storyText}>{result.futureStoryPreview}</p>
          <div style={s.storyBlur}><p style={s.storyBlurText}>続きは詳細版で...</p></div>
        </div>

        {/* ぴよちゃん */}
        <div style={s.piyoCard}>
          <div style={{fontSize:'40px',marginBottom:'8px'}}>🐥</div>
          <p style={s.piyoText}>{result.piyochanMessage}</p>
        </div>

        {/* LINE導線（無料） */}
        <div style={s.lineCardFree}>
          <p style={s.lineFreeTitle}>📱 手相診断も気になりませんか？</p>
          <p style={s.lineFreeDesc}>LINEに登録すると<br />手相診断の受付・占い結果のご質問ができます✨</p>
          <ul style={s.lineList}>
            <li>🤲 手相診断の受付（両手の写真を送るだけ）</li>
            <li>💬 占い結果へのご質問</li>
            <li>🌟 Twinkle Star Oracleからのお知らせ（不定期）</li>
          </ul>
          <a href="https://lin.ee/XHDFrA8" target="_blank" rel="noopener noreferrer" style={s.lineBtn}>🟢 無料で受け取る</a>
        </div>

        {/* 有料ロック or 有料結果 */}
        {!isPaid ? (
          <div style={s.lockCard}>
            <p style={s.lockTitle}>🔒 詳細診断でもっと深く知る</p>
            <ul style={s.lockList}>
              <li>✨ 具体的なすれ違いシーン</li>
              <li>✨ 家族・友人関係の影響</li>
              <li>✨ 喧嘩になる理由と対処法</li>
              <li>✨ 改善策＆会話テンプレート</li>
              <li>✨ 1年後のストーリー完全版</li>
            </ul>
            <p style={s.lockPrice}>
              <span style={s.lockOrig}>通常 ¥1,980</span>{' → '}
              <span style={s.lockSale}>初回限定 ¥980</span>
            </p>
            <a href={process.env.NEXT_PUBLIC_STRIPE_COMPATIBILITY_URL || 'https://buy.stripe.com/dRmfZa5vggcGfZbfRx33W06'} rel="noopener noreferrer" style={s.primaryBtn as React.CSSProperties}>
              💘 この関係を壊さない方法を見る（¥980）
            </a>
            <Link href="/star/compatibility-ai/sample" style={s.sampleFallback}>📋 まずサンプルを見てみる</Link>
            {/* テストボタン */}
            <div style={s.demoSection}>
              <p style={s.demoNote}>※ 購入後はこのページが更新されます。下は動作確認用です。</p>
              {paidLoading ? (
                <div style={s.paidLoading}><p style={s.paidLoadingText}>✨ あなた専用の続きを読み解いています…</p></div>
              ) : (
                <button style={s.demoBtn} onClick={handlePaidTest} disabled={paidLoading}>🔓 有料版を表示（テスト）</button>
              )}
              {paidError && <p style={s.errorText}>{paidError}</p>}
            </div>
          </div>
        ) : paidResult ? (
          <div id="paid-result-anchor">
            <div style={s.paidHeader}>
              <span style={s.paidBadge}>💘 詳細診断</span>
              <p style={s.paidHeaderTitle}>ふたりのすれ違いの全貌</p>
            </div>
            {paidResult.realScene ? <ResultSection title="🎬 実際のすれ違いシーン" text={paidResult.realScene} /> : null}
            {paidResult.familyAndFriendImpact ? <ResultSection title="👨‍👩‍👧 家族・友人関係の影響" text={paidResult.familyAndFriendImpact} /> : null}
            {paidResult.conflictReason ? <ResultSection title="💥 喧嘩になる理由" text={paidResult.conflictReason} /> : null}
            {paidResult.advice && paidResult.advice.length > 0 && (
              <div style={s.adviceBlock}>
                <p style={s.adviceBlockTitle}>💡 改善策＆会話テンプレート</p>
                {paidResult.advice.map((a, i) => (
                  <div key={i} style={s.adviceItem}>
                    <p style={s.adviceTitle}>✦ {a.title}</p>
                    {a.detail ? <p style={s.adviceDetail}>{a.detail}</p> : null}
                    {a.conversationExample ? (
                      <div style={s.convBox}>
                        <p style={s.convLabel}>💬 会話例</p>
                        <p style={s.convText}>{a.conversationExample}</p>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
            {paidResult.futureStoryFull ? (
              <div style={s.storyCardFull}>
                <p style={s.storyTitle}>📖 1年後のふたりのストーリー（完全版）</p>
                <p style={s.storyText}>{paidResult.futureStoryFull}</p>
              </div>
            ) : null}
            {/* LINE導線（有料後） */}
            <div style={s.lineCardPaid}>
              <p style={s.lineFreeTitle}>📱 手相診断も合わせて受けてみませんか？</p>
              <p style={s.lineFreeDesc}>LINEに登録すると<br />手相診断の受付・占い結果のご質問ができます✨</p>
              <ul style={s.lineList}>
                <li>🤲 手相診断の受付（両手の写真を送るだけ）</li>
                <li>💬 占い結果へのご質問</li>
                <li>🌟 Twinkle Star Oracleからのお知らせ（不定期）</li>
              </ul>
              <a href="https://lin.ee/XHDFrA8" target="_blank" rel="noopener noreferrer" style={s.lineBtn}>🟢 LINEで登録する（無料）</a>
            </div>
          </div>
        ) : null}

        <p style={s.disclaimer}>{result.disclaimer}</p>
        <p style={s.privacyNote}>🔒 入力された情報はサーバーに保存されません。</p>
        <button style={s.retryBtn} onClick={resetAll}>🔄 もう一度診断する</button>
      </div></div>
    )
  }

  return null
}

// サブコンポーネント
function StepHeader({ step, total, title, onBack }: { step:number; total:number; title:string; onBack:()=>void }) {
  return (
    <div style={{padding:'16px 0',marginBottom:'8px'}}>
      <button style={{background:'none',border:'none',color:'#64748b',fontSize:'14px',cursor:'pointer',padding:0,marginBottom:'8px',display:'block'}} onClick={onBack}>← 戻る</button>
      <p style={{fontSize:'12px',color:'#f472b6',fontWeight:700,margin:'0 0 2px'}}>STEP {step} / {total}</p>
      <p style={{fontSize:'20px',fontWeight:900,color:'#1e1b4b',margin:0}}>{title}</p>
      <div style={{display:'flex',gap:'6px',marginTop:'8px'}}>
        {Array.from({length:total}).map((_,i) => (
          <div key={i} style={{width:'8px',height:'8px',borderRadius:'50%',background: i<step ? '#f472b6' : '#e2e8f0'}} />
        ))}
      </div>
    </div>
  )
}
function Section({ title, emoji, children }: { title:string; emoji:string; children:React.ReactNode }) {
  return (
    <div style={{marginBottom:'24px'}}>
      <p style={{fontSize:'15px',fontWeight:700,color:'#1e1b4b',margin:'0 0 10px'}}>{emoji} {title}</p>
      {children}
    </div>
  )
}
function ChoiceBtn({ label, selected, onClick }: { label:string; selected:boolean; onClick:()=>void }) {
  return (
    <button onClick={onClick} style={{display:'block',width:'100%',padding:'12px 16px',background: selected ? '#fce7f3' : 'white',border: selected ? '2px solid #f472b6' : '2px solid #e2e8f0',borderRadius:'12px',fontSize:'14px',color: selected ? '#db2777' : '#1e1b4b',cursor:'pointer',marginBottom:'8px',textAlign:'left',fontWeight: selected ? 700 : 400}}>
      {label}
    </button>
  )
}
function NavBtns({ onBack, onNext, nextDisabled=false }: { onBack?:()=>void; onNext?:()=>void; nextDisabled?:boolean }) {
  return (
    <div style={{display:'flex',gap:'12px',marginTop:'8px',paddingBottom:'24px'}}>
      {onBack && <button style={{flex:1,padding:'14px',background:'white',border:'2px solid #e2e8f0',borderRadius:'12px',fontSize:'15px',color:'#64748b',cursor:'pointer'}} onClick={onBack}>← 戻る</button>}
      {onNext && <button style={{flex:2,padding:'14px',background:'linear-gradient(135deg,#f472b6,#a855f7)',color:'white',border:'none',borderRadius:'12px',fontSize:'16px',fontWeight:700,cursor:'pointer',opacity: nextDisabled ? 0.4 : 1}} onClick={onNext} disabled={nextDisabled}>次へ →</button>}
    </div>
  )
}
function ResultSection({ title, text }: { title:string; text:string }) {
  if (!text) return null
  return (
    <div style={{background:'white',borderRadius:'20px',padding:'20px',marginBottom:'16px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
      <p style={{fontSize:'15px',fontWeight:700,color:'#1e1b4b',margin:'0 0 10px'}}>{title}</p>
      <p style={{fontSize:'14px',color:'#64748b',lineHeight:1.7,margin:0}}>{text}</p>
    </div>
  )
}

// スタイル
const s: Record<string, React.CSSProperties> = {
  page: { minHeight:'100vh', background:'linear-gradient(135deg,#fdf2f8 0%,#f0f9ff 50%,#fdf4ff 100%)', fontFamily:"'Hiragino Kaku Gothic ProN','Hiragino Sans',sans-serif", paddingBottom:'40px' },
  container: { maxWidth:'480px', margin:'0 auto', padding:'0 16px' },
  header: { padding:'16px 0' },
  backLink: { color:'#64748b', textDecoration:'none', fontSize:'14px' },
  hero: { textAlign:'center', padding:'32px 0 24px' },
  badge: { display:'inline-block', background:'linear-gradient(135deg,#f472b6,#a855f7)', color:'white', fontSize:'12px', fontWeight:700, padding:'4px 16px', borderRadius:'999px', marginBottom:'16px' },
  heroTitle: { fontSize:'32px', fontWeight:900, color:textMain, lineHeight:1.3, margin:'0 0 12px' },
  heroSub: { fontSize:'16px', color:textSub, lineHeight:1.6, margin:'0 0 20px' },
  heroAccent: { color:pink, fontWeight:700 },
  piyochan: { fontSize:'48px', marginBottom:'8px' },
  piyoMsg: { background:pinkLight, borderRadius:'16px', padding:'12px 16px', fontSize:'14px', color:pinkDark, margin:'0 0 24px' },
  primaryBtn: { display:'block', width:'100%', padding:'16px', background:'linear-gradient(135deg,#f472b6,#a855f7)', color:'white', border:'none', borderRadius:'16px', fontSize:'18px', fontWeight:700, cursor:'pointer', boxShadow:'0 4px 20px rgba(244,114,182,0.4)', marginBottom:'8px', textDecoration:'none', textAlign:'center' },
  freeNote: { fontSize:'12px', color:textSub, margin:'4px 0' },
  features: { display:'flex', justifyContent:'space-around', padding:'20px 0', background:'white', borderRadius:'20px', marginBottom:'16px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' },
  featureItem: { textAlign:'center' },
  featureIcon: { fontSize:'28px', display:'block', marginBottom:'6px' },
  featureText: { fontSize:'12px', color:textSub, margin:0, lineHeight:1.4, whiteSpace:'pre-line' },
  priceCard: { background:'linear-gradient(135deg,#fdf2f8,#fce7f3)', border:`2px solid ${pink}`, borderRadius:'20px', padding:'20px', textAlign:'center', marginBottom:'16px' },
  priceLabel: { fontSize:'14px', fontWeight:700, color:pinkDark, margin:'0 0 8px' },
  price: { margin:'0 0 8px' },
  origPrice: { fontSize:'14px', color:textSub, textDecoration:'line-through' },
  salePrice: { fontSize:'20px', fontWeight:900, color:pinkDark },
  priceDesc: { fontSize:'12px', color:textSub, margin:0 },
  sampleBtn: { color:purple, textDecoration:'none', fontSize:'14px', border:`1px solid ${purple}`, borderRadius:'999px', padding:'8px 20px', display:'inline-block' },
  textarea: { width:'100%', minHeight:'80px', padding:'12px', border:'2px solid #e2e8f0', borderRadius:'12px', fontSize:'14px', color:textMain, resize:'vertical', fontFamily:'inherit', boxSizing:'border-box' },
  episodeNote: { background:pinkLight, borderRadius:'12px', padding:'12px 16px', marginBottom:'20px', fontSize:'13px', color:pinkDark },
  backBtn2: { display:'block', width:'100%', padding:'14px', background:'white', border:'2px solid #e2e8f0', borderRadius:'12px', fontSize:'15px', color:textSub, cursor:'pointer', marginTop:'8px' },
  errorText: { color:'red', fontSize:'14px', marginBottom:'12px', textAlign:'center' },
  scoreCard: { textAlign:'center', background:'white', borderRadius:'24px', padding:'28px 20px', marginBottom:'16px', boxShadow:'0 4px 20px rgba(0,0,0,0.08)' },
  scoreLabel: { fontSize:'14px', color:textSub, margin:'0 0 16px', fontWeight:700 },
  scoreCircle: { width:'120px', height:'120px', borderRadius:'50%', background:'linear-gradient(135deg,#fce7f3,#fdf4ff)', border:`4px solid ${pink}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' },
  scoreNum: { fontSize:'48px', fontWeight:900, color:pinkDark, lineHeight:1 },
  scorePct: { fontSize:'18px', color:pinkDark, fontWeight:700, marginTop:'12px' },
  scoreBar: { height:'8px', background:'#e2e8f0', borderRadius:'999px', overflow:'hidden' },
  scoreBarFill: { height:'100%', background:'linear-gradient(135deg,#f472b6,#a855f7)', borderRadius:'999px' },
  storyCard: { background:'linear-gradient(135deg,#fdf4ff,#fce7f3)', borderRadius:'20px', padding:'20px', marginBottom:'16px', overflow:'hidden' },
  storyCardFull: { background:'linear-gradient(135deg,#fdf4ff,#fce7f3)', borderRadius:'20px', padding:'20px', marginBottom:'16px' },
  storyTitle: { fontSize:'15px', fontWeight:700, color:purple, margin:'0 0 10px' },
  storyText: { fontSize:'14px', color:textSub, lineHeight:1.7, margin:0 },
  storyBlur: { background:'linear-gradient(to bottom,transparent,rgba(253,244,255,0.98))', paddingTop:'20px', textAlign:'center' },
  storyBlurText: { fontSize:'13px', color:purple, fontWeight:700, margin:0 },
  piyoCard: { background:pinkLight, borderRadius:'20px', padding:'20px', textAlign:'center', marginBottom:'16px' },
  piyoText: { fontSize:'14px', color:pinkDark, lineHeight:1.7, margin:0 },
  lineCardFree: { background:'linear-gradient(135deg,#f0fdf4,#dcfce7)', border:'2px solid #86efac', borderRadius:'20px', padding:'20px', marginBottom:'16px' },
  lineCardPaid: { background:'linear-gradient(135deg,#fdf2f8,#f0fdf4)', border:'2px solid #86efac', borderRadius:'20px', padding:'20px', marginBottom:'16px' },
  lineFreeTitle: { fontSize:'15px', fontWeight:900, color:'#166534', margin:'0 0 6px' },
  lineFreeDesc: { fontSize:'13px', color:'#166534', lineHeight:1.7, margin:'0 0 12px' },
  lineList: { listStyle:'none', padding:0, margin:'0 0 16px', fontSize:'13px', color:'#166534', lineHeight:2 },
  lineBtn: { display:'block', background:'#22c55e', color:'white', padding:'14px', borderRadius:'12px', textDecoration:'none', fontWeight:700, fontSize:'16px', textAlign:'center' },
  lockCard: { background:'white', border:`2px solid ${pink}`, borderRadius:'20px', padding:'24px', marginBottom:'16px', boxShadow:'0 4px 20px rgba(244,114,182,0.15)' },
  lockTitle: { fontSize:'16px', fontWeight:900, color:textMain, margin:'0 0 16px' },
  lockList: { listStyle:'none', padding:0, margin:'0 0 16px', fontSize:'14px', color:textMain, lineHeight:2 },
  lockPrice: { textAlign:'center', margin:'0 0 16px' },
  lockOrig: { color:textSub, textDecoration:'line-through', fontSize:'14px' },
  lockSale: { color:pinkDark, fontWeight:900, fontSize:'20px' },
  sampleFallback: { display:'block', textAlign:'center', color:purple, textDecoration:'none', fontSize:'13px', marginTop:'10px', padding:'8px' },
  demoSection: { marginTop:'16px', paddingTop:'16px', borderTop:'1px dashed #e2e8f0' },
  demoNote: { fontSize:'11px', color:textSub, textAlign:'center', marginBottom:'8px', lineHeight:1.6 },
  demoBtn: { display:'block', width:'100%', padding:'12px', background:'#f1f5f9', border:'1px dashed #94a3b8', borderRadius:'10px', fontSize:'14px', color:textSub, cursor:'pointer' },
  paidLoading: { textAlign:'center', padding:'32px 20px', background:'linear-gradient(135deg,#fdf2f8,#fdf4ff)', borderRadius:'20px', marginBottom:'16px' },
  paidLoadingText: { fontSize:'15px', color:pinkDark, fontWeight:700, lineHeight:1.6, margin:0 },
  paidHeader: { textAlign:'center', padding:'20px 0 8px', marginBottom:'8px' },
  paidBadge: { display:'inline-block', background:'linear-gradient(135deg,#f472b6,#a855f7)', color:'white', fontSize:'12px', fontWeight:700, padding:'4px 16px', borderRadius:'999px', marginBottom:'8px' },
  paidHeaderTitle: { fontSize:'20px', fontWeight:900, color:textMain, margin:'8px 0 0' },
  adviceBlock: { background:'white', borderRadius:'20px', padding:'20px', marginBottom:'16px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' },
  adviceBlockTitle: { fontSize:'15px', fontWeight:700, color:textMain, margin:'0 0 14px' },
  adviceItem: { marginBottom:'20px', paddingBottom:'20px', borderBottom:'1px solid #f1f5f9' },
  adviceTitle: { fontSize:'14px', fontWeight:700, color:purple, margin:'0 0 8px' },
  adviceDetail: { fontSize:'13px', color:textSub, lineHeight:1.7, margin:'0 0 10px' },
  convBox: { background:pinkLight, borderRadius:'12px', padding:'12px' },
  convLabel: { fontSize:'11px', color:pinkDark, fontWeight:700, margin:'0 0 4px' },
  convText: { fontSize:'13px', color:pinkDark, lineHeight:1.7, margin:0 },
  disclaimer: { fontSize:'11px', color:textSub, lineHeight:1.6, textAlign:'center', margin:'16px 0', padding:'12px', border:'1px solid #e2e8f0', borderRadius:'8px' },
  privacyNote: { fontSize:'11px', color:textSub, textAlign:'center', margin:'8px 0 16px', padding:'8px 12px', background:'#f8fafc', borderRadius:'8px', border:'1px dashed #cbd5e1' },
  retryBtn: { display:'block', width:'100%', padding:'14px', background:'white', border:'2px solid #e2e8f0', borderRadius:'12px', fontSize:'15px', color:textSub, cursor:'pointer' },
}
