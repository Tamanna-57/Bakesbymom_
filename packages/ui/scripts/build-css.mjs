// Bundles the component CSS by inlining relative @import statements.
//
//   dist/components.css   component styles only (bring your own tokens)
//   dist/styles.css       tokens + component styles (one import for apps)
//   dist/fonts.css        Google Fonts loader for Fraunces, Pinyon Script, DM Sans, DM Mono
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const IMPORT = /^@import\s+["'](\.[^"']+)["'];\s*$/gm;

async function inline(file, seen = new Set()) {
  if (seen.has(file)) throw new Error(`Circular @import: ${file}`);
  seen.add(file);
  const css = await readFile(file, 'utf8');
  let out = '';
  let last = 0;
  for (const match of css.matchAll(IMPORT)) {
    out += css.slice(last, match.index);
    out += await inline(path.resolve(path.dirname(file), match[1]), new Set(seen));
    last = match.index + match[0].length;
  }
  return out + css.slice(last);
}

const components = await inline(path.join(root, 'src/styles.css'));
const tokens = await readFile(fileURLToPath(import.meta.resolve('@bakesbymom/tokens/css')), 'utf8');

await mkdir(dist, { recursive: true });
await writeFile(path.join(dist, 'components.css'), components);
await writeFile(path.join(dist, 'styles.css'), `${tokens}\n${components}`);
await copyFile(path.join(root, 'src/fonts.css'), path.join(dist, 'fonts.css'));
console.log('✔ @bakesbymom/ui CSS written to dist/');
