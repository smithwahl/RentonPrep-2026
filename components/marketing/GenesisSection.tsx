import Link from "next/link";

import type { GenesisTeaserSectionData } from "@/lib/cms/types";

export function GenesisSection({
  eyebrow,
  heading,
  description,
  items,
  ctaLabel,
  ctaHref,
}: Omit<GenesisTeaserSectionData, "type">) {
  return (
    <section
      className="section section--alt"
      id="genesis"
      aria-labelledby="genesis-heading"
    >
      <div className="container">
        <div className="genesis-layout">
          <div className="genesis-content">
            <span className="eyebrow eyebrow--muted">{eyebrow}</span>
            <h2 id="genesis-heading">
              {heading.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "17px",
                lineHeight: 1.65,
                marginTop: "var(--space-2)",
              }}
            >
              {description}
            </p>
            <div className="genesis-list">
              {items.map((item, i) => (
                <div className="genesis-item" key={item.title}>
                  <div className="genesis-item-num" aria-hidden="true">
                    {i + 1}
                  </div>
                  <div className="genesis-item-body">
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "var(--space-5)" }}>
              <Link href={ctaHref} className="btn btn-secondary">
                {ctaLabel}
              </Link>
            </div>
          </div>
          <div
            className="genesis-visual"
            aria-label="Genesis Project interactive illustration"
          >
            <div className="genesis-terminal">
              <div className="genesis-terminal-bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <pre style={{ overflowX: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                <span className="t-green">Student:</span> Is this AI answer
                correct?
                {"\n\n"}
                <span className="t-blue">Genesis Guide:</span> Great
                question. Let&apos;s{"\n"}check three things together:
                {"\n\n"}
                <span className="t-gold">→</span> Where did this claim come
                from?{"\n"}
                <span className="t-gold">→</span> Does it match what we already
                know?{"\n"}
                <span className="t-gold">→</span> What would happen if it&apos;s
                wrong?
                {"\n\n"}
                <span className="t-green">Student:</span> Oh, I think I can
                verify this{"\n"}in our science book.
                {"\n\n"}
                <span className="t-blue">Genesis Guide:</span> Exactly.
                You&apos;re leading{"\n"}the tool. The tool doesn&apos;t lead you.
              </pre>
            </div>
            <p className="genesis-visual-label">
              Simulated Genesis Project exchange · Grade 3 scenario
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
