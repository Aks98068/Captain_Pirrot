import type { Metadata } from "next";
import ArchivePage from "@/components/views/ArchivePage";
import GenericInfo from "@/components/views/GenericInfo";
import Security from "@/components/views/Security";
import { pageConfig } from "@/lib/data";

const securityAliases = [
  "security-policy",
  "responsible-disclosure",
  "security.txt",
];

export function generateStaticParams() {
  // "blog" has its own database-driven route at app/(site)/blog
  return Object.keys(pageConfig)
    .filter((section) => section !== "blog")
    .map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  if (!pageConfig[section]) return {};
  return { title: section.charAt(0).toUpperCase() + section.slice(1) };
}

export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (pageConfig[section]) return <ArchivePage type={section} />;
  if (securityAliases.includes(section)) return <Security />;
  // Same as the Figma prototype: any other nav link (e.g. /web-security, /osint) shows a generic resource page.
  return <GenericInfo kind="resource-detail" />;
}
