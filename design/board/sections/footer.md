# Footer

**Pick: [03 · Emily Jane](../pins/03-emily-jane-author.md).** A brown band with three columns: links left, the logo and socials centered, a small newsletter form right.

**Borrowed pieces.**
- **Contact details with icons:** [04 · Hopf Haus](../pins/04-hopf-haus-kitchen.md)
- **Wave edge on top:** [06 · Lilli Pilli](../pins/06-lilli-pilli-patisserie.md)

## Why

The centered logo makes the footer a sign-off rather than a sitemap, which suits a single-person business. Three columns hold everything a customer needs at the end of a page: where to go, how to stay in touch, how to reach Mom.

## Anatomy

```
∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿  wave edge
███████████████████████████ cocoa band ████████████████████████████
█ SHOP              │        Bakes by Mom        │ MOM'S LETTER     █
█ This week's menu  │         (ig) (fb) (tt)     │ One email every  █
█ Custom cakes      │                            │ Monday.          █
█ Bake Club         │  ✆ (512) 555-0134          │ [email][Sign up] █
█ Find us           │  ✉ hello@bakesbymom.com    │                  █
█────────────────────────────────────────────────────────────────█
█ © 2026 Bakes by Mom · Baked in a home kitchen that also handles  █
█ nuts, dairy, eggs and wheat.                Made with real butter. █
████████████████████████████████████████████████████████████████████
```

| Part | Spec | Tokens |
|---|---|---|
| Edge | `EdgeDivider shape="wave"` in cocoa | `bg.inverse` |
| Band | `brown-900`, 72px top padding, 32px bottom | `bg.inverse` |
| Column titles | Caps DM Sans 700 13px, tracked, `pink-300` | — |
| Links | DM Sans 17px, canvas color, underline on hover | `text.inverse` |
| Logo | The stacked wordmark in canvas color | `Logo` |
| Socials | 44px outlined icon links | — |
| Contact | Phone and email with small icons (from [04](../pins/04-hopf-haus-kitchen.md)) | — |
| Newsletter | `NewsletterSignup variant="inline"` on cocoa | — |
| Small print | DM Sans 14px, the allergen statement is always present | `text.inverse` |

## Responsive

Three columns stack to one, with the logo first, then links, then newsletter. Small print stays last.

## Component

`SiteFooter layout="centered-logo"`. See Storybook `Sections / Footer`.
