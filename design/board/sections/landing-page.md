# Landing page

**Lead reference: [15 · Nectar](../pins/15-nectar-candy-cart.md).** Each section below names the pin it's built from.

## Why Nectar

Nectar is the board's closest match to Bakes by Mom: a small family food business that sells online, turns up at real places on real days, takes party orders and runs a monthly club. Its page answers a customer's questions in the order they ask them, and it's already cherry, baby pink and cream. The other pins fill the gaps Nectar doesn't cover (menu, process, about, gallery, reviews, FAQ, footer) with the best version of each on the board.

## Page order

```
┌──────────────────────────────────────────────┐
│ Announcement bar                        (13) │
│ Nav: links · LOGO · links · order box   (15) │  pink, scalloped bottom
├──────────────────────────────────────────────┤
│ Hero on grid paper                      (15) │  headline + cutout cake
│   ✦ ✦ ✦ doodles across the seam         (11) │
├──────────────────────────────────────────────┤
│ Double ribbon                           (02) │  blue + cocoa
├──────────────────────────────────────────────┤
│ This week's menu                        (16) │  baby blue band, 4×2 cards
│   filter pills                          (13) │
├──────────────────────────────────────────────┤
│ How to order                            (02) │  tilted cards on stripes
├──────────────────────────────────────────────┤
│ Where to find Mom this week             (15) │  bright cherry band
│   newsletter bar                        (15) │
├──────────────────────────────────────────────┤
│ Custom cakes + prices                   (15) │  price shapes, taped photo
├──────────────────────────────────────────────┤
│ Meet Mom                                (05) │  scallop frame + tilted note
├──────────────────────────────────────────────┤
│ GALLERY                                 (01) │  bubble title, strips
├──────────────────────────────────────────────┤
│ Reviews                                 (01) │  scalloped cards
├──────────────────────────────────────────────┤
│ Bake Club                               (01) │  pink scalloped band + ticket (10)
├──────────────────────────────────────────────┤
│ FAQ                                     (02) │  two columns of cards
├──────────────────────────────────────────────┤
│ Newsletter card                         (03) │  on a dotted band
├──────────────────────────────────────────────┤
│ Footer                                  (03) │  cocoa, 3 columns
└──────────────────────────────────────────────┘
  ( Ask Mom ) chat launcher, fixed      (10, 08)
```

## Section by section

| # | Section | Built from | Ground | Spec |
|---|---|---|---|---|
| 1 | Announcement + nav | [13](../pins/13-puzzle-pantry.md), [15](../pins/15-nectar-candy-cart.md) | Cocoa bar, then pink | [navbar.md](./navbar.md) |
| 2 | Hero | [15](../pins/15-nectar-candy-cart.md), [11](../pins/11-stevie-kay-showit.md) | Grid paper on canvas | [hero.md](./hero.md) |
| 3 | Ribbon | [02](../pins/02-pretty-ok-mail-club.md) | Blue + cocoa | [marquee.md](./marquee.md) |
| 4 | Menu | [16](../pins/16-sugarlace-bakery.md), [13](../pins/13-puzzle-pantry.md) | Baby blue | [menu.md](./menu.md) |
| 5 | How to order | [02](../pins/02-pretty-ok-mail-club.md) | Pink and beige stripes | [process.md](./process.md) |
| 6 | Find us this week | [15](../pins/15-nectar-candy-cart.md) | Bright cherry | [find-us.md](./find-us.md) |
| 7 | Custom cakes | [15](../pins/15-nectar-candy-cart.md), [08](../pins/08-digital-wave-taplink.md) | Canvas + pink pinstripe | [custom-cakes.md](./custom-cakes.md) |
| 8 | Meet Mom | [05](../pins/05-pretty-ok-studios-shop.md) | Canvas | [about.md](./about.md) |
| 9 | Gallery | [01](../pins/01-berloga-coffeeshop.md) | Canvas | [gallery.md](./gallery.md) |
| 10 | Reviews | [01](../pins/01-berloga-coffeeshop.md) | Canvas | [reviews.md](./reviews.md) |
| 11 | Bake Club | [01](../pins/01-berloga-coffeeshop.md), [10](../pins/10-book-nook-society.md) | Pink, scalloped | [bake-club.md](./bake-club.md) |
| 12 | FAQ | [02](../pins/02-pretty-ok-mail-club.md) | Canvas | [faq.md](./faq.md) |
| 13 | Newsletter | [03](../pins/03-emily-jane-author.md) | Butter dots | [newsletter.md](./newsletter.md) |
| 14 | Footer | [03](../pins/03-emily-jane-author.md) | Cocoa | [footer.md](./footer.md) |
| — | Chatbot | [08](../pins/08-digital-wave-taplink.md), [10](../pins/10-book-nook-society.md), [01](../pins/01-berloga-coffeeshop.md) | Floating | [chatbot.md](./chatbot.md) |

## Color rhythm

The grounds alternate so no two loud bands touch: canvas → blue → stripes → **cherry** → canvas → canvas → canvas → pink → canvas → butter → cocoa. Bright cherry appears once (the schedule band), cocoa twice (ribbon and footer), as the [palette](../palette.md) asks.

## Edges between sections

| Between | Edge |
|---|---|
| Nav → hero | Scallops (pink) |
| Menu band → process | Half dots (cocoa on blue), from [02](../pins/02-pretty-ok-mail-club.md) |
| Schedule band → custom cakes | Straight |
| Custom cakes → Meet Mom | Checker strip (cherry and pink), from [15](../pins/15-nectar-candy-cart.md) |
| Canvas → Bake Club and back | Scallops with outline, from [01](../pins/01-berloga-coffeeshop.md) |
| Newsletter → footer | Wave, from [06](../pins/06-lilli-pilli-patisserie.md) |

## Responsive

- **Desktop (≥1024px).** As drawn. Content width 1200px, 32px gutters.
- **Tablet (640–1023px).** Menu 2 up, schedule 4 + 3, Meet Mom stacks with the photo first, FAQ goes to one column.
- **Phone (<640px).** Nav becomes the capsule with a menu button; hero photo moves under the text; schedule becomes a vertical list of days; the gallery becomes a swipe row.

## Built in Storybook

`Pages / Landing page` assembles this exact order from the library components. Each section also has its own story under `Sections /`.
