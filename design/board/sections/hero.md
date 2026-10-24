# Hero

**Pick: [15 · Nectar](../pins/15-nectar-candy-cart.md), the grid-paper hero.** A big serif headline on the left, a cutout cake on the right, one handwritten note with a loopy arrow between them, and a few doodles. The star seam is borrowed from [11 · Stevie Kay](../pins/11-stevie-kay-showit.md).

**Alternates.**
- **Band hero:** [06 · Lilli Pilli](../pins/06-lilli-pilli-patisserie.md), for seasonal campaigns.
- **Sticker hero:** [07 · Croissant Lab](../pins/07-croissant-lab-landing.md), for launches.
- **Photo hero:** [13 · Puzzle Pantry](../pins/13-puzzle-pantry.md), when there's a great wide photo.

## Why

The grid-paper hero says "made by a person" (handwriting, doodles, recipe-notebook paper) while staying very readable: dark serif on cream, one button, one product. It works without professional photography; a single cutout cake is enough. The photo heroes on the board ([11](../pins/11-stevie-kay-showit.md), [12](../pins/12-september-sun-candles.md), [13](../pins/13-puzzle-pantry.md)) all put light text over busy photos and fail contrast.

## Anatomy (desktop)

```
┌──────────────────────────────────────────────────────────────┐
│ ░ grid paper ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 🍒 ░ │
│  (BAKED IN MOM'S KITCHEN)                                    │
│  Homemade cakes,                       ┌──────────────┐      │
│  still warm  ← script                  │  cutout cake │  ♡   │
│  from Mom's oven.                      └──────────────┘      │
│  Cakes, cookies and pies baked to   ↺→  "made with real      │
│  order, ready for Saturday pick-up.        butter!"          │
│  [ Order a cake ]  [ See the menu ]                    ✦     │
└──────────✦──────────────✦──────────────✦─────────────────────┘ star seam
```

| Part | Spec | Tokens |
|---|---|---|
| Ground | `PatternSurface pattern="grid"`, pink lines (`pink-300`) at 32px on canvas | `bg.canvas` |
| Eyebrow | In brackets, uppercase DM Sans 600, 14px, tracked | `text.brand` |
| Headline | Fraunces 600, `display-xl` (fluid 48–88px), 3 lines max; one phrase in `<em>` renders in Pinyon Script, cherry | `text.primary`, `text.brand` |
| Lead | DM Sans 20px, 2 lines, max 46ch | `text.secondary` |
| Buttons | Primary "Order a cake" + secondary "See the menu" | `action.primary` |
| Media | One cutout PNG/WebP cake, about 45% width, slight −4° tilt, soft blob behind in pink-200 | — |
| Note | Caveat 28px, cherry, rotated −6°, with the hand-drawn arrow doodle pointing to the cake | `text.brand` |
| Doodles | 4–5 from the set (cherry, heart, sparkle, cupcake), scattered in the empty corners, `aria-hidden` | `pink-400`, `cherry-500` |
| Star seam | 3 sparkle doodles overlapping the bottom edge (from [11](../pins/11-stevie-kay-showit.md)) | `cherry-500` |

## Copy (sample)

- Eyebrow: (BAKED IN MOM'S KITCHEN)
- Headline: Homemade cakes, *still warm* from Mom's oven.
- Lead: Cakes, cookies and pies baked to order every week, ready for Saturday pick-up.
- Note: made with real butter!

## Responsive

- **Tablet.** Text and media stay side by side at 55/45; the note hides if it would overlap text.
- **Phone.** Text first, then the cake; the arrow points down; doodles reduce to 2; buttons go full width.

## Accessibility

- The cake image has real alt text ("Strawberry layer cake with pink buttercream and fresh berries").
- The note is decorative and duplicated in the lead, so it's `aria-hidden`.
- The tilt on the cake stays static.

## Alternates

| Variant | From | Use when |
|---|---|---|
| `band` | [06](../pins/06-lilli-pilli-patisserie.md) | Seasonal campaign: a cherry or blue panel between stripe bands, centered headline, a seal on the headline, two floating photos |
| `stickers` | [07](../pins/07-croissant-lab-landing.md) | Launching a new bake: a cutout on a pink blob covered in promise stickers ("real butter", "baked this morning") |
| `photo` | [13](../pins/13-puzzle-pantry.md) | There's a great wide photo: the text sits on a cocoa scrim card so contrast holds |

## Component

`Hero variant="paper" | "band" | "stickers" | "photo"`. See Storybook `Sections / Hero`.
