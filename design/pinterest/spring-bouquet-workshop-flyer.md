# Spring Bouquet Workshop — Style Reference
> A garden-class flyer pinned to a corkboard: a white paper card on a stamp-edged burgundy backer, green serif caps, rose script and a gingham-taped polaroid.

**Source pin:** [`pinterest/example-2.com`](<../../pinterest/example-2.com>) · **Format:** workshop/event flyer, portrait · **Theme:** light

> ⚠️ **File note:** this pin is a JPEG saved with a `.com` extension, so GitHub and browsers won't preview it inline. Renaming it to `example-2.jpg` would fix that.

> Colors are sampled from the pin (~735 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Roles are interpreted.

A flyer for a hands-on flower-arranging class, which is the same format as a **baking class** or **cake-decorating workshop**. The information is organized like a handout clipped to a board: a white paper card held by a binder clip, backed by a burgundy card with postage-stamp perforations. A kraft "Secure Your Seat" label is stamped at an angle with the date and time. A polaroid of the result is taped with gingham, then the what's-included list, price and location sit beside it. Real flowers break out of the frame at the corners.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Garden Green | `#447049` | `--color-garden-green` | "SPRING BOUQUET" caps, host name script, social handle |
| Rose Script | `#ae515a` | `--color-rose-script` | "Workshop" script, list text, price |
| Stamp Burgundy | `#892923` | `--color-stamp-burgundy` | Perforated backing card |
| Kraft | `#f2ddb4` | `--color-kraft` | Stamp-edged date label |
| Paper | `#eff2ec` | `--color-paper` | Main flyer card |
| Dusty Rose | `#ca8f8f` | `--color-dusty-rose` | Blurred floral background |

## Tokens — Typography

### Condensed serif caps — "SPRING BOUQUET"
- **Substitute:** Fraunces 600 caps at `opsz 144`, tracking -0.01em, garden green

### Formal script — "Workshop", "Gabby Salinas"
- **Substitute:** Great Vibes, Pinyon Script; rose or green

### Book serif caps — list items, price, location
- **Substitute:** Fraunces 500 caps or Times-style serif, rose

## Tokens — Shapes
- **Stamp edge:** semicircle perforations (~16px) along the backer edges
- **Label:** kraft rectangle with a stamp edge, rotated ~8°
- **Polaroid:** white border, thick bottom margin, rotated ~-2°, gingham tape at the top
- **Binder clip:** a decorative object at the top center

## Components

### Clipped Flyer Card
**Role:** event details container
A paper card with a binder clip on top, layered over a perforated burgundy backer.

### Stamped Date Label
**Role:** date, time, CTA ("Secure Your Seat")
A kraft stamp-edged label, rotated, overlapping the top-right corner.

### What's Included List
**Role:** offer details
A caps heading followed by bullet points in rose serif caps, then the price and a location pin.

## Do's and Don'ts

### Do
- Present classes as a pinned handout with the date on a stamped label
- Show the finished result in a polaroid
- List exactly what's included and the price

### Don't
- Don't use more than two ink colors (green and rose) on the paper

## For Bakes by Mom
**Adopted:**
- Stamp-edged label and backer → `<Ticket variant="stamp">`
- Gingham-taped polaroid → `<Polaroid tape="gingham">`
- Class or workshop template → `<Card>` + `<Ticket>` composition in **Pages / Social Posts** ("Baking class with Mom")
- Location pin and price lines → `<Badge>` and the `price` text style

## Quick Start

```css
:root {
  --color-garden-green: #447049;
  --color-rose-script: #ae515a;
  --color-stamp-burgundy: #892923;
  --color-kraft: #f2ddb4;
  --color-paper: #eff2ec;

  --stamp-hole: 8px;
  --stamp-mask:
    radial-gradient(circle var(--stamp-hole), transparent 98%, #000) 0 0 / calc(var(--stamp-hole) * 2.5) calc(var(--stamp-hole) * 2.5) round;
}
```

<details>
<summary>Reference image (open the file directly; the .com extension blocks inline preview)</summary>

[Open `pinterest/example-2.com`](<../../pinterest/example-2.com>)

</details>
