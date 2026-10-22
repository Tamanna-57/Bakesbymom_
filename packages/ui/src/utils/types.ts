/**
 * Flavor tones. Each maps to `--bbm-color-tone-<tone>-*` tokens
 * (bg, border, fg, solid, on-solid, pattern) through `data-bbm-tone`.
 */
export type Tone =
  'cherry' | 'strawberry' | 'blueberry' | 'butter' | 'pistachio' | 'caramel' | 'lavender' | 'cocoa' | 'cream';

export const TONES: readonly Tone[] = [
  'cherry',
  'strawberry',
  'blueberry',
  'butter',
  'pistachio',
  'caramel',
  'lavender',
  'cocoa',
  'cream',
];

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
