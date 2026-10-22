# Strawberry Cheesecake — Style Reference
> A 70s diner menu card: chocolate-cherry groovy letters, a tomato-red checkerboard and a glossy slice breaking out of the grid.

**Source pin:** [`pinterest/ -19.jpg`](<../../pinterest/ -19.jpg>) (the filename starts with a space) · **Format:** social post or menu card, 4:5 portrait · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Sizes are relative to the post. Roles are interpreted.

A product-feature post built like a sandwich. Giant groovy letters ("STRAWBERRY" on top, "CHEESE CAKE" on the bottom) frame the middle content: a red-and-oat checkerboard with a glossy cutout slice that overlaps it, then a photo-and-paragraph row. The oat background is warm and calm, and the type is a very dark chocolate-cherry instead of black, so the whole post stays edible-looking. Thin chocolate rules divide the bands like a printed menu.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Oat Card | `#e5dbcf` | `--color-oat-card` | Background (~62% of the post) |
| Chocolate Cherry | `#591812` | `--color-chocolate-cherry` | Display type, hairline rules and paragraph text |
| Tomato Check | `#c02c20` | `--color-tomato-check` | Checkerboard squares |
| Glaze Red | `#c93a30` | `--color-glaze-red` | Strawberry glaze in the photography (content, not UI) |
| Graham | `#b4a495` | `--color-graham` | Crust tones and muted secondary text |

## Tokens — Typography

### Groovy display — "STRAWBERRY", "CHEESE CAKE" · `--font-groovy`
- **Identified as:** a 1970s psychedelic display face with bulbous, flared strokes, tight letter-fit and irregular counters (Hello Groovy or Funkydori style)
- **Substitute:** Shrikhand (more italic), Bagel Fat One (rounder), or Fraunces 900 with `SOFT 100, WONK 1`
- **Size:** each word spans the full content width (~85% of the post)

### Body — the description paragraph · `--font-body`
- **Identified as:** geometric sans with open apertures
- **Substitute:** Outfit, DM Sans
- **Size:** ~2.3% of post width, line-height ~1.5, justified

## Tokens — Spacing & Shapes

- **Checker cell:** ~6.5% of post width (~48px at 736px), two-color
- **Rules:** 1.5–2px chocolate lines above and below the checker band
- **Photo:** 0 radius, no border
- **Margins:** ~7% left and right; content aligns to the title width

## Components

### Type Sandwich
**Role:** frames a single product
The product name is split across top and bottom bands at full width, and all supporting content sits between them.

### Checker Band with Cutout
**Role:** hero product moment
A checkerboard field between two rules, with a background-removed product slice overlapping its right edge and casting a soft shadow.

### Photo + Paragraph Row
**Role:** sensory description
A square-cornered photo on the left (~45%) and a justified paragraph on the right.

## Patterns & Motifs
- **Checkerboard** in tomato and oat
- **Background-removed product cutouts** that cross pattern boundaries

## Do's and Don'ts

### Do
- Use a near-black chocolate-cherry for type instead of black
- Let cutout food cross the edges of a pattern band; it creates depth without shadows on UI
- Frame bands with thin rules, like a printed menu

### Don't
- Don't use more than one pattern per post
- Don't justify text in narrow web columns (it works in this fixed print layout only)

## Surfaces & Elevation
Oat card only. Depth comes from the cutout photo's natural shadow; UI elements are flat.

## Imagery
High-gloss, high-saturation dessert photography: one background-removed hero slice and one in-context plate shot.

## For Bakes by Mom
**Adopted:**
- Checkerboard pattern → `<PatternSurface pattern="checker" tone="cherry">`
- Chocolate-cherry type instead of black → `--bbm-color-text-primary` (`cocoa-900`, `#3a1e17`)
- Type-sandwich layout for social post templates (documented in Storybook under **Pages / Social Posts**)
- Hairline menu rules → `--bbm-color-border-default` at `--bbm-border-width-hairline`

**Left behind:** the groovy display face as a brand font. It reads strongly 70s; Bakes by Mom keeps one display family (Fraunces) and gets puffiness from its `SOFT` axis.

## Quick Start

```css
:root {
  --color-oat-card: #e5dbcf;
  --color-chocolate-cherry: #591812;
  --color-tomato-check: #c02c20;
  --color-graham: #b4a495;

  --pattern-checker: repeating-conic-gradient(
    var(--color-tomato-check) 0 25%,
    var(--color-oat-card) 0 50%
  ) 0 0 / 96px 96px;
}
```

<details>
<summary>View the reference image</summary>

![Strawberry Cheesecake post](<../../pinterest/ -19.jpg>)

</details>
