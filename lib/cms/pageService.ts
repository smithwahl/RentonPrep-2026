import { fetchAllSlugs, fetchPageBySlug } from "@/lib/cms/dataSource";
import { getSiteSettings } from "@/lib/cms/settingsService";
import type { Page } from "@/lib/cms/types";

/**
 * Resolves "{{settings.someField}}" tokens embedded in CMS copy (e.g. the apply-portal
 * URL, which is genuinely shared across many sections) against the live Settings
 * singleton, so it only has to change in one place. Deliberately not a general
 * templating engine — dot-path lookup against Settings only.
 */
function resolveTemplates<T>(value: T, settings: Record<string, unknown>): T {
  if (typeof value === "string") {
    return value.replace(/\{\{settings\.([\w.]+)\}\}/g, (_match, path: string) => {
      const resolved = path
        .split(".")
        .reduce<unknown>((acc, key) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined), settings);
      return typeof resolved === "string" ? resolved : _match;
    }) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => resolveTemplates(item, settings)) as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      out[key] = resolveTemplates(val, settings);
    }
    return out as T;
  }
  return value;
}

/**
 * Real CMS target: 'use cache' + cacheTag(`page:${slug}`).
 * See getSiteSettings() for why that isn't wired up yet.
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const [page, settings] = await Promise.all([fetchPageBySlug(slug), getSiteSettings()]);
  if (!page) return null;
  return resolveTemplates(page, settings);
}

export async function getAllSlugs(): Promise<string[]> {
  return fetchAllSlugs();
}
