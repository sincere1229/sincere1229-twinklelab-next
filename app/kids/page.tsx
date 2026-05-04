// app/kids/page.tsx
import type { Metadata } from "next";
import KidsPage from "./KidsPage";

export const metadata: Metadata = {
  title: "Twinkle Kids 学習ナビ｜小学生のつまずき別ドリル検索",
  description:
    "「小1 くりあがり」「小1 ひらがな」「小3 漢字」など、つまずきやすい単元から小学生に合ったドリルをナビします。勉強タイプ診断や学習コラムも掲載。",
  openGraph: {
    title: "Twinkle Kids 学習ナビ｜小学生のつまずき別ドリル検索",
    description:
      "くりあがり・くりさがり、ひらがな、九九、漢字など、小学生の『今ここでつまずいている』に合わせて市販ドリルをナビするページです。",
    url: "https://www.twinkle-lab.jp/kids",
    siteName: "Twinkle Lab",
    type: "website",
  },
};

export default function Page() {
  return <KidsPage />;
}
