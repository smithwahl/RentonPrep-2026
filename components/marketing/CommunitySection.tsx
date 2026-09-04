import Image from "next/image";

import { MarketingLink } from "@/components/marketing/MarketingLink";
import type { CommunitySectionData } from "@/lib/cms/types";

/**
 * CMS-driven photo list — no more fs.existsSync file-gate. The old version
 * silently rendered nothing whenever an asset filename drifted from the hardcoded
 * list (see CMS-MIGRATION-PLAN.md §12/§20); a CMS-managed list can't drift that way
 * since editors pick real uploaded assets.
 */
export function CommunitySection({
  eyebrow,
  heading,
  intro,
  photos,
  ctaLabel,
  ctaHref,
}: Omit<CommunitySectionData, "type">) {
  if (photos.length === 0) return null;

  return (
    <section
      className="section section--surface"
      id="community"
      aria-labelledby="community-heading"
    >
      <div className="container">
        <div className="section-intro section-intro--center">
          <span className="eyebrow eyebrow--muted">{eyebrow}</span>
          <h2 id="community-heading">{heading}</h2>
          <p>{intro}</p>
        </div>

        <div className="community-grid" role="group" aria-label="Community photo grid">
          {photos.map((photo, i) => (
            <div key={i} className="community-cell">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 520px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: photo.position }}
              />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "var(--space-4)" }}>
          <MarketingLink href={ctaHref} className="btn btn-secondary">
            {ctaLabel}
          </MarketingLink>
        </div>
      </div>
    </section>
  );
}
