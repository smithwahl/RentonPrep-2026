import type { ResearchGridSectionData } from "@/lib/cms/types";

export function ResearchSection({
  eyebrow,
  heading,
  intro,
  cards,
}: Omit<ResearchGridSectionData, "type">) {
  return (
    <section
      className="section section--surface"
      id="research"
      aria-labelledby="research-heading"
    >
      <div className="container">
        <div className="section-intro">
          <span className="eyebrow eyebrow--muted">{eyebrow}</span>
          <h2 id="research-heading">{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="research-grid">
          {cards.map((c) => (
            <div key={c.title} className="research-card">
              <div
                className="research-card-accent"
                aria-hidden="true"
                style={{ background: c.accent }}
              />
              <div className="research-card-body">
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
