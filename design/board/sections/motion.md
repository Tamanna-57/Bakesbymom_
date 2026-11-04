# Motion

**Lead references: [tehtariknation.com](https://tehtariknation.com/) and [becatea.com](https://becatea.com/).** Two tea brands whose sites move a lot: scenes pinned while cards fly in, giant words that slide, scatter and run along curves, things typed out as you watch. Bakes by Mom keeps its own palette, type, stickers and patterns, and borrows the motion.

## The problem

The site was pretty but still: sections rose in and the ribbons scrolled, and little else. The brief was a "crazy", playful site in the same theme, with the data left as it is.

## Built from

| Piece                                     | File                                        | Tech                                    |
| ----------------------------------------- | ------------------------------------------- | --------------------------------------- |
| GSAP set-up, `useFx`, `motionAllowed`     | `apps/web/src/fx/gsap.ts`                   | GSAP, ScrollTrigger, SplitText          |
| Lenis driven by GSAP's clock              | `apps/web/src/motion.ts`                    | Lenis → `ScrollTrigger.update`          |
| Effects on every page                     | `apps/web/src/fx/site-fx.ts`                | SplitText, Web Animations playback rate |
| Sprinkles, progress ribbon, cursor label  | `apps/web/src/fx/Extras.tsx`                | canvas, `gsap.quickTo`                  |
| Deck, flavour wall, sign-off, footer word | `apps/web/src/sections/fx.tsx`, `fx/fx.css` | ScrollTrigger pin and scrub             |
| Hero, wheel title, quote                  | `apps/web/src/sections/home.tsx`            | ScrollTrigger, SplitText                |

## Scenes

| Scene                | Where                 | After                                    | What happens                                                                                                                                                               |
| -------------------- | --------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero                 | home, top             | Teh Tarik Nation hero collage            | Title letters burst in once the intro clears; painted stickers pop on round the arch, bob, follow the mouse at their own depths and scatter as the hero scrolls away       |
| Promise deck         | home, after the cakes | Teh Tarik Nation "5 generations later…"  | Pinned. Nine cards (the feature strip's promises) fly up one by one, slam into a fan and tilt; tape labels peel and sway round the edges                                   |
| Flavour wall         | home, Flavours band   | Beca Tea "No Nasties"                    | Three rows of the flavour names, filled and outlined, slide in turn as you scroll, round a painted slice that turns and grows                                              |
| Cakes and Treats     | home, the wheel       | Beca Tea "Real tea for a fake world"     | The title's letters start scattered and spinning across the band and fly together as it scrolls in; "and" spins in; the tickets rise into their arc                        |
| Quote                | home, checker band    | Teh Tarik Nation typewriter tags         | The card tips in, the line types itself out behind a cherry caret, the script words and Mom's sign-off are written in; the checkers slide                                  |
| Curved sign-off      | home, before footer   | Teh Tarik Nation "Malaysia in a cup"     | "Slow down · Cut the cake · This is your sign…" runs along an arc, an outlined line runs the other way, a cake rises, and an Order button pops                              |
| Footer word          | every page            | Beca Tea's giant name                    | "Bakes by Mom", huge, rises letter by letter under the footer                                                                                                              |
| Section titles       | every page            | both                                     | Letters burst up with a tilt and an overshoot; script words are written in whole, so their joins stay intact                                                               |
| Ribbons and reviews  | every page            | awwwards-style velocity marquees         | Speed up with the scroll, run backwards when you scroll up, and lean into the motion                                                                                       |
| Lists                | every page            | dealing cards                            | Items rise in tipped and small, overshoot and settle                                                                                                                       |
| Buttons and cards    | every page            | —                                        | Buttons pull toward the cursor; cake, flavour and tile cards tilt in 3D toward it; a cherry "Peek" (or "Drag" on the wheel) sticker follows the mouse over them            |
| Sprinkles            | every page            | —                                        | A click or tap throws a pinch of sprinkles in the palette                                                                                                                  |
| Progress             | every page            | —                                        | A candy-striped ribbon fills along the top of the screen                                                                                                                   |

## Tokens used

- **Colour:** `blue-100/200/300`, `pink-200/300/500`, `butter-300`, `matcha-200`, `beige-50/200`, `cherry-500/700`, `brown-900`, `paper`; the FSSAI green from the site's veg dot.
- **Type:** Fraunces (`--bbm-font-family-display`, with `--bbm-font-variation-display`) for the big words and card titles, italic Fraunces (`--bbm-font-family-hand`) for the card notes, Pinyon Script for one word per scene.
- **Shape and pattern:** `PatternSurface` (checker, gingham, stripes, dots) for the card feet and tape labels; 1.5px cocoa sticker outlines; `--bbm-shadow-sticker-*`; `--bbm-radius-lg`.
- **Motion:** `--bbm-motion-easing-bounce` and `--bbm-motion-easing-out` for the CSS reveals; GSAP eases (`back.out`, `power4.in`) for the scenes.

## Accessibility

- **Reduced motion:** nothing in `fx/` runs (`motionAllowed()`); each scene's CSS is its finished, still layout. The deck lies open as a spread of cards, the wall's rows sit staggered, the cursor label and sprinkles are hidden.
- **Screen readers:** split titles keep their words (`aria-label` from SplitText on the heading); the quote is read once from a hidden copy; the deck is a list of headed cards; the wall, tapes, footer word and stickers are `aria-hidden`; the sign-off is read from a hidden sentence.
- **Keyboard:** no scene needs the mouse. Pinned scenes scroll by keyboard like the rest of the page; the cursor label and tilts only appear for a mouse or trackpad.

## Open questions

- The deck's promises are the ones already made on the site (feature strip, about card). Swap any card in `promises` (`sections/fx.tsx`) when Mom wants to say something else.
- The tape labels are decoration words; change them in `tapes`.
