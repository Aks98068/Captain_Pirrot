import type { Metadata } from "next";
import About from "@/components/views/About";

export const metadata: Metadata = { title: "About" };

export default function Page() {
  return <About />;
}
