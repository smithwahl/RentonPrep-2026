import type { Metadata } from "next";

import { PageRenderer } from "@/components/cms/PageRenderer";
import { getPageBySlug } from "@/lib/cms/pageService";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Career inquiries at Renton Prep Christian School — master–apprentice learning alongside students.",
  openGraph: {
    title: "Careers | Renton Prep",
    description:
      "We welcome inquiries from educators and contributors who share our mission.",
  },
};

export default async function CareersPage() {
  const page = await getPageBySlug("careers");
  if (!page) return null;

  return (
    <div className="marketing-root">
      <PageRenderer sections={page.sections} />
    </div>
  );
}
