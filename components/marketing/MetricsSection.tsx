import Image from "next/image";

import type { MetricsSectionData } from "@/lib/cms/types";

export function MetricsSection({
  eyebrow,
  heading,
  body,
  points,
  badges,
}: Omit<MetricsSectionData, "type">) {
  return (
    <section
      className="section section--surface"
      aria-labelledby="recognition-heading"
    >
      <div className="container">
        <div className="recognition">
          <div className="recognition-content">
            <span className="eyebrow eyebrow--muted">{eyebrow}</span>
            <h2 id="recognition-heading">{heading}</h2>
            <p className="recognition-body">{body}</p>
            <ul className="recognition-points" role="list">
              {points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div
            className="recognition-badges"
            role="list"
            aria-label="Accreditation badges"
          >
            {badges.map((badge) => (
              <div className="recognition-badge" role="listitem" key={badge.label}>
                <div className="recognition-badge-img">
                  <Image
                    src={badge.image}
                    alt={badge.alt}
                    width={badge.width}
                    height={badge.height}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <span className="recognition-badge-label">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
