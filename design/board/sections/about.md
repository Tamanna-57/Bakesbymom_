# About: Meet Mom and our story

**Pick: [05 · Pretty OK Studios](../pins/05-pretty-ok-studios-shop.md), "Meet Elia".** A scalloped photo frame on a polka-dot square, beside a tilted note card with a candy-striped border.

**Our-story block (About page):** **Bake it with Mom** (see below). The orbit from [01 · Berloga](../pins/01-berloga-coffeeshop.md) is kept in Storybook as an alternate.

**Values row:** the two value cards from [05](../pins/05-pretty-ok-studios-shop.md).

**Alternates.**
- **Outlined about card:** [16 · SugarLace](../pins/16-sugarlace-bakery.md), with a heavy + script title and halftone cherries.
- **Meet card with a photo stack and signature:** [03 · Emily Jane](../pins/03-emily-jane-author.md).
- **Welcome split:** [04 · Hopf Haus](../pins/04-hopf-haus-kitchen.md).
- **Founder quote card:** [07 · Croissant Lab](../pins/07-croissant-lab-landing.md).

## Why

"Bakes by Mom" is a person, so the About section has to feel like meeting her. Of the eight about or founder layouts on the board ([03](../pins/03-emily-jane-author.md), [04](../pins/04-hopf-haus-kitchen.md), [05](../pins/05-pretty-ok-studios-shop.md), [06](../pins/06-lilli-pilli-patisserie.md), [07](../pins/07-croissant-lab-landing.md), [12](../pins/12-september-sun-candles.md), [13](../pins/13-puzzle-pantry.md), [16](../pins/16-sugarlace-bakery.md)), [05](../pins/05-pretty-ok-studios-shop.md) is the most personal: the photo is framed like a cookie, the note looks handwritten and pinned, and it stays short. The signature idea is taken from [03](../pins/03-emily-jane-author.md).

## Anatomy: Meet Mom

```
┌────────────────────────────────┬───────────────────────────────────┐
│ ● · ● · ● blue polka dots · ●  │   ╔═▚▚▚▚ candy-stripe border ▚▚▚═╗ │
│ · ╭◠◠◠◠◠◠◠◠◠◠◠◠◠◠╮ ✦            │   ║ THE BAKER BEHIND IT ALL       ║ │  tilted −2°
│ ● (  Mom's photo,  ) ·          │   ║ Hi, I'm Mom.                  ║ │
│ · (  scalloped     ) ●          │   ║ I've been baking for our      ║ │
│ ● ╰◡◡◡◡◡◡◡◡◡◡◡◡◡◡╯ ✦            │   ║ family for 30 years…          ║ │
│ · ● · ● · ● · ● · ● · ● · ● ·   │   ║ with love, Mom  ← script      ║ │
│                                 │   ║ [ Read our story ]            ║ │
└────────────────────────────────┴───╚═══════════════════════════════╝─┘
```

| Part | Spec | Tokens |
|---|---|---|
| Photo ground | Square of `PatternSurface pattern="dots"`, cocoa dots on `blue-200`, 24px larger than the photo on all sides | `bg.blue` |
| Photo | `Polaroid frame="scallop"`, 1.5px cocoa outline | `border.default` |
| Doodles | 2 big sparkles in `blue-400` overlapping the photo corners | `Doodle` |
| Note card | `Card frame="stripes"` in cherry and canvas, 16px border, rotated −2°, paper fill | `bg.surface` |
| Eyebrow | Caps 13px, tracked | `text.brand` |
| Title | Fraunces 600, 36px | — |
| Body | DM Sans 17px, max 4 short paragraphs | `text.secondary` |
| Signature | Pinyon Script 40px "with love, Mom" | `text.brand` |
| Button | Secondary "Read our story" | — |

## Anatomy: Bake it with Mom (About page)

The story as a cake you bake with Mom. The old page said "began as a hobby in a home kitchen" five times and never told a story; this tells it once, one line per step, while you do something.

- **One pinned kitchen**, framed like a window (thick cocoa outline, hard shadow). Scrolling walks six steps, 80% of a screen each.
- **The light is the clock.** The site's band colours make the day: blue dawn (6 am), bright noon, butter afternoon, pink sunset, cocoa night (9 pm). The sun crosses the window, then the moon, stars and the pendant lamp come on.
- **Steps:** measure (flour piles up with the scroll) · eggs (tap the egg and Mom's hand, in gold bangles, takes it: "Not in my kitchen, beta", the eggless promise) · mix (flour turns to batter) · bake (a real 5-second timer, then DING) · decorate (type a name, it's piped on in icing) · box it (lid, ribbon, a "for Riya" tag, and a WhatsApp button with the name already in the message).
- **Card:** time · step, Fraunces title, a scroll hint, Mom's line in Caveat beside her portrait. The step rail jumps to any step; "Skip ahead" jumps past.
- **Reduced motion:** the same six steps as a still, illustrated recipe card.
- **Copy:** `apps/web/src/content/story.ts`. Mom's lines are built from what the site already says; replace them with her real details (first cake, the year, the order that made it a business).

## Anatomy: Our story orbit (alternate)

From [01](../pins/01-berloga-coffeeshop.md): a 360px center photo of Mom's kitchen, arc text "Every bake is a little bit of home", a tilted ellipse with 5 satellite photos (cookies, pie, bread, cupcakes, Mom's hands). Underneath: 2 sentences and a button "Find us this week".

## Values row

Two `Card`s from [05](../pins/05-pretty-ok-studios-shop.md), each with a centered doodle sticker, Fraunces title and one line:
- **Made from scratch** (blue, whisk). "No mixes, no shortcuts: flour, butter, sugar, time."
- **Real butter, real eggs** (pink, heart). "The same ingredients Mom uses at home."

## Responsive

The split stacks: photo first, note below with rotation reduced to −1°. The orbit's satellites shrink and two of them hide below 480px.

## Components

`Polaroid frame="scallop"`, `PatternSurface`, `Card frame="stripes"`, `Orbit`. See Storybook `Sections / About`.
