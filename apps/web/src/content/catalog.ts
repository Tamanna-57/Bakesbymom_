// Cakes by occasion, copied from the old site (bakesbymom.vercel.app/api/catalog) with its photos.
// Prices are in rupees for the listed weight; bigger or smaller cakes are priced off the per-pound rate.

export interface CakePhoto {
  src: string;
  width: number;
  height: number;
}

export interface Cake {
  /** Also the URL: /catalog/<slug>, the same as on the old site. */
  slug: string;
  name: string;
  description: string;
  occasion: string;
  /** Rupees per pound (1 pound = ½ kg on the menu). */
  perPound: number;
  weightKg: number;
  /** Rupees for the listed weight. */
  price: number;
  photos: CakePhoto[];
}

export interface Occasion {
  slug: string;
  name: string;
  description: string;
  cakes: Cake[];
}

export const occasions: Occasion[] = [
  {
    slug: 'birthday-kids',
    name: 'Kids & Character Birthdays',
    description: 'Superheroes, anime and first birthdays — the cakes the party is really about.',
    cakes: [
      {
        slug: 'cake-spiderman',
        name: 'Spiderman Web Cake',
        description: 'White buttercream with a cut-out spider crest, web toppers and red-and-blue spheres.',
        occasion: 'birthday-kids',
        perPound: 800,
        weightKg: 1,
        price: 1450,
        photos: [{ src: '/photos/spiderman-1.webp', width: 750, height: 1000 }],
      },
      {
        slug: 'cake-dragon-ball',
        name: 'Dragon Ball Z Cake',
        description: 'Hand-painted Goku on a brushed blue drum, with fondant dragon balls and stars.',
        occasion: 'birthday-kids',
        perPound: 850,
        weightKg: 1,
        price: 1550,
        photos: [{ src: '/photos/dragon-ball-1.webp', width: 750, height: 1000 }],
      },
      {
        slug: 'cake-football-messi',
        name: 'Football Legend Cake',
        description: 'Sky-blue ombre, a sugar football, a gold trophy and your favourite number ten.',
        occasion: 'birthday-kids',
        perPound: 800,
        weightKg: 1,
        price: 1450,
        photos: [{ src: '/photos/football-messi-1.webp', width: 750, height: 1000 }],
      },
      {
        slug: 'cake-first-birthday',
        name: 'First Birthday Teddy & Cars',
        description: 'A pastel one-year cake with a fondant teddy, rainbow arch, bunting and little blue cars.',
        occasion: 'birthday-kids',
        perPound: 850,
        weightKg: 1,
        price: 1600,
        photos: [{ src: '/photos/first-birthday-1.webp', width: 449, height: 1000 }],
      },
    ],
  },
  {
    slug: 'birthday-parents',
    name: 'Birthdays for Mom & Dad',
    description: 'Photo toppers, butterflies and gold lettering for the people who raised you.',
    cakes: [
      {
        slug: 'cake-mom-photo',
        name: 'Photo Clothesline Cake for Mom',
        description: 'Pink-and-white marbled buttercream with your own photos pegged on a mini clothesline.',
        occasion: 'birthday-parents',
        perPound: 850,
        weightKg: 1,
        price: 1600,
        photos: [{ src: '/photos/mom-photo-1.webp', width: 753, height: 1000 }],
      },
      {
        slug: 'cake-mom-butterfly',
        name: 'Butterfly & Macaron Cake',
        description: 'Pearl-studded ivory buttercream, fresh roses, macarons and wafer butterflies.',
        occasion: 'birthday-parents',
        perPound: 900,
        weightKg: 1,
        price: 1700,
        photos: [{ src: '/photos/mom-butterfly-1.webp', width: 451, height: 1000 }],
      },
      {
        slug: 'cake-maa-wings',
        name: 'Angel Wings Cake for Maa',
        description: 'Feathered wings, an illustrated topper of her, and a garden of gold and mauve roses.',
        occasion: 'birthday-parents',
        perPound: 950,
        weightKg: 1,
        price: 1850,
        photos: [{ src: '/photos/maa-wings-1.webp', width: 750, height: 1000 }],
      },
      {
        slug: 'cake-super-dad',
        name: 'Super Dad Cake',
        description: "Blue and indigo palette-knife strokes, gold 'Super Dad' lettering and a full set of dad toppers.",
        occasion: 'birthday-parents',
        perPound: 850,
        weightKg: 1,
        price: 1600,
        photos: [{ src: '/photos/super-dad-1.webp', width: 750, height: 1000 }],
      },
    ],
  },
  {
    slug: 'birthday-partner',
    name: 'Birthdays for Your Partner',
    description: 'Roses, hand-painted portraits and a name only you get to use.',
    cakes: [
      {
        slug: 'cake-hbd-wifey',
        name: 'HBD Wifey Rose Cake',
        description: 'Deep-red roses, gold spheres and a hand-drawn portrait in a maroon saree.',
        occasion: 'birthday-partner',
        perPound: 900,
        weightKg: 1,
        price: 1750,
        photos: [{ src: '/photos/hbd-wifey-1.webp', width: 750, height: 1000 }],
      },
    ],
  },
  {
    slug: 'birthday-classic',
    name: 'Classic Birthday',
    description: 'No theme, no fuss — just a beautiful cake and a candle.',
    cakes: [
      {
        slug: 'cake-heart-pearl',
        name: 'Pearl Heart Cake',
        description: 'A heart-shaped cake in white cream with pearls, gold-tipped swirls and a gold topper.',
        occasion: 'birthday-classic',
        perPound: 750,
        weightKg: 1,
        price: 1350,
        photos: [
          { src: '/photos/heart-pearl-1.webp', width: 451, height: 1000 },
          { src: '/photos/heart-pearl-2.webp', width: 451, height: 1000 },
          { src: '/photos/heart-pearl-3.webp', width: 451, height: 1000 },
        ],
      },
      {
        slug: 'cake-choco-drip',
        name: 'Loaded Chocolate Drip',
        description: 'Dark ganache drip over ivory-to-caramel ombre, piled with chocolates, wafers and truffles.',
        occasion: 'birthday-classic',
        perPound: 800,
        weightKg: 1,
        price: 1500,
        photos: [{ src: '/photos/choco-drip-1.webp', width: 750, height: 1000 }],
      },
    ],
  },
  {
    slug: 'engagement',
    name: 'Engagement & Bride-to-Be',
    description: "Fresh roses, baby's breath and toppers for the yes that started it all.",
    cakes: [
      {
        slug: 'cake-bride-to-be',
        name: 'Bride To Be Cake',
        description: "Pistachio buttercream, a bride illustration, fresh roses and a gold 'bride to be' topper.",
        occasion: 'engagement',
        perPound: 950,
        weightKg: 1,
        price: 1800,
        photos: [{ src: '/photos/bride-to-be-1.webp', width: 902, height: 1000 }],
      },
      {
        slug: 'cake-engaged-hands',
        name: 'Engaged — Ring Hands Cake',
        description: 'Clasped hands with the ring, pearls, gold leaf and a diamond-ring topper.',
        occasion: 'engagement',
        perPound: 950,
        weightKg: 1,
        price: 1800,
        photos: [
          { src: '/photos/engaged-hands-1.webp', width: 451, height: 1000 },
          { src: '/photos/engaged-hands-2.webp', width: 451, height: 1000 },
          { src: '/photos/engaged-hands-3.webp', width: 451, height: 1000 },
        ],
      },
    ],
  },
  {
    slug: 'anniversary',
    name: 'Anniversary',
    description: 'One year or fifty — cakes built for the couple who kept showing up.',
    cakes: [
      {
        slug: 'cake-anniversary-maroon',
        name: 'Maroon & Gold Anniversary',
        description: 'A textured wine-red base under white cream, gold pearls, roses and a heart topper.',
        occasion: 'anniversary',
        perPound: 900,
        weightKg: 1,
        price: 1750,
        photos: [{ src: '/photos/anniversary-maroon-1.webp', width: 750, height: 1000 }],
      },
      {
        slug: 'cake-anniversary-50',
        name: 'Golden Jubilee Two-Tier',
        description: 'Two tiers in lilac and mint with pearls and mauve roses — built for the big numbers.',
        occasion: 'anniversary',
        perPound: 950,
        weightKg: 2,
        price: 3200,
        photos: [{ src: '/photos/anniversary-50-1.webp', width: 750, height: 1000 }],
      },
    ],
  },
  {
    slug: 'parents-day',
    name: "Mother's Day & Father's Day",
    description: 'A thank-you you can slice, for Maa and for Papa.',
    cakes: [
      {
        slug: 'cake-mom-flowerpot',
        name: 'Rose Flowerpot Cake for Mom',
        description: "An ivory pot filled with cookie soil and fresh roses, finished with gold 'MOM' lettering.",
        occasion: 'parents-day',
        perPound: 850,
        weightKg: 0.5,
        price: 1250,
        photos: [{ src: '/photos/mom-flowerpot-1.webp', width: 750, height: 1000 }],
      },
      {
        slug: 'cake-best-husband-dad',
        name: 'Best Husband & Dad Cake',
        description: 'A clean white cake with a hand-piped crossword and little red hearts.',
        occasion: 'parents-day',
        perPound: 700,
        weightKg: 0.5,
        price: 1050,
        photos: [{ src: '/photos/best-husband-dad-1.webp', width: 450, height: 1000 }],
      },
    ],
  },
  {
    slug: 'romantic',
    name: 'Romantic & Just Because',
    description: 'For the Tuesday that deserved a cake anyway.',
    cakes: [
      {
        slug: 'cake-every-smile',
        name: 'The Man Behind My Every Smile',
        description: 'White drip with black fondant hearts, gold pearls and a message across the board.',
        occasion: 'romantic',
        perPound: 750,
        weightKg: 0.5,
        price: 1150,
        photos: [{ src: '/photos/every-smile-1.webp', width: 750, height: 1000 }],
      },
    ],
  },
  {
    slug: 'farewell',
    name: 'Farewell & Send-off',
    description: 'Flights, flags and see-you-soons, iced in buttercream.',
    cakes: [
      {
        slug: 'cake-farewell-flights',
        name: 'Until We Meet Again',
        description: 'A sky-blue cake with clouds, two flags and a dotted flight path between them.',
        occasion: 'farewell',
        perPound: 750,
        weightKg: 1,
        price: 1350,
        photos: [{ src: '/photos/farewell-flights-1.webp', width: 449, height: 1000 }],
      },
    ],
  },
  {
    slug: 'festival',
    name: 'Festival Specials',
    description: 'Janmashtami, Diwali, Raksha Bandhan — the calendar, in cake.',
    cakes: [
      {
        slug: 'cake-janmashtami',
        name: 'Janmashtami Lotus Cake',
        description: 'Blue-and-white marbled cream, sugar pearls, lotus cut-outs and a peacock feather.',
        occasion: 'festival',
        perPound: 800,
        weightKg: 1,
        price: 1450,
        photos: [{ src: '/photos/janmashtami-1.webp', width: 750, height: 1000 }],
      },
    ],
  },
  {
    slug: 'teachers',
    name: "Teacher's Day",
    description: 'A bouquet that turns out to be dessert.',
    cakes: [
      {
        slug: 'cake-teachers-day',
        name: "Teacher's Day Flowerpot",
        description: 'A butter-yellow textured pot with cookie soil, roses and a gold heart.',
        occasion: 'teachers',
        perPound: 800,
        weightKg: 0.5,
        price: 1200,
        photos: [
          { src: '/photos/teachers-day-1.webp', width: 750, height: 1000 },
          { src: '/photos/teachers-day-2.webp', width: 750, height: 1000 },
        ],
      },
    ],
  },
];

export const cakes: Cake[] = occasions.flatMap((occasion) => occasion.cakes);

export const findCake = (slug: string) => cakes.find((cake) => cake.slug === slug);

export const findOccasion = (slug: string) => occasions.find((occasion) => occasion.slug === slug);
