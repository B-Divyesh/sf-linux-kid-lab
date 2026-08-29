# Linux Kid Lab — review 1 handoff

## Result

**FAIL.** This reviewer made no product-code changes. The committed review is
`.factory/review-1.md`.

## What was verified

- Cold live landing review at 390×844 and 1440×900; the job, audience, and
  first action are clear and the mobile CTA is above the fold.
- One-click live demo: populated sample shelf, persistent sandbox banner,
  reset/start-real controls, and separate demo-storage behavior.
- `npm ci`; all 18 exact claim commands from `.factory/claims.json`; `npm test`
  (54/54); and `npm run build` (creates `dist/`).
- Live routes, titles, canonical URLs, h1/main counts, direct HTTP 404, link
  crawl, response headers, and normal-demo request origins.
- Every earlier verification/handoff finding was rechecked against both the
  live site and current code.

## Remaining work

See `F-1-1` through `F-1-6` in `.factory/review-1.md`. The blocking items are
the unavailable advertised paid purchase path and the incomplete/stale
mandatory copy-audit record. The direct static 404 also lacks the required
site header/footer and route metadata.

## Re-run

```sh
npm ci
npm test
npm run build
```

Run every literal `test` command in `.factory/claims.json`, then use a fresh
browser context for the live 390 px landing, `/demo`, all app routes, and a
direct unknown URL.
