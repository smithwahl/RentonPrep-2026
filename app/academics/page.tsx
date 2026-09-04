import type { Metadata } from "next";

import { PageRenderer } from "@/components/cms/PageRenderer";
import { getPageBySlug } from "@/lib/cms/pageService";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Academic programs, technology, and elementary overview | Renton Prep Christian School.",
  openGraph: {
    title: "Academics | Renton Prep",
    description:
      "Academic programs, technology, and elementary overview | Renton Prep Christian School.",
    url: "/academics",
    type: "website",
  },
};

export default async function AcademicsPage() {
  const page = await getPageBySlug("academics");
  if (!page) return null;

  return (
    <div className="marketing-root">
      <PageRenderer sections={page.sections} />
    </div>
  );
}
