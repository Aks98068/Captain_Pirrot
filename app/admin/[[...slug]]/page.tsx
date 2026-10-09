import type { Metadata } from "next";
import Admin from "@/components/views/Admin";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Admin />;
}
