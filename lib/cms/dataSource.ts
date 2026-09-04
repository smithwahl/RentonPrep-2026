/**
 * Data-fetching layer for the CMS. Every function here has a stable signature so
 * swapping the body doesn't touch any caller in navigationService.ts, pageService.ts,
 * or settingsService.ts. Set CMS_SOURCE=api to read from the custom .NET CMS API
 * (lib/cms/apiSource.ts, the RentonPrep.Page repo) instead of the local JSON stand-in
 * below — unset/anything else keeps today's local-JSON behavior unchanged. Settings has
 * no CMS-backed source yet (see apiSource.ts — it doesn't implement it) since no Settings
 * content type exists in the CMS yet.
 */
import { fetchAllSlugsFromApi, fetchNavigationFromApi, fetchPageBySlugFromApi } from "@/lib/cms/apiSource";
import type { MenuLocation, Page, RawMenuItem, Settings } from "@/lib/cms/types";

import settingsData from "@/lib/cms/data/settings.json";
import headerNav from "@/lib/cms/data/navigation/header.json";
import footerAboutNav from "@/lib/cms/data/navigation/footer-about.json";
import footerAdmissionsNav from "@/lib/cms/data/navigation/footer-admissions.json";
import footerAcademicsNav from "@/lib/cms/data/navigation/footer-academics.json";
import footerBottomNav from "@/lib/cms/data/navigation/footer-bottom.json";
import homePage from "@/lib/cms/data/pages/home.json";
import aboutPage from "@/lib/cms/data/pages/about.json";
import aboutGenesisPage from "@/lib/cms/data/pages/about-genesis.json";
import academicsPage from "@/lib/cms/data/pages/academics.json";
import admissionsPage from "@/lib/cms/data/pages/admissions.json";
import awardsPage from "@/lib/cms/data/pages/awards.json";
import careersPage from "@/lib/cms/data/pages/careers.json";
import donatePage from "@/lib/cms/data/pages/donate.json";
import legalPage from "@/lib/cms/data/pages/legal.json";

const NAVIGATION_BY_LOCATION: Record<MenuLocation, RawMenuItem[]> = {
  header: headerNav as RawMenuItem[],
  "footer-about": footerAboutNav as RawMenuItem[],
  "footer-admissions": footerAdmissionsNav as RawMenuItem[],
  "footer-academics": footerAcademicsNav as RawMenuItem[],
  "footer-bottom": footerBottomNav as RawMenuItem[],
};

const PAGES_BY_SLUG: Record<string, Page> = {
  "/": homePage as Page,
  about: aboutPage as Page,
  "about/genesis": aboutGenesisPage as Page,
  academics: academicsPage as Page,
  admissions: admissionsPage as Page,
  awards: awardsPage as Page,
  careers: careersPage as Page,
  donate: donatePage as Page,
  legal: legalPage as Page,
};

const useApi = process.env.CMS_SOURCE === "api";

export async function fetchSettings(): Promise<Settings> {
  return settingsData as Settings;
}

export async function fetchNavigation(location: MenuLocation): Promise<RawMenuItem[]> {
  if (useApi) return fetchNavigationFromApi(location);
  return NAVIGATION_BY_LOCATION[location] ?? [];
}

export async function fetchPageBySlug(slug: string): Promise<Page | null> {
  if (useApi) return fetchPageBySlugFromApi(slug);
  return PAGES_BY_SLUG[slug] ?? null;
}

export async function fetchAllSlugs(): Promise<string[]> {
  if (useApi) return fetchAllSlugsFromApi();
  return Object.keys(PAGES_BY_SLUG);
}
