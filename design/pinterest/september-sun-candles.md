# September Sun Candle Co. — Style Reference
> A small-batch maker's market stall: blush pages, olive-green "kind words", and every photo framed in a different vintage tile print.

**Source pin:** [`pinterest/Home Fragrance Candle Website Design Warm Soft Coated Aesthetic branding design.jpg`](<../../pinterest/Home Fragrance Candle Website Design Warm Soft Coated Aesthetic branding design.jpg>) · **Format:** Shopify homepage, desktop long-scroll · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Sizes are estimates scaled to a 1440 px desktop canvas. Roles are interpreted.

A hand-poured candle brand's homepage. Its section list is almost a template for any small-batch maker: collections, founder story, best sellers, "catch us at local markets", a pour-bar booking, testimonials, stockists ("find us near you"), wholesale, Instagram and footer. The visual idea is **patterned frames**: each photo sits inside its own vintage tile, gingham or floral print, all drawn from one blush–rose–olive–mustard palette so the variety still feels unified. Typography is calm (tracked serif caps on blush), and the olive buttons are the only dark accent.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Blush Page | `#ffedef` | `--color-blush-page` | Page canvas (~59% of the pin) |
| Petal | `#f4ced2` | `--color-petal` | Section panels, stripe partner, footer |
| Rosewood | `#d79596` | `--color-rosewood` | Founder section background, cabana stripes, floral pattern |
| Olive Sprig | `#b8b082` | `--color-olive-sprig` | "Kind words" testimonial band |
| Olive Button | `#89785a` | `--color-olive-button` | Pill buttons ("READ HER FULL STORY", "SEE UPCOMING EVENTS") |
| Mustard Tile | `#a88964` | `--color-mustard-tile` | Grid and tile frame patterns |
| Bark | `#563e2c` | `--color-bark` | Body text and headings |
| Linen | `#f8e6d8` | `--color-linen` | Market and wholesale panels |

## Tokens — Typography

### Tracked serif caps — "EXPLORE THE COLLECTIONS", "THE HEART BEHIND SEPTEMBER SUN", "FIND SEPTEMBER SUN NEAR YOU"
- **Identified as:** classic transitional serif in caps with +0.06em tracking
- **Substitute:** Fraunces 500 caps, or Gloock
- **Size:** ~28px section titles

### Badge lettering — "the pour bar by SEPTEMBER SUN"
- Retro western/circus badge lettering in mustard and cream with an outline, used as a logo lockup
- **Substitute:** Fraunces 900 `SOFT 100` with a stroke

### Body — small sans, 11–13px, bark brown, line-height 1.6

## Tokens — Spacing & Shapes

| Element | Value |
|---------|-------|
| buttons | pill, olive fill, cream micro caps |
| photo frames | 0 radius photo inside a ~12px patterned border |
| product cards | 0 radius, product on a wooden pedestal, light gray backdrop |
| wholesale card | ~12px radius pink panel centered on a floral pattern |
| marquee ribbon | thin, rosewood text on blush |

## Components

### Patterned Collection Frames
**Role:** three collections ("The Roots", "The Harvest", "The Solstice")
Each photo has a different tile-print border (pink diamonds, olive geometric, blue floral), with a caps title and a one-line description below.

### Founder Split
**Role:** "The heart behind…"
A rosewood panel. On the left, a framed photo with a bow sticker and a candle sticker overlapping the frame. On the right, a serif caps title, paragraph and olive pill.

### Market Events Split
**Role:** "Catch us at local markets & events"
Text on linen, and a photo of the market stall inside an olive geometric tile frame.

### Pour-Bar Banner
**Role:** experience booking
Pink cabana stripes with scattered sticker illustrations (scissors, candle, boot, matchbox) around a badge logo and a "BOOK NOW" pill.

### Kind Words Band
**Role:** testimonials
An olive band with three columns of stars, a name and quote in cream.

### Stockist List
**Role:** "Find September Sun near you"
A mustard grid-framed photo, plus a list of shops with underlined names and towns.

### Wholesale CTA
**Role:** B2B lead
A centered pink rounded card on an all-over floral starburst pattern.

## Do's and Don'ts

### Do
- Frame photos with prints, and vary the print per photo within one palette
- Give testimonials their own colored band
- List real-world places (markets, stockists); small makers sell offline too

### Don't
- Don't put patterns behind text-heavy areas; patterns are for frames and banners
- Don't use more than one dark accent (olive) for buttons

## Surfaces & Elevation
Blush → petal → rosewood → olive bands. Flat. Stickers overlap frames without shadows.

## Imagery
Warm, homey product shots (candles in jars, on wooden pedestals), market-stall photos and a friendly founder portrait.

## For Bakes by Mom
**Adopted (primary reference for page structure):**
- Section sequence (collections → founder → best sellers → markets → testimonials → stockists → wholesale) → the **Pages / Home** story
- Patterned photo frames → `<Polaroid frame="pattern">` using `<PatternSurface>` patterns
- Testimonial band → `<ReviewCard>` row in **Pages / Home**, mixing pastel tones
- Stockists and markets → the "Find us this week" schedule
- Wholesale and custom-order CTA card on pattern → `<Card>` on `<PatternSurface>`

**Left behind:** the olive-brown button color. Bakes by Mom keeps cherry as the single primary action color.

## Quick Start

```css
:root {
  --color-blush-page: #ffedef;
  --color-petal: #f4ced2;
  --color-rosewood: #d79596;
  --color-olive-sprig: #b8b082;
  --color-olive-button: #89785a;
  --color-mustard-tile: #a88964;
  --color-bark: #563e2c;
  --color-linen: #f8e6d8;

  --frame-pattern-width: 12px;
}
```

<details>
<summary>View the reference image</summary>

![September Sun candle website](<../../pinterest/Home Fragrance Candle Website Design Warm Soft Coated Aesthetic branding design.jpg>)

</details>
