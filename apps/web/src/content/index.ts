// Illustrations in the board palette (drawn for this repo), and the stock photos used where we have none of our own.
import bento from './bento.svg';
import brownie from './brownie.svg';
import cherryPie from './cherry-pie.svg';
import chocolateCake from './chocolate-cake.svg';
import cinnamonRoll from './cinnamon-roll.svg';
import combo from './combo.svg';
import cookies from './cookies.svg';
import cupcake from './cupcake.svg';
import jarCake from './jar-cake.svg';
import kitchen from './kitchen.svg';
import macarons from './macarons.svg';
import mixingBowl from './mixing-bowl.svg';
import mom from './mom.svg';
import sourdough from './sourdough.svg';
import strawberryCake from './strawberry-cake.svg';
import teaCake from './tea-cake.svg';
import { inr, kgLabel, mostOrdered } from './bakery';
import { cakes, findOccasion } from './catalog';

export const art = {
  bento,
  brownie,
  cherryPie,
  chocolateCake,
  cinnamonRoll,
  combo,
  cookies,
  cupcake,
  jarCake,
  kitchen,
  macarons,
  mixingBowl,
  mom,
  sourdough,
  strawberryCake,
  teaCake,
};

export interface StockPhoto {
  src: string;
  alt: string;
}

const photo = (name: string, alt: string): StockPhoto => ({ src: `/stock/${name}.webp`, alt });

/**
 * Stock photos (Unsplash, see public/stock/CREDITS.md) that stand in where we have no photo of our own:
 * the treat types, the flavours and the home page. The cakes we sell keep their real photos in the catalog.
 */
export const stock = {
  hero: photo('home-hero', 'A tall pink cake topped with cherries on a white cake stand'),
  about: photo('home-about', 'A pink drip cake with sprinkles on a pink cake stand'),
  custom: photo('home-custom', 'A vintage-piped white cake with gold pearls'),
  bento: photo('home-bento', 'A small white bento cake painted with cherries, in its box'),
  gift: photo('home-gift', 'Heart biscuits in a little gift box'),
  cupcakes: photo('home-cupcakes', 'Cupcakes with pink frosting and a cherry on top'),
  occasions: photo('home-occasions', 'A white cake on a stand, surrounded by little sweets'),
  kitchen: photo('home-kitchen', 'A hand sifting flour into a mixing bowl'),
};

/** A photo for each treat type, by its /shop slug. */
export const treatArt: Record<string, StockPhoto> = {
  brownies: photo('treat-brownies', 'A stack of fudgy brownies'),
  cookies: photo('treat-cookies', 'Chocolate chip cookies on a cooling rack'),
  'jar-cakes': photo('treat-jar-cakes', 'Chocolate cake layered with cream in glass jars'),
  'dry-cakes': photo('treat-dry-cakes', 'A sliced loaf tea cake'),
  cupcakes: photo('treat-cupcakes', 'A cupcake with pink frosting and a cherry'),
  'bento-cakes': photo('treat-bento-cakes', 'A small bento cake that says happy birthday, in its box with a candle'),
  combos: photo('treat-combos', 'A pink rose-piped cake on a stand with matching cupcakes'),
};

/** A cut slice of each flavour from bakery.cakeFlavours, with what's inside it. */
export const flavours: Record<string, StockPhoto & { inside: string }> = {
  'Chocolate truffle': {
    ...photo('flavour-chocolate-truffle', 'A slice of layered chocolate truffle cake'),
    inside: 'Chocolate sponge, layered and covered in dark chocolate ganache.',
  },
  Vanilla: {
    ...photo('flavour-vanilla', 'A slice of vanilla layer cake'),
    inside: 'Soft vanilla sponge with whipped vanilla cream.',
  },
  'Black forest': {
    ...photo('flavour-black-forest', 'A slice of black forest cake with a cherry on top'),
    inside: 'Chocolate sponge, whipped cream, cherries and chocolate shavings.',
  },
  'Red velvet': {
    ...photo('flavour-red-velvet', 'A slice of red velvet cake with cream cheese layers'),
    inside: 'Cocoa-red sponge with a cream cheese frosting.',
  },
  Butterscotch: {
    ...photo('flavour-butterscotch', 'A slice of butterscotch cake with a caramel drizzle'),
    inside: 'Vanilla sponge with butterscotch cream and crunchy praline.',
  },
  Pineapple: {
    ...photo('flavour-pineapple', 'A cream cake decorated with pineapple pieces'),
    inside: 'Vanilla sponge with whipped cream and pineapple pieces.',
  },
  'Fresh fruit': {
    ...photo('flavour-fresh-fruit', 'A slice of cream cake layered with strawberries'),
    inside: 'Vanilla sponge with whipped cream and the season’s fruit.',
  },
  Rasmalai: {
    ...photo('flavour-rasmalai', 'A slice of cake topped with pistachios and rose petals'),
    inside: 'Saffron sponge with rasmalai cream, pistachios and cardamom.',
  },
};

export interface MenuItem {
  name: string;
  image: string;
  alt: string;
  price: string;
  description: string;
  category: string;
  href: string;
  badge?: 'Most ordered';
}

/** Real cakes from the catalog in menu-card form, for stories and teasers. */
export const menu = (): MenuItem[] =>
  cakes.map((cake) => ({
    name: cake.name,
    image: cake.photos[0]?.thumb ?? strawberryCake,
    alt: cake.name,
    price: `${inr(cake.price)} · ${kgLabel(cake.weightKg)}`,
    description: cake.description,
    category: findOccasion(cake.occasion)?.name ?? '',
    href: `/catalog/${cake.slug}`,
    badge: mostOrdered.includes(cake.slug) ? 'Most ordered' : undefined,
  }));
