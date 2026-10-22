# Digital Wave Taplink — Style Reference
> A link-in-bio scrapbook: claret and powder-blue stripes, torn paper edges, pushpins, a hotel key-tag price and pill rows that stack like recipe tabs.

**Source pin:** [`pinterest/Таплинк для smm-агенства.jpg`](<../../pinterest/Таплинк для smm-агенства.jpg>) · **Title translated:** "Taplink for an SMM agency" (Taplink is a link-in-bio page builder) · **Designer handles on pin:** inst @m.mkshee, tg @guireess · **Format:** mobile link-in-bio page (three long screens) · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Roles are interpreted. Russian copy is translated in place.

This is a link-in-bio mini-site for an SMM course called "Digital Wave". It is very relevant for an Instagram-first home bakery, because most first visits to Bakes by Mom will come from a bio link. It is a vertical scrapbook: a claret-and-cream palette with powder-blue support, torn-paper section edges, a spiral notebook, pushpins, binder clips, postage-stamp cards and a "hotel key tag" price hanging on each pricing card. The interaction model is simple: big full-width claret pill CTAs, numbered module rows and a FAQ of blue pills with circular arrow buttons.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Claret | `#961639` | `--color-claret` | CTAs, module rows, section bands, headings, key tags |
| Cream | `#f8f5e7` | `--color-cream` | Page ground and cards |
| Powder Steel | `#b1c2d2` | `--color-powder-steel` | Stripes, alternating module rows, FAQ pills, secondary buttons |
| Torn Paper | `#e9e3d9` | `--color-torn-paper` | Torn-edge separator strips |
| Charcoal | `#282828` | `--color-charcoal` | Presentation background (not part of the page) |

## Tokens — Typography

### Display serif caps — "DIGITAL — WAVE", "МОДУЛИ" (modules), "ТАРИФЫ" (pricing), "ЧАСТЫЕ ВОПРОСЫ" (FAQ), "КОНТАКТЫ" (contacts)
- **Identified as:** high-contrast display serif, caps, with Cyrillic
- **Substitute:** Playfair Display 600, or Fraunces 600 (Cyrillic supported)
- **Size:** ~28px, claret on cream or cream on claret

### Sans — body, buttons, pills
- **Substitute:** Montserrat, Inter; 12–15px; buttons ~15px semibold

### Pill labels — "продвижение" (promotion), "контент" (content), "курс" (course)
- Small sans in outlined cream pills floating around the hero portrait

## Tokens — Shapes

| Element | Value |
|---------|-------|
| CTA | full-width pill, claret fill, cream semibold text ("присоединиться к курсу" = join the course; "Приобрести" = buy) |
| module rows | full-width rows with a tab-shaped number cell on the left (01–07), alternating claret/powder |
| pricing card | ~20px radius, 1px claret outline, a pill title tab on top ("Старт", "Продвинутый", "Профи" = Start, Advanced, Pro) |
| key tag | hotel key-tag shape with a ring, rotated ~70°, price inside (4.990 ₽, 8.990 ₽, 12.990 ₽) |
| FAQ rows | powder pills with a cream circular arrow button on the right |
| separators | torn-paper strips |
| stamp card | perforated-edge card for start dates ("Даты старта") |

## Components

### Link-in-Bio Hero
**Role:** first screen from Instagram
Striped background, a stamp-edged title card with a key tag, a cutout portrait with floating topic pills, and a full-width claret CTA.

### Numbered Module Rows
**Role:** curriculum (or menu categories)
Seven stacked rows, each with a big number in a notched tab on the left and a short label, alternating claret and powder.

### Pricing Card with Key Tag
**Role:** tiers
An outlined card with a pill title, star bullets, a hanging key-tag price and a full-width claret buy button.

### Pill FAQ
**Role:** questions
Powder-blue pills, each with a question and a circular ↘ button.

### Torn-Paper Divider
**Role:** section edge
A ragged paper strip between sections.

## Do's and Don'ts

### Do
- Design the bio-link page as a real mini-site with clear CTAs and pricing
- Use full-width pill CTAs on mobile
- Number lists of offerings for scannability

### Don't
- Don't rotate price tags so much that the price is hard to read (keep it ≤ 15° when the price matters)
- Don't use more than three scrapbook objects per screen

## For Bakes by Mom
**Adopted (primary reference for the link-in-bio page):**
- Link-in-bio composition → **Pages / Link in Bio** story
- Key-tag price → `<PriceTag shape="tag">`
- Torn-paper divider → `<EdgeDivider shape="torn">`
- Numbered rows → `<StepList variant="numbered">`, used for menu categories or order steps
- Pill FAQ → `<Accordion>` (pill style rows)
- Pricing cards → `<Card outline>` with `<PriceTag>`, used for celebration cake sizes and subscription boxes
- Full-width pill CTA → `<Button fullWidth>`

## Quick Start

```css
:root {
  --color-claret: #961639;
  --color-cream: #f8f5e7;
  --color-powder-steel: #b1c2d2;
  --color-torn-paper: #e9e3d9;

  --radius-pill: 9999px;
  --radius-card: 20px;
}
```

<details>
<summary>View the reference image</summary>

![Digital Wave Taplink](<../../pinterest/Таплинк для smm-агенства.jpg>)

</details>
