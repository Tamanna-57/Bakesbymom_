# The bakesbymom board

The Bakes by Mom design system is built from one source: the 16 pins on the [nuttychip / bakesbymom](https://in.pinterest.com/nuttychip/bakesbymom/) Pinterest board. The images are saved in [`pinterest/board/`](../../pinterest/board).

The work happened in four steps, and this folder holds each one:

| Step | What | Where |
|---|---|---|
| 1 | **Palette**, measured from the pins: baby blue, baby pink, beige, cherry red and cocoa brown, plus butter and matcha helpers | [palette.md](./palette.md) |
| 2 | **Every pin analysed**: layout, sections top to bottom, components, colors, type, what to take and leave | [pins/](./pins) |
| 3 | **The best reference for each website section**, with a wireframe, spec, copy, mobile behavior and accessibility | [sections/](./sections) |
| 4 | **Brand kit and design system**: logo, color, type, shapes, patterns, doodles, photography, voice; tokens, components and Storybook | [brand-kit.md](./brand-kit.md), [`packages/`](../../packages) |

![Palette sheet](./assets/palette.png)

## The 16 pins

| # | Pin | What it is | Leads these sections |
|---|---|---|---|
| 01 | [Berloga Coffeeshop](./pins/01-berloga-coffeeshop.md) | Café homepage, cream and pink, outlined in brown | Gallery, Reviews, Bake Club, Journal |
| 02 | [Pretty OK Studios: mail club](./pins/02-pretty-ok-mail-club.md) | "How it works" and FAQ on wide stripes | Process, FAQ, Marquee |
| 03 | [Emily Jane](./pins/03-emily-jane-author.md) | Author homepage in dusty blue, butter, blush and brown | Newsletter, Footer |
| 04 | [Hopf Haus Kitchen](./pins/04-hopf-haus-kitchen.md) | Meal-prep site in caramel and beige | (alternates: process row, oval products) |
| 05 | [Pretty OK Studios: shop](./pins/05-pretty-ok-studios-shop.md) | Product row, values, "Meet Elia" | About / Meet Mom |
| 06 | [Lilli Pilli Patisserie](./pins/06-lilli-pilli-patisserie.md) | Patisserie homepage in green and peach | (alternates: band hero, visit us) |
| 07 | [Croissant Lab](./pins/07-croissant-lab-landing.md) | "Dopamine" bakery landing page on blue stripes | (alternates: sticker hero, quote card) |
| 08 | [Digital Wave taplink](./pins/08-digital-wave-taplink.md) | Mobile link-in-bio pages in cherry and dusty blue | Chatbot, Custom cakes packages, Link-in-bio |
| 09 | [Sasa Khalisa stripes](./pins/09-sasakhalisa-pastel-stripes.md) | Sheet of 16 stripe patterns | Pattern library |
| 10 | [The Book Nook Society](./pins/10-book-nook-society.md) | Book club site with tickets and seals | Bake Club ticket, chat launcher |
| 11 | [Stevie Kay](./pins/11-stevie-kay-showit.md) | Photo-led personal brand site | (alternates: gallery trio, star seam) |
| 12 | [September Sun](./pins/12-september-sun-candles.md) | Candle shop homepage with patterned frames | (alternates: stockists, Instagram strip) |
| 13 | [Puzzle Pantry](./pins/13-puzzle-pantry.md) | Cosy Shopify homepage | Announcement bar, filter pills |
| 14 | [Berloga (second pin)](./pins/14-berloga-coffeeshop-repost.md) | The same Berloga page, saved again | Reinforces 01 |
| 15 | [Nectar](./pins/15-nectar-candy-cart.md) | Candy-cart homepage in cherry, pink and cream | **Landing page**, Navbar, Hero, Find us, Custom cakes |
| 16 | [SugarLace Bakery](./pins/16-sugarlace-bakery.md) | Cake shop in baby blue, cream and cherry | Menu |

## Section picks

| Section | Pick | Alternates | Spec |
|---|---|---|---|
| Landing page | 15 Nectar | — | [landing-page.md](./sections/landing-page.md) |
| Announcement + navbar | 15 Nectar + 13 Puzzle Pantry | 03 capsule (mobile) | [navbar.md](./sections/navbar.md) |
| Hero | 15 Nectar grid paper | 06 band, 07 stickers, 13 photo | [hero.md](./sections/hero.md) |
| Marquee | 02 double ribbon | 07 tilted, 11 bubble, 04 badge | [marquee.md](./sections/marquee.md) |
| Menu | 16 SugarLace | 05 row with tabs, 04 ovals, 06 bestsellers | [menu.md](./sections/menu.md) |
| Process | 02 tilted stack | 04 row, 08 tabs, 10 cards, 16 stamp card | [process.md](./sections/process.md) |
| Find us | 15 weekly schedule | 06 visit us, 12 stockists | [find-us.md](./sections/find-us.md) |
| Custom cakes | 15 price shapes | 08 key-tag packages | [custom-cakes.md](./sections/custom-cakes.md) |
| About | 05 Meet Elia | 01 orbit, 16 card, 03 photo stack, 07 quote | [about.md](./sections/about.md) |
| Gallery | 01 strips | 11 trio, 12 Instagram strip | [gallery.md](./sections/gallery.md) |
| Reviews | 01 scalloped cards | 07 quote card, 12 columns | [reviews.md](./sections/reviews.md) |
| Bake Club | 01 loyalty band + 10 ticket | 15 scalloped card | [bake-club.md](./sections/bake-club.md) |
| FAQ | 02 two-column cards | 08 pills, 01 rows | [faq.md](./sections/faq.md) |
| Newsletter | 03 card | 15 bar | [newsletter.md](./sections/newsletter.md) |
| Chatbot | Built from 08, 10, 01, 15 (no pin has one) | — | [chatbot.md](./sections/chatbot.md) |
| Journal | 01 arches | — | [journal.md](./sections/journal.md) |
| Footer | 03 three columns | 04 contact, 12 pink | [footer.md](./sections/footer.md) |

## Counting the board

Counted over the 15 unique designs (pin 14 repeats pin 01).

| Signal | Designs |
|---|---|
| Cream or beige page background | 14 (all but [11](./pins/11-stevie-kay-showit.md)) |
| At least one marquee ribbon | 11 |
| Stickers, seals or stamps | 11 ([02](./pins/02-pretty-ok-mail-club.md), [03](./pins/03-emily-jane-author.md), [05](./pins/05-pretty-ok-studios-shop.md), [06](./pins/06-lilli-pilli-patisserie.md), [07](./pins/07-croissant-lab-landing.md), [08](./pins/08-digital-wave-taplink.md), [10](./pins/10-book-nook-society.md), [12](./pins/12-september-sun-candles.md), [13](./pins/13-puzzle-pantry.md), [15](./pins/15-nectar-candy-cart.md), [16](./pins/16-sugarlace-bakery.md)) |
| Vertical stripes | 11 ([02](./pins/02-pretty-ok-mail-club.md), [03](./pins/03-emily-jane-author.md), [04](./pins/04-hopf-haus-kitchen.md), [06](./pins/06-lilli-pilli-patisserie.md), [07](./pins/07-croissant-lab-landing.md), [08](./pins/08-digital-wave-taplink.md), [09](./pins/09-sasakhalisa-pastel-stripes.md), [12](./pins/12-september-sun-candles.md), [13](./pins/13-puzzle-pantry.md), [15](./pins/15-nectar-candy-cart.md), [16](./pins/16-sugarlace-bakery.md)) |
| A script or handwritten accent | 9 ([01](./pins/01-berloga-coffeeshop.md), [03](./pins/03-emily-jane-author.md), [04](./pins/04-hopf-haus-kitchen.md), [09](./pins/09-sasakhalisa-pastel-stripes.md), [10](./pins/10-book-nook-society.md), [12](./pins/12-september-sun-candles.md), [13](./pins/13-puzzle-pantry.md), [15](./pins/15-nectar-candy-cart.md), [16](./pins/16-sugarlace-bakery.md)) |
| A founder or about section | 8 ([03](./pins/03-emily-jane-author.md), [04](./pins/04-hopf-haus-kitchen.md), [05](./pins/05-pretty-ok-studios-shop.md), [06](./pins/06-lilli-pilli-patisserie.md), [07](./pins/07-croissant-lab-landing.md), [12](./pins/12-september-sun-candles.md), [13](./pins/13-puzzle-pantry.md), [16](./pins/16-sugarlace-bakery.md)) |
| A process or steps block | 6 ([01](./pins/01-berloga-coffeeshop.md), [02](./pins/02-pretty-ok-mail-club.md), [04](./pins/04-hopf-haus-kitchen.md), [08](./pins/08-digital-wave-taplink.md), [10](./pins/10-book-nook-society.md), [16](./pins/16-sugarlace-bakery.md)) |
| Scalloped edges or frames | 6 ([01](./pins/01-berloga-coffeeshop.md), [03](./pins/03-emily-jane-author.md), [04](./pins/04-hopf-haus-kitchen.md), [05](./pins/05-pretty-ok-studios-shop.md), [09](./pins/09-sasakhalisa-pastel-stripes.md), [15](./pins/15-nectar-candy-cart.md)) |
