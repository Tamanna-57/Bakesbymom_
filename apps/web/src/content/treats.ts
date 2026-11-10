// Treats by type, copied from the old site (Brownies, Cookies, Jar Cakes, Dry Cakes, Cupcakes, Bento Cakes, Combos).
// There are no product photos yet, so each type shows one of our illustrations.

export interface Treat {
  slug: string;
  name: string;
  blurb: string;
  description: string;
  details: string[];
  /** A photo of this treat. Without one, the category's photo. */
  photo?: { src: string; alt: string };
}

/**
 * Every category's page (TreatShowcase.tsx): a hero in the category's own color, then its treats as framed cards.
 * The template is the same for all of them; the color, the words and the photos tell them apart.
 */
export interface TreatShowcase {
  /**
   * The hero's color: a dark shade from the palette (a token name such as 'cherry-800'), so the cream headline, the
   * pink script and the butter note all pass WCAG AA on it.
   */
  tone: string;
  /** Hero headline: the words in Bodoni, then the words in script. */
  title: string;
  script: string;
  /** Mom's note under the headline. */
  tagline: string;
  /** One to three photos (paths in public/) fanned out as tilted cards beside the headline, the middle one largest. */
  heroPhotos: Array<{ src: string; alt: string }>;
}

export interface TreatCategory {
  /** Also the URL: /shop/<slug>, the same as on the old site. */
  slug: string;
  name: string;
  blurb: string;
  /** What the quantity counts: pieces, grams, jars… */
  unit: string;
  minQty: number;
  /** Pieces per box, when they come boxed. */
  perBox?: number;
  /** A required choice, such as the flour for cookies. */
  choiceLabel?: string;
  choices?: string[];
  /** "Make it yours" options. */
  extras: string[];
  items: Treat[];
  showcase?: TreatShowcase;
}

export const treatCategories: TreatCategory[] = [
  {
    slug: 'brownies',
    name: 'Brownies',
    blurb: 'Dense, fudgy and cut thick. Baked in trays through the week and boxed the morning they go out.',
    unit: 'pieces',
    minQty: 9,
    showcase: {
      tone: 'brown-800',
      title: 'Brownies worth',
      script: 'every square',
      tagline: 'Fudgy, cut thick, boxed the morning they go out',
      heroPhotos: [{ src: '/stock/treat-brownies.webp', alt: 'A stack of fudgy brownies' }],
    },
    perBox: 9,
    extras: [
      'Extra walnuts',
      'Extra choco chips',
      'Extra fudgy (under-baked centre)',
      'Cake-style (lighter crumb)',
      'Chocolate drizzle on top',
      'Cut into smaller squares',
    ],
    items: [
      {
        slug: 'oreo-brownie',
        name: 'Oreo Brownie',
        blurb: 'Cookies through the batter and crushed over the top.',
        description:
          'Our fudgy chocolate base with Oreo pieces folded through it and more crushed over the top before it goes in, so the biscuit softens into the crumb instead of sitting on it.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 4 days. Airtight at room temperature.',
          'Contains wheat, dairy, soy.',
        ],
      },
      {
        slug: 'biscoff-brownie',
        name: 'Biscoff Brownie',
        blurb: 'Warm spiced biscuit spread, swirled and baked in.',
        description:
          "Biscoff spread swirled through the batter and a second spoonful melted over the top once it's out, so you get the caramel-spice note in every square.",
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 4 days. Airtight at room temperature.',
          'Contains wheat, dairy, soy.',
        ],
      },
      {
        slug: 'triple-chocolate-brownie',
        name: 'Triple Chocolate Brownie',
        blurb: 'Dark, milk and white, all three in one square.',
        description:
          'Dark chocolate in the batter, milk chocolate chunks folded through, white chocolate over the top. The one to order when chocolate is the whole point.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 4 days. Airtight at room temperature.',
          'Contains wheat, dairy, soy.',
        ],
      },
      {
        slug: 'walnut-brownie',
        name: 'Walnut Brownie',
        blurb: 'The classic, with walnuts on top and through.',
        description:
          'The brownie most people mean when they say brownie: deep and fudgy, with toasted walnuts folded in and a few more pressed on top so they crisp in the oven.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 4 days. Airtight at room temperature.',
          'Contains wheat, dairy, soy, walnuts.',
        ],
      },
      {
        slug: 'kitkat-brownie',
        name: 'KitKat Brownie',
        blurb: 'Wafer fingers laid in and baked through.',
        description:
          "KitKat laid across the batter before baking, so the wafer goes soft and the chocolate melts into the top. A favourite with the kids' boxes.",
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 4 days. Airtight at room temperature.',
          'Contains wheat, dairy, soy.',
        ],
      },
      {
        slug: 'mixed-brownie-box',
        name: 'Mixed Flavours Box',
        blurb: "A box that can't make up its mind. Tell us the split.",
        description:
          "Pick the flavours you want and how many of each — we'll cut and box them together. The usual ask is three each of walnut, triple chocolate and Oreo.",
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 4 days. Airtight at room temperature.',
          'Tell us the split in the order message.',
        ],
      },
    ],
  },
  {
    slug: 'cookies',
    name: 'Cookies',
    blurb: 'Choose your flour first — maida, wheat, ragi, oats or jowar — then the flavour on top of it.',
    unit: 'grams',
    minQty: 250,
    choiceLabel: 'Flour',
    choices: ['Maida', 'Wheat flour', 'Ragi', 'Oats', 'Jowar'],
    showcase: {
      tone: 'cherry-800',
      title: 'Cookies worth',
      script: 'every crumb',
      tagline: 'Your flour, your flavour, baked for your date',
      heroPhotos: [
        { src: '/photos/cookies/berries.webp', alt: 'Raspberry and white chocolate cookies' },
        { src: '/photos/cookies/choco-chip.webp', alt: 'A stack of chocolate chip cookies' },
        { src: '/photos/cookies/double-chocolate.webp', alt: 'Double chocolate cookies with melted chocolate inside' },
      ],
    },
    extras: [
      'Extra choco chips',
      'Extra nuts',
      'Less sweet',
      'Crisper bake',
      'Softer bake',
      'Mixed box (half and half)',
    ],
    items: [
      {
        slug: 'choco-chip-cookie',
        name: 'Choco Chip Cookie',
        blurb: 'Chunks, not chips. Soft middle, crisp edge.',
        description:
          "Proper chocolate chunks rather than chips, so they pool rather than stud. Bakes soft in the middle with a crisp rim — say the word and we'll take it crisper all the way through.",
        photo: {
          src: '/photos/cookies/choco-chip.webp',
          alt: 'A stack of chocolate chip cookies, the top one broken open with melted chocolate',
        },
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 10 days. Airtight at room temperature.',
          'Contains wheat or your chosen flour, dairy.',
        ],
      },
      {
        slug: 'double-chocolate-cookie',
        name: 'Double Chocolate Cookie',
        blurb: 'Cocoa dough, melting chocolate chips.',
        description:
          'A dark cocoa dough with chocolate chips through it, baked soft so the middle stays fudgy and the chips melt when you break one open.',
        photo: {
          src: '/photos/cookies/double-chocolate.webp',
          alt: 'Two halves of a double chocolate cookie, melted chocolate inside, stacked on a whole one',
        },
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 10 days. Airtight at room temperature.',
          'Contains wheat or your chosen flour, dairy.',
        ],
      },
      {
        slug: 'rolled-oats-cookie',
        name: 'Rolled Oats Cookie',
        blurb: 'Chewy, wholesome, good with chai.',
        description:
          'Rolled oats through and through, lightly sweetened, with a chew that holds. The one that disappears fastest out of the tin at teatime.',
        photo: {
          src: '/photos/cookies/oats.webp',
          alt: 'A stack of oat cookies with chocolate chips on a wooden plate',
        },
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 10 days. Airtight at room temperature.',
          'Contains oats, dairy.',
        ],
      },
      {
        slug: 'coconut-cookie',
        name: 'Coconut Cookie',
        blurb: 'Desiccated coconut, toasted golden.',
        description:
          'Coconut folded through a short, buttery dough and baked until the edges toast. Light, and not too sweet.',
        photo: {
          src: '/photos/cookies/coconut.webp',
          alt: 'A plate of golden coconut cookies scattered with coconut flakes',
        },
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 10 days. Airtight at room temperature.',
          'Contains dairy, coconut.',
        ],
      },
      {
        slug: 'almond-berry-cookie',
        name: 'Almond & Berry Cookie',
        blurb: 'Flaked almonds and tart dried berries.',
        description:
          'A chewy, oaty dough packed with flaked almonds and dried berries, so every bite is a little nutty and a little tart. The tin people ask for at Diwali and then again in January.',
        photo: {
          src: '/photos/cookies/almond-berry.webp',
          alt: 'Cookies with dried berries and flaked almonds on a speckled plate',
        },
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 12 days. Airtight at room temperature.',
          'Contains nuts, dairy.',
        ],
      },
      {
        slug: 'berry-white-chocolate-cookie',
        name: 'Berries & White Chocolate Cookie',
        blurb: 'Raspberries and white chocolate chunks.',
        description:
          'Raspberries folded through a buttery dough with chunks of white chocolate, baked until the edges turn golden and the berries just start to jam.',
        photo: {
          src: '/photos/cookies/berries.webp',
          alt: 'A stack of raspberry and white chocolate cookies on a plate',
        },
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 7 days. Airtight at room temperature.',
          'Contains wheat or your chosen flour, dairy.',
        ],
      },
    ],
  },
  {
    slug: 'jar-cakes',
    name: 'Jar Cakes',
    blurb: 'Layered in a jar, spoon included. Every flavour we do, in the size that travels.',
    unit: 'jars',
    minQty: 1,
    showcase: {
      tone: 'blue-700',
      title: 'Cake, layered',
      script: 'in a jar',
      tagline: 'Spoon included, in the size that travels',
      heroPhotos: [{ src: '/stock/treat-jar-cakes.webp', alt: 'Chocolate cake layered with cream in glass jars' }],
    },
    extras: [
      'Gift wrapping',
      'Gift box',
      'Greeting card note',
      'Extra layer of cream',
      'Less sweet',
      'Add a spoon to each jar',
    ],
    items: [
      {
        slug: 'chocolate-truffle-jar',
        name: 'Chocolate Truffle Jar',
        blurb: 'Sponge, ganache, sponge, ganache.',
        description:
          'Chocolate sponge soaked and layered with dark truffle ganache, finished with a curl of chocolate on top.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Keep refrigerated. Best within 3 days.',
        ],
      },
      {
        slug: 'red-velvet-jar',
        name: 'Red Velvet Jar',
        blurb: 'Cream cheese frosting, crumb on top.',
        description:
          'Red velvet sponge layered with cream cheese frosting and finished with the crumb off the same cake.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Keep refrigerated. Best within 3 days.',
        ],
      },
      {
        slug: 'biscoff-jar',
        name: 'Biscoff Jar',
        blurb: 'Spread, crumb, cream, repeat.',
        description:
          'Vanilla sponge layered with Biscoff spread and whipped cream, crushed biscuit between every layer.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Keep refrigerated. Best within 3 days.',
        ],
      },
      {
        slug: 'blueberry-jar',
        name: 'Blueberry Jar',
        blurb: 'Compote through fresh cream.',
        description:
          'Vanilla sponge with blueberry compote and fresh cream, layered so you get fruit in every spoonful.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Keep refrigerated. Best within 3 days.',
        ],
      },
      {
        slug: 'rasmalai-jar',
        name: 'Rasmalai Jar',
        blurb: 'Saffron, cardamom, soaked sponge.',
        description: 'Sponge soaked in saffron-cardamom rabri, layered with cream and topped with slivered pistachio.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Keep refrigerated. Best within 3 days.',
        ],
      },
      {
        slug: 'any-flavour-jar',
        name: 'Any Flavour You Like',
        blurb: 'Butterscotch, oreo, tiramisu, mango, pineapple, strawberry.',
        description:
          'Every flavour the kitchen does can be layered into a jar. Name it in the order message — butterscotch, oreo, tiramisu, mango, pineapple, strawberry, or ask for something else.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Keep refrigerated. Best within 3 days.',
        ],
      },
    ],
  },
  {
    slug: 'dry-cakes',
    name: 'Dry Cakes',
    blurb: 'Tea cakes with no icing to melt — the loaf that sits on the counter all week.',
    unit: 'grams',
    minQty: 500,
    showcase: {
      tone: 'butter-800',
      title: 'Tea cakes for',
      script: 'every chai',
      tagline: 'The loaf that sits on the counter all week',
      heroPhotos: [{ src: '/stock/treat-dry-cakes.webp', alt: 'A sliced loaf tea cake' }],
    },
    extras: ['Gift wrapping', 'Gift box', 'Greeting card note', 'Extra nuts', 'Less sweet', 'Sliced before packing'],
    items: [
      {
        slug: 'vanilla-tea-cake',
        name: 'Vanilla Tea Cake',
        blurb: 'Plain, buttery, and better on day two.',
        description: 'A plain vanilla loaf with a tight, buttery crumb. The one to keep in the tin.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 5 days. Airtight at room temperature.',
          'Contains wheat, dairy.',
        ],
      },
      {
        slug: 'chocolate-tea-cake',
        name: 'Chocolate Tea Cake',
        blurb: 'Cocoa-dark, no icing needed.',
        description: 'Deep cocoa loaf, moist without any frosting to hide behind.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 5 days. Airtight at room temperature.',
          'Contains wheat, dairy, soy.',
        ],
      },
      {
        slug: 'marble-cake',
        name: 'Marble Cake',
        blurb: 'Vanilla and chocolate, swirled.',
        description: 'Vanilla and chocolate batter swirled through each other — no two slices alike.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 5 days. Airtight at room temperature.',
          'Contains wheat, dairy, soy.',
        ],
      },
      {
        slug: 'banana-walnut-cake',
        name: 'Banana Walnut Cake',
        blurb: 'Ripe bananas, toasted walnuts.',
        description: 'Properly ripe bananas and toasted walnuts, baked into a loaf that stays moist for days.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 5 days. Airtight at room temperature.',
          'Contains wheat, dairy, walnuts.',
        ],
      },
      {
        slug: 'tutti-frutti-cake',
        name: 'Tutti Frutti Cake',
        blurb: 'The bakery loaf you grew up on.',
        description: 'Candied fruit through a light vanilla crumb. The one from the corner bakery, done properly.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Best within 5 days. Airtight at room temperature.',
          'Contains wheat, dairy.',
        ],
      },
    ],
  },
  {
    slug: 'cupcakes',
    name: 'Cupcakes',
    blurb: 'Six, twelve or twenty-four, piped the morning they go out.',
    unit: 'cupcakes',
    minQty: 6,
    showcase: {
      tone: 'pink-700',
      title: 'Little cakes,',
      script: 'big smiles',
      tagline: 'Six, twelve or twenty-four, piped that morning',
      heroPhotos: [
        { src: '/stock/home-cupcakes.webp', alt: 'Cupcakes with pink frosting and a cherry on top' },
        { src: '/stock/treat-cupcakes.webp', alt: 'A cupcake with pink frosting and a cherry' },
      ],
    },
    perBox: 6,
    extras: [
      'Piped message on the box',
      'Candles',
      'Sprinkles',
      'Extra frosting',
      'Less sweet frosting',
      'Gift wrapping',
      'Gift box',
      'Greeting card note',
    ],
    items: [
      {
        slug: 'chocolate-cupcake',
        name: 'Chocolate Cupcake',
        blurb: 'Chocolate sponge, truffle swirl.',
        description: 'Chocolate sponge under a swirl of truffle frosting and a chocolate curl.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          "Best the day they're made.",
          'Contains wheat, dairy, soy.',
        ],
      },
      {
        slug: 'vanilla-cupcake',
        name: 'Vanilla Cupcake',
        blurb: 'Buttercream rose on a vanilla crumb.',
        description: 'Vanilla sponge with a piped buttercream rose — the colour is yours to pick.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          "Best the day they're made.",
          'Contains wheat, dairy.',
        ],
      },
      {
        slug: 'red-velvet-cupcake',
        name: 'Red Velvet Cupcake',
        blurb: 'Cream cheese, piped high.',
        description: 'Red velvet sponge under cream cheese frosting, with the crumb dusted over.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Keep refrigerated.',
          'Contains wheat, dairy.',
        ],
      },
      {
        slug: 'butterscotch-cupcake',
        name: 'Butterscotch Cupcake',
        blurb: 'Praline crunch on the top.',
        description: 'Butterscotch sponge and frosting, finished with praline crunch.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          "Best the day they're made.",
          'Contains wheat, dairy, nuts.',
        ],
      },
    ],
  },
  {
    slug: 'bento-cakes',
    name: 'Bento Cakes',
    blurb: 'The little one in a box — six inches of cake for two people and a message on top.',
    unit: 'bentos',
    minQty: 1,
    showcase: {
      tone: 'matcha-700',
      title: 'A little cake,',
      script: 'a big message',
      tagline: 'Six inches of cake for two, a message on top',
      heroPhotos: [
        { src: '/stock/home-bento.webp', alt: 'A small white bento cake painted with cherries, in its box' },
        {
          src: '/stock/treat-bento-cakes.webp',
          alt: 'A small bento cake that says happy birthday, in its box with a candle',
        },
      ],
    },
    extras: [
      'Message piped on top',
      'Candles',
      'Your colour scheme',
      'Matching cupcakes',
      'Gift wrapping',
      'Gift box',
      'Greeting card note',
    ],
    items: [
      {
        slug: 'message-bento',
        name: 'Message Bento',
        blurb: 'Whatever you want written, in your colour.',
        description:
          "A small round cake in a bento box with your words piped across it. Tell us the message and the colour and it's done.",
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Serves 2. Keep refrigerated.',
          'Contains wheat, dairy.',
        ],
      },
      {
        slug: 'minimal-bento',
        name: 'Minimal Bento',
        blurb: 'One colour, clean edges, nothing else.',
        description: 'Plain and smooth, a single colour, no writing. For the people who like it quiet.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Serves 2. Keep refrigerated.',
          'Contains wheat, dairy.',
        ],
      },
      {
        slug: 'photo-bento',
        name: 'Photo Bento',
        blurb: 'An edible print of your picture.',
        description:
          "Send the photo on WhatsApp and we'll print it onto the cake. Works best with a clear, bright picture.",
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Serves 2. Send the photo with your order.',
          'Contains wheat, dairy.',
        ],
      },
    ],
  },
  {
    slug: 'combos',
    name: 'Cake + Cupcake Combos',
    blurb: 'A cake and a set of cupcakes, iced to match, in one box.',
    unit: 'combos',
    minQty: 1,
    showcase: {
      tone: 'beige-700',
      title: 'A cake and',
      script: 'its cupcakes',
      tagline: 'Iced to match, in one box',
      heroPhotos: [
        { src: '/stock/treat-combos.webp', alt: 'A pink rose-piped cake on a stand with matching cupcakes' },
      ],
    },
    extras: [
      'Message piped on the cake',
      'Candles',
      'Matching colours',
      'Fresh flowers',
      'Gift wrapping',
      'Gift box',
      'Greeting card note',
    ],
    items: [
      {
        slug: 'half-kg-six',
        name: '½ kg Cake + 6 Cupcakes',
        blurb: 'Enough for a small table.',
        description: 'A half-kilo cake with six matching cupcakes around it, same flavour or two different ones.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Serves 6–8. Keep refrigerated.',
        ],
      },
      {
        slug: 'one-kg-six',
        name: '1 kg Cake + 6 Cupcakes',
        blurb: 'The usual birthday order.',
        description: 'A one-kilo cake with six cupcakes, iced to match. Pick the flavour for each.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Serves 10–12. Keep refrigerated.',
        ],
      },
      {
        slug: 'one-kg-twelve',
        name: '1 kg Cake + 12 Cupcakes',
        blurb: 'For the party that spilled onto the lawn.',
        description: 'A one-kilo cake and a full dozen cupcakes, all in one box.',
        details: [
          '100% eggless, like everything else that leaves this kitchen.',
          "Baked to order — please give us a day's notice where you can.",
          'Serves 14–16. Keep refrigerated.',
        ],
      },
    ],
  },
];

export const findTreatCategory = (slug: string) => treatCategories.find((category) => category.slug === slug);

/** "1 jar", "6 cupcakes", "250 grams": the unit in the singular for one. */
export const qtyLabel = (qty: number, unit: string) => `${qty} ${qty === 1 ? unit.replace(/s$/, '') : unit}`;
