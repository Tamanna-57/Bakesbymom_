# Bakes by Mom: Design System

> **"Mom's recipe notebook, open on the counter of a little pink-and-blue bake shop."**

Built from one source: the 16 pins on the [bakesbymom Pinterest board](https://in.pinterest.com/nuttychip/bakesbymom/). Baby blue, baby pink, beige, cherry red and cocoa brown, measured from the pins; every website section taken from the pin that does it best.

| | Package / folder | What's inside |
|---|---|---|
| 📌 | [`design/board/`](./design/board/README.md) | **The board, analysed.** One file per pin (layout, sections, components, colors, type), the [palette](./design/board/palette.md), one spec per website section and the [brand kit](./design/board/brand-kit.md) |
| 🎨 | [`packages/tokens`](./packages/tokens) | **Token library.** W3C DTCG source → CSS variables, SCSS, JS/TS, JSON, a Tailwind v4 theme and a DTCG file for Figma. WCAG contrast is tested in CI |
| 🧁 | [`packages/ui`](./packages/ui) | **Component library.** 28 React components, from buttons and menu cards to the gallery, week schedule, Bake Club ticket and Ask Mom chat |
| 🌐 | [`apps/web`](./apps/web) | **The website.** The eggless home bakery in Panipat: cakes by occasion, treats by type, WhatsApp ordering, our story and a link-in-bio page. The design comes from the board; the content and categories from the old site |
| 📖 | [`stories/`](./stories) + [`.storybook/`](./.storybook) | **Storybook.** Foundations generated from the tokens, the brand kit, the board moodboard, every section with its source pins, every component with controls and an a11y panel, and full pages (landing, menu, about, link in bio, Instagram templates) |
| 🖼️ | [`pinterest/board/`](./pinterest/board) | The 16 board images (third-party work, for reference only) |

## Quick start

Requires Node 22.12 or newer.

```bash
npm install
npm run storybook        # builds tokens, opens Storybook at http://localhost:6006
npm run web              # builds the packages, opens the website at http://localhost:5173
```

| Script | Does |
|--------|------|
| `npm run storybook` | Storybook dev server with hot reload (components are imported from source) |
| `npm run build` | Builds `@bakesbymom/tokens` then `@bakesbymom/ui` into their `dist/` folders |
| `npm run build:web` | Builds the packages, then the website into `apps/web/dist` |
| `npm test` | Token tests (contrast, scales, outputs) + component tests (Vitest + Testing Library) |
| `npm run typecheck` | TypeScript for the library and every story |
| `npm run build-storybook` | Static Storybook in `storybook-static/` |
| `npm run format` | Prettier |
| `npm run check` | Everything CI runs: format check, build (packages and website), typecheck, tests, static Storybook |

## Using it in an app

```tsx
import '@bakesbymom/ui/fonts.css';
import '@bakesbymom/ui/styles.css';
import { Hero, Button, ProductCard } from '@bakesbymom/ui';
```

Token-only consumers can use `@bakesbymom/tokens/css` (`var(--bbm-color-bg-canvas)`), `@bakesbymom/tokens/tailwind.css` (`bg-canvas text-cherry-700 font-display`), `@bakesbymom/tokens/scss` or the typed JS exports. See each package README for details.

The packages are npm workspaces in this repo. To use them from another repository, publish them (for example to GitHub Packages under the `@tamanna-57` scope) or add this repo as a git dependency.

## The system at a glance

- **Color.** Five core scales measured from the board (`blue`, `pink`, `beige`, `cherry`, `brown`) plus two small helpers (`butter`, `matcha`), a semantic layer (`bg`, `text`, `border`, `action`, `status`) and seven **tones** that components switch between. Approved text pairings pass WCAG AA, enforced by `packages/tokens/test`.
- **Type.** Fraunces for headlines and prices · DM Sans for reading (800–900 for one heavy title) · Pinyon Script for one word or Mom's signature · Caveat for handwritten notes · Cherry Bomb One for one bubble word. Display sizes are fluid.
- **Shape.** Pills for anything you can tap, rounded, scalloped and cloud cards, scallop, flower and cartouche photo frames, and 1.5px cocoa sticker outlines with hard, blur-free shadows.
- **Patterns.** Stripes (plain, dotted, wavy), pinstripes, gingham, checkerboard, grid paper and polka dots; scallop, wave, torn-paper, dot and checker edges, all generated from tokens.

## Which pin does what

| Section | From |
|---|---|
| Home page: hero stripes, about us card, flavours, order card and cherry tiles | 16 SugarLace bakery |
| Home page: ribbon, shop by the box, Mom's kitchen | 13 Puzzle Pantry |
| Find us, custom cakes, the scalloped nav | 15 Nectar candy cart |
| Menu cards and category tiles | 16 SugarLace bakery (filters from 13) |
| Process, marquee ribbons, FAQ | 02 Pretty OK mail club |
| About / Meet Mom | 05 Pretty OK studios (story orbit from 01) |
| Gallery (the strips open one by one as the page scrolls down, with occasion chips from 13), reviews, Bake Club band, journal | 01 Berloga coffeeshop |
| Bake Club ticket | 10 Book Nook Society |
| Newsletter and footer | 03 Emily Jane |
| Link in bio, pricing packages | 08 Digital Wave taplink |
| Chatbot | composed from 08, 10, 01 and 15 (the board has no chat) |

The reasoning, with alternates for every section, is in [`design/board/README.md`](./design/board/README.md).

## On Vercel

| Site | Root Directory | Config |
|---|---|---|
| The website | `./` (Vercel's default) | [`vercel.json`](./vercel.json) builds the packages and the site into `apps/web/dist`, sends `/api` to the catalog Worker and every other path to `index.html` |
| Storybook | `apps/storybook` | [`apps/storybook/vercel.json`](./apps/storybook/vercel.json) runs `npm run build-storybook` and serves `storybook-static` |

To put the website on a Vercel account: **Add New → Project**, import `Tamanna-57/Bakesbymom_`, leave the Root Directory as it is and deploy. The framework preset, build command and output directory come from `vercel.json`, and no environment variables are needed. The canonical link, link preview and sitemap use the project's production address on their own; set `SITE_URL` (e.g. `https://bakesbymom.in`) once a custom domain is added. A project whose Root Directory is `apps/web` works too, through [`apps/web/vercel.json`](./apps/web/vercel.json); keep its `headers` and `rewrites` the same as the root file's.

`https://bakesbymom.vercel.app` is the old site. Its admin page edits the cake catalog both sites read.

Connected through Vercel's GitHub app, a project deploys every push to `main` by itself. [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) is the other way, for projects that aren't connected: it deploys both projects every time `main` changes, using four repository secrets (Settings → Secrets and variables → Actions), and skips until they are set:

| Secret | Where to find it |
|---|---|
| `VERCEL_TOKEN` | https://vercel.com/account/tokens |
| `VERCEL_ORG_ID` | `orgId` in `.vercel/project.json` after running `npx vercel link` in the repo |
| `VERCEL_SITE_PROJECT_ID` | `projectId` after `npx vercel link` to the website project |
| `VERCEL_STORYBOOK_PROJECT_ID` | `projectId` after `npx vercel link` to the Storybook project |

[`.github/workflows/ci.yml`](./.github/workflows/ci.yml) runs `npm run check` on every push.

## How decisions were made

Every pin was analysed for its layout, sections, components, measured colors and type (Google Fonts substitutes), then the 15 unique designs were counted: a cream or beige page in 14, marquee ribbons in 11, stickers or stamps in 11, vertical stripes in 11, a script or handwritten accent in 9. Those counts drove the tokens and components, and each Storybook story links back to its pins. The earlier `design/DESIGN*.md` web references are kept for context only.
