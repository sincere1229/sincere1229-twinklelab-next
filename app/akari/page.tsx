import RoomPage from "@/components/RoomPage";
import { akariData } from "@/lib/roomData";

export const metadata = {
  title: "あかり Room | やさしい介護ナビ",
  description: "介護サポーター・あかりの相談室。介護保険・施設探し・在宅介護",
};

export default function AkariRoom() {
  return <RoomPage data={akariData} />;
}
