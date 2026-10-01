import type { MenuLocation, Page, RawMenuItem } from "@/lib/cms/types";

/**
 * Server-only data source for the custom .NET CMS API (Agape.CmsApi — RentonPrep.Page repo),
 * used by dataSource.ts when the corresponding CMS source is set to api. Calls two separate
 * Azure Function Apps — one for menus, one for pages — that read Postgres directly; the
 * frontend itself never talks to the database. Both responses match the local CMS types.
 */

function apiBase(envVar: string): string {
  const base = process.env[envVar];
  if (!base) {
    throw new Error(`${envVar} must be set when its CMS source is api`);
  }
  return base.replace(/\/+$/, "");
}

function menusApiBase(): string {
  return apiBase("CMS_MENUS_API_URL");
}

function pagesApiBase(): string {
  return apiBase("CMS_PAGES_API_URL");
}

function withKey(url: string, envVar: string): string {
  const key = process.env[envVar];
  if (!key) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}code=${encodeURIComponent(key)}`;
}

export async function fetchNavigationFromApi(location: MenuLocation): Promise<RawMenuItem[]> {
  const url = withKey(`${menusApiBase()}/menu/location/${location}`, "CMS_MENUS_API_KEY");
  const res = await fetch(url);
  if (res.status === 404) return [];
  if (!res.ok) {
    throw new Error(`CmsMenus API error ${res.status} fetching navigation for ${location}`);
  }

  return (await res.json()) as RawMenuItem[];
}

export async function fetchPageBySlugFromApi(slug: string): Promise<Page | null> {
  const path = slug === "/" ? "page/slug" : `page/slug/${slug}`;
  const url = withKey(`${pagesApiBase()}/${path}`, "CMS_PAGES_API_KEY");
  const res = await fetch(url);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`CmsPages API error ${res.status} fetching page for slug ${slug}`);
  }

  return (await res.json()) as Page;
}

export async function fetchAllSlugsFromApi(): Promise<string[]> {
  const url = withKey(`${pagesApiBase()}/page/slugs`, "CMS_PAGES_API_KEY");
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`CmsPages API error ${res.status} fetching all slugs`);
  }

  return (await res.json()) as string[];
}
