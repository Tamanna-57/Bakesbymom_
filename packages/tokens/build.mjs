// Builds src/**/*.json (W3C DTCG) into every platform the design system ships.
//
//   dist/css/tokens.css        CSS custom properties (--bbm-*), semantic tokens reference primitives
//   dist/scss/_tokens.scss     SCSS variables ($bbm-*), fully resolved
//   dist/js/tokens.js + .d.ts  ESM constants (colorCherry600, ...)
//   dist/json/tokens.json      nested, resolved values
//   dist/tailwind/theme.css    Tailwind v4 @theme block
//   dist/docs/tokens.json      flat list with descriptions and aliases (feeds Storybook docs)
//   dist/dtcg/tokens.json      merged DTCG source (import into Figma via Tokens Studio)
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';
import { fileHeader } from 'style-dictionary/utils';

const root = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(root, 'src');
const distDir = path.join(root, 'dist');

const PREFIX = 'bbm';
const VALUE_TRANSFORMS = ['color/css', 'fontFamily/css', 'cubicBezier/css', 'shadow/css/shorthand'];

const PRIMITIVE_FAMILIES = new Set(['white', 'paper', 'blue', 'pink', 'beige', 'cherry', 'brown', 'butter', 'matcha']);

// Maps a token path onto Tailwind v4 theme namespaces (https://tailwindcss.com/docs/theme).
// Returns null for tokens that have no Tailwind equivalent.
function tailwindName(tokenPath) {
  const [group, a, b] = tokenPath;
  switch (group) {
    case 'color':
      if (PRIMITIVE_FAMILIES.has(a)) return ['color', a, b].filter(Boolean).join('-');
      if (a === 'bg') return `color-${b}`;
      if (a === 'text') return b === 'primary' ? 'color-ink' : `color-ink-${b}`;
      if (a === 'border') return b === 'default' ? 'color-line' : `color-line-${b}`;
      return `color-${tokenPath.slice(1).join('-')}`;
    case 'font':
      if (a === 'family') return `font-${b}`;
      if (a === 'weight') return `font-weight-${b}`;
      return null;
    case 'text': {
      const suffix = {
        size: '',
        'line-height': '--line-height',
        tracking: '--letter-spacing',
        weight: '--font-weight',
      }[b];
      return suffix === undefined ? null : `text-${a}${suffix}`;
    }
    case 'radius':
      return `radius-${a}`;
    case 'shadow':
      return `shadow-${[a, b].filter(Boolean).join('-')}`;
    case 'breakpoint':
      return `breakpoint-${a}`;
    case 'motion':
      return a === 'easing' ? `ease-${b}` : null;
    default:
      return null;
  }
}

StyleDictionary.registerFormat({
  name: 'bbm/tailwind-theme',
  format: async ({ dictionary, file }) => {
    const header = await fileHeader({ file });
    const lines = dictionary.allTokens
      .map((token) => [tailwindName(token.path), token.$value])
      .filter(([name]) => name)
      .map(([name, value]) => `  --${name}: ${value};`);
    return (
      header +
      '@theme {\n' +
      '  /* 4px spacing grid: p-4 = 1rem, gap-6 = 1.5rem, matching --bbm-space-* */\n' +
      '  --spacing: 0.25rem;\n' +
      lines.join('\n') +
      '\n}\n'
    );
  },
});

StyleDictionary.registerFormat({
  name: 'bbm/docs-json',
  format: ({ dictionary }) =>
    JSON.stringify(
      dictionary.allTokens.map((token) => ({
        name: `--${token.name}`,
        path: token.path,
        type: token.$type ?? null,
        value: token.$value,
        original: token.original.$value,
        description: token.$description ?? null,
        fluid: token.$extensions?.['bbm.fluid'] ?? null,
      })),
      null,
      2,
    ) + '\n',
});

async function listJson(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith('.json'))
    .map((e) => path.join(e.parentPath ?? e.path, e.name))
    .sort();
}

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === 'object' && !Array.isArray(value) && !('$value' in value)) {
      target[key] = deepMerge(target[key] ?? {}, value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

await rm(distDir, { recursive: true, force: true });

const sd = new StyleDictionary({
  source: [path.join(srcDir, '**/*.json')],
  usesDtcg: true,
  log: { verbosity: 'default', warnings: 'warn' },
  platforms: {
    css: {
      prefix: PREFIX,
      transforms: ['attribute/cti', 'name/kebab', ...VALUE_TRANSFORMS],
      buildPath: `${distDir}/`,
      files: [
        { destination: 'css/tokens.css', format: 'css/variables', options: { outputReferences: true } },
        { destination: 'tailwind/theme.css', format: 'bbm/tailwind-theme' },
        { destination: 'docs/tokens.json', format: 'bbm/docs-json' },
      ],
    },
    scss: {
      prefix: PREFIX,
      transforms: ['attribute/cti', 'name/kebab', ...VALUE_TRANSFORMS],
      buildPath: `${distDir}/scss/`,
      files: [{ destination: '_tokens.scss', format: 'scss/variables' }],
    },
    js: {
      transforms: ['attribute/cti', 'name/camel', ...VALUE_TRANSFORMS],
      buildPath: `${distDir}/js/`,
      files: [
        { destination: 'tokens.js', format: 'javascript/es6' },
        { destination: 'tokens.d.ts', format: 'typescript/es6-declarations' },
      ],
    },
    json: {
      transforms: ['attribute/cti', 'name/kebab', ...VALUE_TRANSFORMS],
      buildPath: `${distDir}/json/`,
      files: [{ destination: 'tokens.json', format: 'json/nested' }],
    },
  },
});

await sd.buildAllPlatforms();

// Merged DTCG source for tools that read the W3C format directly (Tokens Studio, Specify, etc.).
const merged = {};
for (const file of await listJson(srcDir)) {
  deepMerge(merged, JSON.parse(await readFile(file, 'utf8')));
}
await mkdir(path.join(distDir, 'dtcg'), { recursive: true });
await writeFile(path.join(distDir, 'dtcg/tokens.json'), JSON.stringify(merged, null, 2) + '\n');

console.log('✔ @bakesbymom/tokens built to dist/');
