import type { Metadata } from "next";
import type { ReactNode } from "react";
import SearchProvider from "@/components/SearchProvider";
import SplashScreen from "@/components/SplashScreen";
import type { SearchItem } from "@/components/CommandPalette";
import { data } from "@/lib/data";
import { getPosts, getTeam } from "@/lib/queries";
import "./globals.css";

// Content comes from the database, so render on every request instead of freezing it at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Captain Pirrot — Independent Cybersecurity Research",
    template: "%s — Captain Pirrot",
  },
  description:
    "A professional platform for cybersecurity research, offering resources, project showcases, technical writeups, and community engagement for researchers and developers.",
  // The Figma Make site config ships with robots.index = false. Remove this line when you go live.
  robots: { index: false, follow: false },
};

// Hides the splash before first paint when it was already shown in this browser session.
const splashGuard = `try{if(sessionStorage.getItem("cp-splash")==="1")document.documentElement.classList.add("splash-seen")}catch(e){}`;

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [posts, team] = await Promise.all([getPosts(), getTeam()]);
  const items: SearchItem[] = [
    ...(["research", "projects", "writeups", "resources"] as const).flatMap((type) =>
      data[type].map((x) => ({ type, slug: x.slug, title: x.title, category: x.category })),
    ),
    ...posts.map((p) => ({ type: "blog", slug: p.slug, title: p.title, category: p.category })),
    ...team.map((m) => ({ type: "team", slug: m.slug, title: m.name, category: m.role })),
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashGuard }} />
        <noscript>
          <style>{".splash{display:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <SplashScreen />
        <SearchProvider items={items}>{children}</SearchProvider>
      </body>
    </html>
  );
}
