# Project 6K — site template

A minimal, signage-inspired template for showcasing a daily 6000×6000px
canvas project. Three pages, no build step, no framework — open
`index.html` in a browser or drop the folder on any static host
(GitHub Pages, Netlify, Vercel, etc).

## Structure

```
project-6k/
├── index.html          Home — the three-sign entry point
├── canvas.html          The full canvas, zoomable & pannable
├── collection.html      Archive grid of every daily entry
├── css/
│   ├── style.css         shared tokens + header/footer
│   ├── canvas.css        canvas-page styles
│   └── collection.css    collection-page + detail overlay styles
├── js/
│   ├── canvas.js          builds the grid, handles pan/zoom
│   └── collection.js      renders cards, search, detail modal
└── data/
    └── entries.js         ← the only file you need to edit day-to-day
```

## What to edit

**`data/entries.js`** is the single source of truth for both the
Canvas and Collection pages.

1. `PROJECT_CONFIG` — set your real start date, grid size, and total
   day count. `gridCols × gridRows` should equal `totalDays` (currently
   15 × 12 = 180, i.e. a six-month daily project).
2. `SAMPLE_ENTRIES` — replace with your real days. Each entry:
   ```js
   {
     day: 15,
     date: "2026-01-15",
     title: "Your title",
     description: "The idea, inspiration, or story behind it.",
     image: "assets/day-015.jpg",   // omit to use a placeholder tile
     hue: 30                         // only used when there's no image
   }
   ```
3. `COMPLETED_DAYS` — how many days are actually finished. This is
   what fills in the Canvas grid; everything after it renders as an
   empty, undrawn section.

Any day without a matching entry in `SAMPLE_ENTRIES` is auto-padded
with a placeholder ("Untitled — Day 0XX") so both pages always render
a complete grid, even before you've uploaded real art.

## Links to update

- **Instagram** — replace `https://instagram.com/` in `index.html`,
  `canvas.html`, and `collection.html` (three spots each in the nav
  + footer) with your real profile URL.
- Everything else (Canvas / Collection links) is already wired
  between pages.

## Notes on the design

- Homepage: three "signs" mounted on a shared post — a nod to
  route/signage imagery, standing in for a literal fork toward
  Instagram, the Canvas, and the Collection.
- One accent color (warning-sign red) is used for interaction and
  emphasis; a second, quieter blue is reserved for coordinates only.
- Placeholder artwork is a generated gradient tile (seeded by each
  entry's `hue`) so the whole site works before a single image is
  uploaded — swap in real files via the `image` field.
- Typefaces: Oswald (display/headings), Inter (body), IBM Plex Mono
  (day counters, dates, coordinates) — loaded from Google Fonts.
