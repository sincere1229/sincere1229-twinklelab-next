'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// ============================================================
// 型定義
// ============================================================
interface FormInputs {
  yourType: string
  yourWeekend: string
  yourAloneTime: string
  yourFriends: string
  yourFamily: string
  yourFamilyPriority: string
  yourHobbies: string
  partnerType: string
  partnerWeekend: string
  partnerAloneTime: string
  partnerFriends: string
  partnerFamily: string
  partnerFamilyPriority: string
  partnerHobbies: string
  recentEvent: string
  recentHappy: string
  memorableEvent: string
}

interface AdviceItem {
  title: string
  detail: string
  conversationExample: string
}

interface DiagnosisResult {
  score: string
  positiveSummary: string
  coreGap: string
  realScene: string
  familyAndFriendImpact: string
  conflictReason: string
  advice: AdviceItem[]
  futureStoryPreview: string
  futureStoryFull: string
  piyochanMessage: string
  disclaimer: string
}

// ============================================================
// 定数
// ============================================================
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

// ============================================================
// コンポーネント（useSearchParamsはSuspense内で使用）
// ============================================================
function CompatibilityAIInner() {
  const searchParams = useSearchParams()
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

  // Stripe決済後：?session_id=xxx でリダイレクトされてきた場合
  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (!sessionId) return

    // sessionIdをsessionStorageから入力データと共に復元
    const savedInputs = sessionStorage.getItem('compatibility_inputs')
    const savedResult = sessionStorage.getItem('compatibility_free_result')

    if (savedInputs && savedResult) {
      const parsedInputs = JSON.parse(savedInputs)
      const parsedResult = JSON.parse(savedResult)
      setInputs(parsedInputs)
      setResult(parsedResult)
      setStep(5)
      // 有料診断を自動実行
      handlePaidDiagnoseWithSession(sessionId, parsedInputs)
    }
  }, [searchParams])

  const update = (key: keyof FormInputs, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }))
  }

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
      if (data.success) {
        // Stripe決済後に復元できるよう保存
        sessionStorage.setItem('compatibility_inputs', JSON.stringify(inputs))
        sessionStorage.setItem('compatibility_free_result', JSON.stringify(data.result))
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

  // Stripeセッション検証付き有料診断
  const handlePaidDiagnoseWithSession = async (sessionId: string, inputData: FormInputs) => {
    setPaidLoading(true)
    setPaidError('')
    try {
      const res = await fetch('/api/compatibility-paid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: inputData, sessionId }),
      })
      const data = await res.json()
      if (data.success) {
        setPaidResult(data.result)
        setIsPaid(true)
        setTimeout(() => {
          document.getElementById('paid-result-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

  // ============================================================
  // LANDING
  // ============================================================
  if (step === 0) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          {/* ヘッダー */}
          <div style={styles.header}>
            <Link href="/star" style={styles.backLink}>← 占いトップへ</Link>
          </div>

          {/* ヒーロー */}
          <div style={styles.hero}>
            <div style={styles.badge}>💘 NEW</div>
            <h1 style={styles.heroTitle}>
              この関係、<br />このままでいい？
            </h1>
            <p style={styles.heroSub}>
              AIが読み解く<br />
              <span style={styles.heroAccent}>「すれ違いの正体」</span>と1年後の未来
            </p>
            <div style={styles.piyochan}>🐥</div>
            <p style={styles.piyoMessage}>
              大丈夫だよ。ふたりのすれ違いには、ちゃんと理由があるんだよ🌸
            </p>
            <button
              style={styles.primaryBtn}
              onClick={() => setStep(1)}
            >
              ✨ 無料で診断する
            </button>
            <p style={styles.freeNote}>入力データは保存されません・完全無料</p>
          </div>

          {/* 特徴 */}
          <div style={styles.features}>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>💬</span>
              <p style={styles.featureText}>すれ違いの<br />本質を解説</p>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>📖</span>
              <p style={styles.featureText}>1年後の<br />ストーリー</p>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>💡</span>
              <p style={styles.featureText}>改善策＆<br />会話テンプレ</p>
            </div>
          </div>

          {/* 価格 */}
          <div style={styles.priceCard}>
            <p style={styles.priceLabel}>💘 AI相性診断（詳細版）</p>
            <p style={styles.price}>
              <span style={styles.originalPrice}>通常 ¥1,980</span>
              <span style={styles.salePrice}> → 初回限定 ¥980</span>
            </p>
            <p style={styles.priceDesc}>具体シーン・喧嘩の理由・会話テンプレ付き</p>
          </div>

          {/* サンプル */}
          <div style={styles.sampleLink}>
            <Link href="/star/compatibility-ai/sample" style={styles.sampleBtn}>
              📋 サンプル診断結果を見る
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ============================================================
  // STEP 1: 性格
  // ============================================================
  if (step === 1) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <StepHeader step={1} total={4} title="性格タイプ" onBack={() => setStep(0)} />

          <Section title="あなたの性格タイプ" emoji="💫">
            {PERSONALITY_TYPES.map(opt => (
              <ChoiceBtn
                key={opt.value}
                label={opt.label}
                selected={inputs.yourType === opt.value}
                onClick={() => update('yourType', opt.value)}
              />
            ))}
          </Section>

          <Section title="相手の性格タイプ" emoji="💖">
            {PERSONALITY_TYPES.map(opt => (
              <ChoiceBtn
                key={opt.value}
                label={opt.label}
                selected={inputs.partnerType === opt.value}
                onClick={() => update('partnerType', opt.value)}
              />
            ))}
          </Section>

          <NavButtons
            onNext={() => setStep(2)}
            nextDisabled={!inputs.yourType || !inputs.partnerType}
          />
        </div>
      </div>
    )
  }

  // ============================================================
  // STEP 2: 生活
  // ============================================================
  if (step === 2) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <StepHeader step={2} total={4} title="生活スタイル" onBack={() => setStep(1)} />

          <Section title="あなたの休日の過ごし方" emoji="☀️">
            {WEEKEND_TYPES.map(opt => (
              <ChoiceBtn
                key={opt.value}
                label={opt.label}
                selected={inputs.yourWeekend === opt.value}
                onClick={() => update('yourWeekend', opt.value)}
              />
            ))}
          </Section>

          <Section title="相手の休日の過ごし方" emoji="🌙">
            {WEEKEND_TYPES.map(opt => (
              <ChoiceBtn
                key={opt.value}
                label={opt.label}
                selected={inputs.partnerWeekend === opt.value}
                onClick={() => update('partnerWeekend', opt.value)}
              />
            ))}
          </Section>

          <Section title="あなたの「一人の時間」の必要性" emoji="🔋">
            {ALONE_TIME.map(opt => (
              <ChoiceBtn
                key={opt.value}
                label={opt.label}
                selected={inputs.yourAloneTime === opt.value}
                onClick={() => update('yourAloneTime', opt.value)}
              />
            ))}
          </Section>

          <Section title="相手の「一人の時間」の必要性" emoji="🌿">
            {ALONE_TIME.map(opt => (
              <ChoiceBtn
                key={opt.value}
                label={opt.label}
                selected={inputs.partnerAloneTime === opt.value}
                onClick={() => update('partnerAloneTime', opt.value)}
              />
            ))}
          </Section>

          <NavButtons
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
            nextDisabled={!inputs.yourWeekend || !inputs.partnerWeekend || !inputs.yourAloneTime || !inputs.partnerAloneTime}
          />
        </div>
      </div>
    )
  }

  // ============================================================
  // STEP 3: 人間関係
  // ============================================================
  if (step === 3) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <StepHeader step={3} total={4} title="人間関係" onBack={() => setStep(2)} />

          <Section title="あなたの友人関係" emoji="👫">
            <textarea
              style={styles.textarea}
              placeholder="例：少人数の仲の良い友達が数人いる、グループで集まることが多い..."
              value={inputs.yourFriends}
              onChange={e => update('yourFriends', e.target.value)}
            />
          </Section>

          <Section title="相手の友人関係" emoji="🤝">
            <textarea
              style={styles.textarea}
              placeholder="例：友達が多くていつも誰かと遊んでいる、SNSで繋がりを大切にしている..."
              value={inputs.partnerFriends}
              onChange={e => update('partnerFriends', e.target.value)}
            />
          </Section>

          <Section title="あなたの家族との関係" emoji="🏡">
            <textarea
              style={styles.textarea}
              placeholder="例：家族仲が良くよく連絡を取る、独立していてあまり干渉しない..."
              value={inputs.yourFamily}
              onChange={e => update('yourFamily', e.target.value)}
            />
          </Section>

          <Section title="相手の家族との関係" emoji="💕">
            <textarea
              style={styles.textarea}
              placeholder="例：家族の仲がとても密で行事を大切にする、実家が遠くほぼ独立している..."
              value={inputs.partnerFamily}
              onChange={e => update('partnerFamily', e.target.value)}
            />
          </Section>

          <Section title="あなたの趣味・コミュニティ" emoji="🎨">
            <textarea
              style={styles.textarea}
              placeholder="例：週1回テニスサークル、友達と映画、Netflixでドラマ鑑賞..."
              value={inputs.yourHobbies}
              onChange={e => update('yourHobbies', e.target.value)}
            />
          </Section>

          <Section title="相手の趣味・コミュニティ" emoji="⚽">
            <textarea
              style={styles.textarea}
              placeholder="例：サッカー観戦、ゲーム仲間と集まる、読書..."
              value={inputs.partnerHobbies}
              onChange={e => update('partnerHobbies', e.target.value)}
            />
          </Section>

          <Section title="あなたの家族行事の優先度" emoji="👨‍👩‍👧">
            {FAMILY_PRIORITY.map(opt => (
              <ChoiceBtn
                key={opt.value}
                label={opt.label}
                selected={inputs.yourFamilyPriority === opt.value}
                onClick={() => update('yourFamilyPriority', opt.value)}
              />
            ))}
          </Section>

          <Section title="相手の家族行事の優先度" emoji="💛">
            {FAMILY_PRIORITY.map(opt => (
              <ChoiceBtn
                key={opt.value}
                label={opt.label}
                selected={inputs.partnerFamilyPriority === opt.value}
                onClick={() => update('partnerFamilyPriority', opt.value)}
              />
            ))}
          </Section>

          <NavButtons
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
            nextDisabled={!inputs.yourFamilyPriority || !inputs.partnerFamilyPriority}
          />
        </div>
      </div>
    )
  }

  // ============================================================
  // STEP 4: エピソード
  // ============================================================
  if (step === 4) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <StepHeader step={4} total={4} title="最近のエピソード" onBack={() => setStep(3)} />

          <div style={styles.episodeNote}>
            <p>🐥 具体的なエピソードがあると、より精度の高い診断ができるよ！</p>
          </div>

          <Section title="最近の小さな出来事" emoji="📝">
            <textarea
              style={styles.textarea}
              placeholder="例：相手に誘われたけど疲れていて断ったら少し空気が悪くなった..."
              value={inputs.recentEvent}
              onChange={e => update('recentEvent', e.target.value)}
            />
          </Section>

          <Section title="最近嬉しかったこと" emoji="😊">
            <textarea
              style={styles.textarea}
              placeholder="例：ふたりで料理を作って楽しかった、気持ちをわかってもらえた..."
              value={inputs.recentHappy}
              onChange={e => update('recentHappy', e.target.value)}
            />
          </Section>

          <Section title="印象的な出来事（気になっていること）" emoji="💭">
            <textarea
              style={styles.textarea}
              placeholder="例：友達の誘いを優先されてもやもやした、価値観の違いを感じた..."
              value={inputs.memorableEvent}
              onChange={e => update('memorableEvent', e.target.value)}
            />
          </Section>

          {error && <p style={styles.errorText}>{error}</p>}

          <button
            style={{ ...styles.primaryBtn, opacity: loading ? 0.7 : 1 }}
            onClick={handleDiagnose}
            disabled={loading}
          >
            {loading ? '✨ AI診断中...' : '💫 診断結果を見る'}
          </button>
          <button style={styles.backBtn} onClick={() => setStep(3)}>← 戻る</button>
        </div>
      </div>
    )
  }

  // ============================================================
  // RESULT
  // ============================================================
  if (step === 5 && result) {
    const score = parseInt(result.score) || 70

    return (
      <div style={styles.page}>
        <div style={styles.container}>

          {/* スコア */}
          <div style={styles.scoreCard}>
            <p style={styles.scoreLabel}>💘 ふたりの相性スコア</p>
            <div style={styles.scoreCircle}>
              <span style={styles.scoreNum}>{score}</span>
              <span style={styles.scorePct}>点</span>
            </div>
            <div style={styles.scoreBar}>
              <div style={{ ...styles.scoreBarFill, width: `${score}%` }} />
            </div>
          </div>

          {/* 無料: 相性特徴 */}
          <ResultSection title="💖 ふたりの良いところ" text={result.positiveSummary} />

          {/* 無料: ズレの本質 */}
          <ResultSection title="💬 すれ違いの正体" text={result.coreGap} />

          {/* 無料: ストーリー冒頭 */}
          <div style={styles.storyCard}>
            <p style={styles.storyTitle}>📖 1年後のふたりのストーリー...</p>
            <p style={styles.storyText}>{result.futureStoryPreview}</p>
            <div style={styles.storyBlur}>
              <p style={styles.storyBlurText}>続きは詳細版で...</p>
            </div>
          </div>

          {/* ぴよちゃんメッセージ */}
          <div style={styles.piyoCard}>
            <div style={styles.piyoBig}>🐥</div>
            <p style={styles.piyoText}>{result.piyochanMessage}</p>
          </div>

          {/* ⑤ 無料結果直後LINE導線 */}
          <div style={styles.lineCardFree}>
            <p style={styles.lineFreeEyecatch}>📱 手相診断も気になりませんか？</p>
            <p style={styles.lineFreeDesc}>
              LINEに登録すると<br />
              手相診断の受付・占い結果のご質問ができます✨
            </p>
            <ul style={styles.lineList}>
              <li>🤲 手相診断の受付（両手の写真を送るだけ）</li>
              <li>💬 占い結果へのご質問</li>
              <li>🌟 Twinkle Star Oracleからのお知らせ（不定期）</li>
            </ul>
            <a
              href="https://lin.ee/XHDFrA8"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.lineBtn}
            >
              🟢 無料で受け取る
            </a>
          </div>

          {/* 有料ロック または 有料結果 */}
          {!isPaid ? (
            <div style={styles.lockCard}>
              <p style={styles.lockTitle}>🔒 詳細診断でもっと深く知る</p>
              <ul style={styles.lockList}>
                <li>✨ 具体的なすれ違いシーン</li>
                <li>✨ 家族・友人関係の影響</li>
                <li>✨ 喧嘩になる理由と対処法</li>
                <li>✨ 改善策＆会話テンプレート</li>
                <li>✨ 1年後のストーリー完全版</li>
              </ul>
              <p style={styles.lockPrice}>
                <span style={styles.lockOriginal}>通常 ¥1,980</span>
                {' → '}
                <span style={styles.lockSale}>初回限定 ¥980</span>
              </p>
              {/* ④ 有料CTA */}
              <a
                href="https://buy.stripe.com/dRmfZa5vggcGfZbfRx33W06"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.primaryBtn as React.CSSProperties}
                onClick={() => {
                  // 決済前に入力データを保存
                  sessionStorage.setItem('compatibility_inputs', JSON.stringify(inputs))
                  if (result) sessionStorage.setItem('compatibility_free_result', JSON.stringify(result))
                }}
              >
                💘 この関係を壊さない方法を見る（¥980）
              </a>
              <Link href="/star/compatibility-ai/sample" style={styles.sampleFallback}>
                📋 まずサンプルを見てみる
              </Link>
              {paidError && <p style={styles.errorText}>{paidError}</p>}
            </div>
          ) : (
            // ② 購入後の有料結果表示
            <div id="paid-result-anchor">
              {paidLoading ? (
                <div style={styles.paidLoading}>
                  <div style={styles.paidLoadingSpinner}>✨</div>
                  <p style={styles.paidLoadingText}>
                    あなた専用の続きを読み解いています…
                  </p>
                </div>
              ) : paidResult ? (
                <>
                  <div style={styles.paidHeader}>
                    <span style={styles.paidBadge}>💘 詳細診断</span>
                    <p style={styles.paidHeaderTitle}>ふたりのすれ違いの全貌</p>
                  </div>

                  {paidResult.realScene && (
                    <ResultSection title="🎬 実際のすれ違いシーン" text={paidResult.realScene} />
                  )}
                  {paidResult.familyAndFriendImpact && (
                    <ResultSection title="👨‍👩‍👧 家族・友人関係の影響" text={paidResult.familyAndFriendImpact} />
                  )}
                  {paidResult.conflictReason && (
                    <ResultSection title="💥 喧嘩になる理由" text={paidResult.conflictReason} />
                  )}

                  {paidResult.advice && paidResult.advice.length > 0 && (
                    <div style={styles.adviceBlock}>
                      <p style={styles.adviceBlockTitle}>💡 改善策＆会話テンプレート</p>
                      {paidResult.advice.map((a, i) => (
                        <div key={i} style={styles.adviceItem}>
                          <p style={styles.adviceTitle}>✦ {a.title}</p>
                          {a.detail && <p style={styles.adviceDetail}>{a.detail}</p>}
                          {a.conversationExample && (
                            <div style={styles.conversationBox}>
                              <p style={styles.conversationLabel}>💬 会話例</p>
                              <p style={styles.conversationText}>{a.conversationExample}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {paidResult.futureStoryFull && (
                    <div style={styles.storyCardFull}>
                      <p style={styles.storyTitle}>📖 1年後のふたりのストーリー（完全版）</p>
                      <p style={styles.storyText}>{paidResult.futureStoryFull}</p>
                    </div>
                  )}

                  {/* ③ 有料結果直後LINE導線 */}
                  <div style={styles.lineCardPaid}>
                    <p style={styles.linePaidEyecatch}>📱 手相診断も合わせて受けてみませんか？</p>
                    <p style={styles.linePaidDesc}>
                      LINEに登録すると<br />
                      手相診断の受付・占い結果のご質問ができます✨
                    </p>
                    <ul style={styles.lineList}>
                      <li>🤲 手相診断の受付（両手の写真を送るだけ）</li>
                      <li>💬 占い結果へのご質問</li>
                      <li>🌟 Twinkle Star Oracleからのお知らせ（不定期）</li>
                    </ul>
                    <a
                      href="https://lin.ee/XHDFrA8"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.lineBtn}
                    >
                      🟢 LINEで登録する（無料）
                    </a>
                  </div>
                </>
              ) : null}
            </div>
          )}

          {/* 注意文 */}
          <p style={styles.disclaimer}>{result.disclaimer}</p>
          <p style={styles.privacyNote}>🔒 入力された情報はサーバーに保存されません。セッション終了後に自動削除されます。</p>

          {/* もう一度 */}
          <button style={styles.retryBtn} onClick={() => {
            setStep(0)
            setResult(null)
            setPaidResult(null)
            setIsPaid(false)
          }}>
            🔄 もう一度診断する
          </button>
        </div>
      </div>
    )
  }

  return null
}

// ============================================================
// サブコンポーネント
// ============================================================
function StepHeader({ step, total, title, onBack }: { step: number; total: number; title: string; onBack: () => void }) {
  return (
    <div style={styles.stepHeader}>
      <button style={styles.backLink2} onClick={onBack}>← 戻る</button>
      <div style={styles.stepInfo}>
        <p style={styles.stepNum}>STEP {step} / {total}</p>
        <p style={styles.stepTitle}>{title}</p>
      </div>
      <div style={styles.stepDots}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{ ...styles.dot, background: i < step ? '#f472b6' : '#e2e8f0' }} />
        ))}
      </div>
    </div>
  )
}

function Section({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div style={styles.section}>
      <p style={styles.sectionTitle}>{emoji} {title}</p>
      {children}
    </div>
  )
}

function ChoiceBtn({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      style={{ ...styles.choiceBtn, ...(selected ? styles.choiceBtnSelected : {}) }}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

function NavButtons({
  onBack,
  onNext,
  nextDisabled = false,
}: {
  onBack?: () => void
  onNext?: () => void
  nextDisabled?: boolean
}) {
  return (
    <div style={styles.navBtns}>
      {onBack && (
        <button style={styles.backBtn} onClick={onBack}>← 戻る</button>
      )}
      {onNext && (
        <button
          style={{ ...styles.nextBtn, opacity: nextDisabled ? 0.4 : 1 }}
          onClick={onNext}
          disabled={nextDisabled}
        >
          次へ →
        </button>
      )}
    </div>
  )
}

function ResultSection({ title, text }: { title: string; text: string }) {
  return (
    <div style={styles.resultSection}>
      <p style={styles.resultTitle}>{title}</p>
      <p style={styles.resultText}>{text}</p>
    </div>
  )
}

// ============================================================
// スタイル
// ============================================================
const pink = '#f472b6'
const pinkLight = '#fce7f3'
const pinkDark = '#db2777'
const purple = '#a855f7'
const gold = '#fbbf24'
const textMain = '#1e1b4b'
const textSub = '#64748b'

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fdf2f8 0%, #f0f9ff 50%, #fdf4ff 100%)',
    fontFamily: "'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif",
    paddingBottom: '40px',
  },
  container: {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '0 16px',
  },
  header: {
    padding: '16px 0',
  },
  backLink: {
    color: textSub,
    textDecoration: 'none',
    fontSize: '14px',
  },
  // Hero
  hero: {
    textAlign: 'center',
    padding: '32px 0 24px',
  },
  badge: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #f472b6, #a855f7)',
    color: 'white',
    fontSize: '12px',
    fontWeight: 700,
    padding: '4px 16px',
    borderRadius: '999px',
    marginBottom: '16px',
  },
  heroTitle: {
    fontSize: '32px',
    fontWeight: 900,
    color: textMain,
    lineHeight: 1.3,
    margin: '0 0 12px',
  },
  heroSub: {
    fontSize: '16px',
    color: textSub,
    lineHeight: 1.6,
    margin: '0 0 20px',
  },
  heroAccent: {
    color: pink,
    fontWeight: 700,
  },
  piyochan: {
    fontSize: '48px',
    marginBottom: '8px',
  },
  piyoMessage: {
    background: pinkLight,
    borderRadius: '16px',
    padding: '12px 16px',
    fontSize: '14px',
    color: pinkDark,
    margin: '0 0 24px',
  },
  primaryBtn: {
    display: 'block',
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #f472b6, #a855f7)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '18px',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(244, 114, 182, 0.4)',
    marginBottom: '8px',
  },
  freeNote: {
    fontSize: '12px',
    color: textSub,
    margin: '4px 0',
  },
  // Features
  features: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px 0',
    background: 'white',
    borderRadius: '20px',
    marginBottom: '16px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  featureItem: {
    textAlign: 'center',
  },
  featureIcon: {
    fontSize: '28px',
    display: 'block',
    marginBottom: '6px',
  },
  featureText: {
    fontSize: '12px',
    color: textSub,
    margin: 0,
    lineHeight: 1.4,
  },
  // Price
  priceCard: {
    background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
    border: `2px solid ${pink}`,
    borderRadius: '20px',
    padding: '20px',
    textAlign: 'center',
    marginBottom: '16px',
  },
  priceLabel: {
    fontSize: '14px',
    fontWeight: 700,
    color: pinkDark,
    margin: '0 0 8px',
  },
  price: {
    margin: '0 0 8px',
  },
  originalPrice: {
    fontSize: '14px',
    color: textSub,
    textDecoration: 'line-through',
  },
  salePrice: {
    fontSize: '20px',
    fontWeight: 900,
    color: pinkDark,
  },
  priceDesc: {
    fontSize: '12px',
    color: textSub,
    margin: 0,
  },
  // Sample
  sampleLink: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  sampleBtn: {
    color: purple,
    textDecoration: 'none',
    fontSize: '14px',
    border: `1px solid ${purple}`,
    borderRadius: '999px',
    padding: '8px 20px',
    display: 'inline-block',
  },
  // Step header
  stepHeader: {
    padding: '16px 0',
    marginBottom: '8px',
  },
  backLink2: {
    background: 'none',
    border: 'none',
    color: textSub,
    fontSize: '14px',
    cursor: 'pointer',
    padding: 0,
    marginBottom: '8px',
    display: 'block',
  },
  stepInfo: {
    marginBottom: '8px',
  },
  stepNum: {
    fontSize: '12px',
    color: pink,
    fontWeight: 700,
    margin: '0 0 2px',
  },
  stepTitle: {
    fontSize: '20px',
    fontWeight: 900,
    color: textMain,
    margin: 0,
  },
  stepDots: {
    display: 'flex',
    gap: '6px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    transition: 'background 0.3s',
  },
  // Section
  section: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '15px',
    fontWeight: 700,
    color: textMain,
    margin: '0 0 10px',
  },
  // Choice buttons
  choiceBtn: {
    display: 'block',
    width: '100%',
    padding: '12px 16px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '14px',
    color: textMain,
    cursor: 'pointer',
    marginBottom: '8px',
    textAlign: 'left',
    transition: 'all 0.2s',
  },
  choiceBtnSelected: {
    background: pinkLight,
    borderColor: pink,
    color: pinkDark,
    fontWeight: 700,
  },
  // Textarea
  textarea: {
    width: '100%',
    minHeight: '80px',
    padding: '12px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '14px',
    color: textMain,
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  // Episode note
  episodeNote: {
    background: pinkLight,
    borderRadius: '12px',
    padding: '12px 16px',
    marginBottom: '20px',
    fontSize: '13px',
    color: pinkDark,
  },
  // Nav buttons
  navBtns: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
    paddingBottom: '24px',
  },
  backBtn: {
    flex: 1,
    padding: '14px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '15px',
    color: textSub,
    cursor: 'pointer',
  },
  nextBtn: {
    flex: 2,
    padding: '14px',
    background: 'linear-gradient(135deg, #f472b6, #a855f7)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '12px',
    textAlign: 'center',
  },
  // Result
  scoreCard: {
    textAlign: 'center',
    background: 'white',
    borderRadius: '24px',
    padding: '28px 20px',
    marginBottom: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  scoreLabel: {
    fontSize: '14px',
    color: textSub,
    margin: '0 0 16px',
    fontWeight: 700,
  },
  scoreCircle: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #fce7f3, #fdf4ff)',
    border: `4px solid ${pink}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
  scoreNum: {
    fontSize: '48px',
    fontWeight: 900,
    color: pinkDark,
    lineHeight: 1,
  },
  scorePct: {
    fontSize: '18px',
    color: pinkDark,
    fontWeight: 700,
    marginTop: '12px',
  },
  scoreBar: {
    height: '8px',
    background: '#e2e8f0',
    borderRadius: '999px',
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    background: 'linear-gradient(135deg, #f472b6, #a855f7)',
    borderRadius: '999px',
    transition: 'width 1s ease',
  },
  resultSection: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '16px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  resultTitle: {
    fontSize: '15px',
    fontWeight: 700,
    color: textMain,
    margin: '0 0 10px',
  },
  resultText: {
    fontSize: '14px',
    color: textSub,
    lineHeight: 1.7,
    margin: 0,
  },
  // Story
  storyCard: {
    background: 'linear-gradient(135deg, #fdf4ff, #fce7f3)',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '16px',
    position: 'relative',
    overflow: 'hidden',
  },
  storyTitle: {
    fontSize: '15px',
    fontWeight: 700,
    color: purple,
    margin: '0 0 10px',
  },
  storyText: {
    fontSize: '14px',
    color: textSub,
    lineHeight: 1.7,
    margin: '0 0 16px',
  },
  storyBlur: {
    background: 'linear-gradient(to bottom, transparent, rgba(253, 244, 255, 0.95))',
    height: '60px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: '-30px',
  },
  storyBlurText: {
    fontSize: '13px',
    color: purple,
    fontWeight: 700,
    margin: 0,
  },
  // Lock
  lockCard: {
    background: 'white',
    border: `2px solid ${pink}`,
    borderRadius: '20px',
    padding: '24px',
    marginBottom: '16px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(244, 114, 182, 0.15)',
  },
  lockTitle: {
    fontSize: '18px',
    fontWeight: 900,
    color: textMain,
    margin: '0 0 16px',
  },
  lockList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 16px',
    textAlign: 'left',
  },
  lockPrice: {
    margin: '0 0 16px',
    fontSize: '16px',
  },
  lockOriginal: {
    color: textSub,
    textDecoration: 'line-through',
    fontSize: '14px',
  },
  lockSale: {
    color: pinkDark,
    fontWeight: 900,
    fontSize: '20px',
  },
  lockNote: {
    fontSize: '11px',
    color: textSub,
    marginTop: '8px',
  },
  // Piyo
  piyoCard: {
    background: pinkLight,
    borderRadius: '20px',
    padding: '20px',
    textAlign: 'center',
    marginBottom: '16px',
  },
  piyoBig: {
    fontSize: '40px',
    marginBottom: '8px',
  },
  piyoText: {
    fontSize: '14px',
    color: pinkDark,
    lineHeight: 1.7,
    margin: 0,
  },
  // Disclaimer
  disclaimer: {
    fontSize: '11px',
    color: textSub,
    lineHeight: 1.6,
    textAlign: 'center',
    margin: '16px 0',
    padding: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
  },
  retryBtn: {
    display: 'block',
    width: '100%',
    padding: '14px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '15px',
    color: textSub,
    cursor: 'pointer',
  },
  sampleFallback: {
    display: 'block',
    textAlign: 'center',
    color: purple,
    textDecoration: 'none',
    fontSize: '13px',
    marginTop: '10px',
    padding: '8px',
  },
  privacyNote: {
    fontSize: '11px',
    color: textSub,
    textAlign: 'center',
    margin: '8px 0 16px',
    padding: '8px 12px',
    background: '#f8fafc',
    borderRadius: '8px',
    border: '1px dashed #cbd5e1',
  },
  // ⑤ 無料結果直後LINE（改善版）
  lineCardFree: {
    background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
    border: '2px solid #86efac',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '16px',
  },
  lineFreeEyecatch: {
    fontSize: '15px',
    fontWeight: 900,
    color: '#166534',
    margin: '0 0 6px',
  },
  lineFreeDesc: {
    fontSize: '13px',
    color: '#166534',
    lineHeight: 1.7,
    margin: '0 0 12px',
  },
  lineNudge: {
    fontSize: '13px',
    color: '#166534',
    fontWeight: 700,
    margin: '0 0 10px',
    textAlign: 'center',
  },
  lineList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 16px',
    fontSize: '13px',
    color: '#166534',
    lineHeight: 2,
  },
  lineBtn: {
    display: 'block',
    background: '#22c55e',
    color: 'white',
    padding: '14px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '16px',
    textAlign: 'center',
  },
  // ③ 有料結果直後LINE
  lineCardPaid: {
    background: 'linear-gradient(135deg, #fdf2f8, #f0fdf4)',
    border: '2px solid #86efac',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '16px',
  },
  linePaidEyecatch: {
    fontSize: '15px',
    fontWeight: 900,
    color: '#166534',
    margin: '0 0 6px',
  },
  linePaidDesc: {
    fontSize: '13px',
    color: '#166534',
    lineHeight: 1.7,
    margin: '0 0 12px',
  },
  // 有料結果ヘッダー
  paidHeader: {
    textAlign: 'center',
    padding: '20px 0 8px',
    marginBottom: '8px',
  },
  paidBadge: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #f472b6, #a855f7)',
    color: 'white',
    fontSize: '12px',
    fontWeight: 700,
    padding: '4px 16px',
    borderRadius: '999px',
    marginBottom: '8px',
  },
  paidHeaderTitle: {
    fontSize: '20px',
    fontWeight: 900,
    color: textMain,
    margin: '8px 0 0',
  },
  // アドバイスブロック
  adviceBlock: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '16px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  adviceBlockTitle: {
    fontSize: '15px',
    fontWeight: 700,
    color: textMain,
    margin: '0 0 14px',
  },
  adviceItem: {
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #f1f5f9',
  },
  adviceTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: purple,
    margin: '0 0 8px',
  },
  adviceDetail: {
    fontSize: '13px',
    color: textSub,
    lineHeight: 1.7,
    margin: '0 0 10px',
  },
  conversationBox: {
    background: pinkLight,
    borderRadius: '12px',
    padding: '12px',
  },
  conversationLabel: {
    fontSize: '11px',
    color: pinkDark,
    fontWeight: 700,
    margin: '0 0 4px',
  },
  conversationText: {
    fontSize: '13px',
    color: pinkDark,
    lineHeight: 1.7,
    margin: 0,
  },
  // ストーリー完全版
  storyCardFull: {
    background: 'linear-gradient(135deg, #fdf4ff, #fce7f3)',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '16px',
  },
  // ② ローディング
  paidLoading: {
    textAlign: 'center',
    padding: '32px 20px',
    background: 'linear-gradient(135deg, #fdf2f8, #fdf4ff)',
    borderRadius: '20px',
    marginBottom: '16px',
  },
  paidLoadingSpinner: {
    fontSize: '36px',
    marginBottom: '12px',
  },
  paidLoadingText: {
    fontSize: '15px',
    color: pinkDark,
    fontWeight: 700,
    lineHeight: 1.6,
    margin: 0,
  },
  // デモボタン（開発用）
  demoSection: {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px dashed #e2e8f0',
  },
  demoNote: {
    fontSize: '11px',
    color: textSub,
    textAlign: 'center',
    marginBottom: '8px',
    lineHeight: 1.6,
  },
  demoBtn: {
    display: 'block',
    width: '100%',
    padding: '12px',
    background: '#f1f5f9',
    border: '1px dashed #94a3b8',
    borderRadius: '10px',
    fontSize: '14px',
    color: textSub,
    cursor: 'pointer',
  },
}

// Suspenseラッパー（useSearchParams対応）
export default function CompatibilityAIPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fdf2f8 0%, #f0f9ff 50%, #fdf4ff 100%)',
        fontFamily: "'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif",
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🐥</div>
          <p style={{ color: '#db2777', fontWeight: 700 }}>読み込み中...</p>
        </div>
      </div>
    }>
      <CompatibilityAIInner />
    </Suspense>
  )
}
