# Linux Kid Lab — independent verification 4

**Result: FAIL (release-blocking).**

Verified independently on 29 August 2026 for work order
`linux-kid-lab-verify-4`, candidate commit
`1d88091f1ab6a4387ac22ade737e1cf06720a947`, and the production URL
<https://linux-kid-lab.sociobot.in>.

This is a fresh product result. The live deployment matches the candidate
byte-for-byte for the release files sampled below, so the result is not the
previous deployment-only failure. All registered claims, the complete test
suite, the production build, the first-read gate, normal product flows,
privacy checks, offline behavior, service-worker update behavior, links,
rate limiting, and performance pass. A reproducible keyboard failure remains
release-blocking under the supplied accessibility contract.

## Release-blocking findings

1. **High — focus escapes the modal and Escape then stops closing it.** On a
   fresh live `/demo` page at 390×844, keyboard-only reproduction is: Tab to
   the `Code a maze message` card, press Enter, then press Shift+Tab once.
   Initial focus is on the `.activity-dialog` element. Shift+Tab moves focus
   outside the modal to the footer's `project notes (external)` link. Pressing
   Escape at that point leaves the dialog open because its key handler is
   attached only to the dialog. Expected behavior is contained modal focus,
   Escape from any modal focus position, and focus restoration to the opener.
   The repository test covers Enter, Escape, and restoration without this
   reverse-tab path, so 27/27 tests still pass. Axe does not detect focus-flow
   defects. This violates the non-negotiable keyboard and dialog-focus rules.

2. **Medium — at least six mobile links remain below the required 44px touch
   height.** A computed-box audit of every visible `a`, `button`, `input`,
   `summary`, and tabindex target at 390×844 found these examples: `Print
   progress tokens` is 318×24.8px on `/` and 294×24.8px on `/demo`; `Read the
   privacy note` is 155.7×17px; the paid-section `terms` link is 35×16px;
   `privacy@sociobot.in` is 143.4×17px; and `support@sociobot.in` is
   146.1×17px. Header, footer, tool-list, and checkbox repairs pass, but these
   inline links were not included in the repository's target-size test. The
   supplied accessibility and design contracts require every touch target to
   be at least 44×44px.

3. **Medium — the visible product version is stale.** `package.json` is
   version `1.0.2`, while the live footer and candidate source say `Version
   1.0.1`. The deployment is the candidate, but this visible build-identity
   marker is false and does not satisfy the footer build/version handoff
   purpose.

4. **Medium — the paid tier does not state its price or that it is a one-time
   purchase.** The live paid section explains the pack contents and honestly
   says purchase setup is unavailable, but the entire landing page contains
   no price and no “one-time” wording. `$12` appears only on the undiscoverable
   unlicensed `/print?pack=1` recovery route. The supplied paid-unlock contract
   requires the price, contents, and one-time nature in the paid-tier copy.
   Existing-license verification works; no dead checkout link is rendered.

## Lower-severity findings

- **Low — the mobile hero AVIF is served as `application/octet-stream`.** The
  file decodes successfully and Lighthouse loads it, but the response should
  use `image/avif`. The JavaScript, CSS, manifest, PNG, SVG, HTML, and 404 CSS
  MIME types checked were correct.
- **Low — the mandatory copy audit is incomplete.** `.factory/copy-audit.md`
  says every landing sentence was extracted, but omits the visible figure
  caption `One tape. Many ways to make.` and both footer sentences. The figure
  caption is also vague slogan copy prohibited by the supplied plain-words
  rules.

## Mandatory first-read and demo gate: PASS

A cold live load answers the three required questions in plain words:

- **What it does:** “Pick one creative activity after school.”
- **For whom:** “For parents whose child needs a next step after their first
  learning app,” with Linux families named directly above.
- **What to click first:** `Try it with sample data`, explained as loading a
  sample family's activity shelf.

At 390×844 the headline, audience sentence, and one-click action are all
visible without scrolling. The action spans y=643.2–692.0. It opens `/demo`,
which immediately shows the persistent `Demo — sample data, nothing is saved`
banner, Reset demo, Start for real, a `3 of 20` progress state, and the sample
shelf. The demo is useful without an account or setup. Two of the three short
fact rows extend below the 844px fold, but the required job, audience, and
first action all pass the explicit failure gate.

## Claims gate: 18/18 PASS

`.factory/claims.json` exists, has 18 unique ids, and every id has exactly one
matching `@claim:<id>` test with no unregistered tags. The first literal
pre-install attempts stopped at `tsc: not found`, as expected in a clone with
no dependencies. After the required lockfile install (`npm ci`), every exact
claim command was run separately against the shipped demo entry point and
passed:

| Claim id | Exact command | Result |
| --- | --- | --- |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS (1) |
| `twenty-activities` | `npm test -- --grep @claim:twenty-activities` | PASS (1) |
| `three-steps` | `npm test -- --grep @claim:three-steps` | PASS (1) |
| `paper-alternatives` | `npm test -- --grep @claim:paper-alternatives` | PASS (1) |
| `local-progress` | `npm test -- --grep @claim:local-progress` | PASS (1) |
| `demo-sandbox` | `npm test -- --grep @claim:demo-sandbox` | PASS (1) |
| `demo-indexeddb` | `npm test -- --grep @claim:demo-indexeddb` | PASS (1) |
| `json-export` | `npm test -- --grep @claim:json-export` | PASS (1) |
| `json-import` | `npm test -- --grep @claim:json-import` | PASS (1) |
| `clear-progress` | `npm test -- --grep @claim:clear-progress` | PASS (1) |
| `open-tool-suggestion` | `npm test -- --grep @claim:open-tool-suggestion` | PASS (1) |
| `print-tokens` | `npm test -- --grep @claim:print-tokens` | PASS (1) |
| `local-privacy` | `npm test -- --grep @claim:local-privacy` | PASS (1) |
| `paid-pack` | `npm test -- --grep @claim:paid-pack` | PASS (1) |
| `no-accounts-or-ads` | `npm test -- --grep @claim:no-accounts-or-ads` | PASS (1) |
| `local-age-bands` | `npm test -- --grep @claim:local-age-bands` | PASS (1) |
| `license-privacy` | `npm test -- --grep @claim:license-privacy` | PASS (1) |
| `purchase-setup` | `npm test -- --grep @claim:purchase-setup` | PASS (1) |

The command output was observed directly in this verification run. Passing
tests produce no Playwright trace or screenshot under the repository's
`retain-on-failure` / `only-on-failure` configuration.

## Clean-checkout quality gates

- Initial state: clean at exact candidate SHA; `origin/main` was the same SHA.
- `npm ci`: PASS; 22 locked packages installed, 0 vulnerabilities reported.
- `npm test`: PASS; **27/27** Chromium tests in 55.1 seconds.
- `npm run build`: PASS; `tsc --noEmit` and Vite completed and created `dist/`.
- `git diff --check`: PASS.
- No separate lint script exists in `package.json`.
- Production output: JS **31.89KB raw / 11.42KB gzip**; CSS **17.47KB raw /
  4.55KB gzip**; selected mobile hero **29,752 bytes**; no web-font payload.
- Node `v22.23.2`, npm `10.9.8`, Playwright `1.58.2` from the lockfile.

## Functional and recovery evidence

- `/demo` begins with 13 age-filtered cards and 3/20 complete. Enabling the
  5–7 band exposes all 20. Every registered activity test checks three steps,
  a paper alternative, and an official tool destination.
- The live `Code a maze message` activity showed three concrete steps, the
  Scratch editor link, a paper alternative, and a twist. `Give me another
  twist` changed “Add one repeat command” to “Include a safe wrong turn.”
  Completing it moved progress to 4/20 and survived reload.
- Live JSON export parsed as version 1 with the selected bands, four completed
  records, and an export timestamp. `{}` import produced `That file is not a
  Linux Kid Lab progress export. Choose the JSON file from this app.` A valid
  boundary import with zero age bands recovered with `Progress imported.` and
  showed the useful empty shelf state. Reset restored 13 cards and 3/20.
- Leaving demo removed `demo:linux-kid-lab`, opened a separate
  `linux-kid-lab` database, removed the banner, and showed real progress 0/20.
- Empty license submission used browser validation and made no request. An
  explicit invalid token made exactly one request to the documented Sociobot
  verification URL, returned 200, kept the disclosure open, and showed the
  recovery message visibly. No console error occurred.
- A crawl of **26** discovered internal, factory, project, mailto, and official
  tool links found no HTTP failure; every HTTP destination ended at 200.

This is a PWA, not a library or CLI, so consumer package installation is not
applicable. It has no product sign-in, so the Microsoft Entra authority check
is not applicable. It has no product backend beyond the Sociobot billing
endpoint tested below.

## Privacy, headers, and endpoint allowance

- A complete live demo flow (open, change twist, complete, reload, export,
  invalid and valid import, reset, leave demo) requested only
  `https://linux-kid-lab.sociobot.in`. There were no analytics, external
  scripts, CDN fonts, iframes, ads, chat, page errors, or console errors.
- The first cross-origin request occurred only after explicit license
  submission and was the documented
  `https://api.sociobot.in/api/v1/products/linux-kid-lab/verify?...` GET.
- The live origin receives `Access-Control-Allow-Origin`; a request using
  `Origin: https://evil.example` does not. Verification responses are
  `Cache-Control: no-store`.
- The verification endpoint allowed requests 1–30 in a fresh sequential
  client window. Request **31** returned **429** with `Retry-After: 4` and
  `X-RateLimit-After: 4`. The observed allowance is **30 requests per client
  window**.
- Site responses include HSTS, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, Permissions-Policy, and
  a restrictive CSP. CSP allows runtime connections only to self and the
  Sociobot API and sends `frame-ancestors 'none'` as a response header.
- Hashed JS/CSS and configured image formats return one-year immutable cache
  headers. `sw.js` is `no-cache, no-store, must-revalidate`. HTML revalidates
  after 30 seconds. A real unknown path returns HTTP 404, loads `/404.css`,
  retains its cassette styling, and has no CSP/page error; Chromium's normal
  failed-navigation diagnostic for the intentional 404 is not a CSP defect.

## PWA and local-first evidence

- The live manifest has standalone display, a versioned start URL, matching
  product colors, valid 192×192, 512×512, and maskable 512×512 icons.
- After first load, `/demo` was controlled by one service worker and cache
  `linux-kid-lab-v7` contained the shell plus hashed JS/CSS. With the browser
  network disabled, `/demo` reloaded with 13 cards, 3/20 progress, the demo
  heading, and `You are offline. Saved activities still work.` No console
  error occurred.
- An independent same-origin update simulation changed the served `sw.js`
  bytes without changing product code. `updatefound` and `controllerchange`
  both fired, and the visible status said `An update is ready. Reload to use
  it.`

## Accessibility, responsive layout, and performance

- `/opt/fleet/lib/verify-url.sh` passed against both local production preview
  and live root: HTTP 200, title, `lang=en`, one h1, main landmark, complete
  image alt text, named buttons, and zero page/console errors.
- Independent Playwright axe ran on `/`, `/demo`, `/settings?demo=1`,
  `/privacy?demo=1`, `/terms?demo=1`, `/print?demo=1`, and `/missing-tape` in
  light and dark themes at desktop 1440×900 and mobile 390×844: **28 route
  checks, zero serious/critical findings**. Every route had one h1, one main,
  the expected title, and no horizontal overflow.
- Reduced-motion checks computed `0s` transition and animation durations and
  automatic scrolling. The skip link is the first focus target after a fully
  loaded page and shows a 3px yellow outline plus a 6px dark ring. The modal
  reverse-tab defect above remains outside axe's coverage.
- A 200%-zoom-equivalent reflow smoke test at 640 CSS pixels found no
  horizontal overflow on the landing, demo, settings, privacy, or terms
  routes.
- Fresh mobile Lighthouse: **Performance 99, Accessibility 100, Best
  Practices 100, SEO 100**. FCP 1.0s, LCP 1.2s, CLS 0, TBT 130ms, Speed Index
  1.2s, and total transfer 67,739 bytes. It loaded 11,628 transfer bytes of
  JavaScript, 4,845 of CSS, 29,834 for the hero, and no fonts or third-party
  resources.

## Deployment identity

Fresh SHA-256 comparison of local `dist/` and the live response matched every
sample:

| File | SHA-256 |
| --- | --- |
| `index.html` | `361a22bb0749694904fce84e249b53488ecbcaa9c28bd26f1ad2bc3f52d1c3a8` |
| `assets/index-Dmnp6fAl.js` | `cf45e1914f0de1720f63e99862235ff5918899d72d4b390e7ddf0a86138bf0e5` |
| `assets/index-B3rgj-gx.css` | `f2cf415a49b6323966e1358cc50cac858f3f6df166d8692928123cffd1a890c0` |
| `sw.js` | `c783bcba8a12ae5874dc535e9da9a06425c0dcf7d40c66b9ff7e05f436c5acd5` |
| `manifest.webmanifest` | `63bb8bba747e72d6d425eca56029537de7ef5133ef47bc1b622879fd07b84bbd` |
| `hero-cassette-640.avif` | `c9f52c5327a6ee2987c2ad93a56ecfe894d031b76abc69a55af66e1b56b654a0` |
| `404.html` | `dcfd6ba01889e9bf44a32f29048f265d3299ea83009a973b5186bafc22ea6b21` |
| `404.css` | `44d53dc3d91cb1b187669113bfff94134478dcd80f9ee44bb31101d42b5dcf35` |

## Required repair and recheck

Keep focus inside the activity modal from its initial container focus, handle
Escape while the modal is open even if focus moves unexpectedly, and add a
regression for immediate Shift+Tab plus restoration. Enlarge every remaining
mobile link target to 44×44px without harming inline reading. Synchronize the
visible version with the release/build id. Put the exact price and “one-time
purchase” in the visible paid section, while retaining the honest unavailable
checkout state. Correct the AVIF MIME mapping and complete the copy audit.

Then rerun all 18 claim commands, the 27-test suite, production build, the
live keyboard reverse-tab path, all mobile target boxes, both-theme axe,
first-read, offline/update checks, rate-limit check, Lighthouse, and live hash
comparison.
