import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (file) => readFileSync(new URL(`../dist/${file}`, import.meta.url), 'utf8');
const tokens = JSON.parse(read('json/tokens.json'));
const docs = JSON.parse(read('docs/tokens.json'));

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const { color } = tokens;
const AA = 4.5;
const UI = 3;

describe('color contrast (WCAG 2.2)', () => {
  const surfaces = [
    'canvas',
    'surface',
    'raised',
    'sunken',
    'blush',
    'sky',
    'butter',
    'pistachio',
    'caramel',
    'lavender',
  ];

  it.each(surfaces)('primary, secondary and muted text are AA on bg.%s', (surface) => {
    for (const role of ['primary', 'secondary']) {
      expect(contrast(color.text[role], color.bg[surface])).toBeGreaterThanOrEqual(AA);
    }
    expect(contrast(color.text.muted, color.bg[surface])).toBeGreaterThanOrEqual(AA);
  });

  it('brand and link text are AA on the canvas and surface', () => {
    for (const bg of [color.bg.canvas, color.bg.surface]) {
      expect(contrast(color.text.brand, bg)).toBeGreaterThanOrEqual(AA);
      expect(contrast(color.text.link, bg)).toBeGreaterThanOrEqual(AA);
      expect(contrast(color.text['link-hover'], bg)).toBeGreaterThanOrEqual(AA);
    }
  });

  it('inverse text is AA on inverse and brand bands', () => {
    expect(contrast(color.text.inverse, color.bg.inverse)).toBeGreaterThanOrEqual(AA);
    expect(contrast(color.text.inverse, color.bg.brand)).toBeGreaterThanOrEqual(AA);
  });

  it.each(['primary', 'secondary', 'soft'])('%s action label is AA in every state', (kind) => {
    const action = color.action[kind];
    for (const state of ['bg', 'bg-hover', 'bg-active']) {
      expect(contrast(action.fg, action[state])).toBeGreaterThanOrEqual(AA);
    }
  });

  it.each(Object.keys(color.tone))('tone %s: fg/bg and on-solid/solid are AA', (tone) => {
    const t = color.tone[tone];
    expect(contrast(t.fg, t.bg)).toBeGreaterThanOrEqual(AA);
    expect(contrast(t['on-solid'], t.solid)).toBeGreaterThanOrEqual(AA);
  });

  it.each(Object.keys(color.status))('status %s: fg/bg is AA', (status) => {
    expect(contrast(color.status[status].fg, color.status[status].bg)).toBeGreaterThanOrEqual(AA);
  });

  it('outlines and the focus ring are visible (3:1) on every surface', () => {
    for (const surface of surfaces) {
      expect(contrast(color.border.default, color.bg[surface])).toBeGreaterThanOrEqual(UI);
      expect(contrast(color.border.focus, color.bg[surface])).toBeGreaterThanOrEqual(UI);
    }
  });
});

describe('palette structure', () => {
  const families = [
    'cream',
    'cocoa',
    'cherry',
    'strawberry',
    'blueberry',
    'butter',
    'pistachio',
    'caramel',
    'lavender',
  ];

  it.each(families)('%s scale gets strictly darker step by step', (family) => {
    const steps = Object.keys(color[family])
      .map(Number)
      .sort((a, b) => a - b);
    const lums = steps.map((step) => luminance(color[family][step]));
    lums.slice(1).forEach((lum, i) => expect(lum).toBeLessThan(lums[i]));
  });

  it('every color resolves to a hex value', () => {
    for (const token of docs.filter((t) => t.type === 'color')) {
      expect(token.value, token.name).toMatch(/^#[0-9a-f]{6}([0-9a-f]{2})?$/);
    }
  });
});

describe('build outputs', () => {
  it('CSS has a prefixed variable for every token and no broken values', () => {
    const css = read('css/tokens.css');
    expect(css).not.toMatch(/undefined|\[object Object\]|NaN/);
    for (const token of docs) expect(css).toContain(`${token.name}:`);
  });

  it('semantic CSS variables keep references to primitives', () => {
    const css = read('css/tokens.css');
    expect(css).toContain('--bbm-color-text-primary: var(--bbm-color-cocoa-900)');
    expect(css).toContain('--bbm-color-action-primary-bg: var(--bbm-color-cherry-600)');
  });

  it('Tailwind theme maps onto v4 namespaces', () => {
    const theme = read('tailwind/theme.css');
    expect(theme).toMatch(/^@theme \{/m);
    for (const name of [
      '--color-cherry-600',
      '--color-canvas',
      '--color-ink',
      '--color-line',
      '--font-display',
      '--text-display-xl',
      '--text-display-xl--line-height',
      '--radius-pill',
      '--shadow-sticker-md',
      '--ease-bounce',
      '--breakpoint-md',
    ]) {
      expect(theme).toContain(`${name}:`);
    }
    expect(theme).not.toMatch(/undefined|\[object Object\]/);
  });

  it('JS exports are named constants', () => {
    const js = read('js/tokens.js');
    expect(js).toContain('export const colorCherry600 = "#a81e31"');
    expect(read('js/tokens.d.ts')).toContain('export const colorCherry600: string;');
  });
});
