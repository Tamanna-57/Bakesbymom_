# Menu / products

**Pick: [16 · SugarLace Bakery](../pins/16-sugarlace-bakery.md), the "Fillings" section.** White menu cards in a 4 × 2 grid on a baby blue band, under a script title with cherry ribbons, with an allergy note.

**Borrowed pieces.**
- **Filter pills and category tile:** [13 · Puzzle Pantry](../pins/13-puzzle-pantry.md)
- **Patterned category frames:** [12 · September Sun](../pins/12-september-sun-candles.md)
- **Cherry category tiles:** [16](../pins/16-sugarlace-bakery.md)

**Alternates.**
- **Scrolling row with tabs:** [05](../pins/05-pretty-ok-studios-shop.md), for "This week's favorites"
- **Oval teaser:** [04](../pins/04-hopf-haus-kitchen.md)
- **Bestseller band:** [06](../pins/06-lilli-pilli-patisserie.md)

## Why

SugarLace is a cake shop, its menu cards hold exactly what a bake needs (photo, name, what's inside, price, a way in), and it's already baby blue, cream and cherry. The allergy note under the grid is a real customer need that no other pin covers.

## Anatomy

```
╔════════════════════════ baby blue band ════════════════════════╗
║ ▬▬ fresh this week • fresh this week   Menu   fresh this week ▬▬ ║  ribbons + script
║   ( All ) ( Cakes ) ( Cookies ) ( Pies ) ( Breads )               ║  filter pills
║ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                       ║
║ │ photo  │ │ photo  │ │ photo  │ │ photo  │                       ║
║ │Strawb. │ │Choc.   │ │Brown   │ │Sour    │                       ║
║ │layer   │ │fudge   │ │butter  │ │cherry  │                       ║
║ │what's  │ │inside… │ │…       │ │pie     │                       ║
║ │ (↗) $38│ │ (↗) $42│ │ (↗) $14│ │ (↗) $28│                       ║
║ └────────┘ └────────┘ └────────┘ └────────┘   × 2 rows            ║
║  ✱ Most bakes can be made gluten-, dairy- or nut-free. Ask Mom.   ║  note pill
╚═══════════════════════════════════════════════════════════════════╝
```

| Part | Spec | Tokens |
|---|---|---|
| Band | Full width, 96px vertical padding | `bg.blue` |
| Title | `SectionHeading variant="ribbon"`: Pinyon Script 96px "Menu" in cherry, two cherry ribbons with "fresh this week •" in 13px caps | `text.brand`, `cherry-700` |
| Filters | `FilterChips`; pressed chip = cherry fill and white text; others paper fill, cocoa outline | `action.primary` |
| Card | `ProductCard variant="menu"`: paper, 20px radius, 1.5px cocoa outline, 4px offset shadow on hover only | `bg.surface`, `border.default` |
| Photo | 4:3, 14px radius inside the card's 12px padding | — |
| Name | DM Sans 700, 18px | `text.primary` |
| Inside | DM Sans 15px, 3 lines max, "Vanilla sponge, strawberry jam, whipped buttercream" | `text.secondary` |
| Footer | Price pill right (cherry, white DM Sans 700 14px), arrow circle button left of it | `action.primary` |
| Note | Pill on paper with an asterisk doodle, 15px | `bg.surface` |

## Behavior

- The whole card is one link (the name is the link text; the arrow and price are inside it).
- Filters are toggle buttons with `aria-pressed`; the grid updates and a polite live region says "Showing 6 cakes".
- Sold-out bakes show a "Sold out this week" badge and the price pill turns quiet (beige).

## Responsive

4 up at desktop, 2 up at tablet, 1 up with the photo on the left at phone (automatic below 600px).

## Category tiles (home page teaser)

From [16](../pins/16-sugarlace-bakery.md): cherry tiles (cherry-700) with a darker cake silhouette, a white arrow circle top-right, and a heavy white label: "Celebration cakes", "Cookie boxes", "Pies", "Bread". On the menu page, category headers use the patterned frames from [12](../pins/12-september-sun-candles.md): pink gingham for cakes, beige dots for cookies, blue stripes for bread.

## Component

`ProductCard variant="menu"` (it turns horizontal by itself on phones; `layout="row"` forces it), `FilterChips`, `SectionHeading variant="ribbon"`. See Storybook `Sections / Menu` and `Pages / Menu`.
