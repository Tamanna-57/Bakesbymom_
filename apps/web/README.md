# @bakesbymom/web

The Bakes by Mom website: a home bakery in Panipat, Haryana, where everything is 100% eggless and orders go through WhatsApp. It's built only from [`@bakesbymom/ui`](../../packages/ui) and the board specs in [`design/board/sections/`](../../design/board/sections). The content, categories, photos and ordering flow come from the old site (bakesbymom.vercel.app), and the paths match it, so old links keep working.

| Path                    | Page                                                                                                |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| `/`                     | Home: hero, cakes by occasion, every kind of bake, how to order, the WhatsApp band, custom cakes, Mom, the gallery, reviews, gifting, FAQ, Instagram |
| `/catalog`              | Every cake, by occasion (11 occasions, 21 cakes). `?occasion=anniversary` opens one shelf           |
| `/catalog/<cake>`       | One cake: photos, price, and an order builder (size, flavour, add-ons, message, date, time, pickup or delivery) that opens WhatsApp |
| `/shop`                 | Every kind of bake                                                                                  |
| `/shop/<type>`          | Brownies, cookies, jar cakes, dry cakes, cupcakes, bento cakes or combos, with what to know         |
| `/shop/<type>/<item>`   | One treat and its order builder (quantity, flour for cookies, extras, date, time)                   |
| `/about`                | Our story: the orbit, Mom, values, the about card, how it started and the ritual                    |
| `/links`                | The Instagram link-in-bio page (pin 08)                                                             |

```bash
npm run web        # at the repo root: builds the packages, then starts the site at http://localhost:5173
npm run build:web  # production build into apps/web/dist
npm test -w @bakesbymom/web
```

## Where things live

| File                         | What                                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ |
| `src/content/bakery.ts`      | The bakery's details: WhatsApp number, Instagram, place, time slots, cake sizes, flavours, add-ons      |
| `src/content/catalog.ts`     | Cakes by occasion, with prices (₹ per pound, listed weight, listed price) and photos in `public/photos` |
| `src/content/treats.ts`      | The seven treat types and their items, smallest orders and "make it yours" options                     |
| `src/content/order.ts`       | The WhatsApp order messages and the price for other sizes (per-pound rate)                             |
| `src/content/assistant.ts`   | The "Ask Mom" cake assistant, rebuilt from the old site's rules over the same catalog                  |
| `src/content/site.tsx`       | Nav, footer, FAQ, reviews and the how-to-order steps                                                   |
| `src/content/samples.tsx`    | Sample content for Storybook-only demos; nothing in it is on the website                               |
| `src/sections/blocks.tsx`    | Every page section. Storybook's _Sections_ and _Pages_ stories import these same files                 |
| `src/pages/`                 | The pages and the shared order form fields                                                             |

## Keeping it up to date

- **Cakes.** The catalog is a copy of the old site's `/api/catalog` (the one its admin page edits), so edits made there don't show up here. Add or change cakes in `catalog.ts`, and put photos in `public/photos` (cut-outs with a transparent background look best).
- **Treat photos.** The treats have no photos yet, so each type shows an illustration. Drop in real photos when you have them.
- **Not wired up.** Ordering is WhatsApp-only, by design: nothing is sent from the site. The Ask Mom assistant answers from the catalog and hands off to WhatsApp.

Deployed on Vercel with this folder as the project's root directory.
