# Strawberry Cake Awning Poster — Style Reference
> A pastry-shop window under a red-and-white awning: strawberry gingham, a painted cake slice, gold glitter stars and a "Try our best seller!" shout.

**Source pin:** [`pinterest/Poster design example ✨ Strawberry Cake concept 🍓  DM for art commission! 💌.jpg`](<../../pinterest/Poster design example ✨ Strawberry Cake concept 🍓  DM for art commission! 💌.jpg>) · **Artist:** @ellathifart · **Format:** promotional poster / social post, portrait · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Roles are interpreted.

An illustrated promo for a best-selling strawberry cake, made to stop the scroll. The scalloped red-and-white **awning** across the top turns the poster into a shop window. A cloud-shaped red plaque holds the hand-lettered title, a painterly cake slice fills the center, and the space around it is crowded with sticker energy: real strawberry cutouts, social "like" hearts, red starbursts, gold glitter stars, a ribbon bow and a brush-script "Yum!!". It's maximal, but disciplined by the strawberry palette.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Awning Red | `#bc2419` | `--color-awning-red` | Awning, title plaque, starbursts, footer text |
| Strawberry | `#d85d60` | `--color-strawberry` | Gingham dark checks, script text, footer band |
| Gingham Pink | `#ffc0b7` | `--color-gingham-pink` | Gingham light checks |
| Shell Pink | `#fecec7` | `--color-shell-pink` | Gingham mid tone |
| Meringue | `#fef3ef` | `--color-meringue` | Awning white stripes, lettering on red |
| Glitter Gold | `#c58e35` | `--color-glitter-gold` | Star stickers (textured gold) |

## Tokens — Typography

### Hand-lettered caps — "STRAWBERRY CAKE"
- **Identified as:** chalky, textured hand-lettered caps with a slight bounce
- **Substitute:** Fraunces 600 caps with a light grain overlay, or Amatic SC Bold for a sketchier look
- **Color:** meringue on the red plaque

### Brush script — "Try our best seller!", "Yum!!"
- **Substitute:** Caveat Brush, Kalam 700
- **Treatment:** set on a diagonal, following the cake edge

### Tracked caps — "@ellathifart" in the footer, ~+0.3em tracking

## Tokens — Spacing & Shapes

| Element | Value |
|---------|-------|
| awning | ~11% of poster height, alternating red and white stripes ending in scallops |
| title plaque | cloud/blob shape with a meringue offset outline |
| gingham | ~6% of poster width per check |
| footer | full-width strawberry band with an ornamental rule above |

## Components

### Awning Header
**Role:** frames the poster as a shopfront
Vertical red and white stripes with a scalloped bottom edge, each scallop matching one stripe.

### Cloud Title Plaque
**Role:** product name
A red cloud-shaped panel with a pale offset outline and lettering in meringue.

### Sticker Cluster
**Role:** energy and social proof
Strawberry cutouts, three heart "like" bubbles, starbursts and gold stars arranged around the hero.

### Ornamental Rule
**Role:** footer divider
A thin red line with diamond and lozenge flourishes in the center.

## Do's and Don'ts

### Do
- Use an awning to say "shop" instantly
- Keep the stickers in the same hue family as the product
- Write callouts in brush script on a diagonal for motion

### Don't
- Don't use this level of density on the website; keep it for social posts
- Don't add a second pattern besides gingham

## For Bakes by Mom
**Adopted:**
- Awning edge → `<EdgeDivider shape="awning">`
- Gingham → `<PatternSurface pattern="gingham" tone="strawberry">`
- Starburst "Best seller" → `<Seal>` and `<Badge tone="cherry">` with `<Doodle name="star">`
- Ornamental rule → `<Doodle name="squiggle">` between hairline rules in the footer

**Left behind:** gold glitter texture and the social "like" heart stickers. They are platform-specific and too busy for the website.

## Quick Start

```css
:root {
  --color-awning-red: #bc2419;
  --color-strawberry: #d85d60;
  --color-gingham-pink: #ffc0b7;
  --color-meringue: #fef3ef;
  --color-glitter-gold: #c58e35;

  --pattern-gingham:
    linear-gradient(90deg, rgb(216 93 96 / 0.5) 50%, transparent 0) 0 0 / 44px 44px,
    linear-gradient(rgb(216 93 96 / 0.5) 50%, transparent 0) 0 0 / 44px 44px,
    var(--color-meringue);
}
```

<details>
<summary>View the reference image</summary>

![Strawberry cake awning poster](<../../pinterest/Poster design example ✨ Strawberry Cake concept 🍓  DM for art commission! 💌.jpg>)

</details>
