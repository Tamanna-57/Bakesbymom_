# SugarLace Bakery — Style Reference
> A custom-cake atelier: powder-blue cabana stripes, raspberry-wine frames and heavy grotesk headlines softened by lace-thin script.

**Source pin:** [`pinterest/Custom Cake Bakery Website Design Playful Charming Pastel Soft branding design.jpg`](<../../pinterest/Custom Cake Bakery Website Design Playful Charming Pastel Soft branding design.jpg>) · **Format:** bakery website, desktop long-scroll · **Theme:** light

> Colors are sampled from the pin (~726 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Sizes are estimates scaled to a 1440 px desktop canvas. Roles are interpreted.

The most directly comparable reference: a custom-cake bakery with an order flow. It mixes two type voices: a chunky, wide grotesk for confident headings and a hairline copperplate script laid over or beside it. The palette is three notes: powder-blue stripes, cream paper and a raspberry-wine accent used for frames, pills and labels. The fillings menu is the standout component, a tidy grid of cream cards with cross-section photos, ingredient lists and a wine price pill. Halftone (stippled) cherry illustrations add a vintage-print texture without adding color.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Powder Blue | `#c7d8e2` | `--color-powder-blue` | Cabana stripes and the fillings section background |
| Cream | `#faf6eb` | `--color-cream` | Page canvas, card surfaces, stripe partner |
| Raspberry Wine | `#822b38` | `--color-raspberry-wine` | Frame border, "Order a cake" pill, price pills, label ribbons, script, category tiles |
| Wine Deep | `#712c33` | `--color-wine-deep` | Price-pill fill (slightly deeper) and pressed state |
| Ink | `#1e1a1b` | `--color-ink` | Grotesk headlines and body copy |
| Frosting Pink | `#e8a9b8` (photo) | — | Cake photography; content only |

## Tokens — Typography

### Wide grotesk display — "About Us", "What sets us apart?", "Crafted happiness, baked with love."
- **Identified as:** heavy, wide neo-grotesk (Druk Wide or Syne ExtraBold feel)
- **Substitute:** Archivo 800 with `wdth 125`, Unbounded 700
- **Size:** ~64px "About Us", ~30px subheads, ~32px tagline

### Hairline copperplate script — "About Us" (overlay), "Fillings", "SugarLace Bakery", "How do I place an order?"
- **Substitute:** Pinyon Script, Italianno
- **Treatment:** overlaps the grotesk at the same size (a lace-over-block contrast) or stands alone at ~90px in wine

### Body — Inter-like neutral sans, 13–15px, line-height 1.4
- Card ingredients 10–11px; bold product names ~12px

## Tokens — Spacing & Shapes

| Element | Value |
|---------|-------|
| about frame | ~24px radius, 6px wine border |
| filling card | ~14px radius, image ~10px radius, no border |
| price pill | full pill, wine fill, cream caps text ~10px |
| arrow chip | ~20px circle outline with ↗ |
| category tile | ~16px radius, wine fill with a darker blob shape |
| stamp card | postage-stamp perforated edge with a wine tape strip |

**Layout:** cards in a 4-column grid with ~16px gaps inside a ~1100px container; section padding ~64px.

## Components

### Framed About Card
**Role:** brand story
A cream panel inside a thick rounded wine frame. It has the overlapping grotesk + script heading, a bold subhead with a two-line tagline, a quote paragraph with a large quotation mark, and a cut-out cake photo on the right. A halftone cherry bleeds off the left edge.

### Filling Card
**Role:** menu item (filling/flavor)
Cream card, cross-section photo on top, bold name, small ingredient list, then a bottom row with an arrow chip and a wine price pill ("68 USD").

### Label Ribbon Heading
**Role:** section title
A thin wine ribbon with repeating caps ("product range • product range") on both sides of a large script word ("Fillings").

### Allergy Note Pill
**Role:** important note
A cream pill under the grid with an asterisk icon: "Each dish can be adapted to accommodate allergies…".

### Postage-Stamp Order Steps
**Role:** "How do I place an order?"
A stamp-shaped card (perforated edges) with a strip of tape, a script heading and bold "Step 1/2/3" lines.

### Category Tile
**Role:** shop by type ("Bento cake")
A wine tile with an organic darker blob, a large bold white label and an arrow chip in the corner.

### Pill Nav CTA
**Role:** "Order a cake"
A wine pill with bold cream text pinned top-right over the striped hero.

## Patterns & Motifs
- **Cabana stripes** (powder and cream, ~70px bands)
- **Halftone cherry** illustrations (stippled dot engraving) in wine
- **Victorian flourish** line ornaments in the corners

## Do's and Don'ts

### Do
- Pair a heavy display with a hairline script for a "lace over cake" contrast
- Show cross-section photos for fillings; they sell the flavor
- Put every price in a consistent pill
- Call out allergy adaptability right next to the menu

### Don't
- Don't use wine for large backgrounds beyond small tiles; it is a frame and label color
- Don't add drop shadows to cards; cream on blue is enough separation

## Surfaces & Elevation
Cream canvas → blue section → cream cards. No shadows. The frame border carries emphasis.

## Imagery
Clean product photography of whole cakes cut out on transparent backgrounds, plus tight cross-section shots of fillings.

## For Bakes by Mom
**Adopted (primary reference for the menu):**
- Filling card → `<ProductCard>` with `description` (ingredients), `price` + `pricePill` and the arrow chip that appears with `href`
- Price pill → `<Badge tone="cherry" variant="solid">` and the `price` text style (`--bbm-text-price-*`)
- Allergy note → `<Badge>` with icon, or a `<Card tone="cream">` note
- Postage-stamp steps → `<Ticket variant="stamp">`
- Frame border → `<Card outline="brand">` using `--bbm-border-width-heavy` and `--bbm-color-border-brand`
- Script + display lockup → `<SectionHeading script>`

**Left behind:** the wide grotesk display. Bakes by Mom uses Fraunces for warmth, though the same heavy-plus-hairline contrast comes from Fraunces 800 paired with Pinyon Script.

## Quick Start

```css
:root {
  --color-powder-blue: #c7d8e2;
  --color-cream: #faf6eb;
  --color-raspberry-wine: #822b38;
  --color-wine-deep: #712c33;
  --color-ink: #1e1a1b;

  --radius-frame: 24px;
  --radius-card: 14px;
  --border-frame: 6px solid var(--color-raspberry-wine);
}
```

<details>
<summary>View the reference image</summary>

![SugarLace Bakery website](<../../pinterest/Custom Cake Bakery Website Design Playful Charming Pastel Soft branding design.jpg>)

</details>
