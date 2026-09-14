import Image from "next/image";

import { MarketingShell } from "@/components/marketing/MarketingShell";

export function NewCampusContent() {
  return (
    <MarketingShell>
      <section
        className="section section--surface"
        aria-labelledby="new-campus-heading"
      >
        <div className="container">
          <div className="section-intro section-intro--center">
            <span className="eyebrow eyebrow--muted">Our Story</span>
            <h1 id="new-campus-heading">New Campus</h1>
            <p className="about-lead">
              Renton Prep is approved by the appropriate education authorities. Current approval certificates are provided below..
            </p>
          </div>

          <div className="faq-groups">
            <div className="faq-group open">
              <div className="faq-group-header faq-group-header--static">
                <span className="faq-question">
                  Washington State Board of Education Certificate of Private
                  School Approval, 2026-2027
                </span>
              </div>
              <div className="faq-body">
                <div className="faq-body-inner">
                  <p>
                    Each year, the Washington State Board of Education
                    reviews our school and confirms that we meet every
                    condition required under Chapter 28A.195 RCW and Chapter
                    180-90 WAC. That approval is renewed annually, and our
                    current certificate covers the 2026-2027 school year.
                  </p>
                  <div className="certificate-frame">
                    <Image
                      src="/WashingtonStateCertificate.png"
                      alt="Washington State Board of Education Certificate of Private School Approval, 2026-2027, issued to Renton Preparatory Christian School in Renton, Washington"
                      width={1600}
                      height={1132}
                      style={{ width: "100%", height: "auto" }}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
