import Link from "next/link";

import type { MissionSectionData } from "@/lib/cms/types";

/**
 * The C.H.R.I.S.T. tooltip in the Action card is bespoke inline markup (an <abbr>
 * with a title), not editorial copy — kept fixed here rather than forced into CMS
 * rich text for one acronym. See TODO in the original component history: owner
 * still needs to supply the full expansion for a future tooltip/anchor.
 */
function actionExtra() {
  return (
    <>
      Guided by Christ&apos;s life and ministry and expressed through our{" "}
      <abbr className="mva-christ-acronym" title="C.H.R.I.S.T. core values">
        C.H.R.I.S.T.
      </abbr>{" "}
      core values, we shape both thinking skills and adaptability so learners and
      collaborators, from children to adults, can refine ideas, apply learning, and
      contribute meaningfully to their communities and world.
    </>
  );
}

export function MissionSection({
  eyebrow,
  heading,
  intro,
  aboutHref,
  cards,
}: Omit<MissionSectionData, "type">) {
  return (
    <section
      className="section section--alt"
      id="mission"
      aria-labelledby="mission-heading"
    >
      <div className="container">
        <div className="section-intro section-intro--center">
          <span className="eyebrow eyebrow--muted">{eyebrow}</span>
          <h2 id="mission-heading">{heading}</h2>
          <p>{intro}</p>
          <p style={{ marginTop: "var(--space-2)" }}>
            <Link href={aboutHref} className="faq-link">
              Read how the school grew from the Renton community
            </Link>
          </p>
        </div>
        <div className="mva-grid">
          {cards.map((card, i) => (
            <div className="mva-card" key={card.title}>
              <div className="mva-card-number">{card.number}</div>
              <h3>{card.title}</h3>
              <p>{card.summary}</p>
              {i === cards.length - 1 ? (
                <>
                  <p className="mva-card-prose">{card.prose[0]}</p>
                  <p className="mva-card-prose">{actionExtra()}</p>
                  {card.prose.slice(1).map((paragraph, j) => (
                    <p className="mva-card-prose" key={j}>
                      {paragraph}
                    </p>
                  ))}
                </>
              ) : (
                card.prose.map((paragraph, j) => (
                  <p className="mva-card-prose" key={j}>
                    {paragraph}
                  </p>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
