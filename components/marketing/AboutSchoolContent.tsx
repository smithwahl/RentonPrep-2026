import Link from "next/link";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import { SCHOOL_HISTORY_MILESTONES } from "@/lib/school-history";

export function AboutSchoolContent() {
  return (
    <MarketingShell>
      <section
        className="section section--surface"
        aria-labelledby="about-heading"
      >
        <div className="container">
          <div className="section-intro section-intro--center">
            <span className="eyebrow eyebrow--muted">About Renton Prep</span>
            <h1 id="about-heading">Our Story</h1>
            <p className="about-lead">
              Renton Prep grew out of a long tradition of Christian education in
              the Renton community.
            </p>
          </div>
          <div className="about-prose">
            <p>
              That story begins in 1953 with Holy Cross Lutheran Church and
              continued with the opening of Holy Cross Lutheran School in 1962.
              Over time, that foundation carried forward through Amazing Grace
              and eventually became what is now Renton Prep.
            </p>
            <p>
              While much has changed, the purpose has remained consistent: care
              for students, take learning seriously, and ground both in a clear
              sense of meaning.
            </p>
          </div>
        </div>
      </section>

      <section
        className="section section--alt"
        aria-labelledby="evolved-heading"
      >
        <div className="container">
          <div className="section-intro">
            <h2 id="evolved-heading">How the School Evolved</h2>
          </div>
          <div className="about-prose">
            <p>
              In the early 1990s, the school began to rethink how learning
              should work.
            </p>
            <p>
              Technology was introduced into classrooms, not as an add-on, but as
              part of a broader effort to help students think, create, and
              engage more deeply.
            </p>
            <p>
              By the mid-2000s, this work expanded into formal research in
              partnership with the University of Washington. Since then, the
              approach has been steady: test ideas, study what works, and apply
              it in the classroom.
            </p>
          </div>
        </div>
      </section>

      <section
        className="section section--surface"
        aria-labelledby="today-heading"
      >
        <div className="container">
          <div className="section-intro">
            <h2 id="today-heading">Renton Prep Today</h2>
          </div>
          <div className="about-prose">
            <p>
              In 2015, Renton Prep opened its Renton campus. In 2019, the
              remainder of the school&apos;s Seattle community joined that
              location, bringing the full K–12 program together in one place.
            </p>
            <p>
              Today, Renton Prep reflects both its history and its direction. It
              is a school grounded in the Christian faith, shaped by research,
              and focused on helping students think clearly, act responsibly, and
              engage meaningfully with the world.
            </p>
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
            <h2 id="moments-heading">Key Moments</h2>
          </div>
          <ul className="history-timeline">
            {SCHOOL_HISTORY_MILESTONES.map((m, i) => (
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
            <h2 id="continuing-heading">A Continuing Story</h2>
          </div>
          <div className="about-prose">
            <p>
              Renton Prep continues to grow and adapt, but its foundation
              remains the same.
            </p>
            <p>
              The goal is not just to prepare students for what comes next, but
              to help them live thoughtful, meaningful lives.
            </p>
          </div>
          <div className="about-page-ctas">
            <Link href="/new-campus" className="btn btn-secondary">
              Certificate of Private School Approval
            </Link>
            <Link href="/#mission" className="btn btn-secondary">
              Mission &amp; vision on the homepage
            </Link>
            <Link href="/#next-steps" className="btn btn-primary">
              Request Information
            </Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
