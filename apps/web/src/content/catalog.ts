// Cakes by occasion, from the bakesbymom D1 database on Cloudflare: the catalog the old site (bakesbymom.vercel.app)
// reads and its admin page edits. The Worker in front of the database serves it at /api/catalog, and nothing about
// the cakes is kept in this repo: the pages fill in when the catalog arrives.
// Prices are in rupees for the listed weight; bigger or smaller cakes are priced off the per-pound rate.
import { useSyncExternalStore } from 'react';

export interface CakePhoto {
  /** The full photo, for the cake's own page. */
  src: string;
  /** A small 500 × 600 cover for shelves and tiles, or the full photo when there isn't one. */
  thumb: string;
  /**
   * The photos in R2 are cut-outs on a clear background, which the site shows whole on a colour. A restaged photo
   * has its own background, so it fills its frame instead.
   */
  backdrop: boolean;
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
  /** Only in /api/cakes/<id>; /api/catalog has the cover alone. */
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

/* Photos, the way the old site shows them (its src/lib/api.ts and src/lib/thumbs.ts) -------------------- */

/**
 * Cakes re-shot against a styled background. The bucket still holds the phone photo under its original key, and D1
 * points at that key, so the swap lives here: the old R2 key on the left, the restaged picture in public/photos on the
 * right.
 */
const restaged: Record<string, string> = {
  'IMG-20260913-WA0003.png': '/photos/restaged/anniversary-maroon.jpg',
  'IMG-20251128-WA0019.png': '/photos/restaged/bride-to-be.jpg',
  'IMG-20260213-WA0054.png': '/photos/restaged/mom-butterfly.jpg',
  'IMG-20251130-WA0019.png': '/photos/restaged/engaged-hands.jpg',
  'IMG-20260808-WA0046.png': '/photos/restaged/mom-flowerpot.jpg',
  'IMG-20251130-WA0022.png': '/photos/restaged/mom-photo-clothesline.jpg',
};

/** Covers with a 500 × 600 WebP in public/photos/thumbs (made by the old site's scripts/make-thumbs.mjs). */
const thumbnailed = new Set([
  'IMG-20251128-WA0019.png',
  'IMG-20251130-WA0019.png',
  'IMG-20251130-WA0022.png',
  'IMG-20251130-WA0023.png',
  'IMG-20251202-WA0037.png',
  'IMG-20260206-WA0062.png',
  'IMG-20260213-WA0054.png',
  'IMG-20260310-WA0017.png',
  'IMG-20260808-WA0045.png',
  'IMG-20260808-WA0046.png',
  'IMG-20260913-WA0002.png',
  'IMG-20260913-WA0003.png',
  'IMG-20260913-WA0005.png',
  'IMG-20260913-WA0006.png',
  'IMG-20260913-WA0007.png',
  'IMG-20260913-WA0008.png',
  'IMG-20260913-WA0009.png',
  'IMG-20260913-WA0011.png',
  'IMG-20260913-WA0012.png',
  'IMG-20260913-WA0013.png',
  'IMG-20260913-WA0014.png',
]);

/** "/api/photos/<key>" is the Worker's own path; anything absolute is used as it is. */
function toPhoto(url: string): CakePhoto {
  const name = url.slice(url.lastIndexOf('/') + 1);
  const src =
    restaged[name] ??
    (/^(https?:)?\/\//i.test(url) || url.startsWith('data:') ? url : `${api}${url.replace(/^\/?(api\/)?/, '/')}`);
  return {
    src,
    thumb: thumbnailed.has(name) ? `/photos/thumbs/${name.replace(/\.[^.]+$/, '')}.webp` : src,
    backdrop: name in restaged,
  };
}

const toOption = ({ name, price_delta }: ApiOption): CakeOption => ({ name, priceDelta: price_delta });

/** "cat-birthday-kids" → "birthday-kids", the occasion's slug on the old site. */
const occasionSlug = (id: string) => id.replace(/^cat-/, '');

function toCake(row: ApiCake, occasion: string): Cake {
  return {
    slug: row.id,
    name: row.name,
    description: row.description ?? '',
    occasion,
    perPound: row.per_pound_price,
    weightKg: row.weight_kg,
    price: row.fixed_price,
    photos: (row.photos?.map((photo) => photo.url) ?? (row.cover_url ? [row.cover_url] : [])).map(toPhoto),
    flavours: row.flavours?.map(toOption) ?? [],
    addons: row.addons?.map(toOption) ?? [],
  };
}

/** The API's categories and cakes in the site's shape, in the API's order. */
export function toOccasions(rows: ApiCategory[]): Occasion[] {
  return rows.map((row) => {
    const slug = occasionSlug(row.id);
    return {
      slug,
      name: row.name,
      description: row.description ?? '',
      cakes: row.cakes.map((cake) => toCake(cake, slug)),
    };
  });
}

/* The catalog the pages read ------------------------------------------------------------------------------ */

export let occasions: Occasion[] = [];
export let cakes: Cake[] = [];

let status: 'loading' | 'ready' | 'failed' = 'loading';
let loading: Promise<void> | undefined;
let version = 0;
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

/** Loads the catalog once; later calls wait for the same request. */
export function loadCatalog(): Promise<void> {
  loading ??= get<ApiCategory[]>('/catalog').then(
    (rows) => {
      status = 'ready';
      publish(toOccasions(rows));
    },
    (error: unknown) => {
      console.error('The cake catalog did not load.', error);
      status = 'failed';
      publish([]);
    },
  );
  return loading;
}

/** Fetches one cake's photos, flavours and add-ons, which the catalog doesn't list. */
export async function refreshCake(slug: string) {
  try {
    const row = await get<ApiCakeDetail | null>(`/cakes/${encodeURIComponent(slug)}`);
    if (!row) return;
    const cake = toCake({ ...row, cover_url: null }, occasionSlug(row.category_id));
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

/** "loading" until the catalog arrives, then "ready", or "failed" if the API couldn't be reached. */
export const catalogStatus = () => status;

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
