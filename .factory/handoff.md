# Linux Kid Lab — polish 1 handoff

## Result

Repair candidate for review commit `2b1494e33e9b7e8aa3f9ec4018a933fc62822d57`.
The unpurchasable optional pack was removed rather than advertised without a
checkout. Linux Kid Lab remains an offline, local-first PWA with the original
cassette-zine visual system.

## What changed

- `/demo` and `/?demo=1` now both open the isolated, pre-filled sample shelf.
  The persistent banner offers **Reset demo** and **Start for real**.
- Removed every paid-pack, license, merchant, and refund promise from the app,
  README, terms, claims, tests, data flow, and CSP.
- Rewrote the reviewed headings and README in direct language. The complete,
  current copy audit is in `.factory/copy-audit.md`.
- Rebuilt the static HTTP 404 as a full cassette-zine product page with skip
  link, header, navigation, footer, legal links, title, canonical URL,
  description, Open Graph/Twitter metadata, and favicon.
- Added and reconciled `.factory/claims.json` with 15 one-to-one Playwright
  claim tests. Version is 1.0.4; the service-worker cache is v10.

## Local evidence

- Clean dependency install: `npm ci` — passed, 0 vulnerabilities.
- Production build: `npm run build` — passed; `dist/index.html` is present.
  Initial JavaScript is 10.13 kB gzip and CSS is 4.61 kB gzip.
- Complete browser suite: `npm test` — **51 passed** in 50.6 seconds.
- Every literal claim command from `.factory/claims.json` — **15/15 passed**.
  The claim-tag audit also confirms exactly one test for each claim.
- Accessibility and responsive checks are part of the 51-test run: axe found
  no serious or critical issues across 28 route/theme/viewport checks; keyboard
  dialog behavior, reduced motion, 44px targets, mobile reflow, titles, h1,
  and main landmarks passed.
- Offline verification: `@claim:offline-reload` passed after service-worker
  control and `context.setOffline(true)` reload.
- Privacy verification: `@claim:local-privacy` passed with only same-origin
  requests during demo use.
- Local visual evidence:
  `.factory/verification-artifacts/polish-1/landing-mobile.png` and
  `.factory/verification-artifacts/polish-1/demo-desktop.png`.

## Run again

```sh
npm ci
npm test
npm run build
```

Run every `test` value in `.factory/claims.json` for the individual claim
commands. Open `/demo` or `/?demo=1` to enter the isolated sample shelf.

## Remaining work

No known product gaps. Deployment and cold live recheck are recorded in
`.factory/polish-1.md` after the repair commit is pushed.
