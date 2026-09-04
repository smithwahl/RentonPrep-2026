import { MarketingLink } from "@/components/marketing/MarketingLink";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import type { AcademicsPageData } from "@/lib/cms/types";

export function AcademicsHubContent({
  heading,
  intro,
  primaryButton,
  secondaryButton,
  technologyHeading,
  technologyProse,
  technologyLinks,
  elementaryHeading,
  elementaryProse,
  elementaryButton,
}: Omit<AcademicsPageData, "type">) {
  return (
    <MarketingShell>
      <section className="section section--surface">
        <div className="container">
          <div className="hub-section">
            <h1>{heading}</h1>
            <p className="hub-intro">{intro}</p>
            <div className="btn-group">
              <MarketingLink href={primaryButton.href} className="btn btn-primary">
                {primaryButton.label}
              </MarketingLink>
              <MarketingLink href={secondaryButton.href} className="btn btn-secondary">
                {secondaryButton.label}
              </MarketingLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="technology">
        <div className="container">
          <div className="hub-section">
            <h2>{technologyHeading}</h2>
            <div className="hub-prose">
              {technologyProse.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <p>
                {technologyLinks.map((link, i) => (
                  <span key={link.label}>
                    {i > 0 ? " · " : null}
                    <MarketingLink href={link.href}>{link.label}</MarketingLink>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--surface" id="elementary">
        <div className="container">
          <div className="hub-section">
            <h2>{elementaryHeading}</h2>
            <div className="hub-prose">
              {elementaryProse.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <p>
                <MarketingLink href={elementaryButton.href} className="btn btn-secondary">
                  {elementaryButton.label}
                </MarketingLink>
              </p>
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
