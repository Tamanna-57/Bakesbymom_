# Process: how to order

**Pick: [02 · Pretty OK Studios](../pins/02-pretty-ok-mail-club.md), "How it works".** Four stacked, slightly tilted cards in different flavor colors, each with a sticker icon, on wide stripes.

**Alternates.**
- **Checkbox row:** [04 · Hopf Haus](../pins/04-hopf-haus-kitchen.md), for compact strips.
- **Numbered folder tabs:** [08 · Digital Wave](../pins/08-digital-wave-taplink.md), for long processes like planning a celebration cake.
- **Tabbed paper cards:** [10 · Book Nook](../pins/10-book-nook-society.md), for the Bake Club.
- **Stamp card:** [16 · SugarLace](../pins/16-sugarlace-bakery.md), for the menu page sidebar.

## Why

Six pins show a process in some form ([01](../pins/01-berloga-coffeeshop.md), [02](../pins/02-pretty-ok-mail-club.md), [04](../pins/04-hopf-haus-kitchen.md), [08](../pins/08-digital-wave-taplink.md), [10](../pins/10-book-nook-society.md), [16](../pins/16-sugarlace-bakery.md)), which tells you how much this board cares about explaining things. The [02](../pins/02-pretty-ok-mail-club.md) stack is the warmest: each step is its own colored object you could pick up, the tilt makes it feel hand-placed, and it holds a title and a sentence per step (more than [04](../pins/04-hopf-haus-kitchen.md)'s caps one-liners) without becoming a wall of text like [08](../pins/08-digital-wave-taplink.md)'s seven tabs.

## Anatomy

```
║▌▐▌▐▌▐▌▐▌▐ pink + canvas stripes ▌▐▌▐▌▐▌▐▌▐▌▐▌▐║
║            How to order                       ║  Fraunces 48px
║   ┌─────────────────────────────────┐ ↶ −2°    ║
║   │ (🍰)  Pick your bake              │  pink    ║
║   │       From the menu, or ask…      │          ║
║   └─────────────────────────────────┘          ║
║    ┌─────────────────────────────────┐ ↷ +2°   ║
║    │ (✦)  Choose a date               │  cocoa  ║
║    └─────────────────────────────────┘         ║
║   ┌─────────────────────────────────┐   0°     ║
║   │ (♡)  Pick it up warm              │  blue    ║
║   └─────────────────────────────────┘          ║
║   ┌─────────────────────────────────┐   0°     ║
║   │ (🍒) Share a slice                │  butter  ║
║   └─────────────────────────────────┘          ║
```

| Part | Spec | Tokens |
|---|---|---|
| Ground | `PatternSurface pattern="stripes"`, pink-200 on canvas, 64px stripes | `bg.canvas`, `pink-200` |
| Column | Centered, 640px max | `layout.content-narrow` |
| Card | 1.5px cocoa outline, 16px radius, 24px padding, rotation −2°, +2°, 0°, 0° (configurable), overlapping by −8px | `border.default`, `radius.lg` |
| Colors | pink → cocoa (canvas text) → blue → butter | tone tokens |
| Icon | Doodle in a 56px circle sticker on the left | `Doodle` |
| Title | Fraunces 600, 24px | — |
| Line | DM Sans 16px, one sentence | — |

## Copy (sample)

1. **Pick your bake.** Choose from this week's menu, or ask Mom for something special.
2. **Choose a date.** Order by Wednesday for Saturday; custom cakes need a week.
3. **Pick it up warm.** Saturday 9am–1pm from the porch, or at the market.
4. **Share a slice.** Tag @bakesbymom so Mom can see.

## Semantics and motion

- An `<ol>` of steps; the number is announced even though it's shown as an icon.
- The tilt is static. No hover wobble.
- On phones the rotation drops to ±1° and the cards don't overlap.

## Alternates in Storybook

| Variant | From | |
|---|---|---|
| `stack` | [02](../pins/02-pretty-ok-mail-club.md) | Lead |
| `row` | [04](../pins/04-hopf-haus-kitchen.md) | Checkboxes joined by a line, 3 or 4 steps |
| `tabs` | [08](../pins/08-digital-wave-taplink.md) | Numbered folder tabs, 5–7 steps |
| `cards` | [10](../pins/10-book-nook-society.md) | Paper cards with a pink "Step 1" tab |

## Component

`StepList variant="stack" | "row" | "tabs" | "cards"`. See Storybook `Sections / Process`.
