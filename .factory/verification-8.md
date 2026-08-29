# Linux Kid Lab — independent verification 8

**Result: PASS.**

Verified on 2026-08-29 against candidate commit
`efaf75cef76d6fb4f15e9de168df354938ee3ad6` and the live deployment
<https://linux-kid-lab.sociobot.in>.

No release-blocking defects were found. This verification supersedes the
earlier independent report in `.factory/verification.md`.

## First-read and demo gate

**PASS.** A cold live desktop visit presents the following before interaction:

- Job: “Pick one creative activity after school.”
- Audience/context: “For parents whose child needs a next step after their
  first learning app.”
- First action: **Try it with sample data**, with the immediate outcome “Loads
  a sample family’s activity shelf.”

The visible facts state offline use, local progress, and that all 20
activities are free. The first action opens `/?demo=1` in one click. It shows
the persistent “Demo — sample data, nothing is saved” banner, Reset demo, and
Start for real. Reset restored the seeded 3/20 progress; leaving the demo
showed a separate real shelf at 0/20.

## Clean-checkout quality gates

The checkout was already exactly at the candidate SHA before testing.

- `npm ci`: PASS — 22 packages installed; npm reported 0 vulnerabilities.
- Every literal command registered in `.factory/claims.json`: **17/17 PASS**
  individually, each starting the production build and demo-backed Playwright
  entry point.
- `npm test`: **PASS — 60/60 Chromium tests**. This includes the full route
  matrix over desktop and 390×844 mobile, light and dark themes, reduced
  motion, and axe scans.
- `npm run build`: PASS — includes `tsc --noEmit` and writes `dist/`.
- There is no separate lint script in `package.json`.

| Claim id | Result |
| --- | --- |
| offline-reload | PASS |
| twenty-activities | PASS |
| free-activities | PASS |
| three-steps | PASS |
| paper-alternatives | PASS |
| local-progress | PASS |
| demo-sandbox | PASS |
| demo-indexeddb | PASS |
| real-indexeddb-storage | PASS |
| json-export | PASS |
| json-import | PASS |
| clear-progress | PASS |
| creative-app-suggestion | PASS |
| print-tokens | PASS |
| local-privacy | PASS |
| no-accounts-or-ads | PASS |
| local-age-bands | PASS |

## End-to-end product checks

- Normal real-shelf completion changed progress from 0/20 to 1/20 and
  survived a reload. Removing every age band showed the intentional empty
  shelf and its recovery action.
- The sample shelf began at 3/20. Reset demo restored that seeded state; Start
  for real discarded the demo and left the real shelf empty.
- Invalid JSON import showed the actionable error: “That file is not a Linux
  Kid Lab progress export. Choose the JSON file from this app.”
- The claim suite verified valid JSON import/export, printing three sample
  tokens, clearing saved progress, 20 cards, three steps per card, a paper
  alternative per card, and official creative-app destinations.
- Every distinct live creative-app destination plus the visible Param Factory
  and project-notes links returned HTTP 200 on this run.

## Privacy, PWA, accessibility, and deployment

- A live normal demo flow made requests only to
  `https://linux-kid-lab.sociobot.in`; no analytics, third-party scripts,
  accounts, ads, chat, scores, or behavioural tracking were observed.
- Browser response headers on `/` include CSP with `connect-src 'self'`, HSTS,
  `X-Content-Type-Options: nosniff`, Referrer-Policy, and Permissions-Policy.
  `/missing-tape` correctly returns a styled HTTP 404.
- A controlled live `/?demo=1` service worker reload succeeded offline with
  its demo heading, 13 visible cards, banner, and no console/page errors. A
  controlled `registration.update()` with a new worker produced “An update is
  ready. Reload to use it.” The shipped worker uses versioned caches,
  `skipWaiting`, and `clients.claim`.
- `verify-url.sh` against the live root passed: HTTP 200; title; `lang=en`;
  one h1; main landmark; no missing image alt text or unnamed buttons; zero
  console/page errors. Keyboard testing reached the skip link first with a
  visible 3px focus outline; dialog Shift+Tab, Escape, and opener-focus
  restoration worked.
- Full-suite axe scans report **0 serious/critical issues**. At 390px the
  tested live view had no horizontal overflow; the reduced-motion tests found
  no remaining animation or transition durations.
- Live cache policy is correct for immutable hashed JS/CSS
  (`max-age=31536000, immutable`) and uses no-cache/no-store for `sw.js`.
  Build sizes are 10,379 bytes gzip JS, 4,309 bytes gzip CSS, and 29,752 bytes
  for the selected mobile hero AVIF, all within the static-PWA budgets.
- Candidate-built and live SHA-256 values match exactly for `index.html`,
  hashed JS, hashed CSS, `sw.js`, `manifest.webmanifest`, `404.html`, and
  `404.css`. The live deployment is therefore the tested candidate build.

No server-side product or unlock endpoint is shipped by this static PWA, so
there is no request allowance or authentication tenant to test.

## Defects by severity

None found.

## Reproduce

```sh
npm ci
# Run each exact command listed in .factory/claims.json
npm test
npm run build
```

Open `https://linux-kid-lab.sociobot.in/?demo=1`, wait for the service worker,
then disable the network and reload to reproduce the offline check.
