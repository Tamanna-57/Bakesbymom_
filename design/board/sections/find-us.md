# Find us this week

**Pick: [15 · Nectar](../pins/15-nectar-candy-cart.md), "Where to catch the cart this week".** A seven-day schedule on a notebook card, inside the page's one bright cherry band, followed by a newsletter bar.

**Alternates.**
- **Fixed pick-up spot:** [06 · Lilli Pilli](../pins/06-lilli-pilli-patisserie.md) "Visit us", with address, hours and directions.
- **Stockists:** [12 · September Sun](../pins/12-september-sun-candles.md) "Find us near you", a list of cafés that stock Mom's bakes.

## Why

A home bakery's biggest question is "when and where can I get it?". The Nectar schedule answers it at a glance for a whole week, and it's honest about days with nothing on. It also gives the page its one loud cherry moment.

## Anatomy

```
███████████████████ bright cherry band (cherry-500) ███████████████████
█  ┌─○──○──○──○──○──○──○──○──○──○──○──○──○──○──○──○──○──○──┐  █
█  │          WHERE TO FIND MOM                               │  █
█  │              this week                                   │  █
█  │ ┌──────┬──────┬──────┬──────┬──────┬──────┬──────┐       │  █
█  │ │MON 12│TUE 13│WED 14│THU 15│FRI 16│SAT 17│SUN 18│       │  █
█  │ │██████│  🍪   │  🧺   │  ☕   │      │  🧁   │██████│       │  █
█  │ │Closed│Cookie│Porch │Café  │Baking│Farm- │Closed│       │  █
█  │ │      │drop  │pick- │drop  │day   │ers'  │      │       │  █
█  │ │      │4–6pm │up    │…     │      │market│      │       │  █
█  │ └──────┴──────┴──────┴──────┴──────┴──────┴──────┘       │  █
█  │                 [ Get directions ]                       │  █
█  └──────────────────────────────────────────────────────────┘  █
█  ( PSST! Get Mom's schedule every Monday  [email] [Sign up] )   █
████████████████████████████████████████████████████████████████████
```

| Part | Spec | Tokens |
|---|---|---|
| Band | Full width, 80px padding | `bg.brand` (`cherry-500`) |
| Card | Paper, 24px radius, 1.5px cocoa outline, a row of 14px circles along the top edge (notebook holes) | `bg.surface` |
| Title | Eyebrow "WHERE TO FIND MOM" in caps + "this week" in Pinyon Script | `text.brand` |
| Day cell | Day and date (DM Sans 700 caps 13px), icon doodle 32px, place as a link (16px, underlined), time (14px) | `text.primary` |
| Closed day | Filled `cherry-800`, white "Closed" | `cherry-800` |
| Today | Pink fill, a hand-drawn circle doodle, and the word "Today" in the cell | `pink-200` |
| Grid lines | 1.5px cocoa | `border.default` |
| Newsletter bar | Pink pill, caps message, inline email field + cherry button | [newsletter.md](./newsletter.md) |

## Semantics

- An `<ol>` of 7 days, each a list item with an `<h3>` for the day ("Saturday 17 May").
- The highlight is never color only: today's cell says "Today".
- Place names link to a map in a new tab, with the link text saying so ("Farmers' market, opens map").

## Responsive

7 columns at desktop → 4 + 3 at tablet → a vertical list at phone, where each day is a row (day on the left, details on the right) and closed days collapse to one line.

## Component

`WeekSchedule days=[{ date, label, place, href, time, icon, closed, today }]`. See Storybook `Sections / Find us`.
