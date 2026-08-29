# Linux Kid Lab — review 2 handoff

## Result

**FAIL.** This was a review-only work order. No product code or assets were
modified.

The review is in `.factory/review-2.md`. It records five blocking findings:

1. `.factory/copy-audit.md` has incorrect and combined sentence word counts.
2. `.factory/demo.md` still describes deleted license behavior.
3. “20 activities are free” has no registered claim/test.
4. The README's real IndexedDB-storage statement has no registered claim/test.
5. “Open tool” remains jargon and conflicts with “creative app.”

## Verification performed

- Clean `npm ci` completed with 0 reported vulnerabilities.
- All 15 literal commands in `.factory/claims.json` completed successfully.
- `npm test` passed: 51 tests; `test-results/.last-run.json` reports `passed`
  with no failed tests.
- `npm run build` passed and produced `dist/`.
- Fresh live desktop and 390 px mobile first reads passed; the sample CTA was
  visible before scrolling.
- Live `/demo` showed sample data, demo banner, Reset demo, Start for real,
  and separate storage. Registered tests confirmed reset/exit isolation and
  offline reload.
- Production request logging during a demo flow observed only the product
  origin. Live axe scans found no serious or critical violations on seven
  public routes.
- Internal/external link crawl passed; direct unknown route correctly returned
  the intentional 404.

## Reproduce

```sh
npm ci
npm test
npm run build
```

Run each `test` command in `.factory/claims.json` individually. Open
`https://linux-kid-lab.sociobot.in/demo` for the isolated demo.

## Next steps

Resolve every finding in `.factory/review-2.md`, regenerate the copy audit,
add the missing claim coverage, and commission another full first-read review.
