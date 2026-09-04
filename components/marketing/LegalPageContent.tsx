import Link from "next/link";

import { MarketingLink } from "@/components/marketing/MarketingLink";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import type { LegalPageData } from "@/lib/cms/types";

/** Legal / privacy — contact routing only; no policy text invented. */
export function LegalPageContent({
  eyebrow,
  heading,
  identityLines,
  body,
  phoneButton,
  ctaButton,
}: Omit<LegalPageData, "type">) {
  return (
    <MarketingShell>
      <section className="section section--surface" aria-labelledby="legal-h1">
        <div className="container">
          <div className="section-intro section-intro--center">
            <span className="eyebrow eyebrow--muted">{eyebrow}</span>
            <h1 id="legal-h1">{heading}</h1>
            <p style={{ maxWidth: "52ch", margin: "0 auto" }}>
              {identityLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < identityLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
            <p
              style={{
                maxWidth: "52ch",
                margin: "var(--space-4) auto 0",
                color: "var(--color-text-muted)",
              }}
            >
              {body}
            </p>
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
