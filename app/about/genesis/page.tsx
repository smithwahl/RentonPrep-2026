import type { Metadata } from "next";

import { PageRenderer } from "@/components/cms/PageRenderer";
import { getPageBySlug } from "@/lib/cms/pageService";

export const metadata: Metadata = {
  title: "The Genesis Project",
  description:
    "Renton Prep's long-term learning and research initiative: responsible AI integration, personalized learning, academic rigor, and human flourishing.",
  openGraph: {
    title: "The Genesis Project | Renton Prep",
    description:
      "Renton Prep's long-term learning and research initiative: responsible AI integration, personalized learning, academic rigor, and human flourishing.",
  },
};

export default async function GenesisProjectPage() {
  const page = await getPageBySlug("about/genesis");
  if (!page) return null;

  return (
    <div className="marketing-root">
      <PageRenderer sections={page.sections} />
    </div>
  );
}
