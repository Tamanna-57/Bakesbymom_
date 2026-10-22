# Pretty OK! — The Nostalgia Post — Style Reference
> A mail club's "How it works" page: letters stacked at jaunty angles on olive cabana stripes, with a pink sticker-row FAQ.

**Source pin:** [`pinterest/Pretty OK Studios Homepage ✷ Shopify Website Examples For Stationery Brands.jpg`](<../../pinterest/Pretty OK Studios Homepage ✷ Shopify Website Examples For Stationery Brands.jpg>) · **Credit on pin:** website design by @toreradesigns · **Format:** Shopify page section (How it works + FAQ), desktop · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Sizes are estimates scaled to a 1440 px desktop canvas. Roles are interpreted.

This is the subscription page of the same brand as [pretty-ok-studios-homepage.md](./pretty-ok-studios-homepage.md), showing how the system handles process and support content. The four steps of the mail club are drawn as four letters dropped onto a striped tablecloth: each a different color, each slightly rotated, each with a sticker icon. The FAQ below swaps the usual gray accordion for pink pill-ish rows with tiny sticker icons. Two marquee ribbons running in opposite directions top the section.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Olive Stripe | `#cdc171` | `--color-olive-stripe` | Wide cabana stripes behind the steps; step card 3 |
| Vanilla | `#fff8ed` | `--color-vanilla` | Alternating stripes and FAQ background |
| Bubblegum | `#f3c5c8` | `--color-bubblegum` | Step card 1 and FAQ rows |
| Hot Cocoa | `#32180b` | `--color-hot-cocoa` | Step card 2 (inverse), marquee, polka dots, outlines |
| Powder Blue | `#c4d7e8` | `--color-powder-blue` | Step card 4, top marquee ribbon, dot band ground |
| Mustard | `#fec459` | `--color-mustard` | Pin presentation background (also a usable brand accent) |

## Tokens — Typography

### Condensed display serif — "How it works", "FAQ's", step titles
- **Substitute:** Fraunces 600 at `opsz 144`, tracking -0.01em
- **Size:** ~28px section title, ~16px step titles

### Sans body — step descriptions, FAQ questions, marquee text
- **Substitute:** Inter, DM Sans; 11–13px

## Tokens — Spacing & Shapes

| Element | Value |
|---------|-------|
| step cards | ~8px radius, 1px hot-cocoa outline, rotation between -3° and +2° |
| FAQ rows | ~6px radius, 1px outline, ~36px tall, 2-column grid with ~16px gap |
| stripes | ~48px bands at 1440px (equal olive/vanilla) |
| polka-dot trim | ~28px chocolate dots cut by the edge |

## Components

### Stacked Step Cards
**Role:** process explainer ("Join", "Renews monthly", "Letters go out by the 6th", "Exclusive")
Four full-width cards stacked vertically with small overlaps and alternating rotations. Each card has a sticker icon on the left, a serif title and a one-line description. Colors cycle pink → cocoa (inverse text) → olive → powder.

### Double Marquee
**Role:** brand promises
Two thin ribbons: powder blue on top, chocolate below. They carry "Old-School Charm, Modern Goodies ♥ Hand-Designed Art. Hand-Packed Orders. ★".

### Sticker FAQ
**Role:** support questions
A two-column grid of pink outlined rows. Each row has a tiny sticker illustration, the question in sans 12px and a "+" on the right.

## Do's and Don'ts

### Do
- Give each step its own pastel and its own small rotation; together they read as a stack of mail
- Reuse brand stickers as list icons in FAQs
- Use one inverse (dark) card in a set of pastels for rhythm

### Don't
- Don't rotate beyond ±3°, or the text becomes hard to read
- Don't use gray accordions; tint them with a brand pastel

## Surfaces & Elevation
Striped tablecloth → colored letters → stickers. Flat, outline-only, no shadows.

## For Bakes by Mom
**Adopted:**
- Rotated stacked steps → `<StepList variant="stack">` ("Choose your bake → Pick a date → Pick up warm")
- Sticker-icon FAQ rows → `<Accordion tone="strawberry">` with an optional `icon` per item
- Double marquee → `<Marquee>` (two instances with `direction="reverse"`)
- Olive/mustard tones → `--bbm-color-butter-*` and `--bbm-color-pistachio-*`

**Left behind:** the very wide 2-column FAQ on mobile. Bakes by Mom's accordion is one column below 768px.

## Quick Start

```css
:root {
  --color-olive-stripe: #cdc171;
  --color-vanilla: #fff8ed;
  --color-bubblegum: #f3c5c8;
  --color-hot-cocoa: #32180b;
  --color-powder-blue: #c4d7e8;
  --color-mustard: #fec459;

  --step-tilt-a: rotate(-3deg);
  --step-tilt-b: rotate(2deg);
}
```

<details>
<summary>View the reference image</summary>

![Pretty OK Nostalgia Post page](<../../pinterest/Pretty OK Studios Homepage ✷ Shopify Website Examples For Stationery Brands.jpg>)

</details>
