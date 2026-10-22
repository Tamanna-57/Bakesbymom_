# Design references

Everything the Bakes by Mom design system is built from. There are two sets of references:

1. **Web style references** (this folder, `DESIGN*.md`): nine brand websites, each extracted into a Style Reference with tokens, components and do's and don'ts.
2. **Pinterest references** ([`pinterest/`](./pinterest/README.md)): 24 pins from [`/pinterest`](../pinterest), each analysed into its own Style Reference in the same format, plus a synthesis that counts which motifs recur.

The resulting system lives in [`/packages`](../packages) (tokens + React components) and is documented in Storybook (`npm run storybook`).

## Web style references

| File | Brand | Essence | What Bakes by Mom took | What it left |
|------|-------|---------|------------------------|--------------|
| [DESIGN.md](./DESIGN.md) | Lamanna's | Neon circus tent on a Naples sidewalk: orange canvas, sun-yellow ultra-wide type, starbursts | Hard, blur-free offset shadows (from the 3D headline) → `--bbm-shadow-sticker-*`; starburst product badges → `<Seal>` | Full orange canvas, 0px radius, multiple loud accents |
| [DESIGN-2.md](./DESIGN-2.md) | Pa'lais | Botanical sketchbook dipped in honey: cream paper, one indigo, warm blobs | Cream paper canvas; a single cool color for contrast (→ `blueberry`, focus ring); tracked eyebrow labels; display + script tagline pairing; line-art illustrations | Indigo as the primary, organic blobs |
| [DESIGN-3.md](./DESIGN-3.md) | Apron | Butcher-paper bakery ledger: buttercream, Champ slab, marigold pills | DM Sans + DM Mono; mono for prices; warm-only neutrals ("when in doubt, warm it up"); pill CTAs | Marigold as the action color, slab display |
| [DESIGN-4.md](./DESIGN-4.md) | Beautiful™ | Warm kitchen on a Sunday morning: cream linen, one coral, serif + grotesk | Two-voice type (serif headlines, sans UI); mono eyebrow above headlines; category circles → `<ProductCard compact imageShape="circle">`; a handwritten signature | 1px black borders on everything, coral |
| [DESIGN-5.md](./DESIGN-5.md) | Alison Roman | Cookbook pages on cream paper: light serif, aubergine ink, 0 radius | A warm near-black ink instead of black (→ `cocoa-900`); editorial pacing and generous section spacing | 0px radius everywhere, serif body copy |
| [DESIGN-6.md](./DESIGN-6.md) | Mr. Pops | Retro ice-cream parlor: cherry outlines, condensed marquee type, cream bisque cards | Cherry red as the brand; big-radius cream cards (`--bbm-radius-2xl`); outlined secondary pills | White canvas, outline-only primary buttons |
| [DESIGN-7.md](./DESIGN-7.md) | bella | Sunlit kitchen counter: warm canvas, one coral, 12px cards | Elevation by surface temperature (canvas → surface → raised); pill "Bestseller" badges; 4-column product grid | Tight -0.05em tracking, coral |
| [DESIGN-8.md](./DESIGN-8.md) | Ko-fi | Warm café chalkboard: chunky display, sticker outlines, pills everywhere | Sticker elevation (thick outline, no blur) → `sticker` props; pill radius on every interactive element; a chunky soft display (Fraunces `SOFT`) | Periwinkle as the action color |
| [DESIGN-9.md](./DESIGN-9.md) | Monte | Rust-tinted coastal morning: one terracotta field, serif with wide-tracked caps, mono data | Mono for data (hours, dates, prices); wide-tracked uppercase eyebrows; curved text around a mark → `<Seal>`; outlined circular nav buttons | Terracotta, outline-only actions |

### What the nine agree on

| Signal | Count | Notes |
|--------|-------|-------|
| One rationed action color | 8 / 9 | Lamanna is the exception (orange, yellow and blue) |
| No blurred shadows on cards | 8 / 9 | Pa'lais shadows its recipe cards; the others use outlines or surface steps |
| Pill-shaped buttons | 7 / 9 | Lamanna and Alison Roman use square corners |
| Warm cream or off-white canvas | 6 / 9 | Mr. Pops is white with cream cards, Ko-fi is a light gray, Lamanna is orange |
| Mono type for labels or data | 3 / 9 | Apron, Beautiful™, Monte; Bakes by Mom adopts it as the "recipe card" voice |

## How the references became the system

| Decision | Web refs | Pinterest refs |
|----------|----------|----------------|
| Cream canvas, cocoa ink (no pure white, no black) | 6/9 cream; Alison Roman's warm ink | 20/23 warm paper |
| Cherry is the brand and the only filled action | Mr. Pops cherry; 8/9 single accent | 12/23 deep red ink |
| Strawberry + blueberry + butter + pistachio pastels as surfaces | Pa'lais warm/cool tension | 12 pink, 8 powder blue, 7 butter/olive |
| Fraunces + Pinyon Script + DM Sans + DM Mono | Beautiful™ serif/sans; Apron DM Sans/Mono; Monte mono | 12/23 display + script lockups |
| Pills for interactive, soft corners for surfaces | 7/9 pills | 8/23 pills |
| Sticker outlines and hard shadows | Ko-fi, Lamanna | Berloga, Pretty OK, Nectar |
| Stripes, gingham, checker, grid, dots; scallop, wave, torn and awning edges | Pa'lais wavy dividers | 13 stripes, 9 scallops, 7 gingham/checker, 4 grid |
| Tickets, polaroids, seals, price tags, marquees | Monte curved text | Book Nook, Taplink, Nectar; 9 marquees |

See [`pinterest/README.md`](./pinterest/README.md) for the full pin index, the motif counts and the palette anchors behind each token family.
