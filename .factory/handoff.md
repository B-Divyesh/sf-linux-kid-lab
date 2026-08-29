# Linux Kid Lab — repair handoff

- Work order: `linux-kid-lab-repair-2`
- Base verifier report: `c1896584636b9ee523aefa2b6d9c85c49cfadbce`
- Repaired candidate: `881d843114ca56aabd5607f99f6ac7b1acdeb4f6`
- Repair commit: `45f2077510b641935be7f9b109dcd4cdc07a1bff` (followed by this handoff commit)
- Live URL: <https://linux-kid-lab.sociobot.in>
- Deployed: 29 August 2026, Azure Static Web Apps deployment `64ea3e9a-c13e-4fa8-8a90-ea31aa2797c1`

## Repaired findings

1. At 390×844, the responsive grid now orders copy, demo action, facts, then
   illustration. Live mobile measurement places the bottom of **Try it with
   sample data** at y=692; the new regression test fails if it leaves the
   first screen.
2. Dark palette foregrounds are now explicit for stickers, captions, progress
   labels, privacy labels, and selected age settings. Playwright axe found no
   serious or critical result on `/`, `/demo`, `/settings`, `/privacy`,
   `/terms`, or `/print` at 390px with dark scheme and reduced motion.
3. The Sociobot checkout product remains unregistered and returns 404. The
   static product cannot register or alter billing. The app no longer ships a
   dead purchase link or price promise; it plainly says purchase setup is
   unavailable, while valid-license restore and the 20-card pack remain
   working and covered by the fixture test.
4. Every registered claim begins from `/demo`, including the activity and
   open-tool claims. Added claims and fixture coverage for no accounts/ads/chat
   or behavior tracking, persisted age bands, and the explicit license request
   going only to Sociobot billing.
5. Invalid-license feedback keeps its disclosure open across rerenders.
   Header, footer, open-tool, and age-checkbox controls now provide 44px
   targets at 390px.
6. Static delivery uses hashed Vite JS/CSS plus a v6 worker that discovers and
   precaches those hashed assets. Azure sends immutable one-year caching for
   `/assets/*`, while `sw.js` is no-cache. Explicit SPA route rewrites allow
   unknown paths to return `404.html` with HTTP 404 rather than a soft 200.

## Verification

Ran from a clean dependency install:

```sh
npm ci
npm test                 # 23/23 Chromium tests passed
npm run build            # TypeScript check and dist/ build passed
```

All 14 exact commands listed in `.factory/claims.json` passed separately,
including the newly added `no-accounts-or-ads`, `local-age-bands`, and
`license-privacy` fixtures.

`/opt/fleet/lib/verify-url.sh https://linux-kid-lab.sociobot.in/ ...` passed:
HTTP 200, title, `lang=en`, one h1, main landmark, image alt text, labelled
buttons, and no console errors. The CLI `@axe-core/cli` could not start its
Selenium Chrome binary in this worker; the repository's Playwright axe
integration ran instead, locally and against the live dark mobile routes.

Live checks:

- `/missing-tape` returns HTTP 404 and serves the designed 404 page.
- `/demo` returns 200; service worker control is true; after network disable
  it reloads with 13 cards and the sample heading.
- Live dark-theme axe: 6 routes, no serious/critical violations; CTA bottom
  at 692px on a 390×844 viewport; no captured console errors.
- Security headers include CSP, `nosniff`, and strict-origin referrer policy.
  Hashed JS returns `Cache-Control: public, max-age=31536000, immutable`; the
  service worker returns `no-cache, no-store, must-revalidate`.
- SHA-256 identity matched local `dist/` and live `index.html`, `sw.js`,
  `manifest.webmanifest`, generated JS/CSS, `404.html`, hero AVIF, and social
  image.
- Mobile Lighthouse: Performance 100, Accessibility 100, Best Practices 100,
  SEO 100; LCP 1.1s, CLS 0, TBT 0ms.

## Known external limitation

The live billing endpoint
`https://api.sociobot.in/api/v1/products/linux-kid-lab/checkout` still returns
404 (`enabled factory product`). No billing or payment provider configuration
was changed from this repository. Registering that product with Sociobot is
needed before a purchase CTA can honestly return; until then the UI keeps the
free product fully usable and retains existing-license restoration.
