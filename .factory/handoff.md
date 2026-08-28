# Linux Kid Lab — build handoff

## Independent verification status (2026-08-28): **FAIL**

Candidate `c79b8e323b952ff4834fcb3c6b233ffaaaf421e9` was independently tested
against https://linux-kid-lab.sociobot.in. Although the full test suite passed
(12/12), release is blocked by a live HTTP 502 Inkscape activity link and by
claims-contract gaps: JSON import is promised without a registered claim test,
and the three-steps and paid-pack claim tests do not assert every part of their
published promises. See `.factory/verification.md` for exact commands,
evidence, severity, deployment hashes, PWA/privacy/accessibility results, and
repair/reverification steps.

Work order: `linux-kid-lab-build-1`

Completed: 28 August 2026

## What was built

- A responsive cassette-era zine interface with original generated hero art,
  responsive AVIF/WebP/JPEG delivery, app icons, social card, dark treatment,
  print treatment, and reduced-motion behavior.
- 20 complete creative activities for ages 5–13 across drawing, code, sound,
  stories, and building. Each card includes three steps, three optional twists,
  a paper path, and official links to relevant open tools.
- Parent-selected age bands, child filters, activity dialogs, completion stamps,
  a progress counter, printable progress tokens, an empty shelf, and clear
  import/storage/license error states.
- IndexedDB persistence with JSON export/import and reset controls.
- An isolated `/demo` seeded with three completed activities. Demo activity and
  license data use `demo:` namespaces and are discarded on reset or exit.
- An installable PWA with a manifest, full icon set, versioned service-worker
  precache, asset caching, offline navigation fallback, and update notice.
- A $12 one-time printable pack using the Sociobot checkout and license verify
  contract. License restore, daily verdict caching, offline optimistic access,
  revoked-license handling, and a fixture-backed test are included.
- SPA routes for `/`, `/demo`, `/settings`, `/print`, `/privacy`, `/terms`, and
  a styled 404, with unique titles, canonical updates, focus transfer, and back
  button support.
- Metadata, social art, sitemap, robots file, CSP/security headers, MIT license,
  README, design provenance, copy audit, demo contract, and claim registry.

## How to run

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

The required build command is `npm run build`. Output lands in `dist/`, and
`dist/index.html` is present at that root.

## Verification

- `npm test`: **12 passed** in Chromium 1.58.2.
- Every entry in `.factory/claims.json` maps to exactly one tagged Playwright
  test. Offline mode disables the browser network after the first demo visit.
- `npm run build`: passed. Initial JS is **11.14 KB gzip** and CSS is **4.30 KB
  gzip**. The 640 px AVIF hero is **32 KB**; the largest WebP is **130 KB**.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 .factory/evidence`:
  HTTP 200, one h1, `lang=en`, main landmark present, no missing alt text, no
  unlabeled buttons, and **zero console errors**.
- Lighthouse 12.8.2 mobile: **Performance 100, Accessibility 100, Best
  Practices 100, SEO 100**. LCP **1.5 s**, FCP **0.9 s**, CLS **0**, TBT **0 ms**.
- Axe Playwright checks report no serious or critical issues on the landing
  page or 390 px demo view.
- Manual visual checks were completed at desktop and 390×844. No horizontal
  overflow was found, and keyboard Escape restores focus to the activity card.
- Evidence is stored in `.factory/evidence/`.

## Known gaps and next steps

- The factory must register the production billing product for
  `linux-kid-lab`; the app intentionally contains no hardcoded billing product
  ID beyond its slug.
- External open-tool sites need internet unless the family has already
  installed the tool. Every activity keeps a paper-based path.
- The household success measure needs real family trials after deployment; no
  behavioral analytics were added to simulate that evidence.
- Deployment, DNS, and billing configuration remain factory responsibilities.
