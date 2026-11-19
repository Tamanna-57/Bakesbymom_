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
import { cakes, findCake, findOccasion, type Cake } from './catalog';

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
 * The hero's cake is one of ours, not a stand-in: a cake from the catalog re-shot against a styled
 * background (the same pictures in public/photos/restaged that the catalog shows in place of the
 * R2 cut-outs). Swap the file here to put a different cake under the arch.
 */
export const heroCake: StockPhoto = {
  src: '/photos/restaged/anniversary-maroon.jpg',
  alt: 'Our anniversary cake in maroon and gold, finished with roses, gold pearls and a heart topper',
};

/**
 * Stock photos (Unsplash, see public/stock/CREDITS.md) that stand in where we have no photo of our own:
 * the treat types and the home page. The cakes we sell keep their real photos in the catalog, and the flavours are
 * shown on those cakes (see `flavours`).
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

/**
 * Each flavour from bakery.cakeFlavours, with what's inside it and one of our own cakes to show it on: any cake
 * can be baked in any flavour, so each card shows a real cake from the catalog that looks the part (a chocolate drip
 * for chocolate truffle, red roses for red velvet). `cake` is its slug in the catalog database. The cut-outs
 * (photos on a clear background) suit the flavour cards best, so these are all cut-outs.
 */
export const flavours: Record<string, { inside: string; cake: string }> = {
  'Chocolate truffle': {
    inside: 'Chocolate sponge, layered and covered in dark chocolate ganache.',
    cake: 'cake-choco-drip',
  },
  Vanilla: { inside: 'Soft vanilla sponge with whipped vanilla cream.', cake: 'cake-heart-pearl' },
  'Black forest': {
    inside: 'Chocolate sponge, whipped cream, cherries and chocolate shavings.',
    cake: 'cake-every-smile',
  },
  'Red velvet': { inside: 'Cocoa-red sponge with a cream cheese frosting.', cake: 'cake-hbd-wifey' },
  Butterscotch: { inside: 'Vanilla sponge with butterscotch cream and crunchy praline.', cake: 'cake-teachers-day' },
  Pineapple: { inside: 'Vanilla sponge with whipped cream and pineapple pieces.', cake: 'cake-first-birthday' },
  'Fresh fruit': { inside: 'Vanilla sponge with whipped cream and the season’s fruit.', cake: 'cake-maa-wings' },
  Rasmalai: {
    inside: 'Saffron sponge with rasmalai cream, pistachios and cardamom.',
    cake: 'cake-anniversary-50',
  },
  Blueberry: { inside: 'Vanilla sponge with whipped cream and a blueberry compote.', cake: 'cake-janmashtami' },
  Biscoff: {
    inside: 'Vanilla sponge with Biscoff cream, caramel spread and biscuit crumbs.',
    cake: 'cake-super-dad',
  },
};

/** A cut-out from the R2 bucket (a PNG on a clear background), not a restaged or full photo. */
export const isCutout = (cake: Cake) => {
  const photo = cake.photos[0];
  return !!photo && !photo.backdrop && /\.png$/i.test(photo.src);
};

/**
 * The cake each flavour is shown on: the one picked in `flavours`, or, if that cake has left the catalog, another
 * of ours that no other flavour is using (a cut-out where there is one). Undefined until the catalog arrives.
 */
export function flavourCakes(): Record<string, Cake | undefined> {
  const picked: Record<string, Cake | undefined> = {};
  const used = new Set<string>();
  for (const [name, { cake: slug }] of Object.entries(flavours)) {
    const cake = findCake(slug);
    if (cake?.photos.length) {
      picked[name] = cake;
      used.add(cake.slug);
    }
  }
  const spare = [...cakes.filter(isCutout), ...cakes.filter((cake) => cake.photos.length && !isCutout(cake))];
  for (const name of Object.keys(flavours)) {
    if (picked[name]) continue;
    const next = spare.find((cake) => !used.has(cake.slug));
    if (next) {
      picked[name] = next;
      used.add(next.slug);
    }
  }
  return picked;
}

/** The cake one flavour is shown on (see flavourCakes). */
export const flavourCake = (flavour: string) => flavourCakes()[flavour];

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
