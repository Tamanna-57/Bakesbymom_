// Original bakery illustrations in the board palette (drawn for this repo, free to use in stories and mockups).
import cherryPie from './cherry-pie.svg';
import chocolateCake from './chocolate-cake.svg';
import cinnamonRoll from './cinnamon-roll.svg';
import cookies from './cookies.svg';
import cupcake from './cupcake.svg';
import kitchen from './kitchen.svg';
import macarons from './macarons.svg';
import mixingBowl from './mixing-bowl.svg';
import mom from './mom.svg';
import sourdough from './sourdough.svg';
import strawberryCake from './strawberry-cake.svg';

export const art = {
  cherryPie,
  chocolateCake,
  cinnamonRoll,
  cookies,
  cupcake,
  kitchen,
  macarons,
  mixingBowl,
  mom,
  sourdough,
  strawberryCake,
};

export interface MenuItem {
  name: string;
  image: string;
  alt: string;
  price: string;
  description: string;
  category: 'Cakes' | 'Cookies' | 'Pies' | 'Breads' | 'Little treats';
  badge?: 'Bestseller' | 'New' | 'Weekend only';
}

/** Sample menu used across stories and page mockups. */
export const menu: MenuItem[] = [
  {
    name: 'Strawberry layer cake',
    image: strawberryCake,
    alt: 'Strawberry layer cake with pink frosting and a cherry on top',
    price: 'From $38',
    description: 'Vanilla sponge, fresh strawberry jam, whipped buttercream.',
    category: 'Cakes',
    badge: 'Bestseller',
  },
  {
    name: 'Chocolate fudge cake',
    image: chocolateCake,
    alt: 'Chocolate cake with ganache drips and strawberries',
    price: 'From $42',
    description: 'Cocoa sponge, salted caramel layer, dark ganache drip.',
    category: 'Cakes',
  },
  {
    name: 'Brown butter cookies',
    image: cookies,
    alt: 'Three chocolate chip cookies on a blue plate',
    price: '$14 / dozen',
    description: 'Crisp edges, chewy middles, two kinds of chocolate.',
    category: 'Cookies',
    badge: 'New',
  },
  {
    name: 'Sour cherry pie',
    image: cherryPie,
    alt: 'Lattice-topped cherry pie seen from above',
    price: '$28',
    description: 'All-butter crust, sour cherries, a little almond.',
    category: 'Pies',
    badge: 'Weekend only',
  },
  {
    name: 'Birthday cupcakes',
    image: cupcake,
    alt: 'Pink cupcake with swirled frosting, sprinkles and a cherry',
    price: '$24 / six',
    description: 'Vanilla bean cupcakes with rainbow sprinkles.',
    category: 'Little treats',
  },
  {
    name: 'Cinnamon rolls',
    image: cinnamonRoll,
    alt: 'Cinnamon roll with a white icing drizzle',
    price: '$18 / four',
    description: 'Brioche dough, brown sugar swirl, cream cheese glaze.',
    category: 'Little treats',
  },
  {
    name: 'Macaron box',
    image: macarons,
    alt: 'Stack of pink, pistachio and lemon macarons',
    price: '$16 / eight',
    description: 'Raspberry, pistachio and lemon curd.',
    category: 'Little treats',
  },
  {
    name: 'Sunday sourdough',
    image: sourdough,
    alt: 'Round sourdough loaf with scored crust',
    price: '$9',
    description: '48-hour ferment, crackly crust, open crumb.',
    category: 'Breads',
  },
];
