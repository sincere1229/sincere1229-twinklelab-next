import RoomPage from "@/components/RoomPage";
import { chronoData } from "@/lib/roomData";

export const metadata = {
  title: "Chrono Room | Career TimeTravel",
  description: "キャリアナビゲーター・Chronoの研究室。転職・副業・AI活用診断",
};

export default function ChronoRoom() {
  return <RoomPage data={chronoData} />;
}
