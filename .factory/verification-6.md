# Linux Kid Lab — independent verification 6

**Result: PASS.**

Verified independently on 29 August 2026 for work order
`linux-kid-lab-verify-6`, candidate commit
`f3690fabc1b63433c8bbaeaecc28b20b70ac9b64`, and production URL
<https://linux-kid-lab.sociobot.in>.

This is a fresh result from a clean candidate checkout. The earlier
release-blocking Playwright timeout is repaired: the required complete suite
passes 54/54, including 28 isolated route-matrix cases. Production matches the
candidate byte-for-byte for every sampled release file. The free product
completes the researched job-to-be-done; the optional purchase-registration gap
is disclosed under findings.

## Mandatory first-read and demo gate — PASS

A cold production load answers all three questions in the first screen:

- What it does: **“Pick one creative activity after school.”**
- For whom: **“For parents whose child needs a next step after their first
  learning app.”** The screen also identifies Linux families.
- What to click: **“Try it with sample data”**, beside **“Loads a sample
  family’s activity shelf.”**

At 390×844, the action occupies y=643–692 and is wholly above the fold. One
click opens `/demo`. The destination immediately shows **“Demo — sample data,
nothing is saved”**, **Reset demo**, **Start for real**, 13 age-filtered cards,
and 3 of 20 completed activities. Cold and demo screenshots are in
`.factory/verification-6-artifacts/`.

## Claims gate — 18/18 PASS

`.factory/claims.json` exists. After `npm ci`, every literal `test` command was
run independently from the clean checkout through the shipped demo entry point.

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

The landing page and README were cross-checked against the manifest. Their
material offline, privacy, activity-count, activity-content, persistence,
print, import/export, demo-isolation, and license statements are covered by
listed claims. No unlisted material product claim was found.

## Clean-checkout quality gates

- Initial state: clean `main` at the exact candidate SHA; `origin/main`
  matched it.
- `npm ci`: PASS; 22 locked packages installed and npm reported 0
  vulnerabilities.
- Every `.factory/claims.json` command: PASS, 18/18.
- `npm test`: PASS, **54/54** Chromium tests in 1.4 minutes.
- `npm run build`: PASS; `tsc --noEmit` and Vite produced `dist/`.
- There is no separate lint script. Type checking is part of the exact build.
- Node `v22.23.2`, npm `10.9.8`, Playwright `1.58.2`.
- Final bundles: JavaScript 32,175 B raw / 11,502 B gzip; CSS 17,645 B
  raw / 4,620 B gzip; mobile hero AVIF 29,752 B. No web font loads. All are
  inside the static-PWA budgets.

## End-to-end, boundary, and recovery evidence

- The fresh demo starts with ages 8–13, 13 visible cards, and 3/20 complete.
  Selecting all bands exposes all 20 activities.
- `Code a maze message` provides three concrete steps, a paper alternative,
  and the official Scratch link. **Give me another twist** changes the prompt.
- Stamping that activity changes progress to 4/20; the completion and stamp
  survive a live reload.
- JSON export downloads `linux-kid-lab-progress.json`, parses as version 1,
  and contains the expected selected bands and four completion records.
- Importing `{}` produces a specific recovery message. Importing a valid
  version-one file with zero age bands succeeds and produces the useful
  **Your shelf is empty** state with a **Choose age bands** action.
- Reset restores the 3/20 sample. **Start for real** discards
  `demo:linux-kid-lab`, opens `/`, creates the separate `linux-kid-lab`
  database, and starts real progress at 0/20.
- An explicit invalid license check keeps its disclosure open, displays a
  recovery message, and causes no console or page error. Empty input is guarded
  by required-field validation.
- A fresh crawl covered 25 internal, factory, project, mail, and official-tool
  destinations. Every HTTP destination returned below 400.
- There is no sign-in, product backend, library, or CLI, so Entra authority,
  backend concurrency/persistence, and consumer-package checks do not apply.
  No AI feature is needed for this local curated launcher.

## Privacy, response headers, allowance, and deployment identity

A fresh production demo flow recorded only
`https://linux-kid-lab.sociobot.in` while opening an activity, changing a
twist, completing it, reloading, exporting, importing invalid and boundary
files, resetting, and leaving demo mode. There were no analytics, external
scripts, CDN fonts, console errors, or page errors. The first cross-origin
request occurred only after explicit license verification and went only to
`https://api.sociobot.in/api/v1/products/linux-kid-lab/verify`.

The license endpoint allowed requests 1–30 from one client. Request **31**
returned **429** with `Retry-After: 4`; the observed allowance is 30 requests
per client window. Product-origin responses returned
`Access-Control-Allow-Origin: https://linux-kid-lab.sociobot.in` and
`Cache-Control: no-store`. An unapproved origin received no CORS allowance.

Production sends HSTS, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, a restrictive
Permissions-Policy, and a restrictive CSP. `frame-ancestors 'none'` is a real
response header. HTML revalidates after 30 seconds; hashed JS/CSS and image
assets use one-year immutable caching; `sw.js` is `no-store`; AVIF has the
correct MIME type. `/missing-tape` is an HTTP 404 with the styled recovery page.

Fresh local/live SHA-256 comparisons matched:

| File | SHA-256 |
| --- | --- |
| `index.html` | `259bea2b9fbdc86621f4658e6703faf386ee8abb9796a7c7cce7c3cd5f3ec5c2` |
| `assets/index-B3aAcko-.js` | `8c24eae50c198732b2f8ad6ef568ed88cc22550c0a7078ef433d354bd65344b4` |
| `assets/index-BQ5SrD66.css` | `cc131b4de1c5b48ccc7fca8c894d889ce4c0b291b662d14247cb1ef97b666a36` |
| `sw.js` | `eb6af4f7fca8647d6e667e36204d5ed3f695f2a7efe4565f20cd351fd776c7ed` |
| `manifest.webmanifest` | `ae094250475f8ddbcacdc10c5f6ea399a00ac075fc2c0574c4dad1e4e57bc729` |
| `hero-cassette-640.avif` | `c9f52c5327a6ee2987c2ad93a56ecfe894d031b76abc69a55af66e1b56b654a0` |
| `404.html` | `dcfd6ba01889e9bf44a32f29048f265d3299ea83009a973b5186bafc22ea6b21` |
| `404.css` | `44d53dc3d91cb1b187669113bfff94134478dcd80f9ee44bb31101d42b5dcf35` |

## PWA, accessibility, mobile, and performance

- `/opt/fleet/lib/verify-url.sh` passed production: HTTP 200, title,
  `lang=en`, one h1, main landmark, complete image alt text, named buttons,
  and no root-page console errors. Evidence is under
  `.factory/verification-6-artifacts/verify-url/`.
- A fresh live matrix covered seven routes, desktop 1440×900 and mobile
  390×844, light and dark themes, and reduced motion: **28/28 passed** with one
  h1 and main per route, no horizontal overflow, zero active motion, zero
  unexpected console/page errors, and zero serious/critical axe findings.
- Keyboard-only checks passed. The skip link is the first focus target, is
  44.8 px high, and shows a 3 px yellow outline plus 6 px dark ring. Enter
  skips into main. The activity dialog traps reverse-Tab, Escape closes it,
  and focus returns to the opener. No visible mobile target was under 44×44.
- A fresh production worker controlled `/demo` with cache
  `linux-kid-lab-v9`. Offline reload preserved 13 cards and 3/20 progress and
  displayed **“You are offline. Saved activities still work.”** with no error.
- A same-origin worker-byte update simulation caused `controllerchange` and
  the visible notice **“An update is ready. Reload to use it.”**
- The manifest uses standalone display, versioned start URL, product colors,
  192×192 and 512×512 icons, and a 512×512 maskable icon. The social image is
  1200×630.
- Three fresh Lighthouse 13 mobile runs scored Performance **89, 100, 100**;
  the median is **100**. Accessibility, Best Practices, and SEO were 100 in all
  three. Median FCP was 0.95 s, LCP 1.20 s, TBT 88 ms, CLS 0, and transfer
  about 66 KiB. The 89 run was a 450 ms TBT runner outlier; the two immediate
  independent repeats met the ≥90 gate. Raw reports are in
  `.factory/verification-6-artifacts/lighthouse-live*.json`.

## Findings by severity

### Medium — optional activity-pack checkout is not registered

The landing page honestly says purchase setup is unavailable and renders no
dead checkout link. Existing-license restore and verification work, and the
free product retains all 20 activities, local progress, JSON transfer, and
printable progress tokens. A new visitor cannot buy the advertised one-time
$12 cut-out-card/weekend-mix pack until the external Sociobot billing product
is registered. This does not block the smallest useful free product and cannot
be repaired from this repository, but it remains the main product gap.

### Low — copy-audit version sentence is stale

`.factory/copy-audit.md` extracts **“Version 1.0.2.”** while the tested package
and live footer show 1.0.3. The page copy itself is correct; the audit document
should be refreshed on the next content change.

No release-blocking defect was found.
