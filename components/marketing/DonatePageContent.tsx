import Link from "next/link";

import { MarketingLink } from "@/components/marketing/MarketingLink";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import type { DonatePageData } from "@/lib/cms/types";

/** Donate — factual contact path only; no donation platform invented. */
export function DonatePageContent({
  eyebrow,
  heading,
  body,
  phoneButton,
  ctaButton,
}: Omit<DonatePageData, "type">) {
  return (
    <MarketingShell>
      <section className="section section--surface" aria-labelledby="donate-h1">
        <div className="container">
          <div className="section-intro section-intro--center">
            <span className="eyebrow eyebrow--muted">{eyebrow}</span>
            <h1 id="donate-h1">{heading}</h1>
            <p style={{ maxWidth: "52ch", margin: "0 auto" }}>{body}</p>
            <div
              className="btn-group"
              style={{ justifyContent: "center", marginTop: "var(--space-4)" }}
            >
              <MarketingLink href={phoneButton.href} className="btn btn-secondary">
                {phoneButton.label}
              </MarketingLink>
              <MarketingLink href={ctaButton.href} className="btn btn-primary">
                {ctaButton.label}
              </MarketingLink>
            </div>
            <p style={{ marginTop: "var(--space-4)" }}>
              <Link href="/" className="faq-link">
                Back to home
              </Link>
            </p>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
