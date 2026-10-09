import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DetailPage from "@/components/views/DetailPage";
import GenericInfo from "@/components/views/GenericInfo";
import { data } from "@/lib/data";

// blog detail pages are database-driven: app/(site)/blog/[slug]
const detailTypes = ["research", "projects", "writeups", "resources"];

export function generateStaticParams() {
  return detailTypes.flatMap((section) =>
    data[section].map((item) => ({ section, slug: item.slug })),
  );
}

type Params = Promise<{ section: string; slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { section, slug } = await params;
  const item = data[section]?.find((x) => x.slug === slug);
  return item ? { title: item.title, description: item.description } : {};
}

export default async function Page({ params }: { params: Params }) {
  const { section, slug } = await params;
  if (detailTypes.includes(section)) {
    if (!data[section].some((x) => x.slug === slug)) notFound();
    return <DetailPage type={section} slug={slug} />;
  }
  return <GenericInfo kind="resource-detail" />;
}
