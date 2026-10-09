import type { Metadata } from "next";
import Security from "@/components/views/Security";

export const metadata: Metadata = { title: "Security & Disclosure" };

export default function Page() {
  return <Security />;
}
