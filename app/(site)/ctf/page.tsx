import type { Metadata } from "next";
import CTF from "@/components/views/CTF";

export const metadata: Metadata = { title: "CTF" };

export default function Page() {
  return <CTF />;
}
