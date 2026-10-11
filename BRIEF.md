# Samir Bagoudou — Portfolio: build brief

This bundle is a handoff for Claude Code. It contains a finished visual design and the content for a one-page personal portfolio. Your job is to turn it into a real, production-quality site.

## What's in here

| Path | What it is |
| --- | --- |
| `design/reference.html` | **The source of truth for the look.** A plain, self-contained HTML render of the design. Open it in a browser and match it. |
| `design/tokens.json` | Colours, fonts, type scale and layout values extracted from the design. |
| `design/Main.dc.html` | The original canvas source (a "Design Component" file with `{{accent}}` holes and a `<script type="text/x-dc">` block). Reference only; don't try to run it. |
| `design/canvas.json` | Canvas metadata. Reference only. |
| `content/profile.json` | All page copy as structured data. Render the page from this file rather than hard-coding text. |
| `assets/portrait.png` | Profile photo (1000×1000, light grey backdrop). |

## Recommended stack

Angular 18+ with standalone components, SCSS, and static prerendering (`@angular/ssr` prerender) so the site ships as static HTML that deploys anywhere (GitHub Pages, Netlify, Vercel, Cloudflare Pages). Angular is the owner's main frontend framework, so the codebase doubles as a showcase. If the owner asks for something else (React/Vite, Astro), keep everything else in this brief the same.

Suggested structure:

```
src/app/
  data/profile.ts            // typed import of content/profile.json
  sections/
    site-header/             // monogram + nav + "Get in touch"
    hero/                    // name, intro, CTAs, portrait figure
    fact-strip/              // 4 facts between two rules
    experience/              // ruled rows, one per role
    stack/                   // dark band, 6-cell grid of chip groups
    education-languages/     // two columns
    contact-footer/          // accent band, big headline, email pill
  styles/_tokens.scss        // CSS custom properties from tokens.json
```

## Page, top to bottom

1. **Header** — black circular "SB" monogram + `samir.bagoudou` in mono; nav links Experience / Stack / Education (in-page anchors) and a black pill "Get in touch" (`mailto:`).
2. **Hero** — two columns that wrap on narrow screens. Left: accent dot + mono line "Fullstack Software Engineer · Yvelines, France"; first name in heavy, expanded Archivo (wdth 125, wght 900); last name in Instrument Serif italic in the accent colour; intro paragraph; two pill buttons (filled accent "Start a conversation" → mailto, outlined "See my work" → #experience). Right: portrait at 4:5, `object-position: 50% 30%`, caption row underneath.
3. **Fact strip** — full-bleed ink rules top and bottom; 4 cells with thin vertical dividers; big value + small mono label.
4. **Experience** — heading + "(03) roles · 2018 — now"; each role is a row: accent index number, title + italic serif "at Company", summary, optional highlights grid, dates/place column on the right. Rows separated by light rules; first and last rules are ink.
5. **Stack** — dark band (`#121417`); heading "The *stack*"; 1px-gap grid of cells (auto-fit, min 280px), each with a mono label and outlined pill chips; last cell is "How I work" (soft skills).
6. **Education + Languages** — side by side, wrapping on mobile; languages show a thin accent progress bar.
7. **Contact footer** — accent background, white text; "Let's build *something* clean." in large type; white pill with email; bottom bar with name/location, GitHub, LinkedIn, Back to top.

## Requirements

- Match `design/reference.html` closely at 1440px, then make sure it holds up at 1024, 768 and 375px. Use the fluid `clamp()` sizes from tokens.
- The accent colour is a single CSS custom property (`--accent`), so it can be switched to one of the alternatives in `tokens.json`.
- Load fonts from Google Fonts with `display=swap` and proper fallbacks (or self-host them).
- Accessibility: semantic landmarks (`header`, `main`, `section`, `footer`), one `h1`, real links and buttons, visible `:focus-visible` styles, 44px minimum touch targets, alt text on the portrait, AA contrast, and `prefers-reduced-motion` respected if you add any motion (keep motion minimal).
- Smooth anchor scrolling with a sensible `scroll-margin-top` on sections.
- Optimise the portrait: serve AVIF/WebP at a few widths with `srcset`, set width/height to avoid layout shift.
- SEO basics: title, meta description, Open Graph/Twitter tags using the portrait, favicon (the "SB" monogram).
- Lighthouse target: 95+ on Performance, Accessibility, Best Practices and SEO.
- Add a short project README with run, build and deploy instructions.

## Open items for the owner

- GitHub and LinkedIn URLs are `[ADD URL]` placeholders in `content/profile.json`.
- The phone number from the CV is intentionally left off the public site.
- A projects/case-studies section could be added later; the experience row pattern would work for it.
