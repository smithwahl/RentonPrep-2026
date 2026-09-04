import Image from "next/image";

import { MarketingLink } from "@/components/marketing/MarketingLink";
import type { MenuItemNode, Settings } from "@/lib/cms/types";

function FooterLinkList({ items }: { items: MenuItemNode[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <MarketingLink href={item.href}>{item.title}</MarketingLink>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter({
  footerAbout,
  footerAdmissions,
  footerAcademics,
  footerBottom,
  settings,
}: {
  footerAbout: MenuItemNode[];
  footerAdmissions: MenuItemNode[];
  footerAcademics: MenuItemNode[];
  footerBottom: MenuItemNode[];
  settings: Settings;
}) {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-badge">
                <Image
                  src="/logo.png"
                  alt={settings.name}
                  width={1125}
                  height={509}
                  className="logo-img"
                />
              </div>
            </div>
            <p>{settings.footerBrandDescription}</p>
            <p className="footer-brand-schwabe">
              <MarketingLink href={settings.schwabeLink.href}>
                {settings.schwabeLink.label}
              </MarketingLink>
            </p>
          </div>
          <div className="footer-col">
            <h5>About</h5>
            <FooterLinkList items={footerAbout} />
          </div>
          <div className="footer-col">
            <h5>Admissions</h5>
            <FooterLinkList items={footerAdmissions} />
          </div>
          <div className="footer-col">
            <h5>Academics</h5>
            <ul>
              {footerAcademics.map((item) => (
                <li key={item.id}>
                  <MarketingLink href={item.href}>{item.title}</MarketingLink>
                </li>
              ))}
              <li>
                <a href={`tel:${settings.phone.tel}`}>{settings.phone.display}</a>
              </li>
              <li>
                <span>
                  {settings.address.line1}
                  <br />
                  {settings.address.line2}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {settings.legalName}. All rights reserved.
          </span>
          <span>
            {footerBottom.map((item, i) => (
              <span key={item.id}>
                {i > 0 ? " · " : null}
                <MarketingLink href={item.href}>{item.title}</MarketingLink>
              </span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
