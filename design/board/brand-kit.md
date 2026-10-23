# Bakes by Mom brand kit

Everything here comes from the 16 pins on the [bakesbymom board](https://in.pinterest.com/nuttychip/bakesbymom/). Each rule links to the pins it's drawn from. The live version, with real components, is the **Brand kit** page in Storybook.

## 1. The idea

**"Mom's recipe notebook, open on the counter of a little pink-and-blue bake shop."**

The board keeps returning to the same feelings:

| Feeling | Seen as | Pins |
|---|---|---|
| Handmade | Doodles, handwriting, tape, stickers, hand-drawn arrows and underlines | [01](./pins/01-berloga-coffeeshop.md), [03](./pins/03-emily-jane-author.md), [07](./pins/07-croissant-lab-landing.md), [11](./pins/11-stevie-kay-showit.md), [15](./pins/15-nectar-candy-cart.md) |
| Nostalgic | Tickets, stamps, seals, polaroids, notebooks, candy stripes | [02](./pins/02-pretty-ok-mail-club.md), [08](./pins/08-digital-wave-taplink.md), [10](./pins/10-book-nook-society.md), [16](./pins/16-sugarlace-bakery.md) |
| Sweet, not sugary | Pastels kept in check by cocoa outlines and cherry accents | [02](./pins/02-pretty-ok-mail-club.md), [05](./pins/05-pretty-ok-studios-shop.md), [16](./pins/16-sugarlace-bakery.md) |
| Personal | A founder section on almost every page, signed in script | [03](./pins/03-emily-jane-author.md), [04](./pins/04-hopf-haus-kitchen.md), [05](./pins/05-pretty-ok-studios-shop.md), [07](./pins/07-croissant-lab-landing.md) |

Three words to check every design against: **warm, handmade, clear.**

## 2. Logo

```
   Bakes by Mom♡          Bakes             ╭ BAKES BY MOM • ╮
                          by Mom♡          •    Bakes     •
   horizontal             stacked          M    by Mom♡    B
                                            ╰ • BAKED WITH LOVE ╯
                                                 seal
```

| Lockup | Construction | Use |
|---|---|---|
| **Horizontal** (primary) | "Bakes" in Fraunces 700 with SOFT 100, then "by Mom" in Pinyon Script, then a small heart; all cherry `#941939` | Nav, documents, packaging |
| **Stacked** | Same pieces, "by Mom" tucked under "Bakes" and overlapping it slightly, the way [10](./pins/10-book-nook-society.md) and [16](./pins/16-sugarlace-bakery.md) set heavy + script | Footer, square spaces, social avatars |
| **Seal** | The stacked logo inside a ring of text "BAKES BY MOM • BAKED WITH LOVE •", like the seals on [10](./pins/10-book-nook-society.md) and [03](./pins/03-emily-jane-author.md) | Box stickers, the chatbot launcher, the favicon at large sizes |
| **Monogram** | "BM" in Fraunces on a cherry circle, like the footer monogram on [12](./pins/12-september-sun-candles.md) | Favicon, tiny avatars |

**Colors.** Cherry on canvas, beige, pink or blue; canvas color on cocoa or cherry. Never on bright cherry with cherry text, or on photos without a solid badge behind it.

**Clear space.** The height of the "B" all round. **Minimum size.** Horizontal 120px wide on screen; stacked 64px.

**Don't** stretch it, outline it, recolor it outside the two options, set "by Mom" in a different script, or drop the heart in the horizontal lockup.

## 3. Color

Full details in [palette.md](./palette.md).

| | Baby Blue | Baby Pink | Beige | Cherry Red | Cocoa Brown |
|---|---|---|---|---|---|
| Hero | `#c4d7e8` | `#f3c5c8` | `#ece3c6` / canvas `#fbf7ef` | `#941939` / bright `#d02b2f` | `#32180b` / caramel `#a56f41` |
| Share | ~13% | ~12% | ~60% | ~5% | ~10% |

Helpers, used sparingly: **Butter** `#f0e1b6` and **Matcha** `#cfc06f`.

## 4. Typography

Five families, each with one job. All are free on Google Fonts.

| Family | Role | From the board | Rules |
|---|---|---|---|
| **Fraunces** (variable, SOFT and WONK axes) | Headlines, prices, the logo | Soft serif display in [02](./pins/02-pretty-ok-mail-club.md), [05](./pins/05-pretty-ok-studios-shop.md), [13](./pins/13-puzzle-pantry.md), [15](./pins/15-nectar-candy-cart.md); the soft black serif in [11](./pins/11-stevie-kay-showit.md) | 600 for headlines, 700 for the logo, SOFT 100 always. Sentence case. |
| **DM Sans** (variable) | Body, UI, labels; 800–900 for the heavy title moment | Clean sans bodies everywhere; the heavy grotesque of [16](./pins/16-sugarlace-bakery.md) | 17px body minimum on web. Labels uppercase with 0.08em tracking. |
| **Pinyon Script** | One accent word in a headline, the "by Mom" in the logo, signatures | Formal script in [16](./pins/16-sugarlace-bakery.md) ("Fillings", "SugarLace Bakery"), [10](./pins/10-book-nook-society.md) | Never more than 3 words, never below 32px. |
| **Caveat** | Handwritten notes, captions, pill labels | Handwriting in [15](./pins/15-nectar-candy-cart.md) ("catch me if you candy!"), [04](./pins/04-hopf-haus-kitchen.md), [13](./pins/13-puzzle-pantry.md), [01](./pins/01-berloga-coffeeshop.md) | 20px minimum. Use it for asides, not for information. |
| **Cherry Bomb One** | One bubble word per page (GALLERY, a marquee) | The bubble title in [01](./pins/01-berloga-coffeeshop.md) and the marquee in [11](./pins/11-stevie-kay-showit.md) | Always outlined with an offset shadow; 64px minimum. |

### Scale

| Style | Font | Size | Use |
|---|---|---|---|
| `display-xl` | Fraunces 600 | 48 → 88px (fluid) | Hero headline |
| `display-lg` | Fraunces 600 | 40 → 64px | Section titles on landing pages |
| `display-md` | Fraunces 600 | 32 → 48px | Section titles |
| `heading-lg` | Fraunces 600 | 32px | Card titles in big cards |
| `heading-md` | Fraunces 600 | 24px | Step and card titles |
| `heading-sm` | DM Sans 700 | 18px | Product names |
| `body-lg` | DM Sans 400 | 20px | Leads |
| `body-md` | DM Sans 400 | 17px | Body |
| `body-sm` | DM Sans 400 | 15px | Ingredients, small print |
| `label` | DM Sans 600 caps | 14px, 0.08em | Nav, eyebrows, ribbons |
| `price` | DM Sans 700 | 16px | Price pills |
| `script-lg` / `script-md` | Pinyon Script | 96 / 56px | Accent words |
| `hand-md` / `hand-sm` | Caveat 600 | 28 / 22px | Notes and captions |
| `bubble` | Cherry Bomb One | 64 → 140px | One word per page |

## 5. Shape language

| Shape | Where | From |
|---|---|---|
| **Pill** | Every button, filter, price, FAQ row, quick question | All pins |
| **Rounded card** (16–24px) | Menu cards, process cards, panels | [02](./pins/02-pretty-ok-mail-club.md), [16](./pins/16-sugarlace-bakery.md) |
| **Scallop** | Section edges, review cards, photo frames, the club card | [01](./pins/01-berloga-coffeeshop.md), [03](./pins/03-emily-jane-author.md), [04](./pins/04-hopf-haus-kitchen.md), [05](./pins/05-pretty-ok-studios-shop.md), [15](./pins/15-nectar-candy-cart.md) |
| **Arch** | Journal cards | [01](./pins/01-berloga-coffeeshop.md) |
| **Oval / circle** | Product teasers, orbit photos, stickers | [01](./pins/01-berloga-coffeeshop.md), [04](./pins/04-hopf-haus-kitchen.md) |
| **Flower / cloud** | Price shapes, avatars, text cards | [07](./pins/07-croissant-lab-landing.md), [15](./pins/15-nectar-candy-cart.md) |
| **Stamp / ticket** | Notes, club perks, the chat's opening card | [08](./pins/08-digital-wave-taplink.md), [10](./pins/10-book-nook-society.md), [16](./pins/16-sugarlace-bakery.md) |

**The sticker rule.** Anything that's an object (a card, a sticker, a frame) gets a 1.5px cocoa outline and, when it should feel lifted, a hard cocoa offset shadow (3–6px, no blur). This is how [01](./pins/01-berloga-coffeeshop.md), [02](./pins/02-pretty-ok-mail-club.md) and [05](./pins/05-pretty-ok-studios-shop.md) hold their pastels together. There are no soft blurry shadows in the system.

**Tilt.** Objects may tilt by up to 3°; text-heavy objects stay within 2°.

## 6. Patterns and edges

| Pattern | Look | From |
|---|---|---|
| `stripes` | Wide equal stripes: blue + canvas, pink + canvas | [07](./pins/07-croissant-lab-landing.md), [16](./pins/16-sugarlace-bakery.md), [02](./pins/02-pretty-ok-mail-club.md) |
| `pinstripe` | Thin pink lines on canvas | [15](./pins/15-nectar-candy-cart.md), [09](./pins/09-sasakhalisa-pastel-stripes.md) |
| `stripes-dotted`, `stripes-wavy` | Stripe variants | [09](./pins/09-sasakhalisa-pastel-stripes.md) |
| `grid` | Graph paper in pink or cherry lines | [15](./pins/15-nectar-candy-cart.md), [08](./pins/08-digital-wave-taplink.md) |
| `dots` | Polka dots | [05](./pins/05-pretty-ok-studios-shop.md) |
| `gingham` | Check for frames | [12](./pins/12-september-sun-candles.md) |

| Edge | From |
|---|---|
| Scallop (with or without outline) | [01](./pins/01-berloga-coffeeshop.md), [03](./pins/03-emily-jane-author.md), [04](./pins/04-hopf-haus-kitchen.md), [15](./pins/15-nectar-candy-cart.md) |
| Wave | [06](./pins/06-lilli-pilli-patisserie.md) |
| Half dots | [02](./pins/02-pretty-ok-mail-club.md), [05](./pins/05-pretty-ok-studios-shop.md) |
| Checker strip | [05](./pins/05-pretty-ok-studios-shop.md), [15](./pins/15-nectar-candy-cart.md) |
| Torn paper | [08](./pins/08-digital-wave-taplink.md) |

**Rule.** Patterns sit behind photos, labels and edges, never behind paragraphs.

## 7. Doodles and illustration

- **Line doodles**: cocoa line (1.75px at 24px), flat palette fills, round caps. The set is cherry, heart, sparkle, star, cupcake, daisy, whisk, bow, squiggle and a loopy arrow. From the candy doodles of [15](./pins/15-nectar-candy-cart.md), the sparkles of [01](./pins/01-berloga-coffeeshop.md) and [11](./pins/11-stevie-kay-showit.md) and the line icons of [06](./pins/06-lilli-pilli-patisserie.md) and [07](./pins/07-croissant-lab-landing.md).
- **Halftone cherries**: the one "big illustration" style, printed-dot cherries in muted cherry, cropped by edges. From [16](./pins/16-sugarlace-bakery.md).
- **Mascot**: the cupcake doodle plays the part Berloga's bear does in [01](./pins/01-berloga-coffeeshop.md), sitting on the Bake Club band's edge.
- Doodles are decoration: always `aria-hidden`, never the only carrier of meaning.

## 8. Photography

| Do | From |
|---|---|
| Warm daylight, cream and wood surfaces, a little mess (crumbs, flour) | [01](./pins/01-berloga-coffeeshop.md), [04](./pins/04-hopf-haus-kitchen.md), [13](./pins/13-puzzle-pantry.md) |
| Cutout products for heroes and stickers | [07](./pins/07-croissant-lab-landing.md), [15](./pins/15-nectar-candy-cart.md), [16](./pins/16-sugarlace-bakery.md) |
| Cross-sections that show what's inside | [16](./pins/16-sugarlace-bakery.md) |
| Mom's hands and Mom herself, smiling, mid-task | [04](./pins/04-hopf-haus-kitchen.md), [05](./pins/05-pretty-ok-studios-shop.md), [06](./pins/06-lilli-pilli-patisserie.md) |
| Frames: scallop, arch, oval, polaroid with tape, patterned border | [01](./pins/01-berloga-coffeeshop.md), [05](./pins/05-pretty-ok-studios-shop.md), [11](./pins/11-stevie-kay-showit.md), [12](./pins/12-september-sun-candles.md) |

Don't: cold white studio backgrounds, heavy filters, text over busy photos without a solid card.

## 9. Voice

Mom talks like Mom: warm, plain, a little funny, never salesy.

| Say | Not |
|---|---|
| "Baked this morning." | "Artisanal, freshly crafted daily." |
| "Order by Wednesday for Saturday." | "Orders subject to availability windows." |
| "Most bakes can be made gluten-free. Just ask." | "Dietary accommodations may be available upon request." |
| "Sold out this week, back next Saturday." | "Out of stock." |
| "with love, Mom" | "Best regards, the Bakes by Mom team" |

The board's copy does the same: Nectar's "Your event called. It wants candy!", Berloga's "Dear our guests!", Emily Jane's "xoxo Emily".

## 10. Applications

| Application | Built from | Where |
|---|---|---|
| Website | The [section specs](./sections/) | Storybook `Pages / Landing page` |
| Link-in-bio page | The taplink layout of [08](./pins/08-digital-wave-taplink.md) | Storybook `Pages / Link in bio` |
| Instagram posts | Grid paper, ribbons, stickers from [15](./pins/15-nectar-candy-cart.md), [07](./pins/07-croissant-lab-landing.md) | Storybook `Pages / Social posts` |
| Box sticker | The seal lockup | Brand kit page |
| Thank-you card | A ticket with a stub, from [10](./pins/10-book-nook-society.md) | Brand kit page |

## 11. Accessibility commitments

- All text pairs meet WCAG AA; the token tests fail the build if one doesn't.
- 44px minimum touch targets; visible focus rings in `blue-700`.
- Motion (marquees, spinning seals, gallery transitions) stops under `prefers-reduced-motion`, and marquees always have a pause button.
- Decoration is hidden from assistive tech; every photo has real alt text.
