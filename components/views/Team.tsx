import PageHeader from "@/components/PageHeader";
import TeamCard from "@/components/TeamCard";
import { getTeam } from "@/lib/queries";

export default async function Team() {
  const team = await getTeam();
  return (
    <main className="page">
      <PageHeader
        label="THE COLLECTIVE"
        title="Independent minds. Shared standards."
        intro="A small, multidisciplinary group of researchers and engineers, collaborating around evidence, responsibility, and useful public work."
        aside={
          <div className="archive-count">
            <strong>{String(team.length).padStart(2, "0")}</strong>
            <span>MEMBERS</span>
          </div>
        }
      />
      <section className="team-grid">
        {team.map((m) => (
          <TeamCard m={m} key={m.slug} />
        ))}
      </section>
    </main>
  );
}
