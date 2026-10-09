import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MemberProfile from "@/components/views/MemberProfile";
import { getMember, getPosts } from "@/lib/queries";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const m = await getMember((await params).slug);
  return m ? { title: m.name, description: m.bio } : {};
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const [m, posts] = await Promise.all([getMember(slug), getPosts()]);
  if (!m) notFound();
  return <MemberProfile m={m} posts={posts} />;
}
