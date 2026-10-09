import { Fragment, type ReactNode } from "react";
import { slugify } from "@/lib/format";

/** Headings found in a post body — used for the table of contents. */
export function headingsOf(content: string): { text: string; id: string }[] {
  return content
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => ({ text: l.slice(3).trim(), id: slugify(l.slice(3)) }));
}

function inline(text: string): ReactNode {
  // **bold** and `code`
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Tiny, dependency-free renderer for the light markdown stored in blog_posts.content. React escapes all text. */
export default function RichText({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
    } else if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || "code";
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++;
      out.push(
        <section className="code-block" key={key++}>
          <div>
            <span>{lang}</span>
          </div>
          <pre>
            <code>{code.join("\n")}</code>
          </pre>
        </section>,
      );
    } else if (line.startsWith("## ")) {
      out.push(
        <h2 id={slugify(line.slice(3))} key={key++}>
          {line.slice(3).trim()}
        </h2>,
      );
      i++;
    } else if (line.startsWith("> ")) {
      const q: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) q.push(lines[i++].slice(2));
      out.push(<blockquote key={key++}>{inline(q.join(" "))}</blockquote>);
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) items.push(lines[i++].slice(2));
      out.push(
        <ul className="post-list" key={key++}>
          {items.map((t, n) => (
            <li key={n}>{inline(t)}</li>
          ))}
        </ul>,
      );
    } else {
      const p: string[] = [];
      while (i < lines.length && lines[i].trim() && !/^(```|## |> |- )/.test(lines[i])) p.push(lines[i++]);
      out.push(<p key={key++}>{inline(p.join(" "))}</p>);
    }
  }
  return <>{out}</>;
}
