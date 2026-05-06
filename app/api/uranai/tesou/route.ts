import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { imageL, imageR, mimeTypeL, mimeTypeR, memo } = body

    if (!imageL && !imageR) {
      return NextResponse.json({ error: '画像が必要です' }, { status: 400 })
    }

    const handNote = imageL && imageR
      ? '左手・右手の両方の画像を添付しています。'
      : imageL
        ? '左手のみの画像です。右手は未提出のため、左手から読み解ける範囲で鑑定してください。'
        : '右手のみの画像です。左手は未提出のため、右手から読み解ける範囲で鑑定してください。'

    const userNote = memo ? `\n【お客様から】${memo}` : '\n【補足情報】なし'

    const content: any[] = []
    if (imageL) {
      content.push({ type: 'text', text: '【左手の画像】' })
      content.push({ type: 'image', source: { type: 'base64', media_type: mimeTypeL, data: imageL } })
    }
    if (imageR) {
      content.push({ type: 'text', text: '【右手の画像】' })
      content.push({ type: 'image', source: { type: 'base64', media_type: mimeTypeR, data: imageR } })
    }

    const prompt = `${handNote}
添付された手相画像を読み取り、以下の条件で手相詳細診断文（¥980）を作成してください。

【出力条件】
1000〜1400文字
やさしく・寄り添う・断定しすぎない
でも核心はしっかり伝える
「当たっている」と感じさせる個別性を必ず入れる
マークダウン記号（##、**、---など）は一切使わない
普通のテキストのみで出力する

【構成】
① 冒頭（お礼＋特別感）
② 左手（本来の自分）性格・本質・強み・価値観
③ 右手（現在の状態）今の状況・考え方・疲れやズレ
④ ズレ分析（最重要）本来の自分 vs 今の状態のズレ
⑤ 核心の一言 例：「本来のあなたはもっと○○な人です」
⑥ 未来の流れ（軽め）
⑦ 行動アドバイス（3つ）
⑧ クロージング
⑨ 次への導線（必ず入れる）
今回の内容は手相の中でも一部になりますが、実はこの先の流れや運気のタイミングも見えています。より深く人生全体を見たい方には、恋愛・仕事・金運を含めた総合鑑定もご用意しています🌙
AI総合鑑定（¥3,980）はこちらから👇
https://buy.stripe.com/aFa5kw8Hs6C6dR3fRx33W02
${userNote}`

    content.push({ type: 'text', text: prompt })

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001',
        max_tokens: 2000,
        messages: [{ role: 'user', content }],
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error?.message || '鑑定に失敗しました')
    }

    const data = await response.json()
    const result = data.content[0]?.text || ''
    return NextResponse.json({ result })

  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || '鑑定に失敗しました' }, { status: 500 })
  }
}
