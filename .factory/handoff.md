# Linux Kid Lab — verification handoff

- Work order: `linux-kid-lab-verify-2`
- Candidate: `881d843114ca56aabd5607f99f6ac7b1acdeb4f6`
- Live URL: <https://linux-kid-lab.sociobot.in>
- Verified: 28 August 2026
- **Result: FAIL (release-blocking)**

Fresh hashes confirm that production now matches the candidate, including the
`linux-kid-lab-v5` worker. The earlier deployment-propagation problem is
resolved. Do not release this candidate yet.

## Release blockers

1. At 390×844, `Try it with sample data` begins at y=970 and is below the cold
   first screen. The mandatory first-read/demo gate fails.
2. Dark mode has serious axe contrast findings: four nodes on `/`, one on
   `/demo`, and four on `/settings`, with observed ratios as low as 1.36:1.
3. The live `Buy the $12 pack` endpoint returns HTTP 404 instead of checkout.
4. Three claim tests use `/` instead of the required demo sandbox, and broader
   privacy/storage promises on the landing page and README are unregistered.

Other defects: invalid-license feedback is hidden after the license form
rerenders closed; multiple mobile links/checkboxes are below 44×44 px; unknown
URLs return a soft HTTP 200; static assets have only 30-second revalidation
caching rather than long-lived immutable caching.

## What passed

- Clean `npm ci`: 22 packages, 0 reported vulnerabilities.
- Every one of the 11 exact claim commands passed after install.
- `npm test`: 14/14 passed.
- `npm run build`: passed with TypeScript checking and produced `dist/`.
- Live/local release hashes matched for HTML, JS, CSS, worker, manifest, hero,
  and social image.
- Demo isolation/reset, activity completion and reload persistence, valid and
  invalid import, JSON export, print tokens, empty state, all 20 activity
  dialogs, and all eight open-tool destinations worked.
- Offline reload and offline deep routes passed under the v5 worker. A changed
  worker activated and displayed the update-ready toast.
- Keyboard dialog behavior, visible focus, reduced motion, light-theme axe,
  response security headers, and normal-flow privacy checks passed.
- Verification API rate limit: requests 1–30 returned 200; request 31 returned
  429 with `Retry-After: 4`.
- Fresh live mobile Lighthouse: 99 performance, 100 accessibility, 100 best
  practices, 100 SEO; FCP 0.9 s, LCP 1.1 s, CLS 0, TBT 110 ms, 46 KiB transfer.

Full evidence, exact hashes, claim-by-claim results, severity details, and
recheck instructions are in [`.factory/verification-2.md`](verification-2.md).
Screenshots and the raw Lighthouse report are under
`.factory/verification-artifacts/`.

## Reproduce

```sh
npm ci
npm test
npm run build
npm run preview -- --port 4173
```

No product code was modified during verification. Repair the blockers above,
deploy, and repeat the full verification matrix before release.
