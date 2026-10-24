# @bakesbymom/ui

React 19 components for Bakes by Mom, built only from [`@bakesbymom/tokens`](../tokens). Every component is documented with live controls in Storybook (`npm run storybook` at the repo root).

```tsx
import '@bakesbymom/ui/fonts.css'; // Fraunces, DM Sans, Pinyon Script, Caveat, Cherry Bomb One (Google Fonts)
import '@bakesbymom/ui/styles.css'; // tokens + component styles in one file
import { Button, ProductCard, Badge } from '@bakesbymom/ui';

export function Bestseller() {
  return (
    <ProductCard
      variant="menu"
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

Add `className="bbm-theme"` to `<body>` for the beige canvas, cocoa ink and body type. If you already load the token CSS yourself, import `@bakesbymom/ui/components.css` instead of `styles.css`.

## Components

Every component comes from the [bakesbymom board](../../design/board/README.md); the numbers are pins.

| Group      | Component              | What it's for                                                                                                   | Pins           |
| ---------- | ---------------------- | --------------------------------------------------------------------------------------------------------------- | -------------- |
| Primitives | `Button`               | Pill actions: `primary` (deep cherry, one per view), `secondary`, `soft`, `ghost`; `sticker`, `loading`, `href` | 08, 16, 01     |
|            | `Badge`                | Labels and stickers; `pill`, `tape` and `tab` shapes                                                            | 05, 07, 13     |
|            | `TextField` / `Select` | Pill inputs with linked label, hint and error; `multiline`                                                      | 03, 15         |
|            | `FilterChips`          | Toggle-button filter pills with `aria-pressed`, single or multiple                                              | 13             |
| Surfaces   | `Card`                 | Paper or tone, outline, `sticker`, rounded/scallop/cloud shapes, candy-stripe frame, thick cherry frame         | 01, 02, 05, 16 |
|            | `PatternSurface`       | Stripes (plain, dotted, wavy), pinstripe, gingham, checker, grid paper, polka dots                              | 09, 15, 02, 05 |
|            | `EdgeDivider`          | Scallop, wave, torn, dot and checker section edges                                                              | 01, 06, 08, 15 |
| Ephemera   | `Ticket`               | Membership ticket with stub, or perforated stamp                                                                | 10, 08, 16     |
|            | `Polaroid`             | Instant photo with tape and handwritten caption; scallop, pattern, flower and cartouche frames                  | 11, 05, 07     |
|            | `PriceTag`             | Scallop, flower, cloud, circle or key-tag prices                                                                | 15, 08         |
|            | `Seal`                 | Ring-text sticker, optional spin                                                                                | 03, 10         |
|            | `PricingCard`          | Package card with a pill title tab and a hanging key-tag price                                                  | 08             |
| Brand      | `Logo`                 | Wordmark: horizontal, stacked, seal or monogram                                                                 | 10, 16, 12     |
|            | `Doodle`               | Cherry, heart, sparkle, cupcake, whisk, bow, arrow, halftone cherries and more                                  | 15, 01, 16     |
| Content    | `ProductCard`          | Menu card (photo, what's inside, arrow and price pill), sold-out state; horizontal on phones                    | 16             |
|            | `ReviewCard`           | Scalloped review with name, quote, spoken star rating and a handwritten detail                                  | 01             |
|            | `SectionHeading`       | Eyebrow (text, pill or bracket) + title (`<em>` → script); `bubble`, `ribbon` and `stamp` variants              | 01, 16, 11     |
|            | `StepList`             | Ordered steps: tilted stack, checkbox row, folder tabs or cards                                                 | 02, 04, 08     |
|            | `Accordion`            | Native `<details>` FAQ: cards (two columns), pills or hairline rows                                             | 02, 08, 01     |
|            | `Marquee`              | Ribbon ticker, one or two rows, tilt, badge; accessible and pausable                                            | 02, 07, 04, 11 |
|            | `Gallery`              | Expanding photo strips (keyboard and drag), trio or grid                                                        | 01, 11, 12     |
|            | `Orbit`                | A center photo with satellites on an orbit line and arc text                                                    | 01             |
|            | `WeekSchedule`         | Where to find Mom this week, today highlighted, map links                                                       | 15             |
|            | `NewsletterSignup`     | Card, bar or inline signup with sending, done and error states                                                  | 03, 15         |
|            | `ChatWidget`           | "Ask Mom" chat: seal launcher, dialog with focus management, quick replies, live log, human handoff             | 08, 10, 01, 15 |
| Sections   | `SiteHeader`           | Announcement, split/center/start logo, bar or capsule, scalloped edge, mobile menu                              | 15, 13, 03     |
|            | `Hero`                 | Grid-paper, band, sticker or photo opener with a handwritten note and doodles                                   | 15, 06, 07, 13 |
|            | `SiteFooter`           | Cocoa footer: columns, centered logo with socials and contact, newsletter, small print                          | 03, 04, 06     |

## Conventions

- **Tones.** Tone-aware components take `tone` (`blue`, `pink`, `beige`, `cherry`, `brown`, `butter`, `matcha`) and read the `--bbm-color-tone-*` tokens through `data-bbm-tone`, so every combination is AA.
- **Styling hooks.** Class names are BEM-style and prefixed (`.bbm-card`, `.bbm-card--sticker`). Pass `className` and `style` to any component; refs work as plain props (React 19).
- **Accessibility.** Native elements first (`<button>`, `<details>`, `<select>`, `<ol>`), visible focus rings in `border.focus`, 44px touch targets, decorative SVG hidden from assistive tech, and motion that stops under `prefers-reduced-motion`. The Marquee has a pause button (WCAG 2.2.2); the chat panel moves focus in and back out and announces new messages.
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
