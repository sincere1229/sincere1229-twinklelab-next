// app/api/compatibility-ai/route.ts
import { NextRequest, NextResponse } from 'next/server'

/* =========================================================
   相性診断 API（無料/有料 出し分け + PAY.JP課金照会）
   - mode:'free' … 無料層のみ生成（支払い不要）
   - mode:'paid' … chargeId を PAY.JP に照会し、支払い済みを確認してから有料層を生成
   ========================================================= */

// この商品の正規価格（照会時に金額の一致も確認する）
const EXPECTED_AMOUNT = 980

// chargeId が本当に支払い済みかを PAY.JP に確認
async function verifyCharge(chargeId: string): Promise<{ ok: boolean; reason?: string }> {
  const secret = process.env.PAYJP_SECRET_KEY
  if (!secret) return { ok: false, reason: 'PAYJP_SECRET_KEY 未設定' }
  if (!chargeId || typeof chargeId !== 'string') return { ok: false, reason: 'chargeId なし' }

  try {
    const res = await fetch(`https://api.pay.jp/v1/charges/${encodeURIComponent(chargeId)}`, {
      method: 'GET',
      headers: { Authorization: 'Basic ' + Buffer.from(secret + ':').toString('base64') },
    })
    const data = await res.json()
    if (!res.ok) return { ok: false, reason: '課金が見つかりません' }
    if (data.paid !== true) return { ok: false, reason: '未払いの課金です' }
    if (data.refunded === true) return { ok: false, reason: '返金済みの課金です' }
    if (data.currency !== 'jpy' || Number(data.amount) !== EXPECTED_AMOUNT) {
      return { ok: false, reason: '金額が一致しません' }
    }
    return { ok: true }
  } catch {
    return { ok: false, reason: '課金照会に失敗しました' }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { inputs, mode, chargeId } = body

    // ===== 有料モードは、生成前に必ず支払い確認 =====
    if (mode === 'paid') {
      const v = await verifyCharge(chargeId)
      if (!v.ok) {
        return NextResponse.json(
          { success: false, error: `決済の確認ができませんでした（${v.reason}）。お手数ですがサポートへご連絡ください。` },
          { status: 402 }
        )
      }
    }

    const apiKey =
      process.env.ANTHROPIC_API_KEY ||
      process.env.VITE_ANTHROPIC_API_KEY ||
      ''
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'APIキーが設定されていません。Vercelの環境変数を確認してください。' },
        { status: 500 }
      )
    }

    const model = mode === 'paid'
      ? (process.env.ANTHROPIC_MODEL_PAID || process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001')
      : (process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001')

    // ===== モード別 出力スキーマ =====
    const freeSchema =
      `{"score":70,"currentAssessment":"現状の見立て・180字程度","tendencies":"2人の傾向・180字程度","possibility":"関係の可能性・150字程度","piyochanMessage":"ぴよちゃんからの一言・80字程度"}`

    const paidSchema =
      `{"partnerTrueFeelings":"相手の本音・200字以上","disconnectCause":"すれ違いの原因・180字以上","forecast3months":"今後3か月の未来予測・200字以上","approachAdvice":"連絡・告白・距離の縮め方の具体策・200字以上","luckActions":["開運アクション1","開運アクション2","開運アクション3"],"roadmap":[{"period":"今すぐ〜1週間","action":"具体的な行動"},{"period":"1か月以内","action":"具体的な行動"},{"period":"3か月後","action":"具体的な行動"}],"piyochanMessage":"ぴよちゃんからの一言・100字程度","disclaimer":"この鑑定はAIによる傾向分析です。人間関係は変化します。最終的な判断はあなたの気持ちを大切にしてください。"}`

    const systemPrompt = `あなたはカップルの相性をやさしく前向きに分析するAIです。
ルール：断定しない／相手を悪者にしない／最後は安心感で終わる／ぴよちゃんの口調（「〜だよ」「〜だね」）を少し混ぜる。
${mode === 'paid'
  ? '【有料版】具体的で踏み込んだ内容にする。抽象論で終わらせず、明日からできる行動まで書く。'
  : '【無料版】「現状・傾向・可能性」という"気づき"までにとどめ、具体的な行動指針や答え・未来の断定は書かない（それは完全版の領域）。'}

必ず以下のJSONのみを返す。前後に説明やバッククォートを付けない。JSON以外の文字列を含めない。
${mode === 'paid' ? paidSchema : freeSchema}`

    const userPrompt = `次のカップルを相性診断してください。

【あなた】
性格：${inputs?.yourType || '未入力'}
休日：${inputs?.yourWeekend || '未入力'}
一人の時間：${inputs?.yourAloneTime || '未入力'}
友人関係：${inputs?.yourFriends || '未入力'}
家族との関係：${inputs?.yourFamily || '未入力'}
家族行事：${inputs?.yourFamilyPriority || '未入力'}
趣味：${inputs?.yourHobbies || '未入力'}

【相手】
性格：${inputs?.partnerType || '未入力'}
休日：${inputs?.partnerWeekend || '未入力'}
一人の時間：${inputs?.partnerAloneTime || '未入力'}
友人関係：${inputs?.partnerFriends || '未入力'}
家族との関係：${inputs?.partnerFamily || '未入力'}
家族行事：${inputs?.partnerFamilyPriority || '未入力'}
趣味：${inputs?.partnerHobbies || '未入力'}

【エピソード】
最近の出来事：${inputs?.recentEvent || '未入力'}
嬉しかったこと：${inputs?.recentHappy || '未入力'}
印象的な出来事：${inputs?.memorableEvent || '未入力'}`

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: mode === 'paid' ? 2048 : 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!apiRes.ok) {
      const errBody = await apiRes.text()
      console.error('Anthropic API error:', apiRes.status, errBody)
      return NextResponse.json(
        { success: false, error: `AI APIエラー(${apiRes.status})。しばらく待ってから再試行してください。` },
        { status: 500 }
      )
    }

    const apiData = await apiRes.json()
    const rawText: string = apiData.content?.[0]?.type === 'text' ? apiData.content[0].text : ''
    if (!rawText) {
      return NextResponse.json(
        { success: false, error: 'AIからの応答が空でした。もう一度お試しください。' },
        { status: 500 }
      )
    }

    const cleaned = rawText.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim()
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json(
        { success: false, error: 'AI応答の解析に失敗しました。もう一度お試しください。' },
        { status: 500 }
      )
    }

    let result
    try {
      result = JSON.parse(jsonMatch[0])
    } catch {
      return NextResponse.json(
        { success: false, error: 'AI応答の解析に失敗しました。もう一度お試しください。' },
        { status: 500 }
      )
    }

    // score を数値で返す保険
    if (result && typeof result.score !== 'undefined') {
      result.score = parseInt(String(result.score), 10) || 70
    }

    return NextResponse.json({ success: true, result })

  } catch (error) {
    console.error('Compatibility AI unexpected error:', error)
    return NextResponse.json(
      { success: false, error: '予期しないエラーが発生しました。もう一度お試しください。' },
      { status: 500 }
    )
  }
}
