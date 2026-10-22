# Berloga Coffeeshop — Style Reference
> A bear-café scrapbook: strawberry-milk pink pages, oat-paper panels and cocoa ink outlines that make every card look like a cut-out sticker.

**Source pin:** [`pinterest/Berloga Coffeeshop _ Corporate website _ UX _ UI.jpg`](<../../pinterest/Berloga Coffeeshop _ Corporate website _ UX _ UI.jpg>) · **Original project:** [Behance — Bearloga Coffeeshop](https://www.behance.net/gallery/222348583/Bearloga-Coffeeshop) · **Format:** corporate website, desktop long-scroll (mid-page crop) · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Sizes are estimates scaled to a 1440 px desktop canvas. Roles are interpreted.

Berloga is the closest reference to the Bakes by Mom mood: a cozy, kawaii café language built from only three colors. Strawberry-milk pink fills the outer page and the loyalty band. Oat paper is the reading surface. A single warm cocoa ink draws every outline, rule, label and letter. Nothing is flat-shaded. Every card, label and frame has a thin cocoa outline and a hard, unblurred offset shadow, so the page looks like stickers and paper cut-outs stuck into a journal. Decorative energy comes from shape, not color: cloud-scallop edges, cookie-edged review cards, arch-topped photo frames, planet-orbit photo clusters and a bear mascot drawn in the same line weight as the UI.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Strawberry Milk | `#f5d7d5` | `--color-strawberry-milk` | Outer page background, loyalty band fill, review card fill. The dominant brand surface (~50% of the pin) |
| Oat Paper | `#f8f1de` | `--color-oat-paper` | Main content panel and reading surface; fill of outlined labels and bubble letters |
| Cocoa Ink | `#514135` | `--color-cocoa-ink` | All outlines, rules, body text, the bear mascot and the offset shadow under the bubble letters |
| Mocha | `#7b6c5d` | `--color-mocha` | Filled CTA pill ("FIND THE NEAREST COFFEESHOP"), secondary text and the bubble-letter stroke |
| Latte Taupe | `#b3967c` | `--color-latte-taupe` | Hard offset shadow under scalloped cards and frames, and quiet dividers |
| Cream Star | `#f9f3e0` | `--color-cream-star` | Four-point sparkles and orbit ellipses drawn on the pink page edges |

## Tokens — Typography

### Bubble display — inflated, outlined letters ("GALLERY") · `--font-bubble`
- **Identified as:** a puffy rounded display face with an oat fill, a mocha outline and a solid cocoa offset shadow (3D sticker letters)
- **Substitute:** Bagel Fat One, Chewy, or Fraunces 900 with `SOFT 100` plus `-webkit-text-stroke`
- **Sizes:** ~96–120px, used once per page as a section title
- **Role:** the single loud moment. Everything else is small and quiet

### Rounded hand script — section labels ("special events", "loyalty program", "reviews", "blog") · `--font-hand`
- **Identified as:** a rounded, monoline handwritten script
- **Substitute:** Gaegu, Itim, or Caveat at weight 500
- **Sizes:** ~20–24px inside an outlined pill
- **Role:** turns each section title into a handwritten sticker label

### Body sans — descriptions, accordion copy, review text · `--font-body`
- **Identified as:** neutral humanist sans
- **Substitute:** Open Sans, DM Sans
- **Sizes:** 12–14px, centered, line-height ~1.5
- **Role:** small, quiet and centered. Body copy never competes with the decoration

### Curved headline — "We believe that every sip is a moment of happiness"
- Body sans at ~22px set on a circular `textPath` that hugs the hero photo

### Type Scale (estimated)

| Role | Family | Size | Line Height | Notes |
|------|--------|------|-------------|-------|
| caption | body | 12px | 1.5 | review text, accordion body |
| body | body | 14px | 1.5 | intro paragraphs |
| label | hand script | 22px | 1 | pill section labels |
| curved | body | 22px | — | text on a circle path |
| display | bubble | 110px | 1 | "GALLERY" |

## Tokens — Spacing & Shapes

**Density:** comfortable, with generous vertical rhythm (~96–120px between sections)

### Border Radius

| Element | Value |
|---------|-------|
| section-label pill | 9999px |
| CTA pill | 9999px |
| hero photo | 50% (circle) |
| gallery photo | ~16px |
| gallery slats | 9999px (capsules) |
| blog frames | arch (`9999px 9999px 0 0`) |
| review cards | scalloped edge (cookie cutter) |

### Borders & Lines
- **Outline:** 1.5px cocoa ink on every card, label, frame and photo
- **Hairline rules:** 1px cocoa for accordion rows, and a rule that runs through each section label
- **Offset shadow:** 4px 4px 0 latte taupe (no blur) under scalloped and arched shapes

### Layout
- **Content column:** ~62% of the viewport, centered on a pink page with decorated gutters
- **Section gap:** ~96–120px
- **Element gap:** 16–24px

## Components

### Section Label Pill
**Role:** section title for every block
An oat-filled pill with a 1.5px cocoa outline and the hand script inside. A 1px cocoa rule runs behind it across the full column width, so the pill reads as a tag clipped onto a line.

### Orbit Hero
**Role:** opening brand statement
A large circular interior photo with a 1.5px outline, wrapped in a thin elliptical "orbit" line. Small circular food photos (donuts, cookies, a bear latte) sit on the orbit like planets, and a curved headline arcs over the top. Below it are a centered paragraph and a mocha CTA pill.

### Accordion — Special Events
**Role:** list of recurring offers ("Dessert hour", "Happy days", "Morning coffee")
Rows are separated by 1px cocoa rules. Each row has a small flower-shaped bullet on the left, a caps label in the center and a +/− toggle on the right. The open row shows a centered description with a small cake icon. Rounded-corner food photos frame both sides.

### Cloud-Scallop Band
**Role:** loyalty-program section
A full-width pink band with cloud-scallop edges (large semicircles) on the top and bottom, outlined in cocoa with a latte offset shadow. The bear mascot head pokes over the top edge, flanked by a cup and a stack of books. Inside are a two-step explainer (STEP 1 / STEP 2) with a sparkle divider.

### Slat Gallery
**Role:** photo gallery
A featured photo (~16px radius) in the center, flanked on each side by four narrow capsule "slats" of grayscale photos. A circular pink "DRAG" cursor badge sits on the featured image.

### Scalloped Review Card
**Role:** testimonials
A pink card with a cookie-cutter scalloped outline (1.5px cocoa) and a 4px offset shadow. It holds a caps name, ~12px centered review text and a five-star row. Four cards sit in a row with ← → arrows above.

### Arch Blog Card
**Role:** blog previews
An arch-topped photo frame (fully rounded top, flat bottom) with a 1.5px outline and offset shadow. Three sit in a row.

### Pill CTA
**Role:** primary action
Mocha fill, oat caps text at ~11px with wide tracking, full pill radius and compact padding.

## Patterns & Motifs
- **Four-point sparkles** with crossing orbit ellipses, drawn in cream on the pink gutters
- **Cloud scallops** on band edges, and **cookie scallops** around cards
- **Arch frames** for photography
- **Mascot line art** (bear, cup, books) drawn in the same stroke weight as the UI outlines

## Do's and Don'ts

### Do
- Outline every card, label and photo in the same 1.5px cocoa ink. The consistent stroke is what makes the page feel hand-assembled
- Use hard, blur-free offset shadows (4px 4px 0) in a lighter brown, never gray
- Keep the palette to pink, oat and cocoa. Food photography supplies all the other color
- Make section titles small handwritten labels in pills, and save big type for one moment per page
- Repeat shape motifs (scallop, arch, circle) rather than adding new colors

### Don't
- Don't use soft blurred shadows. They break the paper-sticker illusion
- Don't add saturated accents. Even the CTA is a muted mocha
- Don't set long body copy left-aligned in wide columns. This system is centered and airy
- Don't mix outline weights; keep one stroke weight from icons to cards

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Strawberry Milk | `#f5d7d5` | Page gutters and accent bands |
| 1 | Oat Paper | `#f8f1de` | Reading panel |
| 2 | Strawberry Card | `#f5d7d5` + outline | Cards placed back on the paper panel |

## Elevation
No blurred elevation. Depth is drawn: a 1.5px cocoa outline plus a solid 4px 4px offset in latte taupe (`#b3967c`). Bubble letters use the same trick at 4–6px.

## Imagery
Warm, natural-light café photography: croissants on green marble, latte art, cupcakes, a bright interior counter. The gallery contrasts one color photo with grayscale slats, and the hero orbit uses circular crops. Illustrations are cute line drawings (bear, cup, books) in cocoa ink with no fill.

## Layout
Centered single column on a decorated pink page. The rhythm is: orbit hero → specials accordion with side photos → scalloped loyalty band → giant "GALLERY" word → slat gallery → review row → arch blog row. Each section opens with a pill label on a rule.

## For Bakes by Mom
**Adopted (this is a primary reference):**
- Strawberry + cream + cocoa palette → `--bbm-color-strawberry-200`, `--bbm-color-cream-100`, `--bbm-color-cocoa-900`
- 1.5px cocoa outlines + hard offset shadows → `--bbm-border-width-thin`, `--bbm-shadow-sticker-md`
- Scalloped review cards → `<ReviewCard shape="scallop">`
- Pill section labels on a rule → `<SectionHeading eyebrowStyle="pill">`
- "Special events" accordion → `<Accordion>` (used for daily specials and FAQs)
- Cloud-scallop bands → `<EdgeDivider shape="scallop">`
- Arch photo frames → `<ProductCard imageShape="arch">`
- Four-point sparkles → `<Doodle name="sparkle">`

**Left behind:** the bubble "GALLERY" display face. Bakes by Mom gets the same puffy feel from Fraunces at weight 900 with the `SOFT` axis, and the slat gallery is out of scope for v1.

## Quick Start

```css
:root {
  --color-strawberry-milk: #f5d7d5;
  --color-oat-paper: #f8f1de;
  --color-cocoa-ink: #514135;
  --color-mocha: #7b6c5d;
  --color-latte-taupe: #b3967c;
  --color-cream-star: #f9f3e0;

  --border-outline: 1.5px solid var(--color-cocoa-ink);
  --shadow-sticker: 4px 4px 0 0 var(--color-latte-taupe);
  --radius-pill: 9999px;
  --radius-arch: 9999px 9999px 0 0;
  --radius-photo: 16px;
}
```

<details>
<summary>View the reference image</summary>

![Berloga Coffeeshop website](<../../pinterest/Berloga Coffeeshop _ Corporate website _ UX _ UI.jpg>)

</details>
