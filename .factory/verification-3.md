# Linux Kid Lab — independent verification 3

**Result: FAIL (release-blocking).**

Verified on 29 August 2026 for work order `linux-kid-lab-verify-3` against
commit `03ec7b15ec002624cf8ec046aa08fabb4e192fa0` and the live deployment
<https://linux-kid-lab.sociobot.in>.

This is a fresh result. The deployment does match the candidate; this is not
the earlier deployment-staleness failure.

## Release-blocking findings

1. **High — the actual HTTP 404 page has a CSP console error and renders
   without its intended styling.** A cold mobile and desktop visit to
   `/missing-tape` returns the correct HTTP 404 and the intended HTML, but the
   response CSP is `style-src 'self'` while `404.html` contains an inline
   `<style>` element. Chromium logs: `Applying inline style violates the
   following Content Security Policy directive 'style-src 'self'' ... The
   action has been blocked.` The page therefore falls back to browser-default
   presentation (including a default, non-designed focus treatment). The
   product contract requires no console errors on load, and the supplied
   site-structure contract specifically prohibits CSP inline-style violations.
   Evidence: `public/404.html`, the live CSP response header, and
   `verification-artifacts/live-404-csp-broken.png`.

2. **High — the claims registry still omits visitor-facing promises.** The
   claims skill requires every reliance claim on the landing page and README
   to have one `@claim:` test. No `.factory/claims.json` entry covers the live
   landing statement **“Every activity also works with paper”**, despite it
   being a concrete user promise. The README also promises that all progress,
   export, and accessibility features remain free, and describes IndexedDB and
   namespaced local-storage storage, without matching claim entries. Existing
   tests exercise some related behavior, but none is registered as the
   required claim for these statements. Remove unsupported promises or add
   observable demo-backed claims and tests.

## First-read and demo gate: PASS

Cold live first read is clear in plain words:

- **What it does:** “Pick one creative activity after school.”
- **For whom:** “For parents whose child needs a next step after their first
  learning app,” with “Linux families” immediately above it.
- **What to click first:** the visible one-click **Try it with sample data**
  action, explained as loading a sample family’s shelf.

At 390×844 the action is at y=643.22 with a 48.80px height (bottom y=692.02),
so it is visible before the fold. The click opens `/demo`, immediately shows
13 age-filtered activities with three already complete, and displays the
persistent “Demo — sample data, nothing is saved” banner with Reset demo and
Start for real. Evidence: `verification-artifacts/live-first-read-mobile.png`
and `verification-artifacts/live-first-read-desktop.png`.

## Clean-checkout quality gates

The checkout was clean at the tested SHA. `npm ci` installed 22 locked
packages and reported zero vulnerabilities. There is no separate lint script.

Every literal command listed in `.factory/claims.json` was run after install,
each against the repository's Playwright demo entry point, and passed:

| Claim | Result |
| --- | --- |
| `offline-reload` | PASS |
| `twenty-activities` | PASS |
| `three-steps` | PASS |
| `local-progress` | PASS |
| `demo-sandbox` | PASS |
| `json-export` | PASS |
| `json-import` | PASS |
| `open-tool-suggestion` | PASS |
| `print-tokens` | PASS |
| `local-privacy` | PASS |
| `paid-pack` | PASS |
| `no-accounts-or-ads` | PASS |
| `local-age-bands` | PASS |
| `license-privacy` | PASS |

`npm test` then passed **23/23** Chromium tests (45.1 seconds). The first full
run had one Chromium SIGSEGV while opening the final route-title test; its
isolated retry passed, and the immediately repeated complete suite passed
23/23, so this was a transient browser-runtime failure rather than a product
test failure. `npm run build` passed `tsc --noEmit` and Vite produced `dist/`.

The production bundle is 11.19 KiB gzip JavaScript and 4.50 KiB gzip CSS,
well below the static-PWA limits. The live hashed JS and CSS return
`Cache-Control: public, max-age=31536000, immutable`; `sw.js` returns
`no-cache, no-store, must-revalidate`.

## Functional, privacy, PWA, and deployment evidence

- Live end-to-end demo: initial state was 13 cards and 3/20 complete; enabling
  the remaining age band showed all 20 cards; an activity exposed three steps
  and its official Scratch link; completing and reloading persisted a fourth
  stamp. A malformed JSON import showed the specific recovery message, and
  leaving demo returned the real shelf to 0/20.
- Normal live activity use requested only the product origin (HTML, hashed JS,
  hashed CSS, and self-hosted hero image). No console or page errors appeared
  on `/`, `/demo`, `/settings?demo=1`, `/privacy?demo=1`, `/terms?demo=1`, or
  `/print?demo=1`. No analytics, CDN fonts/scripts, iframes, account inputs,
  ads, or chat were observed. Explicit license verification is covered by the
  fixture claim and points only to the documented Sociobot endpoint.
- The browser response headers on the live site include HSTS, `nosniff`,
  strict-origin referrer policy, permissions policy, and a restrictive CSP.
  The restrictive CSP is itself the cause of the 404 failure above.
- The license verification allowance is enforced: sequential requests 1–30
  returned 200; request 31 and the following five returned **429** with
  `Retry-After: 4`. The observed allowance is **30 requests per client window**.
  CORS returned `Access-Control-Allow-Origin:
  https://linux-kid-lab.sociobot.in`. This static product has no other
  server-side endpoint and no sign-in, so Entra tenant checks do not apply.
- PWA: `/demo` was service-worker controlled after one reload. With the
  browser network disabled, it reloaded the sample shelf (13 cards) and showed
  the offline notice. An isolated browser-only update probe produced
  `updatefound`, `controllerchange`, and the visible “An update is ready.
  Reload to use it.” toast. The manifest has standalone display, v2 start URL,
  192/512/maskable icons, and product colors.
- Keyboard smoke test passed on live `/demo`: the first Tab reached the skip
  link with its designed 3px yellow focus outline; Enter opened an activity
  dialog, Shift+Tab wrapped to the last dialog control, Escape closed it and
  restored focus to the card opener. At 390px no horizontal overflow occurred.
- Playwright axe on the seven routes (`/`, `/demo`, `/settings?demo=1`,
  `/privacy?demo=1`, `/terms?demo=1`, `/print?demo=1`, and `/missing-tape`) in
  light and dark modes at 390×844 found **zero serious or critical** issues.
  The 404 CSP console error remains a separate release blocker.
- `/opt/fleet/lib/verify-url.sh` passed for the live root: HTTP 200, title,
  `lang=en`, one h1, main landmark, no missing image alt, no unnamed buttons,
  and no root-page console errors. Evidence is in
  `verification-artifacts/verify-url-live/verify.json`.
- All 23 discovered non-mailto site links, including all eight official tool
  destinations, returned a final 2xx/3xx response. The unavailable purchase
  setup does not render a checkout link, so no dead purchase link remains.

Fresh Lighthouse could not complete in this disposable worker: Lighthouse
13.4.1's Chrome tab crashed with `TARGET_CRASHED` using both supplied Chromium
executables. The raw attempted report is
`verification-artifacts/lighthouse-live.json`; it is not used as a performance
pass. Static bundle and transfer-budget checks above passed.

## Deployment identity

Fresh SHA-256 comparisons between the locally built candidate and the live
deployment matched exactly for `index.html`, `sw.js`, `manifest.webmanifest`,
the hashed JS and CSS, and `hero-cassette-640.avif`. For example:

| File | SHA-256 |
| --- | --- |
| `index.html` | `fd478950c92258ce9b9b2fa5b01abee003b7025aa627794814c117d4cb33ae6f` |
| `sw.js` | `4af53e29cd398b706ee11e777687dc2a5ebb8f4fa4ee22d8112c3daa2813c91c` |
| `assets/index-D-1Ico9T.js` | `6421c54e55fce0df68f99523c75ec545df3c0d371b4c2b98cbc7a18d5a35248a` |
| `assets/index-1lG8NfcZ.css` | `52feb6fba654bf5a2964fc56060b3414ae0120b520c04b43051dc725d69168bb` |

## Required repair and recheck

Move the 404 CSS into a self-hosted stylesheet (or otherwise make the CSP and
page compatible without weakening it to allow arbitrary inline styles), then
load a real unknown URL and require zero console errors. Register every
remaining user-facing promise in `.factory/claims.json` with exactly one
observable demo-backed `@claim:` test, or remove it. Re-run every exact claim
command, `npm test`, `npm run build`, live first-read, both-theme axe, the
unknown-route CSP check, offline reload, update simulation, rate-limit burst,
and deployment-hash comparison.
