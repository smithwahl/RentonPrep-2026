import type { MenuLocation, Page, RawMenuItem } from "@/lib/cms/types";

/**
 * Server-only data source for the custom .NET CMS API (Agape.CmsApi — RentonPrep.Page repo),
 * used by dataSource.ts only when CMS_SOURCE=api. Calls two separate Azure Function Apps —
 * one for menus, one for pages — that read Postgres directly; the frontend itself never talks
 * to the database. GetPage/GetPageBySlug already return JSON shaped exactly like this file's
 * Page type (see RentonPrep.Page/CmsPages/Widgets/), so page fetches need no reshaping; only
 * the menu response needs flattening from its raw menuItems[] shape into RawMenuItem[].
 */

type ApiLinkMenuItem = {
  contentItemId: string;
  displayText: string;
  linkMenuItemPart: { url: string; target: string | null } | null;
};

type ApiMenuItemsResult = {
  menuItems: ApiLinkMenuItem[];
};

function apiBase(envVar: string): string {
  const base = process.env[envVar];
  if (!base) {
    throw new Error(`${envVar} must be set when CMS_SOURCE=api`);
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

function pathToSlug(path: string): string {
  const trimmed = path.replace(/^\/+/, "");
  return trimmed === "" ? "/" : trimmed;
}

export async function fetchNavigationFromApi(location: MenuLocation): Promise<RawMenuItem[]> {
  const url = withKey(`${menusApiBase()}/menu/location/${location}`, "CMS_MENUS_API_KEY");
  const res = await fetch(url);
  if (res.status === 404) return [];
  if (!res.ok) {
    throw new Error(`CmsMenus API error ${res.status} fetching navigation for ${location}`);
  }

  const result = (await res.json()) as ApiMenuItemsResult;
  return result.menuItems.map((item, index): RawMenuItem => {
    const itemUrl = item.linkMenuItemPart?.url ?? "#";
    const isInternal = itemUrl.startsWith("/");
    return {
      id: item.contentItemId,
      title: item.displayText,
      linkType: isInternal ? "internalPage" : "externalUrl",
      slug: isInternal ? pathToSlug(itemUrl) : undefined,
      url: isInternal ? undefined : itemUrl,
      order: index,
      parentId: null,
    };
  });
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
