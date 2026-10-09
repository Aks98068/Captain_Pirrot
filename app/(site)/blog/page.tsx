import type { Metadata } from "next";
import BlogIndex from "@/components/views/BlogIndex";

export const metadata: Metadata = { title: "Blog" };

export default function Page() {
  return <BlogIndex />;
}
