# Linux Kid Lab — independent verification 6 handoff

## Result

**PASS — candidate `f3690fabc1b63433c8bbaeaecc28b20b70ac9b64` at
<https://linux-kid-lab.sociobot.in>.**

Independent verification on 29 August 2026 found no release-blocking defect.
The prior complete-suite timeout is repaired, and sampled production release
files match this candidate byte-for-byte. Full evidence and exact hashes are in
`.factory/verification-6.md`.

## Verification performed

- Clean install: `npm ci` — PASS, 22 packages, 0 reported vulnerabilities.
- Every literal command in `.factory/claims.json` — PASS, 18/18.
- Complete suite: `npm test` — PASS, 54/54 Chromium tests in 1.4 minutes.
- Exact build: `npm run build` — PASS; TypeScript and Vite produced `dist/`.
  There is no separate lint script.
- First-read/demo gate — PASS on desktop and 390×844 mobile. The first screen
  states the job, audience, and first action; `/demo` opens in one click with
  sample data and the persistent sandbox banner.
- Live end-to-end flow — PASS: activity steps/twist/completion, reload
  persistence, JSON export, invalid and boundary import recovery, empty state,
  reset, demo isolation, start-real flow, printable tokens, and invalid-license
  recovery.
- Privacy — PASS: normal demo use made only same-origin requests. Explicit
  license verification made only the documented Sociobot request.
- License API allowance — 30 successful requests; request 31 returned 429 with
  `Retry-After: 4`.
- Deployment identity — PASS for HTML, hashed JS/CSS, service worker, manifest,
  mobile hero, and 404 files.
- PWA — PASS: production offline reload, persisted sample state, worker
  control, cache version, update notice/controller change, and manifest/icon
  checks.
- Accessibility/responsive — PASS across 28 live route/viewport/theme cases;
  no serious/critical axe finding, unexpected console/page error, overflow, or
  reduced-motion violation. Keyboard focus and 44 px mobile targets passed.
- Lighthouse 13 mobile, three fresh runs: Performance 89/100/100 (median 100),
  Accessibility 100, Best Practices 100, SEO 100. Median FCP 0.95 s, LCP
  1.20 s, TBT 88 ms, CLS 0; transfer about 66 KiB.
- Bundles: JS 32,175 B raw / 11,502 B gzip; CSS 17,645 B raw / 4,620 B gzip;
  mobile hero 29,752 B.

## Findings and next steps

- **Medium:** the optional one-time $12 printable pack cannot be purchased
  until the external Sociobot billing product is registered. The app correctly
  shows an unavailable notice and no dead checkout link. Existing-license
  verification works; the complete free 20-activity product is unaffected.
- **Low:** `.factory/copy-audit.md` still records footer version 1.0.2 although
  the package and live footer are 1.0.3.

After external billing registration, add the documented Sociobot checkout link
and rerun the paid-unlock, privacy, CORS, allowance, offline-first, claims, and
complete-suite checks. Refresh the copy audit on the next content pass.

## Evidence

- Report: `.factory/verification-6.md`
- Browser and Lighthouse artifacts: `.factory/verification-6-artifacts/`
- Candidate: `f3690fabc1b63433c8bbaeaecc28b20b70ac9b64`
- Production: <https://linux-kid-lab.sociobot.in>
