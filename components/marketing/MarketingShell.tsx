import type { ReactNode } from "react";

import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { getNavigation } from "@/lib/cms/navigationService";
import { getSiteSettings } from "@/lib/cms/settingsService";

export async function MarketingShell({ children }: { children: ReactNode }) {
  const [headerNav, footerAbout, footerAdmissions, footerAcademics, footerBottom, settings] =
    await Promise.all([
      getNavigation("header"),
      getNavigation("footer-about"),
      getNavigation("footer-admissions"),
      getNavigation("footer-academics"),
      getNavigation("footer-bottom"),
      getSiteSettings(),
    ]);

  return (
    <>
      <SiteHeader navItems={headerNav} contactHref={settings.contactUrl} />
      <main id="main-content">{children}</main>
      <SiteFooter
        footerAbout={footerAbout}
        footerAdmissions={footerAdmissions}
        footerAcademics={footerAcademics}
        footerBottom={footerBottom}
        settings={settings}
      />
    </>
  );
}
