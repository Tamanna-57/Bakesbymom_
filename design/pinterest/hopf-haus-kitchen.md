# Hopf Haus Kitchen — Style Reference
> Grandma's recipe box in the Texas Hill Country: toffee-brown bars, wheat and vanilla hand-drawn stripes, and typewriter headlines that sound like a handwritten note.

**Source pin:** [`pinterest/Warm, Welcoming Custom Website Design.jpg`](<../../pinterest/Warm, Welcoming Custom Website Design.jpg>) · **Format:** meal-prep service website, desktop · **Theme:** light

> Colors are sampled from the pin (~736 px wide JPEG) using palette quantization and region sampling. Typefaces are visual identifications with Google Fonts substitutes. Sizes are estimates scaled to a 1440 px desktop canvas. Roles are interpreted.

This is the closest reference to the *story* behind Bakes by Mom: a home kitchen named after "the women who taught me to cook", selling family recipes made with love. The design voice is a family recipe card. Typewriter headlines, a handwritten script line, and hand-drawn uneven stripes in wheat and vanilla make it feel homemade. Toffee brown is the only strong color, used for the header, footer and pill buttons. The "How it works" stepper (check Instagram → stop in → grab and go) is a clear, honest process for a pickup-based food business.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Toffee | `#a56f41` | `--color-toffee` | Header and footer bars, pill buttons, caption caps |
| Wheat | `#ece3c6` | `--color-wheat` | Hero and how-it-works band, stripe partner |
| Vanilla | `#fdfdf1` | `--color-vanilla` | Canvas and selections section |
| Oat | `#f8f0de` | `--color-oat` | Stripe partner and welcome section |
| Bark Ink | `#5f513e` | `--color-bark-ink` | Typewriter headings and body |
| Sand Line | `#d8cfbb` | `--color-sand-line` | Stripe lines and dividers |

## Tokens — Typography

### Typewriter display — "Hopf Haus Kitchen", "BEST KEPT SECRET TO HOME-COOKING", "HOW IT WORKS", "A Peek At Our Selections"
- **Identified as:** typewriter serif with an inky texture
- **Substitute:** Special Elite (textured), Courier Prime (clean), or Cutive Mono
- **Size:** ~26px hero caps, ~22px section titles

### Handwritten script — "The Texas Hill Country's"
- **Substitute:** Homemade Apple, Nothing You Could Do; toffee color, ~20px

### Rounded body sans — paragraphs, step text
- **Substitute:** Quicksand, Nunito; 12–13px, centered caps for steps

### Caption caps — "GOURMET CASSEROLES", "SWEET TREATS"
- Sans caps 11px, toffee, +0.08em tracking

## Tokens — Spacing & Shapes

| Element | Value |
|---------|-------|
| buttons | pill, toffee fill, cream caps (small) |
| outline button | pill, 1px cream outline on toffee ("GIFT CARDS", "BOOK OUR BNB") |
| hero photos | rounded rectangle (~10px) on the left, oval on the right |
| product images | ovals |
| scallop edge | small scallops at the bottom of the how-it-works band |
| stripes | irregular hand-drawn vertical stripes, wheat/vanilla |

## Components

### Recipe-Card Hero
**Role:** warm opening
Hand-drawn stripes behind a center text block (script line → typewriter caps → toffee pill). A rounded photo of the founder sits on the left and an oval food photo on the right, both overlapping the stripe band edges.

### How-It-Works Ticker
**Role:** section title
A typewriter "HOW IT WORKS" marquee interrupted by a circular badge with a pie illustration.

### Check Stepper
**Role:** process (3 steps)
Three columns, each with a square check icon, connected by a thin line. Centered caps text describes the step, and a small note covers pickups.

### Oval Selection Cards
**Role:** product categories
Oval photos, toffee caps titles, centered descriptions and one shared "SEE MORE" pill.

### Welcome Split
**Role:** founder story
A typewriter title, two paragraphs about family recipes, a pill button, and a founder photo with a bowl, on oat with stripes on the right.

### Toffee Footer
**Role:** contact
Three columns: phone/address with icons on the left, a line-drawn house logo in the center, nav and social on the right.

## Do's and Don'ts

### Do
- Write like a family recipe card: typewriter heads, a handwritten aside
- Use hand-drawn imperfect stripes. The irregularity says "homemade"
- Explain pickup and ordering in three plain steps
- Show the real cook

### Don't
- Don't use typewriter type for long paragraphs
- Don't use pure white; vanilla and oat keep it warm

## Surfaces & Elevation
Vanilla → wheat bands → toffee bars. Flat.

## Imagery
Candid home-kitchen photos of the founder, food in real containers (casserole trays, cookie piles) and packaged coffee.

## For Bakes by Mom
**Adopted (primary reference for brand story and voice):**
- "Mom's recipe card" voice → eyebrows and labels in `DM Mono` (`--bbm-font-family-mono`), with Pinyon Script for the handwritten aside
- Check stepper → `<StepList variant="row">`
- Oval product photos → `<ProductCard imageShape="oval">`
- Toffee → `--bbm-color-caramel-600` as an available warm tone (not the primary action)
- Scallop edge → `<EdgeDivider shape="scallop">`
- Founder split → the "Meet Mom" section in **Pages / Home**

## Quick Start

```css
:root {
  --color-toffee: #a56f41;
  --color-wheat: #ece3c6;
  --color-vanilla: #fdfdf1;
  --color-oat: #f8f0de;
  --color-bark-ink: #5f513e;

  --font-typewriter: "Special Elite", "Courier Prime", monospace;
  --font-hand: "Homemade Apple", cursive;
}
```

<details>
<summary>View the reference image</summary>

![Hopf Haus Kitchen website](<../../pinterest/Warm, Welcoming Custom Website Design.jpg>)

</details>
