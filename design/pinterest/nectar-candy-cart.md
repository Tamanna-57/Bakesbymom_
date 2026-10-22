# Nectar Candy Cart (ATNN Design) — Style Reference
> A Swedish candy cart on graph paper: merlot ink, cherry-red bands, cotton-candy pink, periwinkle and price tags shaped like flowers.

**Source pin:** [`pinterest/Fun, Modern, Playful Website Design and Layout for Candy Subscription Brand - ATNN Design Studio.jpg`](<../../pinterest/Fun, Modern, Playful Website Design and Layout for Candy Subscription Brand - ATNN Design Studio.jpg>) (the filename contains a non-breaking space after "Layout") · **Credit on pin:** website design by ATNN Design · **Format:** candy cart + subscription website, desktop · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Sizes are estimates scaled to a 1440 px desktop canvas. Roles are interpreted.

Nectar is a mobile candy cart in Pittsburgh with events and a monthly candy club, which is very close to a home-bakery business model (market pop-ups, event catering, subscription boxes). The site is cheerful but organized. Graph-paper backgrounds, a scalloped pink nav, a weekly "where to catch the cart" schedule styled as a spiral notepad, a pink newsletter pill, flower-shaped price tags and a periwinkle subscription section. Merlot is the ink, and cherry red is reserved for one full band.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Merlot | `#801026` | `--color-merlot` | Headlines, logo, frame, dark price tag, primary buttons |
| Cherry Red | `#d02b2f` | `--color-cherry-red` | Full schedule-section band, red buttons ("PLAN YOUR EVENT") |
| Cotton Candy | `#fed0db` | `--color-cotton-candy` | Nav bar, newsletter pill, pink price tag, stripe partner |
| Blush Grid | `#fce5e6` | `--color-blush-grid` | Graph-paper lines and soft panels |
| Cream | `#fdf8f2` | `--color-cream` | Canvas and paper cards |
| Periwinkle | `#c4c6ff` | `--color-periwinkle` | Subscription section, "Join the club" button |
| Peach | `#ffa57f` | `--color-peach` | "$399 cart fee" flower tag |

## Tokens — Typography

### Retro light serif — "The Swedish Candy Cart of Your Dreams", "Your event called. It wants candy!", "Join the Nectar Candy Club"
- **Identified as:** soft, slightly quirky high-contrast serif at a light weight
- **Substitute:** Fraunces 300 with `SOFT 50`, or Instrument Serif
- **Size:** ~56px hero, ~48px section, color merlot

### Logo — "nectar"
- Heavy rounded lowercase serif (Recoleta Black / Cooper style)
- **Substitute:** Fraunces 900 with `SOFT 100`

### Handwritten notes — "catch me if you candy!", "designed to delight!"
- **Substitute:** Caveat, Nanum Pen Script

### Micro caps sans — nav, eyebrows ("(BASED IN PITTSBURGH, PA)", "WEDDINGS · BIRTHDAYS · POP-UPS & MORE"), buttons
- **Substitute:** DM Sans 600, 10–11px, tracking +0.1em

## Tokens — Spacing & Shapes

| Element | Value |
|---------|-------|
| nav | pink bar with a scalloped bottom edge |
| buttons | ~4px radius small rectangles (periwinkle, merlot, red) |
| schedule card | cream card, top edge with a row of punched circles |
| schedule cells | 1px merlot outline grid; selected day merlot-filled |
| price tags | scalloped flower ($399, $8) and cloud ($99) shapes ~110px |
| newsletter | full pill with an inline input and merlot button |
| subscription panel | cream panel with a cloud-scalloped outline |

## Components

### Weekly Cart Schedule
**Role:** where to find the cart this week
A notepad card with punched holes on top, the eyebrow "WHERE TO CATCH THE CART", a serif title "THIS WEEK", then a 7-column table of days. Each cell holds a date, a candy icon, a linked vendor name and a time range. One cell is circled by a hand-drawn periwinkle loop.

### Newsletter Pill
**Role:** email capture
A wide pink pill with caps copy ("PSST! GET THE SCHEDULE IN YOUR INBOX EVERY WEEK!"), an outlined input and a merlot "SIGN UP" button.

### Flower Price Tags
**Role:** event pricing
Three shapes in a row (peach flower "$399 CART FEE (3HRS)", merlot flower "$8 PER GUEST", pink cloud "$99 PER ADDED HR") with a big serif price and micro caps label.

### Collage Photo
**Role:** event showcase
A photo with tape strips, a circular "designed to delight!" sticker, a peach logo sticker, and a hang tag on a ribbon ("Candy Curated By: Your Tastebuds"), all on a pink-stripe background.

### Checker Divider
**Role:** section transition
A strip of merlot and pink checks.

## Patterns & Motifs
- **Graph paper** (pink lines on cream) behind the hero
- **Pinstripes** (pink on cream) behind the event collage
- **Checkerboard** strips
- **Candy doodles** (gummy bears, cherries, peppermints) scattered as stickers
- **Hand-drawn arrows and circles**

## Do's and Don'ts

### Do
- Show the real-world schedule. A pop-up business lives by "where are you this week?"
- Express prices as playful shapes when they're event packages
- Keep the ink one color (merlot) across serif, logo and outlines

### Don't
- Don't make the schedule a plain table; the notepad framing is what makes it on-brand
- Don't rely on the hand-drawn circle as the only "selected" indicator; also fill the cell

## Surfaces & Elevation
Graph-paper cream → red band → cream cards → periwinkle section. Flat, with sticker layering instead of shadows.

## For Bakes by Mom
**Adopted (primary reference for events and pricing):**
- Flower price tags → `<PriceTag shape="flower">` and `shape="cloud"`
- Graph paper → `<PatternSurface pattern="grid">`
- Weekly schedule → the "Find us this week" market-schedule section in **Pages / Home** (built with `<Card>` + `<Badge>`)
- Newsletter pill → the `<TextField>` + `<Button>` inline composition in `<SiteFooter>`
- Scalloped nav edge → `<EdgeDivider shape="scallop">` under `<SiteHeader>`
- Checker strip → `<PatternSurface pattern="checker">`
- Periwinkle subscription section → the `lavender` tone

## Quick Start

```css
:root {
  --color-merlot: #801026;
  --color-cherry-red: #d02b2f;
  --color-cotton-candy: #fed0db;
  --color-blush-grid: #fce5e6;
  --color-cream: #fdf8f2;
  --color-periwinkle: #c4c6ff;
  --color-peach: #ffa57f;

  --pattern-graph:
    linear-gradient(var(--color-blush-grid) 1px, transparent 1px) 0 0 / 20px 20px,
    linear-gradient(90deg, var(--color-blush-grid) 1px, transparent 1px) 0 0 / 20px 20px,
    var(--color-cream);
}
```

<details>
<summary>View the reference image</summary>

![Nectar candy cart website](<../../pinterest/Fun, Modern, Playful Website Design and Layout for Candy Subscription Brand - ATNN Design Studio.jpg>)

</details>
