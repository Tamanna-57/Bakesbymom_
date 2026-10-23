// Illustrations in the board palette (drawn for this repo). Treats have no photos yet, so each type gets one.
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

/** The illustration for each treat type, by its /shop slug. */
export const treatArt: Record<string, { src: string; alt: string }> = {
  brownies: { src: brownie, alt: 'Two fudgy brownies with walnuts on a blue plate' },
  cookies: { src: cookies, alt: 'Three chocolate chip cookies on a blue plate' },
  'jar-cakes': { src: jarCake, alt: 'A layered chocolate jar cake with a cherry and a spoon' },
  'dry-cakes': { src: teaCake, alt: 'A loaf tea cake with a marble slice' },
  cupcakes: { src: cupcake, alt: 'A cupcake with swirled frosting and a cherry' },
  'bento-cakes': { src: bento, alt: 'A small pink bento cake with a piped heart in its box' },
  combos: { src: combo, alt: 'A cake with matching cupcakes beside it' },
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
export const menu: MenuItem[] = cakes.map((cake) => ({
  name: cake.name,
  image: cake.photos[0]?.src ?? strawberryCake,
  alt: cake.name,
  price: `${inr(cake.price)} · ${kgLabel(cake.weightKg)}`,
  description: cake.description,
  category: findOccasion(cake.occasion)?.name ?? '',
  href: `/catalog/${cake.slug}`,
  badge: mostOrdered.includes(cake.slug) ? 'Most ordered' : undefined,
}));
