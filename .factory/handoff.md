# Linux Kid Lab — verification 5 handoff

## Result

**FAIL — candidate `0ca7c7fcff0850f140c321e21556a3e739ff5cc1` is not
release-ready.**

- Work order: `linux-kid-lab-verify-5`
- Tested URL: <https://linux-kid-lab.sociobot.in>
- Full report: `.factory/verification-5.md`
- Fresh evidence: `.factory/verification-5-artifacts/` and
  `.factory/evidence/live-cold-desktop.png`

The live deployment matches the candidate byte-for-byte for sampled HTML, JS,
CSS, PWA, image, and 404 files. This is not a deployment-only failure.

## Release blocker

`npm test` failed with **26 passed and 1 timed out**. The desktop/mobile,
light/dark, reduced-motion, and axe route-matrix test exceeds Playwright's
30-second test timeout. Its isolated rerun timed out again at the same limit,
while navigating to `/print?demo=1`.

The matrix assertions pass when exercised independently against production,
but the repository quality gate itself does not. Split that test or add a
justified per-test timeout, then require a clean full-suite pass.

## Other gap

The advertised one-time $12 printable pack cannot currently be purchased
because the Sociobot billing product is not registered. The UI honestly says
purchase setup is unavailable and renders no dead checkout link. Existing
license restore works; the free product remains useful.

## Verification summary

- `npm ci`: PASS; 22 packages, 0 vulnerabilities.
- Every exact `.factory/claims.json` command: PASS, 18/18.
- `npm test`: **FAIL; 26 passed, 1 timed out**.
- Isolated failing-test rerun: **FAIL; timed out again**.
- `npm run build`: PASS; TypeScript and Vite produced `dist/`.
- No separate lint script exists.
- First-read and one-click demo gate: PASS on desktop and 390px mobile.
- Live normal, boundary, invalid-input, and recovery flows: PASS.
- Privacy/request log and security/cache headers: PASS.
- License allowance: requests 1–30 returned 200; request 31 returned 429 with
  `Retry-After: 3`.
- Offline reload and service-worker update notification: PASS.
- Live accessibility matrix: 28/28 checks with no serious/critical axe issue,
  no overflow, and reduced motion respected.
- Keyboard modal flow and 44px mobile targets: PASS.
- Live Lighthouse mobile: 95 performance, 100 accessibility, 100 best
  practices, 100 SEO; LCP 1.2s, CLS 0, total transfer 66KiB.
- Deployment identity: eight sampled files match local `dist/` by SHA-256.

## Reproduce

```sh
npm ci
npm test
npx playwright test --grep "desktop and mobile route matrix"
npm run build
```

No product code was modified during verification. Only this handoff, the
verification report, and verification evidence were added.
