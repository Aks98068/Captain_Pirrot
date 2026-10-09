import type { Metadata } from "next";
import Contact from "@/components/views/Contact";

export const metadata: Metadata = { title: "Contact" };

export default function Page() {
  return <Contact />;
}
