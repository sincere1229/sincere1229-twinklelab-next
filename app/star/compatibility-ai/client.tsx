// app/star/compatibility-ai/client.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import PayjpCheckoutButton from '../../components/PayjpCheckoutButton'
import { CTA_OPTIONS } from '../../../lib/compatibilityStock'

/* =========================================================
   ★ 全鑑定共通の「無料/有料 出し分け」契約（この型が他鑑定の雛形）
   - FreeResult … 支払いなしで生成・表示（現状・傾向・可能性まで）
   - PaidResult … 決済確認後にサーバー側でのみ生成して返す
   ========================================================= */
interface FreeResult {
  score: number              // 相性スコア
  scoreLabel: string         // スコアの意味づけラベル（例：成長型のご縁）
  currentAssessment: string  // 現状の見立て（短め・気づき）
  tendencies: string         // 2人の傾向（短め）
  possibility: string        // 関係の可能性（答えを出さず余白で終える）
  hookMessage: string        // ピンク誘導メッセージ
  cliffhanger: string        // ロックカードの途中まで見せる文
}
interface PaidResult {
  partnerTrueFeelings: string                       // 相手の本音
  disconnectCause: string                           // すれ違いの原因
  movingTrigger: string                             // 関係が動くきっかけ＋距離が縮まるタイミング
  forecast3months: string                           // 今後3か月の未来予測
  approachAdvice: string                            // 連絡・告白・距離の縮め方
  avoidActions: string[]                            // 避けるべき行動
  luckActions: string[]                             // 開運アクション
  roadmap: { period: string; action: string }[]    // 個別ロードマップ
  piyochanMessage: string
  disclaimer: string
}

// 有料層でこれから見られるもの（ティーザーで項目名だけ見せる）
const PAID_TEASERS = [
  { icon: '💭', label: '相手が言えない本音' },
  { icon: '💥', label: 'すれ違いの原因' },
  { icon: '🔑', label: '関係が動くきっかけ' },
  { icon: '⏳', label: '距離が縮まるタイミング' },
  { icon: '🔮', label: '今後3か月の未来予測' },
  { icon: '💌', label: '連絡・告白・距離の縮め方' },
  { icon: '⚠️', label: '避けるべき行動' },
  { icon: '🗺️', label: '90日ロードマップ' },
]

interface FormInputs {
  yourType: string; yourWeekend: string; yourAloneTime: string; yourFriends: string
  yourFamily: string; yourFamilyPriority: string; yourHobbies: string
  partnerType: string; partnerWeekend: string; partnerAloneTime: string; partnerFriends: string
  partnerFamily: string; partnerFamilyPriority: string; partnerHobbies: string
  recentEvent: string; recentHappy: string; memorableEvent: string
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

const SHARE_URL = 'https://twinkle-lab.jp/star/compatibility-ai'
// PAY.JPボタン文言（ストック④から選択可・基本は[0]＝相手の本音を確認する）
const CTA_LABEL = `${CTA_OPTIONS[0]} ¥980`

export function CompatibilityAIClient() {
  const [step, setStep] = useState(0)
  const [inputs, setInputs] = useState<FormInputs>({
    yourType: '', yourWeekend: '', yourAloneTime: '', yourFriends: '',
    yourFamily: '', yourFamilyPriority: '', yourHobbies: '',
    partnerType: '', partnerWeekend: '', partnerAloneTime: '', partnerFriends: '',
    partnerFamily: '', partnerFamilyPriority: '', partnerHobbies: '',
    recentEvent: '', recentHappy: '', memorableEvent: '',
  })
  const [freeResult, setFreeResult] = useState<FreeResult | null>(null)
  const [paidResult, setPaidResult] = useState<PaidResult | null>(null)
  const [loading, setLoading] = useState(false)       // 無料診断中
  const [paidLoading, setPaidLoading] = useState(false) // 有料生成中
  const [error, setError] = useState('')

  const update = (key: keyof FormInputs, value: string) =>
    setInputs(prev => ({ ...prev, [key]: value }))

  // 無料診断（支払いなし・無料層のみ生成）
  const handleFreeDiagnose = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/compatibility-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs, mode: 'free' }),
      })
      const data = await res.json()
      if (data.success && data.result) {
        setFreeResult(data.result)
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

  // 決済成功 → 有料層を生成（サーバーが chargeId を照会してから返す）
  const handlePaidDiagnose = async (chargeId: string) => {
    setPaidLoading(true); setError('')
    try {
      const res = await fetch('/api/compatibility-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs, mode: 'paid', chargeId }),
      })
      const data = await res.json()
      if (data.success && data.result) {
        setPaidResult(data.result)
      } else {
        setError(data.error || '鑑定の生成に失敗しました。お手数ですがお問い合わせください。')
      }
    } catch {
      setError('通信エラーが発生しました。')
    } finally {
      setPaidLoading(false)
    }
  }

  const resetAll = () => {
    setStep(0); setFreeResult(null); setPaidResult(null)
    setError(''); setLoading(false); setPaidLoading(false)
  }

  // ===== ランディング（無料スタート） =====
  if (step === 0) return (
    <div style={s.page}>
      <div style={s.container}>
        <div style={s.header}><Link href="/star" style={s.backLink}>← 占いトップへ</Link></div>
        <div style={s.hero}>
          <div style={s.badge}>💘 AI相性診断</div>
          <h1 style={s.heroTitle}>この関係、<br />このままでいい？</h1>
          <p style={s.heroSub}>まずは<span style={s.heroAccent}>無料</span>で、2人の今を診断。<br />相性スコアと「すれ違いの芽」が見えます</p>
          <div style={s.piyochan}>🐥</div>
          <p style={s.piyoMsg}>大丈夫だよ。ふたりのすれ違いには、ちゃんと理由があるんだよ🌸</p>
          <button style={s.primaryBtn} onClick={() => setStep(1)}>✨ 無料で診断をはじめる</button>
          <p style={s.freeNote}>登録不要・入力データは保存されません</p>
        </div>
        <div style={s.features}>
          {[['🆓','無料で\n相性スコア'],['💬','すれ違いの\n芽を発見'],['🔓','完全版で\n本音と未来']].map(([icon,text]) => (
            <div key={text} style={s.featureItem}>
              <span style={s.featureIcon}>{icon}</span>
              <p style={s.featureText}>{text}</p>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginBottom:'24px'}}>
          <Link href="/star/compatibility-ai/sample" style={s.sampleBtn}>📋 サンプル診断結果を見る</Link>
        </div>
      </div>
    </div>
  )

  // ===== STEP1 =====
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

  // ===== STEP2 =====
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

  // ===== STEP3 =====
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

  // ===== STEP4 → 無料診断実行 =====
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
      <button style={{...s.primaryBtn as React.CSSProperties, opacity: loading ? 0.7 : 1}}
        onClick={handleFreeDiagnose} disabled={loading}>
        {loading ? '✨ AI診断中...' : '🆓 無料で相性を診断する'}
      </button>
      <button style={s.backBtn2} onClick={() => setStep(3)}>← 戻る</button>
    </div></div>
  )

  // ===== STEP5: 無料結果 + ロック + 有料結果 =====
  if (step === 5) {
    if (loading) return <LoadingView />
    if (!freeResult) return null

    const score = freeResult.score || 70
    const shareText = encodeURIComponent(`AI相性診断をやってみた！相性スコア${score}点✨ ふたりのすれ違いの芽がわかって納得😊 #TwinkleStarOracle\n${SHARE_URL}`)

    return (
      <div style={s.page}><div style={s.container}>

        {/* スコア */}
        <div style={s.scoreCard}>
          <p style={s.scoreLabel}>💘 ふたりの相性スコア</p>
          <div style={s.scoreCircle}>
            <span style={s.scoreNum}>{score}</span>
            <span style={s.scorePct}>点</span>
          </div>
          {freeResult.scoreLabel ? <p style={s.scoreLabel2}>{freeResult.scoreLabel}</p> : null}
          <div style={s.scoreBar}><div style={{...s.scoreBarFill, width:`${score}%`}} /></div>
          <p style={s.freeTag}>ここまで無料</p>
        </div>

        {/* 無料層：現状・傾向・可能性 */}
        <ResultSection title="💖 現状の見立て" text={freeResult.currentAssessment} />
        <ResultSection title="🔍 2人の傾向" text={freeResult.tendencies} />
        <ResultSection title="🌱 関係の可能性" text={freeResult.possibility} />
        {freeResult.hookMessage ? (
          <div style={s.hookCard}>
            <div style={{fontSize:'34px',marginBottom:'6px'}}>🐥</div>
            <p style={s.hookText}>{freeResult.hookMessage}</p>
          </div>
        ) : null}

        {/* ===== 有料層 ===== */}
        {paidResult ? (
          <PaidResultView result={paidResult} />
        ) : paidLoading ? (
          <div style={s.unlockLoading}>
            <div style={{fontSize:40,marginBottom:10}}>🔓</div>
            <p style={{fontSize:15,fontWeight:700,color:pinkDark,margin:'0 0 6px'}}>完全版を読み解いています…</p>
            <p style={{fontSize:12,color:textSub,margin:0}}>相手の本音とこれからの流れを分析中です</p>
          </div>
        ) : (
          <div style={s.lockCard}>
            <div style={s.lockHeader}>
              <span style={{fontSize:30}}>🔒</span>
              <div>
                <p style={s.lockTitle}>完全版でわかること</p>
                <p style={s.lockSub}>ここから先は、答えと具体的な行動です</p>
              </div>
            </div>
            <div style={s.teaserGrid}>
              {PAID_TEASERS.map(t => (
                <div key={t.label} style={s.teaserItem}>
                  <span style={{fontSize:18}}>{t.icon}</span>
                  <span style={s.teaserLabel}>{t.label}</span>
                  <span style={s.teaserLock}>🔒</span>
                </div>
              ))}
            </div>
            {freeResult.cliffhanger ? (
              <div style={s.cliffCard}>
                <p style={s.cliffText}>{freeResult.cliffhanger}</p>
                <div style={s.cliffFade} />
                <p style={s.cliffLock}>🔒 続きは完全版で</p>
              </div>
            ) : null}
            {error && <p style={s.errorText}>{error}</p>}
            <PayjpCheckoutButton
              product="compatibility-ai"
              label={CTA_LABEL}
              onPaid={handlePaidDiagnose}
            />
            <p style={s.lockNote}>決済後すぐに、このページで完全版が開きます</p>
          </div>
        )}

        {/* 共有・戻る */}
        <div style={{textAlign:'center', padding:'16px 0', marginBottom:'16px', display:'flex', gap:8, justifyContent:'center'}}>
          <a href={`https://twitter.com/intent/tweet?text=${shareText}`} target="_blank" rel="noopener noreferrer"
            style={{padding:'10px 20px', borderRadius:10, border:'1px solid #e2e8f0', background:'white', color:textSub, fontSize:12, textDecoration:'none'}}>
            𝕏 シェア
          </a>
          <Link href="/star"
            style={{padding:'10px 20px', borderRadius:10, border:'1px solid #e2e8f0', background:'white', color:textSub, fontSize:12, textDecoration:'none'}}>
            🌟 占いポータルへ
          </Link>
        </div>

        <p style={s.privacyNote}>🔒 入力された情報はサーバーに保存されません。</p>
        <button style={s.retryBtn} onClick={resetAll}>🔄 もう一度診断する</button>
      </div></div>
    )
  }

  return null
}

/* ===== 有料結果の表示 ===== */
function PaidResultView({ result }: { result: PaidResult }) {
  return (
    <div>
      <div style={s.unlockedBanner}>
        <span style={{fontSize:18}}>✨</span>
        <span style={{fontSize:13, fontWeight:900, color:pinkDark}}>完全版が解放されました</span>
      </div>
      <ResultSection title="💭 相手の本音" text={result.partnerTrueFeelings} />
      <ResultSection title="💥 すれ違いの原因" text={result.disconnectCause} />
      <ResultSection title="🔑 関係が動くきっかけ・タイミング" text={result.movingTrigger} />
      <ResultSection title="🔮 今後3か月の未来予測" text={result.forecast3months} />
      <ResultSection title="💌 連絡・告白・距離の縮め方" text={result.approachAdvice} />

      {result.avoidActions && result.avoidActions.length > 0 && (
        <div style={s.adviceBlock}>
          <p style={s.adviceBlockTitle}>⚠️ 避けるべき行動</p>
          {result.avoidActions.map((a, i) => (
            <div key={i} style={s.luckItem}><span style={{color:'#e0407a',marginRight:8}}>✕</span>{a}</div>
          ))}
        </div>
      )}

      {result.luckActions && result.luckActions.length > 0 && (
        <div style={s.adviceBlock}>
          <p style={s.adviceBlockTitle}>🍀 開運アクション</p>
          {result.luckActions.map((a, i) => (
            <div key={i} style={s.luckItem}><span style={{color:purple,marginRight:8}}>✦</span>{a}</div>
          ))}
        </div>
      )}

      {result.roadmap && result.roadmap.length > 0 && (
        <div style={s.adviceBlock}>
          <p style={s.adviceBlockTitle}>🗺️ あなた専用ロードマップ</p>
          {result.roadmap.map((r, i) => (
            <div key={i} style={s.roadItem}>
              <div style={s.roadPeriod}>{r.period}</div>
              <div style={s.roadAction}>{r.action}</div>
            </div>
          ))}
        </div>
      )}

      <div style={s.piyoCard}>
        <div style={{fontSize:'40px',marginBottom:'8px'}}>🐥</div>
        <p style={s.piyoText}>{result.piyochanMessage}</p>
      </div>
      <p style={s.disclaimer}>{result.disclaimer}</p>
    </div>
  )
}

function LoadingView() {
  return (
    <div style={s.page}><div style={s.container}>
      <div style={{textAlign:'center', padding:'80px 20px'}}>
        <div style={{fontSize:48, marginBottom:20}}>🐥</div>
        <p style={{fontSize:18, fontWeight:700, color:pinkDark, marginBottom:8}}>✨ AI診断中...</p>
        <p style={{fontSize:13, color:textSub, lineHeight:1.8}}>ふたりの相性を読み解いています<br />少々お待ちください</p>
      </div>
    </div></div>
  )
}

/* ===== サブコンポーネント ===== */
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
      <p style={{fontSize:'14px',color:'#64748b',lineHeight:1.7,margin:0,whiteSpace:'pre-wrap'}}>{text}</p>
    </div>
  )
}

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
  sampleBtn: { color:purple, textDecoration:'none', fontSize:'14px', border:`1px solid ${purple}`, borderRadius:'999px', padding:'8px 20px', display:'inline-block' },
  textarea: { width:'100%', minHeight:'80px', padding:'12px', border:'2px solid #e2e8f0', borderRadius:'12px', fontSize:'14px', color:textMain, resize:'vertical', fontFamily:'inherit', boxSizing:'border-box' },
  episodeNote: { background:pinkLight, borderRadius:'12px', padding:'12px 16px', marginBottom:'20px', fontSize:'13px', color:pinkDark },
  backBtn2: { display:'block', width:'100%', padding:'14px', background:'white', border:'2px solid #e2e8f0', borderRadius:'12px', fontSize:'15px', color:textSub, cursor:'pointer', marginTop:'8px' },
  errorText: { color:'red', fontSize:'14px', margin:'12px 0', textAlign:'center' },

  scoreCard: { textAlign:'center', background:'white', borderRadius:'24px', padding:'28px 20px', marginBottom:'16px', boxShadow:'0 4px 20px rgba(0,0,0,0.08)' },
  scoreLabel: { fontSize:'14px', color:textSub, margin:'0 0 16px', fontWeight:700 },
  scoreCircle: { width:'120px', height:'120px', borderRadius:'50%', background:'linear-gradient(135deg,#fce7f3,#fdf4ff)', border:`4px solid ${pink}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' },
  scoreNum: { fontSize:'48px', fontWeight:900, color:pinkDark, lineHeight:1 },
  scorePct: { fontSize:'18px', color:pinkDark, fontWeight:700, marginTop:'12px' },
  scoreBar: { height:'8px', background:'#e2e8f0', borderRadius:'999px', overflow:'hidden' },
  scoreBarFill: { height:'100%', background:'linear-gradient(135deg,#f472b6,#a855f7)', borderRadius:'999px' },
  scoreLabel2: { fontSize:'16px', fontWeight:900, color:purple, margin:'0 0 14px', letterSpacing:'0.02em' },
  freeTag: { fontSize:'11px', color:'#2a8a50', background:'rgba(26,122,60,0.1)', display:'inline-block', padding:'3px 12px', borderRadius:'999px', margin:'12px 0 0' },
  hookCard: { background:'linear-gradient(135deg,#fce7f3,#fdf4ff)', border:`1px solid ${pink}`, borderRadius:'20px', padding:'22px 20px', textAlign:'center', marginBottom:'16px' },
  hookText: { fontSize:'14px', color:pinkDark, lineHeight:1.85, margin:0, fontWeight:500 },

  piyoCard: { background:pinkLight, borderRadius:'20px', padding:'20px', textAlign:'center', marginBottom:'16px' },
  piyoText: { fontSize:'14px', color:pinkDark, lineHeight:1.7, margin:0, whiteSpace:'pre-wrap' },

  /* ロック／ティーザー */
  lockCard: { background:'linear-gradient(135deg,#fdf2f8,#fdf4ff)', border:`2px solid ${pink}`, borderRadius:'24px', padding:'24px 20px', marginBottom:'20px' },
  lockHeader: { display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' },
  lockTitle: { fontSize:'17px', fontWeight:900, color:pinkDark, margin:'0 0 2px' },
  lockSub: { fontSize:'12px', color:textSub, margin:0 },
  teaserGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginBottom:'16px' },
  teaserItem: { display:'flex', alignItems:'center', gap:'8px', background:'white', borderRadius:'12px', padding:'12px 12px', border:'1px solid #f5d0e5' },
  teaserLabel: { fontSize:'12px', color:textMain, fontWeight:700, flex:1 },
  teaserLock: { fontSize:'12px', opacity:0.5 },
  cliffCard: { position:'relative', background:'white', borderRadius:'12px', padding:'16px 16px 10px', marginBottom:'16px', border:'1px dashed #f5b6d6' },
  cliffText: { fontSize:'14px', color:pinkDark, lineHeight:1.9, margin:0, fontWeight:600, whiteSpace:'pre-wrap' },
  cliffFade: { height:'18px', background:'linear-gradient(transparent,rgba(252,231,243,0.6))' },
  cliffLock: { fontSize:'11px', color:textSub, textAlign:'center', margin:'4px 0 0' },
  lockNote: { fontSize:'11px', color:textSub, textAlign:'center', margin:'10px 0 0' },

  unlockLoading: { textAlign:'center', background:'white', borderRadius:'24px', padding:'40px 20px', marginBottom:'20px', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' },
  unlockedBanner: { display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', background:'linear-gradient(135deg,#fdf2f8,#fce7f3)', border:`1px solid ${pink}`, borderRadius:'14px', padding:'12px', marginBottom:'16px' },

  adviceBlock: { background:'white', borderRadius:'20px', padding:'20px', marginBottom:'16px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' },
  adviceBlockTitle: { fontSize:'15px', fontWeight:700, color:textMain, margin:'0 0 14px' },
  luckItem: { fontSize:'14px', color:textSub, lineHeight:1.8, marginBottom:'8px' },
  roadItem: { display:'flex', gap:'12px', marginBottom:'14px', paddingBottom:'14px', borderBottom:'1px solid #f1f5f9' },
  roadPeriod: { fontSize:'12px', fontWeight:700, color:purple, minWidth:'72px' },
  roadAction: { fontSize:'13px', color:textSub, lineHeight:1.7, flex:1 },

  disclaimer: { fontSize:'11px', color:textSub, lineHeight:1.6, textAlign:'center', margin:'16px 0', padding:'12px', border:'1px solid #e2e8f0', borderRadius:'8px' },
  privacyNote: { fontSize:'11px', color:textSub, textAlign:'center', margin:'8px 0 16px', padding:'8px 12px', background:'#f8fafc', borderRadius:'8px', border:'1px dashed #cbd5e1' },
  retryBtn: { display:'block', width:'100%', padding:'14px', background:'white', border:'2px solid #e2e8f0', borderRadius:'12px', fontSize:'15px', color:textSub, cursor:'pointer' },
}
