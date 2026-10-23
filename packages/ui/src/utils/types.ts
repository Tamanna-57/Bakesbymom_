/**
 * Flavor tones from the bakesbymom board palette. Each maps to
 * `--bbm-color-tone-<tone>-*` tokens (bg, border, fg, solid, on-solid, pattern)
 * through `data-bbm-tone`.
 */
export type Tone = 'blue' | 'pink' | 'beige' | 'cherry' | 'brown' | 'butter' | 'matcha';

export const TONES: readonly Tone[] = ['blue', 'pink', 'beige', 'cherry', 'brown', 'butter', 'matcha'];

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
