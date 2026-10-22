# Cherry Cloud Shortcake — Style Reference
> A 1950s patisserie window card: seafoam cabana stripes, a painterly cake slice and maraschino-red type arched like a shop sign.

**Source pin:** [`pinterest/Bakery poster design.jpg`](<../../pinterest/Bakery poster design.jpg>) · **Format:** print poster, portrait (soft-opening announcement) · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Sizes are relative to the poster. Roles are interpreted.

This is a soft-opening poster for "Berry Moments" that does a lot with very little: one stripe pattern, one illustration and one ink color. Equal-width seafoam and ivory vertical stripes cover the whole canvas like a cabana awning or a vintage cake box. All type is a single deep maraschino red. The brand name arches across the top in wide flared serif capitals, overlapped by a copperplate script ("Shortcake"). The cake slice is a painterly vintage illustration rather than a photo, which makes the poster feel like a retro menu card instead of an ad.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Seafoam Stripe | `#b1d4d0` | `--color-seafoam-stripe` | Alternating stripe color. About 40% of the canvas |
| Ivory | `#fbfcee` | `--color-ivory` | Alternating stripe color and the poster paper |
| Maraschino | `#772e28` | `--color-maraschino` | All type: title, script, hours, tagline and URL |
| Sponge | `#e4bd9b` | `--color-sponge` | Cake crumb in the illustration |
| Frosting | `#efddc0` | `--color-frosting` | Cream layers and plate |
| Cocoa Shade | `#936555` | `--color-cocoa-shade` | Illustration shadows (side of the cake, plate edge) |

## Tokens — Typography

### Arched display serif — "CHERRY CLOUD" · `--font-display`
- **Identified as:** wide, flared old-style serif capitals in the Windsor or Copperplate Gothic Wide family
- **Substitute:** Fraunces 600 at `opsz 144` with +0.04em tracking, or Young Serif
- **Treatment:** set on a gentle arc (SVG `textPath`), like lettering on a shop window
- **Size:** ~11% of poster width per letter height

### Copperplate script — "Shortcake" · `--font-script`
- **Identified as:** formal copperplate script with long entry and exit swashes
- **Substitute:** Pinyon Script, Great Vibes
- **Treatment:** sits directly under the arch and overlaps it slightly

### Spaced serif caps — hours, tagline, URL, corner labels
- **Substitute:** Fraunces 500 caps with +0.08em tracking
- **Size:** ~3% of poster width. Corner labels ("SOFT OPENING", "AUGUST 9 2026") are top-left and top-right aligned

## Tokens — Spacing & Shapes

### Pattern
- **Stripe width:** ~5.4% of poster width (~40px at 736px), with equal seafoam and ivory bands
- **Direction:** vertical, full bleed, no border

### Layout
- **Margins:** ~3% outer margin for corner labels
- **Stack:** corner labels → arched title → script → illustration (~45% of height) → hours → two-line tagline → URL
- **Alignment:** everything centered except the corner labels

## Components

### Arched Title Lockup
**Role:** brand or product name plus descriptor
Wide serif caps on a shallow arc with a formal script word tucked under the arch. One ink color, no outline and no shadow.

### Corner Meta Labels
**Role:** event metadata (status, date)
Two short caps labels anchored to the top corners, framing the arch like the header of a printed ticket.

### Hero Illustration
**Role:** product focus
A painterly, slightly desaturated cake slice with real texture (brush strokes, crumb) on a cream plate, floating on the stripes with no frame.

## Patterns & Motifs
- **Cabana stripes:** equal-width vertical stripes in a pastel plus ivory
- **Cherries:** a pair of glossy cherries on top as the focal accent, the only saturated red in the image

## Do's and Don'ts

### Do
- Let a single dark red carry all type on a pastel stripe; the restraint reads "classic patisserie"
- Arch the brand name. Curved lettering instantly evokes shopfronts and cake boxes
- Pair wide serif caps with a formal script for the product name
- Use illustration, not photography, when the goal is nostalgic print charm

### Don't
- Don't add a second type color; the single ink is the style
- Don't put text directly over busy illustration areas. Keep type on calm stripe space
- Don't use thin stripes. These are bold, equal bands

## Surfaces & Elevation
Flat. The stripe field is the only surface and there are no shadows besides those painted in the illustration.

## Imagery
Vintage gouache-style food illustration: soft edges, visible texture, warm cream tones and glossy cherries.

## For Bakes by Mom
**Adopted:**
- Vertical cabana stripes → `<PatternSurface pattern="stripes" tone="blueberry">` using `--bbm-color-blueberry-200` and `--bbm-color-cream-50`
- Dark-red single-ink type on pastel → `--bbm-color-text-brand` (`cherry-700`)
- Serif caps plus script lockup → `<SectionHeading title script>` with Fraunces and Pinyon Script
- Arched text → `<Seal>` (circular text) and the curved title option in `<Logo variant="seal">`
- Corner meta labels → eyebrow style (`--bbm-text-eyebrow-*`) for event posters ("SOFT OPENING")

**Left behind:** the seafoam hue itself. Bakes by Mom uses a powder blueberry instead, which pairs better with the strawberry and cherry palette.

## Quick Start

```css
:root {
  --color-seafoam-stripe: #b1d4d0;
  --color-ivory: #fbfcee;
  --color-maraschino: #772e28;
  --color-sponge: #e4bd9b;
  --color-frosting: #efddc0;

  --pattern-cabana: repeating-linear-gradient(
    90deg,
    var(--color-seafoam-stripe) 0 40px,
    var(--color-ivory) 40px 80px
  );
}
```

<details>
<summary>View the reference image</summary>

![Cherry Cloud Shortcake poster](<../../pinterest/Bakery poster design.jpg>)

</details>
