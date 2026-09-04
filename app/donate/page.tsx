import type { Metadata } from "next";

import { PageRenderer } from "@/components/cms/PageRenderer";
import { getPageBySlug } from "@/lib/cms/pageService";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Contact Renton Prep Christian School to learn about supporting the school.",
  openGraph: {
    title: "Donate | Renton Prep",
    description:
      "Contact the school to learn about supporting Renton Prep Christian School.",
  },
};

export default async function DonatePage() {
  const page = await getPageBySlug("donate");
  if (!page) return null;

  return (
    <div className="marketing-root">
      <PageRenderer sections={page.sections} />
    </div>
  );
}
