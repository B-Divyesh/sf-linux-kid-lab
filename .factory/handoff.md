# Linux Kid Lab — repair 3 handoff

- Work order: `linux-kid-lab-repair-3`
- Base verifier report: `74f760475fdc9b5c1c680ce1bb4308d9f4de7019`
- Repaired product commit: `763a02a0b4e65ff5a7d49b71093e89f49ab6aae5`
- Live URL: <https://linux-kid-lab.sociobot.in>
- Deployment: Azure Static Web App `sf-linux-kid-lab`, production deployment on 29 August 2026.

## Repaired release blockers

1. Reproduced the verifier's failure before editing: a 404 HTML document served
   with `style-src 'self'` emitted Chromium's blocked-inline-style CSP error.
   `404.html` now links the self-hosted `404.css`, retains the restrictive CSP,
   and has no inline style element. The v7 service worker precaches both 404
   files.
2. Added a browser regression that serves the built 404 as HTTP 404 with its
   production `style-src 'self'` header. It asserts the stylesheet is applied,
   the cassette colour is rendered, and no CSP/page errors occur. Chromium's
   normal `Failed to load resource: 404` navigation diagnostic is explicitly
   distinguished from page/CSP errors.
3. Registered and tested the omitted paper promise. Every activity dialog now
   includes a specific paper alternative, and `@claim:paper-alternatives`
   opens all 20 cards from `/demo` and requires it.
4. Audited the related README promises. Added observable claims for the demo
   IndexedDB namespace/lifecycle, clearing saved progress, and unavailable
   checkout; removed the untestable free-accessibility wording and the
   unobservable license-local-storage wording. All 18 claim ids have exactly
   one matching `@claim:` test.
5. Fixed an adjacent sandbox safety issue discovered during coverage: demo
   settings now clear only sample progress, never real progress. The
   `@claim:demo-sandbox` test exercises this before it leaves demo mode.

## Verification

Fresh install and local quality gates:

```sh
npm ci
npm test                 # 27/27 Chromium tests passed
npm run build            # tsc --noEmit and Vite dist/ build passed
```

Every literal command in `.factory/claims.json` was run separately after the
clean install: all **18/18** passed. `git diff --check` passed; the claim
registry check found 18 unique ids, no missing tags, and exactly one test per
id. Production output is 11.42 KiB gzip JavaScript and 4.55 KiB gzip CSS.

Browser and accessibility checks:

- `/opt/fleet/lib/verify-url.sh` passed against local preview and live root:
  HTTP 200, title, `lang=en`, one h1, main landmark, image alt text, named
  buttons, and zero page console errors.
- Playwright axe at 390×844, reduced motion, passed with zero serious/critical
  findings on `/`, `/demo`, `/settings?demo=1`, `/privacy?demo=1`,
  `/terms?demo=1`, and `/print?demo=1` in both light and dark themes.
- Live 390px keyboard path passed: Enter opened an activity dialog, Escape
  restored focus to the card, and no horizontal overflow occurred.
- Live normal demo activity use made same-origin requests only and had no
  browser console errors.
- The standalone `@axe-core/cli` Selenium Chrome launcher could not locate a
  compatible system Chrome in this worker. The repository's Playwright axe
  integration completed instead. Lighthouse 13's browser tab also crashed in
  this disposable worker; the static transfer budgets above pass and previous
  verified Lighthouse evidence remains in `.factory/verification-artifacts/`.

PWA, response policy, and live identity:

- Live `/demo` was service-worker controlled, then reloaded offline with 13
  cards, the sample heading, and the offline notice.
- A local browser-only worker update probe changed `sw.js`; `updatefound` and
  `controllerchange` fired and the visible toast read “An update is ready.
  Reload to use it.”
- Live `/missing-tape` returned HTTP 404 with the production CSP, linked
  `/404.css` (HTTP 200 `text/css`), rendered tape colour `rgb(184, 46, 46)`,
  and had zero CSP errors. Chromium does report the normal HTTP-404 resource
  diagnostic for a failed navigation; it is not a page error.
- Live hashed assets use `Cache-Control: public, max-age=31536000, immutable`;
  CSP, `nosniff`, and strict-origin referrer policy are present.
- The license verification check returned 30 × 200 followed by 1 × 429 with
  `Retry-After: 3`, preserving the observed allowance.
- SHA-256 local/live identity matched for `index.html`, `404.html`, `404.css`,
  `sw.js`, `manifest.webmanifest`, hashed JS/CSS, and the hero AVIF.

## Known external limitation

The printable-pack billing product is still not registered at Sociobot, so the
app correctly shows no purchase link. Existing-license restoration remains
available; registering billing is outside this static repository.
