import RoomPage from "@/components/RoomPage";
import { wakaData } from "@/lib/roomData";

export const metadata = {
  title: "和花 Room | Twinkle Lab",
  description: "日本文化ナビゲーター・和花の和室。百人一首・神社図鑑・日本文化",
};

export default function WakaRoom() {
  return <RoomPage data={wakaData} />;
}
