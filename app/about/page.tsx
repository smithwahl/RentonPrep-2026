import type { Metadata } from "next";

import { PageRenderer } from "@/components/cms/PageRenderer";
import { getPageBySlug } from "@/lib/cms/pageService";

export const metadata: Metadata = {
  title: "About Us: Our Story",
  description:
    "From Holy Cross Lutheran School (1962) to Renton Prep today. Christian education, research-informed learning, and one campus in downtown Renton.",
  openGraph: {
    title: "About Renton Prep | Our Story",
    description:
      "From Holy Cross Lutheran School (1962) to Renton Prep today. Christian education, research-informed learning, and one campus in downtown Renton.",
  },
};

export default async function AboutPage() {
  const page = await getPageBySlug("about");
  if (!page) return null;

  return (
    <div className="marketing-root">
      <PageRenderer sections={page.sections} />
    </div>
  );
}
