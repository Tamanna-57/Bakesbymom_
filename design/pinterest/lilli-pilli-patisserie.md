# Lilli Pilli Patisserie Café — Style Reference
> A garden-party patisserie: forest-green awnings, apricot icing and condensed serif caps on cream, with cakes piped in retro Lambeth frills.

**Source pin:** [`pinterest/Lilli Pilli Patisserie Cafe | Shopify Website Design.jpg`](<../../pinterest/Lilli Pilli Patisserie Cafe | Shopify Website Design.jpg>) · **Format:** Shopify homepage, desktop · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Sizes are estimates scaled to a 1440 px desktop canvas. Roles are interpreted.

A real patisserie café in Caringbah South (NSW, Australia). It is the most "grown-up" bakery reference in the set. The palette is restrained: forest green, sage, apricot and cream. The patterns are architectural, like awning stripes that frame the hero top and bottom. Condensed high-contrast serif capitals give it a heritage-bakery voice, while the cake photography (retro Lambeth-piped hearts in cherry and pink) adds the playfulness. It's a good model for the *café and ordering* side of Bakes by Mom: clear "Order now" CTAs, bestsellers with "From $" pricing and a "Visit us" block with hours.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Forest | `#4c644a` | `--color-forest` | Hero panel, announcement bar, filled buttons |
| Sage | `#a8b79c` | `--color-sage` | Awning stripes, marquee band |
| Apricot | `#d8976f` | `--color-apricot` | Logo, "Shop bestsellers" section background |
| Cream | `#f7f0e6` | `--color-cream` | Canvas, stripe partner, button text |
| Pine Ink | `#232f28` | `--color-pine-ink` | Body text (also the pin's presentation background) |
| Lambeth Cherry | `#d9454a` (photo) | — | Piped icing in photography; content only |

## Tokens — Typography

### Condensed display serif — "LILLI PILLI", "WHERE TRADITION MEETS TREND", "CRAFT & COMMUNITY", "SHOP BESTELLERS"
- **Identified as:** condensed, high-contrast didone-ish serif, all caps
- **Substitute:** Fraunces 400 at `opsz 144`, tracking -0.01em; or Gloock
- **Size:** ~44px logo, ~32px hero, ~26px section titles

### Geometric sans — nav, body, eyebrow, buttons
- **Substitute:** Montserrat, DM Sans
- **Size:** 10–12px caps nav with +0.08em tracking; 12px body

### Marquee serif — "CATERING ✿ CAKES ✿ COOKIES"
- Same condensed serif at ~28px, cream on sage, with tiny line icons as separators

## Tokens — Spacing & Shapes

| Element | Value |
|---------|-------|
| outline CTA | pill, 1px forest outline ("ORDER NOW" in the header) |
| filled CTA | pill, forest or cream fill |
| product images | ~20px radius |
| hero photos | ~6px radius, offset to the hero corners |
| section edge | wave bottom edge on the apricot section |
| awning | ~24px vertical stripes, sage and cream |

## Components

### Header with Logo Lockup
**Role:** brand plus nav
Logo in apricot condensed caps, with "PATISSERIE CAFÉ" in micro caps between rules. Caps nav, and an outlined pill "ORDER NOW".

### Awning Hero
**Role:** opening statement
A forest panel with sage/cream awning stripes along its top and bottom edges. It holds a centered caps headline, a sub-caps location line, a small cream "ORDER NOW" pill, a circular rubber-stamp logo overlapping the headline, and two photos breaking out of opposite corners.

### Marquee Category Band
**Role:** what we make
A sage band with large serif caps and small line icons (cake, cookie, cutlery) in a loop.

### Bestseller Cards
**Role:** shop grid
Four cards with ~20px-radius photos on an apricot section, caps serif names ("VINTAGE DAISY BABY") and "From $70.00 AUD". The section ends in a wave edge.

### Visit Us Block
**Role:** location and hours
A tall photo of the café exterior, then "VISIT US" with ADDRESS and OPENING HOURS sub-blocks and a forest "GET DIRECTIONS" pill.

## Do's and Don'ts

### Do
- Use awning stripes as borders (top and bottom of a band), not as full backgrounds
- Write "From $" pricing for customizable cakes
- Make "Order now" visible in the header on every page

### Don't
- Don't use the condensed serif for paragraphs
- Don't overload the forest green; cream should dominate

## Surfaces & Elevation
Cream canvas → forest hero → sage band → apricot section. No shadows.

## Imagery
Bright, high-key cake photography against dark green or pink backdrops; candid team photos in the kitchen; architectural café exterior.

## For Bakes by Mom
**Adopted:**
- Awning-stripe borders → `<EdgeDivider shape="awning">` above and below `<Hero>`
- Apricot section → `--bbm-color-caramel-300` as a warm section tone
- Forest panel → `--bbm-color-pistachio-700` (`<Card tone="pistachio" fill="solid">` and dark sections)
- "From $" pricing → `<ProductCard price="From $38">`
- Visit Us and opening hours → the **Pages / Home** "Where to find us" block (times in `DM Mono`)
- Circular stamp logo → `<Logo variant="seal">`
- Wave edge → `<EdgeDivider shape="wave">`

## Quick Start

```css
:root {
  --color-forest: #4c644a;
  --color-sage: #a8b79c;
  --color-apricot: #d8976f;
  --color-cream: #f7f0e6;
  --color-pine-ink: #232f28;

  --pattern-awning: repeating-linear-gradient(
    90deg,
    var(--color-sage) 0 24px,
    var(--color-cream) 24px 48px
  );
  --radius-product: 20px;
}
```

<details>
<summary>View the reference image</summary>

![Lilli Pilli Patisserie website](<../../pinterest/Lilli Pilli Patisserie Cafe | Shopify Website Design.jpg>)

</details>
