# Raspberry Macaron "NEW" Poster — Style Reference
> A pop-art pastry announcement: butter-yellow paper, a stack of raspberry macarons on pink cloud blobs and "NEW NEW NEW" in puffy bubble letters.

**Source pin:** [`pinterest/raspberry macarons!!!🍓.jpg`](<../../pinterest/raspberry macarons!!!🍓.jpg>) · **Format:** product-launch poster / social post, portrait · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Roles are interpreted.

A loud, cheerful new-flavor announcement built on a classic pairing: **butter yellow and raspberry pink**. On the right, the product photo (three stacked macarons with whole raspberries) sits on a stack of pink cloud blobs, each with a peach offset outline. On the left, an outlined "RASPBERRY" runs vertically along the edge. Center stage, "NEW" is repeated three times in puffy raspberry bubble letters with a soft drop shadow. A small cloud badge gives the hours.

> Note: the pin's copy contains typos ("we off evry indipendent day", "9 am - 10 am"). Use the layout, not the copy.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Butter Paper | `#fff3c1` | `--color-butter-paper` | Background (~42%) |
| Macaron Pink | `#f4a1a9` | `--color-macaron-pink` | Cloud blobs, hours badge |
| Raspberry | `#e04e65` | `--color-raspberry` | "NEW" bubble letters, quote text |
| Peach Outline | `#f8c8b5` | `--color-peach-outline` | Offset outline around cloud blobs, outline type |
| Berry Ink | `#910726` | `--color-berry-ink` | "MACARON" title, "OPEN DAILY" |
| Red | `#ca102b` | `--color-red` | "RASPBERRY" subtitle |

## Tokens — Typography

### Bold grotesk caps — "MACARON"
- **Substitute:** Archivo Black, Inter 800; berry ink

### Bubble letters — "NEW NEW NEW"
- **Substitute:** Bagel Fat One, Chewy; raspberry with a 4px offset shadow in a muted gray-green
- **Treatment:** three stacked lines, slight bounce, tight leading

### Outline vertical caps — "RASPBERRY"
- Wide grotesk caps rotated 90°, outline only (peach stroke, no fill), running the full height

### Rounded casual — "RASPBERRY" subtitle, quote, "OPEN DAILY"
- **Substitute:** DM Sans 500, Nunito

## Tokens — Shapes
- **Cloud blobs:** stacked rounded blobs with a ~10px offset outline in peach
- **Hours badge:** small cloud shape at the bottom
- **Outline text:** 2px stroke, transparent fill

## Components

### Repeated "NEW" Stack
**Role:** launch emphasis
Repeating one word three times in a bubble face creates both rhythm and urgency.

### Cloud Blob Backdrop
**Role:** product stage
Overlapping pastel clouds with offset outlines that hold the product photo.

### Edge Outline Type
**Role:** decorative flavor name
A vertical outline word along one edge that frames the composition.

## Do's and Don'ts

### Do
- Pair butter yellow with raspberry pink. It's a classic patisserie combination
- Use outline (stroke-only) type for decoration and filled type for reading
- Repeat a single word for launch energy

### Don't
- Don't use outline text below ~48px; it disappears
- Don't publish copy without proofreading

## For Bakes by Mom
**Adopted:**
- Butter + raspberry pairing → `--bbm-color-butter-100` with `--bbm-color-cherry-500`/`--bbm-color-strawberry-300`
- Cloud price/hours badge → `<PriceTag shape="cloud">`
- Outline display type → `.bbm-text-outline` utility (text stroke) for social and hero accents
- "NEW" launch badge → `<Badge tone="cherry" variant="solid">NEW</Badge>`, and the **Pages / Social Posts** "New flavor" template

## Quick Start

```css
:root {
  --color-butter-paper: #fff3c1;
  --color-macaron-pink: #f4a1a9;
  --color-raspberry: #e04e65;
  --color-peach-outline: #f8c8b5;
  --color-berry-ink: #910726;
}

.outline-type {
  color: transparent;
  -webkit-text-stroke: 2px var(--color-peach-outline);
}
```

<details>
<summary>View the reference image</summary>

![Raspberry macaron poster](<../../pinterest/raspberry macarons!!!🍓.jpg>)

</details>
