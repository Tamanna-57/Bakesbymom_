# @bakesbymom/tokens

The single source of truth for Bakes by Mom's colors, type, spacing, shapes, shadows, motion and patterns. Tokens are written in the [W3C Design Tokens (DTCG)](https://www.designtokens.org/) format and built with [Style Dictionary 5](https://styledictionary.com/) into every format the brand needs.

```bash
npm run build -w @bakesbymom/tokens   # build dist/
npm test -w @bakesbymom/tokens        # build + contrast/structure tests
```

## Outputs

| File                          | Import as                         | Use it for                                                                                                                    |
| ----------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `dist/css/tokens.css`         | `@bakesbymom/tokens/css`          | CSS custom properties (`--bbm-*`) on `:root`. Semantic tokens reference primitives with `var()`                               |
| `dist/tailwind/theme.css`     | `@bakesbymom/tokens/tailwind.css` | Tailwind v4 `@theme`: `bg-canvas`, `text-ink`, `border-line`, `font-display`, `text-display-xl`, `shadow-sticker-md` and more |
| `dist/scss/_tokens.scss`      | `@bakesbymom/tokens/scss`         | `$bbm-*` SCSS variables                                                                                                       |
| `dist/js/tokens.js` + `.d.ts` | `@bakesbymom/tokens`              | Typed ESM constants: `import { colorCherry600 } from '@bakesbymom/tokens'`                                                    |
| `dist/json/tokens.json`       | `@bakesbymom/tokens/json`         | Nested resolved values (emails, native apps, scripts)                                                                         |
| `dist/docs/tokens.json`       | `@bakesbymom/tokens/docs.json`    | Flat list with descriptions and aliases (powers the Storybook docs)                                                           |
| `dist/dtcg/tokens.json`       | `@bakesbymom/tokens/dtcg.json`    | Merged DTCG source. Import into Figma with **Tokens Studio**                                                                  |

## Usage

```css
/* plain CSS */
@import '@bakesbymom/tokens/css';

.order-card {
  background: var(--bbm-color-bg-surface);
  color: var(--bbm-color-text-primary);
  border: var(--bbm-border-width-thin) solid var(--bbm-color-border-default);
  border-radius: var(--bbm-radius-lg);
  box-shadow: var(--bbm-shadow-sticker-md);
}
```

```css
/* Tailwind v4 */
@import 'tailwindcss';
@import '@bakesbymom/tokens/tailwind.css';
/* <div class="bg-canvas text-ink font-display text-display-lg rounded-pill shadow-sticker-md"> */
```

## Architecture

Tokens come in three layers. **Components only use the semantic and component layers**, so a re-brand or seasonal theme only needs to change the mapping.

| Layer                            | Files                                                                                                                 | Examples                                                                                                         |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Primitive** (raw ingredients)  | `src/color/primitives.json`, `src/space.json`, `src/shape.json`, `src/effects.json`, `src/typography.json` (`font.*`) | `color.cherry.600`, `space.6`, `radius.pill`                                                                     |
| **Semantic** (what it's for)     | `src/color/semantic.json`, `src/typography.json` (`text.*`)                                                           | `color.bg.canvas`, `color.text.muted`, `color.action.primary.bg`, `color.tone.butter.fg`, `text.display-xl.size` |
| **Component** (shared decisions) | `src/component.json`                                                                                                  | `component.button.height.md`, `component.card.radius`                                                            |

### Palette

Nine bakery-named families, each `50 → 900` (cream stops at 500):

| Family       | Role                                                                     |
| ------------ | ------------------------------------------------------------------------ |
| `cream`      | Paper and canvas. Every page sits on `cream-100`                         |
| `cocoa`      | Warm ink that replaces black. Text, outlines, sticker shadows            |
| `cherry`     | Brand red. `cherry-600` is the **only** primary-action fill              |
| `strawberry` | Strawberry-milk pinks, the main soft surface                             |
| `blueberry`  | Powder blue to navy, the cool partner; `blueberry-700` is the focus ring |
| `butter`     | Custard and honey                                                        |
| `pistachio`  | Sage to forest green                                                     |
| `caramel`    | Apricot to toffee                                                        |
| `lavender`   | Ube and periwinkle (minor accent)                                        |

### Tones

`color.tone.<flavor>.{bg, border, fg, solid, on-solid, pattern}` gives every flavor a soft pairing (`fg` on `bg`) and a filled pairing (`on-solid` on `solid`). Badges, cards, marquees, price tags and patterns all take a `tone` prop that maps here, so adding a flavor means adding one token group.

## Rules (enforced by `test/tokens.test.mjs`)

- Every text/background pairing in the semantic layer meets **WCAG AA (4.5:1)**: text roles on every surface, action labels in every state, every tone and every status.
- Outlines and the focus ring are at least **3:1** against every surface.
- Every palette scale gets strictly darker from 50 to 900.
- Every output is complete (no `undefined` or `[object Object]`), and semantic CSS keeps its `var()` references.

## Adding or changing a token

1. Edit the JSON in `src/` (use `{color.cherry.600}` syntax for aliases and add a `$description`).
2. `npm test -w @bakesbymom/tokens`. If a contrast test fails, the pairing isn't accessible, so pick a different step.
3. Storybook's **Foundations** pages read `dist/docs/tokens.json`, so they update automatically.
