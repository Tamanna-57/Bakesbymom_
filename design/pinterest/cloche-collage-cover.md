# Cloche Reveal Collage — Style Reference
> A love-letter reveal: torn pink gingham, a handwritten letter, a heart locket and a silver cloche lifting to show... nothing yet.

**Source pin:** [`pinterest/cover page.jpg`](<../../pinterest/cover page.jpg>) · **Format:** story or highlight cover / social teaser (9:16, rounded black frame) · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Roles are interpreted. There is no typography in this piece.

A typeless mixed-media collage built around one idea: **the reveal**. A gloved hand lifts a polished cloche off an empty plate, and motion ticks show it popping open. Everything around it is soft and romantic: a pink graph-paper ground, torn strips of rose gingham, a scrap of handwritten pink letter paper, a heart locket, doodled hearts, a sparkle, a bow and a looping ribbon. Each cutout has a thin white die-cut halo, so the pieces look like stickers.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Petal Grid | `#fadde1` | `--color-petal-grid` | Graph-paper ground (~52%) |
| Rose Gingham | `#f098b5` | `--color-rose-gingham` | Torn gingham strips and ribbon |
| Bubblegum Ink | `#d68491` | `--color-bubblegum-ink` | Doodle hearts, bow, motion ticks |
| Letter Paper | `#f7e3d8` | `--color-letter-paper` | Torn handwritten letter |
| Chrome | `#c9c9c9` (object) | — | Cloche and plate; content |
| Frame Black | `#000000` | — | Device-style rounded frame (presentation only) |

## Tokens — Shapes & Effects
- **Torn edges:** irregular paper tear with a lighter fibrous rim
- **Die-cut halo:** a ~6px white outline around photo cutouts (sticker effect)
- **Doodles:** ~3px monoline strokes in bubblegum ink
- **Motion ticks:** three short strokes radiating from a moving object

## Components

### Reveal Cutout
**Role:** teaser, announcement
A real-object cutout with a white sticker halo and motion ticks, centered on the canvas.

### Torn Paper Layers
**Role:** background texture
Strips of gingham and letter paper torn and layered diagonally across the corners.

### Doodle Set
**Role:** decoration
Hearts, a four-point sparkle, a bow and a looping ribbon line.

## Do's and Don'ts

### Do
- Use the reveal metaphor for "new bake" announcements
- Give cutouts a white sticker halo so they sit on top of patterns cleanly
- Keep doodles in one ink color and one stroke weight

### Don't
- Don't put text over the torn layers; leave a calm center

## For Bakes by Mom
**Adopted:**
- Die-cut sticker halo → `.bbm-sticker-cutout` utility (`filter: drop-shadow` stack in `--bbm-color-bg-raised`)
- Torn paper edge → `<EdgeDivider shape="torn">`
- Hearts, sparkle and ribbon doodles → `<Doodle name="heart">`, `"sparkle"`, `"squiggle"`
- Pink graph paper → `<PatternSurface pattern="grid" tone="strawberry">`
- "Reveal" idea → the **Pages / Social Posts** "New bake drop" template

## Quick Start

```css
:root {
  --color-petal-grid: #fadde1;
  --color-rose-gingham: #f098b5;
  --color-bubblegum-ink: #d68491;
  --color-letter-paper: #f7e3d8;
}

.sticker-cutout {
  filter:
    drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff)
    drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff);
}
```

<details>
<summary>View the reference image</summary>

![Cloche collage cover](<../../pinterest/cover page.jpg>)

</details>
