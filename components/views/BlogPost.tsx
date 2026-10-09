import Link from "@/components/Link";
import ArchiveGrid from "@/components/ArchiveGrid";
import RichText, { headingsOf } from "@/components/RichText";
import { fmtDate } from "@/lib/format";
import type { Post } from "@/lib/queries";

export default function BlogPost({ post, more }: { post: Post; more: Post[] }) {
  const toc = headingsOf(post.content);
  return (
    <main className="page detail-page">
      <div className="detail-crumb">
        <Link to="/blog">BLOG</Link>
        <span>/</span>
        <span>{post.category.toUpperCase()}</span>
      </div>
      <section className="detail-hero">
        <div>
          <span className="eyebrow">
            {post.category} · {fmtDate(post.publishedAt)}
          </span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="tag-row">
            {post.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
        <aside>
          <div>
            <span>AUTHOR</span>
            <b>{post.author ? <Link to={`/team/${post.author.slug}`}>{post.author.name}</Link> : "Captain Pirrot"}</b>
          </div>
          <div>
            <span>PUBLISHED</span>
            <b>{fmtDate(post.publishedAt)}</b>
          </div>
          <div>
            <span>READING TIME</span>
            <b>{post.readMinutes} MIN</b>
          </div>
        </aside>
      </section>
      <div className="detail-layout">
        <aside className="toc">
          <span className="eyebrow">ON THIS PAGE</span>
          {toc.map((h, i) => (
            <a href={`#${h.id}`} key={h.id}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {h.text}
            </a>
          ))}
        </aside>
        <article className="article post-body">
          <RichText content={post.content} />
        </article>
      </div>
      {more.length > 0 && (
        <section className="related section">
          <div className="section-title">
            <div>
              <span className="eyebrow">KEEP READING</span>
              <h2>More from the blog.</h2>
            </div>
          </div>
          <ArchiveGrid
            items={more.map((p) => ({
              title: p.title,
              slug: p.slug,
              category: p.category,
              description: p.excerpt,
              meta: fmtDate(p.publishedAt),
              tags: p.tags,
            }))}
            base="blog"
          />
        </section>
      )}
    </main>
  );
}
