import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

// Allowlist of URI schemes that are safe to render as links.
const SAFE_HREF_RE = /^(https?:\/\/|\/\/|\/|#|mailto:|tel:)/i;

/** Returns the href if it uses a safe URI scheme, otherwise "#". */
function sanitizeHref(href: string): string {
  return SAFE_HREF_RE.test(href) ? href : "#";
}

export function isExternalHref(href: string): boolean {
  // Match explicit http/https as well as protocol-relative URLs (//example.com)
  // so that both are treated as external and rendered with noopener noreferrer.
  return /^https?:\/\//i.test(href) || href.startsWith("//");
}

type MarketingLinkProps = {
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onClick?: () => void;
  "aria-current"?: "page" | "step" | "location" | "date" | "time" | "true" | "false";
};

/** Internal routes use Next Link; http(s) uses a regular anchor (e.g. Instagram, external apply portal). */
export function MarketingLink({
  href,
  className,
  style,
  children,
  onClick,
  "aria-current": ariaCurrent,
}: MarketingLinkProps) {
  const safeHref = sanitizeHref(href);
  if (isExternalHref(safeHref)) {
    return (
      <a
        href={safeHref}
        className={className}
        style={style}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        aria-current={ariaCurrent}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={safeHref}
      className={className}
      style={style}
      onClick={onClick}
      aria-current={ariaCurrent}
    >
      {children}
    </Link>
  );
}
