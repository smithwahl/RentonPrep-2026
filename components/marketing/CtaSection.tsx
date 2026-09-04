import { MarketingLink } from "@/components/marketing/MarketingLink";
import type { CtaSectionData } from "@/lib/cms/types";

export function CtaSection({
  heading,
  body,
  primaryButton,
  secondaryButton,
  microcopy,
  options,
}: Omit<CtaSectionData, "type">) {
  return (
    <section
      className="section section--surface"
      id="next-steps"
      aria-labelledby="cta-heading"
    >
      <div className="container">
        <div className="cta-block">
          <div>
            <h2 id="cta-heading">{heading}</h2>
            <p>{body}</p>
          </div>
          <div className="cta-actions">
            <MarketingLink href={primaryButton.href} className="btn btn-ghost-white">
              {primaryButton.label}
            </MarketingLink>
            <MarketingLink href={secondaryButton.href} className="btn btn-ghost-white">
              {secondaryButton.label}
            </MarketingLink>
          </div>
          <p className="cta-microcopy cta-microcopy--light">{microcopy}</p>
        </div>

        <div className="cta-options" style={{ marginTop: "var(--space-6)" }}>
          {options.map((option) => (
            <div className="cta-option" key={option.title}>
              <h4>{option.title}</h4>
              <p>{option.body}</p>
              <MarketingLink
                href={option.buttonHref}
                className="btn btn-secondary"
                style={{ marginTop: "var(--space-3)" }}
              >
                {option.buttonLabel}
              </MarketingLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
