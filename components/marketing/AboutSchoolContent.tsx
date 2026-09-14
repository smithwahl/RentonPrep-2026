import { MarketingLink } from "@/components/marketing/MarketingLink";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import type { AboutPageData } from "@/lib/cms/types";

export function AboutSchoolContent({
  eyebrow,
  heading,
  lead,
  introProse,
  evolvedHeading,
  evolvedProse,
  todayHeading,
  todayProse,
  momentsHeading,
  milestones,
  continuingHeading,
  continuingProse,
  ctas,
}: Omit<AboutPageData, "type">) {
  return (
    <MarketingShell>
      <section
        className="section section--surface"
        aria-labelledby="about-heading"
      >
        <div className="container">
          <div className="section-intro section-intro--center">
            <span className="eyebrow eyebrow--muted">{eyebrow}</span>
            <h1 id="about-heading">{heading}</h1>
            <p className="about-lead">{lead}</p>
          </div>
          <div className="about-prose">
            {introProse.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section--alt"
        aria-labelledby="evolved-heading"
      >
        <div className="container">
          <div className="section-intro">
            <h2 id="evolved-heading">{evolvedHeading}</h2>
          </div>
          <div className="about-prose">
            {evolvedProse.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section--surface"
        aria-labelledby="today-heading"
      >
        <div className="container">
          <div className="section-intro">
            <h2 id="today-heading">{todayHeading}</h2>
          </div>
          <div className="about-prose">
            {todayProse.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section
        id="moments"
        className="section section--alt"
        aria-labelledby="moments-heading"
      >
        <div className="container">
          <div className="section-intro">
            <h2 id="moments-heading">{momentsHeading}</h2>
          </div>
          <ul className="history-timeline">
            {milestones.map((m, i) => (
              <li key={i}>
                <span className="history-timeline-year">{m.year}</span>
                <span className="history-timeline-text">{m.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="section section--surface"
        aria-labelledby="continuing-heading"
      >
        <div className="container">
          <div className="section-intro">
            <h2 id="continuing-heading">{continuingHeading}</h2>
          </div>
          <div className="about-prose">
            {continuingProse.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="about-page-ctas">
            {ctas.map((cta, i) => (
              <MarketingLink
                key={cta.label}
                href={cta.href}
                className={i === ctas.length - 1 ? "btn btn-primary" : "btn btn-secondary"}
              >
                {cta.label}
              </MarketingLink>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
