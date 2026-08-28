# Linux Kid Lab — independent verification 2

**Result: FAIL (release-blocking).**

Verified on 28 August 2026 for work order `linux-kid-lab-verify-2` against
candidate `881d843114ca56aabd5607f99f6ac7b1acdeb4f6` and
<https://linux-kid-lab.sociobot.in>.

The repaired v5 application is now deployed and matches the candidate build.
The free activity flow, offline behavior, claim commands, and performance are
sound. The candidate still fails the mandatory mobile first-read gate, dark
theme accessibility, live purchase path, and strict claims contract.

## Release-blocking findings

1. **High — the required demo action is below the first screen at 390 px.** On
   a cold 390×844 load, the headline explains the job and the next sentence
   names the audience, but the `Try it with sample data` link starts at
   `y=970.16`; it cannot be seen without scrolling. The illustration is placed
   before the action in the responsive grid. Desktop 1440×900 passes, with the
   action at `y=729.06`. The acceptance contract explicitly fails a candidate
   whose first screen does not show what to click first. Evidence:
   [`first-read-mobile.png`](verification-artifacts/first-read-mobile.png).

2. **High — the system dark theme has serious axe contrast failures.** Fresh
   Playwright axe runs at 390×844 with `colorScheme: dark` and reduced motion
   found four failing nodes on `/`, one on `/demo`, and four on `/settings`.
   Examples are the hero kicker at **4.14:1**, hero caption at **1.36:1**,
   progress eyebrow at **1.36:1**, privacy eyebrow at **1.39:1**, and selected
   age-band text at **1.36:1**. Required contrast is 4.5:1. Light theme runs on
   all seven routes had no serious/critical results. Evidence:
   [`live-dark-mobile.png`](verification-artifacts/live-dark-mobile.png).

3. **High — the live paid-pack purchase link is dead.** The visible
   `Buy the $12 pack` link requests
   `https://api.sociobot.in/api/v1/products/linux-kid-lab/checkout` and returns
   HTTP **404**, body `{"error":"enabled factory product","status":404}`,
   with no checkout redirect. This breaks the advertised one-time purchase and
   violates the no-dead-links requirement. All other crawled internal,
   factory, project-notes, and eight official tool destinations returned 200
   (the Inkscape URL redirected to a final 200).

4. **High — the claims contract is not fully satisfied.** All 11 registered
   commands pass, but three tagged tests start at `/` rather than the required
   isolated demo entry point: `twenty-activities`, `three-steps`, and
   `open-tool-suggestion`. The landing page and README also contain reliance
   statements not represented by a claim entry: no accounts/ads/chat/behavior
   analytics; persisted age-band choices; and license tokens being sent only
   to the Sociobot verification endpoint. The existing `local-privacy` test
   observes one normal activity flow and only checks request origins, so it
   does not prove those broader statements.

## Other findings

- **Medium — invalid-license recovery feedback is hidden.** After submitting an
  invalid token, the correct message exists in the DOM, but rerendering closes
  the containing `<details>`. `errorVisible` was false and the `open`
  attribute was absent, so the user sees no result or recovery instruction.
- **Medium — many mobile tap targets are below 44 px.** At 390 px the landing
  route had 11 undersized interactive boxes. Examples: the wordmark was
  107×16, header links were 36×20 to 79×20, and footer links were about
  38×22 to 142×22. `/settings` had 19 undersized elements, including the
  22×22 checkbox inputs and the open-tool links.
- **Medium — unknown URLs are soft 404s.** `/missing-tape` displays the styled
  not-found screen and correct title but returns HTTP **200**. The Static Web
  Apps config has no 404 response override.
- **Low — static assets lack long-lived immutable edge caching.** HTML, JS,
  CSS, images, the manifest, and service worker all returned
  `Cache-Control: public, must-revalidate, max-age=30`; app assets also use
  stable names rather than hashed names. Runtime service-worker caching works,
  but this misses the supplied immutable-cache guidance.

## Mandatory first-read and demo test

- **What it does:** helps a family pick one short creative activity after
  school.
- **For whom:** parents whose child needs a next step after a first learning
  app, with the kicker identifying Linux families.
- **What to click first:** `Try it with sample data`, followed by “Loads a
  sample family’s activity shelf.”

This is clear on desktop. It **fails on 390×844** because the action and the
three facts are below the fold. After scrolling and clicking once, `/demo`
does work: it immediately shows 13 age-filtered activities, three completed
items, and the persistent `Demo — sample data, nothing is saved` banner with
`Reset demo` and `Start for real`.

## Claims gate

The first literal pre-install invocations stopped at `tsc: not found`, as a
clean clone had no dependencies. After the required `npm ci`, every exact
command in `.factory/claims.json` executed successfully:

| Claim | Exact command | Result |
| --- | --- | --- |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS, 1 test |
| `twenty-activities` | `npm test -- --grep @claim:twenty-activities` | PASS, 1 test; uses `/` |
| `three-steps` | `npm test -- --grep @claim:three-steps` | PASS, 1 test; uses `/` |
| `local-progress` | `npm test -- --grep @claim:local-progress` | PASS, 1 test |
| `demo-sandbox` | `npm test -- --grep @claim:demo-sandbox` | PASS, 1 test |
| `json-export` | `npm test -- --grep @claim:json-export` | PASS, 1 test |
| `json-import` | `npm test -- --grep @claim:json-import` | PASS, 1 test |
| `open-tool-suggestion` | `npm test -- --grep @claim:open-tool-suggestion` | PASS, 1 test; uses `/` |
| `print-tokens` | `npm test -- --grep @claim:print-tokens` | PASS, 1 test |
| `local-privacy` | `npm test -- --grep @claim:local-privacy` | PASS, 1 test |
| `paid-pack` | `npm test -- --grep @claim:paid-pack` | PASS, 1 fixture test |

Each registered id appears exactly once as `@claim:<id>` in the test suite.

## Clean-checkout quality gates

- Initial repository state was clean at the exact candidate SHA.
- `npm ci`: PASS; 22 packages installed and npm reported 0 vulnerabilities.
- `npm test`: PASS; **14/14** Chromium tests.
- `npm run build`: PASS; includes `tsc --noEmit` and produced `dist/`.
- No separate lint script exists in `package.json`.
- Production output: **11.15 KiB gzip JS**, **4.30 KiB gzip CSS**; selected
  mobile hero AVIF **29,752 bytes**. No fonts are downloaded.
- The product is a PWA, not a library or CLI, so package-consumer checks do not
  apply. It has no product sign-in, so Entra authority checks do not apply.

## Functional, privacy, and PWA evidence

- All 20 activities render when all bands are selected; every activity has
  three steps and approved open-tool suggestions.
- Demo completion persisted across reload. JSON export parsed as version one
  with three records. Malformed JSON produced a specific recovery message;
  a valid import then succeeded. Zero selected age bands produced a useful
  empty state. Reset restored the 13-card/three-completion sample, and leaving
  demo returned to real progress `0 of 20`.
- Activity dialog focus, Escape closing, focus restoration, and Tab trapping
  passed. Destructive real-data clearing has a specific confirmation prompt.
- Normal demo use made same-origin requests only. No analytics, third-party
  scripts/fonts, embedded secrets, or unsolicited license request were found.
  An explicit invalid-license action made one GET to the documented Sociobot
  verification endpoint and no other third-party request.
- The license endpoint allowed the live origin and omitted
  `Access-Control-Allow-Origin` for `https://evil.example`.
- A rapid sequential verification burst returned requests 1–30 as 200;
  request **31** and the next 14 returned **429**. The first 429 included
  `Retry-After: 4` (and `X-RateLimit-After: 4`).
- Live v5 service-worker control and cache were present. After first load,
  `/demo` reloaded offline with 13 cards and the offline notice; unvisited
  `/privacy`, `/demo`, and `/settings` deep links also loaded offline from the
  shell.
- An independent same-origin update simulation changed the worker bytes.
  `updatefound` and `controllerchange` fired, the new worker activated, and
  the visible toast said “An update is ready. Reload to use it.”

## Browser, response-policy, and performance evidence

- `/opt/fleet/lib/verify-url.sh` passed locally and live: HTTP 200, title,
  `lang=en`, one h1, main landmark, no missing image alt, no unnamed buttons,
  and no console errors.
- Desktop 1440×900 and mobile 390×844 had no horizontal overflow. All seven
  tested routes had one h1, distinct titles, and no console/page/request
  errors. Reduced motion computed to `0s` transitions/animations, no card
  transform, and automatic scroll behavior. Keyboard focus used the designed
  3 px yellow outline plus 6 px dark ring. A 200% desktop zoom smoke test had
  no horizontal overflow.
- Live headers include HSTS, CSP, `nosniff`, Referrer-Policy, and
  Permissions-Policy. CSP permits only self-hosted runtime resources plus the
  Sociobot API connection/form target.
- Fresh mobile Lighthouse: Performance **99**, Accessibility **100**, Best
  Practices **100**, SEO **100**; FCP **0.9 s**, LCP **1.1 s**, CLS **0**,
  TBT **110 ms**, total transfer **46 KiB**. Lighthouse used the default light
  theme and therefore does not negate the dark-theme axe failure. Raw report:
  [`lighthouse-live.json`](verification-artifacts/lighthouse-live.json).

## Deployment identity

Fresh local and live SHA-256 values matched for all sampled release files:

| File | SHA-256 |
| --- | --- |
| `index.html` | `9ab692b693963e88a8202a2b6078df3f451138304a804744e22c1aa8e55ab59e` |
| `assets/app.js` | `eaf9bfcf4eb5af9562f6838789cf321a63f1dba492a61feb4c610e3cf9af2851` |
| `assets/app.css` | `e153bd66122308cac78a3f9bd78358e215d98a09e185ebcfc4867d31a6289ef2` |
| `sw.js` | `95035d7e2a27eb1ee8d1893aed0480804ec9d45119f7c12b9490c6e913a75091` |
| `manifest.webmanifest` | `63bb8bba747e72d6d425eca56029537de7ef5133ef47bc1b622879fd07b84bbd` |
| `hero-cassette-640.avif` | `c9f52c5327a6ee2987c2ad93a56ecfe894d031b76abc69a55af66e1b56b654a0` |
| `social-card.webp` | `4bbb18cecdcc44ce3d52bd0a5f2d9cc57cc59856db9b27a680dd734d0aad0cec` |

The live worker declares `linux-kid-lab-v5`; the previous deployment-only
staleness is resolved. This FAIL is based on fresh product evidence, not that
prior propagation issue.

## Required repair and recheck

Move the mobile CTA and three facts above the hero image; correct all dark
palette contrast failures; register/enable the live Sociobot product; preserve
and expose invalid-license status; enlarge mobile interaction targets; use the
demo entry in every claim test and register the remaining promises; return a
real 404 status; and add an explicit asset-cache policy. Then rerun every claim
command, full tests/build, both-theme axe, cold mobile first-read, link crawl,
checkout, rate-limit burst, service-worker update/offline checks, and live hash
comparison.
