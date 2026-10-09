import type { Metadata } from "next";
import Resume from "@/components/views/Resume";

export const metadata: Metadata = { title: "Resume" };

export default function Page() {
  return <Resume />;
}
