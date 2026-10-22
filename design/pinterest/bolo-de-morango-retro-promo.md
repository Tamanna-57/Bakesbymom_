# Bolo de Morango Retro Promo — Style Reference
> A faded 60s bakery coupon: salmon-and-cream stripes on grainy paper, an olive "PROMO" stamp behind a red copperplate cake name, and a 10%-off tab sliding in from the edge.

**Source pin:** [`pinterest/post para confeitaria com estética retrô🍓.jpg`](<../../pinterest/post para confeitaria com estética retrô🍓.jpg>) ("post for a confectionery with retro aesthetics") · **Designer mark on pin:** @juliasrdesigner · **Format:** Instagram promo post (4:5) for a Brazilian confeitaria · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Roles are interpreted.

A promo post for "bolo de morango" (strawberry cake) that achieves its retro feel through **print simulation**: paper grain, slightly faded salmon stripes and a thin red inset frame like a vintage coupon. The type lockup layers three voices. "PROMO" in a giant olive condensed sans sits behind, "Bolo de morango" in red copperplate script overlaps it, and small red condensed caps carry the details. The offer is a pill-shaped tab ("10% OFF") that enters from the left edge, and an outlined oval sticker reads "IMPOSSÍVEL COMER SÓ UMA FATIA" ("impossible to eat just one slice").

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Aged Cream | `#f2e4bf` | `--color-aged-cream` | Paper ground and stripe partner |
| Salmon Stripe | `#f3b29f` | `--color-salmon-stripe` | Vertical stripes |
| Olive Stamp | `#b2b155` | `--color-olive-stamp` | "PROMO" background word |
| Strawberry Red | `#e71822` | `--color-strawberry-red` | Script, offer tab text, inset frame, arrows |
| Jam | `#a91511` | `--color-jam` | Darker red for small caps |

## Tokens — Typography

### Condensed bold sans — "PROMO"
- **Substitute:** Oswald 700, Bebas Neue; olive, ~25% of poster width per letter height, behind everything

### Copperplate script — "Bolo de morango"
- **Substitute:** Pinyon Script, Great Vibes; strawberry red, overlapping "PROMO"

### Condensed caps — "10% OFF", the oval sticker text, contact lines
- **Substitute:** Oswald 600, Barlow Condensed 600; red

## Tokens — Shapes & Effects
- **Inset frame:** 1.5px red line ~2% inside the edge
- **Offer tab:** pill with a flat left side that bleeds off the canvas edge, cream fill, red outline
- **Oval sticker:** outlined ellipse, rotated ~-8°
- **Paper grain:** subtle noise overlay at ~8% opacity
- **Hand-drawn arrows:** thin curved red strokes pointing at the slice

## Components

### Layered Promo Lockup
**Role:** offer headline
A big muted word behind and a script name in front. The contrast of scale and style makes the lockup.

### Edge Offer Tab
**Role:** discount callout
A pill anchored to the canvas edge as if pulled from a drawer.

### Oval Claim Sticker
**Role:** playful claim
Outlined oval with two lines of caps, slightly rotated.

## Do's and Don'ts

### Do
- Simulate print (grain, inset frame) for retro credibility
- Put a large faded word behind the product name
- Point at the product with hand-drawn arrows

### Don't
- Don't use the grain texture on web UI surfaces, only on social templates
- Don't stack more than three type voices

## For Bakes by Mom
**Adopted:**
- Layered promo lockup → **Pages / Social Posts** "Weekend promo" template (Fraunces caps behind Pinyon Script)
- Edge offer tab → `<Badge>` with `shape="tab"` (flat side) in social templates
- Oval claim sticker → `<Seal shape="oval">` (outlined, no rotation animation)
- Salmon stripes → `<PatternSurface pattern="stripes" tone="strawberry">`

## Quick Start

```css
:root {
  --color-aged-cream: #f2e4bf;
  --color-salmon-stripe: #f3b29f;
  --color-olive-stamp: #b2b155;
  --color-strawberry-red: #e71822;
  --color-jam: #a91511;

  --frame-inset: inset 0 0 0 12px var(--color-aged-cream), inset 0 0 0 13.5px var(--color-strawberry-red);
}
```

<details>
<summary>View the reference image</summary>

![Bolo de morango promo](<../../pinterest/post para confeitaria com estética retrô🍓.jpg>)

</details>
