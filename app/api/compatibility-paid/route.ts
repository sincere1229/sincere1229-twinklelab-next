import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { inputs, sessionId } = body

    if (!sessionId) {
      return NextResponse.json({ success: false, error: '決済情報が確認できません' }, { status: 400 })
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''
    if (!stripeSecretKey) {
      return NextResponse.json({ success: false, error: 'Stripe設定エラー' }, { status: 500 })
    }

    // Stripeで決済確認
    const stripeRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
      { headers: { Authorization: `Bearer ${stripeSecretKey}` } }
    )

    if (!stripeRes.ok) {
      return NextResponse.json({ success: false, error: '決済情報の確認に失敗しました' }, { status: 400 })
    }

    const stripeSession = await stripeRes.json()

    if (stripeSession.payment_status !== 'paid') {
      return NextResponse.json({ success: false, error: '決済が完了していません' }, { status: 402 })
    }

    // メタデータから入力データを復元（あれば優先使用）
    let diagInputs = inputs
    if (stripeSession.metadata?.inputs) {
      try {
        diagInputs = JSON.parse(stripeSession.metadata.inputs)
      } catch { /* inputsをそのまま使用 */ }
    }

    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY || ''
    const model = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001'

    const systemPrompt = `カップルの相性をやさしく前向きに分析するAIです。
断定禁止・相手を悪者にしない・最後は安心感で終わる。
ぴよちゃんの口調：「〜だよ」「〜だね」

必ず以下のJSONのみ返す。バッククォート不要。JSON以外の文字列を含めないこと。
{"score":"70","positiveSummary":"200字以内","coreGap":"200字以内","realScene":"200字以内","familyAndFriendImpact":"150字以内","conflictReason":"150字以内","advice":[{"title":"タイトル","detail":"100字以内","conversationExample":"会話例"}],"futureStoryPreview":"150字以内","futureStoryFull":"200字以内","piyochanMessage":"100字以内","disclaimer":"この診断はAIによる傾向分析です。人間関係は変化します。最終的な判断はあなたの気持ちを大切にしてください。"}`

    const userPrompt = `カップルの相性診断（有料版・全項目100文字以上で詳しく）をしてください。adviceは2つ。

【あなた】
性格：${diagInputs?.yourType || '未入力'}
休日：${diagInputs?.yourWeekend || '未入力'}
一人の時間：${diagInputs?.yourAloneTime || '未入力'}
友人関係：${diagInputs?.yourFriends || '未入力'}
家族との関係：${diagInputs?.yourFamily || '未入力'}
家族行事：${diagInputs?.yourFamilyPriority || '未入力'}
趣味：${diagInputs?.yourHobbies || '未入力'}

【相手】
性格：${diagInputs?.partnerType || '未入力'}
休日：${diagInputs?.partnerWeekend || '未入力'}
一人の時間：${diagInputs?.partnerAloneTime || '未入力'}
友人関係：${diagInputs?.partnerFriends || '未入力'}
家族との関係：${diagInputs?.partnerFamily || '未入力'}
家族行事：${diagInputs?.partnerFamilyPriority || '未入力'}
趣味：${diagInputs?.partnerHobbies || '未入力'}

【エピソード】
最近の出来事：${diagInputs?.recentEvent || '未入力'}
嬉しかったこと：${diagInputs?.recentHappy || '未入力'}
印象的な出来事：${diagInputs?.memorableEvent || '未入力'}`

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 2048,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!apiRes.ok) {
      const errBody = await apiRes.text()
      console.error('Anthropic API error:', apiRes.status, errBody)
      throw new Error(`Anthropic API returned ${apiRes.status}`)
    }

    const apiData = await apiRes.json()
    const rawText: string = apiData.content?.[0]?.type === 'text' ? apiData.content[0].text : ''

    const cleaned = rawText.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim()
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('JSON not found:', rawText)
      throw new Error('AI応答の解析に失敗しました')
    }

    const result = JSON.parse(jsonMatch[0])
    return NextResponse.json({ success: true, result })

  } catch (error) {
    console.error('Paid diagnosis error:', error)
    return NextResponse.json({ success: false, error: '診断中にエラーが発生しました。もう一度お試しください。' }, { status: 500 })
  }
}
