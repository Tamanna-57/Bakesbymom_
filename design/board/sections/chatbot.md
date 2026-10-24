# Chatbot: Ask Mom

No pin on the board shows a chatbot. Rather than invent a look, the chat is assembled from board pieces that already do the same job:

| Chat part | Board piece | From |
|---|---|---|
| Launcher | A round seal sticker with ring text, overlapping the page corner | [10 · Book Nook](../pins/10-book-nook-society.md) |
| Opening message | The stamp-edged "Write to us" support card | [08 · Digital Wave](../pins/08-digital-wave-taplink.md) |
| Quick questions | Blue pill rows with an arrow in a circle | [08 · Digital Wave](../pins/08-digital-wave-taplink.md) |
| Mom's messages | Paper bubbles with a cocoa outline and offset shadow, like the scalloped review cards | [01 · Berloga](../pins/01-berloga-coffeeshop.md) |
| Your messages | Cherry pills with white text, like the board's buttons | [08](../pins/08-digital-wave-taplink.md), [15](../pins/15-nectar-candy-cart.md) |
| Panel header | A pink bar with a scalloped bottom edge, like the nav | [15 · Nectar](../pins/15-nectar-candy-cart.md) |

## What it's for

Answering the questions people ask before ordering (dates, allergies, delivery, custom cakes, the Bake Club), pointing to the right page, and handing over to a real person when it can't help. The design system ships the interface; the answers come from whatever the site connects it to (an FAQ lookup, a form, or an assistant service).

## Anatomy

```
                                   ┌───────────────────────────────┐
                                   │  ( ♡ )  Ask Mom          ( × )│  pink header
                                   └◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡◡┘
                                   │ ┌▚▚ stamp edge ▚▚▚▚▚▚▚▚▚▚▚▚┐  │
                                   │ │ Not sure what to order?    │  │  opening card
                                   │ │ Ask me anything about      │  │
                                   │ │ cakes, dates or allergies. │  │
                                   │ └▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚┘  │
                                   │ ( How far ahead should I order? (→) ) │  quick questions
                                   │ ( Do you do gluten-free?       (→) ) │
                                   │ ( Can I order a custom cake?   (→) ) │
                                   │ ┌────────────────────────┐       │
                                   │ │ Order by Wednesday for │ Mom   │  Mom's bubble
                                   │ │ Saturday pick-up…      │       │
                                   │ └────────────────────────┘       │
                                   │            ( Do you deliver? ) │  your bubble
                                   │ ┌──────────────────────┐ (➤)  │
                                   │ │ Type your question…   │      │  composer
                                   │ └──────────────────────┘       │
                                   └───────────────────────────────┘
                                                      ╭─────────╮
                                                      │ ASK MOM │  ← seal launcher
                                                      │    ♡    │     (rotating ring text)
                                                      ╰─────────╯
```

| Part | Spec | Tokens |
|---|---|---|
| Launcher | 88px round seal, cherry fill, ring text "ASK MOM • ASK MOM •" in white, a heart in the middle, fixed 24px from the bottom-right; the ring turns slowly (stops under reduced motion) | `action.primary` |
| Panel | 380px wide, up to 600px tall, paper, 24px radius, 1.5px cocoa outline, 6px cocoa offset shadow | `bg.surface` |
| Header | `pink-200` with scalloped bottom edge, avatar doodle, title "Ask Mom" in Fraunces 600 20px, a close button | `bg.pink` |
| Opening card | `Ticket variant="stamp"` with 2 sentences | — |
| Quick questions | Full-width `blue-200` pills, question left, 28px arrow circle right; they disappear after the first message | `bg.blue` |
| Mom's bubble | Paper, cocoa outline, 3px offset shadow, 16px radius with the bottom-left corner 4px, "Mom" label in Caveat | `bg.surface` |
| Your bubble | `cherry-700`, white text, 16px radius with the bottom-right corner 4px | `action.primary` |
| Typing | Three dots in a Mom bubble, pulsing (static under reduced motion) | — |
| Composer | `TextField` with a round cherry send button | `Field` |
| Hand-off | "Talk to a real person" link that opens the contact form or email | `text.link` |

## Behavior and accessibility

- The launcher is a `<button>` with `aria-expanded` and `aria-controls`.
- The panel is a non-modal `role="dialog"` labelled by its title.
- Opening moves focus to the composer; Escape or the close button closes it and returns focus to the launcher.
- Messages live in a `role="log"` region with `aria-live="polite"`, so new replies are announced.
- Quick questions are buttons that send their text.
- On phones the panel opens as a full-width sheet from the bottom (90vh), and the launcher shrinks to 64px.
- The chat never stores anything by itself; the host app decides.

## Component

`ChatWidget messages onSend suggestions title launcherLabel open onOpenChange`. Storybook `Sections / Chatbot` includes a demo that answers from the FAQ.
