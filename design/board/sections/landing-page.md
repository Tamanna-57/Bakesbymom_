# Landing page

**Lead references: [16 · SugarLace](../pins/16-sugarlace-bakery.md) and [13 · Puzzle Pantry](../pins/13-puzzle-pantry.md).** Each section below names the pin or site it's built from.

## Why SugarLace and Puzzle Pantry

SugarLace is the board's closest match to the palette (baby blue, cream, cherry) and to what Bakes by Mom sells: custom cakes, flavours, an order card that explains WhatsApp-style ordering, category tiles. Puzzle Pantry adds the shop structure a home bakery with many kinds of bake needs: a ribbon of what's sold, a row of products with filter pills, a row of categories and a warm split about. A few components come from other bakery sites on Pinterest: the feature icon strip (Sweet Crumbs), the starburst sticker (joe & dough) and the quote on a checker band (Sunday Bakehouse).

**Photos.** The home page uses realistic stock photos (Unsplash, credited in `apps/web/public/stock/CREDITS.md`): a cut slice for each flavour, a photo for each treat type, and pink and cherry cakes for the hero, the about card and the tiles. Photos of the cakes Bakes by Mom sells are kept for the catalog and the gallery section.

## Page order

```
┌──────────────────────────────────────────────┐
│ Announcement bar                        (13) │
│ Nav: links · LOGO · links · icons       (15) │  pink, scalloped bottom
├──────────────────────────────────────────────┤
│ Hero on blue and cream stripes          (16) │  cake photo, starburst, label card
├──────────────────────────────────────────────┤
│ Ribbon + strip of shapes                (13) │  cherry ribbon, pink doodle strip
├──────────────────────────────────────────────┤
│ Feature strip                (Sweet Crumbs)  │  4 icons in circles
├──────────────────────────────────────────────┤
│ About us card                           (16) │  cherry outline, halftone cherries
├──────────────────────────────────────────────┤
│ Flavours                                (16) │  baby blue band, 4×2 cross-sections
├──────────────────────────────────────────────┤
│ Shop by the box                         (13) │  filter pills, lead tile + treats
├──────────────────────────────────────────────┤
│ A cake for every occasion               (13) │  pale blue, curved top
├──────────────────────────────────────────────┤
│ Quote                     (Sunday Bakehouse) │  pink checker
├──────────────────────────────────────────────┤
│ Crafted happiness + how to order        (16) │  stripes, stamp card, cherry tiles
├──────────────────────────────────────────────┤
│ Mom's kitchen                           (13) │  butter panel | wavy stripes + cartouche
├──────────────────────────────────────────────┤
│ GALLERY (the only photos)               (01) │
│ Reviews                                 (01) │
│ FAQ                                     (02) │
├──────────────────────────────────────────────┤
│ Sign-off ribbon                         (13) │  pink
│ Footer                                  (03) │  cocoa
└──────────────────────────────────────────────┘
  ( Ask Mom ) chat launcher, fixed      (10, 08)
```

## Section by section

| # | Section | Built from | Components | Links to |
|---|---|---|---|---|
| 1 | Hero | [16](../pins/16-sugarlace-bakery.md) stripes and pink cake; starburst from joe & dough | `PatternSurface stripes`, a photo in an arched frame, `PriceTag shape="burst"`, heavy + script title | WhatsApp, `/catalog` |
| 2 | Ribbon | [13](../pins/13-puzzle-pantry.md) puzzle-piece ribbon, drawn as doodles | `Marquee`, `Doodle` | — |
| 3 | Feature strip | Sweet Crumbs | `Doodle`, the FSSAI green dot | — |
| 4 | About us | [16](../pins/16-sugarlace-bakery.md) outlined card | `Card outline="brand"`, `SectionHeading variant="stamp"`, `Doodle cherries-halftone`, a tilted photo | `/about` |
| 5 | Flavours | [16](../pins/16-sugarlace-bakery.md) "Fillings" | `SectionHeading variant="ribbon"`, a photo of a cut slice per flavour | WhatsApp, one message per flavour |
| 6 | Shop by the box | [13](../pins/13-puzzle-pantry.md) bestsellers | `FilterChips`, a cherry lead tile, treat tiles | `/catalog`, `/shop/<type>` |
| 7 | Occasions | [13](../pins/13-puzzle-pantry.md) category row | `Doodle` in circles, underlined caps | `/catalog?occasion=<slug>` |
| 8 | Quote | Sunday Bakehouse | `PatternSurface checker` | — |
| 9 | How to order | [16](../pins/16-sugarlace-bakery.md) lockup, order card, tiles | `Ticket variant="stamp"` with tape, cherry tiles with a darker blob | WhatsApp, `/shop/bento-cakes`, `#faq` |
| 10 | Mom's kitchen | [13](../pins/13-puzzle-pantry.md) split about | `PatternSurface stripes-wavy`, `Polaroid frame="cartouche"`, stitched button | `/about` |
| 11 | Gallery | [01](../pins/01-berloga-coffeeshop.md) | `Gallery`, `FilterChips` by occasion | `/catalog/<cake>` |
| 12 | Reviews | [01](../pins/01-berloga-coffeeshop.md) | `ReviewCard` | — |
| 13 | FAQ | [02](../pins/02-pretty-ok-mail-club.md) | `Accordion` | — |
| 14 | Sign-off ribbon | [13](../pins/13-puzzle-pantry.md) | `Marquee` | — |

`How to order` in the nav goes to section 9 (`/#order`).

## Color rhythm

Stripes open and close the middle of the page like SugarLace: blue stripes (hero) → cherry ribbon → canvas → canvas card → **baby blue band** → canvas → pale blue → pink checker → blue stripes → butter → canvas → pink ribbon → cocoa footer. Deep cherry (`cherry-700`) is the accent throughout: the outlines, pills, tiles and ribbons.

## Responsive

- **Desktop (≥900px).** Hero and about card are two columns; flavours 4 up; shop 4 up; tiles 2 × 2 next to the order card.
- **Phone (<600px).** Hero stacks with the cake first; flavours and shop go 2 up; occasions 2 up; the halftone cherries and flourish are hidden so they don't sit on text.

## Built in Storybook

`Pages / Landing page` is the website's home page. Each new section has its own story under `Sections / Home`.
