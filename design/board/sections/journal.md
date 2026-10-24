# Journal (recipes and news)

**Pick: [01 · Berloga](../pins/01-berloga-coffeeshop.md), the blog row.** Three arch-shaped frames with cocoa outlines and offset shadows, under a script pill label.

## Why

It's the only blog layout on the board, and the arch shape is distinct from the menu cards (rounded rectangles) and reviews (scallops), so each kind of content has its own silhouette.

## Anatomy

```
                        ( journal )
  ╭──────────╮        ╭──────────╮        ╭──────────╮
 ╱  arch     ╲      ╱  arch     ╲      ╱  arch     ╲
│   photo     │    │   photo     │    │   photo     │
│             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘
 RECIPE               NEWS                RECIPE
 Mom's brown-butter   We're at the        The 3-ingredient
 cookies              Saturday market     shortbread
```

| Part | Spec | Tokens |
|---|---|---|
| Card | `ProductCard imageShape="arch"`, cocoa outline, 4px offset shadow | `radius.arch` |
| Kicker | Caps 12px (RECIPE, NEWS) | `text.brand` |
| Title | Fraunces 600 22px | — |
| Date | DM Sans 14px | `text.muted` |

3 up at desktop, 2 at tablet, a swipe row at phone.

## Component

`ProductCard imageShape="arch"`. See Storybook `Sections / Journal`.
