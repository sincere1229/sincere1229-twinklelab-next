// app/api/uranai/sogo/route.ts
import { NextRequest, NextResponse } from 'next/server'

/* AI総合鑑定（人生ロードマップ鑑定）：無料(俯瞰)/有料(未来設計) + 課金照会（¥3,980）
   free … 現在地・テーマ・強み・可能性まで（画像不要）
   paid … chargeId照会 → 手相画像(任意)＋タロット＋数秘＋星で人生設計を生成 */

const EXPECTED_AMOUNT = 3980

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
    const { name, gender, birthdate, birthtime, birthplace, concern,
            imageL, imageR, mimeTypeL, mimeTypeR, cards, mode, chargeId } = body

    if (!name || !gender || !birthdate || !concern) {
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

    const cardInfo = Array.isArray(cards) ? cards.map((c: any) =>
      `【${c.position}】${c.num} ${c.name}${c.reversed ? '（逆位置）' : '（正位置）'}`
    ).join('\n') : '（なし）'

    const customerInfo = `【お客様情報】
お名前：${name}様
生年月日：${birthdate}
性別：${gender}
出生時間：${birthtime || '不明'}
出生地：${birthplace || '不明'}
ご相談：${concern}
【タロット5枚】
${cardInfo}`

    const freeSchema =
      `{"currentPosition":"現在地・80字程度・例『あなたは今、人生の転換期の入口にいます』調","lifeThemes":["人生テーマを表す2〜3語","例：挑戦","例：再構築"],"strength":"本来の強み・80字程度","possibility":"今後の変化の兆し・70字程度・断定せず余白を残す","specialNote":"複数占術が同じテーマを示す等の特別感・占術構成から自然に言える範囲のみ・嘘や誇張は禁止・60字程度","hookMessage":"完全版へ誘導・90字程度・不安を煽らず『未来が楽しみ』で締める"}`

    const paidSchema =
      `{"love":"恋愛運（出会い・関係性・相手との流れ）・180字以上","work":"仕事運（適職・転職・副業・才能）・180字以上","money":"金運（収入・お金との付き合い方）・150字以上","relationships":"人間関係（大切にすべき縁・距離を置くべき縁）・150字以上","luckActions":["今すぐできること","今月やること","もう一つの開運行動"],"roadmap":[{"period":"30日後","action":"具体的な指針"},{"period":"90日後","action":"具体的な指針"},{"period":"半年後","action":"具体的な指針"},{"period":"1年後","action":"到達している姿"}],"coreMessage":"手相・タロット・星・数秘が一致して伝える最も大切なこと・150字程度","specialNote":"あなただけ感・占術構成から自然に・60字程度","piyochanMessage":"安心と前向きさで締める一言・100字程度","disclaimer":"この鑑定はAIによる傾向分析です。最終的な判断はあなたの気持ちを大切にしてください。"}`

    const systemPrompt = `あなたは手相・タロット・数秘術・ホロスコープを統合し、人生全体を俯瞰して「未来への指針」を示す鑑定士です。
これは占いの寄せ集めではなく「人生ロードマップ鑑定」。ユーザーが知りたいのは占術ではなく「これからどうすればいいか」。
ルール：断定で脅さない／恐怖訴求は禁止／不安→安心→期待→未来が楽しみ、の流れ／占術名を羅列せず統合して語る。
${mode === 'paid'
  ? '【有料版・¥3,980・TSO最上位】「未来を設計する」商品。恋愛・仕事・金運・人間関係を具体的に読み、30日/90日/半年/1年のロードマップで「これからどう進むか」を描く。手相画像があれば本質の読みに活かす。specialNote は占術構成から自然に言える範囲のみ（嘘・誇張禁止）。'
  : `【無料版】人生を俯瞰して「現在地→テーマ→強み→可能性」までを示す。
- 出さない：具体的な未来予測／行動指針／恋愛・仕事・金運の詳細／開運アクション／ロードマップ。
- possibility は断定せず「大きな変化の兆しがあります」程度で余白を残す。
- 最後は「未来が楽しみ」で止め、続きを知りたくさせる。`}

必ず以下のJSONのみを返す。前後に説明やバッククォートを付けない。
${mode === 'paid' ? paidSchema : freeSchema}`

    // メッセージ内容（有料かつ画像ありのときだけ手相画像を添付）
    const content: any[] = []
    if (mode === 'paid') {
      if (imageL) { content.push({ type: 'text', text: '【左手の手相画像】' }); content.push({ type: 'image', source: { type: 'base64', media_type: mimeTypeL || 'image/jpeg', data: imageL } }) }
      if (imageR) { content.push({ type: 'text', text: '【右手の手相画像】' }); content.push({ type: 'image', source: { type: 'base64', media_type: mimeTypeR || 'image/jpeg', data: imageR } }) }
    }
    content.push({ type: 'text', text: customerInfo })

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: mode === 'paid' ? 3500 : 1100,
        system: systemPrompt,
        messages: [{ role: 'user', content }],
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

    return NextResponse.json({ success: true, result })

  } catch (err: any) {
    console.error('Sogo unexpected error:', err)
    return NextResponse.json({ success: false, error: '予期しないエラーが発生しました。もう一度お試しください。' }, { status: 500 })
  }
}
