# Puzzle Pantry (Olive St Studio) — Style Reference
> A cozy-night-in general store: oxblood type on vanilla, a butter "about" corner, a lilac script seal and words that slip into script mid-sentence.

**Source pin:** [`pinterest/Full Shopify Website & Brand Design for Puzzle Pantry | Olive St Studio.jpg`](<../../pinterest/Full Shopify Website & Brand Design for Puzzle Pantry | Olive St Studio.jpg>) · **Format:** Shopify homepage plus brand mark, desktop · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Sizes are estimates scaled to a 1440 px desktop canvas. Roles are interpreted.

A full brand and Shopify build for a puzzle and crafts shop that shares Bakes by Mom's emotional promise: slow down and enjoy a homey evening. The type lockup is the signature. A classic serif headline swaps individual words into a casual script ("For the *nights* that don't need plans, just *pieces*"). The site uses a strict, quiet palette (oxblood ink, vanilla, butter, fog blue) and saves pattern for edges: a ticker band and a geometric tile strip under the hero, cabana stripes behind a quatrefoil photo frame, and a closing ticker.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Oxblood | `#48110e` | `--color-oxblood` | Announcement bar, text, ticker bands, presentation stripes |
| Vanilla | `#f9f4e2` | `--color-vanilla` | Page canvas and product area |
| Butter | `#eee2b8` | `--color-butter` | "About Puzzle Pantry" section |
| Fog Blue | `#e5eaf0` | `--color-fog-blue` | Category band with a curved top |
| Lilac Seal | `#dcd7eb` | `--color-lilac-seal` | Circular logo badge |
| Dusty Rose | `#bc8588` | `--color-dusty-rose` | Presentation stripes, pink filter pill, quatrefoil outline |
| Olive Khaki | `#908054` | `--color-olive-khaki` | "Jigsaw puzzles" filter pill and the stripe partner in the about section |

## Tokens — Typography

### Editorial serif — hero headline and section titles
- **Identified as:** light, high-contrast transitional serif
- **Substitute:** Fraunces 300 at `opsz 144`, or Cormorant Garamond 500
- **Size:** ~44px hero, white over the photo

### Casual script — inline words ("nights", "pieces") and section labels ("Shop Bestsellers", "About Puzzle Pantry", the logo)
- **Identified as:** monoline casual script
- **Substitute:** Sacramento, Allison, or Pinyon Script for a more formal look
- **Treatment:** replaces single words inside serif sentences, at ~1.2× the serif size

### Micro caps sans — nav, announcement, product names, ticker
- **Substitute:** DM Sans 600, 9–11px, tracking +0.12em

## Tokens — Spacing & Shapes

| Element | Value |
|---------|-------|
| filter pills | pill, colored fill, micro caps |
| CTA | small cream pill on the hero ("SHOP ALL") |
| category band | top edge is a shallow convex curve |
| photo frame | quatrefoil (four-lobed) frame with a dusty-rose outline |
| logo seal | circle, lilac fill, script wordmark |

## Components

### Announcement Bar
**Role:** shipping promo
Oxblood strip with micro caps in cream ("FREE US SHIPPING ON ORDERS OVER $75").

### Script-Swap Headline
**Role:** emotional hero line
A serif sentence where one or two keywords are set in script, all centered and white over a cozy flat-lay photo.

### Ticker + Tile Strip
**Role:** hero bottom border
A thin ticker of category words ("PUZZLES ✿ CRAFTS ✿ HOMEBODY GOODS") above a strip of geometric tile motifs.

### Filter Pills
**Role:** product category switcher
Three small colored pills (olive, blue, pink) aligned right of the "Shop Bestsellers" script title.

### Category Band
**Role:** shop by category
A fog-blue band with a curved top edge. Five object cutouts (puzzle box, painting, mini house, kit, bottle) sit above underlined caps labels.

### Quatrefoil Frame
**Role:** feature photo in the about section
A four-lobed shape with a pink outline, set on vertical olive stripes.

## Do's and Don'ts

### Do
- Swap a single emotional word into script inside a serif sentence
- Keep pattern on edges (tickers, borders, frame backgrounds) and keep content areas calm
- Use object cutouts without boxes for category navigation

### Don't
- Don't script more than two words per headline
- Don't let the oxblood become a background beyond thin bars

## Surfaces & Elevation
Vanilla → butter → fog blue panels. Flat, with no shadows.

## Imagery
Warm flat-lays of puzzles, coffee and croissants; clean packshots for products; cutouts for categories.

## For Bakes by Mom
**Adopted:**
- Script-swap headline → `<SectionHeading>` and `<Hero>` accept an inline `<em>` that renders in the script font (`.bbm-script-word`)
- Announcement bar → `<SiteHeader announcement>`
- Filter pills → `<Badge>` used as toggle chips in the menu page story
- Category cutouts → `<ProductCard imageShape="circle">` in compact mode
- Ticker + tile strip → `<Marquee>` + `<PatternSurface pattern="checker">` strip
- Curved band top → `<EdgeDivider shape="wave">` with a single long wave

**Left behind:** the lilac logo seal color (Bakes by Mom keeps lavender as a minor accent only).

## Quick Start

```css
:root {
  --color-oxblood: #48110e;
  --color-vanilla: #f9f4e2;
  --color-butter: #eee2b8;
  --color-fog-blue: #e5eaf0;
  --color-lilac-seal: #dcd7eb;
  --color-dusty-rose: #bc8588;
  --color-olive-khaki: #908054;
}

.headline em {
  font-family: "Sacramento", cursive;
  font-style: normal;
  font-size: 1.2em;
}
```

<details>
<summary>View the reference image</summary>

![Puzzle Pantry website](<../../pinterest/Full Shopify Website & Brand Design for Puzzle Pantry | Olive St Studio.jpg>)

</details>
