import type { Metadata } from "next";
import SukiNaviPage from "./SukiNaviPage";

export const metadata: Metadata = {
  title: "好きナビ｜この作家・アーティストが好きなら次はこれ！",
  description:
    "村上春樹・東野圭吾・YOASOBI・米津玄師など、好きな作家やアーティストを入力すると、AIが似ている次のおすすめをナビします。年代別カルチャーコラムも掲載。",
  openGraph: {
    title: "好きナビ｜次世代に伝えたい本と音楽",
    description:
      "好きな作家・アーティストを入力するだけで、AIが似ているおすすめをナビします。",
    url: "https://www.twinkle-lab.jp/sukinavi",
    siteName: "Twinkle Lab",
    type: "website",
  },
};

export default function Page() {
  return <SukiNaviPage />;
}
