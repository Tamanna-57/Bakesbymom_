# Emily Jane (Romance Author) — Style Reference
> A small-town love story in a ditsy-floral dress: denim-blue scallops, butter-yellow florals, blush paper and a signature in rosy cocoa script.

**Source pin:** [`pinterest/Romance Author Website Inspiration.jpg`](<../../pinterest/Romance Author Website Inspiration.jpg>) · **Format:** author website, desktop (two scroll columns shown side by side) · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Sizes are estimates scaled to a 1440 px desktop canvas. Roles are interpreted.

A cozy romance author's site that is gentle, feminine and very readable. The structure alternates bands: blush paper, a denim-blue band with scalloped edges, a butter band covered in tiny ditsy flowers, a pink quote card and butter cabana stripes. A rosy-cocoa brown carries buttons, script and the footer. The two most transferable pieces for a family bakery are the **pill nav bar** (the whole nav sits inside a rounded outlined capsule) and the **"Meet Emily" card**, which combines overlapping photos, a short bio, a button and a handwritten signature.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Blush White | `#f7f1f3` | `--color-blush-white` | Page canvas |
| Denim | `#a0b6cd` | `--color-denim` | Featured-book band (scalloped) and the "Meet Emily" card |
| Butter | `#f0e1b6` | `--color-butter` | Floral newsletter band, nav pill fill, stripe partner |
| Cocoa Rose | `#976858` | `--color-cocoa-rose` | Buttons, script headings, footer, inline accent word |
| Cream | `#f9f6ed` | `--color-cream` | Cards and inputs |
| Pink Quote | `#fcedf2` | `--color-pink-quote` | Quote card fill |

## Tokens — Typography

### Modern serif — "A little romance. A lot of heart.", "Feel like some exclusive content?", "Meet Emily"
- **Substitute:** Fraunces 400, or Lora
- **Accent:** single words recolored cocoa rose ("romance") or underlined with a hand-drawn squiggle ("never")
- **Size:** ~36px hero, ~24px section

### Brush script — "Robin Hill Series", "Emily" (signature)
- **Substitute:** Sacramento, Mrs Saint Delafield
- **Color:** cocoa rose, ~36px

### Logo — "EMILY JANE" in playful condensed caps with a small heart
### Body — clean sans 13–14px; marquee micro caps

## Tokens — Spacing & Shapes

| Element | Value |
|---------|-------|
| nav | a single full-width pill (radius 9999px), butter fill, 1px cocoa outline |
| buttons | ~4px radius, cocoa fill, cream text ("Start Reading", "Join The Newsletter →") |
| secondary button | white fill, 1px outline ("Pre-Order Now →") |
| scallops | large, ~40px semicircles on band edges |
| newsletter card | ~16px radius, cream, centered on florals |
| quote card | ~12px radius, pink |
| meet card | ~16px radius, denim fill, offset overlapping photos |

## Components

### Pill Nav Bar
**Role:** global navigation
The logo on the left and links on the right, all inside one outlined capsule that floats on the canvas.

### Inline Accent Headline
**Role:** hero promise
A centered serif headline where one word is recolored and one is underlined with a squiggle, followed by a short tagline and a cocoa button.

### Scalloped Feature Band
**Role:** featured product
A denim band with scalloped top and bottom edges. A book mockup sits on the left; title, release date, blurb and a white button sit on the right.

### Floral Newsletter Card
**Role:** email capture
A cream rounded card centered on a ditsy floral pattern, with inline name and email inputs and a cocoa button.

### Meet the Author Card
**Role:** personal story
A denim card on butter stripes with two overlapping photos (one rotated), a serif title, a short bio, a white button and a signature in script.

## Patterns & Motifs
- **Ditsy floral** (tiny five-petal flowers scattered on butter)
- **Scalloped band edges**
- **Butter cabana stripes**
- **Small sparkles and hearts** as accents

## Do's and Don'ts

### Do
- Sign the "about" section by hand; a script signature makes a personal brand feel real
- Wrap the whole nav in a capsule for a soft, friendly header
- Use squiggle underlines for one emphasized word

### Don't
- Don't use cocoa rose for large backgrounds except the footer
- Don't use more than one recolored word per headline

## Surfaces & Elevation
Blush canvas → denim and butter bands → cream cards. No shadows.

## Imagery
Book-cover mockups, soft natural-light portraits and warm candid photos.

## For Bakes by Mom
**Adopted (primary reference for "Meet Mom"):**
- Signature in script → `<Logo>` uses Pinyon Script for "by Mom"; the "Meet Mom" card ends with a script signature
- Pill nav bar → `<SiteHeader variant="capsule">`
- Squiggle underline → `.bbm-squiggle` utility (SVG underline) used in `<Hero>` titles
- Scalloped band edges → `<EdgeDivider shape="scallop">`
- Ditsy florals → `<PatternSurface pattern="dots">` with `<Doodle name="daisy">` accents (a full floral pattern is out of scope for v1)
- Newsletter card on pattern → `<SiteFooter>` newsletter block

## Quick Start

```css
:root {
  --color-blush-white: #f7f1f3;
  --color-denim: #a0b6cd;
  --color-butter: #f0e1b6;
  --color-cocoa-rose: #976858;
  --color-cream: #f9f6ed;
  --color-pink-quote: #fcedf2;

  --radius-nav: 9999px;
  --radius-card: 16px;
}
```

<details>
<summary>View the reference image</summary>

![Emily Jane romance author website](<../../pinterest/Romance Author Website Inspiration.jpg>)

</details>
