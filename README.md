# Linux Kid Lab

Pick 20 short creative activities for a family Linux computer.

Linux Kid Lab lists short creative activities for parents whose child needs a
next step after a first learning app. Each activity gives three steps, one
extra idea, and a link to a creative app. Progress stays in this browser.
There are no accounts, ads, chat, scores, or behavior tracking.

Try the sample shelf at `/demo`, `/?demo=1`, or
<https://linux-kid-lab.sociobot.in/demo>. It uses a separate IndexedDB database
and never changes the real shelf.

## What is included

- 20 activities for ages 5–13 across drawing, code, sound, stories, and building
- Parent age choices and activity filters
- Saved progress, JSON export/import, and printable progress tokens
- Offline use after the first connected visit
- Suggested links to Tux Paint, Scratch, Krita, Audacity, and other creative apps

## Run and verify

Requirements: Node.js 20 or newer and npm.

```sh
npm ci
npm run dev
npm test
npm run build
```

`npm run build` writes the static site to `dist/`, with `dist/index.html` at
the root. Preview the build with `npm run preview`.

Playwright uses Chromium 1.58.2. It checks the demo, saved progress, offline
reload, export, printing, keyboard use, mobile layout, routes, and axe.
Claim commands are listed in [.factory/claims.json](.factory/claims.json).

## Data and privacy

Activity data stays in this browser on this device. Parent setup can export,
import, or clear it. Read `/privacy` and `/terms` in the app.

## Deploy

Deploy the contents of `dist/` as a static site. The included deployment
settings keep page links working and set security headers. Do not change DNS,
billing, or infrastructure from this repository.

## License

Code is available under the [MIT License](LICENSE). Artwork notes are in
[.factory/design.md](.factory/design.md).
