# Linux Kid Lab

Pick 20 short creative activities for children on a Linux family computer.

Linux Kid Lab is an offline, local-first activity launcher for families whose
child has outgrown a first educational app. Each activity has three steps, a
playful twist, and an optional link to an open creative tool. Progress stays in
the browser. There are no accounts, ads, chat, or behavior analytics.

Try the isolated sample shelf at `/demo` or
<https://linux-kid-lab.sociobot.in/demo>. Demo changes use a separate IndexedDB
database and never change the real shelf.

## What is included

- 20 free activities for ages 5–13 across drawing, code, sound, stories, and building
- Parent-selected age bands and filters
- Local progress, JSON export/import, and printable progress tokens
- Offline use after the first connected visit
- Optional links to Tux Paint, Scratch, Krita, Audacity, and other open tools
- An optional printable pack for active Sociobot licenses

An active printable-pack license adds cut-out activity cards and a four-week
weekend mix. The free shelf keeps the 20 activities and progress tokens.
Purchase setup is not currently available in the app.

## Run and verify

Requirements: Node.js 20 or newer and npm.

```sh
npm install
npm run dev
npm test
npm run build
```

The exact production build command is `npm run build`. It writes the static
site to `dist/`, with `dist/index.html` at the root. Preview that build with
`npm run preview`.

Playwright tests use Chromium 1.58.2 and cover the demo, local storage, offline
reload, export, printing, licensing, keyboard use, mobile layout, and axe.
Claim-specific commands are listed in [.factory/claims.json](.factory/claims.json).

## Data and payment

Activity data lives in IndexedDB. Parent setup can export, import, or clear it.
License verification sends a token only to the Sociobot license verification
endpoint after a parent chooses to verify it. Sociobot is the merchant of record.
See `/privacy` and `/terms` in the app.

## Deploy

Deploy the contents of `dist/` as a static site. The included Azure Static Web
Apps configuration supplies SPA fallback routes and security headers. No DNS,
billing, or infrastructure changes belong in this repository.

## License

Code is available under the [MIT License](LICENSE). The generated hero image is
original project artwork; its prompt and provenance are recorded in
[.factory/design.md](.factory/design.md).
