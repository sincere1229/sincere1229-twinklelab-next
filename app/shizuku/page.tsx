import RoomPage from "@/components/RoomPage";
import { shizukuData } from "@/lib/roomData";

export const metadata = {
  title: "しずく Room | やさしい葬儀ナビ",
  description: "終活・葬儀サポーター・しずくの書斎。終活ガイド・エンディングノート",
};

export default function ShizukuRoom() {
  return <RoomPage data={shizukuData} />;
}
