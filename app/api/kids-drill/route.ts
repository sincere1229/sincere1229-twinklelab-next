import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { grade, subject, unit } = await req.json();

  const prompt = `あなたは小学生の学習支援の専門家です。
以下の条件に最適な市販ドリル・参考書を3冊推薦してください。

学年: ${grade}
教科: ${subject}
単元: ${unit}

以下のJSON形式のみで回答してください。説明文は不要です。マークダウン記法も不要です。
[
  {"level":"やさしい","name":"書籍名（実在する市販ドリル）","reason":"50字以内でこの本を選んだ理由"},
  {"level":"ふつう","name":"書籍名（実在する市販ドリル）","reason":"50字以内でこの本を選んだ理由"},
  {"level":"むずかしい","name":"書籍名（実在する市販ドリル）","reason":"50字以内でこの本を選んだ理由"}
]

注意：
- 必ず実在する市販ドリルの正式書名を使用してください
- 学研・くもん・Z会・旺文社・受験研究社などの実在する出版社の本を選んでください
- levelは必ず「やさしい」「ふつう」「むずかしい」の3種類にしてください`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "API error" }, { status: 500 });
  }

  const data = await res.json();
  const text = data.content?.[0]?.text ?? "";
  const clean = text.replace(/```json|```/g, "").trim();

  try {
    const items = JSON.parse(clean);
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: "Parse error" }, { status: 500 });
  }
}
