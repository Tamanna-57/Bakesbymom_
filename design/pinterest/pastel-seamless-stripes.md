# Pastel Seamless Stripes (Sasa Khalisa) — Style Reference
> A ribbon-drawer of stripe swatches: sixteen seamless patterns in strawberry, lilac, sage, olive and berry, with ric-rac and dotted pinstripes.

**Source pin:** [`pinterest/Canva Elements Keyword - Pastel Seamless Stripes by Sasa Khalisa.jpg`](<../../pinterest/Canva Elements Keyword - Pastel Seamless Stripes by Sasa Khalisa.jpg>) · **Format:** Canva element-pack cover (keyword "sasakhalisa stripes") · **Theme:** light

> Colors are sampled from the pin (~733 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Roles are interpreted.

This pin is a pattern vocabulary rather than a layout. It shows sixteen vertical-stripe swatches that combine a few building blocks: wide bands, thin pinstripes, dotted lines and wavy ric-rac lines, over a linen ground. It is useful as the source for Bakes by Mom's stripe system. The header is also instructive: a scalloped bottom edge, a script logo with an outline, arched serif caps, circular rotating badges and a hairline info table that reads like a recipe card.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Linen | `#fef5e6` | `--color-linen` | Header ground and stripe base |
| Blossom | `#f3e5d8` | `--color-blossom` | Light pink-beige stripe ground |
| Petal Pink | `#e8c5c6` | `--color-petal-pink` | Pink stripes |
| Lilac | `#d9cdeb` (approx.) | `--color-lilac` | Lilac stripes |
| Sage | `#c7d8c2` | `--color-sage` | Sage stripes |
| Olive | `#afaf56` | `--color-olive` | Bold olive bands |
| Mulberry | `#a06275` | `--color-mulberry` | Mid berry pinstripes |
| Berry Wine | `#7c393d` | `--color-berry-wine` | Dark wine bands |
| Sky | `#cfe1dc` | `--color-sky` | Sky stripes |
| Walnut Ink | brown (anti-aliased text, approx. `#7a5a3a`) | `--color-walnut-ink` | Header text and table rules |

## Tokens — Typography

### Script logo — "Canva"
- Copperplate-style script filled sage with a walnut outline (two-tone script)
- **Substitute:** Pinyon Script or Great Vibes with `-webkit-text-stroke`

### Serif caps and italics — "PRO ELEMENT KEYWORD", table rows
- **Identified as:** high-contrast transitional serif with italic (Playfair Display or Gilda Display style)
- **Substitute:** Fraunces 500 caps, tracking +0.12em; italics at 400

### Circular badge text — "16 Total Elements", "Recolorable"
- Small serif text on a circle path around a number or icon

## Stripe Anatomy (the useful part)

| Building block | Description | Typical size at 1x |
|----------------|-------------|--------------------|
| Band | solid stripe | 16–32px |
| Pinstripe | 1–2px line inside or between bands | 1.5px |
| Dotted line | a column of 2px dots | 6px pitch |
| Ric-rac | a wavy (sine) line | 6px amplitude, 12px wavelength |
| Double rule | two pinstripes 3px apart | 1.5px each |

Combinations seen: band + pinstripe, band + ric-rac, dotted + band, multicolor pastel pinstripe clusters, and a dark wine band with a pink ric-rac.

## Components

### Recipe-Card Info Table
**Role:** key/value information
Hairline walnut rules with a 2-column header row (KEYWORD | "sasakhalisa stripes"), an italic note row and a split row (seamless | vector).

### Rotating Badge
**Role:** micro-claims around the hero
Circular text around a centered number ("16") or icon (paint roller).

### Scalloped Header Edge
**Role:** transition into the pattern grid
Small, even scallops along the bottom of the header panel with a faint shadow line.

## Do's and Don'ts

### Do
- Build stripes from bands plus details (pinstripe, dots, ric-rac); detail is what makes them look printed and not digital
- Limit each stripe to 2–3 colors from the palette
- Use the scallop edge to move from a calm header into a busy pattern

### Don't
- Don't mix horizontal and vertical stripes in one composition
- Don't put body text directly on busy multi-pinstripe patterns

## For Bakes by Mom
**Adopted:**
- Stripe vocabulary → `<PatternSurface pattern="stripes">` (bands) and `pattern="pinstripe"` (band plus thin line), with stripe sizes from `--bbm-pattern-stripe-*`
- Ric-rac wave line → `<EdgeDivider shape="wave">` at small sizes and the wavy ornament in `<Doodle>`
- Recipe-card info table → nutrition and allergen tables (body, hairline `cream-300` rules)
- Rotating badge → `<Seal>`
- Lilac stripes → the optional `lavender` tone

## Quick Start

```css
:root {
  --color-linen: #fef5e6;
  --color-petal-pink: #e8c5c6;
  --color-sage: #c7d8c2;
  --color-olive: #afaf56;
  --color-berry-wine: #7c393d;

  /* band + pinstripe */
  --pattern-pinstripe: repeating-linear-gradient(
    90deg,
    var(--color-petal-pink) 0 24px,
    var(--color-linen) 24px 30px,
    var(--color-berry-wine) 30px 31.5px,
    var(--color-linen) 31.5px 38px
  );
}
```

<details>
<summary>View the reference image</summary>

![Pastel seamless stripes pack](<../../pinterest/Canva Elements Keyword - Pastel Seamless Stripes by Sasa Khalisa.jpg>)

</details>
