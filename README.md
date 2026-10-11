# Samir Bagoudou — Portfolio

A one-page personal portfolio, built as a fully static site with [Astro](https://astro.build). It ships plain HTML and CSS with no client-side JavaScript. All copy comes from [`content/profile.json`](content/profile.json).

The original design handoff is kept in [`BRIEF.md`](BRIEF.md) and [`design/`](design/). `design/reference.html` is the visual source of truth.

## Requirements

- Node.js 22.12 or newer (see `.nvmrc`)
- npm

## Run locally

```sh
npm install
npm run dev        # http://localhost:4321, with hot reload
```

## Build

```sh
npm run build      # type-checks (astro check), then writes the static site to dist/
npm run preview    # serves dist/ at http://localhost:4321
```

The build crops the portrait to 4:5 and writes AVIF, WebP and JPEG versions at 360, 480, 690 and 800px wide. Fonts are self-hosted (Archivo variable, Instrument Serif italic, JetBrains Mono) and the two used in the hero are preloaded. CSS is inlined into the page.

### Environment variables

| Variable    | Purpose                                                                   | Default                 |
| ----------- | ------------------------------------------------------------------------- | ----------------------- |
| `SITE_URL`  | Absolute site origin, used for canonical and Open Graph URLs               | host-provided, see below |
| `BASE_PATH` | Sub-path the site is served from, e.g. `/portfolio` for a GitHub project page | `/`                     |

If `SITE_URL` is not set, the build uses the URL that Netlify (`URL`), Vercel (`VERCEL_PROJECT_PRODUCTION_URL`) or Cloudflare Pages (`CF_PAGES_URL`) provides, and falls back to `http://localhost:4321`. **Set `SITE_URL` to the real domain for production**, otherwise social previews point to the wrong host.

## Deploy

`dist/` is a plain static folder and works on any static host.

- **GitHub Pages:** `.github/workflows/deploy.yml` builds and deploys on every push to `main`. One-time setup: in the repo, go to *Settings → Pages* and set *Source* to *GitHub Actions*. The workflow fills in `SITE_URL` and `BASE_PATH` for you.
- **Netlify:** build command `npm run build`, publish directory `dist`.
- **Vercel:** import the repo; it detects Astro automatically.
- **Cloudflare Pages:** framework preset *Astro*, build command `npm run build`, output `dist`.

Add `SITE_URL=https://your-domain` in the host's environment settings when you use a custom domain.

## Editing content

- **Copy:** edit `content/profile.json`. Every section renders from it.
- **GitHub / LinkedIn:** edit `links`. A link that isn't a real `https://` URL is left off the page.
- **Portrait:** replace `assets/portrait.png`, or point `portrait` at another file in `assets/`.
- **Accent colour:** change `--accent` in `src/styles/tokens.css`. The alternatives from the design are `#C2410C`, `#0F766E` and `#121417`.
- **Social card:** `public/og.jpg` (1200×630) is rendered from `profile.json`. Run `npm run og` after changing the name, title, email or portrait. It uses your installed Google Chrome; set `CHROME_PATH` to use another Chromium.

## Project structure

```
content/profile.json          page copy (source of truth)
assets/portrait.png           original portrait, optimised at build time
public/                       favicon, apple-touch-icon, og.jpg, robots.txt
scripts/og-card.mjs           renders public/og.jpg
src/
  data/profile.ts             typed access to profile.json + helpers
  layouts/Base.astro          <head>: SEO, Open Graph/Twitter, JSON-LD, fonts
  pages/index.astro           assembles the sections
  components/
    SiteHeader.astro          monogram, nav, "Get in touch"
    Hero.astro                name, intro, CTAs, portrait
    FactStrip.astro           4 facts between two rules
    Experience.astro          ruled role rows
    Stack.astro               dark band, chip grid, "How I work"
    EducationLanguages.astro  two columns
    ContactFooter.astro       accent band, email pill, links
  styles/
    tokens.css                design tokens as CSS custom properties
    global.css                base styles, focus, shared utilities
```

## Accessibility and quality notes

- Landmarks (`header`, `nav`, `main`, `section`, `footer`), a single `h1`, and a skip link.
- Visible `:focus-visible` rings, with a white ring on the accent footer.
- All interactive targets are at least 44px tall.
- Text meets WCAG AA contrast.
- Smooth anchor scrolling and hover transitions are turned off under `prefers-reduced-motion`.
- Lighthouse on the production build at handoff: Performance 99 (mobile) / 100 (desktop), and 100 for Accessibility, Best Practices and SEO.

## Open items

- The phone number from the CV is intentionally left off the public site.
- A projects/case-studies section could reuse the experience row pattern.
