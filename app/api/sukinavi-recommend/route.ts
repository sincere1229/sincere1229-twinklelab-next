import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { keyword } = await req.json();
  if (!keyword) return NextResponse.json({ error: "no keyword" }, { status: 400 });

  const prompt = `あなたは日本の音楽・文学の専門家です。
「${keyword}」が好きな人へのおすすめを5件、JSON形式で返してください。

小説家・作家の場合は同じジャンルや文体が近い作家を、アーティスト・バンドの場合は音楽的に近いアーティストを推薦してください。

以下のJSON配列のみで回答してください。説明文・マークダウン不要です。
[
  {"name":"推薦名","type":"作家 or アーティスト","reason":"30字以内の推薦理由"},
  ...
]

注意：
- 必ず実在する日本の作家・アーティストを中心に（洋楽・洋書も可）
- nameは正式名称で
- 5件必ず返す`;

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

  if (!res.ok) return NextResponse.json({ error: "API error" }, { status: 500 });

  const data = await res.json();
  const text = data.content?.[0]?.text ?? "";
  const clean = text.replace(/```json|```/g, "").trim();

  try {
    const items = JSON.parse(clean);
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: "parse error" }, { status: 500 });
  }
}
