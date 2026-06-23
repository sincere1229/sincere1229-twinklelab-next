import RoomPage from "@/components/RoomPage";
import { manaData } from "@/lib/roomData";

export const metadata = {
  title: "まな先生 Room | Twinkle Lab",
  description: "学びのサポーター・まな先生の図書室。九九・100マス計算・日本語学習",
};

export default function ManaRoom() {
  return <RoomPage data={manaData} />;
}
