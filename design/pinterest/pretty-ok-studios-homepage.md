# Pretty OK! Studios Homepage — Style Reference
> A modern-nostalgic stationery shop: vanilla paper, powder-blue and olive-butter blocks, chocolate polka dots and airmail-striped letter cards.

**Source pin:** [`pinterest/Boutique E-Commerce Homepage Layout Vibrant Cheerful Expressive Warm branding design.jpg`](<../../pinterest/Boutique E-Commerce Homepage Layout Vibrant Cheerful Expressive Warm branding design.jpg>) · **Credit on pin:** website design by @toreradesigns · **Format:** Shopify homepage, desktop · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Sizes are estimates scaled to a 1440 px desktop canvas. Roles are interpreted.

The homepage for Pretty OK! Studios, a hand-drawn stationery and sticker brand. It combines a clean e-commerce grid with charming borders: a product carousel with no card chrome, two soft feature blocks, a chocolate marquee band and an "about the founder" section with a scalloped photo frame and a tilted letter card edged in candy stripes. It is a good model for a small maker's shop because the commerce parts stay plain and the personality lives in the borders, dividers and frames.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Vanilla Paper | `#fff7ee` | `--color-vanilla-paper` | Page canvas |
| Powder Blue | `#c4d7e8` | `--color-powder-blue` | Feature card, dot-band ground, photo-frame fill, presentation background |
| Olive Butter | `#cfc06f` | `--color-olive-butter` | Feature card and the striped top border |
| Chocolate | `#480e0b` | `--color-chocolate` | Marquee band, polka dots, heart illustration |
| Blush Button | `#f1c5c9` | `--color-blush-button` | "About Elia" button and the pink stripe border at the bottom |
| Espresso Ink | `#331e0d` | `--color-espresso-ink` | Headlines and body text |

## Tokens — Typography

### Condensed display serif — "Your New Favs!", "Meet Elia", "Designed with Love"
- **Identified as:** condensed, high-contrast soft serif (Gazpacho Condensed or Recoleta style)
- **Substitute:** Fraunces 600 at `opsz 144` with tightened tracking (-0.01em), or Young Serif
- **Size:** ~28px section titles, ~20px card titles

### Clean sans — product names, prices, body, marquee
- **Substitute:** Inter, DM Sans
- **Size:** 13–15px

### Micro eyebrow — "YOUR NEW STATIONERY BFF"
- Sans caps ~9px with +0.12em tracking

## Tokens — Spacing & Shapes

| Element | Value |
|---------|-------|
| product image | 0px radius |
| feature cards | ~6px radius |
| buttons | ~4px radius, 1px chocolate outline |
| letter card | 0px radius, ~10px striped border, rotated ~-3° |
| scallop frame | scalloped outer edge, 1px chocolate stroke |

**Layout:** max-width ~1100px, section padding ~64px, product carousel gap ~16px.

## Components

### Product Carousel Card
**Role:** shop grid item
A square-ish lifestyle photo with no border, radius or shadow, then the product name (sans 14px) and price below. The fourth card is cropped by the viewport edge to signal horizontal scrolling.

### Underline Tabs
**Role:** filter between "Stationery" and "Stickers"
Plain text tabs. The active tab has a short blush underline.

### Feature Block
**Role:** brand values ("Designed with Love", "Hand Made Art.")
A pastel rectangle (olive or powder) with ~6px radius, a centered sticker-style illustration (wand, heart), a serif title and a small caption.

### Marquee Band
**Role:** brand promises
A chocolate band with vanilla sans text: "Artist-made. Community-Focused. ★ Stationery, Stickers, Apparel, and More! Oh My! ♡". It uses star and heart separators.

### Polka-Dot Divider
**Role:** section separator
A strip of large chocolate dots on powder blue, cut in half by the section edge so it reads as a scalloped trim.

### Scalloped Photo Frame
**Role:** founder portrait
A powder-blue frame with a scalloped edge, chocolate polka dots and blue starfish doodles around a cut-out portrait.

### Airmail Letter Card
**Role:** founder intro
A vanilla card with an olive-and-vanilla striped border (like an airmail envelope), rotated slightly. It holds an eyebrow, serif title, paragraph and a small blush button.

## Patterns & Motifs
- **Block-stripe borders** (olive/vanilla on top, blush/vanilla at the bottom)
- **Large polka dots** used as an edge trim
- **Hand-drawn sticker illustrations** (wand with bow, heart, starfish)

## Do's and Don'ts

### Do
- Keep commerce components (product grid, prices) plain and put the charm in frames and dividers
- Use a near-black chocolate for dots and bands so the pastels have an anchor
- Rotate one or two cards slightly for a hand-placed feel

### Don't
- Don't add card chrome to product photos
- Don't rotate more than one element per viewport

## Surfaces & Elevation
Vanilla canvas → pastel blocks → chocolate band. No shadows anywhere; depth comes from outlines and overlap.

## Imagery
Bright, candid lifestyle photos of products in hand. The founder portrait is playful and cut out, set inside a decorative frame.

## For Bakes by Mom
**Adopted:**
- Plain product grid → `<ProductCard>` (photo first, minimal chrome)
- Polka-dot trim → `<EdgeDivider shape="dots">`
- Chocolate marquee band → `<Marquee tone="cocoa">`
- Pastel feature blocks → `<Card tone="butter">` and `<Card tone="blueberry">`
- Striped airmail border → `<Card frame="stripes">`, used for "Meet Mom"
- Scalloped photo frame → `<Polaroid frame="scallop">`

**Left behind:** the very small square-ish buttons. Bakes by Mom uses pill buttons with a minimum 44px height.

## Quick Start

```css
:root {
  --color-vanilla-paper: #fff7ee;
  --color-powder-blue: #c4d7e8;
  --color-olive-butter: #cfc06f;
  --color-chocolate: #480e0b;
  --color-blush-button: #f1c5c9;
  --color-espresso-ink: #331e0d;

  --border-airmail: repeating-linear-gradient(
    90deg,
    var(--color-olive-butter) 0 18px,
    var(--color-vanilla-paper) 18px 36px
  );
}
```

<details>
<summary>View the reference image</summary>

![Pretty OK Studios homepage](<../../pinterest/Boutique E-Commerce Homepage Layout Vibrant Cheerful Expressive Warm branding design.jpg>)

</details>
