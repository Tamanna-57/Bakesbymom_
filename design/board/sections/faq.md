# FAQ

**Pick: [02 · Pretty OK Studios](../pins/02-pretty-ok-mail-club.md).** Two columns of pink question cards, each outlined, with a sticker doodle on the left and a plus on the right, under a centered serif title.

**Alternates.**
- **Pill rows with an arrow circle:** [08 · Digital Wave](../pins/08-digital-wave-taplink.md), used inside the chatbot.
- **Hairline rows with side photos:** [01 · Berloga](../pins/01-berloga-coffeeshop.md), used for "This week's specials".

## Why

Questions as separate, friendly cards are easier to scan than one long list, and two columns keep eight questions above the fold at desktop. The sticker doodles make each question recognisable at a glance.

## Anatomy

```
                         Questions? Mom's got answers.
┌──────────────────────────────────┐  ┌──────────────────────────────────┐
│ (📅) How far ahead should I order? + │  │ (🌾) Do you do gluten-free?     + │
└──────────────────────────────────┘  └──────────────────────────────────┘
┌──────────────────────────────────┐  ┌──────────────────────────────────┐
│ (🚗) Do you deliver?               − │  │ (🎂) Can I get a custom design? + │
│  Within 5 miles for $8; free on   │  └──────────────────────────────────┘
│  orders over $60.                 │
└──────────────────────────────────┘
```

| Part | Spec | Tokens |
|---|---|---|
| Title | Fraunces 600 40px, centered, one `<em>` word in script | — |
| Row | `pink-200` fill (the pink tone), 1.5px cocoa outline, 16px radius, 20px × 24px padding, 12px gap | `tone.pink` |
| Icon | 32px doodle on the left | `Doodle` |
| Question | DM Sans 600 17px | `text.primary` |
| Toggle | Plus / minus, 24px, right | — |
| Answer | DM Sans 16px, inside the card, max 60ch | `text.secondary` |

## Behavior

- Native `<details>` / `<summary>` so it works without JavaScript; one open at a time per column (`name` attribute).
- Columns stack independently, so an open card only pushes its own column down.
- One column below 900px.

## Questions to cover

How far ahead to order · gluten-, dairy- and nut-free options · allergens in the kitchen · delivery and pick-up · custom designs · paying and deposits · cancelling · gift orders · Bake Club pausing.

## Component

`Accordion variant="cards" columns={2}`. See Storybook `Sections / FAQ`.
