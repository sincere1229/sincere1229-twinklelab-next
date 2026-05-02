import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { inputs, mode } = body // mode: 'free' | 'paid'

    const systemPrompt = `あなたは「ぴよちゃん」というキャラクターの占いAIです。
カップルの相性を、優しく、前向きに分析します。

【絶対ルール】
・断定禁止（「〜かもしれません」「〜の傾向があります」という表現を使う）
・相手を悪者にしない
・すれ違いは「善意のすれ違い」として説明する
・内向型/外向型に優劣をつけない
・家族観は文化差として扱う
・必ず改善策と会話例を提示する
・最後は安心感で終わる
・口調は「〜だよ」「〜だね」「大丈夫だよ」

【必ず以下のJSON形式のみで返答してください。前置きや説明は一切不要です】

{
  "score": "数字のみ（0〜100）",
  "positiveSummary": "ふたりの良いところ（200〜300文字）",
  "coreGap": "ズレの本質（150〜200文字）",
  "realScene": "具体的なシーン描写（有料版のみ詳しく、無料版は空文字）",
  "familyAndFriendImpact": "家族・友人関係の影響（有料版のみ、無料版は空文字）",
  "conflictReason": "喧嘩になる理由の分析（有料版のみ、無料版は空文字）",
  "advice": [
    {
      "title": "アドバイスのタイトル",
      "detail": "詳細（有料版のみ、無料版は空文字）",
      "conversationExample": "会話例（有料版のみ、無料版は空文字）"
    }
  ],
  "futureStoryPreview": "1年後のストーリー冒頭（150〜200文字、無料でも表示）",
  "futureStoryFull": "1年後のストーリー完全版（有料版のみ300〜500文字、無料版は空文字）",
  "piyochanMessage": "ぴよちゃんからのメッセージ（100〜150文字、必ずポジティブに終わる）",
  "disclaimer": "この診断はAIによる傾向分析です。人間関係は変化します。最終的な判断はあなたの気持ちを大切にしてください。"
}`

    const userPrompt = `以下の情報を元に、カップルの相性診断をしてください。
モード：${mode === 'paid' ? '有料版（詳細分析）' : '無料版（概要のみ）'}

【あなたについて】
性格タイプ：${inputs.yourType}
休日の過ごし方：${inputs.yourWeekend}
一人の時間の必要性：${inputs.yourAloneTime}
友人関係：${inputs.yourFriends}
家族との関係：${inputs.yourFamily}
家族行事の優先度：${inputs.yourFamilyPriority}
趣味・コミュニティ：${inputs.yourHobbies}

【相手について】
性格タイプ：${inputs.partnerType}
休日の過ごし方：${inputs.partnerWeekend}
一人の時間の必要性：${inputs.partnerAloneTime}
友人関係：${inputs.partnerFriends}
家族との関係：${inputs.partnerFamily}
家族行事の優先度：${inputs.partnerFamilyPriority}
趣味・コミュニティ：${inputs.partnerHobbies}

【最近のエピソード】
最近の小さな出来事：${inputs.recentEvent}
最近嬉しかったこと：${inputs.recentHappy}
印象的な出来事：${inputs.memorableEvent}

${mode === 'free' ? '※無料版なので、realScene・familyAndFriendImpact・conflictReason・advice[].detail・advice[].conversationExample・futureStoryFullは空文字にしてください' : '※有料版なので、すべての項目を詳しく記述してください'}`

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-latest',
        max_tokens: mode === 'paid' ? 2000 : 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!apiRes.ok) {
      const errBody = await apiRes.text()
      console.error('Anthropic API error:', errBody)
      throw new Error(`Anthropic API returned ${apiRes.status}`)
    }

    const apiData = await apiRes.json()
    const rawText: string =
      apiData.content?.[0]?.type === 'text' ? apiData.content[0].text : ''
    
    // JSONを抽出してパース
    const jsonMatch = rawText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('Raw Claude response:', rawText)
      throw new Error('JSON形式の応答が取得できませんでした')
    }
    
    let result
    try {
      result = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error('Raw Claude response:', rawText)
      throw parseError
    }
    
    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('Compatibility AI Error:', error)
    return NextResponse.json(
      { success: false, error: '診断中にエラーが発生しました。もう一度お試しください。' },
      { status: 500 }
    )
  }
}
