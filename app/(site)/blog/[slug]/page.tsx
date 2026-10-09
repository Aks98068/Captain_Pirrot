import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPost from "@/components/views/BlogPost";
import { getPost, getPosts } from "@/lib/queries";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = await getPost((await params).slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getPost(slug), getPosts()]);
  if (!post) notFound();
  return <BlogPost post={post} more={all.filter((p) => p.slug !== slug).slice(0, 3)} />;
}
