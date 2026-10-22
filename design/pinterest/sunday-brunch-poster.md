# Sunday Brunch (Farmaaish) — Style Reference
> A picnic-table collage: tomato-red swash serif on graph paper, gingham corners, a wavy ribbon and cutout hands raising cocktails.

**Source pin:** [`pinterest/Sunday Brunch | Live Music Poster.jpg`](<../../pinterest/Sunday Brunch | Live Music Poster.jpg>) · **Format:** event poster / Instagram story (9:16) for a resto-lounge in Pune · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Roles are interpreted.

An event poster that layers three paper textures (cream graph paper in the middle, red gingham in the corners, a hand-drawn red ribbon weaving between them) under one confident swash serif headline. Collage cutouts (hands holding a margarita, a beer can and a martini) and scribbled ink doodles (microphone, music notes) add a zine feel. Everything typographic is one tomato red, and the date is a red tape label.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Tomato | `#b41107` | `--color-tomato` | Headline, date label fill, ribbon, info text |
| Picnic Red | `#b23c32` | `--color-picnic-red` | Gingham dark checks |
| Gingham Rose | `#ca7f78` | `--color-gingham-rose` | Gingham mid tone (overlap squares) |
| Graph Cream | `#f9f2e8` | `--color-graph-cream` | Paper ground |
| Graph Line | `#e7decf` | `--color-graph-line` | Graph-paper lines |
| Scribble Ink | `#1f1f1f` | `--color-scribble-ink` | Doodles (mic, notes) |

## Tokens — Typography

### Swash display serif — "Sunday Brunch"
- **Identified as:** retro display serif with ball terminals and swash capitals (Rosaline or Hatton style)
- **Substitute:** Fraunces 700 with `SOFT 100, WONK 1`; Young Serif for a cleaner take
- **Size:** ~16% of poster width per line, two lines, tight leading (~0.95)

### Marker caps — "LIVE MUSIC BY", "MELODY MEET", the date label
- **Substitute:** Gaegu 700, Patrick Hand

### Bold grotesk caps — "THE 99 BRUNCH FOLLOWED BY SUPER HOURS", "FOR TABLE BOOKING"
- **Substitute:** Archivo Black / Arial Black style, tomato

### Script logo — "Farmaaish" with micro caps above and below

## Tokens — Spacing & Shapes
- **Graph cell:** ~3.5% of width (~26px)
- **Gingham check:** ~6% of width
- **Ribbon:** ~6px wavy stroke with small white stitches or bows at intervals
- **Date label:** a rectangular tape strip with no radius

## Components

### Tape Date Label
**Role:** key event info
A red rectangle with marker caps in cream ("SUNDAY 16 NOV | 12PM ONWARDS").

### Collage Cutouts
**Role:** mood and theme
Background-removed photos of hands holding drinks that enter from the edges.

### Ribbon Frame
**Role:** organizes the collage
A hand-drawn wavy red line separates the gingham corners from the graph-paper center.

## Do's and Don'ts

### Do
- Layer two paper textures (grid plus gingham) and separate them with a drawn line
- Use one ink color for all type
- Let cutouts enter from the edges of the frame

### Don't
- Don't stack more than three fonts on the website; this poster gets away with it as an event flyer

## For Bakes by Mom
**Adopted:**
- Graph paper + gingham pairing → `<PatternSurface pattern="grid">` with gingham corner accents in event templates
- Swash retro serif → Fraunces `SOFT`/`WONK` axes (`--bbm-font-variation-soft`)
- Tape date label → `<Badge variant="solid" shape="tape">` for dates and "today only"
- Doodles → `<Doodle>` set (hand-drawn style, single ink)

## Quick Start

```css
:root {
  --color-tomato: #b41107;
  --color-picnic-red: #b23c32;
  --color-graph-cream: #f9f2e8;
  --color-graph-line: #e7decf;

  --pattern-graph:
    linear-gradient(var(--color-graph-line) 1px, transparent 1px) 0 0 / 26px 26px,
    linear-gradient(90deg, var(--color-graph-line) 1px, transparent 1px) 0 0 / 26px 26px,
    var(--color-graph-cream);
}
```

<details>
<summary>View the reference image</summary>

![Sunday Brunch poster](<../../pinterest/Sunday Brunch | Live Music Poster.jpg>)

</details>
