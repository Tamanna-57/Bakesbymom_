# Marquee ribbons

**Pick: [02 · Pretty OK Studios](../pins/02-pretty-ok-mail-club.md), the double ribbon** (blue over cocoa).

**Also on the board.**
- **Tilted ribbon:** [07 · Croissant Lab](../pins/07-croissant-lab-landing.md)
- **Icon separators:** [06 · Lilli Pilli](../pins/06-lilli-pilli-patisserie.md)
- **Bubble ribbon:** [11 · Stevie Kay](../pins/11-stevie-kay-showit.md)
- **Center badge:** [04 · Hopf Haus](../pins/04-hopf-haus-kitchen.md)
- **Single thin ribbons:** [03](../pins/03-emily-jane-author.md), [05](../pins/05-pretty-ok-studios-shop.md), [10](../pins/10-book-nook-society.md), [12](../pins/12-september-sun-candles.md) and [13](../pins/13-puzzle-pantry.md)

## Why

Ribbons are the most common device on the board: 11 of the 15 designs have at least one. The double ribbon from [02](../pins/02-pretty-ok-mail-club.md) is the most "made" version and uses two palette colors at once, so it works as the strong divider under the hero. Thin single ribbons work between quieter sections.

## Variants

| Variant | From | Look | Use on the landing page |
|---|---|---|---|
| `double` | [02](../pins/02-pretty-ok-mail-club.md) | Two rows, blue (cocoa text) over cocoa (cream text), moving in opposite directions | Under the hero |
| `single` | [03](../pins/03-emily-jane-author.md), [05](../pins/05-pretty-ok-studios-shop.md) | One thin row, 40px | Above the footer |
| `tilt` | [07](../pins/07-croissant-lab-landing.md) | One row rotated −3°, crossing a section edge | Into the Bake Club band |
| `bubble` | [11](../pins/11-stevie-kay-showit.md) | Large bubble-font words, pink on cocoa, no band | Top of the gallery trio (alternate) |
| `badge` | [04](../pins/04-hopf-haus-kitchen.md) | A single row with a round badge in the middle holding a doodle | Above "How to order" (alternate) |

## Content

- Short claims or category words, 2–5 words each: "Baked this morning", "Made in Mom's kitchen", "Real butter, real eggs", "Order by Wednesday".
- Separators are doodles (heart, star, sparkle, cherry), as in [02](../pins/02-pretty-ok-mail-club.md) and [06](../pins/06-lilli-pilli-patisserie.md).

## Spec

| Part | Spec | Tokens |
|---|---|---|
| Height | 44px (single), 2 × 40px (double) | `space` |
| Type | DM Sans 600, 15px; uppercase for category words, sentence case for claims | — |
| Speed | 40s per loop at desktop; slower on phones | `motion.duration.marquee` |
| Colors | Blue `blue-200` + cocoa text; cocoa `brown-900` + canvas text; pink `pink-300` + cherry text | tone tokens |

## Accessibility

- The visual track is `aria-hidden`; the items are also rendered once as a visually hidden list.
- A visible pause button sits at the right end of each marquee (WCAG 2.2.2).
- Under `prefers-reduced-motion` the ribbon is static and shows the first items.

## Component

`Marquee rows={1 | 2} tilt badge separator`. See Storybook `Components / Marquee`.
