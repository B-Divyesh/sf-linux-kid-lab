# Linux Kid Lab — adversarial first-read review 3

**Verdict: PASS.** Reviewed 29 August 2026 against production at
<https://linux-kid-lab.sociobot.in> and repository commit
`ec32f6ac9450467f16657054a772d34b22d3f676`.

There are **zero findings**. The checks below were repeated from a fresh
browser context and a fresh local clone; no prior verification result was used
as a substitute for a check.

## Cold first read

Fresh, unscrolled production contexts at 390×844 and 1440×900 gave the same
answer.

- **What it does:** lets a parent pick a short creative activity after school.
- **For whom:** parents of a child who needs a next step after a first learning
  app, in a Linux family.
- **What to click first:** **Try it with sample data**; it says, **“Loads a
  sample family’s activity shelf.”**

The 390 px action was wholly visible from y=663.36 to y=712.16. The initial
screen has the plain headline **“Pick one creative activity after school”**,
the audience sentence, one result-naming primary action, and the three facts
for offline use, local progress, and price. Both cold loads returned HTTP 200
with no page errors or console errors. The cassette-zine art, printed-paper
palette, and tape-card activity shelf are recognisably specific to this
product rather than a generic SaaS layout.

## Copy audit

Word counts use the shipped audit rule: whitespace-delimited tokens;
hyphenated and apostrophised words count as one; a visible URL, path, or
backticked command counts as one. I independently checked the current source
and live landing text against this list. No sentence is over 22 words, no
banned marketing language appears, and no finding was raised for jargon,
inconsistent terminology, mood headings, or generic button labels.

### Landing sentences

| Words | Sentence |
| ---: | --- |
| 13 | For parents whose child needs a next step after their first learning app. |
| 6 | Loads a sample family’s activity shelf. |
| 5 | Works after the first visit. |
| 5 | Progress stays on this device. |
| 4 | 20 activities are free. |
| 8 | The paths show drawing, coding, and sound activities. |
| 10 | Each card has three steps and one creative app suggestion. |
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
| 11 | Creative app links may need an installed app or internet access. |
| 6 | Every activity also works with paper. |
| 10 | Linux Kid Lab lists short creative activities for Linux families. |
| 4 | Three activities are complete. |
| 7 | Open another card to see every step. |
| 9 | Choose at least one age band to see activities. |
| 3 | Paper works too. |
| 6 | Creative app links may need internet. |
| 3 | Sample data reset. |
| 3 | Sample progress cleared. |

The non-sentence landing copy was also checked: the descriptive section
headings are **Creative activities for Linux families**, **Your activity
progress**, **The activity shelf**, **Choose an activity**, **How it works**,
**Privacy and limits**, and **What this activity shelf does not do**. Controls
including **Try it with sample data**, **Start this activity**, **Make it
again**, **Print progress tokens**, **Reset demo**, and **Start for real** name
their result. The external-software term is consistently **creative app**.

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
| 8 | Saved progress, JSON export/import, and printable progress tokens |
| 7 | Offline use after the first connected visit |
| 12 | Suggested links to Tux Paint, Scratch, Krita, Audacity, and other creative apps |
| 7 | Requirements: Node.js 20 or newer and npm. |
| 12 | `npm run build` writes the static site to `dist/`, with `dist/index.html` at the root. |
| 5 | Preview the build with `npm run preview`. |
| 4 | Playwright uses Chromium 1.58.2. |
| 17 | It checks the demo, saved progress, offline reload, export, printing, keyboard use, mobile layout, routes, and axe. |
| 6 | Claim commands are listed in `.factory/claims.json`. |
| 9 | Activity data stays in this browser on this device. |
| 8 | Parent setup can export, import, or clear it. |
| 7 | Read `/privacy` and `/terms` in the app. |
| 9 | Deploy the contents of `dist/` as a static site. |
| 12 | The included deployment settings keep page links working and set security headers. |
| 10 | Do not change DNS, billing, or infrastructure from this repository. |
| 7 | Code is available under the MIT License. |
| 5 | Artwork notes are in `.factory/design.md`. |

README headings (**What is included**, **Run and verify**, **Data and
privacy**, **Deploy**, and **License**) identify their content. The technical
terms are confined to developer instructions; parent-facing storage copy says
“this browser on this device.”

## Demo, claims, privacy, and sandbox

- One click from the live hero opened `/?demo=1`. Its initial screen already
  showed the real product in use: 13 age-filtered activity cards and 3 of 20
  complete.
- The persistent **“Demo — sample data, nothing is saved”** banner, **Reset
  demo**, and **Start for real** were present. Reset restored the sample.
- In a fresh direct `/demo` browser context, the only database before and
  during demo use was `demo:linux-kid-lab`. After **Start for real**, the URL
  was `/`, the banner was absent, the demo database was gone, the real
  `linux-kid-lab` database was newly created, and progress was 0 of 20.
- Request logging for the live demo activity flow saw only
  `https://linux-kid-lab.sociobot.in`; no tracking or third-party runtime
  request was observed. The registered offline-reload claim also passed from
  the clean clone.
- All 17 literal commands listed in `.factory/claims.json` passed
  individually from a clean local clone after `npm ci`:
  `offline-reload`, `twenty-activities`, `free-activities`, `three-steps`,
  `paper-alternatives`, `local-progress`, `demo-sandbox`, `demo-indexeddb`,
  `real-indexeddb-storage`, `json-export`, `json-import`, `clear-progress`,
  `creative-app-suggestion`, `print-tokens`, `local-privacy`,
  `no-accounts-or-ads`, and `local-age-bands`.
- A second clean-clone `npm test` passed **60/60** and `npm run build` produced
  `dist/`. The built JavaScript was 10.38 kB gzip.

Every visitor-relevant landing, README, privacy, and demo statement maps to a
registered observable claim where it makes a behavioral promise. No unlisted
public claim was found. Legal permissions and advice in Terms are not product
capability or performance claims.

## Earlier findings recheck

| Earlier finding | Live and source result |
| --- | --- |
| F-1-1 unavailable paid pack | Fixed: the shelf is free and there is no paid pack, checkout, merchant, refund, or license promise; `free-activities` passed. |
| F-1-2 incomplete/stale copy audit | Fixed: the current 1.0.5 audit is sentence-level, has a token rule, and its automated check passed. |
| F-1-3 incomplete HTTP 404 | Fixed: `/missing-tape` returned HTTP 404 and the static cassette page has metadata, skip link, header, footer, legal links, and recovery action. |
| F-1-4 non-descriptive headings | Fixed: all checked landing headings name their sections. |
| F-1-5 README jargon/inconsistent terms | Fixed: visitor copy uses **creative app** consistently and plain browser wording. |
| F-1-6 unlisted merchant/refund/artwork claims | Fixed: unsupported promises are removed. |
| F-2-1 incorrect audit counts | Fixed: independently checked counts match the documented token rule. |
| F-2-2 stale demo-license documentation | Fixed: `.factory/demo.md` documents only the current demo flow. |
| F-2-3 unlisted free-price claim | Fixed: `free-activities` is registered and passed. |
| F-2-4 unlisted real-storage claim | Fixed: `real-indexeddb-storage` is registered and passed. |
| F-2-5 “open tool” jargon | Fixed: live UI, README, source, audit, and claim name use **creative app**. |

## Structure, accessibility, and routing

- `/`, `/demo`, `/settings`, `/privacy`, `/terms`, and `/print` each returned
  200 with a route-specific title, description, canonical URL, Open Graph and
  Twitter metadata, exactly one h1, one main, header, and footer. The route
  titles follow the required product/what-it-does pattern.
- `/missing-tape` returned a designed HTTP 404. `robots.txt`, `sitemap.xml`,
  favicon, Apple touch icon, manifest, language, security headers, and the
  static-web-app navigation fallback are present.
- Every crawled internal and external HTTP link returned 200; the two mailto
  links were explicit mailto destinations. No dead link was found.
- Cold production loads logged no console or page errors. The full suite
  includes keyboard dialog behavior, focus restoration, back-button route
  focus/announcement, 390 px reflow/targets, dark mode, reduced motion, and
  axe checks; it passed 60/60.

## Missed leverage

No additional feature is required by the brief. The expected import, export,
offline sample, progress storage, print tokens, and creative-app suggestions
are present. An AI step would not improve this intentionally local, curated
activity shelf and would be decorative rather than useful.

## What would make this perfect

Keep the claim registry, sentence audit, demo isolation, live-link crawl, and
clean-clone checks in the release routine. No product change is needed from
this review.
