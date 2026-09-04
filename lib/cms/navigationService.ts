import { fetchNavigation } from "@/lib/cms/dataSource";
import type { MenuItemNode, MenuLocation, RawMenuItem } from "@/lib/cms/types";

function hrefFor(item: RawMenuItem): string {
  switch (item.linkType) {
    case "externalUrl":
      return item.url ?? "#";
    case "anchor": {
      const base = !item.slug || item.slug === "/" ? "/" : `/${item.slug}`;
      return `${base}#${item.anchor}`;
    }
    case "internalPage":
    default: {
      if (!item.slug || item.slug === "/") return "/";
      return `/${item.slug}`;
    }
  }
}

function buildTree(items: RawMenuItem[]): MenuItemNode[] {
  const nodes = new Map<string, MenuItemNode>();
  for (const item of items) {
    if (item.visible === false) continue;
    nodes.set(item.id, { ...item, href: hrefFor(item), children: [] });
  }

  const roots: MenuItemNode[] = [];
  for (const node of nodes.values()) {
    if (node.parentId && nodes.has(node.parentId)) {
      nodes.get(node.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  const byOrder = (a: MenuItemNode, b: MenuItemNode) => a.order - b.order;
  for (const node of nodes.values()) node.children.sort(byOrder);
  roots.sort(byOrder);

  return roots;
}

/**
 * Real CMS target: 'use cache' + cacheTag(`navigation:${location}`).
 * See getSiteSettings() for why that isn't wired up yet.
 */
export async function getNavigation(location: MenuLocation): Promise<MenuItemNode[]> {
  const flat = await fetchNavigation(location);
  return buildTree(flat);
}
