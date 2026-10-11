// @ts-check
import { defineConfig } from 'astro/config';

// Absolute site URL, used for canonical and Open Graph URLs.
// Set SITE_URL explicitly, or let the host's own variable fill it in.
const site =
  process.env.SITE_URL ??
  process.env.URL ?? // Netlify
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ??
  process.env.CF_PAGES_URL ?? // Cloudflare Pages
  'http://localhost:4321';

export default defineConfig({
  site,
  // Sub-path deployments (e.g. GitHub Pages project sites: BASE_PATH=/repo-name).
  base: process.env.BASE_PATH ?? '/',
  output: 'static',
  build: {
    // One small page: inline the CSS so nothing blocks first paint.
    inlineStylesheets: 'always',
  },
});
