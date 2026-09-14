import type { Metadata } from "next";

import { PageRenderer } from "@/components/cms/PageRenderer";
import { getPageBySlug } from "@/lib/cms/pageService";

export const metadata: Metadata = {
  title: "Awards & Recognition",
  description:
    "How Renton Prep describes its accreditations, STEM certification, and Microsoft Showcase recognition.",
  openGraph: {
    title: "Awards & Recognition | Renton Prep",
    description:
      "Accreditations, Cognia STEM certification, and Microsoft Showcase School recognition.",
  },
};

export default async function AwardsPage() {
  const page = await getPageBySlug("awards");
  if (!page) return null;

  return (
    <div className="marketing-root">
      <PageRenderer sections={page.sections} />
    </div>
  );
}
