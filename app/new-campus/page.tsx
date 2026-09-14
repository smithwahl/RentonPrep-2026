import type { Metadata } from "next";

import { NewCampusContent } from "@/components/marketing/NewCampusContent";

export const metadata: Metadata = {
  title: "Certificate of Private School Approval",
  description:
    "Renton Prep is approved by the Washington State Board of Education to operate as a private school, meeting every condition under Chapter 28A.195 RCW and Chapter 180-90 WAC.",
  openGraph: {
    title: "Certificate of Private School Approval | Renton Prep",
    description:
      "Renton Prep is approved by the Washington State Board of Education to operate as a private school, meeting every condition under Chapter 28A.195 RCW and Chapter 180-90 WAC.",
  },
};

export default function NewCampusPage() {
  return (
    <div className="marketing-root">
      <NewCampusContent />
    </div>
  );
}
