# Reviews

**Pick: [01 · Berloga](../pins/01-berloga-coffeeshop.md).** Four scalloped pink cards with a cocoa outline and offset shadow, each with a name, a short quote and stars, under a script pill label, with previous and next arrows.

**Alternates.**
- **Founder or customer quote card with a flower avatar:** [07 · Croissant Lab](../pins/07-croissant-lab-landing.md), for one featured review.
- **Kind words in columns:** [12 · September Sun](../pins/12-september-sun-candles.md); recolored, because the original white-on-olive fails contrast.

## Why

The scalloped cards look like iced biscuits, which suits a bakery, and they keep each review short. The pill label (`reviews`) matches the board's section-eyebrow device.

## Anatomy

```
                 ( reviews )                      ← →
╭◠◠◠◠◠◠◠◠◠◠╮ ╭◠◠◠◠◠◠◠◠◠◠╮ ╭◠◠◠◠◠◠◠◠◠◠╮ ╭◠◠◠◠◠◠◠◠◠◠╮
(  PRIYA S.  ) (  MARCUS T. ) (  ANA & LUIS ) (  HANNAH R. )
( "Tasted     ) ( "Ordered    ) ( "The cinna- ) ( "She made   )
(  exactly…"  ) (  cupcakes…" ) (  mon rolls" ) (  a gluten…" )
(  ★★★★★      ) (  ★★★★★      ) (  ★★★★★      ) (  ★★★★★      )
╰◡◡◡◡◡◡◡◡◡◡╯ ╰◡◡◡◡◡◡◡◡◡◡╯ ╰◡◡◡◡◡◡◡◡◡◡╯ ╰◡◡◡◡◡◡◡◡◡◡╯
```

| Part | Spec | Tokens |
|---|---|---|
| Label | `SectionHeading eyebrowStyle="pill"`: Caveat 28px in an outlined oval | `border.default` |
| Card | `ReviewCard shape="scallop"`, `pink-200` fill (alternate blue-200 and butter-200 for variety), 1.5px cocoa outline, 4px cocoa offset shadow | tone tokens |
| Name | DM Sans 700 caps 13px | — |
| Quote | DM Sans 16px, 3–4 lines max | `text.primary` |
| Stars | 5 cocoa stars, spoken as "Rated 5 out of 5" | — |
| What they bought | Caveat 20px under the stars ("Birthday cupcakes") | `text.brand` |
| Arrows | 44px outlined circle buttons, top-right | — |

## Behavior

- A scroll-snap row with the arrows scrolling by one card; at desktop all 4 show.
- Each review is a `<figure>` with a `<blockquote>` and a `<figcaption>`.
- Reviews are real, with permission; never invented.

## Component

`ReviewCard`. See Storybook `Sections / Reviews`.
