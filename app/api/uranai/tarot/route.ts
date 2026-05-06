import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, gender, birthdate, birthtime, birthplace, question, cards } = await req.json()

    if (!name || !gender || !birthdate || !question || !cards) {
      return NextResponse.json({ error: '必須項目が不足しています' }, { status: 400 })
    }

    const cardInfo = cards.map((c: any) =>
      `【${c.position}】${c.num} ${c.name}${c.reversed ? ' (逆位置)' : ' (正位置)'}`
    ).join('\n')

    const prompt = `【お客様情報】
お名前：${name}様
性別：${gender}
生年月日：${birthdate}
出生時間：${birthtime || '不明'}
出生地：${birthplace || '不明'}
ご質問・テーマ：${question}

【引いたタロットカード（5枚）】
${cardInfo}

以下の構成でタロット5枚引き＋ホロスコープ総合リーディング（¥1,980）を作成してください。

【出力条件】
1200〜1800文字
やさしく・深く・寄り添う
「当たってる」と感じさせる具体性を入れる
マークダウン記号（##、**、---など）は一切使わない
普通のテキストのみで出力する

【構成】
① 冒頭：「${name}様のカードを引きました」から始め、全体の印象を一言で
② カード5枚の総合読み：各カードの意味を「${question}」というテーマで統合して流れとして読む
③ ホロスコープからの補足：生年月日・出生地から見える星の特徴・今の運気・タイミング
④ 統合メッセージ：タロットと星が一致して伝えていること
⑤ 核心の一言：ドキッとするが優しい一言
⑥ 具体的アドバイス：今すぐできること3つ
⑦ クロージング：前向きに締める
⑧ 次への導線（必ず入れる）：
「今回のリーディングは、あなたの今この瞬間を映し出しています。手相と組み合わせることで、より深い人生全体の流れも見えてきます。手相付き総合鑑定（¥3,980）では、恋愛・仕事・金運を含めた本格鑑定をお届けしています🌙
ご希望の方はこちらから👇
https://buy.stripe.com/aFa5kw8Hs6C6dR3fRx33W02」`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001',
        max_tokens: 2500,
        messages: [{ role: 'user', content: prompt }],
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
