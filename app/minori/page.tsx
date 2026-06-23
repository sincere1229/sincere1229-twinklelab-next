import RoomPage from "@/components/RoomPage";
import { minoriData } from "@/lib/roomData";

export const metadata = {
  title: "みのり Room | 実家どうするナビ",
  description: "暮らしと実家の相談室・みのりのページ。実家問題・引越し・相続サポート",
};

export default function MinoriRoom() {
  return <RoomPage data={minoriData} />;
}
