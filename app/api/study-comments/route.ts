import { NextRequest, NextResponse } from "next/server";

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

async function upstash(cmd: string[]) {
  const res = await fetch(`${UPSTASH_URL}/${cmd.map(encodeURIComponent).join("/")}`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
  });
  return res.json();
}

export async function GET(req: NextRequest) {
  const kw = req.nextUrl.searchParams.get("keyword") ?? "";
  const key = `study-comments:${kw}`;
  const data = await upstash(["lrange", key, "0", "29"]);
  const items = (data.result ?? []).map((s: string) => JSON.parse(s));
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const { keyword, name, comment } = await req.json();
  if (!keyword || !comment) return NextResponse.json({ ok: false });
  const key = `study-comments:${keyword}`;
  const entry = JSON.stringify({ name, comment, createdAt: new Date().toISOString() });
  await upstash(["lpush", key, entry]);
  await upstash(["expire", key, "7776000"]); // 90日
  return NextResponse.json({ ok: true });
}
