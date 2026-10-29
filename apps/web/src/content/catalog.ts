// Cakes by occasion, from the bakesbymom D1 database on Cloudflare: the catalog the old site (bakesbymom.vercel.app)
// reads and its admin page edits. The Worker in front of the database serves it at /api/catalog; the site renders
// the copy in catalog.json straight away and swaps in the live catalog as soon as it arrives.
// Prices are in rupees for the listed weight; bigger or smaller cakes are priced off the per-pound rate.
import { useSyncExternalStore } from 'react';
import snapshot from './catalog.json';

export interface CakePhoto {
  src: string;
  /** Known for the cut-outs in public/photos; not for a photo added later in the admin panel. */
  width?: number;
  height?: number;
}

/** A flavour or add-on set for one cake in the admin panel, and what it adds to the price. */
export interface CakeOption {
  name: string;
  priceDelta: number;
}

export interface Cake {
  /** Also the URL: /catalog/<slug>, the same as on the old site. */
  slug: string;
  name: string;
  description: string;
  occasion: string;
  /** Rupees per pound (1 pound = ½ kg on the menu). */
  perPound: number;
  weightKg: number;
  /** Rupees for the listed weight. */
  price: number;
  photos: CakePhoto[];
  /** This cake's own flavours and add-ons. Empty means the bakery's usual lists (bakery.ts). */
  flavours: CakeOption[];
  addons: CakeOption[];
}

export interface Occasion {
  slug: string;
  name: string;
  description: string;
  cakes: Cake[];
}

/* The rows the catalog API returns (the tables are in the old site's db/schema.sql) -------------------- */

export interface ApiOption {
  name: string;
  price_delta: number;
}

export interface ApiCake {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  per_pound_price: number;
  weight_kg: number;
  fixed_price: number;
  sort_order: number;
  cover_url: string | null;
  /** Only in /api/cakes/<id> (and catalog.json); /api/catalog has the cover alone. */
  photos?: { url: string; sort_order: number }[];
  flavours?: ApiOption[];
  addons?: ApiOption[];
}

/** /api/cakes/<id>: the cake with all its photos, flavours and add-ons. */
type ApiCakeDetail = Omit<ApiCake, 'cover_url'> & Required<Pick<ApiCake, 'photos' | 'flavours' | 'addons'>>;

export interface ApiCategory {
  id: string;
  name: string;
  description: string | null;
  sort_order: number;
  cakes: ApiCake[];
}

/** On Vercel, /api is rewritten to the Worker (vercel.json); `npm run dev` proxies it (vite.config.ts). */
const api = ((import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() || '/api').replace(/\/+$/, '');

const cutout = (name: string, width: number): CakePhoto => ({ src: `/photos/${name}.webp`, width, height: 1000 });

/**
 * D1 points at the phone photos in the R2 bucket; the site shows cut-outs of them from public/photos, so each
 * of those photos maps to its cut-out. A photo uploaded later in the admin panel is shown as it was uploaded.
 */
const cutouts: Record<string, CakePhoto> = {
  'IMG-20260913-WA0002.png': cutout('spiderman-1', 750),
  'IMG-20260913-WA0012.png': cutout('dragon-ball-1', 750),
  'IMG-20260913-WA0008.png': cutout('football-messi-1', 750),
  'IMG-20260310-WA0017.png': cutout('first-birthday-1', 449),
  'IMG-20251130-WA0022.png': cutout('mom-photo-1', 753),
  'IMG-20260213-WA0054.png': cutout('mom-butterfly-1', 451),
  'IMG-20260913-WA0007.png': cutout('maa-wings-1', 750),
  'IMG-20260808-WA0045.png': cutout('super-dad-1', 750),
  'IMG-20260913-WA0009.png': cutout('hbd-wifey-1', 750),
  'IMG-20260206-WA0062.png': cutout('heart-pearl-1', 451),
  'IMG-20260206-WA0059.png': cutout('heart-pearl-2', 451),
  'IMG-20260206-WA0061.png': cutout('heart-pearl-3', 451),
  'IMG-20260913-WA0011.png': cutout('choco-drip-1', 750),
  'IMG-20251128-WA0019.png': cutout('bride-to-be-1', 902),
  'IMG-20251130-WA0019.png': cutout('engaged-hands-1', 451),
  'IMG-20251130-WA0018.png': cutout('engaged-hands-2', 451),
  'IMG-20251130-WA0020.png': cutout('engaged-hands-3', 451),
  'IMG-20260913-WA0003.png': cutout('anniversary-maroon-1', 750),
  'IMG-20260913-WA0005.png': cutout('anniversary-50-1', 750),
  'IMG-20260808-WA0046.png': cutout('mom-flowerpot-1', 750),
  'IMG-20251202-WA0037.png': cutout('best-husband-dad-1', 450),
  'IMG-20260913-WA0006.png': cutout('every-smile-1', 750),
  'IMG-20251130-WA0023.png': cutout('farewell-flights-1', 449),
  'IMG-20260913-WA0013.png': cutout('janmashtami-1', 750),
  'IMG-20260913-WA0014.png': cutout('teachers-day-1', 750),
  'IMG-20260913-WA0004.png': cutout('teachers-day-2', 750),
};

/** "/api/photos/<key>" is the Worker's own path; anything absolute is used as it is. */
function toPhoto(url: string): CakePhoto {
  const known = cutouts[url.slice(url.lastIndexOf('/') + 1)];
  if (known) return known;
  if (/^(https?:)?\/\//i.test(url) || url.startsWith('data:')) return { src: url };
  return { src: `${api}${url.replace(/^\/?(api\/)?/, '/')}` };
}

const toOption = ({ name, price_delta }: ApiOption): CakeOption => ({ name, priceDelta: price_delta });

/** "cat-birthday-kids" → "birthday-kids", the occasion's slug on the old site. */
const occasionSlug = (id: string) => id.replace(/^cat-/, '');

/**
 * /api/catalog lists a cover photo only, so a cake whose cover hasn't changed keeps the photos, flavours and add-ons
 * `before` had.
 */
function toCake(row: ApiCake, occasion: string, before?: Cake): Cake {
  const cover = row.cover_url ? toPhoto(row.cover_url) : undefined;
  const same = before && before.photos[0]?.src === cover?.src;
  return {
    slug: row.id,
    name: row.name,
    description: row.description ?? '',
    occasion,
    perPound: row.per_pound_price,
    weightKg: row.weight_kg,
    price: row.fixed_price,
    photos: row.photos ? row.photos.map((photo) => toPhoto(photo.url)) : same ? before.photos : cover ? [cover] : [],
    flavours: row.flavours?.map(toOption) ?? (same ? before.flavours : []),
    addons: row.addons?.map(toOption) ?? (same ? before.addons : []),
  };
}

/** The API's categories and cakes in the site's shape, in the API's order. */
export function toOccasions(rows: ApiCategory[], before: Cake[] = []): Occasion[] {
  return rows.map((row) => {
    const slug = occasionSlug(row.id);
    return {
      slug,
      name: row.name,
      description: row.description ?? '',
      cakes: row.cakes.map((cake) =>
        toCake(
          cake,
          slug,
          before.find((b) => b.slug === cake.id),
        ),
      ),
    };
  });
}

/* The catalog the pages read: catalog.json first, then the live one ------------------------------------ */

export let occasions: Occasion[] = toOccasions(snapshot as ApiCategory[]);
export let cakes: Cake[] = occasions.flatMap((occasion) => occasion.cakes);

let version = 0;
let settled = false;
const listeners = new Set<() => void>();

function publish(next: Occasion[]) {
  occasions = next;
  cakes = next.flatMap((occasion) => occasion.cakes);
  version++;
  for (const listener of listeners) listener();
}

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${api}${path}`);
  if (!response.ok) throw new Error(`GET ${api}${path} failed (${response.status})`);
  return (await response.json()) as T;
}

/** Swaps in the live catalog. If the API can't be reached, the site keeps showing catalog.json. */
export async function loadCatalog() {
  let next = occasions;
  try {
    next = toOccasions(await get<ApiCategory[]>('/catalog'), cakes);
  } catch (error) {
    console.warn('Showing the saved catalog, the live one did not load.', error);
  }
  settled = true;
  publish(next);
}

/** Fetches one cake's photos, flavours and add-ons, which the catalog doesn't list. */
export async function refreshCake(slug: string) {
  try {
    const row = await get<ApiCakeDetail | null>(`/cakes/${encodeURIComponent(slug)}`);
    if (!row) return;
    const cake = toCake({ ...row, cover_url: row.photos[0]?.url ?? null }, occasionSlug(row.category_id));
    publish(
      occasions.map((occasion) => ({
        ...occasion,
        cakes: occasion.cakes.map((other) => (other.slug === slug ? cake : other)),
      })),
    );
  } catch {
    // Keep what the catalog already had for it.
  }
}

/** True once the live catalog has arrived (or failed to), so a cake missing from it really is missing. */
export const catalogSettled = () => settled;

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** Re-renders the caller whenever the catalog changes. */
export const useCatalog = () => useSyncExternalStore(subscribe, () => version);

export const findCake = (slug: string) => cakes.find((cake) => cake.slug === slug);

export const findOccasion = (slug: string) => occasions.find((occasion) => occasion.slug === slug);
