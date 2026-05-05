import { NextRequest, NextResponse } from "next/server";

const UPSTASH_URL = process.env.KV_REST_API_URL!;
const UPSTASH_TOKEN = process.env.KV_REST_API_TOKEN!;

async function upstashSingle(cmd: string[]) {
  const res = await fetch(`${UPSTASH_URL}/${cmd.map(encodeURIComponent).join("/")}`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
  });
  return res.json();
}

async function upstashPipeline(commands: string[][]) {
  const res = await fetch(`${UPSTASH_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });
  return res.json();
}

export async function GET(req: NextRequest) {
  try {
    const kw = req.nextUrl.searchParams.get("keyword") ?? "";
    const key = `study-comments:${kw}`;
    const data = await upstashSingle(["lrange", key, "0", "29"]);
    const items = (data.result ?? []).map((s: string) => {
      try { return JSON.parse(s); } catch { return null; }
    }).filter(Boolean);
    return NextResponse.json(items);
  } catch (e) {
    console.error("GET comments error:", e);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { keyword, name, comment } = await req.json();
    if (!keyword || !comment) return NextResponse.json({ ok: false });
    const key = `study-comments:${keyword}`;
    const entry = JSON.stringify({ name, comment, createdAt: new Date().toISOString() });
    // lpush と expire を pipeline で1回のリクエストにまとめる
    await upstashPipeline([
      ["lpush", key, entry],
      ["expire", key, "7776000"],
    ]);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("POST comments error:", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
