import type { Metadata } from "next";
import Achievements from "@/components/views/Achievements";

export const metadata: Metadata = { title: "Achievements" };

export default function Page() {
  return <Achievements />;
}
