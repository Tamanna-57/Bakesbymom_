# Gallery

**Pick: [01 · Berloga](../pins/01-berloga-coffeeshop.md) (also saved as [14](../pins/14-berloga-coffeeshop-repost.md)), the strip gallery** under a huge bubble title.

**Alternates.**
- **Trio on cocoa:** [11 · Stevie Kay](../pins/11-stevie-kay-showit.md), with a bubble marquee across the top, for a short "this week in the kitchen" strip.
- **Instagram strip:** [12 · September Sun](../pins/12-september-sun-candles.md), above the footer.

## Why

The strip gallery is the most memorable piece on the board, and the only design saved twice. It fits a lot of photos into one row without a grid of thumbnails, invites play (click, drag) and gives the page a bold typographic moment with `GALLERY`. It works with phone photos because the strips crop hard.

## Anatomy

```
              ╭─────────────────────────────╮
               G A L L E R Y   ← bubble font, outline + offset shadow
              ╰─────────────────────────────╯
┌──┐┌──┐┌──┐┌──┐┌───────────────────────────┐┌──┐┌──┐┌──┐┌──┐
│░░││░░││░░││░░││                           ││░░││░░││░░││░░│
│░░││░░││░░││░░││     open photo, color     ││░░││░░││░░││░░│
│░░││░░││░░││░░││                           ││░░││░░││░░││░░│
│░░││░░││░░││░░││                    (DRAG) ││░░││░░││░░││░░│
└──┘└──┘└──┘└──┘└───────────────────────────┘└──┘└──┘└──┘└──┘
  greyscale strips                               greyscale strips
              Caption: "Saturday's strawberry layer cake"
```

| Part | Spec | Tokens |
|---|---|---|
| Title | `SectionHeading variant="bubble"`: bubble font 120px (fluid 64–140), canvas fill, 3px cocoa outline, 6px cocoa offset shadow | `font.family.bubble` |
| Row | 480px tall at desktop, 12px gaps | `space` |
| Strips | 16px radius, 1.5px cocoa outline; closed strips are 4–5% wide and greyscale (`filter: grayscale(1)`), the open strip is about 45% | `radius.lg` |
| Hover / focus | A closed strip regains color and widens slightly | `motion.duration.base` |
| Drag chip | 56px pink circle with "DRAG" in caps, on the open photo's corner; it's a hint only | `pink-300` |
| Caption | Under the row, Caveat 24px, cherry | `text.brand` |

## Interaction and accessibility

- Each strip is a `<button>` labelled with the photo's alt text; the open one has `aria-expanded="true"` and its caption is linked with `aria-describedby`.
- Arrow keys move between strips; Enter or Space opens one.
- The open state changes width and color, so it's never color only.
- Width transitions are skipped under `prefers-reduced-motion`.
- Below 768px the row becomes a horizontal scroll-snap carousel with every photo in color, plus previous and next buttons; the "DRAG" chip becomes "SWIPE".

## Content

8–12 photos: bakes, Mom's hands, the kitchen, the market stall, happy customers (with permission). Each photo needs alt text that says what's in it.

## Alternates

| Variant | From | |
|---|---|---|
| `strips` | [01](../pins/01-berloga-coffeeshop.md) | Lead |
| `trio` | [11](../pins/11-stevie-kay-showit.md) | Three photos on a cocoa band, the center one taller, with `Marquee variant="bubble"` in pink across the top |
| `grid` | [12](../pins/12-september-sun-candles.md) | 6 squares edge to edge with a "Follow @bakesbymom" link |

## Component

`Gallery variant="strips" | "trio" | "grid" items=[{ src, alt, caption }]`. See Storybook `Sections / Gallery`.
