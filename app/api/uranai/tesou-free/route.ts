// app/api/uranai/tesou-free/route.ts
import { NextRequest, NextResponse } from 'next/server'

/* 手相かんたん診断（無料）：性格傾向・現在の状態・可能性まで。
   行動アドバイス・未来予測・転機は出さない（有料 tesou の領域）。 */

export async function POST(req: NextRequest) {
  try {
    const { image, mimeType } = await req.json()
    if (!image) {
      return NextResponse.json({ success: false, error: '画像が必要です' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY || ''
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'APIキーが設定されていません。' }, { status: 500 })
    }
    const model = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001'

    const schema =
      `{"personality":"性格傾向・100〜130字・手相から見える人柄。長くしない","currentState":"現在の状態・90〜120字・今の傾向の事実描写のみ（『休んで』『労って』等の行動アドバイスは禁止）","possibility":"可能性・80〜110字・断定せず余白を残す"}`

    const systemPrompt = `あなたは手相から「今のその人」を読み解く、やさしい占い師です。
これは無料の「かんたん診断」。役割は現状把握まで。
ルール：
- 出すのは「性格傾向」「現在の状態」「可能性」の3つだけ。
- 行動アドバイス（休む・労る・〜するといい等）は禁止。未来予測・人生の転機も禁止（それは有料の詳細診断の領域）。
- 「少し当たってる」と感じる具体性は入れるが、答えや指針は出さない。
- 各項目は簡潔に。無料だけで満足させない（深掘り・列挙はしない）。仕事運・副業・金運・恋愛運・転機・ロードマップ・具体的な開運行動は無料では出さない。
- 恐怖訴求は禁止。やさしく前向きに。

必ず以下のJSONのみを返す。前後に説明やバッククォートを付けない。
${schema}`

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model,
        max_tokens: 700,
        system: systemPrompt,
        messages: [{ role: 'user', content: [
          { type: 'image', source: { type: 'base64', media_type: mimeType || 'image/jpeg', data: image } },
          { type: 'text', text: '添付の手相画像から、性格傾向・現在の状態・可能性を読み解いてJSONで返してください。' },
        ] }],
      }),
    })

    if (!apiRes.ok) {
      const errBody = await apiRes.text()
      console.error('Anthropic API error:', apiRes.status, errBody)
      return NextResponse.json({ success: false, error: `AI APIエラー(${apiRes.status})。しばらく待ってから再試行してください。` }, { status: 500 })
    }

    const apiData = await apiRes.json()
    const rawText: string = apiData.content?.[0]?.type === 'text' ? apiData.content[0].text : ''
    if (!rawText) {
      return NextResponse.json({ success: false, error: 'AIからの応答が空でした。もう一度お試しください。' }, { status: 500 })
    }

    const cleaned = rawText.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim()
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ success: false, error: 'AI応答の解析に失敗しました。もう一度お試しください。' }, { status: 500 })
    }

    let result
    try { result = JSON.parse(jsonMatch[0]) }
    catch { return NextResponse.json({ success: false, error: 'AI応答の解析に失敗しました。もう一度お試しください。' }, { status: 500 }) }

    return NextResponse.json({ success: true, result })

  } catch (err: any) {
    console.error('tesou-free unexpected error:', err)
    return NextResponse.json({ success: false, error: '予期しないエラーが発生しました。もう一度お試しください。' }, { status: 500 })
  }
}
