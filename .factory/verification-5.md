# Linux Kid Lab — independent verification 5

**Result: FAIL (release-blocking).**

Verified independently on 29 August 2026 for work order
`linux-kid-lab-verify-5`, candidate commit
`0ca7c7fcff0850f140c321e21556a3e739ff5cc1`, and production URL
<https://linux-kid-lab.sociobot.in>.

This is a fresh result. The deployment matches the candidate byte-for-byte
for every sampled release file. The prior deployment-only concern is not the
cause of this verdict. The candidate fails because its required complete test
command times out reproducibly.

## Release-blocking finding

### High — the required complete test suite does not pass

`npm test` produced **26 passed, 1 failed**. The test named `desktop and mobile
route matrix passes structure, reflow, reduced-motion, and axe checks in both
themes` exceeded the repository-wide 30-second Playwright timeout.

The isolated rerun also failed at 30 seconds while navigating to
`/print?demo=1`. This is reproducible, not a one-off full-suite interaction.
Failure artifacts are in
`test-results/app-desktop-and-mobile-rou-97695-d-axe-checks-in-both-themes-chromium/`.
The acceptance contract and repository definition of done require the complete
test command to pass, so no release may be accepted from this commit.

The product behavior covered by that test is not itself broken: a separate
live-browser harness completed all 28 combinations (seven routes, two
viewports, two themes) with zero structure, overflow, reduced-motion, serious
axe, or critical axe findings. The repair is to split the oversized test or
give that test a justified explicit timeout, then prove a fresh `npm test`
pass.

## Known product gap

### Medium — a visitor cannot buy the advertised one-time pack

The landing page advertises the one-time $12 activity pack but says purchase
setup is unavailable and intentionally renders no checkout link. Existing
license restore and verification work. This is honest and does not impair the
free 20-activity product, but the researched one-time monetization path is not
operational. Billing-product registration is external to this static repo.

## Mandatory first-read and demo gate: PASS

A cold live load answers all three required questions in plain words:

- What it does: `Pick one creative activity after school`.
- For whom: parents whose child needs a next step after a first learning app;
  the screen also names Linux families.
- What to click first: `Try it with sample data`, followed by `Loads a sample
  family’s activity shelf.`

At 390×844 the primary action ends at y=692, within the first viewport. It
opens `/demo` in one click. The destination immediately shows `Demo — sample
data, nothing is saved`, `Reset demo`, `Start for real`, 13 age-filtered
activity cards, and 3 of 20 completed activities. The cold desktop screenshot
is `.factory/evidence/live-cold-desktop.png`; fresh mobile and full-page
screenshots are in `.factory/verification-5-artifacts/`.

## Claims gate: 18/18 PASS

`.factory/claims.json` exists. It has 18 unique ids, 18 unique matching test
tags, exactly one test per id, no missing tags, and no unregistered tags.

The first pre-install command correctly could not start because a clean clone
had no dependencies (`tsc: not found`). After the required `npm ci`, every
literal command in the claims file ran independently against the demo entry
point and passed:

| Claim | Result |
| --- | --- |
| `offline-reload` | PASS, 1 test |
| `twenty-activities` | PASS, 1 test |
| `three-steps` | PASS, 1 test |
| `paper-alternatives` | PASS, 1 test |
| `local-progress` | PASS, 1 test |
| `demo-sandbox` | PASS, 1 test |
| `demo-indexeddb` | PASS, 1 test |
| `json-export` | PASS, 1 test |
| `json-import` | PASS, 1 test |
| `clear-progress` | PASS, 1 test |
| `open-tool-suggestion` | PASS, 1 test |
| `print-tokens` | PASS, 1 test |
| `local-privacy` | PASS, 1 test |
| `paid-pack` | PASS, 1 fixture-backed test |
| `no-accounts-or-ads` | PASS, 1 test |
| `local-age-bands` | PASS, 1 test |
| `license-privacy` | PASS, 1 fixture-backed test |
| `purchase-setup` | PASS, 1 test |

The live landing page and README claim cross-check found no unregistered
material product claim. Passing claim tests do not override the failed complete
test gate.

## Clean-checkout quality gates

- Initial state: clean `main` at the exact candidate SHA; `origin/main`
  matched it.
- `npm ci`: PASS; 22 locked packages installed; 0 vulnerabilities reported.
- Every `.factory/claims.json` command: PASS, 18/18.
- `npm test`: **FAIL; 26 passed, 1 timed out** in about 1.8 minutes.
- Isolated route-matrix rerun: **FAIL; timed out again at 30 seconds**.
- `npm run build`: PASS; `tsc --noEmit` and Vite produced `dist/`.
- `git diff --check`: PASS before report changes.
- There is no separate lint script.
- Node `v22.23.2`, npm `10.9.8`, Playwright `1.58.2`.

Production bundles are inside budget: JavaScript is 32,128 bytes raw / 11,483
bytes gzip; CSS is 17,645 bytes raw / 4,620 bytes gzip; the selected mobile
hero AVIF is 29,752 bytes; no web fonts load.

## Functional, boundary, and recovery evidence

- The demo starts with 13 visible activities and 3/20 complete. The registered
  all-age test exposes all 20.
- `Code a maze message` showed three concrete steps, a paper alternative, and
  the official Scratch link. `Give me another twist` changed `Add one repeat
  command` to `Include a safe wrong turn`.
- Completing that activity changed progress to 4/20, and the result survived a
  live reload.
- Live JSON export downloaded `linux-kid-lab-progress.json`, parsed as version
  1, and contained four completed records.
- Importing `{}` produced the specific recovery message. Importing a valid
  version-one boundary file with zero age bands succeeded and displayed the
  useful `Your shelf is empty` state with a `Choose age bands` action.
- Reset restored the sample to 13 cards and 3/20. `Start for real` navigated to
  `/`, removed the demo banner and database, created the separate
  `linux-kid-lab` database, and showed 0/20 real progress.
- Empty license submission triggered native required-field validation and made
  no request. An explicit invalid token made exactly one request to the
  documented Sociobot URL, kept the disclosure open, and showed a recovery
  message without a console error.
- A fresh crawl covered 25 discovered internal, factory, project, mail, and
  official-tool destinations. Every HTTP destination returned below 400.
- No AI feature is implied by this local activity launcher; the missed-leverage
  review found no justified AI addition.

This is a PWA, not a library or CLI, so clean consumer package installation is
not applicable. It has no sign-in, so Microsoft Entra authority verification
is not applicable. It has no product backend beyond the Sociobot license
endpoint tested below.

## Privacy, headers, endpoint allowance, and deployment identity

A fresh live demo flow recorded only the product origin while opening an
activity, changing its twist, completing it, reloading, exporting, importing,
resetting, and leaving demo mode. There were no analytics, external scripts,
CDN fonts, page errors, or unexpected console errors. The first cross-origin
request occurred only after explicit license verification and went only to
`api.sociobot.in`.

The license endpoint allowed requests 1–30 from one client. Request **31**
returned **429** with `Retry-After: 3` and `X-RateLimit-After: 3`; the observed
allowance is 30 requests per client window. A product-origin request received
`Access-Control-Allow-Origin: https://linux-kid-lab.sociobot.in`; an evil
origin received no allowance. Verification responses use `Cache-Control:
no-store`.

The live site sends HSTS, `nosniff`, strict-origin referrer policy,
Permissions-Policy, and a restrictive CSP. `frame-ancestors 'none'` is a
response header. Hashed JS/CSS and image assets use one-year immutable caching;
`sw.js` is no-store; HTML revalidates after 30 seconds. The AVIF has the correct
MIME type. `/missing-tape` is an HTTP 404 with the styled recovery page; its
normal failed-resource console diagnostic is the only console error observed
across the seven-route crawl.

Fresh local/live SHA-256 comparisons matched:

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

## PWA, accessibility, mobile, and performance

- Fresh live service-worker control used cache `linux-kid-lab-v8`. With the
  browser network disabled, `/demo` reloaded with 13 cards, 3/20 progress, and
  `You are offline. Saved activities still work.` No console error occurred.
- A same-origin update simulation changed the served worker bytes without
  changing product code. `controllerchange` fired and the visible status said
  `An update is ready. Reload to use it.`
- The manifest has standalone display, versioned start URL, product colors,
  192×192 and 512×512 icons, and a maskable 512×512 icon.
- `/opt/fleet/lib/verify-url.sh` passed live: HTTP 200, title, `lang=en`, one
  h1, main landmark, complete image alt text, named buttons, and no root page
  or console errors. Its JSON and screenshots are in
  `.factory/verification-5-artifacts/`.
- The independent 28-case live matrix covered seven routes, light/dark themes,
  desktop 1440×900, mobile 390×844, and reduced motion. It found one h1 and one
  main per route, no horizontal overflow, zero active animation/transition
  durations, and zero serious/critical axe findings.
- Every visible interactive target on six mobile routes measured at least
  44×44 CSS pixels. The activity dialog trapped immediate reverse-Tab, Escape
  closed it, and focus returned to the opener.
- The skip link is the first focus target, measures over 44px high, and shows a
  3px yellow outline plus 6px dark ring. Activating it moves the next keyboard
  stop into main content.
- Fresh Lighthouse 13 mobile results: Performance **95**, Accessibility **100**,
  Best Practices **100**, SEO **100**; FCP 0.9s, LCP 1.2s, CLS 0, TBT 260ms,
  Speed Index 0.9s, total transfer 66KiB. The first Lighthouse attempt suffered
  an environment browser-tab crash; an immediate retry with
  `--disable-dev-shm-usage` completed successfully. Raw evidence is
  `.factory/verification-5-artifacts/lighthouse-live.json`.

## Required repair and recheck

Split the 28-case route matrix or give only that test a justified explicit
timeout. Then rerun every claim command, the complete `npm test`, the exact
production build, and a fresh deployment-identity comparison. Do not mark the
candidate PASS until `npm test` exits zero.
