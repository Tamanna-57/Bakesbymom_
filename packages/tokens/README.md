# @bakesbymom/tokens

The single source of truth for Bakes by Mom's colors, type, spacing, shapes, shadows, motion and patterns, taken from the [bakesbymom board](../../design/board/README.md). Tokens are written in the [W3C Design Tokens (DTCG)](https://www.designtokens.org/) format and built with [Style Dictionary 5](https://styledictionary.com/) into every format the brand needs.

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
| `dist/js/tokens.js` + `.d.ts` | `@bakesbymom/tokens`              | Typed ESM constants: `import { colorCherry700 } from '@bakesbymom/tokens'`                                                    |
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
| **Primitive** (raw ingredients)  | `src/color/primitives.json`, `src/space.json`, `src/shape.json`, `src/effects.json`, `src/typography.json` (`font.*`) | `color.cherry.700`, `space.6`, `radius.pill`                                                                     |
| **Semantic** (what it's for)     | `src/color/semantic.json`, `src/typography.json` (`text.*`)                                                           | `color.bg.canvas`, `color.text.muted`, `color.action.primary.bg`, `color.tone.butter.fg`, `text.display-xl.size` |
| **Component** (shared decisions) | `src/component.json`                                                                                                  | `component.button.height.md`, `component.card.radius`                                                            |

### Palette

Measured from the 16 pins (median-cut quantization and point samples). Steps marked as measured in each token's description come straight from a pin; the rest are interpolated in OKLCH between those anchors. The full write-up, with the pin behind every anchor, is [`design/board/palette.md`](../../design/board/palette.md).

| Family   | Measured anchors                                                   | Role                                                                   |
| -------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `blue`   | `100` `#e5eaf0`, `200` `#c4d7e8`, `300` `#a0b6cd`, `700` `#3a5067` | Baby blue bands and cards; `blue-700` is navy text and the focus ring  |
| `pink`   | `50` `#fcedf2`, `200` `#f5d7d5`, `300` `#f3c5c8`, `500` `#bc8588`  | Baby pink bands, cards and soft buttons                                |
| `beige`  | `50` `#fbf7ef`, `100` `#f8f1de`, `200` `#ece3c6`, `400` `#baa991`  | Paper: every page sits on `beige-50`                                   |
| `cherry` | `500` `#d02b2f`, `700` `#941939`, `800` `#801026`                  | `cherry-700` is the primary action; bright `cherry-500` once per page  |
| `brown`  | `400` `#a56f41`, `700` `#643725`, `900` `#32180b`                  | Cocoa ink that replaces black: text, outlines, sticker shadows, footer |
| `butter` | `200` `#f0e1b6`, `300` `#f2db87`                                   | Helper: the newsletter band, tape, one sticker                         |
| `matcha` | `300` `#cfc06f`                                                    | Helper: success states, the odd leaf                                   |

Plus `white` and `paper` (`#fffdf6`, cards and inputs).

### Tones

`color.tone.<tone>.{bg, border, fg, solid, on-solid, pattern}` gives each of the seven tones (`blue`, `pink`, `beige`, `cherry`, `brown`, `butter`, `matcha`) a soft pairing (`fg` on `bg`) and a filled pairing (`on-solid` on `solid`). Badges, cards, marquees, price tags and patterns all take a `tone` prop that maps here, so adding a tone means adding one token group.

## Rules (enforced by `test/tokens.test.mjs`)

- Primary, secondary and muted text meet **WCAG AA (4.5:1)** on every light ground (canvas, surface, raised, sunken, beige, blue, pink, butter); inverse text meets it on cocoa, cherry and navy; brand and link text on canvas and surface.
- The approved pairings in [`palette.md`](../../design/board/palette.md) keep their measured ratios, and action labels (every state), tones and statuses are all AA.
- Outlines and the focus ring are at least **3:1** against every surface.
- Every palette scale gets strictly darker from 50 to 900, and the values measured from the pins stay put.
- Every output is complete (no `undefined` or `[object Object]`), and semantic CSS keeps its `var()` references.
