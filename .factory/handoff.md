# Linux Kid Lab — repair handoff

- Work order: `linux-kid-lab-repair-1`
- Base verified: `d89bb41c01659cccd45bca2b8446037f183e3939`
- Repair code commit: `9949ac813d069551b63028dd1b66b402a79bf3e8`
- Completed: 28 August 2026

## Result

The three independent-verifier release blockers are repaired without changing
the researched brief, PWA artifact class, sample data, free shelf, or billing
flow.

- Replaced the unavailable `https://inkscape.org/` activity link with
  Inkscape's official GitHub releases destination:
  `https://github.com/inkscape/inkscape/releases/latest`. The regression test
  opens every activity, confirms each suggestion's approved official URL, and
  checks all eight distinct open-tool destinations return a 2xx/3xx response.
  All eight returned 200 during repair verification.
- Registered and tested the previously unlisted JSON import promise. The test
  uploads a version-one progress file into the isolated demo database, then
  observes the imported age band and completed activity on the shelf.
- Registered and tested the previously unlisted per-card open-tool promise.
- Strengthened `three-steps`: it now selects all age bands and opens all 20
  activity dialogs, asserting three steps in each.
- Strengthened `paid-pack`: it now asserts all 20 print cards and each of the
  four published weekend-mix entries.
- Released the repaired shell as version 1.0.1, manifest start URL `?v=2`, and
  service-worker cache `linux-kid-lab-v5`. Existing PWA installs therefore
  receive the new JavaScript instead of retaining the old v4 cache.

## How to run

```sh
npm ci
npm test
npm run build
npm run preview
```

`npm run build` runs TypeScript checking (`tsc --noEmit`) and writes the static
PWA to `dist/`, including `dist/index.html`. This is a static application, so
there is no publishable package or consumer-install check.

## Exact verification evidence

- Clean `npm ci`: 22 packages installed; `npm audit` reported zero
  vulnerabilities.
- All 11 exact commands listed in `.factory/claims.json` passed, including the
  new `@claim:json-import` and `@claim:open-tool-suggestion` commands.
- Full `npm test`: **14/14 Chromium tests passed**. This covers desktop,
  390×844 mobile layout, keyboard dialog Escape/focus restoration, demo
  isolation, import/export, privacy request interception, license fixture,
  all 20 activity dialogs, all tool URLs, and offline reload.
- `npm run build`: passed. Production gzip sizes are **11,124 B JavaScript**
  and **4,302 B CSS**; the 640px AVIF hero is 32 KiB.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 .factory/evidence`:
  HTTP 200, title, `lang=en`, one h1, main landmark, zero missing image alt
  text, zero unnamed buttons, and zero browser errors.
- Playwright axe at 390px with reduced motion: **7/7** routes (`/`, `/demo`,
  `/settings`, `/print`, `/privacy`, `/terms`, and a 404) had no serious or
  critical findings and no horizontal overflow.
- Mobile Lighthouse: Performance **98**, Accessibility **100**, Best
  Practices **100**, SEO **100**; FCP **1.51 s**, LCP **2.15 s**, CLS **0**,
  TBT **0 ms**. Fresh report and screenshots are in `.factory/evidence/`.
- PWA smoke check: `/demo` is controlled by `/sw.js` with the
  `linux-kid-lab-v5` cache. The offline claim test loads the seeded demo,
  disables its browser network, reloads successfully, and shows the sample
  shelf.
- Privacy: the `local-privacy` claim test records the normal demo activity
  flow and permits only the app's same-origin requests. No analytics or
  third-party assets are introduced.

## Deployment and follow-up

The configured static deployment artifact was built from `dist/` and `main`
was pushed to `origin` at `cc2f336`. The factory's public edge had not
propagated during the repair window: repeated checks still returned the prior
`linux-kid-lab-v4` worker and app hash
`49258e07141019ed27145265c7ea1eaee6cd8b2b33bdb3add7e507b16fb0e46d`, rather
than this repair's v5 worker and local app hash
`eaf9bfcf4eb5af9562f6838789cf321a63f1dba492a61feb4c610e3cf9af2851`.
The pushed repository is buildable and ready for the configured static
publisher; once that external propagation completes, verify live `/demo`, the
v5 worker, and the matching asset hash.

Live response-policy smoke checks still passed: the Sociobot verification
endpoint allowed only `https://linux-kid-lab.sociobot.in` as the browser
origin, and a 40-request invalid-license burst returned 29 × 200 and 11 ×
429. The repaired official Inkscape releases URL returned 200.

There are no product-code known gaps. External tool websites necessarily need
internet when a family chooses an open-tool link; every activity retains its
paper path. The only remaining operational item is static-edge propagation;
production billing registration and infrastructure remain factory
responsibilities.
