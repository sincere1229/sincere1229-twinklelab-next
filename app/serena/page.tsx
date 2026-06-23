import RoomPage from "@/components/RoomPage";
import { serenaData } from "@/lib/roomData";

export const metadata = {
  title: "Serena Room | Twinkle Lab",
  description: "心を整えるヒーリングガイド・Serenaの部屋。オーラ診断・ヒーリング音楽・パワーストーン診断",
};

export default function SerenaRoom() {
  return <RoomPage data={serenaData} />;
}
