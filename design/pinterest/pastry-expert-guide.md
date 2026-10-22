# Pastry Expert's Guide (Анна Тимофеева) — Style Reference
> A cherry-jam cookbook in ballet pink: editorial serif with a script second line, cream pages, glossy red food photography and engraved cake line-art.

**Source pin:** [`pinterest/Дизайн гайда_презентации для эксперта-кондитера_ Digital Product Design | Aesthetic Presentation.jpg`](<../../pinterest/Дизайн гайда_презентации для эксперта-кондитера_ Digital Product Design | Aesthetic Presentation.jpg>) · **Title translated:** "Design of a guide/presentation for a pastry-chef expert" · **Designer handle on pin:** TG/INST annatimopheeva · **Format:** digital guide (PDF pages + mobile layout) · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Roles are interpreted. Russian copy is translated in place.

A portfolio piece showing a paid **home-baking guide**. The cover reads "Практический гайд по домашнему кондитерству", "A practical guide to home pastry-making", which is exactly the kind of digital product Bakes by Mom could sell. Pages sit on cream paper inside a ballet-pink presentation. Headings use a serif first line and a script second line ("Основные принципы / *выпечки*" = "Basic principles of *baking*"), always in cherry. Content follows an editorial grid of saturated red food photos, short two-column tips, small red "ВАЖНО" (IMPORTANT) labels, ornamental vine dividers and pink engraved cake illustrations.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Ballet Pink | `#f6b8c3` | `--color-ballet-pink` | Presentation background, pink accents |
| Page Cream | `#fff1e1` | `--color-page-cream` | Guide pages |
| Cherry Jam | `#961e27` | `--color-cherry-jam` | Headings, script, sub-heads |
| Oxblood | `#490f11` | `--color-oxblood` | Deep shadows in photography, darkest text |
| Signal Red | `#b30606` | `--color-signal-red` | "IMPORTANT" label fill |
| Rose Line | `#e3a5a5` (approx.) | `--color-rose-line` | Engraved cake illustrations and vine ornaments |
| Cocoa Text | `#8d5d59` | `--color-cocoa-text` | Body copy and captions |

## Tokens — Typography

### Editorial serif — first line of headings ("Основные принципы", "Стабильность", "Баланс вкуса")
- **Identified as:** high-contrast transitional serif with Cyrillic
- **Substitute:** Playfair Display, Cormorant Garamond, or Fraunces 400 (has Cyrillic)
- **Size:** ~32px page headings, ~16px sub-heads, cherry

### Script — second line of headings ("выпечки" = baking, "десерта" = dessert)
- **Substitute:** Great Vibes / Pinyon Script (Latin only; for Cyrillic use Marck Script or Bad Script)

### Body serif — tips and paragraphs, ~11px, cocoa text

### Eyebrow — "(+) рекомендации" ("(+) recommendations"), light sans in pink with parentheses

## Tokens — Shapes
- **Photos:** 0 radius, tight crops
- **Label:** solid red rectangle, cream micro caps ("ВАЖНО" = IMPORTANT)
- **Ornament:** hairline vine with leaves, centered between sections
- **Illustrations:** single-line engraved cakes, pies and rolling pins in rose line

## Components

### Serif + Script Heading Lockup
**Role:** chapter or page title
Two lines: a serif first line, then a script word slightly indented and larger.

### Tip Columns
**Role:** short guidance ("Flavor balance", "Temperature and time")
Two columns, each with a bold serif sub-head and 3–4 lines of body. A red "IMPORTANT" label marks the critical one.

### Photo Mosaic with Captions
**Role:** visual reference ("Варианты подачи" = serving options, "Разрез торта" = cake cross-section, "Подача" = serving)
An asymmetric grid of 3–4 photos with small captions.

### Mobile List Rows
**Role:** guide table of contents on a phone (sponge dough, nut base, shortcrust, choux pastry)
Rows with a serif title, one line of description and a square photo on the right, separated by hairlines.

## Do's and Don'ts

### Do
- Treat recipes and tips as editorial pages: big headings, short tips, plenty of photos
- Use one red label for "important" and nothing else
- Draw decorative cakes as line engravings in a soft tint

### Don't
- Don't fill pages edge to edge; cream margins create the cookbook feel
- Don't use the script for anything but the second line of a heading

## For Bakes by Mom
**Adopted:**
- Serif + script lockup → `<SectionHeading script>` (Fraunces + Pinyon Script)
- "IMPORTANT" label → `<Badge tone="cherry" variant="solid" shape="tape">`
- Vine ornament divider → `<Doodle name="squiggle">` between hairline rules
- Engraved cake line-art style → `<Doodle name="cupcake">` (simplified, single stroke)
- Mobile list rows → `<ProductCard layout="row">` for compact menu lists
- Digital guide as a product idea → noted in the [synthesis](./README.md#product-ideas-spotted-in-the-references)

## Quick Start

```css
:root {
  --color-ballet-pink: #f6b8c3;
  --color-page-cream: #fff1e1;
  --color-cherry-jam: #961e27;
  --color-oxblood: #490f11;
  --color-signal-red: #b30606;
  --color-cocoa-text: #8d5d59;
}
```

<details>
<summary>View the reference image</summary>

![Pastry expert guide](<../../pinterest/Дизайн гайда_презентации для эксперта-кондитера_ Digital Product Design | Aesthetic Presentation.jpg>)

</details>
