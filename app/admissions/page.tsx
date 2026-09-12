import type { Metadata } from "next";

import { PageRenderer } from "@/components/cms/PageRenderer";
import { getPageBySlug } from "@/lib/cms/pageService";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Tuition, financial assistance, uniforms, and extended care | Renton Prep Christian School.",
  openGraph: {
    title: "Admissions | Renton Prep",
    description:
      "Tuition, financial assistance, uniforms, and extended care | Renton Prep Christian School.",
  },
};

export default async function AdmissionsPage() {
  const page = await getPageBySlug("admissions");
  if (!page) return null;

  return (
    <div className="marketing-root">
      <PageRenderer sections={page.sections} />
    </div>
  );
}
