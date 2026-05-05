import { NextRequest, NextResponse } from "next/server";

const KV_URL = process.env.KV_REST_API_URL ?? "";
const KV_TOKEN = process.env.KV_REST_API_TOKEN ?? "";

async function kvGet(key: string) {
  const res = await fetch(`${KV_URL}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${KV_TOKEN}` },
  });
  const data = await res.json();
  return data.result ? JSON.parse(data.result) : [];
}

async function kvSet(key: string, value: unknown) {
  await fetch(`${KV_URL}/set/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
}

// GET: コメント取得
export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get("keyword") ?? "";
  if (!keyword) return NextResponse.json([]);
  const comments = await kvGet(`comments:${keyword}`);
  return NextResponse.json(comments);
}

// POST: コメント投稿
export async function POST(req: NextRequest) {
  const { keyword, name, comment } = await req.json();
  if (!keyword || !comment) return NextResponse.json({ error: "missing fields" }, { status: 400 });

  const key = `comments:${keyword}`;
  const existing: { name: string; comment: string; date: string }[] = await kvGet(key);

  const newComment = {
    name: name?.trim() || "匿名",
    comment: comment.trim().slice(0, 200),
    date: new Date().toLocaleDateString("ja-JP"),
  };

  const updated = [newComment, ...existing].slice(0, 50); // 最大50件
  await kvSet(key, updated);

  return NextResponse.json({ ok: true });
}
