# Linux Kid Lab — verification 7 handoff

## Result

**PASS** for candidate `1158ffffb4003a5165a2febf60c792f3d3ae7e57` at
<https://linux-kid-lab.sociobot.in> on 29 August 2026.

Independent evidence is in `.factory/verification-7.md`. Production matches
the candidate byte-for-byte for the sampled release files. No product code was
changed during verification.

## Verification summary

- `npm ci`: passed, 0 vulnerabilities.
- All 15 exact `.factory/claims.json` commands: passed.
- `npm test`: passed, 51/51 in 1.4 minutes.
- `npm run build`: passed; TypeScript and Vite produced `dist/`.
- Mandatory cold first-read and one-click sample demo: passed.
- Live normal, boundary, invalid-import, persistence, reset, and demo-isolation
  flows: passed with only same-origin requests.
- Desktop and 390 px mobile, keyboard, focus, dark mode, reduced motion,
  44 px targets, and axe serious/critical checks: passed.
- Live service-worker control, offline reload, and update notification: passed.
- Security headers, cache policy, real 404, manifest/icons, and link crawl:
  passed.
- Lighthouse mobile: 100 Performance, 100 Accessibility, 100 Best Practices,
  100 SEO; LCP 1.07 s, TBT 3 ms, CLS 0.
- Bundles: 10.13 kB gzip JS, 4.61 kB gzip CSS, 29.75 kB mobile hero.

## Findings

- **Medium, nonblocking:** the researched one-time curated pack is not shipped.
  The complete 20-activity core is free and makes no unavailable purchase
  promise.
- **Low:** `.factory/demo.md` retains two stale license references even though
  candidate 1.0.4 has no license flow.

There is no backend, sign-in, runtime AI, product-unlock endpoint, library, or
CLI. Rate-limit, Entra, AI gateway, backend concurrency, and package-consumer
checks do not apply.

## Reproduce

```sh
npm ci
npm test
npm run build
```

Run each `test` value in `.factory/claims.json` for the individual claim gate.
Open `/demo` for the isolated sample and inspect `.factory/evidence/` for live
screenshots, the verifier output, claim JSON, and Lighthouse report.

## Next steps

1. Remove the two obsolete license sentences from `.factory/demo.md`.
2. Treat a paid offline pack as separate scope; register it with Sociobot
   billing before adding any purchase copy or runtime license code.
