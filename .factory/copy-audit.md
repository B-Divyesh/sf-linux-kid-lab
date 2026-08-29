# Copy audit — Linux Kid Lab 1.0.5

Audited 29 August 2026 from the current app source and README. Each table row
contains one visible sentence, heading, fact, label, or control. A word is one
whitespace-delimited token; a standalone dash is punctuation, not a word.
Hyphenated and apostrophised words count as one. Each backticked command, URL,
or code path counts as one. The automated test `copy audit
word counts follow its documented rule` checks every numbered row below.

## Landing page — default state

| Words | Copy |
| ---: | --- |
| 5 | Creative activities for Linux families |
| 6 | Pick one creative activity after school |
| 13 | For parents whose child needs a next step after their first learning app. |
| 5 | Try it with sample data |
| 6 | Loads a sample family’s activity shelf. |
| 1 | Offline |
| 5 | Works after the first visit |
| 1 | Private |
| 5 | Progress stays on this device |
| 1 | Price |
| 4 | 20 activities are free |
| 13 | A cassette sends tape paths toward paper shapes, pixel art, and sound pads. |
| 8 | The paths show drawing, coding, and sound activities. |
| 3 | Your activity progress |
| 3 | 0 of 20 |
| 2 | activities made |
| 3 | Print progress tokens |
| 3 | The activity shelf |
| 3 | Choose an activity |
| 10 | Each card has three steps and one creative app suggestion. |
| 2 | Ages 5–7 |
| 2 | Ages 8–10 |
| 2 | 13 activities |
| 3 | Start this activity |
| 3 | Make it again |
| 1 | Made |
| 3 | How it works |
| 2 | Choose ages |
| 8 | A parent picks one or more age bands. |
| 3 | Pick a card |
| 6 | A child follows three short steps. |
| 3 | Stamp it made |
| 7 | The device saves progress for next time. |
| 3 | Privacy and limits |
| 7 | What this activity shelf does not do |
| 10 | There are no accounts, ads, chat, scores, or behavior tracking. |
| 11 | Creative app links may need an installed app or internet access. |
| 6 | Every activity also works with paper. |
| 4 | Read the privacy note |
| 10 | Linux Kid Lab lists short creative activities for Linux families. |
| 1 | Privacy |
| 1 | Terms |
| 4 | Built by Param Factory |
| 2 | Version 1.0.5. |
| 2 | Project notes |

## Landing page — demo and dynamic states

| Words | Copy |
| ---: | --- |
| 6 | Demo — sample data, nothing is saved |
| 2 | Reset demo |
| 3 | Start for real |
| 5 | Sample shelf for ages 8–13 |
| 6 | Pick the sample family’s next activity |
| 4 | Three activities are complete. |
| 7 | Open another card to see every step. |
| 3 | Sample activity shelf |
| 3 | 3 of 20 |
| 2 | Ages 11–13 |
| 4 | Your shelf is empty |
| 9 | Choose at least one age band to see activities. |
| 3 | Choose age bands |
| 2 | Paper alternative |
| 3 | Try this twist |
| 4 | Give me another twist |
| 3 | Suggested creative app: |
| 3 | Paper works too. |
| 6 | Creative app links may need internet. |
| 2 | Close activity |
| 3 | Made it again |
| 3 | Sample data reset. |
| 3 | Sample progress cleared. |

Activity instructions and twists are short direct imperatives. The activity
introductions shown on the landing shelf are audited individually:

| Words | Activity introduction |
| ---: | --- |
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

## README

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

README headings are **What is included**, **Run and verify**, **Data and
privacy**, **Deploy**, and **License**. They name their sections directly.

## Terminology

| Concept | One term used |
| --- | --- |
| Collection | activity shelf |
| Item | activity card |
| Sample mode | demo |
| Completion | progress or made |
| Browser database | IndexedDB |
| External software | creative app |

## Flags and claim mapping

No audited sentence exceeds 22 words. No banned marketing word appears. The
same external-software concept is always called a **creative app**; “open tool”
does not appear in product copy. Visitor-facing promises map to the 17 entries
in `.factory/claims.json`, including free access and real IndexedDB storage.
Untestable paid, merchant, refund, and artwork-origin promises remain removed.
