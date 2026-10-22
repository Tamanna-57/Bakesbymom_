# Pinterest References — Index & Synthesis

There is one Style Reference per pin in [`/pinterest`](../../pinterest). Each file follows the same structure as the web references in [`/design`](../README.md): tokens (colors, type, shapes), components, patterns, do's and don'ts, and a **For Bakes by Mom** section that maps the reference onto the design system in [`/packages`](../../packages).

> **Method.** Colors were sampled from each pin with median-cut quantization (dominant palette) plus region sampling (headline ink, buttons, bands), so the hex values are measured, not guessed. Thin type is anti-aliased in a 736 px JPEG, so ink colors for small text are approximate and marked as such. Typefaces are visual identifications with Google Fonts substitutes. Russian and Portuguese copy is translated inline.

## Index

| # | Reference | Pin file | Format | Weight* | Key takeaway |
|---|-----------|----------|--------|---------|--------------|
| 1 | [Berloga Coffeeshop](./berloga-coffeeshop.md) | `Berloga Coffeeshop _ Corporate website _ UX _ UI.jpg` | Website | ★★★ | Strawberry, oat and cocoa outlines; scalloped sticker cards; pill section labels |
| 2 | [Web design idea functional](./web-design-idea-functional.md) | `Web design idea functional.jpg` | Website | (duplicate) | Same design as #1, pinned twice |
| 3 | [SugarLace Bakery](./sugarlace-bakery.md) | `Custom Cake Bakery Website Design….jpg` | Website | ★★★ | Fillings menu cards with price pills; stamp-edged order steps; allergy note |
| 4 | [Hopf Haus Kitchen](./hopf-haus-kitchen.md) | `Warm, Welcoming Custom Website Design.jpg` | Website | ★★★ | Family-recipe voice; typewriter heads; 3-step pickup process; oval photos |
| 5 | [Nectar Candy Cart](./nectar-candy-cart.md) | `Fun, Modern, Playful … Candy Subscription Brand ….jpg` | Website | ★★★ | Weekly pop-up schedule; flower price tags; graph paper; scalloped nav |
| 6 | [Lilli Pilli Patisserie](./lilli-pilli-patisserie.md) | `Lilli Pilli Patisserie Cafe \| Shopify Website Design.jpg` | Website | ★★☆ | Awning-stripe borders; "From $" pricing; Visit Us and hours |
| 7 | [September Sun Candles](./september-sun-candles.md) | `Home Fragrance Candle Website Design….jpg` | Website | ★★☆ | Small-maker page structure; patterned photo frames; markets and stockists |
| 8 | [Emily Jane](./emily-jane-romance-author.md) | `Romance Author Website Inspiration.jpg` | Website | ★★☆ | Capsule nav; "Meet the author" card with script signature; scallop bands |
| 9 | [Pretty OK! Homepage](./pretty-ok-studios-homepage.md) | `Boutique E-Commerce Homepage Layout….jpg` | Website | ★★☆ | Plain product grid, charming frames; polka-dot trim; airmail letter card |
| 10 | [Pretty OK! Nostalgia Post](./pretty-ok-nostalgia-post.md) | `Pretty OK Studios Homepage ✷ ….jpg` | Website | ★★☆ | Rotated stacked steps; sticker-icon FAQ; double marquee |
| 11 | [Puzzle Pantry](./puzzle-pantry.md) | `Full Shopify Website & Brand Design for Puzzle Pantry….jpg` | Website | ★★☆ | Script word swapped into serif headline; filter pills; quatrefoil frame |
| 12 | [The Book Nook Society](./book-nook-society.md) | `Book Club Community Website Design….jpg` | Website | ★★☆ | Admission ticket; society seal; polaroid with sticker |
| 13 | [Digital Wave Taplink](./digital-wave-taplink.md) | `Таплинк для smm-агенства.jpg` | Link-in-bio | ★★☆ | Instagram bio page; key-tag prices; torn paper; numbered rows |
| 14 | [Pastry Expert's Guide](./pastry-expert-guide.md) | `Дизайн гайда_презентации для эксперта-кондитера….jpg` | Digital guide | ★★☆ | Serif + script heading lockup; recipe/tips editorial layout |
| 15 | [Stevie Kay (Showit)](./stevie-kay-showit.md) | `Elevate Your Brand with a Custom 5-Page Showit….jpg` | Website | ★☆☆ | Stickers straddling seams; polaroid stack; soft Cooper-style display |
| 16 | [Cherry Cloud Shortcake](./cherry-cloud-shortcake-poster.md) | `Bakery poster design.jpg` | Poster | ★★☆ | Cabana stripes; arched serif + script; single dark-red ink |
| 17 | [Strawberry Cheesecake](./strawberry-cheesecake-groovy-poster.md) | ` -19.jpg` | Social post | ★☆☆ | Checkerboard; type-sandwich layout; chocolate-cherry ink |
| 18 | [Strawberry Cake Awning](./strawberry-cake-awning-poster.md) | `Poster design example ✨ Strawberry Cake concept….jpg` | Poster | ★☆☆ | Awning edge; gingham; sticker clusters (social only) |
| 19 | [Bolo de Morango Promo](./bolo-de-morango-retro-promo.md) | `post para confeitaria com estética retrô🍓.jpg` | Social post | ★☆☆ | Layered promo lockup; edge offer tab; print-grain retro |
| 20 | [Raspberry Macaron](./raspberry-macaron-poster.md) | `raspberry macarons!!!🍓.jpg` | Poster | ★☆☆ | Butter and raspberry pairing; cloud badge; outline type |
| 21 | [Sunday Brunch](./sunday-brunch-poster.md) | `Sunday Brunch \| Live Music Poster.jpg` | Event poster | ★☆☆ | Graph paper + gingham; tape date label; swash serif |
| 22 | [Spring Bouquet Workshop](./spring-bouquet-workshop-flyer.md) | `example-2.com` (a JPEG with the wrong extension) | Event flyer | ★☆☆ | Class/workshop flyer format; stamped label; taped polaroid |
| 23 | [Pastel Seamless Stripes](./pastel-seamless-stripes.md) | `Canva Elements Keyword - Pastel Seamless Stripes….jpg` | Asset pack | ★★☆ | Stripe anatomy (band, pinstripe, dots, ric-rac) |
| 24 | [Cloche Reveal Collage](./cloche-collage-cover.md) | `cover page.jpg` | Story cover | ★☆☆ | Die-cut sticker halo; torn paper; "reveal" teaser |

\* **Weight** is how strongly the reference shapes the design system: ★★★ primary, ★★☆ strong, ★☆☆ supporting (mostly social templates).

## What the references agree on

Counted across the 23 unique pins (#2 is a duplicate):

| Signal | Pins | Decision in the design system |
|--------|------|-------------------------------|
| Warm cream/paper canvas, never pure white | 20 / 23 | `--bbm-color-bg-canvas` = `cream-100` (`#fdf6e9`); white is reserved for raised surfaces |
| Vertical stripes (cabana, awning, pinstripe) | 13 / 23 | `<PatternSurface pattern="stripes \| pinstripe">`, `<EdgeDivider shape="awning">` |
| Deep red / burgundy / cherry ink | 12 / 23 | `cherry` scale is the brand; `cherry-600` is the only primary-action fill |
| Pink as the main soft surface | 12 / 23 | `strawberry` scale; `strawberry-100/200` for blush sections and soft buttons |
| Display type + script accent lockup | 12 / 23 | Fraunces + Pinyon Script, exposed through `<SectionHeading script>` and inline `<em>` |
| Scalloped edges (bands, cards, frames) | 9 / 23 | `<EdgeDivider shape="scallop">`, `<ReviewCard shape="scallop">`, `<Card shape="scallop">` |
| Marquee/ticker ribbons between sections | 9 / 23 | `<Marquee>` (pauses on hover, static when the user prefers reduced motion) |
| Pill-shaped buttons | 8 / 23 | `--bbm-radius-pill` on all buttons, inputs and tags |
| Powder blue as the cool partner to pink | 8 / 23 | `blueberry` scale |
| Gingham or checkerboard | 7 / 23 | `pattern="gingham" \| "checker"` |
| Paper ephemera (tickets, polaroids, tape, stamps) | 7 / 23 | `<Ticket>`, `<Polaroid>`, `<PriceTag shape="tag">` |
| Circular seals and rotating text badges | 7 / 23 | `<Seal>`, `<Logo variant="seal">` |
| Butter yellow / olive accents | 7 / 23 | `butter` and `pistachio` scales (tones, not actions) |
| Graph paper | 4 / 23 | `pattern="grid"` |
| Hard outline + offset shadow ("sticker") | 4 / 23 + Ko-fi web ref | `--bbm-shadow-sticker-*`, `sticker` prop on `<Button>` and `<Card>` |

Things the references **avoid**: blurred drop shadows (only polaroids and photos get soft shadows), cool grays, gradients on UI, and more than one saturated action color per page.

## Palette convergence

Sampled anchors grouped by family. These are the values the `@bakesbymom/tokens` primitives are tuned around:

| Family | Reference anchors | Bakes by Mom primitive |
|--------|-------------------|------------------------|
| Cream | `#f8f1de` Berloga · `#fdf8f2` Nectar · `#fff7ee` Pretty OK · `#f7f0e6` Lilli Pilli · `#faf6eb` SugarLace | `cream-50…500` (canvas `cream-100` `#fdf6e9`) |
| Cocoa ink | `#514135` Berloga · `#48110e` Puzzle Pantry · `#591812` Cheesecake · `#5f513e` Hopf Haus | `cocoa-50…900` (text `cocoa-900` `#3a1e17`) |
| Cherry | `#801026` Nectar · `#822b38` SugarLace · `#961639` Taplink · `#961e27` Pastry Guide · `#772e28` Cherry Cloud | `cherry-50…900` (action `cherry-600` `#a81e31`, brand ink `cherry-700` `#8a1428`) |
| Strawberry | `#f5d7d5` Berloga · `#f5bbc4` Book Nook · `#f3c5c8` Pretty OK · `#f6b8c3` Pastry Guide · `#fed0db` Nectar | `strawberry-50…900` (`strawberry-200` `#f7d3d4`) |
| Blueberry | `#c7d8e2` SugarLace · `#c4d7e8` Pretty OK · `#a9c0d9` Book Nook · `#a0b6cd` Emily Jane · `#36506b` navy | `blueberry-50…900` (`blueberry-200` `#c9dcea`) |
| Butter | `#fff3c1` Macaron · `#f0e1b6` Emily Jane · `#eee2b8` Puzzle Pantry · `#fec459` mustard | `butter-50…900` |
| Pistachio | `#4c644a` Lilli Pilli forest · `#a8b79c` sage · `#cdc171` olive · `#447049` Spring | `pistachio-50…900` |
| Caramel | `#d8976f` Lilli Pilli apricot · `#a56f41` Hopf toffee · `#ffa57f` Nectar peach | `caramel-50…900` |
| Lavender | `#c4c6ff` Nectar periwinkle · `#dcd7eb` Puzzle Pantry seal · lilac stripes | `lavender-50…900` (minor accent) |

## Type convergence

| Role | What the pins use | Bakes by Mom choice |
|------|-------------------|---------------------|
| Display | Soft/retro serifs (Cooper, Recoleta, Windsor), condensed patisserie serifs | **Fraunces** (variable: `opsz`, `wght`, `SOFT`, `WONK`). One family covers the light editorial, condensed-caps and puffy Cooper-like looks |
| Accent | Copperplate scripts ("Shortcake", "Fillings", "Workshop", "Bolo de morango") | **Pinyon Script**, used for single words and signatures only, at 28px and above |
| Body/UI | Clean geometric or grotesk sans | **DM Sans**, also used by the Apron and Ko-fi web references |
| Labels & prices | Typewriter (Hopf Haus, Book Nook), mono data labels (Apron, Beautiful, Monte web refs) | **DM Mono**: eyebrows, prices, hours, dates. The "recipe card" voice |

## Product ideas spotted in the references

These are not design decisions, but they recur and are worth considering for the business:

- **Weekly "where to find us" schedule** for markets and pop-ups (Nectar, September Sun)
- **Subscription box / bake club** ("Join the Nectar Candy Club", "The Nostalgia Post")
- **Classes and workshops** as an event format (Spring Bouquet, September Sun's pour bar)
- **A paid digital guide** to home baking (Pastry Expert's Guide)
- **A link-in-bio mini-site** for Instagram traffic (Digital Wave Taplink)
- **Allergy adaptations called out next to the menu** (SugarLace)
- **Wholesale / custom-order inquiry** (September Sun)
