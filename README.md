# Project 6K — Interactive Art Showcase

Project 6K is a highly minimal, signage-inspired personal portfolio site showcasing a daily art project. The project documents the process of drawing something every day on a massive 6000×6000 pixel canvas.

The site is built with pure HTML and CSS, designed to be lightweight, responsive, and extremely clean. There is no build step or framework involved; it runs statically out of any web server or directly from `index.html`.

---

## What the Website Is

This website serves as an interactive home, showcase, and archive for **Project 6K**. The concept is structured around a central signage post (a pole with directional signboards) that routes visitors to different sections of the project:
*   **The Interactive Home (`index.html`)**: Features an illustrated signage image with invisible interactive hotspots.
*   **The Canvas (`canvas.html`)**: Displays the massive 6000×6000px composite canvas image in a clean, small preview.
*   **The Collection (`collection.html`)**: A chronologically ordered, side-by-side log of daily entries, providing context, dates, and inspiration behind individual pieces.
*   **The About Page (`about.html`)**: A simple, central text section detailing the project's background and social media links.

---

## Page-by-Page Breakdown & How It Works

### 1. Home Page (`index.html`)
The landing page uses a custom layout featuring the main UI artwork (`Untitled104.png`). 

*   **Invisible Clickable Areas**: Absolute-positioned, transparent overlay anchors (`.clickable-area`) are mapped via percentages directly onto the signage illustration:
    *   **Red Signboard** $\rightarrow$ `canvas.html`
    *   **Blue Signboard** $\rightarrow$ `collection.html`
    *   **"6K" Box** $\rightarrow$ `about.html`
*   **Interactive Tooltips**: When hovering over any interactive component on desktop, a tooltip fades in showing its destination or state:
    *   Hovering the **Red Sign** shows `"canvas"`
    *   Hovering the **Blue Sign** shows `"collection"`
    *   Hovering the **6K Box** shows `"about"`
    *   Hovering the **AI 'x' Sign** (next to the red sign) shows `"no ai used"`
*   **Mobile Responsiveness**: On screens narrower than 768px:
    *   The container zooms in and shifts to center specifically on the signpost/pole, hiding the wider landscape elements to fit phone viewports.
    *   Tooltips are disabled for a cleaner touch-based interface.

### 2. Canvas Section (`canvas.html`)
A minimal, clean page featuring:
*   A lowercase black heading (`canvas`).
*   The project's main image `canvas.png` displayed in a compact, centered layout (constrained to a maximum width of `300px` for quick loading and a unified, clean gallery feel).

### 3. Collection (`collection.html`)
The gallery archive page presenting the daily artwork.
*   Displays a minimal lowercase heading (`collection`).
*   Shows entries side-by-side: the artwork image (sized down to `250px` wide) on the left, and its text content (date + description) on the right.
*   **Current entries**:
    1.  `1.png` — Date: `18/7/26` — Description: *start of the series this was greatly inspired by the tame impala album currents the flowing purple dress and the silver ball thats hanging and i love how it turned out*
    2.  `2.png` — Date: `19/7/26` — Description: *i was watching wire today and i always wanted to draw dark skin characters*
*   **Responsive Flexbox**: Stacks the image above the text on narrow mobile screens (under 600px wide) for optimal readability.

### 4. About (`about.html`)
A simple center-aligned description detailing the project's purpose:
*   Displays a minimal lowercase heading (`about`).
*   Paragraph text: *"yeah so this is just a personal project of what i do everyday and ik its not the most impressive so basically i have this 6000x6000 canvas and i try to draw something on it everyday and showcase it here hope u guys like it vheck me out on @shoelesslace on instagram"*

---

## Aesthetic & Design Details

*   **Minimal Typography**: The site utilizes standard system sans-serif fonts (`Arial, Helvetica, sans-serif`) rather than stylized web fonts to ensure a raw, basic, and non-posh aesthetic.
*   **Color Scheme**: Pure white backgrounds (`#ffffff`) and deep blacks (`#000000`) keep focus entirely on the artwork. Tooltips use a slightly lighter off-black (`#222`).
*   **Accessibility**: Visually hidden class wrappers (`.sr-only`) are used for headers to maintain search engine optimization (SEO) and screen-reader compatibility without breaking the minimal UI layout.

---

## File Structure

```
project-6k/
├── index.html          # Interactive home page with custom hotspots & tooltips
├── canvas.html         # Centered preview of the 6000x6000px canvas
├── collection.html     # Archive log of individual daily drawings
├── about.html          # Project summary and social info
├── Untitled104.png     # Home page signage illustration
├── canvas.png          # Main composite canvas art
├── 1.png               # Artwork for entry 1
├── 2.png               # Artwork for entry 2
├── css/
│   └── style.css       # Shared styles (headers, footers)
├── js/
│   ├── canvas.js       # Grid handling (legacy)
│   └── collection.js   # legacy js scripts
└── data/
    └── entries.js      # legacy entries data file
```
