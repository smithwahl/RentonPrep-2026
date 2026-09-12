# CMS Migration Plan — Renton Prep Marketing Site

**Status:** Platform decided (**Orchard Core**). Integration layer and full site conversion already implemented and verified against a local-JSON stand-in, on branch `CMSIntegration` — see §21 for exactly what's done vs. what remains.
**Prepared:** 2026-08-17 · **Updated:** 2026-08-18 (Orchard Core selected; supersedes the original top pick)

---

## 1. Existing Architecture Analysis

| Layer | Finding |
|---|---|
| Frontend | **Next.js 16.2.1**, App Router, React 19.2.4, TypeScript, Tailwind CSS 4 (Tailwind used lightly; most layout is custom CSS in `app/styles/`). |
| Backend/API | **No separate backend.** The only server logic is one Next.js Route Handler: `app/api/contact/route.ts`, which validates and rate-limits a contact form and forwards it to **JotForm** (`submit.jotform.com`) as a form-field proxy. There is no ORM, no database client, and `DATABASE_URL` is an unused line in `.env.example`. |
| Data storage | **None.** No database, no CMS, no external content API. Every page is a Server Component that renders TypeScript/JSX and imports plain-object constants from `lib/`. |
| Hosting model | Standard Next.js app (headers/CSP defined in `next.config.ts`; no `vercel.json`, consistent with a default Vercel-style deployment). No `cacheComponents` flag is enabled yet, so the app runs on Next's traditional static-by-default rendering model, not the new Next 16 Cache Components / Partial Prerendering model. |
| Scale | ~15 public routes, ~30 marketing components, 8 image assets in `public/`. This is a small, low-traffic marketing site for a single K–12 school — not a multi-tenant or transactional platform. |

### Current Implementation (hardcoded-content map)

```text
Header (SiteHeader.tsx)
 ├── NAV_LINKS array hardcoded in component (7 items, flat — no submenu support at all)
 ├── Logo path, CTA label, mobile menu copy hardcoded
 └── No dropdown/multi-level menus exist anywhere in the app today

Footer (SiteFooter.tsx)
 ├── 4 hardcoded columns (About / Admissions / Academics / bottom bar)
 ├── ~20 links, some via lib/site.ts URLs, labels always hardcoded in JSX
 └── Copyright, address, phone hardcoded (address/phone from lib/site.ts, but embedded inline)

Home Page (MarketingHome.tsx → 13 section components)
 ├── Hero heading/subhead/CTAs hardcoded in HeroSection.tsx
 ├── Hero image hardcoded path (/hero-1.jpeg)
 ├── 4 metric tiles hardcoded in MetricsSection.tsx
 ├── Mission/Vision/Action pulled from lib/site.ts (one of the few centralized files)
 ├── 6 feature cards hardcoded in FeaturesSection.tsx
 ├── Genesis Project teaser hardcoded in GenesisSection.tsx
 ├── 4 research cards hardcoded in ResearchSection.tsx
 ├── 3 testimonial quotes hardcoded (unattributed) in TestimonialsSection.tsx
 ├── CTA block hardcoded in CtaSection.tsx
 ├── Community photo grid — hardcoded filenames, gated by fs.existsSync at render time
 ├── 21 FAQ Q&As as JSX (React nodes, not plain data) in faq-content.tsx
 └── Hiring / Heart&Mind sections hardcoded

Other pages (About, Academics, Admissions, Awards, Careers, Donate, Legal, Genesis deep-dive)
 ├── All prose hardcoded directly in *Content.tsx components (up to 378 lines/file)
 ├── Tuition rates centralized in lib/tuition.ts (only 1 grade band listed)
 ├── School history timeline centralized in lib/school-history.ts
 └── SEO metadata (title/description/OG/canonical) hardcoded per-page in each page.tsx
```

**Key finding:** Content is either (a) hardcoded directly in JSX inside ~30 component files, or (b) centralized in a handful of `lib/*.ts` constant files (`site.ts`, `tuition.ts`, `school-history.ts`) that are still edited by developers, not by non-technical staff. Nothing is retrieved from an API. There are zero submenus in the current nav — this needs to be *added*, not just migrated.

---

## 2. CMS Content Inventory — CMS-Managed vs. Application-Managed

### CMS Managed Content

```text
Header navigation (NAV_LINKS) — including new submenu structure if desired
Footer navigation (4 columns, ~20 links)
Home page section content: Hero, Metrics, Why Choose, Mission/Vision/Action,
  Features, Genesis teaser, Research, Testimonials, CTA, Community gallery, FAQ,
  Heart & Mind, Hiring
Page content: About, Academics, Admissions, Awards, Careers, Donate, Legal,
  Genesis deep-dive, Request Information intro copy
Tuition table (lib/tuition.ts) — marketing/pricing display copy, not a transaction
School history timeline (lib/school-history.ts)
FAQ content (21 Q&As, currently JSX — needs conversion to rich text)
Images: hero photo, community gallery photos, future blog/announcement images
SEO metadata per page (title, description, OG image, canonical, robots/noindex)
Site identity singleton: school name, tagline, address, phone, social/apply URLs
  (currently lib/site.ts) — becomes a CMS "Global Settings" document
Testimonials (with proper attribution once real quotes are supplied)
```

### Application Managed Content (stays exactly as-is — do NOT move to CMS)

```text
Contact form submission handling (app/api/contact/route.ts)
JotForm field mapping / rate limiting (lib/contact-payload.ts, lib/contact-rate-limit.ts)
Security headers / CSP (next.config.ts)
Analytics wiring (GA4 script in layout.tsx)
JSON-LD structured-data component logic (SchoolJsonLd.tsx — the *values* it renders
  come from the CMS settings singleton, but the schema.org shaping stays in code)
```

There is currently **no transactional/business data at all** in this app (no accounts, orders, payments, applications) — the "Application Data" bucket is intentionally almost empty. That's a good sign for this migration: nothing here risks being pulled into the CMS by accident.

---

## 3. CMS Candidate Comparison *(original evaluation — see §4 for the platform actually selected)*

Because this app has **no existing database and no .NET/Java backend to integrate with**, the ".NET Support" and "Azure Hosting" criteria were, at the time of this evaluation, largely moot — a self-hosted platform meant standing up *new* infrastructure that didn't exist today. That analysis favored SaaS/hosted headless CMS options. It's kept here for the record; **the org has since chosen Orchard Core** (§4), which changes that calculus deliberately — see §4 for why.

| Criteria | Sanity | Contentful | Payload CMS | Strapi | Directus | Umbraco | WordPress Headless |
|---|---|---|---|---|---|---|---|
| Headless API | REST + GraphQL + GROQ | REST + GraphQL | REST + GraphQL | REST + GraphQL | REST + GraphQL | REST (Content Delivery API) | REST (WPGraphQL plugin) |
| Menu/submenu modeling | Excellent — native references, arbitrary nesting | Good — reference fields, manual ordering | Good — relationship fields, TS-native | Good — via plugin or custom content type | Good — M2M + tree UI | Good — content picker | Weak — needs a menu plugin, fragile |
| Page builder / flexible sections | Excellent — native "array of typed objects" (Portable Text blocks) | Good — reference arrays | Excellent — native Blocks field | Good — Dynamic Zones | Good — M2A (many-to-any) | Good — Block List editor | Weak — ACF Flexible Content plugin |
| Media management | Excellent, built-in CDN + image pipeline | Good, built-in CDN | Good — needs S3/blob config | Good — needs provider config | Good | Good | Good (native) but self-hosted storage |
| Roles/permissions | Good | Excellent (enterprise-grade) | Good, code-defined | Good | Excellent, very granular | Good | Good (native WP roles) |
| Draft/publish workflow | Yes, plus real-time collaboration | Yes, mature | Yes | Yes | Yes | Yes | Yes (native) |
| Versioning | Yes | Yes | Yes | Enterprise tier only | Yes | Yes | Yes (native revisions) |
| React/Next.js integration | Excellent — official `next-sanity`, App Router + Draft Mode support | Good — official SDKs | Excellent — literally a Next.js app/plugin | Good | Good | Fair — REST only, no JS-first SDK | Fair — plugin-dependent |
| Self-host vs. SaaS | SaaS (hosted) | SaaS (hosted) | Self-hosted (or Payload Cloud) | Self-hosted (or Strapi Cloud) | Self-hosted (or Directus Cloud) | Self-hosted (needs Windows/.NET or Docker) | Self-hosted |
| New infra required here | **None** — CDN + API only | **None** | **Yes** — Postgres/Mongo + app host | **Yes** — DB + app host | **Yes** — DB + app host | **Yes** — .NET runtime + SQL Server | **Yes** — MySQL + PHP host |
| Cost (small site) | Free tier covers this site's scale | Free tier is tighter (limited records/roles) | Free (self-host) but you pay for DB/hosting | Free (self-host) but you pay for DB/hosting | Free (self-host) but you pay for DB/hosting | Free (self-host) but you pay for DB/hosting | Free (self-host) but you pay for DB/hosting |
| Ongoing maintenance | **Near zero** — no servers to patch | **Near zero** | Real — DB backups, dependency/security patching, app hosting | Real — same as Payload | Real — same as Payload | Highest — Windows/IIS or Docker + SQL Server ops | Real — classic WP patching/security burden |
| Best fit *(pre-decision)* | ✅ | ✅ | Only with ops capacity | Viable | Viable | Not recommended *(no existing .NET stack — since revised, see §4)* | Not recommended |

**Original top pick:** Sanity — zero new infrastructure, content model maps almost exactly onto this app's existing "page = ordered list of sections" pattern, native Next.js Draft Mode support. **Second:** Contentful — same "no infra" profile, more form-based editor UX. **Third:** Payload CMS — best self-hosted option if the org wanted full data ownership. **Not recommended at the time:** Umbraco and WordPress Headless, both ruled out specifically because this app had *no existing .NET or PHP footprint to justify introducing one*.

---

## 4. Platform Decision — Orchard Core

The org has decided to use **Orchard Core** (the open-source, modular ASP.NET Core CMS) rather than a hosted headless SaaS. This is the right call if the org has (or wants) an Azure subscription, .NET/ASP.NET Core operational skills on staff, or a preference for owning the data and hosting outright — Orchard Core is the strongest fit for exactly the two criteria (".NET Support", "Azure Hosting") that ruled out Umbraco/WordPress in §3. It reverses the "near-zero maintenance" reasoning that favored Sanity, in exchange for full control.

Everything below in this document was originally written CMS-agnostic on purpose — the content model (§5–§7) and the `lib/cms/` integration layer (§9, already built — see §21) don't change. What changes is *how* `lib/cms/dataSource.ts` talks to the CMS, and a handful of things Sanity gave "for free" that now need to be built.

### Gaps to close, moving from the original SaaS assumption to Orchard Core

**1. Infrastructure (the big one).** This app has zero backend and zero database today. Orchard Core needs both: an ASP.NET Core host and a database (SQL Server, PostgreSQL, or SQLite). That's a second application to provision and operate alongside the Next.js frontend — not an API key. Natural target: **Azure App Service + Azure SQL**. This is genuinely new infrastructure, budget, and an ops owner that didn't exist in the original "no new infra" plan.

**2. API shape — GraphQL, not REST/GROQ.** `lib/cms/dataSource.ts` was built to isolate exactly this kind of swap — every other file only ever sees the normalized `Page` / `MenuItem` / `Settings` shapes from `lib/cms/types.ts`. Orchard Core's headless story is its **GraphQL module** (`OrchardCore.Apis.GraphQL`), which auto-exposes Content Types by technical name. Needs: a GraphQL client in the Next app (e.g. `graphql-request`), and Orchard-shaped queries — this work is contained entirely inside `dataSource.ts`.

**3. Content modeling — Content Types/Parts, not documents.** My `Page.sections[]` model doesn't exist natively in Orchard. It's built from Orchard's own primitives: a `Page` Content Type using a **Bag Part** or **Flow Part** to hold an ordered list of widget Content Items, with each of the section types in §7 (Hero, FeatureGrid, CTA, …) becoming its own Content Type + Content Fields, defined in Orchard's admin (or exported as a Recipe JSON for repeatable deployment). Real setup work, not configuration.

**4. Menu — good conceptual fit, verify GraphQL coverage.** Orchard's built-in Menu feature (nested menu items) maps well onto the `MenuItem`/`MenuItemNode` tree already modeled in §6. Worth confirming early that Menu content is cleanly queryable via GraphQL in the target Orchard version — that module's GraphQL coverage has historically been more mature for plain content types than for the Menu widget tree.

**5. Preview/Draft Mode — no out-of-the-box tool.** Orchard supports Draft & Publish natively, but there's no equivalent of `next-sanity`'s Presentation tool. This needs to be hand-built: a preview token/cookie that tells `pageService.getPageBySlug()` to query the draft version via GraphQL, wired to Next's `draftMode()`.

**6. Cache invalidation — no built-in publish webhook.** §10's plan assumed the CMS fires a webhook on publish. Orchard doesn't do this by default — needs a small custom Orchard module hooking `IContentHandler.PublishedAsync` to POST to the Next.js revalidate route.

**7. Media/CDN — no built-in image CDN.** Sanity ships a global image CDN for free; Orchard's Media Library stores to disk or Azure Blob Storage (via module) with no built-in transform CDN. Lean on Next's own image optimizer, or add Azure Front Door/CDN in front of Blob storage.

**8. Ops/skillset.** Someone needs to patch NuGet packages, manage the SQL database, and keep the App Service running — a different skillset than the current all-Vercel/Next.js setup.

None of this invalidates the work already done (§21) — the content model and the `PageRenderer`/`componentRegistry` pattern carry over unchanged. Only `lib/cms/dataSource.ts`'s internals, plus the six genuinely-new pieces above (hosting, content-type setup, preview flow, webhook module, media/CDN), are new work introduced by this platform choice.

---

## 5. CMS Content Model — Menu / Navigation

```text
Menu
- id
- name              (e.g. "Header Navigation", "Footer — About")
- location           enum: header | footer-about | footer-admissions | footer-academics | mobile
- status             draft | published

MenuItem
- id
- title
- linkType           enum: internalPage | externalUrl | anchor
- internalPage        reference → Page (when linkType = internalPage)
- externalUrl          string (when linkType = externalUrl, e.g. Instagram, RenWeb apply portal)
- anchor                string (when linkType = anchor, e.g. "#mission" on the home page)
- order                number
- parentMenuItem       reference → MenuItem (self-reference, nullable — enables unlimited nesting)
- icon                  optional asset reference
- openInNewTab          boolean
- visible               boolean
```

In Orchard Core terms: the built-in **Menu** content type + **MenuItem** content parts (Link Menu Item, Content Menu Item) map onto this directly — `parentMenuItem` nesting is native to how Orchard's menu editor already works.

Supports the target structure with unlimited nesting (the current site has **zero** existing submenus, so this is new capability, not a like-for-like port):

```text
Header
 ├── Our Story           → /about
 │      ├── Genesis Project    → /about/genesis
 │      └── Awards & Recognition → /awards
 ├── Admissions          → /admissions
 │      ├── Tuition & Fees      → /admissions#tuition-fees
 │      ├── Financial Assistance → /admissions#financial-assistance
 │      └── Apply Now (external) → RenWeb portal
 ├── Academics           → /academics
 ├── Community           → /#community
 └── FAQ                 → /#faq
```

`linkType` deliberately supports three cases the current app actually uses: internal pages, in-page anchors (`/#mission`), and external URLs (Instagram, RenWeb) — a plain "url string" field would lose the internal-link-integrity checking a reference field gives editors.

---

## 6. CMS Content Model — Page

```text
Page
- id
- title
- slug                unique, generates route e.g. /about, /academics
- pageType            enum: home | standard | landing | hub  (hub = About/Academics/Admissions style pages)
- status              draft | published
- seo
    - seoTitle
    - seoDescription
    - ogImage           asset reference
    - canonicalUrl
    - noindex            boolean  (replaces today's per-page noindex metadata)
- sections[]          ordered array of typed section objects (see §7)
```

In Orchard Core terms: a `Page` Content Type with a **Bag Part** or **Flow Part** holding the ordered `sections[]` as nested widget Content Items (see §4, gap 3).

Routes generated dynamically from `slug`, matching today's App Router structure:

```text
/                     pageType: home
/about                pageType: hub
/about/genesis        pageType: standard
/academics            pageType: hub
/admissions           pageType: hub
/awards               pageType: standard
/careers              pageType: standard
/donate               pageType: standard
/legal                pageType: standard
/request-information  pageType: standard (keeps its own React form component — see §13)
```

Redirect routes (`/contact`, `/blog`, `/events` — currently `permanentRedirect()` calls in `page.tsx`) stay as **application-level redirects in code**. They are routing/infrastructure concerns, not editorial content, and moving them into the CMS would add a lookup on every request for something that changes essentially never.

---

## 7. Reusable Content Sections

Mapped directly from the 13 existing homepage components plus the hub pages, so migration is a rename, not a redesign. Each becomes its own Orchard Content Type (widget) per §4, gap 3:

```text
HeroSection        heading, subheading, backgroundImage, primaryButton, secondaryButton, microcopy
MetricsSection      list of {icon/badgeImage, label, ariaLabel}
FeatureGrid          list of {icon, title, description}   (replaces FeaturesSection, WhyChooseSection)
MissionVisionSection  mission, vision, action (3 rich-text blocks)
CardGrid              list of {image, title, description, link}  (replaces ResearchSection, GenesisSection teaser)
TestimonialsSection   list of {quote, attribution, photo?}
CTASection            heading, body, list of {label, url, style}
CommunitySection       list of images (replaces the current fs.existsSync file-gate hack)
FAQSection              list of {question, richTextAnswer, category[]}  (replaces JSX-based faq-content.tsx)
TextSection             richText  (used for About/Legal/Careers/Donate prose-heavy pages)
StatisticsTable          used for the tuition table (structured rows, not a raw string)
TimelineSection            used for the school history milestones
```

Example page document (vendor-agnostic shape — what `pageService.getPageBySlug()` returns regardless of whether it's reading local JSON or Orchard's GraphQL API):

```json
{
  "title": "Home",
  "slug": "/",
  "pageType": "home",
  "sections": [
    { "type": "hero" },
    { "type": "metrics" },
    { "type": "featureGrid", "variant": "whyChoose" },
    { "type": "missionVisionAction" },
    { "type": "featureGrid", "variant": "whatSetsUsApart" },
    { "type": "cardGrid", "variant": "genesisTeaser" },
    { "type": "cardGrid", "variant": "researchMethods" },
    { "type": "testimonials" },
    { "type": "cta" },
    { "type": "community" },
    { "type": "faq" },
    { "type": "textSection", "variant": "heartAndMind" },
    { "type": "cta", "variant": "hiring" }
  ]
}
```

---

## 8. Dynamic Menu Architecture

```text
CMS (Orchard Core — Menu content type, queried via GraphQL)
   │  GraphQL, cached with `use cache` + cacheTag('navigation')
   ▼
lib/cms/navigationService.ts   getNavigation(location: "header" | "footer-about" | ...)
   ▼
SiteHeader.tsx / SiteFooter.tsx   render recursively from MenuItem[] tree
```

Internal integration function (not a public HTTP endpoint — this app has no BFF today, so navigation is fetched server-side inside the Server Component tree, not via a client-facing `/api/navigation/header` route):

```ts
// lib/cms/navigationService.ts
export async function getNavigation(location: MenuLocation): Promise<MenuItemNode[]> {
  'use cache'
  cacheTag(`navigation:${location}`)
  cacheLife('days')
  const flat = await orchardGraphQLClient.request(NAVIGATION_QUERY, { location })
  return buildTree(flat) // parentMenuItem → children[]
}
```

`SiteHeader`/`SiteFooter` render `MenuItemNode[]` recursively (a `<NavItem item={node} depth={0} />` component that renders its own `item.children` recursively) instead of mapping the current flat `NAV_LINKS` array — this is the one structural change to those two components beyond swapping the data source. **Already built and verified** — see §21.

---

## 9. Dynamic Page Rendering

```text
User → /solutions/insurance-style slug
   ▼
app/[[...slug]]/page.tsx           (Next.js App Router catch-all)
   ▼
pageService.getPageBySlug(slug)     'use cache', cacheTag(`page:${slug}`)
   ▼
Page document (title, seo, sections[])
   ▼
<PageRenderer sections={page.sections} />
   ▼
componentRegistry[section.type] resolves the React component
```

```ts
// components/cms/PageRenderer.tsx
const componentRegistry: Record<string, React.ComponentType<any>> = {
  hero: HeroSection,
  metrics: MetricsSection,
  featureGrid: FeatureGrid,
  missionVisionAction: MissionVisionSection,
  cardGrid: CardGrid,
  testimonials: TestimonialsSection,
  cta: CtaSection,
  community: CommunitySection,
  faq: FaqSection,
  textSection: TextSection,
  statisticsTable: StatisticsTable,
  timeline: TimelineSection,
}

export function PageRenderer({ sections }: { sections: CmsSection[] }) {
  return sections.map((s) => {
    const Component = componentRegistry[s.type]
    if (!Component) return null
    return <Component key={s._key} {...s} />
  })
}
```

This avoids the large-conditional-component anti-pattern the guidance warns against, and it's a natural fit here because `MarketingHome.tsx` **already** hand-assembles 13 section components in a fixed order — the registry pattern just replaces the hardcoded JSX list with a CMS-driven array. **Already built** (per-page route files today, not yet the `[[...slug]]` catch-all — see §21's "known gap" note) **and verified across every page on the site.**

Existing section components keep their current CSS/markup; only their **props** change from "nothing (hardcoded)" to "CMS-provided fields."

---

## 10. CMS Integration Layer

```text
/lib/cms
├── client.ts             Orchard GraphQL client instance (production + preview/draft mode)
├── navigationService.ts  getNavigation(location)
├── pageService.ts        getPageBySlug(slug), getAllSlugs() (for sitemap.ts / generateStaticParams)
├── mediaService.ts       image URL builder (Orchard Media Library / Blob Storage URLs)
├── seoService.ts         getSeoMetadata(slug) → Next.js Metadata object
└── settingsService.ts    getSiteSettings() → replaces lib/site.ts identity fields
```

Every page/layout/component talks to the CMS **only** through this layer — never a raw GraphQL call scattered across components. This mirrors the separation already present in `lib/site.ts`, `lib/tuition.ts`, `lib/school-history.ts` today, just backed by an API instead of static constants. **This layer is already built** (currently reading local JSON as a stand-in for the real API — see §21); moving to Orchard Core means rewriting the *bodies* of the functions in `dataSource.ts` only.

**Rendering strategy for Next.js 16:** enable `cacheComponents: true` in `next.config.ts` and use the **Cache Components model** (the current model in this Next.js version — not the legacy `getStaticProps`/ISR API your training data may expect, and not even the pre-16 `export const revalidate` convention). Concretely:

- Wrap each CMS-fetching function in `'use cache'` with an explicit `cacheTag(...)`.
- Static, deterministic content (layout chrome, non-CMS copy) is automatically included in the prerendered shell — no action needed.
- Nothing on this site needs true per-request dynamic rendering (no logged-in users, no personalization), so `<Suspense>`-streamed dynamic holes are not required except optionally around the FAQ/community sections if they're expected to be edited very frequently.

---

## 11. Caching Strategy

```text
Editor publishes in Orchard Core admin
        │
        ▼
Custom Orchard module (hooks IContentHandler.PublishedAsync)  ← new code, not built-in (§4, gap 6)
        │
        ▼
POST to app/api/cms-revalidate/route.ts   (new Route Handler — the one new API endpoint this migration adds)
        │  verifies a shared secret, reads changed document's tag(s)
        ▼
revalidateTag(`page:${slug}`) / revalidateTag(`navigation:${location}`)
        │
        ▼
Next.js Data Cache invalidated (stale-while-revalidate — visitors get the old page
instantly while the next request regenerates it in the background)
```

- **Time-based fallback:** `cacheLife('days')` on all CMS reads, so even if a webhook/module call is ever missed, content self-heals within a day.
- **On-demand:** `revalidateTag` (not `updateTag` — there's no "read your own writes" requirement here since editors verify through CMS preview, not the live site) fired from the revalidate Route Handler, tag-scoped per page/nav location so publishing one page never invalidates the whole site.
- **CDN layer:** Orchard Core has no built-in image CDN (§4, gap 7) — rely on `next/image`'s optimizer for CMS-hosted images, with a `remotePatterns` entry for the Orchard/Blob Storage domain. If image traffic grows, add Azure Front Door/CDN in front of Blob storage.
- **Explicitly not recommended (still):** Redis or a separate general-purpose cache layer. Next.js's built-in Data Cache already covers this site's traffic profile; adding infrastructure here would violate the "minimize operational effort" constraint for no measurable benefit at this scale.

---

## 12. Preview and Publishing

Orchard Core supports Draft & Publish and version history natively — but **not** a ready-made headless preview integration (§4, gap 5). The flow below has to be hand-built:

```text
Editor clicks "Preview" in Orchard Core admin (custom preview link added to the content editor)
        │
        ▼
Link opens → /api/draft-mode/enable?secret=...&slug=/about
        │
        ▼
Route Handler calls draftMode().enable(), sets a cookie, redirects to /about
        │
        ▼
pageService.getPageBySlug() detects draftMode().isEnabled and queries Orchard's
GraphQL API for the draft/latest version instead of the published version
        │
        ▼
Editor sees unpublished changes live on the actual site chrome/layout
```

Workflow: `Draft → Preview → Publish`. Given the small size of the content team here (likely 1–2 school-office staff), a formal multi-stage Reviewer→Publisher approval chain is **not** recommended initially — see §14.

---

## 13. Media Management

| Asset | Recommendation | Reason |
|---|---|---|
| `hero-1.jpeg`, `community-1..4.*` | **Move to CMS** | Marketing photography, changes seasonally, currently gated by a brittle `fs.existsSync` filename-matching hack that's already documented as broken (community grid silently renders nothing — see `docs/site-audit-frontend.md` §A). CMS asset management fixes this outright — **already done** on the `CMSIntegration` branch (local-mock version; see §21). |
| Future blog/announcement images | **CMS** | Doesn't exist yet; build CMS-native from the start. |
| `logo.png` | **Keep as app asset** | Brand identity, tied to header/footer layout code, changes essentially never. |
| `favicon.ico`, `apple-icon.png`, `icon.png` | **Keep as app asset** | Framework-required system assets (Next.js file conventions). |
| `cognia-accredited-badge.png`, `microsoft-showcase-badge.jpg` | **Move to CMS** (as part of the `recognitions`/metrics content), *or* keep as app assets if the school wants these locked to verified-claim status (see docs/content-audit R1 — Microsoft Flagship claim needs owner verification regardless of CMS). Recommend CMS so a non-technical editor can swap/remove a badge the moment a designation lapses, without a code deploy. |

Orchard Core's **Media Library** module stores files on disk or Azure Blob Storage (via module) — there's no built-in image transformation CDN the way Sanity/Contentful ship one (§4, gap 7). Plan on `next/image`'s own optimizer doing the resizing/format work, with Azure Front Door/CDN as an optional later addition if traffic grows.

Also still fixes a real existing bug for free: `next.config.ts` currently has no `images.remotePatterns` — add one scoped to the Orchard/Blob Storage domain when this migration lands.

---

## 14. SEO

**Current implementation:** per-page `export const metadata: Metadata` objects (title template inherited from root layout, `defaultSiteDescription` shared from `lib/site.ts`, per-page OG/Twitter blocks), a hand-written `SchoolJsonLd.tsx` EducationalOrganization schema, `app/robots.ts`, and `app/sitemap.ts`. This is already reasonably solid — the main gaps are that per-page SEO fields are hardcoded (no non-technical control) and `sitemap.ts` (per the audit) lists the old `/contact` URL rather than the canonical `/request-information`.

**Recommended target state:**
- `Page.seo` object (§6) feeds `generateMetadata()` per route — title, description, OG image, canonical, noindex.
- `SchoolJsonLd.tsx` keeps its schema-shaping logic in code but sources its *values* (name, address, phone, socials) from the CMS Settings singleton instead of `lib/site.ts`.
- `sitemap.ts` calls `pageService.getAllSlugs()` to include every published CMS page automatically, fixing the current stale-URL issue as a side effect of the migration.
- `robots.ts` stays app-managed (rarely changes, low editorial value).

---

## 15. Roles and Permissions

Given the realistic size of this content team (a small private school office, not a marketing department), recommend a **simple two-role model** rather than a long approval chain:

```text
Administrator   (agency/developer) — Content Type schema, Orchard module config, hosting/ops
Content Editor  (school office staff) — create/edit/publish all content types
```

```text
Editor
  │
  ▼
Create/Edit Content
  │
  ▼
Publish directly
  │
  ▼
Production (custom publish-hook → revalidation, live within seconds)
```

Orchard Core's roles/permissions are built on ASP.NET Core Identity and are actually quite granular (per-Content-Type, per-module permissions) — more than enough for this two-role model, with room to add a **Reviewer** role later without any architecture change if a second staff member starts contributing regularly.

---

## 16. Proposed Architecture

```text
                    Orchard Core (self-hosted — Azure App Service + Azure SQL)
                    ┌──────────────────────────────────┐
                    │  Content Types/Parts · Media Lib  │
                    │  GraphQL API (Apis.GraphQL)       │
                    └────────────────┬───────────────────┘
                                     │ GraphQL (server-side only)
                                     ▼
                    ┌──────────────────────────────────┐
                    │   CMS Integration Layer (lib/cms) │
                    │   navigationService · pageService │
                    │   mediaService · seoService        │
                    │   settingsService                  │
                    └────────────────┬───────────────────┘
                                     │
                 ┌───────────────────┴────────────────────┐
                 ▼                                          ▼
        Navigation Service                          Page Service
                 │                                          │
                 ▼                                          ▼
        SiteHeader / SiteFooter                    app/*/page.tsx (today) →
        (recursive MenuItem render)                 app/[[...slug]]/page.tsx (target)
                                                              │
                                                              ▼
                                                     PageRenderer
                                                              │
                        ┌──────────────┬──────────────┬──────┴───────┬─────────────┐
                        ▼              ▼              ▼               ▼             ▼
                     HeroSection  FeatureGrid   TestimonialsSection  FAQSection  CTASection
                     (existing components, now CMS-driven via componentRegistry)

        Unrelated & unchanged:
        ContactForm.tsx → POST /api/contact → JotForm  (stays entirely outside the CMS)
```

**Frontend → CMS directly, no BFF.** This app has no existing backend service worth preserving as an intermediary — the one Route Handler it has (`/api/contact`) is a single-purpose external-form proxy, not a general API layer. Introducing a BFF here would add a hop and an extra deployable for zero benefit; the `lib/cms/*` integration layer inside the Next.js server already provides the single-choke-point and caching benefits a BFF would otherwise exist for. This holds regardless of the CMS behind it, including Orchard Core.

---

## 17. Migration Table

| Current File | Current Content | CMS Content Type | Migration Action |
|---|---|---|---|
| `SiteHeader.tsx` (`NAV_LINKS`) | 7 flat nav links | Menu (location: header) | **Done** (local-mock) |
| `SiteFooter.tsx` | 4 footer columns, ~20 links | Menu (location: footer-*) | **Done** (local-mock) |
| `lib/site.ts` | Name, address, phone, URLs, mission/vision/action, recognitions, microcopy | Settings singleton | **Done** (local-mock; `lib/site.ts` itself still used by a few app-owned files, see §19) |
| `HeroSection.tsx` | Heading, subhead, CTAs, hero image | Section: hero | **Done** |
| `MetricsSection.tsx` | 4 badge tiles | Section: metrics | **Done** |
| `WhyChooseSection.tsx`, `FeaturesSection.tsx` | Bullet/feature lists | Section: featureGrid | **Done** |
| `MissionSection.tsx` | Mission/Vision/Action cards | Section: missionVisionAction | **Done** |
| `GenesisSection.tsx`, `ResearchSection.tsx` | Card grids | Section: cardGrid | **Done** |
| `TestimonialsSection.tsx` | 3 quotes (unattributed) | Section: testimonials | **Done** (attribution still needs real names — content risk, not technical) |
| `CtaSection.tsx`, `HiringSection.tsx` | CTA copy/buttons | Section: cta | **Done** |
| `CommunitySection.tsx` | Photo grid, `fs.existsSync` gate | Section: community + Media | **Done** (also fixed the known broken-filename bug) |
| `faq-content.tsx`, `FaqSection.tsx` | 21 Q&As as JSX | Section: faq (rich text) | **Not started** — flagged as the one genuinely labor-intensive conversion (JSX → rich text) |
| `HeartAndMindSection.tsx` | Prose | Section: textSection | **Done** |
| `AboutSchoolContent.tsx`, `GenesisProjectContent.tsx`, `AcademicsHubContent.tsx`, `AwardsPageContent.tsx`, `CareersPageContent.tsx`, `DonatePageContent.tsx`, `LegalPageContent.tsx` | Page prose | Page + textSection | **Done** |
| `AdmissionsHubContent.tsx` | Tuition table, uniforms, extended care, office contact | Page + statisticsTable | **Done** |
| `lib/tuition.ts` | Tuition rates | statisticsTable content | **Superseded** — content now lives in `admissions.json`; file has no remaining importers but hasn't been deleted |
| `lib/school-history.ts` | Timeline milestones | Section: timeline | **Superseded** — content now lives in `about.json`; file has no remaining importers but hasn't been deleted |
| Per-page `metadata` in `app/*/page.tsx` | Title/description/OG | Page.seo | **Not started** — metadata blocks are still hardcoded per route; `Page.seo` exists in the data model but isn't wired to `generateMetadata()` yet |
| `SchoolJsonLd.tsx` | Org structured data | Values from Settings singleton | **Not started** |
| `app/sitemap.ts` | Static URL list | `pageService.getAllSlugs()` | **Not started** |
| `ContactForm.tsx`, `app/api/contact/route.ts`, `lib/contact-payload.ts`, `lib/contact-rate-limit.ts` | Form handling | — | **Do not move.** Not content. |
| `MarketingLink.tsx`, `MarketingShell.tsx`, `Button.tsx`, `Skeleton.tsx` | Shared UI primitives | — | **Do not move.** Presentation code, not content. |
| `next.config.ts`, `app/robots.ts` | Infra config | — | **Do not move.** |

Do not delete any hardcoded content from these files until the CMS-backed replacement has been verified in preview and production for each page.

---

## 18. Implementation Roadmap

```text
Phase 1  — Analyze existing hardcoded content                            ✅ Done
Phase 2  — Select CMS                                                     ✅ Done — Orchard Core
Phase 3  — Provision Orchard Core hosting (Azure App Service + Azure SQL);
           install/configure OrchardCore.Apis.GraphQL and Media modules
Phase 4  — Define Content Types in Orchard admin (or a Recipe) for Menu,
           MenuItem, Page, Settings, and the 12 section types from §7
Phase 5  — Build /lib/cms integration layer                               ✅ Done (local-mock;
           client/navigationService/pageService/mediaService/seoService/settingsService)
Phase 6  — Convert SiteHeader/SiteFooter to consume getNavigation() +
           recursive rendering; author the nested menu content in Orchard
                                                                            ✅ Done (local-mock)
Phase 7  — Convert MarketingHome.tsx to PageRenderer + componentRegistry;
           migrate home page section content into CMS documents          ✅ Done (local-mock)
Phase 8  — Migrate remaining pages (About, Academics, Admissions, Awards,
           Careers, Donate, Legal, Genesis deep-dive)                     ✅ Done (local-mock)
Phase 9  — Swap lib/cms/dataSource.ts's local-JSON reads for real Orchard
           GraphQL queries against the Content Types from Phase 4
Phase 10 — Replace the per-page route files with a single
           app/[[...slug]]/page.tsx catch-all + generateStaticParams()
           (closes the "new page needs a code change" gap — see prior
           discussion on this)
Phase 11 — Wire generateMetadata() to Page.seo; fix sitemap.ts to pull
           slugs from Orchard
Phase 12 — Enable cacheComponents; add 'use cache' + cacheTag to every
           CMS read; build the custom Orchard publish-hook module +
           app/api/cms-revalidate Route Handler (§4 gap 6, §11)
Phase 13 — Build the custom Draft Mode / preview flow (§4 gap 5, §12);
           assign editor accounts to school office staff
Phase 14 — Convert FAQ content (faq-content.tsx) to CMS rich text — the
           one remaining content type not yet modeled
Phase 15 — Content QA: verify every page renders identically (or better,
           per the known bugs called out in §13/§17) against real Orchard data
Phase 16 — Decommission the hardcoded lib/*.ts + local JSON mock only
           after CMS content is live-verified on production
```

---

## 19. Files/Components That Need Modification

`lib/cms/dataSource.ts` (local JSON reads → Orchard GraphQL calls — the primary remaining work), `app/*/page.tsx` route files → consolidate into `app/[[...slug]]/page.tsx`, `next.config.ts` (add `cacheComponents: true` and `images.remotePatterns` for the Orchard/Blob Storage domain), `SchoolJsonLd.tsx` (value source only), `app/sitemap.ts`, per-page `metadata` blocks (wire to `Page.seo`), `faq-content.tsx`/`FaqSection.tsx` (still pending conversion).

**Already modified and verified** (local-mock, see §21): `SiteHeader.tsx`, `SiteFooter.tsx`, `MarketingHome.tsx`, `MarketingShell.tsx`, every `*Content.tsx` component in `components/marketing/`.

## Files/Components That Should NOT Change

`ContactForm.tsx`, `app/api/contact/route.ts`, `lib/contact-payload.ts`, `lib/contact-rate-limit.ts`, `MarketingLink.tsx`, `MarketingShell.tsx`, `components/ui/Button.tsx`, `components/ui/Skeleton.tsx`, `app/error.tsx`, `app/loading.tsx`, `app/globals.css`, `app/styles/*.css`, `app/robots.ts`, `app/apple-icon.png` / `app/icon.png` / `app/favicon.ico`, `public/logo.png`.

---

## 20. Estimated Implementation Complexity by Phase

| Phase | Complexity | Notes |
|---|---|---|
| Orchard hosting provisioning (§18 Phase 3) | **High** — new for this org | No existing Azure/.NET footprint; needs an App Service, a SQL database, and someone to own both |
| Orchard Content Type definition (§18 Phase 4) | Medium-High | ~12 section types + Page + Menu + Settings, each defined by hand or via Recipe JSON |
| Integration layer (§18 Phase 5) | ✅ Done | Thin wrapper functions already built against the normalized content model |
| Header/Footer nav conversion (§18 Phase 6) | ✅ Done | First recursive menu rendering this app has had |
| Home + all 8 hub pages (§18 Phases 7–8) | ✅ Done | Verified via production build + rendered-HTML checks |
| Swap to real Orchard GraphQL (§18 Phase 9) | Medium | Isolated to `dataSource.ts`, but query shapes/testing take real time |
| Catch-all routing (§18 Phase 10) | Low-Medium | Mechanical once GraphQL data is flowing |
| SEO/sitemap wiring (§18 Phase 11) | Low | |
| Caching + custom publish-hook module (§18 Phase 12) | **Medium-High** | The webhook Sanity/Contentful give for free must be hand-built as an Orchard module |
| Custom preview/Draft Mode flow (§18 Phase 13) | **Medium-High** | No SDK to lean on, unlike Sanity's Presentation tool |
| FAQ rich-text conversion (§18 Phase 14) | Medium | 21 entries, JSX → structured rich text |
| QA + cutover (§18 Phases 15–16) | Medium | Manual content-parity review across 15+ routes |

---

## 21. Implementation Status — What's Actually Built (branch `CMSIntegration`)

This is the ground truth as of 2026-08-18, so it's not confused with the aspirational plan above.

**Built and verified (local JSON stand-in for the real CMS API):**
- `lib/cms/types.ts` — the full content model: `Settings`, `MenuItem`/`MenuItemNode`, `Page`, `PageSection` (a discriminated union covering all 20 section/page types across the whole site), and `ProseBlock` for mixed paragraph/list prose.
- `lib/cms/dataSource.ts` — reads local JSON under `lib/cms/data/` (`settings.json`, `navigation/*.json` for header + 4 footer locations, `pages/*.json` for all 9 pages). **This is the only file that needs to change to point at real Orchard Core** — every function signature (`fetchSettings`, `fetchNavigation`, `fetchPageBySlug`, `fetchAllSlugs`) is already exactly what the Orchard GraphQL version needs to implement.
- `lib/cms/{navigationService,pageService,settingsService}.ts` — the stable API every component calls; includes a small `{{settings.x}}` template resolver so shared values (phone, address, apply URL) live once and get substituted into page content at read time.
- `components/cms/{PageRenderer,componentRegistry}.tsx` — the registry pattern from §9, with 20 section/page types registered.
- Every page on the site — home, all 8 hub pages, header nav (with working nested dropdowns — new capability), and the full footer (brand blurb, Schwabe link, all link columns, bottom bar) — is CMS-driven through this layer.
- Verified via `next build` (every route still statically prerenders) and by grepping the actual rendered HTML for real content and correctly-resolved template values.

**Known, deliberate gaps (not yet done):**
- **FAQ content** (`faq-content.tsx`) is still JSX, not CMS data — flagged from the start as the one genuinely labor-intensive rich-text conversion.
- **Routing is still per-page files** (`app/about/page.tsx`, `app/admissions/page.tsx`, etc.), not the `app/[[...slug]]/page.tsx` catch-all from §9/§18 Phase 10. Practical effect: adding a brand-new page today still needs a matching route file and a `dataSource.ts` registration, even though the page's *content* is just JSON. Closing this gap is Phase 10.
- **SEO metadata** (`Page.seo`) exists in the data model but isn't wired to `generateMetadata()` yet — every route's metadata block is still hardcoded.
- **No real CMS connected yet.** Everything above runs on local JSON. Moving to Orchard Core is entirely about rewriting `dataSource.ts`'s function bodies to call Orchard's GraphQL API instead of importing local files — the content model, the components, and every page's rendering logic stay as-is.

---

## 22. Risks and Technical Concerns

- **Next.js 16 Cache Components is new to this codebase.** `cacheComponents` is not currently enabled; enabling it changes rendering behavior app-wide (Partial Prerendering becomes the default), not just for CMS-fetched data. Test thoroughly — this is a bigger behavioral shift than "add a CMS."
- **Orchard Core introduces real new infrastructure and an ops owner** (§4, gap 1) that this project has never had — budget and hosting decisions (Azure App Service + SQL) need to be locked down before Phase 3, not discovered mid-build.
- **The publish-webhook and preview flows are hand-built, not SDK-provided** (§4 gaps 5–6) — budget real development time here; these aren't configuration tasks the way they'd be with Sanity/Contentful.
- **Orchard's GraphQL coverage of the Menu content type should be spike-tested early** (§4, gap 4) before committing to it as the nav data source — if it's not sufficiently queryable in the target version, a custom Content Type may be needed instead of the built-in Menu feature.
- **Content-fact risks flagged in `docs/content-audit-renton-prep.md` (R1–R3)** — the unverified "Microsoft Flagship School" claim and unattributed testimonials — are content/legal risks independent of the CMS migration. Moving them into a CMS makes them *easier* to fix but does not fix them; resolve with the school owner before or during migration, not after.
- **The revalidate Route Handler needs its own auth** (a shared secret or signed request from the custom Orchard module) — this is the one new piece of attack surface this migration adds; don't trust the payload without verifying it.
- **FAQ content is currently JSX (`ReactNode`), not plain data** — converting 21 entries to rich text is the most labor-intensive single content-migration task, not a mechanical find-replace.
- **No existing `images.remotePatterns` config** — must be added for the Orchard/Blob Storage domain, or `next/image` will reject CMS-hosted images outright.

---

## 23. Final Recommended Architecture Diagram

```text
                    ┌─────────────────────────────────┐
                    │   Orchard Core (self-hosted)     │
                    │   Azure App Service + Azure SQL  │
                    │   Content Types/Parts · Media Lib│
                    │   GraphQL API (Apis.GraphQL)     │
                    └────────────────┬─────────────────┘
                                     │ GraphQL (server-only)
                                     ▼
                          ┌─────────────────────────┐
                          │  lib/cms integration     │
                          │  layer ('use cache' +    │
                          │  cacheTag per resource)  │
                          │  ✅ built — see §21       │
                          └────────────┬────────────┘
                     ┌──────────────────┴──────────────────┐
                     ▼                                       ▼
            navigationService                         pageService/seoService
                     │                                       │
                     ▼                                       ▼
        SiteHeader / SiteFooter                  app/[[...slug]]/page.tsx (target)
        (recursive MenuItem tree) ✅               app/*/page.tsx (current) ✅
                                                     → generateMetadata() (pending)
                                                     → PageRenderer ✅
                                                              │
                                          componentRegistry maps section.type
                                          → existing HeroSection, FeatureGrid,
                                            CardGrid, TestimonialsSection,
                                            CTASection, FAQSection, etc.  ✅

  ┌────────────────────────────────────────────────────────────────────┐
  │ Orchard Core admin                                                 │
  │  → Draft/Publish native; Preview + webhook are custom-built        │
  │  → Custom publish-hook module → app/api/cms-revalidate → revalidateTag() │
  └────────────────────────────────────────────────────────────────────┘

  ┌────────────────────────────────────────────────────────────────────┐
  │ Unchanged: ContactForm.tsx → POST /api/contact → JotForm            │
  │ (application data path — entirely outside the CMS)                  │
  └────────────────────────────────────────────────────────────────────┘
```
