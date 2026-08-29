# Linux Kid Lab — repair 4 handoff

## Result

**PASS — every finding in independent verification 4 is repaired and live.**

- Work order: `linux-kid-lab-repair-4`
- Verifier report commit: `a26fda5330f7bd42ed77399612da1a6a8eac3b0c`
- Repaired candidate: `2521d9383e861426fc930bc6c1860ad492d9dfd3`
- Production URL: <https://linux-kid-lab.sociobot.in>
- Azure Static Web App: `sf-linux-kid-lab` in `centralus`
- Deployment ID: `bb1987fc-e2ee-4122-814c-ff0566cf24eb`
- Deployed: 29 August 2026

## Reproduction and repairs

The controller's exact keyboard path was reproduced before editing at 390×844.
`Code a maze message` opened with focus on `.activity-dialog`; one immediate
Shift+Tab moved focus to the footer's `project notes (external)` link. Escape
then left the dialog open and did not restore the card.

The repair moves modal keyboard handling to one window-level listener. Tab and
Shift+Tab now wrap from the dialog container and its first and last controls.
If focus is moved outside while the modal is open, the next Tab is contained.
Escape closes the modal from any focus position and restores the exact opener.
The regression repeats immediate Shift+Tab, asserts focus on `Stamp it made`,
then forces focus outside and proves global Escape still closes and restores.

The candidate's complete 390px target audit also reproduced six failures:
`Print progress tokens` at 24.8px high, `Read the privacy note` at 17px,
paid-section `terms` at 16px, and the two contact links at 17px. A mobile rule
now gives every link, button, input, summary, select, textarea, and tabbable
control a 44×44px minimum. The regression audits all six product routes and an
open activity dialog instead of sampling selected controls.

The remaining findings were repaired at their source:

- The footer reads the version directly from `package.json`; it now shows
  `Version 1.0.2`. The manifest start URL uses the same version and a regression
  compares both against package metadata.
- The paid section and terms plainly state: “A one-time $12 pack license”. The
  price sticker also reads `$12 / one time`. The registered `paid-pack` claim
  and fixture-backed test now include this price statement. The unavailable
  checkout remains honest and does not render a dead buy link.
- Azure Static Web Apps maps `.avif` to `image/avif`; the response-policy test
  asserts the mapping, and production returns that MIME type with `nosniff`.
- “One tape. Many ways to make.” was replaced by a useful description of the
  illustration. The copy audit now includes that caption, both footer
  sentences, the version, and the revised price copy with word counts.
- The service-worker cache advanced from v7 to `linux-kid-lab-v8` so installed
  clients receive the repaired shell.

## Regression and claim evidence

From a clean dependency install:

```sh
npm ci                  # 22 packages, 0 vulnerabilities
npm test                # 27/27 Chromium tests passed
npm run build           # TypeScript and Vite passed; dist/ produced
git diff --check        # passed
```

There is no separate lint script. `npm run build` runs strict TypeScript before
the production bundle. This PWA is not a library or CLI, so package/consumer
installation is not applicable. It has no sign-in or product backend, so Entra
authority and backend persistence checks are not applicable.

Every literal command in `.factory/claims.json` was run independently after
`npm ci`: **18/18 passed**. The registry audit found 18 unique ids, 18 unique
test tags, exactly one test per claim, no missing tags, and no unregistered
tags. The valid-license path is a recorded fixture and makes no live purchase.

Production output remains inside budget:

- JavaScript: 32,128 bytes raw / 11.50 KiB gzip
- CSS: 17,645 bytes raw / 4.61 KiB gzip
- Mobile hero AVIF: 29,752 bytes
- Fonts: 0 bytes

## Browser, accessibility, privacy, and PWA evidence

- The production-browser suite covers normal activity, persistence, demo
  isolation, JSON import/export, invalid recovery, print, licensing, keyboard,
  offline, response policy, and the two exact regressions.
- A 28-check matrix covered seven routes, light and dark themes, desktop
  1440×900 and mobile 390×844, with reduced motion. Every check had one h1,
  one main, no horizontal overflow, zero animation/transition duration, and
  zero serious or critical axe findings.
- `/opt/fleet/lib/verify-url.sh` passed local production preview and live:
  HTTP 200, correct title and language, one h1, main, complete alt text, named
  buttons, and no page or console errors.
- Visual inspection passed on desktop and 390px. The mobile primary action ends
  at y=692.02 within the 844px first screen. The product identity and layout
  from `.factory/design.md` are preserved.
- A live audit of every rendered interactive target on `/`, `/demo`, settings,
  privacy, terms, and print found no box below 44×44px. The live reverse-Tab
  target was `Stamp it made`; Escape closed and restored the opener.
- Normal live activity and route use requested only the product origin. One
  explicit invalid-license submission made one documented request to the
  Sociobot verification endpoint, kept recovery visible, and logged no error.
- A 25-destination crawl covered every discovered internal, factory, project,
  mailto, and official-tool link. All HTTP destinations returned below 400.
- A fresh live service worker controlled `/demo`; offline reload retained 13
  sample cards and showed `You are offline. Saved activities still work.` The
  only cache was `linux-kid-lab-v8`, and there were no console errors.
- An isolated same-origin update server changed the served worker bytes. The
  worker activated, `controllerchange` fired, and the app showed `An update is
  ready. Reload to use it.`

Lighthouse 13 mobile results:

| Target | Performance | Accessibility | Best practices | SEO | FCP | LCP | CLS | TBT | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Local production preview | 100 | 100 | 100 | 100 | 1.0s | 1.3s | 0 | 0ms | 47 KiB |
| Live production | 100 | 100 | 100 | 100 | 0.9s | 1.1s | 0 | 0ms | 47 KiB |

## Response policy, billing policy, and deployment identity

Production returns HSTS, `nosniff`, strict-origin referrer policy,
Permissions-Policy, and the restrictive CSP with response-header
`frame-ancestors 'none'`. Hashed assets and images retain one-year immutable
caching. `sw.js` remains no-store. `/missing-tape` returns a styled HTTP 404.
The repaired mobile hero response is HTTP 200 with `Content-Type: image/avif`.

The live license endpoint returned 200 for requests 1–30 and 429 for request 31
with `Retry-After: 4` and `X-RateLimit-After: 4`. A product-origin request
received `Access-Control-Allow-Origin: https://linux-kid-lab.sociobot.in`; an
evil origin received no allowance. Both verification responses used
`Cache-Control: no-store`.

The deployment used `/opt/fleet/lib/deploy-static.sh linux-kid-lab dist` and
completed successfully at the existing Static Web App and custom domain.
Fresh local/live SHA-256 comparisons all matched:

| File | SHA-256 |
| --- | --- |
| `index.html` | `efe29d1948a56145d9a866275e77157eed854938520279f2e057af3b664118eb` |
| `assets/index-CLR3VsVX.js` | `f73be55ea8eba9adb494244e6a371565fa97c9bf711cc61a58707233804ab635` |
| `assets/index-BQ5SrD66.css` | `cc131b4de1c5b48ccc7fca8c894d889ce4c0b291b662d14247cb1ef97b666a36` |
| `sw.js` | `c356739033264c7fbe8634de6ef27976371e11cc86009ad08d5b607e140f6df4` |
| `manifest.webmanifest` | `8d56d9e28a4c596a35141e7a06bb0c624d92ee5ae905b78998f16dc8eb57ef4c` |
| `hero-cassette-640.avif` | `c9f52c5327a6ee2987c2ad93a56ecfe894d031b76abc69a55af66e1b56b654a0` |
| `404.html` | `dcfd6ba01889e9bf44a32f29048f265d3299ea83009a973b5186bafc22ea6b21` |
| `404.css` | `44d53dc3d91cb1b187669113bfff94134478dcd80f9ee44bb31101d42b5dcf35` |

## Known external limitation

The Sociobot billing product is still not registered, so the app correctly
shows that purchase setup is unavailable and renders no checkout link. Existing
license restore and verification remain available. Registering that billing
product is outside this static repository and was already an accepted external
limitation in the verified candidate.
