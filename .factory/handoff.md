# Linux Kid Lab — polish 1 handoff

## Result

Repair commit `91b48ae7372fd3e3a54824c1b5300401a06f3d53` for review commit
`2b1494e33e9b7e8aa3f9ec4018a933fc62822d57`.
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

## Deployment and cold live evidence

- Deployed `dist/` with the factory static deploy configuration on 29 August
  2026. Azure deployment `bda43591-af64-4a8f-837d-5f69be08e1f3` completed
  successfully to `https://lemon-bay-084d0d310.7.azurestaticapps.net`, with
  the custom domain ready at `https://linux-kid-lab.sociobot.in`.
- Factory URL verification on a cold live root load: HTTP 200, 603 ms, no
  console/page errors, `lang="en"`, one h1, main landmark, zero missing image
  alt attributes, and zero unlabeled buttons. Evidence:
  `.factory/verification-artifacts/polish-1/live-root/verify.json`.
- Cold live browser checks: `/`, `/?demo=1`, `/demo`, `/privacy`, and `/terms`
  each returned 200 with the expected route title, one h1/main, and no console
  errors. `/?demo=1` and `/demo` both showed the demo banner and **Reset demo**.
  `/missing-tape` returned HTTP 404 with its static title, one h1/main, and no
  console errors.
- Live `/?demo=1` serious/critical axe check found zero violations. Screenshot:
  `.factory/verification-artifacts/polish-1/live-demo/screenshot-desktop.png`.
- Live Lighthouse (mobile): performance **100**, accessibility **100**, LCP
  **1,050 ms**, and CLS **0**. Evidence:
  `.factory/verification-artifacts/polish-1/lighthouse-live.json`.

## Run again

```sh
npm ci
npm test
npm run build
```

Run every `test` value in `.factory/claims.json` for the individual claim
commands. Open `/demo` or `/?demo=1` to enter the isolated sample shelf.

## Remaining work

No known gaps.
