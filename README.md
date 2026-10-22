# Bakes by Mom: Design System

**Mom's recipe box meets a retro pastry shop.** Cream paper, cocoa ink, one cherry-red action color, and handmade details (candy stripes, scalloped edges, tickets, polaroids, sticker outlines) around calm, readable content.

This repository is the Bakes by Mom design system:

| | Package / folder | What's inside |
|---|---|---|
| 🎨 | [`packages/tokens`](./packages/tokens) | **Token library.** W3C DTCG source → CSS variables, SCSS, JS/TS, JSON, a Tailwind v4 theme and a Figma (Tokens Studio) file. WCAG contrast is tested in CI |
| 🧁 | [`packages/ui`](./packages/ui) | **Component library.** 22 React components (buttons, cards, tickets, seals, polaroids, price tags, marquees, patterns, page sections) |
| 📖 | [`stories/`](./stories) + [`.storybook/`](./.storybook) | **Storybook.** Foundations docs generated from the tokens, every component with controls and an a11y panel, page mockups (home, menu, link-in-bio, social posts) and the Pinterest moodboard |
| 📌 | [`design/`](./design) | **References.** Nine web style references and 24 Pinterest analyses ([`design/pinterest/`](./design/pinterest/README.md)), with the synthesis behind every decision |
| 🖼️ | [`pinterest/`](./pinterest) | The original Pinterest pins (third-party work, for reference only) |

## Quick start

Requires Node 22.12 or newer.

```bash
npm install
npm run storybook        # builds tokens, opens Storybook at http://localhost:6006
```

| Script | Does |
|--------|------|
| `npm run storybook` | Storybook dev server with hot reload (components are imported from source) |
| `npm run build` | Builds `@bakesbymom/tokens` then `@bakesbymom/ui` into their `dist/` folders |
| `npm test` | Token tests (contrast, scales, outputs) + component tests (Vitest + Testing Library) |
| `npm run typecheck` | TypeScript for the library and every story |
| `npm run build-storybook` | Static Storybook in `storybook-static/` |
| `npm run format` | Prettier |
| `npm run check` | Everything CI runs: format check, build, typecheck, tests, static Storybook |

## Using it in an app

```tsx
import '@bakesbymom/ui/fonts.css';
import '@bakesbymom/ui/styles.css';
import { Hero, Button, ProductCard } from '@bakesbymom/ui';
```

Token-only consumers can use `@bakesbymom/tokens/css` (`var(--bbm-color-bg-canvas)`), `@bakesbymom/tokens/tailwind.css` (`bg-canvas text-ink font-display`), `@bakesbymom/tokens/scss` or the typed JS exports. See each package README for details.

The packages are npm workspaces in this repo. To use them from another repository, publish them (for example to GitHub Packages under the `@tamanna-57` scope) or add this repo as a git dependency.

## The system at a glance

- **Color.** Nine pantry-named scales (`cream`, `cocoa`, `cherry`, `strawberry`, `blueberry`, `butter`, `pistachio`, `caramel`, `lavender`), a semantic layer (`bg`, `text`, `border`, `action`, `status`) and nine flavor **tones** that components switch between. Every pairing passes WCAG AA, enforced by `packages/tokens/test`.
- **Type.** Fraunces (soft retro serif, variable `SOFT`/`WONK`) for headlines · Pinyon Script for one word or Mom's signature · DM Sans for reading · DM Mono for labels, prices and hours. Display sizes are fluid.
- **Shape.** Pills for anything you can tap, 14–40px corners for surfaces, arches, ovals and scallops for photos, and 1.5px cocoa sticker outlines with hard, blur-free shadows.
- **Patterns.** Stripes, pinstripes, gingham, checkerboard, graph paper and polka dots; scallop, wave, zigzag, torn-paper, awning and half-dot edges, all generated from tokens.

## Storybook on Vercel

Storybook is deployed as a static site on Vercel. [`vercel.json`](./vercel.json) holds the build settings (`npm ci`, `npm run build-storybook`, output `storybook-static`), so no dashboard configuration is needed. One-time setup: in Vercel, **Add New → Project**, import `Tamanna-57/Bakesbymom_` and keep the root directory as `./`. After that, every push to `main` updates the production site and every other branch or pull request gets its own preview URL.

[`.github/workflows/ci.yml`](./.github/workflows/ci.yml) runs `npm run check` on every push.

## How decisions were made

Each Pinterest pin was analysed into a Style Reference (measured colors, type identification with Google Fonts substitutes, components, do's and don'ts), then the references were cross-tallied. For example, a warm cream canvas appears in 20 of 23 pins, vertical stripes in 13, deep cherry ink in 12, and scalloped edges in 9. Those counts drove the tokens and components. See [`design/README.md`](./design/README.md) and [`design/pinterest/README.md`](./design/pinterest/README.md).
