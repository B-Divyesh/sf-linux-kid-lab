# Linux Kid Lab — polish 2 handoff

## Result

**PASS.** Every finding in Review 1 and Review 2 is closed. Linux Kid Lab
remains a static offline PWA with its cassette-era zine visual system.

- Review base: `b901f6167daabab713713b76060fa5ffe3e6a5cd`
- Deployed repair: `bf4b6d29f3baca8c0dcbec7c2a39ce922b8c7e0f`
- Azure deployment: `7926acc3-78c1-42e8-be3f-0339f56cef0b`
- Live URL: <https://linux-kid-lab.sociobot.in>

## What changed

- The first-screen sample action uses the isolated `/?demo=1` route. The
  populated sample, persistent banner, Reset demo, and Start for real work on
  both demo URLs. Demo navigation stays isolated and exit deletes demo data.
- Added observable `free-activities` and `real-indexeddb-storage` claims and
  tests. All 17 claims have exactly one matching Playwright tag.
- Replaced “open tool” with “creative app” throughout the product and tests.
- Rebuilt the copy audit with one row per sentence and machine-checked counts.
- Added route-wide description, canonical, Open Graph, and Twitter updates;
  deterministic top scroll; h1 focus; polite announcements; and legal-link
  checks. The complete HTTP 404 now also links the PWA manifest.
- Removed dormant paid-pack/license styles left after the honest paid-offer
  removal. No checkout, merchant, refund, or artwork-origin promise remains.
- Updated the product to 1.0.5, cache v11, and a 74-character verb-first
  catalog description.

The complete finding-by-finding map is in `.factory/polish-2.md`.

## Clean-clone evidence

A new clone of commit `bf4b6d2` was created at an empty temporary path.

- `npm ci`: passed; 22 packages; zero vulnerabilities.
- Every literal command from `.factory/claims.json`: **17/17 passed
  individually**.
- `npm test`: **60/60 passed** in about 1.1 minutes.
- `npm run build`: passed; `dist/index.html` is at the root.
- Build output: 10.38 kB gzip JavaScript and 4.29 kB gzip CSS. The selected
  mobile hero AVIF is 29,752 bytes.
- The suite includes 28 local route/theme/viewport axe scans, dialog keyboard
  handling, focus/history, 44 px mobile targets, reduced motion, responsive
  overflow, titles/metadata/legal links, real 404 configuration, privacy
  request logging, and a service-worker offline reload.

The exact work-order build command, `npm ci && npm test && npm run build`, also
passed in the deployment workspace immediately before upload.

## Production evidence

- Factory URL verification passed on `/` and `/?demo=1`: HTTP 200, correct
  title/lang, one h1/main, complete alt text, named buttons, and zero console
  or page errors. Reports are under
  `.factory/evidence/polish-2/live-root/verify.json` and
  `.factory/evidence/polish-2/live-demo/verify.json`.
- A fresh 390×844 browser found the primary action fully visible at y=712.16.
  `/?demo=1` showed 13 cards and 3/20 progress; Reset restored 3/20; demo use
  left real progress at zero; Start for real removed the demo database.
- Seven live routes returned 200 with route-specific title/canonical metadata,
  one h1/main, legal footer links, no horizontal overflow, and no console
  errors. Browser Back restored the home h1 focus, announcement, and y=0.
- Fourteen live axe scans covered all seven routes in light and dark mode at
  390×844 with reduced motion. Serious/critical findings: **0**.
- Normal live demo use sent requests only to
  `https://linux-kid-lab.sociobot.in`. The controlled live demo reloaded
  offline with its heading and all 13 visible cards.
- `/missing-tape` returned HTTP 404 with the cassette design, title,
  description, canonical, manifest, one h1/main, Privacy/Terms links, and no
  unexpected console error.
- All eight creative-app links plus Param Factory and project notes returned
  HTTP 200.
- Live Lighthouse: Performance **100**, Accessibility **100**, Best Practices
  **100**, SEO **100**; FCP 0.9 s, LCP 1.2 s, TBT 0 ms, CLS 0.
- Live and local SHA-256 values match for `index.html`, `sw.js`, the manifest,
  hashed JavaScript, and hashed CSS. The detailed live result is
  `.factory/evidence/polish-2/live-check.json`; screenshots and Lighthouse JSON
  are in the same evidence directory.

## Run and verify

```sh
npm ci
npm test
npm run build
```

Then run each `test` command in `.factory/claims.json`. Open `/?demo=1` for the
isolated sample path and `/missing-tape` for the real HTTP 404.

## Known gaps and next steps

None.
