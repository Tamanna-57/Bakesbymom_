// Copies the cake catalog out of the bakesbymom D1 database into src/content/catalog.json.
//
//   npm run sync:catalog -w @bakesbymom/web
//
// The site reads the live catalog from the same database at runtime (src/content/catalog.ts); this copy is
// what it shows before that answer arrives, if the API can't be reached, and in Storybook and the tests.
// It reads through the Cloudflare Worker that owns the database, so it needs no Cloudflare credentials.
import { writeFile } from 'node:fs/promises';

const api = (process.env.CATALOG_API ?? 'https://bakesbymom.snehagupta.workers.dev/api').replace(/\/+$/, '');
const out = new URL('../src/content/catalog.json', import.meta.url);

async function get(path) {
  const response = await fetch(`${api}${path}`);
  if (!response.ok) throw new Error(`GET ${api}${path} failed (${response.status})`);
  return response.json();
}

const option = ({ name, price_delta }) => ({ name, price_delta });

// /api/catalog has one cover photo per cake; /api/cakes/<id> has all of them, and the flavours and add-ons.
const categories = await get('/catalog');
const snapshot = await Promise.all(
  categories.map(async ({ id, name, description, sort_order, cakes }) => ({
    id,
    name,
    description,
    sort_order,
    cakes: await Promise.all(
      cakes.map(async (cake) => {
        const detail = await get(`/cakes/${encodeURIComponent(cake.id)}`);
        return {
          id: cake.id,
          category_id: cake.category_id,
          name: cake.name,
          description: cake.description,
          per_pound_price: cake.per_pound_price,
          weight_kg: cake.weight_kg,
          fixed_price: cake.fixed_price,
          sort_order: cake.sort_order,
          cover_url: cake.cover_url,
          photos: (detail?.photos ?? []).map(({ url, sort_order }) => ({ url, sort_order })),
          flavours: (detail?.flavours ?? []).map(option),
          addons: (detail?.addons ?? []).map(option),
        };
      }),
    ),
  })),
);

await writeFile(out, `${JSON.stringify(snapshot, null, 2)}\n`);
const count = snapshot.reduce((n, category) => n + category.cakes.length, 0);
console.log(`Wrote ${snapshot.length} occasions and ${count} cakes from ${api} to ${out.pathname}`);
