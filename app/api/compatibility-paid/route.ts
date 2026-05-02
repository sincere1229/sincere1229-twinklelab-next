import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { inputs, sessionId } = body

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: '決済情報が確認できません' },
        { status: 400 }
      )
    }

    // Stripe APIで決済確認（stripeパッケージ不要・fetch直接呼び出し）
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''
    if (!stripeSecretKey) {
      return NextResponse.json(
        { success: false, error: 'Stripe設定エラー' },
        { status: 500 }
      )
    }

    const stripeRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
        },
      }
    )

    if (!stripeRes.ok) {
      console.error('Stripe session fetch failed:', stripeRes.status)
      return NextResponse.json(
        { success: false, error: '決済情報の確認に失敗しました' },
        { status: 400 }
      )
    }

    const stripeSession = await stripeRes.json()

    if (stripeSession.payment_status !== 'paid') {
      return NextResponse.json(
        { success: false, error: '決済が完了していません' },
        { status: 402 }
      )
    }

    // 決済確認OK → 有料診断を実行
    const apiKey =
      process.env.ANTHROPIC_API_KEY ||
      process.env.VITE_ANTHROPIC_API_KEY ||
      ''

    const model =
      process.env.ANTHROPIC_MODEL ||
      'claude-haiku-4-5-20251001'

    const systemPrompt = `あなたはカップルの相性を優しく・前向きに分析するAIです。

【絶対ルール】
・断定禁止（「〜かもしれません」「〜の傾向があります」という表現を使う）
・相手を悪者にしない
・すれ違いは「善意のすれ違い」として説明する
・内向型/外向型に優劣をつけない
・家族観は文化差として扱う
・必ず改善策と会話例を3パターン提示する
・最後は安心感で終わる
・ぴよちゃんの口調：「〜だよ」「〜だね」「大丈夫だよ」

返答は必ず以下のJSONのみ。前置き・説明・マークダウン（バッククォート）は一切不要。

{"score":"70","positiveSummary":"...","coreGap":"...","realScene":"具体的なすれ違いシーン（200文字以上）","familyAndFriendImpact":"家族・友人関係の影響（200文字以上）","conflictReason":"喧嘩になる理由（200文字以上）","advice":[{"title":"アドバイス1","detail":"詳細（150文字以上）","conversationExample":"会話例"},{"title":"アドバイス2","detail":"詳細（150文字以上）","conversationExample":"会話例"},{"title":"アドバイス3","detail":"詳細（150文字以上）","conversationExample":"会話例"}],"futureStoryPreview":"...","futureStoryFull":"1年後のストーリー完全版（400文字以上）","piyochanMessage":"...","disclaimer":"この診断はAIによる傾向分析です。人間関係は変化します。最終的な判断はあなたの気持ちを大切にしてください。"}`

    const userPrompt = `カップルの相性診断（有料版・詳細）をしてください。
全項目を詳しく・丁寧に記述してください。

【あなた】
性格：${inputs.yourType || '未入力'}
休日：${inputs.yourWeekend || '未入力'}
一人の時間：${inputs.yourAloneTime || '未入力'}
友人関係：${inputs.yourFriends || '未入力'}
家族との関係：${inputs.yourFamily || '未入力'}
家族行事：${inputs.yourFamilyPriority || '未入力'}
趣味：${inputs.yourHobbies || '未入力'}

【相手】
性格：${inputs.partnerType || '未入力'}
休日：${inputs.partnerWeekend || '未入力'}
一人の時間：${inputs.partnerAloneTime || '未入力'}
友人関係：${inputs.partnerFriends || '未入力'}
家族との関係：${inputs.partnerFamily || '未入力'}
家族行事：${inputs.partnerFamilyPriority || '未入力'}
趣味：${inputs.partnerHobbies || '未入力'}

【エピソード】
最近の出来事：${inputs.recentEvent || '未入力'}
嬉しかったこと：${inputs.recentHappy || '未入力'}
印象的な出来事：${inputs.memorableEvent || '未入力'}`

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 2500,
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
    const rawText: string =
      apiData.content?.[0]?.type === 'text' ? apiData.content[0].text : ''

    const cleaned = rawText
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/gi, '')
      .trim()

    const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('JSON not found:', rawText)
      throw new Error('AI応答の解析に失敗しました')
    }

    const result = JSON.parse(jsonMatch[0])
    return NextResponse.json({ success: true, result })

  } catch (error) {
    console.error('Paid diagnosis error:', error)
    return NextResponse.json(
      { success: false, error: '診断中にエラーが発生しました。もう一度お試しください。' },
      { status: 500 }
    )
  }
}
