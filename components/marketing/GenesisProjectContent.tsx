import { MarketingLink } from "@/components/marketing/MarketingLink";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import type { GenesisPageData, ProseBlock } from "@/lib/cms/types";

function ProseBlocks({ blocks }: { blocks: ProseBlock[] }) {
  return (
    <>
      {blocks.map((block, i) =>
        block.kind === "p" ? (
          <div className="hub-prose" key={i}>
            <p>{block.text}</p>
          </div>
        ) : (
          <ul className="genesis-highlights" key={i}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ),
      )}
    </>
  );
}

export function GenesisProjectContent({
  eyebrow,
  heading,
  intro,
  heroProse,
  blocks,
  visitHeading,
  visitProse,
  ctaPrimary,
  ctaSecondary,
}: Omit<GenesisPageData, "type">) {
  return (
    <MarketingShell>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="section section--surface" aria-labelledby="gp-heading">
        <div className="container">
          <div className="hub-section">
            <span className="eyebrow eyebrow--muted">{eyebrow}</span>
            <h1 id="gp-heading">{heading}</h1>
            <p className="hub-intro">{intro}</p>
            <div className="hub-prose" style={{ marginTop: "var(--space-4)" }}>
              {heroProse.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {blocks.map((block, i) => (
        <section
          className={`section section--${i % 2 === 0 ? "alt" : "surface"}`}
          aria-labelledby={`gp-${block.id}-heading`}
          key={block.id}
        >
          <div className="container">
            <div className="hub-section">
              <h2 id={`gp-${block.id}-heading`}>{block.heading}</h2>
              <ProseBlocks blocks={block.content} />
            </div>
          </div>
        </section>
      ))}

      {/* ── Visit CTA ────────────────────────────────────────────────── */}
      <section className="section section--alt" aria-labelledby="gp-visit-heading">
        <div className="container">
          <div className="hub-section">
            <h2 id="gp-visit-heading">{visitHeading}</h2>
            <div className="hub-prose">
              {visitProse.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="btn-group" style={{ marginTop: "var(--space-5)" }}>
              <MarketingLink href={ctaPrimary.href} className="btn btn-primary">
                {ctaPrimary.label}
              </MarketingLink>
              <MarketingLink href={ctaSecondary.href} className="btn btn-secondary">
                {ctaSecondary.label}
              </MarketingLink>
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
