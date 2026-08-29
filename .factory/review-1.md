# Linux Kid Lab — adversarial first-read review 1

**Verdict: FAIL.** Reviewed 29 August 2026 against
<https://linux-kid-lab.sociobot.in> and commit
`e18b00f487067c661eb868ce2d2213a274e04003`.

The free activity shelf is clear and tryable. This is not a pass because the
advertised paid pack cannot be bought, the shipped static 404 does not follow
the site skeleton, the required copy-audit record is still incomplete and
stale, and several public claims/copy issues remain.

## Cold first read

Fresh browser contexts at 390×844 and 1440×900 gave the same answer before
scrolling:

- **What it does:** choose a short creative activity to do after school.
- **For whom:** parents of a child who has outgrown a first learning app, on a
  Linux family computer.
- **What to click first:** **Try it with sample data**. It says it will load a
  sample family activity shelf.

At 390 px the action was visible at y=643–692, so this part passes. No console
or page error occurred on the cold landing load. The cassette/zine visual
system is distinct and matches `.factory/design.md`; it is not a generic SaaS
template.

## Findings

### F-1-1 — BLOCKING — the advertised $12 pack has no purchase path

**Location / exact quote:** landing paid section and README: “Purchase setup
is unavailable right now. The free shelf and progress tokens remain
available.” The same section displays “$12” and “one time.”

**Why this fails:** a visitor is invited to consider a one-time activity pack,
but cannot buy it. This repeats the unresolved paid-purchase finding in
`verification-2.md`, `verification-5.md`, `verification-6.md`, and the prior
handoff. Hiding the dead link is honest, but it does not make the advertised
feature work end to end.

**Concrete fix:** register and enable the Sociobot billing product, show a
working Sociobot checkout action, and add a clean-demo Playwright claim that
follows the checkout handoff without exposing payment-provider details. If
purchase cannot be enabled, remove the paid section, $12 claim, pack-license
form, terms promise, and README pack promise until it can.

### F-1-2 — BLOCKING — the mandatory copy-audit record is incomplete and stale

**Location / exact quote:** `.factory/copy-audit.md` is titled “Landing copy
audit,” contains no README audit, says `Version 1.0.2.`, and does not list
visible headings such as “A calm shelf for Linux families.” The live footer
and `package.json` say `Version 1.0.3.`

**Why this fails:** this repeats the unresolved mandatory-copy-audit finding
from `verification-4.md` and the stale-version finding in
`verification-6.md`/the prior handoff. It also cannot provide the required
proof that all public copy was checked.

**Concrete fix:** regenerate the audit from the live/source landing and README,
including every sentence, all headings, buttons, term table, word count, and
flags. Make its version match the shipped footer or remove the version line.

### F-1-3 — HIGH — the live HTTP 404 is outside the required site skeleton

**Location / exact quote:** a fresh live visit to `/missing-tape` returned HTTP
404 with only “This tape has no activity,” “The address may be wrong, or the
page moved.” and “Return to the activity shelf.” `public/404.html` contains no
wordmark/header, skip link, Privacy/Terms footer links, canonical URL, meta
description, Open Graph metadata, or favicon.

**Why this fails:** the site-structure contract requires a consistent
header/footer with Privacy and Terms on every route, as well as route metadata.
The earlier CSP/styling/real-status 404 findings are fixed, but their live
replacement is only a partial 404 page.

**Concrete fix:** make the static 404 use the same semantic header, skip link,
footer, and product links as the app; retain its designed cassette recovery
art; and add the required route metadata. Verify a direct unknown URL returns
404, has one h1/main, all metadata, and zero console errors.

### F-1-4 — MEDIUM — several landing headings/slogans carry no useful section name

**Location / exact quotes:** “A calm shelf for Linux families,” “Your tape
counter,” “Pick one thing to make,” “From ‘what now?’ to making,” “Clear
boundaries,” and “A launcher, not a lesson plan.”

**Why this fails:** these do not reliably identify their section when read out
of context. “From ‘what now?’ to making” is a mood/metaphor heading, and the
others use product lore rather than naming progress, activities, steps, or
privacy. A rushed parent gains no information from them.

**Concrete fix:** replace them respectively with “Creative activities for Linux
families,” “Your activity progress,” “Choose an activity,” “How it works,”
“Privacy and limits,” and “What this activity shelf does not do.”

### F-1-5 — MEDIUM — README language is jargon-heavy and uses inconsistent terms

**Location / exact quotes:** “Linux Kid Lab is an offline, local-first activity
launcher…”, “Each activity has three steps, a playful twist, and an optional
link to an open creative tool.”, “There are no accounts, ads, chat, or behavior
analytics.”, and “The included Azure Static Web Apps configuration supplies SPA
fallback routes and security headers.”

**Why this fails:** “local-first,” “launcher,” “open creative tool,” “behavior
analytics,” “SPA,” and “fallback routes” assume technical knowledge. “Behavior
analytics” is also inconsistent with the landing/claim term “behavior
tracking.”

**Concrete fix:** use, for example: “Linux Kid Lab lists short creative
activities for a family Linux computer.” “Each activity gives three steps, one
extra idea, and a link to a free creative app.” “There are no accounts, ads,
chat, scores, or behavior tracking.” “The included deployment settings keep
page links working and set security headers.”

### F-1-6 — MEDIUM — public claim-like statements lack registered claims

**Location / exact quotes:** landing/terms/README say “Sociobot is the merchant
of record. Refunds are handled there.” README says “The generated hero image is
original project artwork.” None has its own applicable entry in
`.factory/claims.json`.

**Why this fails:** a buyer can rely on merchant/refund statements and a
visitor can rely on the artwork provenance statement. The claims registry
tests activity behavior and license verification, not merchant identity,
refund handling, or artwork provenance. The claims contract requires a test or
removal.

**Concrete fix:** add fixture-backed, observable claim tests/documented source
checks for statements that can be verified, with the exact locations in
`claims.json`; otherwise remove the untestable merchant/refund and “original”
assertions. Do not imply a refund policy without the merchant policy URL or a
verifiable local source.

## Copy audit performed in this review

No landing or README sentence exceeds 22 words. The word-count requirement
passes; the jargon, terminology, and heading findings above do not.

### Landing sentences

| Words | Sentence |
| ---: | --- |
| 13 | For parents whose child needs a next step after their first learning app. |
| 6 | Loads a sample family’s activity shelf. |
| 5 | Works after the first visit. |
| 5 | Progress stays on this device. |
| 4 | 20 activities are free. |
| 8 | The paths show drawing, coding, and sound activities. |
| 10 | Each card has three steps and one open tool suggestion. |
| 9 | Turn circles, squares, and triangles into a new creature. |
| 11 | Find three safe sounds and arrange them into a short rhythm. |
| 8 | Make a small pet with only four colors. |
| 11 | Show a beginning, a change, and an ending in three boxes. |
| 10 | Use arrow cards to write and test a tiny dance. |
| 11 | Build a map that helps a toy travel between three places. |
| 9 | Make a picture where every color follows one rule. |
| 10 | Guide a character through a maze to reveal a message. |
| 10 | Layer four short sounds into a loop that changes once. |
| 12 | Design a machine for a small problem that does not need solving. |
| 10 | Write a short story where the reader chooses what happens. |
| 9 | Make a small tile that changes when it repeats. |
| 10 | Build a game with one moving target and a score. |
| 9 | Combine one real space fact with an invented visit. |
| 11 | Design a readable symbol system and test it with a friend. |
| 9 | Make one key produce a useful chain of changes. |
| 10 | Edit household sounds into a one-minute beginning, middle, and end. |
| 10 | Turn something you count today into a clear visual pattern. |
| 10 | Design controls for an imaginary tool and test their labels. |
| 9 | Create rules that transform a drawing, tune, or story. |
| 8 | A parent picks one or more age bands. |
| 6 | A child follows three short steps. |
| 7 | The device saves progress for next time. |
| 11 | There are no accounts, ads, chat, scores, or behavior tracking. |
| 10 | Tool links may need an installed app or internet access. |
| 6 | Every activity also works with paper. |
| 10 | The free shelf includes all 20 activities and progress tokens. |
| 14 | A one-time $12 pack license adds cut-out activity cards and a four-week weekend mix. |
| 6 | Purchase setup is unavailable right now. |
| 8 | The free shelf and progress tokens remain available. |
| 4 | Verification uses Sociobot billing. |
| 7 | The free shelf stays available offline. |
| 6 | Sociobot is the merchant of record. |
| 4 | Refunds are handled there. |
| 2 | See terms. |
| 10 | Linux Kid Lab offers short local activities for young makers. |
| 2 | Version 1.0.3. |
| 8 | Generated illustration details are in the project notes. |

### README sentences

| Words | Sentence |
| ---: | --- |
| 12 | Pick 20 short creative activities for children on a Linux family computer. |
| 19 | Linux Kid Lab is an offline, local-first activity launcher for families whose child has outgrown a first educational app. |
| 17 | Each activity has three steps, a playful twist, and an optional link to an open creative tool. |
| 5 | Progress stays in the browser. |
| 9 | There are no accounts, ads, chat, or behavior analytics. |
| 9 | Try the isolated sample shelf at `/demo` or `https://linux-kid-lab.sociobot.in/demo`. |
| 11 | Demo changes use a separate IndexedDB database and never change the real shelf. |
| 14 | A one-time $12 printable-pack license adds cut-out activity cards and a four-week weekend mix. |
| 10 | The free shelf keeps the 20 activities and progress tokens. |
| 9 | Purchase setup is not currently available in the app. |
| 7 | Requirements: Node.js 20 or newer and npm. |
| 9 | The exact production build command is `npm run build`. |
| 11 | It writes the static site to `dist/`, with `dist/index.html` at the root. |
| 3 | Preview that build with `npm run preview`. |
| 22 | Playwright tests use Chromium 1.58.2 and cover the demo, local storage, offline reload, export, printing, licensing, keyboard use, mobile layout, and axe. |
| 5 | Claim-specific commands are listed in `.factory/claims.json`. |
| 5 | Activity data lives in IndexedDB. |
| 8 | Parent setup can export, import, or clear it. |
| 19 | License verification sends a token only to the Sociobot license verification endpoint after a parent chooses to verify it. |
| 6 | Sociobot is the merchant of record. |
| 7 | See `/privacy` and `/terms` in the app. |
| 9 | Deploy the contents of `dist/` as a static site. |
| 14 | The included Azure Static Web Apps configuration supplies SPA fallback routes and security headers. |
| 10 | No DNS, billing, or infrastructure changes belong in this repository. |
| 7 | Code is available under the MIT License. |
| 16 | The generated hero image is original project artwork; its prompt and provenance are recorded in `.factory/design.md`. |

README bullet fragments, headings, code blocks, navigation labels, and buttons
were also checked. No button uses a generic “Go,” “Submit,” or “Continue”
label. The heading/slogan problems are recorded in F-1-4.

## Demo, sandbox, claims, and privacy checks

- A cold one-click **Try it with sample data** flow opened `/demo` directly.
  Its first screen showed 13 realistic age-filtered activities and 3 of 20
  complete, plus the persistent “Demo — sample data, nothing is saved” banner,
  **Reset demo**, and **Start for real**.
- The demo storage/exit/reset checks passed. The clean-demo claim test confirms
  `demo:linux-kid-lab` is separate and removed on leaving; real progress starts
  at zero.
- Normal demo-use request logging observed only the product origin. The
  explicit license test is fixture-backed and permits only the documented
  Sociobot verification request.
- `npm ci` passed. Every literal command from `.factory/claims.json` passed:
  18/18. `npm test` passed 54/54 (53.7 s) on a clean rerun, and `npm run build`
  passed and produced `dist/`. An earlier full-suite attempt lost its preview
  server after 23 tests; a clean retry with Playwright web-server diagnostics
  completed, so it is recorded as runner instability rather than a failing
  claim.
- All 18 claims have one matching tag and no listed claim test failed. The
  external-link claim and this review crawl reached every discovered HTTP link
  with a final response below 400. `mailto:` links were explicitly identified.

## Structure, routing, and accessibility checks

- `/`, `/demo`, `/settings?demo=1`, `/privacy?demo=1`, `/terms?demo=1`, and
  `/print?demo=1` each returned 200, one h1, one main, a distinct appropriate
  title, and a dynamic canonical URL. `/missing-tape` returned 404, one h1,
  and one main, but fails F-1-3.
- The landing has valid title, `lang`, description, canonical, OG/Twitter
  metadata, favicon, social card, robots file, sitemap, and manifest. The live
  app has no cold-load console error. Deep links, back navigation, h1 focus,
  and the aria-live route status are implemented in `src/main.ts`.
- The source and prior 54-test suite cover keyboard dialog focus, 44 px mobile
  targets, reduced motion, and serious/critical axe issues. This review found
  no regression in the repaired earlier 404-CSP, modal-focus, contrast,
  mobile-CTA, AVIF MIME, cache, link, or complete-suite findings.

## Earlier finding recheck

| Earlier finding family | Current result |
| --- | --- |
| Dead Inkscape/tool link; missing/under-proved claims | Fixed: the current demo-backed tests cover all 20 cards and all official destinations. |
| Mobile CTA, dark contrast, invalid-license feedback, mobile targets, soft 404, cache headers | Fixed in the live build/tests. |
| 404 CSP/style failure | Fixed, but F-1-3 finds the replacement static page still lacks the required skeleton/metadata. |
| Modal reverse-Tab/Escape, stale visible version, paid price wording, AVIF MIME | Fixed in the app/live footer and tests. |
| Complete-suite timeout | Fixed: current `npm test` passed 54/54. |
| Unavailable paid purchase | **Unfixed: F-1-1.** |
| Incomplete/stale copy audit | **Unfixed: F-1-2.** |

## Missed leverage

The brief does not imply an AI feature; adding one to a local curated activity
shelf would be decorative. Import/export, offline use, demo isolation, and
printable tokens are present. The obvious missing job-to-be-done extension is
the paid-pack purchase path, already recorded as F-1-1.

## What would make this perfect

Enable or remove the unavailable paid offer, make the direct 404 a complete
product route, regenerate a truthful complete copy audit, remove or test every
unlisted claim, and replace the remaining mood/jargon copy with direct section
names and plain terms. Then repeat the cold mobile read, all claim commands,
full suite, route crawl, direct-404 check, and live privacy/offline checks.
