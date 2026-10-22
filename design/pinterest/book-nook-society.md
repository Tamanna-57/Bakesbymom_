# The Book Nook Society — Style Reference
> A nostalgic library-card scrapbook: bubblegum pink, powder-blue tickets and library-navy bands stitched together with marquee ribbons.

**Source pin:** [`pinterest/Book Club Community Website Design Nostalgic Ticket Playful Cute branding design.jpg`](<../../pinterest/Book Club Community Website Design Nostalgic Ticket Playful Cute branding design.jpg>) · **Format:** narrow website mockup (single-column, mobile-like) · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Sizes are estimates. Roles are interpreted.

A membership site for a book club, built from paper ephemera: an admission ticket for the perks, a library bookmark, a circular society seal, step cards pinned like notes and a polaroid with a "Welcome gift" sticker. The palette has three pastels (bubblegum, powder blue, parchment) anchored by one deep library navy, which carries the headline type and one full dark band. The sections are separated by scrolling marquee ribbons and one wavy edge, so the page reads as a continuous strip of paper.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Bubblegum | `#f5bbc4` | `--color-bubblegum` | Header bar, CTA buttons, welcome-box band, step tabs, ticket outline |
| Library Navy | `#36506b` | `--color-library-navy` | Headline type, "Simple Magical Memorable" band, small button text |
| Powder Blue | `#a9c0d9` | `--color-powder-blue` | "Why join us" panel, ticket body, marquee ribbon, secondary buttons |
| Parchment | `#fff6ed` | `--color-parchment` | Hero card and step cards (paper surface) |
| Antique Gold | muted khaki-gold (small area, not reliably sampled) | `--color-antique-gold` | "SIMPLE … MEMORABLE" lettering on navy |

## Tokens — Typography

### Bold display sans — "THE BOOK CLUB", "WHY JOIN US?", "YOUR WELCOME BOX AWAITS…"
- **Identified as:** heavy, slightly rounded grotesk caps
- **Substitute:** Archivo Black, Rubik 800
- **Color:** library navy

### Retro script — "Reimagined", "Magical"
- **Identified as:** bouncy 50s brush script
- **Substitute:** Yellowtail, Pacifico
- **Color:** bubblegum on parchment, or bubblegum on navy

### Typewriter body — paragraphs, buttons, step text
- **Identified as:** typewriter monospace
- **Substitute:** Courier Prime, Special Elite, DM Mono
- **Size:** ~12–13px

### Ticket caps — "YOUR MEMBERSHIP PERKS:", list items
- Condensed sans caps (Oswald or Bebas Neue style) in navy

## Tokens — Spacing & Shapes

| Element | Treatment |
|---------|-----------|
| hero frame | double rule (thin, then thick) inset ~12px, star doodles in the corners |
| buttons | small rectangles, ~2px radius, pastel fill, typewriter label |
| ticket | rectangle with semicircle notches on both short sides, a stub divider and vertical stub text |
| step tabs | small pink tabs sitting on top of paper cards |
| wave edge | a single soft wave where the photo section meets the navy band |

## Components

### Admission Ticket
**Role:** list of membership perks
Powder-blue body with a bubblegum outline, semicircle notches on the left and right edges, a perforated divider before a stub that holds vertical caps text ("NOVEMBER '24") and a star. Caps heading and list items in navy. A small "Save a ticket!" pink button sits below.

### Society Seal
**Role:** brand mark and sticker
A circular badge with arched caps ("THE BOOK NOOK SOCIETY") around a bold stacked name, scalloped edge and pink outline. It overlaps section edges.

### Marquee Ribbon
**Role:** section separator and repeated CTA
A thin powder or pink strip with caps text repeating in a loop ("YOUR NEXT GREAT READ AWAITS — SIGN UP NOW!").

### Pinned Step Cards
**Role:** three-step onboarding
Parchment cards with pink "Step 1/2/3" tabs on top, typewriter copy and decorative paper bits (ribbon end, speech bubble).

### Polaroid with Sticker
**Role:** welcome-box showcase
A white-bordered polaroid with a thicker bottom margin, a strip of tape on top and a circular "Welcome gift" seal overlapping one corner.

## Patterns & Motifs
- Admission tickets, bookmarks, library cards and polaroids: **paper ephemera** as UI
- **Corner stars** on framed cards
- **Wave edge** into the dark band

## Do's and Don'ts

### Do
- Turn content blocks into real-world paper objects (tickets, cards, polaroids)
- Use one deep navy for type and one dark band to anchor the pastels
- Repeat the CTA inside marquee ribbons between sections

### Don't
- Don't make buttons large; this system's buttons are small labels
- Don't drop the notches or perforation from tickets; they are what make the shape readable

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Parchment | `#fff6ed` | Paper cards |
| 1 | Pastel band | `#a9c0d9` / `#f5bbc4` | Section backgrounds |
| 2 | Navy band | `#36506b` | The single high-contrast section |

## Elevation
Flat. Objects are layered (seal over polaroid over band), but shadows are minimal or absent.

## Imagery
Moody, warm-toned close-ups of hands holding books, plus flat illustrated bookmark artwork.

## For Bakes by Mom
**Adopted:**
- Admission ticket → `<Ticket variant="ticket">`, used for gift cards, class tickets and order summaries
- Circular society seal → `<Seal>` and `<Logo variant="seal">`
- Marquee ribbon → `<Marquee>`
- Polaroid with tape and sticker → `<Polaroid tape>`
- A deep band to anchor pastels → `--bbm-color-blueberry-800` as an optional dark section

**Left behind:** typewriter body copy (DM Mono is used only for labels and prices, since long typewriter text tires the eye) and the very small buttons (Bakes by Mom buttons meet a 44px touch-target minimum).

## Quick Start

```css
:root {
  --color-bubblegum: #f5bbc4;
  --color-library-navy: #36506b;
  --color-powder-blue: #a9c0d9;
  --color-parchment: #fff6ed;

  --ticket-notch: 12px;
  --ticket-mask:
    radial-gradient(circle at 0 50%, transparent var(--ticket-notch), #000 calc(var(--ticket-notch) + 0.5px)) left / 51% 100% no-repeat,
    radial-gradient(circle at 100% 50%, transparent var(--ticket-notch), #000 calc(var(--ticket-notch) + 0.5px)) right / 51% 100% no-repeat;
}
```

<details>
<summary>View the reference image</summary>

![The Book Nook Society website](<../../pinterest/Book Club Community Website Design Nostalgic Ticket Playful Cute branding design.jpg>)

</details>
