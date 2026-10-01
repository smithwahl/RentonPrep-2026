# Renton Prep Christian School — Website

The official marketing website for Renton Prep Christian School. Built with Next.js App Router, React 19, TypeScript, and Tailwind CSS.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| UI | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + custom CSS |
| Database | SQLite via Prisma ORM |
| Linting | ESLint 9 |

---

## Project Structure

```
renton-prep/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout + metadata
│   ├── page.tsx                # Homepage
│   ├── api/contact/route.ts    # Contact form API endpoint
│   ├── academics/
│   ├── about/
│   ├── admissions/
│   ├── awards/
│   ├── blog/
│   ├── careers/
│   ├── contact/
│   ├── donate/
│   ├── legal/
│   ├── request-information/
│   ├── robots.ts               # Robots.txt generation
│   └── sitemap.ts              # Sitemap generation
├── components/
│   ├── layout/                 # Header, footer, navigation
│   ├── marketing/              # Hero, CTAs, home sections
│   ├── sections/               # Shared page sections
│   └── ui/                     # Base UI primitives
├── lib/
│   ├── contact-payload.ts      # Form parsing and validation
│   ├── contact-rate-limit.ts   # Rate limiting logic
│   ├── facts/                  # FACTS admissions portal integration
│   ├── oneroster/              # OneRoster data integration
│   ├── school-history.ts       # Historical school data
│   ├── site.ts                 # Global site config
│   └── tuition.ts              # Tuition schedule data
├── prisma/
│   ├── schema.prisma
│   └── dev.db                  # SQLite dev database
├── public/                     # Static assets, images, badges
├── docs/                       # Internal documentation
├── types/                      # Shared TypeScript types
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm

### Install dependencies

```bash
npm install
```

### Set up environment variables

Copy the example file and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical site URL — must start with `https://` |
| `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics 4 measurement ID (format: `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_APPLY_URL` | Optional | External admissions portal URL (FACTS / RenWeb) |
| `DATABASE_URL` | Dev | Prisma database connection string |

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Use the local Menu API

With the Menu API running at `http://localhost:7210/api`, set these in `.env.local`:

```dotenv
CMS_MENUS_SOURCE=api
CMS_MENUS_API_URL=http://localhost:7210/api
```

Leave `CMS_SOURCE` unset (or empty) to keep pages on local JSON. The server fetches
`/menu/location/header` and the four `footer-*` locations; no browser CORS setup is
needed. Restart `npm run dev` after changing environment variables. If your deployed
Menu API requires a function key, also set `CMS_MENUS_API_KEY` (never `NEXT_PUBLIC_`).
Setting `CMS_SOURCE=api` later switches pages too and requires `CMS_PAGES_API_URL`.

---

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## Integrations

### Contact Form
- Endpoint: `POST /api/contact`
- Forwards submissions to JotForm (form ID: `260918035603050`)
- Includes rate limiting, honeypot spam protection, and input size limits (max 65 KB)

### Google Analytics 4
- Loaded via `next/script` in the root layout
- Only activates when `NEXT_PUBLIC_GA_ID` is set
- Uses `afterInteractive` strategy to avoid blocking page load

### FACTS / RenWeb
- External admissions portal linked via `NEXT_PUBLIC_APPLY_URL`
- Fallback URL is defined in `lib/site.ts`

### Prisma / SQLite
- Used for server-side data persistence
- Dev database: `prisma/dev.db`
- Run migrations: `npx prisma migrate dev`

---

## Security

Security headers are configured in `next.config.ts` and apply to all routes:

- **Content Security Policy (CSP)** — allowlists Google Analytics, Tag Manager, and Fonts; blocks all else
- **HSTS** — enforced for one year in production
- **X-Frame-Options: DENY** — prevents clickjacking
- **X-Content-Type-Options: nosniff**
- **Permissions-Policy** — disables camera, microphone, and geolocation
- **COOP / CORP** — same-origin isolation

---

## Key Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero, recognition, features, and CTA |
| `/about` | School mission, history, and leadership |
| `/academics` | Academics overview |
| `/admissions` | Admissions process and apply link |
| `/request-information` | Info request and contact form |
| `/the-genesis-project` | K-5 program overview |
| `/careers` | Employment opportunities |
| `/donate` | Giving page |
| `/legal` | Privacy policy and terms |

---

## Accreditation

Renton Prep is:

- **Cognia-accredited** K-12 school
- **First Cognia STEM-accredited** K-12 school in Washington state
- A **Microsoft Showcase School**

---

## Deployment

The project deploys to any Node.js-compatible host. Recommended platform: **Vercel**.

```bash
npm run build
npm run start
```

Make sure all production environment variables are set before running the build.

---

## Internal Docs

Documentation for developers and maintainers lives in `/docs`:

| File | Contents |
|---|---|
| `site-audit-frontend.md` | Frontend audit findings |
| `site-audit-backend.md` | Backend audit findings |
| `security-assessment.md` | Security review |
| `content-audit-renton-prep.md` | Content inventory |
| `implementation-report-remediation.md` | Resolved issues log |
| `remediation-plan-prioritized.md` | Open priorities |
| `api-contact-jotform.md` | JotForm API field mapping |

---

## License

Private. All rights reserved. Renton Prep Christian School.
