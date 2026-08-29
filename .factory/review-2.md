# Linux Kid Lab — adversarial first-read review 2

**Verdict: FAIL.** Reviewed on 29 August 2026 against production at
<https://linux-kid-lab.sociobot.in> and repository commit
`99a15115e0d24a50e49e3c144e1a24950a6dcaf3`.

## Cold first read

Fresh production browser contexts at 390×844 and 1440×900 were opened at `/`
before scrolling.

- **What it does:** gives a family one short creative activity to do after school.
- **For whom:** parents of a child who needs a next step after a first learning app, on a Linux family computer.
- **What to click first:** **Try it with sample data**; adjacent text says, **“Loads a sample family’s activity shelf.”**

This passes the first-screen gate. At 390 px the CTA was wholly visible from
y=663 to y=712. Production had no console errors on the cold landing load.
The cassette-zine visual system is distinct and not a generic SaaS template.

## Findings

### F-2-1 — BLOCKING — reopens F-1-2: the required copy-audit proof has incorrect word counts

**Location / exact quotes:** `.factory/copy-audit.md` reports **“Works after the first visit”** as 3 words (it is 5), **“The paths show drawing, coding, and sound activities.”** as 10 (it is 8), and README sentence **“Linux Kid Lab lists short creative activities for parents whose child needs a next step after a first learning app.”** as 18 (it is 20). It also combines **“Tool links may need an installed app or internet access. Every activity also works with paper.”** into one 13-word entry.

**Why this fails:** F-1-2 required a truthful, complete landing and README audit. The record is current in version but cannot be trusted as audit evidence; combining two sentences also fails the required sentence-by-sentence record.

**Concrete fix:** regenerate `.factory/copy-audit.md` from current source with one row per sentence, a documented token-count rule, and every README sentence and landing state.

### F-2-2 — BLOCKING — stale demo documentation still describes a removed license flow

**Location / exact quotes:** `.factory/demo.md` says **“Demo progress and demo license data are discarded instead of copied.”** It also says **“The license test intercepts the Sociobot verification response; it does not contact billing or spend money.”**

**Why this fails:** current code has no license state, verification request, billing call, or license test. This was already recorded in `verification-7.md` and its handoff. A verifier following the documentation is told to check functionality that does not exist.

**Concrete fix:** change the first sentence to “Demo progress is discarded instead of copied.” Remove the license-test sentence. Keep only the actual route, sample, reset, storage namespace, and offline check.

### F-2-3 — BLOCKING — the price promise has no claims.json entry

**Location / exact quote:** landing fact: **“20 activities are free.”**

**Why this fails:** this is a visitor-facing price claim. `twenty-activities` proves the count, but no claim proves that the complete shelf is free or that no payment, checkout, or paid lock appears.

**Concrete fix:** add a `free-activities` entry and tagged clean-demo test that reaches all 20 activities and asserts no payment, checkout, or paid-unlock UI/request. Otherwise remove the price fact.

### F-2-4 — BLOCKING — the README makes an unlisted real-storage claim

**Location / exact quote:** README, Data and privacy: **“Activity data stays in IndexedDB on this device.”**

**Why this fails:** `demo-indexeddb` proves only the `demo:linux-kid-lab` database and its deletion on demo exit. `local-progress` proves persistence, not that real activity data is stored in IndexedDB. A parent can rely on this privacy/storage statement.

**Concrete fix:** add `real-indexeddb-storage` with a fresh real-shelf test that records a completion, verifies `linux-kid-lab` and the saved state, and confirms demo storage is untouched. Or rewrite it as “Activity data stays in this browser on this device.”

### F-2-5 — BLOCKING — reopens F-1-5: “open tool” is jargon and conflicts with “creative app”

**Location / exact quotes:** landing: **“Each card has three steps and one open tool suggestion.”** Dialog: **“Suggested open tool:”** README: **“a link to a creative app.”** `.factory/copy-audit.md` also labels the same concept **“creative app / open tool.”**

**Why this fails:** a first-time parent is not told what an “open tool” is; it may mean a running app, browser tool, or open-source software. Two names for the same linked software repeat the jargon/inconsistent-terms problem from F-1-5.

**Concrete fix:** use **“creative app”** everywhere: “Each card has three steps and one creative app suggestion.” Change the dialog, Parent setup heading, and terminology table to the same term.

## Copy audit performed in this review

Word counts treat a visible URL or code path as one token and a hyphenated or
apostrophised word as one word. No reviewed sentence exceeds 22 words. The
copy findings are F-2-1 and F-2-5; landing headings are descriptive and buttons
name their outcomes.

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
| 10 | There are no accounts, ads, chat, scores, or behavior tracking. |
| 10 | Tool links may need an installed app or internet access. |
| 6 | Every activity also works with paper. |
| 10 | Linux Kid Lab lists short creative activities for Linux families. |
| 9 | Choose at least one age band to see activities. |

Headings checked: **Creative activities for Linux families**, **Pick one
creative activity after school**, **Your activity progress**, **The activity
shelf**, **Choose an activity**, **How it works**, **Privacy and limits**, and
**What this activity shelf does not do**. They name their content. Buttons
checked include **Try it with sample data**, **Start this activity**, **Make it
again**, **Print progress tokens**, **Reset demo**, and **Start for real**; none
is a generic Submit/Go/Continue control.

### README sentences and list items

| Words | Sentence or list item |
| ---: | --- |
| 10 | Pick 20 short creative activities for a family Linux computer. |
| 20 | Linux Kid Lab lists short creative activities for parents whose child needs a next step after a first learning app. |
| 15 | Each activity gives three steps, one extra idea, and a link to a creative app. |
| 5 | Progress stays in this browser. |
| 10 | There are no accounts, ads, chat, scores, or behavior tracking. |
| 9 | Try the sample shelf at `/demo`, `/?demo=1`, or `https://linux-kid-lab.sociobot.in/demo`. |
| 12 | It uses a separate IndexedDB database and never changes the real shelf. |
| 12 | 20 activities for ages 5–13 across drawing, code, sound, stories, and building |
| 6 | Parent age choices and activity filters |
| 9 | Saved progress, JSON export/import, and printable progress tokens |
| 7 | Offline use after the first connected visit |
| 12 | Suggested links to Tux Paint, Scratch, Krita, Audacity, and other creative apps |
| 7 | Requirements: Node.js 20 or newer and npm. |
| 12 | `npm run build` writes the static site to `dist/`, with `dist/index.html` at the root. |
| 7 | Preview the build with `npm run preview`. |
| 4 | Playwright uses Chromium 1.58.2. |
| 17 | It checks the demo, saved progress, offline reload, export, printing, keyboard use, mobile layout, routes, and axe. |
| 6 | Claim commands are listed in `.factory/claims.json`. |
| 8 | Activity data stays in IndexedDB on this device. |
| 8 | Parent setup can export, import, or clear it. |
| 6 | Read `/privacy` and `/terms` in the app. |
| 8 | Deploy the contents of `dist/` as a static site. |
| 11 | The included deployment settings keep page links working and set security headers. |
| 9 | Do not change DNS, billing, or infrastructure from this repository. |
| 7 | Code is available under the MIT License. |
| 5 | Artwork notes are in `.factory/design.md`. |

README headings **What is included**, **Run and verify**, **Data and privacy**,
**Deploy**, and **License** make sense out of context. Technical commands and
deployment instructions are developer documentation. `IndexedDB` is technical
terminology; F-2-4 gives the plain-language rewrite for the parent-facing
privacy statement.

## Demo, claims, sandbox, and privacy checks

- One click from the live hero opened `/demo`. Its first screen already showed
  the activity shelf in use: 13 age-filtered cards and 3 of 20 made.
- The persistent **“Demo — sample data, nothing is saved”** banner, **Reset
  demo**, and **Start for real** were present. Registered tests confirmed reset
  restores 3/20, leaving opens a separate empty real shelf, and the demo
  database is deleted.
- Production request logging during normal demo use observed only
  `https://linux-kid-lab.sociobot.in`. The offline registered test passed after
  a service-worker-controlled reload with the network disabled.
- Every literal command in `.factory/claims.json` was run from this clean
  dependency install: **15/15 passed**. `npm test` passed **51/51** and
  `npm run build` produced `dist/`. No listed claim test failed.
- F-2-3 and F-2-4 are inventory failures: those claims have no entry to run.

## Structure, routing, links, accessibility, and visual identity

- `/`, `/demo`, `/settings?demo=1`, `/privacy?demo=1`, `/terms?demo=1`, and
  `/print?demo=1` returned 200 with one h1, one main, route-specific title,
  and canonical URL. `/missing-tape` returned a designed HTTP 404 with the
  wordmark, skip link, footer, Privacy/Terms links, metadata, and recovery
  action.
- Production navigation from Parent setup and browser Back restored home,
  focused the new h1, and reset scroll to the route top. Source supplies a
  polite live route announcement.
- The root has `lang`, title, description, canonical, OG/Twitter metadata,
  favicon/apple icon, manifest, robots, sitemap, same-origin CSP, and no
  third-party fonts or scripts. The only console message during the explicit
  unknown-route scan was the expected browser resource notice for HTTP 404.
- A live 390 px axe scan on all seven routes found zero serious or critical
  violations. The full suite covers keyboard dialog behavior, focus, mobile
  targets, dark mode, and reduced motion.
- The crawl returned 2xx for every linked internal route and every external
  destination. The deliberate `/missing-tape` recovery check returned 404;
  `mailto:` destinations were not treated as HTTP links.

## Earlier finding recheck

| Earlier finding | Current result |
| --- | --- |
| F-1-1 unavailable paid pack | Fixed: no paid offer, checkout, merchant, or refund promise is shown. |
| F-1-2 stale/incomplete copy audit | **Unfixed: reopens as F-2-1.** |
| F-1-3 incomplete direct 404 | Fixed live and in `public/404.html`. |
| F-1-4 mood/non-descriptive headings | Fixed. Current headings name their sections. |
| F-1-5 README jargon/inconsistent terms | **Half-fixed: reopens as F-2-5.** |
| F-1-6 merchant/refund/artwork unlisted claims | Fixed: those claims are removed. New unlisted claims are F-2-3 and F-2-4. |
| Earlier dead-link, under-proved activity, modal, mobile, contrast, CSP/404, cache, MIME, and full-suite failures | Fixed. The 20-card tests, live crawl, full suite, and live route checks passed. |
| Verification-7 stale demo-license documentation | **Unfixed: reopens as F-2-2.** |

## Missed leverage

The brief does not imply an AI feature. Adding an AI step to a local curated
activity shelf would be decorative. Offline operation, sample data, progress
transfer, print tokens, and official app links are already present. No provider
key is embedded.

## What would make this perfect

Correct the copy-audit record, remove the obsolete license sentences, use
**creative app** consistently, and register/test the free-price and real-storage
promises. Then rerun the cold mobile read, all claim commands, the complete
test suite, production request log, and link/route crawl. Only a zero-finding
result can change this verdict to PASS.
