import type { Metadata } from "next";

import { PageRenderer } from "@/components/cms/PageRenderer";
import { getPageBySlug } from "@/lib/cms/pageService";

export const metadata: Metadata = {
  title: "Legal & Privacy",
  description:
    "Contact Renton Prep Christian School for privacy and legal questions.",
  openGraph: {
    title: "Legal & Privacy | Renton Prep",
    description:
      "How to reach Renton Prep for privacy, website, and records questions.",
  },
};

export default async function LegalPage() {
  const page = await getPageBySlug("legal");
  if (!page) return null;

  return (
    <div className="marketing-root">
      <PageRenderer sections={page.sections} />
    </div>
  );
}
