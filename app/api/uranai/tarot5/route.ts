// app/api/uranai/tarot5/route.ts
import { NextRequest, NextResponse } from 'next/server'

/* タロット5枚：無料/有料 出し分け + PAY.JP課金照会（¥1,980） */

const EXPECTED_AMOUNT = 1980

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
    const { name, gender, birthdate, birthtime, birthplace, question, cards, mode, chargeId } = body

    if (!name || !gender || !birthdate || !question || !cards) {
      return NextResponse.json({ success: false, error: '必須項目が不足しています' }, { status: 400 })
    }

    if (mode === 'paid') {
      const v = await verifyCharge(chargeId)
      if (!v.ok) {
        return NextResponse.json(
          { success: false, error: `決済の確認ができませんでした（${v.reason}）。お手数ですがサポートへご連絡ください。` },
          { status: 402 }
        )
      }
    }

    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY || ''
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'APIキーが設定されていません。' }, { status: 500 })
    }

    const model = mode === 'paid'
      ? (process.env.ANTHROPIC_MODEL_PAID || process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001')
      : (process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001')

    const cardInfo = cards.map((c: any) =>
      `【${c.position}】${c.num} ${c.name}${c.reversed ? '（逆位置）' : '（正位置）'}`
    ).join('\n')

    const freeSchema =
      `{"theme":"今のテーマを表す短いフレーズ・15字以内","cardReads":["過去の見立て1行・40字以内","現在の見立て1行","未来の見立て1行","課題の見立て1行","アドバイスの見立て1行"],"overallTrend":"全体の傾向・100字程度","possibilityLine":"可能性を感じる一言・60字程度","hookMessage":"完全版へ誘導・90字程度。不安を煽らず期待で締める"}`

    const paidSchema =
      `{"cardMeanings":[{"position":"過去","name":"カード名","meaning":"このテーマでの詳しい意味・120字以上"},{"position":"現在","name":"","meaning":""},{"position":"未来","name":"","meaning":""},{"position":"課題","name":"","meaning":""},{"position":"アドバイス","name":"","meaning":""}],"forecast3months":"今後3か月の流れ・200字以上","actionGuide":"具体的な行動指針・180字以上","avoidActions":["避けるべき行動1","避けるべき行動2","避けるべき行動3"],"luckActions":["開運アクション1","開運アクション2","開運アクション3"],"roadmap":[{"period":"今すぐ〜1週間","action":"具体的な行動"},{"period":"1か月以内","action":"具体的な行動"},{"period":"3か月後（90日）","action":"具体的な行動"}],"themeDeepDive":"ご質問テーマ（恋愛・仕事・人間関係など）に沿った深掘り・200字以上","piyochanMessage":"安心の一言・100字程度","disclaimer":"この鑑定はAIによる傾向分析です。最終的な判断はあなたの気持ちを大切にしてください。"}`

    const systemPrompt = `あなたはタロットとホロスコープを統合して読み解く、やさしく寄り添う占い師です。
ルール：断定しない／不安を煽らない／恐怖訴求は禁止／最後は安心と前向きさで締める。
${mode === 'paid'
  ? '【有料版・¥1,980】情報量が多く、未来と行動まで具体的にわかる本格鑑定。各カードを質問テーマで深く読み、明日からの行動・時期・避けることまで書く。'
  : `【無料版】カード名と「ごく簡単な見立て」までにとどめる。
- 各カードの詳しい意味／具体的な未来予測／いつ動くべきか／何をすべきか／避けるべき行動／開運アクション／ロードマップ／詳細な行動指針は一切書かない（完全版の領域）。
- cardReads は引いた順（過去・現在・未来・課題・アドバイス）に1行ずつ、浅く。
- 最後は「もっと知りたい」で止める。`}

必ず以下のJSONのみを返す。前後に説明やバッククォートを付けない。
${mode === 'paid' ? paidSchema : freeSchema}`

    const userPrompt = `【お客様情報】
お名前：${name}様
性別：${gender}
生年月日：${birthdate}
出生時間：${birthtime || '不明'}
出生地：${birthplace || '不明'}
ご質問・テーマ：${question}

【引いたタロットカード（5枚）】
${cardInfo}`

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: mode === 'paid' ? 3000 : 1100,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
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
    try {
      result = JSON.parse(jsonMatch[0])
    } catch {
      return NextResponse.json({ success: false, error: 'AI応答の解析に失敗しました。もう一度お試しください。' }, { status: 500 })
    }

    // 有料：カード名が空なら引いたカードで補完
    if (mode === 'paid' && Array.isArray(result?.cardMeanings)) {
      result.cardMeanings = result.cardMeanings.map((m: any, i: number) => ({
        position: m.position || cards[i]?.position || '',
        name: m.name || cards[i]?.name || '',
        meaning: m.meaning || '',
      }))
    }

    return NextResponse.json({ success: true, result })

  } catch (err: any) {
    console.error('Tarot5 unexpected error:', err)
    return NextResponse.json({ success: false, error: '予期しないエラーが発生しました。もう一度お試しください。' }, { status: 500 })
  }
}
