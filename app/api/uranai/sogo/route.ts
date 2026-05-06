import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, gender, birthdate, birthtime, birthplace, concern, imageL, imageR, mimeTypeL, mimeTypeR, cards } = await req.json()

    if (!name || !gender || !birthdate || !concern || (!imageL && !imageR) || !cards) {
      return NextResponse.json({ error: '必須項目が不足しています' }, { status: 400 })
    }

    const cardInfo = cards.map((c: any) =>
      `【${c.position}】${c.num} ${c.name}${c.reversed ? ' (逆位置)' : ' (正位置)'}`
    ).join('\n')

    const customerInfo = `【お客様情報】
お名前：${name}様
生年月日：${birthdate}
性別：${gender}
出生時間：${birthtime || '不明'}
出生地：${birthplace || '不明'}
相談内容：${concern}

【引いたタロットカード（5枚）】
${cardInfo}`

    const content: any[] = []
    if (imageL) {
      content.push({ type: 'text', text: '【左手の手相画像】' })
      content.push({ type: 'image', source: { type: 'base64', media_type: mimeTypeL, data: imageL } })
    }
    if (imageR) {
      content.push({ type: 'text', text: '【右手の手相画像】' })
      content.push({ type: 'image', source: { type: 'base64', media_type: mimeTypeR, data: imageR } })
    }

    const prompt = `${customerInfo}

以下の構成で総合鑑定文（2000〜3000文字）を作成してください。

① 冒頭：お礼＋「手相・タロット・星、すべてが同じことを伝えています」という導入
② 人生の本質：性格の核・生き方の特徴（手相から読む）
③ タロット5枚の流れ：過去→現在→未来→課題→アドバイスを一つのストーリーとして読む
④ 現在の状態：今の流れ・停滞 or 変化（手相＋タロット統合）
⑤ 未来の流れ：今後の運気・変化のタイミング（ホロスコープ・数秘術）
⑥ 分野別鑑定
　恋愛運：具体的に
　仕事運：具体的に
　金運：具体的に
⑦ ズレの本質：人生レベルでのズレ
⑧ 開運アクション：具体的に3〜5個
⑨ 重要メッセージ：手相・タロット・星が一致して伝える最も大切なこと
⑩ クロージング：前向きに・安心させる

やさしく・深く・人生相談レベルのトーンで。
マークダウン記号（##、**、---など）は一切使わない。普通のテキストのみで出力する。
使用占術：手相をベースに、タロット5枚・数秘術・ホロスコープを統合して読み解く`

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
        max_tokens: 4000,
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
