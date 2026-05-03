import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { inputs, mode } = body

    // 環境変数チェック（VITE_プレフィックスも含めて両方試みる）
    const apiKey =
      process.env.ANTHROPIC_API_KEY ||
      process.env.VITE_ANTHROPIC_API_KEY ||
      ''

    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY が設定されていません')
      return NextResponse.json(
        { success: false, error: 'APIキーが設定されていません。Vercelの環境変数を確認してください。' },
        { status: 500 }
      )
    }

    // 有料版はより高性能なモデルを使用
    const model = mode === 'paid'
      ? (process.env.ANTHROPIC_MODEL_PAID || process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001')
      : (process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001')

    const systemPrompt = `カップルの相性をやさしく前向きに分析するAIです。
断定禁止・相手を悪者にしない・最後は安心感で終わる。
ぴよちゃんの口調：「〜だよ」「〜だね」

必ず以下のJSONのみ返す。バッククォート不要。JSON以外の文字列を含めないこと。
{"score":"70","positiveSummary":"200字以内","coreGap":"200字以内","realScene":"${mode==='paid'?'200字以内':''}","familyAndFriendImpact":"${mode==='paid'?'150字以内':''}","conflictReason":"${mode==='paid'?'150字以内':''}","advice":[{"title":"タイトル","detail":"${mode==='paid'?'100字以内':''}","conversationExample":"${mode==='paid'?'会話例':''}"}],"futureStoryPreview":"150字以内","futureStoryFull":"${mode==='paid'?'200字以内':''}","piyochanMessage":"100字以内","disclaimer":"この診断はAIによる傾向分析です。人間関係は変化します。最終的な判断はあなたの気持ちを大切にしてください。"}`

    const userPrompt = `カップルの相性診断をしてください。
モード：${mode === 'paid' ? '有料版（全項目を100文字以上で詳しく記述。adviceは2つ）' : '無料版（realScene・familyAndFriendImpact・conflictReason・advice[].detail・advice[].conversationExample・futureStoryFullは空文字）'}

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

    console.log('Calling Anthropic API, model:', model, 'apiKey prefix:', apiKey.slice(0, 10))

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: mode === 'paid' ? 2048 : 1200,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!apiRes.ok) {
      const errBody = await apiRes.text()
      console.error('Anthropic API error status:', apiRes.status, 'body:', errBody)
      return NextResponse.json(
        { success: false, error: `AI APIエラー(${apiRes.status})。しばらく待ってから再試行してください。`, detail: errBody },
        { status: 500 }
      )
    }

    const apiData = await apiRes.json()
    console.log('Anthropic response stop_reason:', apiData.stop_reason)

    const rawText: string =
      apiData.content?.[0]?.type === 'text' ? apiData.content[0].text : ''

    if (!rawText) {
      console.error('Anthropic returned empty content:', JSON.stringify(apiData))
      return NextResponse.json(
        { success: false, error: 'AIからの応答が空でした。もう一度お試しください。' },
        { status: 500 }
      )
    }

    // JSON抽出：バッククォートも考慮
    const cleaned = rawText
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/gi, '')
      .trim()

    const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('JSON not found in response:', rawText)
      return NextResponse.json(
        { success: false, error: 'AI応答の解析に失敗しました。もう一度お試しください。' },
        { status: 500 }
      )
    }

    let result
    try {
      result = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'raw:', rawText)
      return NextResponse.json(
        { success: false, error: 'AI応答の解析に失敗しました。もう一度お試しください。' },
        { status: 500 }
      )
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
