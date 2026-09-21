# Image assets needed

- `og-default.jpg` (1200×630) — default Open Graph / Twitter share image referenced by `siteConfig.ogImage` in `src/lib/constants.ts`. Until added, `openGraph`/`twitter` meta tags will point to a missing file — replace before launch.
- `logo.png` — referenced in `src/lib/structured-data.ts` Organization schema (`logo` field). Replace with the real Nalam Software logo.
- `hero-poster.jpg` — done. A real still frame extracted from `hero-background.mp4`, used as the `<video>` poster while it loads. `hero-poster.svg` (the old gradient placeholder) is unused now but left in place; safe to delete.
- `favicon.ico` — currently the default Next.js icon at `src/app/favicon.ico`. Replace with the Nalam Software favicon.
