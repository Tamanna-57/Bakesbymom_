# Stevie Kay (Showit) — Style Reference
> Pink-neon honky-tonk: a dim saloon photo hero, blush paper, saddle-brown bands and hot-pink stars stitched across the seams.

**Source pin:** [`pinterest/Elevate Your Brand with a Custom 5-Page Showit Website Design ✨.jpg`](<../../pinterest/Elevate Your Brand with a Custom 5-Page Showit Website Design ✨.jpg>) · **Format:** Showit personal-brand website (stylist / "cowboy romance author"), desktop · **Theme:** light with a dark band

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Sizes are estimates scaled to a 1440 px desktop canvas. Roles are interpreted.

Not a food brand, but a strong lesson in personality through collage. A warm, dim photo hero gives way to a blush paper section with polaroids, tape and line-drawn cowboy boots, then a saddle-brown gallery band. Hot pink is used like neon: the logo, five-point stars that straddle the hero seam, a pill button and a giant curved marquee ("more fun · cowgirls have"). Brown and blush do the structural work, and pink only sparkles.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Neon Pink | `#ea7399` | `--color-neon-pink` | Logo, stars, CTA pill, marquee lettering |
| Blush Paper | `#f0dbd6` | `--color-blush-paper` | Main content surface |
| Saddle Brown | `#59332f` | `--color-saddle-brown` | Gallery band, hero buttons, heading ink |
| Leather | `#604934` | `--color-leather` | Photo-dominant warm darks (hero) |
| Cocoa Text | `#54352f` | `--color-cocoa-text` | Headline and body text on blush |

## Tokens — Typography

### Western display — "STEVIE KAY"
- **Identified as:** decorative western/circus caps with spurs
- **Substitute:** Rye, Ultra
- **Color:** neon pink, ~20px in the header

### Retro soft display — "cowboy romance author", "more fun · cowgirls have"
- **Identified as:** Cooper Black-style soft, heavy, lowercase serif
- **Substitute:** Fraunces 800 with `SOFT 100` and `WONK 1`, or Shrikhand for the marquee
- **Size:** ~28px heading; ~56px marquee on a curved path

### Tracked light caps — hero tagline
- **Substitute:** Jost 300, tracking +0.18em, white over the photo

### Body — light sans ~13px in cocoa text

## Tokens — Spacing & Shapes

| Element | Value |
|---------|-------|
| hero buttons | pill, saddle-brown fill, tiny caps label |
| CTA | pill, neon pink fill, white caps |
| polaroids | white border, thick bottom, tape strip, rotated ±6° |
| marquee band | ~16px top radius, text follows a gentle arc |

## Components

### Seam Stars
**Role:** a decorative transition between sections
Three neon five-point stars straddling the boundary between the photo hero and the blush section.

### Polaroid Stack with Sparkles
**Role:** personal story imagery
Two overlapping polaroids with tape, rotated in opposite directions, decorated with small pink sparkles and stars.

### Line-Art Accent
**Role:** illustration
Thin single-line drawing (cowboy boots) in cocoa, overlapping the edge of the text block.

### Curved Marquee Band
**Role:** brand slogan
A brown band whose top edge carries giant pink retro lettering on a gentle arc, partially clipped at both sides.

## Do's and Don'ts

### Do
- Use the brightest color only for small, repeated sparkles (stars, logo, one button)
- Straddle section seams with stickers to stitch sections together
- Mix a soft Cooper-like display with a light tracked sans for contrast

### Don't
- Don't flood sections with neon pink; it's an accent
- Don't use the western font for anything longer than a logo

## Surfaces & Elevation
Photo → blush → brown. Polaroids have a faint drop shadow; everything else is flat.

## Imagery
Warm, grainy, editorial photos with motion blur, tungsten light and personality, rather than product-on-white shots.

## For Bakes by Mom
**Adopted:**
- Stickers straddling section seams → `<Doodle name="star">` positioned with the `.bbm-seam` helper in `<EdgeDivider>` stories
- Polaroids with tape and sparkles → `<Polaroid tape rotate>`
- Soft Cooper-style lowercase display → Fraunces with `font-variation-settings: "SOFT" 100` (`--bbm-font-variation-soft`)
- Brown band for contrast → `<Card tone="cocoa" fill="solid">` and dark sections using `--bbm-color-bg-inverse`

**Left behind:** the neon pink (too electric next to cherry) and the western display face.

## Quick Start

```css
:root {
  --color-neon-pink: #ea7399;
  --color-blush-paper: #f0dbd6;
  --color-saddle-brown: #59332f;
  --color-cocoa-text: #54352f;

  --font-soft-display: "Fraunces", serif;
  --font-soft-display-settings: "SOFT" 100, "WONK" 1;
}
```

<details>
<summary>View the reference image</summary>

![Stevie Kay Showit website](<../../pinterest/Elevate Your Brand with a Custom 5-Page Showit Website Design ✨.jpg>)

</details>
