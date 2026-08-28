# Linux Kid Lab — independent verification

**Result: FAIL (release-blocking).**

Verified on 2026-08-28 against candidate commit
`c79b8e323b952ff4834fcb3c6b233ffaaaf421e9` and
https://linux-kid-lab.sociobot.in.

No critical-severity defect was found. The three high-severity findings below
are release-blocking under the supplied site-structure and claims contracts.

## Release blockers

1. **High — a shipped open-tool link is dead.** The Inkscape destination used
   by several activity cards, `https://inkscape.org/`, returned **HTTP 502**
   on four consecutive checks (one `HEAD`, then three `GET -L` checks) on
   2026-08-28. The other seven tool destinations, the Param Factory link, and
   the project-notes link returned 200. The product contract requires no dead
   links, and this prevents the advertised “Open Inkscape” action from doing
   its job. Use a currently working official Inkscape destination and cover
   all external activity destinations in a link check.

2. **High — the claims registry does not cover all visitor-facing promises.**
   `README.md` promises “Local progress, JSON export/import, and printable
   progress tokens”, but `.factory/claims.json` has an `json-export` entry
   only; there is no `json-import` claim/test. The live landing and README
   also promise an open-tool suggestion per card without a listed observable
   test. The claims contract says an unlisted claim fails review until it is
   removed or tested.

3. **High — two listed claim tests under-prove their own claims.**
   `@claim:paid-pack` asserts the 20 printable cards but never asserts the
   promised four-week weekend mix. `@claim:three-steps` opens only the 13
   cards visible in seeded `/demo`, whereas the claim says **each** of the 20
   activities has three steps; the seven 5–7 cards are not exercised. These
   must be made observable in the corresponding tagged tests.

## First-read result: PASS

On a cold desktop visit, the first screen says it is a shelf of “creative
activity after school”, names parents whose child needs a next step after a
first learning app, and makes the first action explicit: **Try it with sample
data** (“Loads a sample family’s activity shelf.”). The one-click action opens
`/demo` with a persistent “Demo — sample data, nothing is saved” banner,
Reset demo, and Start for real. This passes the plain-words and demo first-read
gate.

## Clean-checkout test evidence

`npm ci` installed 22 locked packages with zero reported vulnerabilities. An
initial pre-install invocation necessarily stopped at `tsc: not found`; all
authoritative clean runs below were made after the required install and each
started its own production build and demo-backed Playwright server.

| Claim id | Exact command | Result |
| --- | --- | --- |
| offline-reload | `npm test -- --grep @claim:offline-reload` | PASS (1) |
| twenty-activities | `npm test -- --grep @claim:twenty-activities` | PASS (1) |
| three-steps | `npm test -- --grep @claim:three-steps` | PASS (1; coverage gap above) |
| local-progress | `npm test -- --grep @claim:local-progress` | PASS (1) |
| demo-sandbox | `npm test -- --grep @claim:demo-sandbox` | PASS (1) |
| json-export | `npm test -- --grep @claim:json-export` | PASS (1) |
| print-tokens | `npm test -- --grep @claim:print-tokens` | PASS (1) |
| local-privacy | `npm test -- --grep @claim:local-privacy` | PASS (1) |
| paid-pack | `npm test -- --grep @claim:paid-pack` | PASS (1; coverage gap above) |

`npm test` then passed **12/12** Chromium tests. `npm run build` passed,
including `tsc --noEmit`, and produced `dist/`. There is no separate lint
script in `package.json`.

## Functional, PWA, privacy, and deployment checks

- Demo flow, activity completion, reload persistence, progress-token printing,
  empty shelf recovery, invalid JSON-import feedback, valid export, keyboard
  dialog Escape/focus restore, and 390 px layout were exercised. Invalid
  import says: “That file is not a Linux Kid Lab progress export. Choose the
  JSON file from this app.”
- Live `/demo` was loaded, controlled by its service worker, taken offline,
  and reloaded successfully: the sample heading, 13 seeded-visible cards,
  and the demo banner remained. A local controlled service-worker update with
  a changed script showed “An update is ready. Reload to use it.”
- Normal live activity use requested only the same origin. The claim test
  independently confirms the demo flow does the same. No analytics or
  third-party assets were observed.
- The only server-side product endpoint is Sociobot license verification.
  A 40-request parallel invalid-license burst produced **30 × 200** then
  **10 × 429**; an immediate follow-up was 429 with `Retry-After: 0` and
  `X-RateLimit-After: 0`. Browser-origin CORS allowed only
  `https://linux-kid-lab.sociobot.in` in the observed response.
- Live response headers include HSTS, CSP, `X-Content-Type-Options: nosniff`,
  Referrer-Policy, and Permissions-Policy. No console or page errors occurred
  on the landing, demo, settings, print, privacy, terms, or styled unknown
  route.
- Fresh local `dist/assets/app.js` and live `/assets/app.js` have matching
  SHA-256 `49258e07141019ed27145265c7ea1eaee6cd8b2b33bdb3add7e507b16fb0e46d`.
  CSS also matches exactly:
  `e153bd66122308cac78a3f9bd78358e215d98a09e185ebcfc4867d31a6289ef2`.
  This confirms the deployment matches the tested candidate build.

## Accessibility and performance

- `/opt/fleet/lib/verify-url.sh` passed against local and live URLs: HTTP 200,
  `lang=en`, a title, one h1, main landmark, no missing image alt text, no
  unnamed buttons, and zero console errors.
- Playwright axe checks on all seven routes, local and live, at 390×844 with
  reduced motion found no serious or critical findings. No mobile horizontal
  overflow was found. Keyboard focus has the designed 3 px visible outline;
  the skip link is first. Reduced motion computed `transition-duration: 0s`,
  card transform `none`, and scroll behavior `auto`.
- Local mobile Lighthouse: Performance **100**, Accessibility **100**, Best
  Practices **100**, SEO **100**; FCP **0.9 s**, LCP **1.2 s**, CLS **0**,
  TBT **0 ms**, total transfer **46 KiB**. Build output is 11.14 KiB gzip JS
  and 4.30 KiB gzip CSS, inside the static-PWA budgets.

## Reverify after repair

Run `npm ci`, every exact command in `.factory/claims.json`, `npm test`, and
`npm run build`. Recheck the repaired official Inkscape target from the live
activity dialog, then repeat the cold first-read, live offline reload, link
crawl, and 40-request verify-endpoint rate-limit burst.
