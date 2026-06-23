import RoomPage from "@/components/RoomPage";
import { luminaData } from "@/lib/roomData";

export const metadata = {
  title: "Lumina Room | Twinkle Star Oracle",
  description: "星詠みの案内人・Luminaの部屋。タロット・才能診断・AI総合鑑定",
};

export default function LuminaRoom() {
  return <RoomPage data={luminaData} />;
}
