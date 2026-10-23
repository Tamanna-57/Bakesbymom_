# Newsletter

**Pick: [03 · Emily Jane](../pins/03-emily-jane-author.md).** A centered paper card with a tilted sticker on its corner, sitting on a patterned band with a scalloped top edge.

**Inline version:** the pill bar from [15 · Nectar](../pins/15-nectar-candy-cart.md), used under the weekly schedule.

## Why

The Emily Jane card makes signing up feel like a small gift (the sticker, the sparkle, the pattern) while keeping the form short: name, email, one button. The Nectar bar is the same promise in one line where space is tight.

## Card anatomy

```
◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠◠  scallop into the band
· ● · ● · ● · butter + cocoa dots · ● · ● · ●
· ●  ┌▚sticker┐────────────────────────┐ ● ·
● ·  │   Mom's Monday letter      ✦    │ · ●
· ●  │   This week's menu, the market  │ ● ·
● ·  │   schedule and one recipe card. │ · ●
· ●  │   [Name] [Email] [ Sign me up ] │ ● ·
● ·  └─────────────────────────────────┘ · ●
```

| Part | Spec | Tokens |
|---|---|---|
| Band | `PatternSurface pattern="dots"` (cocoa dots at 12% opacity on `butter-200`), scallop top edge | `bg.butter` |
| Card | Paper, 24px radius, 1.5px cocoa outline, 4px offset shadow, 560px max | `bg.surface` |
| Sticker | `Badge shape="tape"` or the Bake Club seal, rotated −8°, over the top-left corner | — |
| Title | Fraunces 600 32px | — |
| Body | DM Sans 17px, one sentence saying exactly what arrives and how often | — |
| Form | Name and email `TextField`s and a primary button, in one row at desktop | `Field` |
| Confirmation | Replaces the form: "You're on the list! Look out for Monday's letter." with a heart doodle | `status.success` |

## Bar anatomy (inline)

`( PSST! Get Mom's schedule every Monday   [ email ]  [ Sign up ] )` on `pink-300`, a 999px radius, 12px padding.

## Accessibility

- Visible labels, even if visually small, plus `autocomplete="email"` and `type="email"`.
- Errors appear under the field and are linked with `aria-describedby`; the sending state disables the button with text "Signing you up…".

## Component

`NewsletterSignup variant="card" | "bar"`. See Storybook `Sections / Newsletter`.
