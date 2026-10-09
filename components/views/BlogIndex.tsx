import PageHeader from "@/components/PageHeader";
import BlogList from "@/components/BlogList";
import { fmtDate } from "@/lib/format";
import { pageConfig } from "@/lib/data";
import { getPosts } from "@/lib/queries";

export default async function BlogIndex() {
  const c = pageConfig.blog;
  const posts = await getPosts();
  return (
    <main className="page">
      <PageHeader
        index={c.index}
        label={c.label}
        title={c.title}
        intro={c.intro}
        aside={
          <div className="archive-count">
            <strong>{String(posts.length).padStart(2, "0")}</strong>
            <span>PUBLISHED POSTS</span>
          </div>
        }
      />
      <BlogList
        items={posts.map((p) => ({
          title: p.title,
          slug: p.slug,
          category: p.category,
          description: p.excerpt,
          meta: `${fmtDate(p.publishedAt)} · ${p.readMinutes} MIN`,
          tags: p.tags,
          date: p.publishedAt,
        }))}
      />
    </main>
  );
}
