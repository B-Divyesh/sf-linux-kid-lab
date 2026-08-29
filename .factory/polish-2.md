# Polish 2 — cumulative finding resolution

Base review: `b901f6167daabab713713b76060fa5ffe3e6a5cd`.
Deployed repair: `bf4b6d29f3baca8c0dcbec7c2a39ce922b8c7e0f`.
Production deployment: `7926acc3-78c1-42e8-be3f-0339f56cef0b`.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the unavailable paid pack fully removed. Removed its remaining unused styles. The complete 20-card shelf is free and has no checkout, license, merchant, or refund UI. | `@claim:free-activities all 20 activities are available without payment`; clean clone pass; live `/?demo=1` check opened all sample UI without a payment request; `.factory/evidence/polish-2/live-check.json`. |
| F-1-2 | Rebuilt `.factory/copy-audit.md` for 1.0.5 with a documented token rule, separate rows for every sentence, default/demo/dynamic landing states, all activity introductions, every README sentence/list item, terminology, and flags. | `copy audit word counts follow its documented rule`; 114 numbered rows checked; live mobile first screen in `.factory/evidence/polish-2/live-root/landing-mobile.png`. |
| F-1-3 | Preserved the full cassette-zine HTTP 404 and added its manifest link. It has the standard header/footer, skip link, legal links, title, description, canonical, social metadata, favicon, and one h1/main. | `a real static 404 keeps its cassette styling under style-src self without a CSP console error`; live `/missing-tape` returned 404 with no page errors; `.factory/evidence/polish-2/live-root/404-mobile.png`. |
| F-1-4 | Kept every descriptive replacement heading: Creative activities for Linux families, Your activity progress, Choose an activity, How it works, Privacy and limits, and What this activity shelf does not do. | `landing page explains the job and has a sound document outline`; copy audit; live `/` cold check. |
| F-1-5 | Replaced the remaining “open tool” wording in the shelf, dialogs, Parent setup, Privacy, Terms, claims, and tests with one term: “creative app.” | `@claim:creative-app-suggestion every activity has a working official creative app link`; all eight destinations returned HTTP 200 on the live recheck. |
| F-1-6 | Kept merchant, refund, and artwork-origin promises out of public copy. Registered the newly identified free-access and real-storage promises. | `claims registry and tagged tests remain one-to-one`; 17 registered claims and 17 unique tags; source scan and all 17 clean-clone claim commands pass. |
| F-2-1 | Corrected the inaccurate and combined audit rows, including “Works after the first visit,” the hero caption, the README audience sentence, and the two separate privacy sentences. Added an automated row-count verifier so drift fails `npm test`. | `copy audit word counts follow its documented rule`; `.factory/copy-audit.md`; clean-clone 60/60 suite. |
| F-2-2 | Removed both obsolete license references from `.factory/demo.md`; it now documents only the real routes, sample, reset, exit, IndexedDB namespace, and offline check. | Documentation source check; `@claim:demo-sandbox`; `@claim:demo-indexeddb`; live Reset demo and Start for real checks in `.factory/evidence/polish-2/live-check.json`. |
| F-2-3 | Added `free-activities` to `.factory/claims.json`. Its clean query-demo test reaches all 20 activities and rejects payment UI and cross-origin requests. | `@claim:free-activities all 20 activities are available without payment`; clean-clone individual pass; live `/?demo=1`. |
| F-2-4 | Added `real-indexeddb-storage`. The test changes an age band and twist, completes an activity, reads the full saved record from `linux-kid-lab`, and proves no demo database was created. README uses the clearer browser wording. | `@claim:real-indexeddb-storage real activity data is saved only in the real IndexedDB database`; clean-clone individual pass. |
| F-2-5 | Standardized “creative app” everywhere and renamed the claim/tag. Parent setup now says what the links are and where to install apps. | `@claim:creative-app-suggestion every activity has a working official creative app link`; source scan contains no old term in product copy; live external-link check returned 200 for all eight apps. |

## Required cross-cutting checks

- The first-screen action now points directly to `/?demo=1`. At 390×844 its
  bottom edge is y=712.16. The live screenshot is
  `.factory/evidence/polish-2/live-root/landing-mobile.png`.
- `/?demo=1` and `/demo` show the populated shelf, persistent banner, Reset
  demo, and Start for real. Internal navigation preserves demo mode. Exiting
  deletes `demo:linux-kid-lab`; the real shelf remains unchanged. Screenshot:
  `.factory/evidence/polish-2/live-demo/demo-mobile.png`.
- Every app route updates title, description, canonical, Open Graph, and
  Twitter metadata. Browser Back resets scroll, focuses the h1, and updates
  the polite announcement. Every footer contains Privacy and Terms.
- The live route matrix covered seven routes at 390 px. Fourteen axe scans
  covered light/dark mode with reduced motion; none had a serious or critical
  issue. Normal demo use requested only the product origin.
- The live demo reloaded offline under service-worker control with 13 cards.
  Live Lighthouse: Performance 100, Accessibility 100, Best Practices 100,
  SEO 100, LCP 1.2 s, TBT 0 ms, CLS 0. Raw report:
  `.factory/evidence/polish-2/lighthouse-live.json`.

No finding from Review 1 or Review 2 remains open.
