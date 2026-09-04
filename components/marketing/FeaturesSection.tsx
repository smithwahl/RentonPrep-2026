import type { FeatureGridSectionData } from "@/lib/cms/types";

export function FeaturesSection({
  eyebrow,
  heading,
  intro,
  items,
}: Omit<FeatureGridSectionData, "type">) {
  return (
    <section className="section section--surface" aria-labelledby="why-heading">
      <div className="container">
        <div className="section-intro">
          <span className="eyebrow eyebrow--muted">{eyebrow}</span>
          <h2 id="why-heading">{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="features-grid">
          {items.map((item) => (
            <div key={item.title} className="feature-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
