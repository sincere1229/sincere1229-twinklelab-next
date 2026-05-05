import type { Metadata } from "next";
import StudyNaviPage from "./StudyNaviPage";

export const metadata: Metadata = {
  title: "勉強ナビ｜資格・スキルアップのおすすめ本をAIが紹介",
  description:
    "社会人・サラリーマン向け。士業・IT・会計・ビジネス・医療福祉・副業・AI活用など、学びたい資格や分野を入力するとAIがAmazonリンク付きでおすすめ本を紹介します。",
  keywords: [
    "資格", "勉強", "おすすめ本", "社会人", "スキルアップ",
    "IT", "会計", "士業", "副業", "AI活用", "ビジネス", "医療福祉"
  ],
  openGraph: {
    title: "勉強ナビ｜AIがあなたの学びをナビします",
    description:
      "学びたい資格・分野を入力するだけ。AIがおすすめ本をAmazonリンク付きで紹介します。",
    url: "https://www.twinkle-lab.jp/study",
    siteName: "Twinkle Lab",
    type: "website",
  },
};

export default function Page() {
  return <StudyNaviPage />;
}
