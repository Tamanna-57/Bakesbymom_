# Bake Club (subscription / loyalty)

**Pick: [01 · Berloga](../pins/01-berloga-coffeeshop.md), the loyalty band.** A pink band with outlined scallops top and bottom, a mascot doodle sitting on the top edge, a script pill label, a letter-style intro and steps.

**Inside it:** the membership ticket from [10 · Book Nook](../pins/10-book-nook-society.md).

**Alternate:** the scalloped club card from [15 · Nectar](../pins/15-nectar-candy-cart.md), on a baby blue band.

## Why

Three pins pitch a club or loyalty scheme: [01](../pins/01-berloga-coffeeshop.md), [10](../pins/10-book-nook-society.md) and [15](../pins/15-nectar-candy-cart.md). Berloga's band is the most inviting (it reads like a letter from the owner, which is exactly Mom's voice), while the [10](../pins/10-book-nook-society.md) ticket makes the perks feel like something you'd keep. Combined, they give the club a clear look that no other section uses.

## Anatomy

```
╭◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠ (🧁 doodle sits here) ◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠╮  outlined scallops
│                       ( bake club )                                │  pink-200 band
│                 Dear neighbors,                                    │
│      Every month Mom bakes a box of four seasonal treats…          │
│                                                                    │
│  ┌───────────────────────────────────┬────────┐                    │
│  │ BAKE CLUB · MEMBER PERKS            │ JUNE   │  ← ticket (blue)   │
│  │ ✱ A box of 4 seasonal treats        │ '26    │                    │
│  │ ✱ First pick of holiday orders      │        │                    │
│  │ ✱ Mom's recipe card every month     │        │                    │
│  └───────────────────────────────────┴────────┘                    │
│        $28 a month · skip or pause anytime     [ Join the club ]   │
╰◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡╯
```

| Part | Spec | Tokens |
|---|---|---|
| Band | `pink-200`, `EdgeDivider shape="scallop" outline` above and below | `bg.pink` |
| Mascot | A 96px `Doodle name="cupcake"` (or Mom's spoon) overlapping the top edge | — |
| Label | Pill eyebrow "bake club" | — |
| Letter | Fraunces italic 22px greeting + DM Sans 17px, max 60ch, centered | — |
| Ticket | `Ticket` with stub, `blue-200` fill, month on the stub | `bg.blue` |
| Price | DM Sans 700 18px, "a month" and the skip note in 15px | — |
| Button | Primary "Join the club" | `action.primary` |

## Component

`EdgeDivider`, `Ticket`, `Doodle`, `SectionHeading`. See Storybook `Sections / Bake Club`.
