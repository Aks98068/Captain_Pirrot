import type { Metadata } from "next";
import Github from "@/components/views/Github";

export const metadata: Metadata = { title: "GitHub" };

export default function Page() {
  return <Github />;
}
