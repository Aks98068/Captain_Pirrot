import PageHeader from "@/components/PageHeader";
import FilterBar from "@/components/FilterBar";
import ArchiveGrid from "@/components/ArchiveGrid";
import { data, pageConfig } from "@/lib/data";

export default function ArchivePage({ type }: { type: string }) {
  const c = pageConfig[type];
  return (
    <main className="page">
      <PageHeader
        index={c.index}
        label={c.label}
        title={c.title}
        intro={c.intro}
        aside={
          <div className="archive-count">
            <strong>{String(data[c.dataKey!].length).padStart(2, "0")}</strong>
            <span>INDEXED ENTRIES</span>
          </div>
        }
      />
      <FilterBar types={c.filters} />
      <section className="archive-wrap">
        <ArchiveGrid
          items={data[c.dataKey!]}
          base={type}
          variant={type === "writeups" || type === "blog" ? "list" : "cards"}
        />
      </section>
    </main>
  );
}
