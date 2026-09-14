import { PageRenderer } from "@/components/cms/PageRenderer";
import { getPageBySlug } from "@/lib/cms/pageService";
import type { PageSection } from "@/lib/cms/types";

/**
 * The FAQ section is deliberately not CMS-driven (see componentRegistry.tsx) — its content
 * lives in faq-content.tsx, and FaqSection takes no props. There's no corresponding Orchard
 * content type to author it through, so it's appended here rather than expected to come back
 * from the CMS in page.sections.
 */
const FAQ_SECTION: PageSection = { type: "faq" };

/**
 * On the live site FAQ sits between Community and HeartAndMind, not at the very end —
 * confirmed against rentonprep.org's actual section order. Insert it there; if a future
 * content edit ever drops the heartAndMind section, fall back to appending at the end
 * rather than silently dropping FAQ.
 */
function withFaqSection(sections: PageSection[]): PageSection[] {
  if (sections.some((s) => s.type === "faq")) return sections;

  const heartAndMindIndex = sections.findIndex((s) => s.type === "heartAndMind");
  if (heartAndMindIndex === -1) return [...sections, FAQ_SECTION];

  const withFaq = [...sections];
  withFaq.splice(heartAndMindIndex, 0, FAQ_SECTION);
  return withFaq;
}

/** Home page content now comes from the CMS integration layer — see lib/cms/. */
export async function MarketingHome() {
  const page = await getPageBySlug("/");
  if (!page) return null;

  return <PageRenderer sections={withFaqSection(page.sections)} />;
}
