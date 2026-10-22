# @bakesbymom/ui

React 19 components for Bakes by Mom, built only from [`@bakesbymom/tokens`](../tokens). Every component is documented with live controls in Storybook (`npm run storybook` at the repo root).

```tsx
import '@bakesbymom/ui/fonts.css'; // Fraunces, Pinyon Script, DM Sans, DM Mono (Google Fonts)
import '@bakesbymom/ui/styles.css'; // tokens + component styles in one file
import { Button, ProductCard, Badge } from '@bakesbymom/ui';

export function Bestseller() {
  return (
    <ProductCard
      name="Strawberry layer cake"
      image={{ src: '/cake.jpg', alt: 'Strawberry layer cake with pink frosting' }}
      price="From $38"
      href="/menu/strawberry-layer-cake"
      badge={
        <Badge tone="cherry" variant="solid">
          Bestseller
        </Badge>
      }
    />
  );
}
```

Add `className="bbm-theme"` to `<body>` for the cream canvas, cocoa ink and body type. If you already load the token CSS yourself, import `@bakesbymom/ui/components.css` instead of `styles.css`.

## Components

| Group      | Component              | What it's for                                                                                              | Reference                             |
| ---------- | ---------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Primitives | `Button`               | Pill actions: `primary` (cherry, one per view), `secondary`, `soft`, `ghost`; `sticker`, `loading`, `href` | Apron, Ko-fi                          |
|            | `Badge`                | Status and category labels; `tape` and `tab` shapes                                                        | bella, Sunday Brunch, Bolo de Morango |
|            | `TextField` / `Select` | Pill inputs with linked label, hint and error; `multiline`                                                 | Ko-fi, Monte                          |
| Surfaces   | `Card`                 | Paper, tone, solid, outline, `sticker`, scalloped, airmail-striped                                         | Berloga, Pretty OK, SugarLace         |
|            | `PatternSurface`       | Stripes, pinstripe, gingham, checker, grid paper, polka dots                                               | Sasa Khalisa stripes, Nectar          |
|            | `EdgeDivider`          | Scallop, wave, zigzag, torn, awning and half-dot section edges                                             | Berloga, Lilli Pilli, Taplink         |
| Ephemera   | `Ticket`               | Admission ticket with stub, or postage stamp                                                               | Book Nook, Spring Bouquet             |
|            | `Polaroid`             | Instant photo with tape and caption, scallop or pattern frame                                              | Stevie Kay, September Sun             |
|            | `PriceTag`             | Flower, cloud, coin or hotel key-tag prices                                                                | Nectar, Taplink                       |
|            | `Seal`                 | Circular ring-text sticker, optional spin; oval claim sticker                                              | Book Nook, Lilli Pilli                |
| Brand      | `Logo`                 | Wordmark: horizontal, stacked or seal                                                                      |                                       |
|            | `Doodle`               | Sparkle, heart, cherry, daisy, star, cupcake, squiggle                                                     | Berloga, cloche collage               |
| Content    | `ProductCard`          | Menu items: stack or row layout, rounded/arch/oval/circle frames                                           | Pretty OK, Lilli Pilli                |
|            | `ReviewCard`           | Scalloped review sticker with spoken star rating                                                           | Berloga                               |
|            | `SectionHeading`       | Eyebrow + title (`<em>` → script) + script line + lead                                                     | Puzzle Pantry, Pastry Guide           |
|            | `StepList`             | Ordered steps: row, stacked letters or numbered tabs                                                       | Hopf Haus, Pretty OK, Taplink         |
|            | `Accordion`            | Native `<details>` FAQ and specials list                                                                   | Pretty OK, Berloga                    |
|            | `Marquee`              | Ribbon ticker, accessible and pausable                                                                     | 9 of 23 pins                          |
| Sections   | `SiteHeader`           | Announcement, logo, nav, actions, mobile menu; bar or capsule                                              | Puzzle Pantry, Emily Jane             |
|            | `Hero`                 | Page opener with media, pattern backdrop and optional awning                                               | Lilli Pilli, Cherry Cloud             |
|            | `SiteFooter`           | Cocoa footer with columns, newsletter and small print                                                      | Emily Jane, Nectar                    |

## Conventions

- **Tones.** Tone-aware components take `tone` (`cherry`, `strawberry`, `blueberry`, `butter`, `pistachio`, `caramel`, `lavender`, `cocoa`, `cream`) and read the `--bbm-color-tone-*` tokens through `data-bbm-tone`, so every combination is AA.
- **Styling hooks.** Class names are BEM-style and prefixed (`.bbm-card`, `.bbm-card--sticker`). Pass `className` and `style` to any component; refs work as plain props (React 19).
- **Accessibility.** Native elements first (`<button>`, `<details>`, `<select>`, `<ol>`), visible focus rings in `border.focus`, 44px touch targets, decorative SVG hidden from assistive tech, and motion that stops under `prefers-reduced-motion`. The Marquee also has a pause button (WCAG 2.2.2).
- **Decoration frames content.** Patterns, edges and stickers never sit behind body text.

## Scripts

```bash
npm run build -w @bakesbymom/ui      # Vite ESM bundle + .d.ts + bundled CSS → dist/
npm run typecheck -w @bakesbymom/ui
npm test -w @bakesbymom/ui           # Vitest + Testing Library (jsdom)
```

## Adding a component

1. Create `src/components/Name/Name.tsx` and `Name.css`, using only `--bbm-*` tokens (semantic or component layer).
2. Import the CSS in `src/styles.css` and export the component and its props type from `src/index.ts`.
3. Add `stories/components/Name.stories.tsx` (Storybook picks it up with autodocs and the a11y panel).
4. Add a test for any behavior or ARIA wiring in `Name.test.tsx`.
5. Run `npm run check` at the repo root.
