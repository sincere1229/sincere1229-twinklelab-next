import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { image, mimeType } = await req.json()

    if (!image) {
      return NextResponse.json({ error: '画像が必要です' }, { status: 400 })
    }

    const prompt = `添付された手相画像を見て、シンプルで温かい「かんたん手相診断」を作成してください。

【出力条件】
250〜350文字
やさしく・ポジティブ・読みやすい
「少し当たってる」と感じさせる
友達に話しかけるような自然なトーン
絵文字を適度に使う
マークダウン記号（##、**、---など）は一切使わない

【構成】
① 手相から見える、その人の一番の特徴・強み（1〜2文）
② 今の状態・流れ（1〜2文）
③ 一言メッセージ（ドキッとするが優しい言葉）
④ 締め：「もっと詳しく知りたい方は詳細診断もあります✨」という一文で締める

※長くしない・難しくしない・シンプルに`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mimeType, data: image } },
            { type: 'text', text: prompt }
          ]
        }],
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error?.message || '診断に失敗しました')
    }

    const data = await response.json()
    const result = data.content[0]?.text || ''
    return NextResponse.json({ result })

  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || '診断に失敗しました' }, { status: 500 })
  }
}
