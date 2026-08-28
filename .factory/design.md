# Linux Kid Lab — visual thesis

## Direction

**Cassette-era zine.** The product feels like a box of mixtapes assembled by a
careful parent: tactile, finite, labelled, and ready without an account. The
interface borrows cassette labels, punched paper, photocopy grain, registration
marks, and hand-cut edges. It does not copy a specific band, toy, logo, or
copyrighted character. The uneven details frame the activities; they never
reduce legibility.

The direction fits this product because a cassette is local, replayable, and
owned. A zine feels made by people instead of an attention platform. Activity
bands become cassette sides: younger children start with short visual prompts,
then move toward making, coding, and remixing.

## Tokens

- `--ink: #201c1b` — primary type and hard outlines.
- `--paper: #f3e8cb` — warm recycled-paper background.
- `--paper-light: #fff9ea` — reading surfaces.
- `--red: #b82e2e` — primary action; white text is 5.8:1.
- `--blue: #185b76` — links and focus-adjacent detail; white text is 7.2:1.
- `--yellow: #edbd43` — sticker field, used with ink only.
- `--green: #2f6b4f` — completed state, paired with a check and text.
- `--muted: #685e55` — secondary text on paper, 5.2:1.
- `--danger: #a32929` — errors with an icon and action.
- Dark treatment: `#181615` background, `#27221f` surface, `#f5eccf` text,
  `#f1c75b` accent. It follows system preference and stays recognisably paper.

## Type

- Display: **Arial Black**, with Impact as fallback. Condensed, loud headings
  echo gig flyers without adding a font download.
- Body and utility: **Trebuchet MS**, with system sans-serif fallbacks. Its open
  forms remain clear for parents and early readers.
- Labels use uppercase sparingly with `0.08em` tracking. Body copy is 17px with
  1.55 leading. No third-party or downloaded fonts are used.

## Spacing and shape

The spacing scale is 4, 8, 12, 16, 24, 32, 48, 64, and 96px. Content measures
no more than 70 characters. Most surfaces are open; independent activities are
the exception and use cassette-card shapes. Borders are 2px ink lines, corners
alternate between 4px and 18px, and sticker chips are round or torn-edge. Touch
targets are at least 44px with at least 8px between them.

At 390px, the hero becomes a compact poster: copy first, tape illustration
second, one full-width action, then facts. Parent controls remain below the
child-facing activity grid. On wide screens, activity copy and the live tray
sit side-by-side.

## Interaction grammar

Buttons depress by 2px like a cassette key. Selecting an age band slides the
paper tab by 8px over 180ms. Opening an activity resembles pulling a card from
a tape case: a small translate and opacity change over 220ms. Completion stamps
once, then stays still. Focus is a 3px yellow-and-ink double ring.

With `prefers-reduced-motion: reduce`, transforms and smooth scrolling are
removed; state changes use instant borders, words, and icons. Nothing loops or
flashes.

## Asset plan and provenance

- Hero: an original square editorial still life of a clear cassette turned
  into a child-safe creative workbench. The label is blank because required
  words remain HTML. The image is generated, reviewed, then exported as WebP
  at no more than 300 KB.
- Social image: composed locally from the generated hero and product colors at
  1200×630. It contains only product-owned HTML-rendered type.
- Marks and icons: hand-authored geometric SVG in the repository. No external
  icon set or stock asset.

### Prompt sheet

Use case: `illustration-story`. Asset: landing hero. A tabletop assemblage seen
nearly top-down: one transparent 1980s cassette whose tape ribbon becomes three
paths leading to chunky child-made objects — paper shapes, a tiny pixel grid,
and a simple rhythm drum pad. Photocopied zine collage with cut-paper edges,
coarse halftone dots, imperfect red and blue ink registration, warm recycled
paper, black marker contour, friendly and calm rather than nostalgic clutter.
Strong centered object, quiet outer edges, legible at small size. Palette:
charcoal, cream, brick red, petrol blue, mustard, muted green. Diffuse window
light, tactile paper and clear plastic. No people, hands, brands, copyrighted
characters, readable text, letters, logos, watermark, neon gradient, glossy 3D,
or scary imagery.

Generated with the factory image model (`factory-image`) on 2026-08-28. The
result is an original project asset. Prompt and generation metadata are stored
beside the source image in `assets/src/hero-cassette.png.json`. Delivery uses
responsive AVIF and WebP files with a JPEG fallback; the largest web image is
under 200 KB.
