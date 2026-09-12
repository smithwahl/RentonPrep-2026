import { MarketingLink } from "@/components/marketing/MarketingLink";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import type { AwardsPageData } from "@/lib/cms/types";

/**
 * Awards / recognition page — only repeats claims already used on the public site
 * (home, metrics, settings). No new awards or statistics.
 */
export function AwardsPageContent({
  eyebrow,
  heading,
  intro,
  items,
  buttons,
}: Omit<AwardsPageData, "type">) {
  return (
    <MarketingShell>
      <section
        className="section section--surface"
        aria-labelledby="awards-heading"
      >
        <div className="container">
          <div className="section-intro section-intro--center">
            <span className="eyebrow eyebrow--muted">{eyebrow}</span>
            <h1 id="awards-heading">{heading}</h1>
            <p style={{ maxWidth: "52ch", margin: "0 auto" }}>{intro}</p>
          </div>
          <ul
            style={{
              maxWidth: "640px",
              margin: "0 auto var(--space-6)",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
              listStyle: "none",
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
          <div
            className="btn-group"
            style={{ justifyContent: "center", flexWrap: "wrap" }}
          >
            {buttons.map((button, i) => (
              <MarketingLink
                key={button.label}
                href={button.href}
                className={i === buttons.length - 1 ? "btn btn-primary" : "btn btn-secondary"}
              >
                {button.label}
              </MarketingLink>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
