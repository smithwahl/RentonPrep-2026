import Image from "next/image";
import Link from "next/link";

import { MarketingLink } from "@/components/marketing/MarketingLink";
import type { HeroSectionData } from "@/lib/cms/types";

export function HeroSection({
  heading,
  description,
  backgroundImage,
  primaryButton,
  secondaryButton,
  microcopy,
}: Omit<HeroSectionData, "type">) {
  return (
    <section className="hero" aria-label="Introduction">
      {/* Blurred background plate — fills entire hero with warm classroom atmosphere */}
      <div className="hero-plate" aria-hidden="true" />
      {/* Sharp foreground photo — shows full scene, positioned right. Omitted entirely
          when the CMS hasn't set one, rather than passing next/image an invalid empty src. */}
      {backgroundImage ? (
        <div className="hero-image" aria-hidden="true">
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "contain", objectPosition: "right 20%" }}
          />
        </div>
      ) : null}
      {/* Readability gradient overlay */}
      <div className="hero-overlay" aria-hidden="true" />
      {/* Left-side subtle blur for text legibility */}
      <div className="hero-focus" aria-hidden="true" />
      <div className="container">
        <div className="hero-content">
          <h1>
            {heading.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>
          <p className="hero-description">{description}</p>
          <div className="hero-ctas">
            <Link href={primaryButton.href} className="btn btn-primary">
              {primaryButton.label}
            </Link>
            <MarketingLink href={secondaryButton.href} className="btn btn-ghost-white">
              {secondaryButton.label}
            </MarketingLink>
          </div>
          <p className="cta-microcopy cta-microcopy--light">{microcopy}</p>
        </div>
      </div>
      <div className="hero-rule" aria-hidden="true" />
    </section>
  );
}
