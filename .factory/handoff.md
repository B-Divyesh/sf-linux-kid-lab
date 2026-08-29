# Linux Kid Lab — repair 5 handoff

## Result

**PASS — release 1.0.3 repairs candidate
`0ca7c7fcff0850f140c321e21556a3e739ff5cc1`.**

## What changed

- The failing desktop/mobile route matrix no longer places 28 route, theme,
  viewport, reduced-motion, and axe scans inside one 30-second Playwright
  test. It is now 28 independently isolated Playwright tests. Each receives a
  fresh browser context from the page fixture, so IndexedDB, service-worker,
  and route state cannot leak into the next matrix case.
- The app now exposes `#app[data-ready="true"]` only after asynchronous
  IndexedDB state has rendered and event handlers are bound. Every matrix case
  explicitly waits for it after navigation before running the unchanged h1,
  main, overflow, reduced-motion, and serious/critical axe assertions.
- Each isolated case has a deliberate 20-second timeout. This allows one cold
  state open, worker registration, and complete axe scan while detecting a
  stalled route quickly; it does not weaken any product assertion.
- The PWA shell is release `linux-kid-lab-v9`; the manifest start URL and
  package version are `1.0.3`. Existing installed clients therefore discover
  the repaired worker and receive the normal update notice.

## Failure reproduction and regression coverage

The original test was a single sequential 28-case loop under Playwright's
30-second default test timeout. Verification 5 recorded the failure as 26
passing tests and this test timing out. In a detached worktree at the exact
candidate SHA, the isolated legacy matrix also returned a failed Playwright
run once; a subsequent warm full run passed, confirming the timing-sensitive
nature of the issue rather than a product assertion failure.

The focused replacement is tagged `@regression:route-matrix` and has 28
independent cases. It passed 28/28; its combined offline check passed 29/29.

## Verification

- `npm ci && npm run build`: PASS. The exact production build command is
  `npm run build`; it generated `dist/` with `dist/index.html` at its root.
- `npm test`: PASS, 54/54 Chromium tests. This includes browser, mobile,
  keyboard, accessibility/axe, privacy, offline reload, IndexedDB sandbox,
  licensing, static routing, and PWA checks.
- Every literal command in `.factory/claims.json`: PASS, 18/18 on release
  1.0.3.
- `npx playwright test --grep "@regression:route-matrix|@claim:offline-reload"`:
  PASS, 29/29.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 <evidence-dir>`:
  PASS. HTTP 200; no console errors; title, `lang=en`, one h1, main landmark,
  image alt text, and named buttons verified.
- Final build sizes: JavaScript 32.18 kB raw / 11.52 kB gzip; CSS 17.65 kB
  raw / 4.61 kB gzip. Both remain inside the static-PWA budget.

## Deployment

Target: Azure Static Web App `sf-linux-kid-lab` in resource group `sociobot`,
production environment. The final deployment URL and live identity evidence
are recorded after the static artifact is uploaded.

## Known gaps

The optional $12 activity-pack checkout remains intentionally unavailable
until the external Sociobot billing product is registered. The free shelf,
local progress, export, printable tokens, and license restore flow remain
available; no dead checkout link is shown.
