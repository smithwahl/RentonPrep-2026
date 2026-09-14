/**
 * Content model shared by every CMS data source. Component-facing code should only
 * ever see these normalized shapes — never a vendor's raw wire format (Contentful's
 * sys/fields envelope, Sanity's _type/_ref, etc). When a real CMS is wired up, the
 * vendor-specific mapping lives inside lib/cms/dataSource.ts and nowhere else.
 */

export type MenuLocation =
  | "header"
  | "footer-about"
  | "footer-admissions"
  | "footer-academics"
  | "footer-bottom";

export type MenuLinkType = "internalPage" | "externalUrl" | "anchor";

/** Flat record as authored/stored. `parentId: null` marks a top-level item. */
export type RawMenuItem = {
  id: string;
  title: string;
  linkType: MenuLinkType;
  /** internalPage: page slug, no leading slash except "/" for home */
  slug?: string;
  /** anchor: fragment without the leading "#", e.g. "mission" */
  anchor?: string;
  /** externalUrl: full URL */
  url?: string;
  order: number;
  parentId: string | null;
  openInNewTab?: boolean;
  visible?: boolean;
};

/** Resolved tree node — `href` is precomputed so components never branch on linkType. */
export type MenuItemNode = RawMenuItem & {
  href: string;
  children: MenuItemNode[];
};

export type Settings = {
  name: string;
  legalName: string;
  tagline: string;
  address: { line1: string; line2: string; mapQuery: string };
  addressStructured: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  phone: { display: string; tel: string };
  socials: { instagram: string };
  applyUrl: string;
  contactUrl: string;
  microcopy: { noCommitment: string; noCommitmentFull: string };
  defaultSeoDescription: string;
  footerBrandDescription: string;
  schwabeLink: { label: string; href: string };
};

export type ButtonData = { label: string; href: string };

export type HeroSectionData = {
  type: "hero";
  heading: string;
  description: string;
  backgroundImage: string;
  primaryButton: ButtonData;
  secondaryButton: ButtonData;
  microcopy: string;
};

export type MetricsSectionData = {
  type: "metrics";
  eyebrow: string;
  heading: string;
  body: string;
  points: string[];
  badges: { image: string; alt: string; label: string; width: number; height: number }[];
};

export type WhyChooseSectionData = {
  type: "whyChoose";
  eyebrow: string;
  heading: string;
  intro: string;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
};

export type MvaCard = { number: string; title: string; summary: string; prose: string[] };

export type MissionSectionData = {
  type: "missionVisionAction";
  eyebrow: string;
  heading: string;
  intro: string;
  aboutHref: string;
  cards: MvaCard[];
};

export type FeatureGridSectionData = {
  type: "featureGrid";
  eyebrow: string;
  heading: string;
  intro: string;
  items: { title: string; body: string }[];
};

export type GenesisTeaserSectionData = {
  type: "genesisTeaser";
  eyebrow: string;
  heading: string;
  description: string;
  items: { title: string; body: string }[];
  ctaLabel: string;
  ctaHref: string;
};

export type ResearchGridSectionData = {
  type: "researchGrid";
  eyebrow: string;
  heading: string;
  intro: string;
  cards: { title: string; body: string; accent: string }[];
};

export type TestimonialsSectionData = {
  type: "testimonials";
  eyebrow: string;
  heading: string;
  intro: string;
  items: { quote: string; attribution: string }[];
};

export type CtaOption = { title: string; body: string; buttonLabel: string; buttonHref: string };

export type CtaSectionData = {
  type: "cta";
  heading: string;
  body: string;
  primaryButton: ButtonData;
  secondaryButton: ButtonData;
  microcopy: string;
  options: CtaOption[];
};

export type CommunitySectionData = {
  type: "community";
  eyebrow: string;
  heading: string;
  intro: string;
  photos: { src: string; alt: string; position: string }[];
  ctaLabel: string;
  ctaHref: string;
};

/** Content not yet migrated off its own JSX data file — see CMS-MIGRATION-PLAN.md §20. */
export type FaqSectionData = { type: "faq" };

export type HeartAndMindSectionData = {
  type: "heartAndMind";
  eyebrow: string;
  heading: string;
  body: string;
  linkLabel: string;
  linkHref: string;
};

export type HiringSectionData = {
  type: "hiring";
  eyebrow: string;
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
};

/** A paragraph or a bullet list, in authored order — enough to model prose-heavy pages
 * (e.g. the Genesis Project deep-dive) without a full rich-text/Portable-Text engine. */
export type ProseBlock = { kind: "p"; text: string } | { kind: "list"; items: string[] };

export type AboutPageData = {
  type: "aboutPage";
  eyebrow: string;
  heading: string;
  lead: string;
  introProse: string[];
  evolvedHeading: string;
  evolvedProse: string[];
  todayHeading: string;
  todayProse: string[];
  momentsHeading: string;
  milestones: { year: string; text: string }[];
  continuingHeading: string;
  continuingProse: string[];
  ctas: ButtonData[];
};

export type AcademicsPageData = {
  type: "academicsPage";
  heading: string;
  intro: string;
  primaryButton: ButtonData;
  secondaryButton: ButtonData;
  technologyHeading: string;
  technologyProse: string[];
  technologyLinks: ButtonData[];
  elementaryHeading: string;
  elementaryProse: string[];
  elementaryButton: ButtonData;
};

export type ApplyStep = { number: string; title: string; body: string; list?: string[] };
export type TuitionProgram = { name: string; annual: string; monthly: string };
export type UniformGroup = { label: string; items: string[] };

export type AdmissionsPageData = {
  type: "admissionsPage";
  heading: string;
  intro: string;
  enrollHeading: string;
  enrollSteps: string[];
  enrollMicrocopy: string;
  primaryButton: ButtonData;
  secondaryButton: ButtonData;
  noCommitmentMicrocopy: string;
  howToApplyHeading: string;
  howToApplyIntro: string;
  applySteps: ApplyStep[];
  applyPrimaryButton: ButtonData;
  applySecondaryButton: ButtonData;
  stillHaveQuestions: string;
  signatureName: string;
  tuitionHeading: string;
  tuitionSubheading: string;
  tuitionIntro: string;
  schoolYear: string;
  programs: TuitionProgram[];
  tuitionFootnote: string;
  financialAidHeading: string;
  financialAidSubheading: string;
  financialAidProse: string[];
  uniformsHeading: string;
  uniformsSubheading: string;
  uniformGroups: UniformGroup[];
  uniformRule: string;
  extendedCareHeading: string;
  extendedCareSubheading: string;
  hoursBefore: string;
  hoursAfter: string;
  extendedCareRate: string;
  extendedCareContactPhone: string;
  extendedCareContactTel: string;
  extendedCareProse: string;
  whatToExpectHeading: string;
  whatToExpectProse: string;
};

export type AwardsPageData = {
  type: "awardsPage";
  eyebrow: string;
  heading: string;
  intro: string;
  items: string[];
  buttons: ButtonData[];
};

export type CareersPageData = {
  type: "careersPage";
  eyebrow: string;
  heading: string;
  body: string;
  phoneButton: ButtonData;
  ctaButton: ButtonData;
  microcopy: string;
};

export type DonatePageData = {
  type: "donatePage";
  eyebrow: string;
  heading: string;
  body: string;
  phoneButton: ButtonData;
  ctaButton: ButtonData;
};

export type LegalPageData = {
  type: "legalPage";
  eyebrow: string;
  heading: string;
  identityLines: string[];
  body: string;
  phoneButton: ButtonData;
  ctaButton: ButtonData;
};

export type GenesisBlock = { id: string; heading: string; content: ProseBlock[] };

export type GenesisPageData = {
  type: "genesisPage";
  eyebrow: string;
  heading: string;
  intro: string;
  heroProse: string[];
  blocks: GenesisBlock[];
  visitHeading: string;
  visitProse: string[];
  ctaPrimary: ButtonData;
  ctaSecondary: ButtonData;
};

export type PageSection =
  | HeroSectionData
  | MetricsSectionData
  | WhyChooseSectionData
  | MissionSectionData
  | FeatureGridSectionData
  | GenesisTeaserSectionData
  | ResearchGridSectionData
  | TestimonialsSectionData
  | CtaSectionData
  | CommunitySectionData
  | FaqSectionData
  | HeartAndMindSectionData
  | HiringSectionData
  | AboutPageData
  | AcademicsPageData
  | AdmissionsPageData
  | AwardsPageData
  | CareersPageData
  | DonatePageData
  | LegalPageData
  | GenesisPageData;

export type PageSeo = {
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
  canonicalUrl?: string;
  noindex: boolean;
};

export type PageType = "home" | "standard" | "landing" | "hub";

export type Page = {
  title: string;
  slug: string;
  pageType: PageType;
  status: "draft" | "published";
  seo: PageSeo;
  sections: PageSection[];
};
