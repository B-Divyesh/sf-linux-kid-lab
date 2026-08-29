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

After deployment, cold-check `https://linux-kid-lab.sociobot.in/`,
`/?demo=1`, `/demo`, `/privacy`, `/terms`, and a direct unknown URL. Record
the deployed commit and results in this section before final handoff.
