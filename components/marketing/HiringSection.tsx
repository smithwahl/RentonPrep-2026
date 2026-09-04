import Link from "next/link";

import type { HiringSectionData } from "@/lib/cms/types";

export function HiringSection({
  eyebrow,
  heading,
  body,
  buttonLabel,
  buttonHref,
}: Omit<HiringSectionData, "type">) {
  return (
    <section className="section section--surface" aria-labelledby="hiring-heading">
      <div className="container">
        <div className="section-intro section-intro--center">
          <span className="eyebrow eyebrow--muted">{eyebrow}</span>
          <h2 id="hiring-heading">{heading}</h2>
          <p>{body}</p>
          <div className="btn-group" style={{ justifyContent: "center" }}>
            <Link href={buttonHref} className="btn btn-primary">
              {buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
