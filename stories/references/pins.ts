export interface Pin {
  file: string;
  title: string;
  /** Analysis file in design/pinterest/. */
  md: string;
  takeaway: string;
  weight: 1 | 2 | 3;
}

export const REPO = 'https://github.com/Tamanna-57/Bakesbymom_/blob/main';

export const pins: Pin[] = [
  {
    file: 'Berloga Coffeeshop _ Corporate website _ UX _ UI.jpg',
    title: 'Berloga Coffeeshop',
    md: 'berloga-coffeeshop.md',
    takeaway: 'Strawberry, oat and cocoa outlines; scalloped sticker cards',
    weight: 3,
  },
  {
    file: 'Custom Cake Bakery Website Design Playful Charming Pastel Soft branding design.jpg',
    title: 'SugarLace Bakery',
    md: 'sugarlace-bakery.md',
    takeaway: 'Fillings menu cards, price pills, stamp-edged order steps',
    weight: 3,
  },
  {
    file: 'Warm, Welcoming Custom Website Design.jpg',
    title: 'Hopf Haus Kitchen',
    md: 'hopf-haus-kitchen.md',
    takeaway: 'Family-recipe voice, 3-step pickup process',
    weight: 3,
  },
  {
    file: 'Fun, Modern, Playful Website Design and Layout for Candy Subscription Brand - ATNN Design Studio.jpg',
    title: 'Nectar Candy Cart',
    md: 'nectar-candy-cart.md',
    takeaway: 'Weekly pop-up schedule, flower price tags, graph paper',
    weight: 3,
  },
  {
    file: 'Lilli Pilli Patisserie Cafe | Shopify Website Design.jpg',
    title: 'Lilli Pilli Patisserie',
    md: 'lilli-pilli-patisserie.md',
    takeaway: 'Awning-stripe borders, “From $” pricing, visit us',
    weight: 2,
  },
  {
    file: 'Home Fragrance Candle Website Design Warm Soft Coated Aesthetic branding design.jpg',
    title: 'September Sun',
    md: 'september-sun-candles.md',
    takeaway: 'Small-maker page structure, patterned frames',
    weight: 2,
  },
  {
    file: 'Romance Author Website Inspiration.jpg',
    title: 'Emily Jane',
    md: 'emily-jane-romance-author.md',
    takeaway: 'Capsule nav, “meet the author” signature card',
    weight: 2,
  },
  {
    file: 'Boutique E-Commerce Homepage Layout Vibrant Cheerful Expressive Warm branding design.jpg',
    title: 'Pretty OK! Homepage',
    md: 'pretty-ok-studios-homepage.md',
    takeaway: 'Plain grid, charming frames, polka-dot trim',
    weight: 2,
  },
  {
    file: 'Pretty OK Studios Homepage ✷ Shopify Website Examples For Stationery Brands.jpg',
    title: 'Pretty OK! Nostalgia Post',
    md: 'pretty-ok-nostalgia-post.md',
    takeaway: 'Rotated stacked steps, sticker FAQ',
    weight: 2,
  },
  {
    file: 'Full Shopify Website & Brand Design for Puzzle Pantry | Olive St Studio.jpg',
    title: 'Puzzle Pantry',
    md: 'puzzle-pantry.md',
    takeaway: 'Script word swapped into a serif headline',
    weight: 2,
  },
  {
    file: 'Book Club Community Website Design Nostalgic Ticket Playful Cute branding design.jpg',
    title: 'The Book Nook Society',
    md: 'book-nook-society.md',
    takeaway: 'Admission ticket, society seal, polaroid',
    weight: 2,
  },
  {
    file: 'Таплинк для smm-агенства.jpg',
    title: 'Digital Wave Taplink',
    md: 'digital-wave-taplink.md',
    takeaway: 'Link-in-bio page, key-tag prices, torn paper',
    weight: 2,
  },
  {
    file: 'Дизайн гайда_презентации для эксперта-кондитера_ Digital Product Design | Aesthetic Presentation.jpg',
    title: 'Pastry Expert’s Guide',
    md: 'pastry-expert-guide.md',
    takeaway: 'Serif + script heading lockup, recipe layout',
    weight: 2,
  },
  {
    file: 'Bakery poster design.jpg',
    title: 'Cherry Cloud Shortcake',
    md: 'cherry-cloud-shortcake-poster.md',
    takeaway: 'Cabana stripes, arched serif and script',
    weight: 2,
  },
  {
    file: 'Canva Elements Keyword - Pastel Seamless Stripes by Sasa Khalisa.jpg',
    title: 'Pastel Seamless Stripes',
    md: 'pastel-seamless-stripes.md',
    takeaway: 'Stripe anatomy: band, pinstripe, ric-rac',
    weight: 2,
  },
  {
    file: 'Elevate Your Brand with a Custom 5-Page Showit Website Design ✨.jpg',
    title: 'Stevie Kay (Showit)',
    md: 'stevie-kay-showit.md',
    takeaway: 'Stickers straddling section seams',
    weight: 1,
  },
  {
    file: ' -19.jpg',
    title: 'Strawberry Cheesecake',
    md: 'strawberry-cheesecake-groovy-poster.md',
    takeaway: 'Checkerboard, type-sandwich social post',
    weight: 1,
  },
  {
    file: 'Poster design example ✨ Strawberry Cake concept 🍓  DM for art commission! 💌.jpg',
    title: 'Strawberry Cake Awning',
    md: 'strawberry-cake-awning-poster.md',
    takeaway: 'Awning edge, gingham, sticker clusters',
    weight: 1,
  },
  // This filename is stored decomposed (NFD) on disk, so the accents are written as combining marks.
  {
    file: 'post para confeitaria com estética retrô🍓.jpg',
    title: 'Bolo de Morango Promo',
    md: 'bolo-de-morango-retro-promo.md',
    takeaway: 'Layered promo lockup, edge offer tab',
    weight: 1,
  },
  {
    file: 'raspberry macarons!!!🍓.jpg',
    title: 'Raspberry Macaron',
    md: 'raspberry-macaron-poster.md',
    takeaway: 'Butter + raspberry, cloud badge, outline type',
    weight: 1,
  },
  {
    file: 'Sunday Brunch | Live Music Poster.jpg',
    title: 'Sunday Brunch',
    md: 'sunday-brunch-poster.md',
    takeaway: 'Graph paper + gingham, tape date label',
    weight: 1,
  },
  {
    file: 'example-2.com',
    title: 'Spring Bouquet Workshop',
    md: 'spring-bouquet-workshop-flyer.md',
    takeaway: 'Class flyer: stamped label, taped polaroid',
    weight: 1,
  },
  {
    file: 'cover page.jpg',
    title: 'Cloche Reveal Collage',
    md: 'cloche-collage-cover.md',
    takeaway: 'Die-cut sticker halo, torn paper',
    weight: 1,
  },
  {
    file: 'Web design idea functional.jpg',
    title: 'Web design idea (duplicate)',
    md: 'web-design-idea-functional.md',
    takeaway: 'Same design as Berloga, pinned twice',
    weight: 1,
  },
];
