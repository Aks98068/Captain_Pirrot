import { type ReactNode } from "react";

export default function PageHeader({
  index = "01",
  label,
  title,
  intro,
  aside,
}: {
  index?: string;
  label: string;
  title: string;
  intro: string;
  aside?: ReactNode;
}) {
  return (
    <section className="page-head">
      <div className="head-index">
        {index} / {label}
      </div>
      <div>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      {aside && <aside>{aside}</aside>}
    </section>
  );
}
