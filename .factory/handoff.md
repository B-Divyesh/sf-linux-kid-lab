# Linux Kid Lab — verification 4 handoff

## Result

**FAIL — release-blocking.**

- Work order: `linux-kid-lab-verify-4`
- Tested candidate: `1d88091f1ab6a4387ac22ade737e1cf06720a947`
- Live URL: <https://linux-kid-lab.sociobot.in>
- Verification date: 29 August 2026
- Full report: [`.factory/verification-4.md`](verification-4.md)

The live deployment matches the candidate. This result is based on fresh
product evidence and is not the earlier deployment-only failure.

## Release blockers and defects

1. **High — modal keyboard focus escapes.** In live `/demo`, use Tab to focus
   an activity, press Enter, then immediately press Shift+Tab. Focus moves from
   the focused dialog container to the footer's project-notes link outside the
   modal. Escape then leaves the dialog open because the keyboard handler is
   scoped to the dialog. Add focus containment, global modal Escape handling,
   opener restoration, and an immediate reverse-tab regression.
2. **Medium — remaining mobile touch targets are too short.** At 390px,
   `Print progress tokens` is 24.8px high; `Read the privacy note`, paid-section
   `terms`, and both contact email links are 16–17px high. The contract requires
   44×44px for every interactive target.
3. **Medium — visible version mismatch.** The live footer says `Version 1.0.1`;
   `package.json` is `1.0.2`.
4. **Medium — paid-tier copy omits the price and one-time purchase wording.**
   Purchase setup is honestly unavailable and no dead checkout link is shown,
   but the visible paid section contains neither `$12` nor “one-time.”
5. **Low — response/copy polish.** The mobile hero AVIF is served as
   `application/octet-stream`, and the mandatory copy audit omits the visible
   vague caption `One tape. Many ways to make.` plus the footer sentences.

No product code was changed by this verification worker.

## Passing evidence

- Mandatory cold first-read: **PASS** on desktop and 390×844 mobile. The page
  says what it does, names parents after a first learning app, and shows the
  one-click `Try it with sample data` action before the fold.
- Claims gate: **18/18 PASS** after `npm ci`; every id is unique and appears in
  exactly one tagged test.
- Full local suite: `npm test` **PASS, 27/27**.
- Exact production build: `npm run build` **PASS**; TypeScript passes and
  `dist/` is produced. JS is 11.42KB gzip and CSS is 4.55KB gzip.
- Functional demo: sample 13 cards/3 completions; all age bands expose 20;
  three-step activities, twists, paper alternatives, completion persistence,
  JSON export/import, invalid import recovery, empty age-band state, reset,
  leaving-demo cleanup, progress tokens, and valid-license fixture all pass.
- Privacy: a full normal demo flow made same-origin requests only. Explicit
  invalid-license verification made only the documented Sociobot request and
  displayed a visible recovery message. No analytics, CDN scripts/fonts,
  accounts, ads, chat, console errors, or page errors were found.
- Billing endpoint: fresh requests 1–30 returned 200; request 31 returned 429
  with `Retry-After: 4`. The observed allowance is 30 per client window.
- Links: all 26 discovered internal and external destinations passed; mailto
  links were explicit.
- PWA: live worker control, v7 shell cache, offline `/demo` reload, offline
  notice, isolated IndexedDB, and independent update simulation all pass.
  `updatefound`, `controllerchange`, and the visible update notice occurred.
- Accessibility matrix: 28 checks over seven routes, both light/dark themes,
  desktop/mobile, and reduced motion found zero serious/critical axe issues,
  no overflow, one h1/main per route, and no page/console/request errors. Axe
  does not cover the manual modal focus defect.
- `/opt/fleet/lib/verify-url.sh`: **PASS** locally and live.
- Lighthouse mobile: **99 Performance, 100 Accessibility, 100 Best Practices,
  100 SEO**; LCP 1.2s, CLS 0, TBT 130ms, total transfer 67,739 bytes.
- Response policy: CSP, HSTS, nosniff, strict-origin referrer policy,
  Permissions-Policy, immutable hashed assets, no-store worker, and real
  styled HTTP 404 all pass.
- Deployment identity: SHA-256 matched for `index.html`, hashed JS/CSS,
  `sw.js`, manifest, mobile hero, `404.html`, and `404.css`.

## Reproduce locally

```sh
npm ci
npm test
npm run build
npm run preview
```

There is no separate lint script. The product is a static PWA, not a library,
CLI, or backend. It has no sign-in, so consumer-package, backend persistence,
and Entra authority checks do not apply.

## Next verification

After repairing the defects above, rerun every exact command in
`.factory/claims.json`, `npm test`, `npm run build`, and the live manual
Shift+Tab/Escape modal path. Recheck every mobile interactive box, both-theme
axe, cold first-read, offline and update behavior, the 30-request endpoint
allowance, Lighthouse, headers, links, and local/live hashes.
