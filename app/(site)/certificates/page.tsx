import type { Metadata } from "next";
import Certificates from "@/components/views/Certificates";

export const metadata: Metadata = { title: "Certificates" };

export default function Page() {
  return <Certificates />;
}
