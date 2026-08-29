# Polish 1 — review finding resolution

Base review: `2b1494e33e9b7e8aa3f9ec4018a933fc62822d57`.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Removed the unavailable $12 pack completely. There is no purchase, license, merchant, refund, or paywall promise until a real Sociobot product is enabled. The free activity shelf, export, and print tokens remain. | Source scan has no app/README/claims paid offer. `npm test` 51/51; all 15 current claim commands pass. |
| F-1-2 | Replaced the stale partial audit with `.factory/copy-audit.md` for v1.0.4. It records landing/README copy, headings, controls, activity text, word counts, flags, and terms. | `.factory/copy-audit.md`; footer and package both report 1.0.4; landing test passes. |
| F-1-3 | Rebuilt `public/404.html` and `public/404.css` as a complete cassette-zine route: skip link, wordmark, main navigation, one h1/main, Privacy/Terms footer, route title, description, canonical, OG/Twitter image, favicon, and no inline style. | Static-404 Playwright test; local HTML metadata check; `npm test` 51/51. |
| F-1-4 | Replaced the reviewed non-descriptive section copy with “Creative activities for Linux families,” “Your activity progress,” “Choose an activity,” “How it works,” “Privacy and limits,” and “What this activity shelf does not do.” | `.factory/copy-audit.md`; `landing page explains the job and has a sound document outline` passes. |
| F-1-5 | Rewrote README language around simple words: activity shelf, creative app, this browser, and deployment settings. Removed technical jargon from visitor-facing explanation. | README audit in `.factory/copy-audit.md`; no sentence exceeds 22 words. |
| F-1-6 | Removed untestable merchant/refund and artwork-origin assertions. Kept testable privacy, offline, activity, import/export, print, and demo claims in a 15-entry registry. | `.factory/claims.json`; each tag occurs exactly once; all 15 literal claim commands pass. |
| Demo requirement | `/?demo=1` now renders the same populated sample shelf as `/demo`, rather than the marketing page with demo storage behind it. | `the direct ?demo=1 entry opens the populated sample shelf` passes; screenshot: `.factory/verification-artifacts/polish-1/demo-desktop.png`. |

## Live recheck

Repair commit `91b48ae7372fd3e3a54824c1b5300401a06f3d53` was deployed by the
factory static work-order deployer as Azure deployment
`bda43591-af64-4a8f-837d-5f69be08e1f3`.

| Live URL | Result |
| --- | --- |
| `https://linux-kid-lab.sociobot.in/` | Cold HTTP 200; expected landing title, one h1/main, no console errors. |
| `https://linux-kid-lab.sociobot.in/?demo=1` | Cold HTTP 200; **Demo — Linux Kid Lab**, populated sample shelf, demo banner, and Reset demo control. Screenshot: `.factory/verification-artifacts/polish-1/live-demo/screenshot-desktop.png`. |
| `https://linux-kid-lab.sociobot.in/demo` | Cold HTTP 200; same isolated sample shelf, banner, and reset control. |
| `https://linux-kid-lab.sociobot.in/privacy` | Cold HTTP 200; Privacy title, one h1/main, no console errors. |
| `https://linux-kid-lab.sociobot.in/terms` | Cold HTTP 200; Terms title, one h1/main, no console errors. |
| `https://linux-kid-lab.sociobot.in/missing-tape` | HTTP 404; static cassette 404 with canonical, metadata, header, main, Privacy/Terms footer, one h1, and no console errors. |

Factory URL verification evidence is in
`.factory/verification-artifacts/polish-1/live-root/verify.json`. A live
Playwright axe scan at 390×844 found zero serious or critical violations. Live
Lighthouse measured performance 100, accessibility 100, LCP 1,050 ms, and
CLS 0; evidence is `.factory/verification-artifacts/polish-1/lighthouse-live.json`.
