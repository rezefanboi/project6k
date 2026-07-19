/* =========================================================
   PROJECT 6K — entry data
   -----------------------------------------------------------
   This is the single source of truth for both the Canvas page
   and the Collection page. Replace SAMPLE_ENTRIES with your
   real days as you go — everything else recalculates itself.

   Fields per entry:
     day         Number   sequential day of the project (1-based)
     date        String   "YYYY-MM-DD"
     title       String   title of that day's piece
     description String   the story / idea / inspiration behind it
     image       String   path to the artwork file (optional —
                           falls back to a generated placeholder
                           tile if omitted, so the site works
                           before any art is uploaded)
     hue         Number   0-360, only used for placeholder tiles
   ========================================================= */

const PROJECT_CONFIG = {
  title: "Project 6K",
  canvasSize: 6000,     // full canvas, px per side
  gridCols: 15,         // canvas divided into cols x rows sections
  gridRows: 12,          // 15 x 12 = 180, one section per day
  totalDays: 180,
  startDate: "2026-01-01",
  instagram: "https://instagram.com/"
};

const SAMPLE_ENTRIES = [
  {
    day: 1,
    date: "2026-01-01",
    title: "First Mark",
    description: "The opening square. No plan for what the canvas becomes yet — just a single shape in the corner to make the blank page less intimidating.",
    hue: 8
  },
  {
    day: 2,
    date: "2026-01-02",
    title: "Grid Study",
    description: "Sketched out how the 15×12 sections might read from a distance. Decided neighboring days should feel related, not identical.",
    hue: 24
  },
  {
    day: 3,
    date: "2026-01-03",
    title: "Low Tide",
    description: "Reference from a walk along the coast this morning. Kept the palette to three values to leave room for tomorrow to answer it.",
    hue: 198
  },
  {
    day: 4,
    date: "2026-01-04",
    title: "Borrowed Light",
    description: "Wanted a piece that only makes sense once the square beside it exists. First real experiment in letting sections talk to each other.",
    hue: 46
  },
  {
    day: 5,
    date: "2026-01-05",
    title: "Static",
    description: "A rough day, and it shows — quick linework, no color. Keeping it in the archive anyway; the project is the streak, not just the good days.",
    hue: 0
  },
  {
    day: 6,
    date: "2026-01-06",
    title: "Corridor",
    description: "Started thinking about the canvas as architecture — corridors of related sections rather than a flat grid of unrelated tiles.",
    hue: 265
  },
  {
    day: 7,
    date: "2026-01-07",
    title: "Week One",
    description: "Seven days in. Zoomed out for the first time to see the sections together — still mostly blank, but the intent is starting to read.",
    hue: 12
  },
  {
    day: 8,
    date: "2026-01-08",
    title: "Signal",
    description: "A small red mark, deliberately out of place. Every so often the canvas needs one section that breaks its own rules.",
    hue: 355
  },
  {
    day: 9,
    date: "2026-01-09",
    title: "Undergrowth",
    description: "Dense, layered linework after a few too-clean days in a row. Trying not to let the grid make everything feel tidy by default.",
    hue: 130
  },
  {
    day: 10,
    date: "2026-01-10",
    title: "Ten",
    description: "Small milestone, small piece — a single numeral worked into the linework, the only day that references the counter directly.",
    hue: 210
  },
  {
    day: 11,
    date: "2026-01-11",
    title: "Overcast",
    description: "Muted values across the board today. Some sections are meant to be quiet so the louder ones nearby have somewhere to land.",
    hue: 220
  },
  {
    day: 12,
    date: "2026-01-12",
    title: "Night Shift",
    description: "Drawn late, after everything else was done. There's a looseness to the late-night entries that the daytime ones don't have.",
    hue: 250
  },
  {
    day: 13,
    date: "2026-01-13",
    title: "Waypoint",
    description: "A small marker motif, borrowed from trail signage, sitting at the edge of this section pointing toward the next one.",
    hue: 40
  },
  {
    day: 14,
    date: "2026-01-14",
    title: "Two Weeks",
    description: "First real test of consistency — fourteen days without missing one. The piece itself is almost secondary to that fact today.",
    hue: 18
  }
];

/* ---------------------------------------------------------
   Pads SAMPLE_ENTRIES out to PROJECT_CONFIG.totalDays with
   lightweight placeholder days, so Canvas + Collection always
   have a full, believable dataset to render — even before you
   add your real work. Swap these out day by day.
   --------------------------------------------------------- */
function buildEntries(){
  const entries = [...SAMPLE_ENTRIES];
  const start = new Date(PROJECT_CONFIG.startDate + "T00:00:00");

  for (let day = entries.length + 1; day <= PROJECT_CONFIG.totalDays; day++){
    const d = new Date(start);
    d.setDate(d.getDate() + (day - 1));
    entries.push({
      day,
      date: d.toISOString().slice(0, 10),
      title: `Untitled — Day ${String(day).padStart(3, "0")}`,
      description: "Placeholder entry. Replace with the real title, date and story once this day's piece is finished.",
      hue: (day * 37) % 360,
      placeholder: true
    });
  }
  return entries;
}

const ENTRIES = buildEntries();

/* how many days are actually "done" — drives the Canvas fill.
   In real use this is just entries.filter(e => !e.placeholder).length */
const COMPLETED_DAYS = 87;
