# Linux Kid Lab — independent verification 7

**Result: PASS.**

Verified independently on 29 August 2026 for work order
`linux-kid-lab-verify-7`, candidate commit
`1158ffffb4003a5165a2febf60c792f3d3ae7e57`, and production URL
<https://linux-kid-lab.sociobot.in>.

This result comes from a fresh candidate checkout and fresh browser contexts.
The live deployment matches the candidate byte-for-byte for every sampled
release file. The complete free product performs the brief's smallest useful
job. The researched paid pack is not shipped, but no unavailable purchase is
advertised and the complete 20-activity shelf remains free.

## Mandatory first-read and demo gate — PASS

A cold production load answers all three questions in the first screen:

- What it does: **“Pick one creative activity after school.”**
- For whom: **“For parents whose child needs a next step after their first
  learning app.”** The screen also says it is for Linux families.
- What to click: **“Try it with sample data”**, beside **“Loads a sample
  family’s activity shelf.”**

At 390×844 in dark mode, the action ended at y=712.2 and remained wholly above
the fold. One click opened `/demo`, where the persistent **“Demo — sample data,
nothing is saved”** banner, **Reset demo**, **Start for real**, 13 age-filtered
cards, and 3/20 completed activities were immediately visible. Evidence:

- `.factory/evidence/live-first-read-desktop.png`
- `.factory/evidence/live-mobile-dark-reduced.png`
- `.factory/evidence/live-demo-mobile-dark-reduced.png`

## Claims gate — 15/15 PASS

`.factory/claims.json` exists. After the required clean `npm ci`, every literal
`test` command was run independently against the shipped `/demo` entry point.
Every command passed. A second consolidated run produced machine-readable
evidence at `.factory/evidence/claims-results.json` and passed 15/15 in 32.9 s.
The manifest/tag audit found exactly one `@claim:<id>` test for each entry and
no extra claim tags.

| Claim | Result |
| --- | --- |
| `offline-reload` | PASS |
| `twenty-activities` | PASS |
| `three-steps` | PASS |
| `paper-alternatives` | PASS |
| `local-progress` | PASS |
| `demo-sandbox` | PASS |
| `demo-indexeddb` | PASS |
| `json-export` | PASS |
| `json-import` | PASS |
| `clear-progress` | PASS |
| `open-tool-suggestion` | PASS |
| `print-tokens` | PASS |
| `local-privacy` | PASS |
| `no-accounts-or-ads` | PASS |
| `local-age-bands` | PASS |

The live landing page and README were cross-checked against the manifest. Their
material count, content, offline, persistence, privacy, demo-isolation,
import/export, clearing, print, and age-band statements are covered. No
unlisted material product claim was found.

## Clean-checkout quality gates

- Candidate identity: local `HEAD`, `main`, and `origin/main` all resolved to
  `1158ffffb4003a5165a2febf60c792f3d3ae7e57` before report changes.
- `npm ci`: PASS; 22 locked packages installed, 0 vulnerabilities.
- Every literal claim command: PASS, 15/15.
- `npm test`: PASS, **51/51** Chromium tests in 1.4 minutes.
- `npm run build`: PASS; `tsc --noEmit` and Vite produced `dist/index.html`.
- No separate lint script exists. Type checking is part of the exact build.
- Node `v22.23.2`, npm `10.9.8`, Playwright `1.58.2`.
- Final build: JS 28,150 B raw / 10.13 kB gzip; CSS 17,645 B raw /
  4.61 kB gzip. The mobile hero AVIF is 29,752 B. There are no web fonts.

## End-to-end, boundary, and recovery evidence

A fresh live desktop demo was exercised without test fixtures:

- Initial state: ages 8–13, 13 visible cards, and 3/20 completed.
- `Code a maze message` showed three concrete steps, a paper alternative, and
  an official tool link. **Give me another twist** changed the prompt.
- Stamping the activity changed progress to 4/20; reload retained it.
- JSON export parsed as version 1 and contained four completion records.
- Importing `{}` displayed the specific recovery message that the file was not
  a Linux Kid Lab export.
- Importing a valid boundary file with no age bands produced **Your shelf is
  empty** and a **Choose age bands** recovery action.
- **Reset demo** restored 3/20. **Start for real** deleted
  `demo:linux-kid-lab`, opened `/`, created `linux-kid-lab`, and showed 0/20.
- Browser back and forward restored `/demo` and `/settings?demo=1`; route
  changes moved focus to the new h1.
- A crawl checked 19 unique network links. Every HTTP destination returned
  2xx/3xx; `mailto:` links were recognized, and `/missing-tape` correctly
  returned 404.

There is no product backend, sign-in, library, CLI, or runtime AI feature.
Backend concurrency/health, consumer package, Entra authority, and AI gateway
checks therefore do not apply. Import/export already covers the obvious local
data-portability need.

## Privacy, response headers, allowance, and deployment identity

A fresh production flow recorded 30 requests while opening and changing an
activity, completing it, reloading, exporting, importing invalid and boundary
files, resetting, and leaving demo mode. Every request origin was exactly
`https://linux-kid-lab.sociobot.in`. There were no analytics, third-party
scripts, CDN fonts, console errors, or page errors.

The candidate contains no server-side endpoint, product-unlock call, checkout,
or license verification request. Therefore there is no API request allowance
or 429 boundary to exercise. Source search and the live request log both
confirm this is a static local-first PWA.

Playwright observed these root response headers:

- CSP: `default-src 'self'`; scripts, styles, connections, and fonts are
  same-origin; objects are blocked; `frame-ancestors 'none'` is in the header.
- HSTS: `max-age=10886400; includeSubDomains; preload`.
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

HTML revalidates after 30 seconds. Hashed JS/CSS and images have one-year
immutable caching. `sw.js` is `no-cache, no-store, must-revalidate`. AVIF and
the web manifest have their correct MIME types. The styled unknown route is a
real HTTP 404. `/opt/fleet/lib/verify-url.sh` passed with HTTP 200, 700 ms load,
no errors, `lang=en`, one h1, a main landmark, complete image alt text, and no
unnamed buttons. Evidence: `.factory/evidence/verify-url/verify.json`.

Fresh local/live SHA-256 comparisons matched:

| File | SHA-256 |
| --- | --- |
| `index.html` | `8b62e3a68c199b39d5c5802841323470537fdc095d063c6db2562288aa593626` |
| `assets/index-xsg801eN.js` | `a4009f8187801723c353b8e7f47f4876b0542b8995c732497bdb0c8216e2a39f` |
| `assets/index-BQ5SrD66.css` | `cc131b4de1c5b48ccc7fca8c894d889ce4c0b291b662d14247cb1ef97b666a36` |
| `sw.js` | `f5c0738ac72386008e859f38aa35c532c204f3da583d8052113e0aefcaa964cc` |
| `manifest.webmanifest` | `14104cfb2a759f5279caf1018998307678bf103478d5f6a9fb125a16c27e7a83` |
| `hero-cassette-640.avif` | `c9f52c5327a6ee2987c2ad93a56ecfe894d031b76abc69a55af66e1b56b654a0` |
| `404.html` | `d9f4fc8a0d4975e9e101ad4f37726e50b6dd9f1fa12ea32c969a8e8edccace46` |
| `404.css` | `92c528835cec9cd13e4bb6cae804c0b6274f1c05ca79f0548b6a32fa0e33f9fa` |

## PWA, accessibility, mobile, and performance

- The live worker controlled `/demo` and created only
  `linux-kid-lab-v10`, with 20 cached shell/asset entries.
- After network disable, live `/demo` reloaded with 13 cards, 3/20 progress,
  and **“You are offline. Saved activities still work.”** No error occurred.
  Evidence: `.factory/evidence/live-demo-offline-mobile.png`.
- A controlled same-origin worker-byte update moved from `qa-a` to `qa-b`,
  fired `controllerchange`, and displayed **“An update is ready. Reload to use
  it.”**
- The manifest uses standalone display, a versioned start URL, product colors,
  192×192 and 512×512 icons, and a 512×512 maskable icon. The social image is
  1200×630.
- A live 390×844 dark/reduced-motion matrix covered `/`, `/demo`, parent
  setup, privacy, terms, print, and the 404. All seven had one h1/main, no
  horizontal overflow, zero active animation/transition durations, zero
  serious/critical axe findings, and zero console/page errors.
- Keyboard-only use passed: the skip link is first, 44.8 px high, and has a
  3 px yellow outline plus 6 px contrasting ring; the next Tab after activation
  enters main content. The activity dialog traps reverse-Tab, Escape closes it,
  and focus returns to the opener. No measured mobile target was below 44×44.
- The complete local suite also covers desktop/mobile, light/dark, reduced
  motion, route structure, dialog state, and axe across 28 matrix cases.
- Lighthouse 13 mobile: Performance **100**, Accessibility **100**, Best
  Practices **100**, SEO **100**; FCP 0.92 s, LCP 1.07 s, TBT 3 ms, CLS 0,
  Speed Index 1.01 s, and 47,870 B transferred. Evidence:
  `.factory/evidence/lighthouse-live.json`.

## Findings by severity

### Medium — researched one-time pack is not shipped

The researched brief names a one-time curated offline pack as the monetization
path. Candidate 1.0.4 ships no paid pack, checkout, license restore, or billing
call. This is an honest scope deviation and does not block the brief's smallest
useful product: all 20 activities, local progress, transfer, print, and offline
use are complete and free. A future paid pack requires separate product scope
and Sociobot billing registration.

### Low — demo documentation has two stale license references

`.factory/demo.md` says leaving demo discards “demo license data” and says a
license test intercepts a Sociobot response. Candidate 1.0.4 has no license
data, license test, or billing request. The demo URL, sample, reset, isolation,
and offline instructions in that document are otherwise correct. Public copy,
README, runtime behavior, and claims are not affected.

No release-blocking defect was found.
