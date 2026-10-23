// The 16 pins on the nuttychip / bakesbymom Pinterest board (images in pinterest/board/).
export interface BoardPin {
  n: string;
  slug: string;
  title: string;
  what: string;
  /** Sections this pin leads (see design/board/README.md). */
  leads: string[];
  /** Sections where it supplies an alternate or a piece. */
  also: string[];
}

export const REPO = 'https://github.com/Tamanna-57/Bakesbymom_/blob/main';

export const pinImage = (pin: BoardPin) => `pinterest/board/${pin.n}-${pin.slug}.jpg`;
export const pinDoc = (pin: BoardPin) => `${REPO}/design/board/pins/${pin.n}-${pin.slug}.md`;

export const boardPins: BoardPin[] = [
  {
    n: '01',
    slug: 'berloga-coffeeshop',
    title: 'Berloga Coffeeshop',
    what: 'Café homepage, cream and pink, outlined in brown',
    leads: ['Gallery', 'Reviews', 'Bake Club', 'Journal'],
    also: ['About (orbit)', 'FAQ rows'],
  },
  {
    n: '02',
    slug: 'pretty-ok-mail-club',
    title: 'Pretty OK Studios: mail club',
    what: '"How it works" and FAQ on wide stripes',
    leads: ['Process', 'FAQ', 'Marquee'],
    also: [],
  },
  {
    n: '03',
    slug: 'emily-jane-author',
    title: 'Emily Jane',
    what: 'Author homepage in dusty blue, butter, blush and brown',
    leads: ['Newsletter', 'Footer'],
    also: ['Navbar (mobile capsule)', 'About'],
  },
  {
    n: '04',
    slug: 'hopf-haus-kitchen',
    title: 'Hopf Haus Kitchen',
    what: 'Meal-prep site in caramel and beige',
    leads: [],
    also: ['Process (row)', 'Menu (ovals)', 'Marquee badge', 'Footer contact'],
  },
  {
    n: '05',
    slug: 'pretty-ok-studios-shop',
    title: 'Pretty OK Studios: shop',
    what: 'Product row, values, "Meet Elia"',
    leads: ['About'],
    also: ['Menu (row with tabs)'],
  },
  {
    n: '06',
    slug: 'lilli-pilli-patisserie',
    title: 'Lilli Pilli Patisserie',
    what: 'Patisserie homepage in green and peach',
    leads: [],
    also: ['Hero (band)', 'Find us (visit)', 'Footer edge'],
  },
  {
    n: '07',
    slug: 'croissant-lab-landing',
    title: 'Croissant Lab',
    what: '"Dopamine" bakery landing page on blue stripes',
    leads: [],
    also: ['Hero (stickers)', 'Marquee (tilt)', 'Reviews (quote card)'],
  },
  {
    n: '08',
    slug: 'digital-wave-taplink',
    title: 'Digital Wave taplink',
    what: 'Mobile link-in-bio pages in cherry and dusty blue',
    leads: ['Chatbot', 'Custom cakes (packages)', 'Link in bio'],
    also: ['Process (tabs)', 'FAQ (pills)'],
  },
  {
    n: '09',
    slug: 'sasakhalisa-pastel-stripes',
    title: 'Sasa Khalisa stripes',
    what: 'Sheet of 16 stripe patterns',
    leads: ['Patterns'],
    also: [],
  },
  {
    n: '10',
    slug: 'book-nook-society',
    title: 'The Book Nook Society',
    what: 'Book club site with tickets and seals',
    leads: ['Bake Club (ticket)'],
    also: ['Chatbot (launcher)', 'Process (cards)'],
  },
  {
    n: '11',
    slug: 'stevie-kay-showit',
    title: 'Stevie Kay',
    what: 'Photo-led personal brand site',
    leads: [],
    also: ['Gallery (trio)', 'Hero (star seam)'],
  },
  {
    n: '12',
    slug: 'september-sun-candles',
    title: 'September Sun',
    what: 'Candle shop homepage with patterned frames',
    leads: [],
    also: ['Find us (stockists)', 'Gallery (grid)', 'Menu (frames)'],
  },
  {
    n: '13',
    slug: 'puzzle-pantry',
    title: 'Puzzle Pantry',
    what: 'Cosy Shopify homepage',
    leads: ['Announcement bar'],
    also: ['Navbar icons', 'Menu filters', 'Hero (photo)'],
  },
  {
    n: '14',
    slug: 'berloga-coffeeshop-repost',
    title: 'Berloga (second pin)',
    what: 'The same Berloga page, saved again',
    leads: [],
    also: ['Reinforces 01'],
  },
  {
    n: '15',
    slug: 'nectar-candy-cart',
    title: 'Nectar',
    what: 'Candy-cart homepage in cherry, pink and cream',
    leads: ['Landing page', 'Navbar', 'Hero', 'Find us', 'Custom cakes'],
    also: ['Newsletter (bar)', 'Bake Club'],
  },
  {
    n: '16',
    slug: 'sugarlace-bakery',
    title: 'SugarLace Bakery',
    what: 'Cake shop in baby blue, cream and cherry',
    leads: ['Menu'],
    also: ['About (card)', 'Process (stamp card)'],
  },
];
