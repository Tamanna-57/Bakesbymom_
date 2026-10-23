# Navbar (announcement bar + site header)

**Picks.**
- **Nav:** [15 · Nectar](../pins/15-nectar-candy-cart.md), with links split around a centered logo and a scalloped pink edge.
- **Announcement bar and icon zone:** [13 · Puzzle Pantry](../pins/13-puzzle-pantry.md).
- **Mobile capsule:** [03 · Emily Jane](../pins/03-emily-jane-author.md).

## Why

| Candidate | Strength | Why not the lead |
|---|---|---|
| [15 Nectar](../pins/15-nectar-candy-cart.md) | Centered wordmark with balanced links, pink with a scalloped edge, cherry type: playful and in palette | — |
| [13 Puzzle Pantry](../pins/13-puzzle-pantry.md) | Clear three zones, icons right, an announcement bar | Butter bar, flat edge; we keep its announcement and icons |
| [03 Emily Jane](../pins/03-emily-jane-author.md) | A floating capsule that feels like a sticker | Too narrow for 4 links plus icons at desktop; ideal on mobile |
| [12 September Sun](../pins/12-september-sun-candles.md) | Lots of links | Too many items for a home bakery |
| [04 Hopf Haus](../pins/04-hopf-haus-kitchen.md), [06 Lilli Pilli](../pins/06-lilli-pilli-patisserie.md) | Solid bar, logo left | Generic; caramel and green aren't in the palette |

## Anatomy (desktop)

```
┌──────────────────────────────────────────────────────────────┐
│       Order by Wednesday for Saturday pick-up  →             │ cocoa, 36px
├──────────────────────────────────────────────────────────────┤
│  MENU   CUSTOM CAKES        Bakes by Mom      FIND US   BAKE CLUB   (🔍) (🧺 2) │ pink, 80px
└◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠┘ scallops
```

| Part | Spec | Tokens |
|---|---|---|
| Announcement | One line, centered, 14px DM Sans 500, link arrow, dismissible only if it's not critical | `bg.inverse`, `text.inverse` |
| Bar | 80px tall at desktop, 64px at phone | `color.bg.pink` (`pink-200`) |
| Links | Uppercase DM Sans 600, 14px, letter-spacing 0.08em, 2 each side of the logo; the current page gets a 2px cherry underline offset 6px | `text.primary`, `text.brand` on hover |
| Logo | The horizontal Bakes by Mom wordmark, 40px tall, centered | `text.brand` |
| Icons | Search and the order box as 44px circular icon buttons, outlined; the order box shows a count badge in cherry | `border.default`, `action.primary` |
| Edge | 12px scallops along the bottom, same pink, with no outline | `EdgeDivider shape="scallop"` |

## States

- **Scrolled.** After 120px of scroll the bar shrinks to the capsule ([03](../pins/03-emily-jane-author.md)): inset 12px from the edges, fully rounded, outlined, with a 3px offset shadow. The announcement scrolls away.
- **Current page.** Cherry underline plus `aria-current="page"`.
- **Order box.** Count updates are announced politely ("2 items in your order box").

## Mobile (<768px)

```
┌───────────────────────────────────────────┐
│ ( ☰ )       Bakes by Mom         ( 🧺 2 ) │  capsule, pink, outlined
└───────────────────────────────────────────┘
```

- The menu button opens a full-width sheet under the capsule on canvas: links stacked at 20px, then "Order a cake" as a full-width primary button, then the Instagram link.
- The button has `aria-expanded` and `aria-controls`; Escape closes the sheet and returns focus to the button.

## Component

`SiteHeader` with `layout="split"`, `edge="scallop"`, `announcement`, `actions` (icon buttons), and `capsuleOnScroll`. See Storybook `Sections / Navbar`.
