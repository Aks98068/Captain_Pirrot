import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MemberGithub from "@/components/views/MemberGithub";
import { getMember, getTeam } from "@/lib/queries";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const m = await getMember((await params).slug);
  return m ? { title: `${m.name} · GitHub` } : {};
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const [m, team] = await Promise.all([getMember(slug), getTeam()]);
  if (!m) notFound();
  return <MemberGithub m={m} team={team} />;
}
