// The materials the isometric drawings are made of, all from the brand palette. Each has a top colour, a
// highlight, the lit side, the shaded side and a fine edge line one step darker, which is what makes the shapes
// read as solid without the heavy sticker outline of the flat doodles.

export interface Material {
  top: string;
  hi: string;
  side: string;
  shade: string;
  line: string;
}

const v = (name: string) => `var(--bbm-color-${name})`;

const mat = (top: string, hi: string, side: string, shade: string, line: string): Material => ({
  top: v(top),
  hi: v(hi),
  side: v(side),
  shade: v(shade),
  line: v(line),
});

export const M = {
  paper: mat('paper', 'paper', 'beige-100', 'beige-300', 'beige-400'),
  cream: mat('beige-100', 'beige-50', 'beige-200', 'beige-300', 'beige-500'),
  biscuit: mat('beige-200', 'beige-100', 'beige-300', 'beige-400', 'beige-600'),
  pink: mat('pink-200', 'pink-100', 'pink-300', 'pink-400', 'pink-600'),
  blush: mat('pink-100', 'pink-50', 'pink-200', 'pink-300', 'pink-500'),
  rose: mat('pink-300', 'pink-200', 'pink-400', 'pink-500', 'pink-700'),
  blue: mat('blue-100', 'blue-50', 'blue-200', 'blue-300', 'blue-500'),
  sky: mat('blue-200', 'blue-100', 'blue-300', 'blue-400', 'blue-600'),
  navy: mat('blue-600', 'blue-500', 'blue-700', 'blue-800', 'blue-900'),
  cherry: mat('cherry-500', 'cherry-300', 'cherry-600', 'cherry-800', 'cherry-900'),
  wine: mat('cherry-700', 'cherry-500', 'cherry-800', 'cherry-900', 'cherry-900'),
  cocoa: mat('brown-500', 'brown-400', 'brown-600', 'brown-800', 'brown-900'),
  chocolate: mat('brown-700', 'brown-500', 'brown-800', 'brown-900', 'brown-900'),
  caramel: mat('brown-300', 'brown-200', 'brown-400', 'brown-500', 'brown-700'),
  sponge: mat('butter-200', 'butter-100', 'brown-200', 'brown-300', 'brown-500'),
  butter: mat('butter-200', 'butter-100', 'butter-300', 'butter-400', 'butter-600'),
  gold: mat('butter-300', 'butter-100', 'butter-400', 'butter-600', 'butter-700'),
  matcha: mat('matcha-200', 'matcha-100', 'matcha-300', 'matcha-400', 'matcha-600'),
  leaf: mat('matcha-400', 'matcha-300', 'matcha-500', 'matcha-600', 'matcha-800'),
  egg: mat('beige-50', 'paper', 'beige-100', 'beige-300', 'beige-400'),
} satisfies Record<string, Material>;

export type MaterialName = keyof typeof M;
