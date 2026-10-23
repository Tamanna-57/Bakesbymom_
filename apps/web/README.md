# @bakesbymom/web

The Bakes by Mom website, built only from [`@bakesbymom/ui`](../../packages/ui) and the board specs in [`design/board/sections/`](../../design/board/sections).

| Path     | Page                                                                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`      | Landing page, in the order of pin 15: hero, menu, process, find us, custom cakes, Meet Mom, gallery, reviews, Bake Club, FAQ, newsletter |
| `/menu`  | Full menu with filters, category tiles, custom cake packages and the FAQ                                                                   |
| `/about` | Our story: orbit, Meet Mom, values, about card and timeline                                                                                |
| `/links` | The Instagram link-in-bio page (pin 08)                                                                                                    |

```bash
npm run web        # at the repo root: builds the packages, then starts the site at http://localhost:5173
npm run build:web  # production build into apps/web/dist
```

- **Content.** Copy, menu items, the week's schedule, FAQs and reviews live in `src/content/`. They're sample content for now: replace them (and the illustrations) with the real ones before launch.
- **Sections.** `src/sections/blocks.tsx` holds every page section. Storybook's _Sections_ and _Pages_ stories import these same files, so a change here shows up in both.
- **Routing.** `src/router.ts` is a small client-side router; `vercel.json` sends every path to `index.html`.
- **Not wired up yet.** The newsletter forms and the Ask Mom chat are demos (no email service or real replies), and the search, order box and social links are placeholders.

Deployed on Vercel with this folder as the project's root directory.
