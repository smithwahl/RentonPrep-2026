import Link from "next/link";

import type { HeartAndMindSectionData } from "@/lib/cms/types";

export function HeartAndMindSection({
  eyebrow,
  heading,
  body,
  linkLabel,
  linkHref,
}: Omit<HeartAndMindSectionData, "type">) {
  return (
    <section
      className="section section--alt"
      aria-labelledby="heart-heading"
    >
      <div className="container">
        <div className="section-intro section-intro--center">
          <span className="eyebrow eyebrow--muted">{eyebrow}</span>
          <h2 id="heart-heading">{heading}</h2>
          <p style={{ maxWidth: "62ch", marginInline: "auto" }}>{body}</p>
          <p style={{ marginTop: "var(--space-3)" }}>
            <Link href={linkHref} className="faq-link">
              {linkLabel}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
