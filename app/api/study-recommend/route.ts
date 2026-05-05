import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { keyword } = await req.json();
  if (!keyword) return NextResponse.json({ error: "keyword required" }, { status: 400 });

  const prompt = `
あなたは社会人・サラリーマン向けの資格・スキルアップ本の専門アドバイザーです。

ユーザーが「${keyword}」と入力しました。

この資格・分野・テーマに関連するおすすめ本を5冊、以下のJSON形式で返してください。
Amazonで実際に購入できる本のみを推薦してください。

レベルは以下から選択：入門 / 初級 / 中級 / 上級

返却形式（JSONのみ、他のテキスト不要）：
{
  "items": [
    {
      "title": "本のタイトル",
      "author": "著者名",
      "publisher": "出版社名",
      "reason": "この本をおすすめする理由（80字以内、具体的に）",
      "level": "入門",
      "category": "カテゴリ（例：会計・簿記、IT・プログラミング、士業、ビジネス、副業・起業、医療福祉、AI活用など）",
      "amazonUrl": "https://www.amazon.co.jp/s?k=（本のタイトルを+でつないだ検索URL）",
      "price": "参考価格（例：¥1,650）"
    }
  ]
}

重要：
- 実際に存在する本のみ
- amazonUrlはAmazon検索URLを使用（例：https://www.amazon.co.jp/s?k=簿記+2級+テキスト）
- レベルは学習者の習熟度に合わせて入門〜上級を混在させてよい
- reasonは実用的な理由（「わかりやすい」ではなく具体的な特徴）
- 最新版・改訂版があればそちらを優先
`;

  try {
    const message = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const text = (message.content[0] as { type: string; text: string }).text;
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json(parsed);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "AI error" }, { status: 500 });
  }
}
