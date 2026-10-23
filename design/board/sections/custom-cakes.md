# Custom cakes and pricing

**Pick: [15 · Nectar](../pins/15-nectar-candy-cart.md), the events section.** A headline and three price shapes on the left; a taped, stickered photo on pink pinstripes on the right.

**For the full custom cakes page:** the key-tag package cards from [08 · Digital Wave](../pins/08-digital-wave-taplink.md).

## Why

Nectar's events block sells a service in one glance. It names the occasions, gives three prices in three playful shapes, and has one button. The photo side shows the product dressed up like a gift. [08](../pins/08-digital-wave-taplink.md)'s pricing cards suit a dedicated page where people compare packages.

## Anatomy (landing page block)

```
┌──────────────────────────────────┬─────────────────────────────────┐
│ BIRTHDAYS · WEDDINGS · SHOWERS    │ ║║║║║ pink pinstripe ║║║║║║║║║ │
│ Your party called.                │   ▬tape▬   ┌──────────┐ (seal) │
│ It wants cake!                    │           │  cake    │        │
│ Custom cakes in any flavor on     │           │  photo   │ ▬tape▬ │
│ the menu, decorated your way.     │           └──────────┘        │
│ ( $45 )  ✿$4✿  ☁$15☁              │        ◇ Baked for:          │
│ 6-inch   per     custom           │          your big day ◇      │
│ cake     cupcake message          │                               │
│ [ Plan your cake ]                │                               │
└──────────────────────────────────┴─────────────────────────────────┘
```

| Part | Spec | Tokens |
|---|---|---|
| Eyebrow | Occasions separated by middots, caps 14px | `text.brand` |
| Headline | Fraunces 600, `display-lg`, 2 lines | `text.primary` |
| Prices | Three `PriceTag`s, 120px: `scallop` (pink-300), `flower` (cherry-700, white text), `cloud` (blue-200) | tone tokens |
| Button | Primary "Plan your cake" | `action.primary` |
| Panel | `PatternSurface pattern="pinstripe"` pink on canvas | `pink-300` |
| Photo | Tilted 4°, white border, 2 tape strips in cherry at 70% opacity | `Polaroid` |
| Stickers | `Seal` "designed to delight", and a gift tag (`PriceTag shape="tag"`) on a ribbon | — |

## Package cards (custom cakes page)

From [08](../pins/08-digital-wave-taplink.md):

```
   ┌──( Little cake )──────────┐  ◇ $45
   │ ✱ 6-inch, 2 layers        │
   │ ✱ Serves 8–10             │
   │ ✱ Message in buttercream  │
   │ [ Choose this cake      ] │  full-width cherry button
   └───────────────────────────┘
```

Three cards: **Little cake**, **Party cake** and **Celebration tier** (the top one filled `blue-200`). Each has a pill title tab on the top border, an asterisk list, a hanging key-tag price and a full-width button.

## Accessibility

- Prices are text, not images: "$45 for a 6-inch cake".
- Rotation on photos and tags is static; the information never lives only on a tilted element.

## Components

`PriceTag shape="scallop" | "flower" | "cloud" | "tag"`, `Polaroid`, `Seal`, `PricingCard`. See Storybook `Sections / Custom cakes`.
