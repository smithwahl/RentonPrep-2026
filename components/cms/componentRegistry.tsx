import type { ComponentType } from "react";

import { AboutSchoolContent } from "@/components/marketing/AboutSchoolContent";
import { AcademicsHubContent } from "@/components/marketing/AcademicsHubContent";
import { AdmissionsHubContent } from "@/components/marketing/AdmissionsHubContent";
import { AwardsPageContent } from "@/components/marketing/AwardsPageContent";
import { CareersPageContent } from "@/components/marketing/CareersPageContent";
import { CommunitySection } from "@/components/marketing/CommunitySection";
import { CtaSection } from "@/components/marketing/CtaSection";
import { DonatePageContent } from "@/components/marketing/DonatePageContent";
import { FaqSection } from "@/components/marketing/FaqSection";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { GenesisProjectContent } from "@/components/marketing/GenesisProjectContent";
import { GenesisSection } from "@/components/marketing/GenesisSection";
import { HeartAndMindSection } from "@/components/marketing/HeartAndMindSection";
import { HeroSection } from "@/components/marketing/HeroSection";
import { HiringSection } from "@/components/marketing/HiringSection";
import { LegalPageContent } from "@/components/marketing/LegalPageContent";
import { MetricsSection } from "@/components/marketing/MetricsSection";
import { MissionSection } from "@/components/marketing/MissionSection";
import { ResearchSection } from "@/components/marketing/ResearchSection";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { WhyChooseSection } from "@/components/marketing/WhyChooseSection";
import type { PageSection } from "@/lib/cms/types";

/**
 * Maps a CMS section's `type` to the component that renders it. Adding a new
 * section type to the content model means adding one line here — not a growing
 * if/else chain in PageRenderer. See CMS-MIGRATION-PLAN.md §8.
 *
 * "faq" is intentionally not in this registry yet: its content still lives in
 * faq-content.tsx (JSX rich text), not CMS JSON — see §20. FaqSection takes no
 * CMS props today, so it's rendered as a fixed passthrough in PageRenderer.
 */
// `any` below is a deliberate widening point: each component's real props type is specific
// (Omit<XSectionData, "type">), but PageRenderer looks components up by a shared `type` key,
// which TS can't correlate back to the specific prop shape across a lookup table.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const componentRegistry: Partial<Record<PageSection["type"], ComponentType<any>>> = {
  hero: HeroSection,
  metrics: MetricsSection,
  whyChoose: WhyChooseSection,
  missionVisionAction: MissionSection,
  featureGrid: FeaturesSection,
  genesisTeaser: GenesisSection,
  researchGrid: ResearchSection,
  testimonials: TestimonialsSection,
  cta: CtaSection,
  community: CommunitySection,
  heartAndMind: HeartAndMindSection,
  hiring: HiringSection,
  aboutPage: AboutSchoolContent,
  academicsPage: AcademicsHubContent,
  admissionsPage: AdmissionsHubContent,
  awardsPage: AwardsPageContent,
  careersPage: CareersPageContent,
  donatePage: DonatePageContent,
  legalPage: LegalPageContent,
  genesisPage: GenesisProjectContent,
};

export { FaqSection };
