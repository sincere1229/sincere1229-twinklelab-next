import type { Metadata } from "next";
import PrivacyPage from "./PrivacyPage";

export const metadata: Metadata = {
  title: "プライバシーポリシー｜Twinkle Lab",
  description: "Twinkle Labのプライバシーポリシーです。個人情報の取り扱い、Googleアドセンス・アナリティクスのCookie利用、Amazonアソシエイトについて説明しています。",
};

export default function Page() {
  return <PrivacyPage />;
}
