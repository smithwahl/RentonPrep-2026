import Link from "next/link";

import type { WhyChooseSectionData } from "@/lib/cms/types";

export function WhyChooseSection({
  eyebrow,
  heading,
  intro,
  items,
  ctaLabel,
  ctaHref,
}: Omit<WhyChooseSectionData, "type">) {
  return (
    <section className="section section--surface" aria-labelledby="choose-heading">
      <div className="container">
        <div className="section-intro section-intro--center">
          <span className="eyebrow eyebrow--muted">{eyebrow}</span>
          <h2 id="choose-heading">{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul
          style={{
            maxWidth: "640px",
            margin: "0 auto var(--space-6)",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
          }}
        >
          {items.map((item) => (
            <li
              key={item}
              style={{
                fontSize: "16px",
                lineHeight: 1.55,
                color: "var(--color-text-muted)",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
        <div style={{ textAlign: "center" }}>
          <Link href={ctaHref} className="btn btn-secondary">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
