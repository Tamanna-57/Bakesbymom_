// Site content, shared by the website and the Storybook section stories. Facts, reviews and copy
// come from the old site (bakesbymom.vercel.app).
import {
  Button,
  Doodle,
  type AccordionItem,
  type FooterColumn,
  type FooterSocial,
  type GalleryItem,
  type NavLink,
} from '@bakesbymom/ui';
import { bakery, whatsappLink } from './bakery';
import { cakes, findOccasion } from './catalog';
import { treatCategories } from './treats';
import '../sections/sections.css';

/** Cakes and treats share one link: /shop lists every category, cakes (/catalog) among them. */
export const navLinks: NavLink[] = [
  { label: 'Cakes & Treats', href: '/shop' },
  { label: 'Our story', href: '/about' },
  { label: 'How to order', href: '/#order' },
];

/** Which nav link a page sits under: the cake pages belong to Cakes & Treats. */
const navSection = (path: string) => (path === '/catalog' || path.startsWith('/catalog/') ? '/shop' : path);

/** The nav with the link for the current section marked (`aria-current`). */
export const navLinksFor = (path: string): NavLink[] =>
  navLinks.map((link) => ({
    ...link,
    current:
      !link.href.includes('#') && (navSection(path) === link.href || navSection(path).startsWith(`${link.href}/`)),
  }));

/** The opening line of every WhatsApp chat started from the site. */
export const helloMessage = "Hello Bakes by Mom! I'd like to place an order 🎂";
export const orderLink = whatsappLink(helloMessage);

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
    <path d={d} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const instagramIcon = (
  <Icon d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h0" />
);
const whatsappIcon = (
  <Icon d="M4 20l1.3-4A8 8 0 1 1 8 18.7zM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a4.5 4.5 0 0 1-2.3-2.3l.8-1-1-2z" />
);

/** Instagram and WhatsApp, where the bakery actually lives. */
export const headerActions = (
  <>
    <Button
      variant="secondary"
      shape="circle"
      size="sm"
      aria-label="Instagram (opens in a new tab)"
      href={bakery.instagram}
      target="_blank"
      rel="noreferrer"
    >
      {instagramIcon}
    </Button>
    <Button
      variant="secondary"
      shape="circle"
      size="sm"
      aria-label="Order on WhatsApp (opens WhatsApp)"
      href={orderLink}
      target="_blank"
      rel="noreferrer"
    >
      {whatsappIcon}
    </Button>
  </>
);

export const mobileCta = (
  <Button fullWidth href={orderLink} target="_blank" rel="noreferrer">
    Order on WhatsApp
  </Button>
);

/** The cocoa bar on the home page: one short line at a time. */
export const announcement = [
  <>
    Eggless, baked to order · <a href="/shop">Cakes & treats</a>
  </>,
  <>
    A day's notice helps · <a href="/#order">How to order</a>
  </>,
  <>
    Cakes for every occasion · <a href="/catalog">See the cakes</a>
  </>,
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'Cakes & treats',
    links: [
      { label: 'Every cake & treat', href: '/shop' },
      { label: 'Cakes by occasion', href: '/catalog' },
      ...treatCategories.map((category) => ({ label: category.name, href: `/shop/${category.slug}` })),
    ],
  },
  {
    title: 'Bakes by Mom',
    links: [
      { label: 'Our story', href: '/about' },
      { label: 'How to order', href: '/#order' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Link in bio', href: '/links' },
    ],
  },
];

export const footerSocials: FooterSocial[] = [
  { label: 'Instagram', href: bakery.instagram, icon: instagramIcon },
  { label: 'WhatsApp', href: orderLink, icon: whatsappIcon },
];

export const footerContact = (
  <>
    <p>
      WhatsApp <a href={orderLink}>{bakery.whatsappDisplay}</a>
    </p>
    <p>{bakery.place}</p>
  </>
);

export const footerBottom = (
  <p>© 2026 Bakes by Mom · {bakery.place} · Everything eggless, baked to order. Pure vegetarian (FSSAI green dot).</p>
);

/** One photo per cake, captioned with its name and occasion. */
export const galleryItems = (): GalleryItem[] =>
  cakes
    .filter((cake) => cake.photos.length)
    .map((cake) => ({
      src: cake.photos[0]!.thumb,
      alt: cake.name,
      caption: `${cake.name} · ${findOccasion(cake.occasion)?.name ?? ''}`,
    }));

export const faqItems: AccordionItem[] = [
  {
    icon: <Doodle name="star" size={28} color="var(--bbm-color-butter-400)" />,
    title: 'Is everything really eggless?',
    content: (
      <p>Yes. Every single thing we bake is 100% eggless and pure vegetarian, and carries the FSSAI green dot.</p>
    ),
  },
  {
    icon: <Doodle name="cupcake" size={28} />,
    title: 'How do I order?',
    content: (
      <p>
        Open a cake or a treat, pick the size, flavour and extras, and tap <strong>Order on WhatsApp</strong>. The order
        opens in WhatsApp already typed out: read it, change anything, and send it yourself.
      </p>
    ),
  },
  {
    icon: <Doodle name="whisk" size={28} />,
    title: 'How much notice do you need?',
    content: <p>{bakery.notice}</p>,
  },
  {
    icon: <Doodle name="heart" size={28} color="var(--bbm-color-cherry-500)" />,
    title: 'What sizes do the cakes come in?',
    content: (
      <p>
        ½ kg (about 4–6 slices), 1 kg (about 8–10), 1½ kg, 2 kg (a two-tier for a proper crowd) and 3 kg. Each cake's
        price is for its listed weight; other sizes are priced off its per-pound rate.
      </p>
    ),
  },
  {
    icon: <Doodle name="daisy" size={28} />,
    title: 'How are prices worked out?',
    content: (
      <p>
        Cakes show a price for their listed weight, and the page works out other sizes as you choose. Mom confirms the
        final price on WhatsApp before she bakes.
      </p>
    ),
  },
  {
    icon: <Doodle name="bow" size={28} color="var(--bbm-color-cherry-500)" />,
    title: "What's the smallest order?",
    content: (
      <p>
        Brownies come by 9 pieces, cookies from 250 g, cupcakes by 6 and dry cakes from 500 g. Jar cakes, bento cakes
        and combos start at one.
      </p>
    ),
  },
  {
    icon: <Doodle name="sparkle" size={28} color="var(--bbm-color-cherry-500)" />,
    title: 'Can I choose the flour for cookies?',
    content: <p>Yes: maida, wheat flour, ragi, oats or jowar. Any flavour can be baked in any of them.</p>,
  },
  {
    icon: <Doodle name="cherry" size={28} color="var(--bbm-color-cherry-500)" />,
    title: 'Pickup or delivery?',
    content: (
      <p>
        Pick up from the kitchen in Panipat, or choose delivery when you order and Mom sorts out the details with you on
        WhatsApp.
      </p>
    ),
  },
];

/** Reviews from the old site, as customers wrote them. */
export const reviews = [
  {
    author: 'Ritika S.',
    quote:
      'Absolutely love this bakery! Everything is always fresh, delicious, and made with care. The perfect spot for a sweet treat!',
    detail: 'Model Town · birthday cake',
    rating: 5,
    tone: 'pink' as const,
  },
  {
    author: 'Aman K.',
    quote: 'The fudgy brownies are the real thing — gooey middle, crackled top. They never last the evening here.',
    detail: 'Sector 11 · regular since 2022',
    rating: 5,
    tone: 'blue' as const,
  },
  {
    author: 'Neha & Varun',
    quote:
      "Ordered a tres leches on a day's notice and it still turned up soft, cold and perfect. Packed beautifully too.",
    detail: 'Anniversary order',
    rating: 5,
    tone: 'butter' as const,
  },
  {
    author: 'Pooja M.',
    quote:
      "You can taste that it's a home kitchen — nothing over-sweet, nothing from a packet. My kids ask for it by name.",
    detail: 'Tea-time cookie boxes',
    rating: 5,
    tone: 'pink' as const,
  },
  {
    author: 'Sahil G.',
    quote: 'Cake was lovely and reached us on time. Would have loved a couple more eggless choices on the menu.',
    detail: 'Office celebration',
    rating: 4,
    tone: 'blue' as const,
  },
];

export const howToOrder = [
  {
    title: 'Pick a cake or a treat',
    description: 'Browse cakes by occasion, or brownies, cookies, jar cakes and more.',
    icon: <Doodle name="cupcake" size={32} />,
  },
  {
    title: 'Make it yours',
    description: 'Choose the size, flavour, extras and the day you need it.',
    icon: <Doodle name="sparkle" size={30} color="var(--bbm-color-butter-400)" />,
  },
  {
    title: 'Send it on WhatsApp',
    description: 'Your order opens in WhatsApp already typed out. Read it, change anything, send.',
    icon: <Doodle name="heart" size={30} color="var(--bbm-color-cherry-500)" />,
  },
  {
    title: 'Baked to order',
    description: "Mom confirms the price and bakes it fresh. A day's notice helps.",
    icon: <Doodle name="cherry" size={30} color="var(--bbm-color-cherry-500)" />,
  },
];
