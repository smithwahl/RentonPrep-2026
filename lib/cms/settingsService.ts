import { fetchSettings } from "@/lib/cms/dataSource";
import type { Settings } from "@/lib/cms/types";

/**
 * Real CMS target: 'use cache' + cacheTag('settings'), revalidated by the CMS
 * publish webhook (see CMS-MIGRATION-PLAN.md §10). Not applied yet — this repo
 * doesn't have cacheComponents enabled, and there's no webhook to invalidate it.
 */
export async function getSiteSettings(): Promise<Settings> {
  return fetchSettings();
}
