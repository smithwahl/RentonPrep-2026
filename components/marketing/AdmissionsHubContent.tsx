import { MarketingLink } from "@/components/marketing/MarketingLink";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import type { AdmissionsPageData } from "@/lib/cms/types";

export function AdmissionsHubContent({
  heading,
  intro,
  enrollHeading,
  enrollSteps,
  enrollMicrocopy,
  primaryButton,
  secondaryButton,
  noCommitmentMicrocopy,
  howToApplyHeading,
  howToApplyIntro,
  applySteps,
  applyPrimaryButton,
  applySecondaryButton,
  stillHaveQuestions,
  signatureName,
  tuitionHeading,
  tuitionSubheading,
  tuitionIntro,
  schoolYear,
  programs,
  tuitionFootnote,
  financialAidHeading,
  financialAidSubheading,
  financialAidProse,
  uniformsHeading,
  uniformsSubheading,
  uniformGroups,
  uniformRule,
  extendedCareHeading,
  extendedCareSubheading,
  hoursBefore,
  hoursAfter,
  extendedCareRate,
  extendedCareContactPhone,
  extendedCareContactTel,
  extendedCareProse,
  whatToExpectHeading,
  whatToExpectProse,
}: Omit<AdmissionsPageData, "type">) {
  return (
    <MarketingShell>
      {/* ── Hero / CTA ─────────────────────────────────────────────── */}
      <section className="section section--surface" aria-labelledby="adm-h1">
        <div className="container">
          <div className="hub-section">
            <h1 id="adm-h1">{heading}</h1>
            <p className="hub-intro">{intro}</p>

            <div className="enroll-card">
              <h2>{enrollHeading}</h2>
              <div className="enroll-steps">
                {enrollSteps.map((step) => (
                  <p key={step}>{step}</p>
                ))}
              </div>
              <p className="cta-microcopy" style={{ marginTop: "var(--space-2)" }}>
                {enrollMicrocopy}
              </p>
            </div>

            <div className="btn-group" id="start-application">
              <MarketingLink href={primaryButton.href} className="btn btn-primary">
                {primaryButton.label}
              </MarketingLink>
              <MarketingLink href={secondaryButton.href} className="btn btn-secondary">
                {secondaryButton.label}
              </MarketingLink>
            </div>
            <p className="cta-microcopy">{noCommitmentMicrocopy}</p>
          </div>
        </div>
      </section>

      {/* ── How to Apply ───────────────────────────────────────────── */}
      <section className="section section--alt" id="how-to-apply">
        <div className="container">
          <div className="hub-section">
            <h2>{howToApplyHeading}</h2>
            <div className="hub-prose">
              <p>{howToApplyIntro}</p>
            </div>

            <ol className="apply-steps">
              {applySteps.map((step) => (
                <li className="apply-step" key={step.number}>
                  <span className="apply-step__num">{step.number}</span>
                  <div>
                    <h3 className="apply-step__title">{step.title}</h3>
                    <p>{step.body}</p>
                    {step.list ? (
                      <ul>
                        {step.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className="btn-group" style={{ marginTop: "var(--space-6)" }}>
              <MarketingLink href={applyPrimaryButton.href} className="btn btn-primary">
                {applyPrimaryButton.label}
              </MarketingLink>
              <MarketingLink href={applySecondaryButton.href} className="btn btn-secondary">
                {applySecondaryButton.label}
              </MarketingLink>
            </div>

            <p
              className="hub-prose"
              style={{ marginTop: "var(--space-5)", fontStyle: "italic" }}
            >
              {stillHaveQuestions}
            </p>

            <p style={{ marginTop: "var(--space-4)" }}>
              Sincerely,
              <br />
              <strong>{signatureName}</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ── Tuition ────────────────────────────────────────────────── */}
      <section className="section section--surface" id="tuition-fees">
        <div className="container">
          <div className="hub-section">
            <h2>{tuitionHeading}</h2>
            <div className="tuition-rates">
              <h3>{tuitionSubheading}</h3>
              <p className="tuition-rates__intro">{tuitionIntro}</p>
              <div className="tuition-table-wrap">
                <table className="tuition-table">
                  <caption className="sr-only">
                    Renton Prep tuition for school year {schoolYear}
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Program</th>
                      <th scope="col">
                        {schoolYear}
                        <span className="tuition-sub">Yearly tuition</span>
                      </th>
                      <th scope="col">
                        {schoolYear}
                        <span className="tuition-sub">12 payments</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs.map((p) => (
                      <tr key={p.name}>
                        <th scope="row">{p.name}</th>
                        <td>{p.annual}</td>
                        <td>{p.monthly}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="tuition-footnote">{tuitionFootnote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Financial Aid ──────────────────────────────────────────── */}
      <section className="section section--surface" id="financial-assistance">
        <div className="container">
          <div className="hub-section">
            <h2>{financialAidHeading}</h2>
            <h3>{financialAidSubheading}</h3>
            <div className="hub-prose">
              {financialAidProse.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Uniforms ───────────────────────────────────────────────── */}
      <section className="section section--alt" id="uniforms">
        <div className="container">
          <div className="hub-section">
            <h2>{uniformsHeading}</h2>
            <div className="uniform-guidelines">
              <h3>{uniformsSubheading}</h3>
              {uniformGroups.map((group) => (
                <div key={group.label}>
                  <h4 className="uniform-guidelines__subhead">{group.label}</h4>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className="uniform-guidelines__rule">{uniformRule}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Extended Care ──────────────────────────────────────────── */}
      <section className="section section--alt" id="extended-school-care">
        <div className="container">
          <div className="hub-section">
            <h2>{extendedCareHeading}</h2>
            <h3>{extendedCareSubheading}</h3>
            <h4>Hours</h4>
            <dl className="hub-details">
              <dt>Before School:</dt>
              <dd>{hoursBefore}</dd>
              <dt>After School:</dt>
              <dd>{hoursAfter}</dd>
              <dt>Rate:</dt>
              <dd>{extendedCareRate}</dd>
              <dt>Contact:</dt>
              <dd>
                <a href={`tel:${extendedCareContactTel}`}>{extendedCareContactPhone}</a>
              </dd>
            </dl>
            <div className="hub-prose" style={{ marginTop: "var(--space-4)" }}>
              <p>{extendedCareProse}</p>
            </div>
            <div
              className="divider"
              role="separator"
              aria-hidden="true"
              style={{ margin: "var(--space-5) 0" }}
            />
            <h4>{whatToExpectHeading}</h4>
            <div className="hub-prose">
              <p>{whatToExpectProse}</p>
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
