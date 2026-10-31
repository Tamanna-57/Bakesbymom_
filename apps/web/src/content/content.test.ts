import { beforeAll, describe, expect, it, vi } from 'vitest';
import { matchPath, parentPath } from '../router';
import { navLinksFor } from './site';
import { answer, starterChips } from './assistant';
import { inr, kgLabel, whatsappLink } from './bakery';
import { cakes, catalogStatus, findCake, loadCatalog, occasions, type ApiCake, type ApiCategory } from './catalog';
import { boxes, cakeOrderMessage, cakePrice, treatOrderMessage } from './order';
import { findTreatCategory, qtyLabel, treatCategories } from './treats';

// Test-only rows in the shape /api/catalog sends: the site itself keeps no cakes and reads the live database.
const cake = (id: string, category: string, name: string, prices: [number, number, number], cover: string | null) =>
  ({
    id,
    category_id: category,
    name,
    description: null,
    per_pound_price: prices[0],
    weight_kg: prices[1],
    fixed_price: prices[2],
    sort_order: 1,
    cover_url: cover,
  }) satisfies ApiCake;
const category = (id: string, name: string, list: ApiCake[]): ApiCategory => ({
  id,
  name,
  description: null,
  sort_order: 1,
  cakes: list,
});
const rows = [
  category('cat-birthday-kids', 'Kids & Character Birthdays', [
    cake(
      'cake-spiderman',
      'cat-birthday-kids',
      'Spiderman Web Cake',
      [800, 1, 1450],
      '/api/photos/uploads/IMG-20260913-WA0002.png',
    ),
  ]),
  category('cat-birthday-classic', 'Classic Birthday', [
    cake(
      'cake-choco-drip',
      'cat-birthday-classic',
      'Loaded Chocolate Drip',
      [800, 1, 1500],
      '/api/photos/uploads/IMG-20260913-WA0011.png',
    ),
    cake('a-new-cake', 'cat-birthday-classic', 'A New Cake', [700, 1, 1200], null),
  ]),
  category('cat-anniversary', 'Anniversary', [
    cake(
      'cake-anniversary-maroon',
      'cat-anniversary',
      'Maroon & Gold Anniversary',
      [900, 1, 1750],
      '/api/photos/uploads/IMG-20260913-WA0003.png',
    ),
    cake(
      'cake-anniversary-50',
      'cat-anniversary',
      'Golden Jubilee Two-Tier',
      [950, 2, 3200],
      'https://bakesbymom.snehagupta.workers.dev/api/photos/cake-anniversary-50/new.webp',
    ),
  ]),
];

beforeAll(async () => {
  vi.stubGlobal('fetch', async (url: string) =>
    url === '/api/catalog' ? new Response(JSON.stringify(rows)) : new Response('null', { status: 404 }),
  );
  await loadCatalog();
  vi.unstubAllGlobals();
});

describe('catalog from the API', () => {
  it('loads the occasions and cakes, keeping the old URLs and prices', () => {
    expect(catalogStatus()).toBe('ready');
    expect(occasions.map((o) => o.slug)).toEqual(['birthday-kids', 'birthday-classic', 'anniversary']);
    expect(cakes).toHaveLength(5);
    expect(findCake('cake-spiderman')).toMatchObject({
      occasion: 'birthday-kids',
      perPound: 800,
      weightKg: 1,
      price: 1450,
    });
    expect(treatCategories.map((c) => c.slug)).toEqual([
      'brownies',
      'cookies',
      'jar-cakes',
      'dry-cakes',
      'cupcakes',
      'bento-cakes',
      'combos',
    ]);
  });

  it("shows photos the way the old site does: restaged, else the photo, with a small cover where there's one", () => {
    expect(findCake('cake-anniversary-maroon')!.photos).toEqual([
      {
        src: '/photos/restaged/anniversary-maroon.jpg',
        thumb: '/photos/thumbs/IMG-20260913-WA0003.webp',
        backdrop: true,
      },
    ]);
    expect(findCake('cake-spiderman')!.photos).toEqual([
      {
        src: '/api/photos/uploads/IMG-20260913-WA0002.png',
        thumb: '/photos/thumbs/IMG-20260913-WA0002.webp',
        backdrop: false,
      },
    ]);
    const uploaded = 'https://bakesbymom.snehagupta.workers.dev/api/photos/cake-anniversary-50/new.webp';
    expect(findCake('cake-anniversary-50')!.photos).toEqual([{ src: uploaded, thumb: uploaded, backdrop: false }]);
    expect(findCake('a-new-cake')!.photos).toEqual([]);
  });
});

describe('prices and labels', () => {
  it('formats rupees and sizes', () => {
    expect(inr(1450)).toBe('₹1,450');
    expect(kgLabel(0.5)).toBe('½ kg');
    expect(kgLabel(1.5)).toBe('1½ kg');
    expect(kgLabel(2)).toBe('2 kg');
  });

  it('uses the listed price for the listed weight, and the per-pound rate otherwise', () => {
    const cake = findCake('cake-spiderman')!;
    expect(cakePrice(cake, 1)).toEqual({ amount: 1450, exact: true });
    expect(cakePrice(cake, 2)).toEqual({ amount: 3200, exact: false }); // 4 pounds × ₹800
  });

  it("adds the price of a cake's own flavours and add-ons", () => {
    const cake = {
      ...findCake('cake-spiderman')!,
      flavours: [{ name: 'Belgian dark', priceDelta: 100 }],
      addons: [{ name: 'Fresh flowers', priceDelta: 250 }],
    };
    expect(cakePrice(cake, 1, { flavour: 'Belgian dark', addons: ['Fresh flowers', 'Gift box'] })).toEqual({
      amount: 1800,
      exact: true,
    });
  });

  it('counts boxes the way the old site did', () => {
    expect(boxes(9, 9)).toBe('1 box of 9');
    expect(boxes(21, 9)).toBe('2 boxes of 9 plus 3 loose');
  });
});

describe('WhatsApp order messages', () => {
  const when = { date: '2026-10-25', slot: 'Evening (4pm – 8pm)', name: 'Ritika', notes: '' };

  it('writes out a cake order', () => {
    const cake = findCake('cake-spiderman')!;
    const text = cakeOrderMessage(cake, 'Kids & Character Birthdays', {
      ...when,
      weightKg: 1,
      flavour: 'Chocolate truffle',
      addons: ['Candles'],
      message: 'HBD Yatharth',
      fulfilment: { method: 'Pickup' },
    });
    expect(text).toContain('• Cake: Spiderman Web Cake');
    expect(text).toContain('• Size: 1 kg · 2 pound');
    expect(text).toContain('• Flavour: Chocolate truffle');
    expect(text).toContain('• Message on the cake: "HBD Yatharth"');
    expect(text).toMatch(/• Needed on: Sun, 25 Oct,? 2026 · Evening/);
    expect(text).toContain('• Pickup: from the kitchen');
    expect(text).toContain('• Price on the site: ₹1,450, please confirm');
    expect(text).toContain('From: Ritika');
  });

  it('writes out a treat order with the box count and flour', () => {
    const cookies = findTreatCategory('cookies')!;
    const text = treatOrderMessage(cookies, cookies.items[0]!, {
      ...when,
      quantity: 500,
      choice: 'Ragi',
      extras: [],
      fulfilment: { method: 'Delivery', area: 'Model Town' },
    });
    expect(text).toContain('• Item: Choco Chip Cookie (Cookies)');
    expect(text).toContain('• Flour: Ragi');
    expect(text).toContain('• Quantity: 500 grams');
    expect(text).toContain('• Delivery to: Model Town');
  });

  it('links to the bakery number with the message encoded', () => {
    expect(whatsappLink('Hi & bye')).toBe('https://wa.me/917206552667?text=Hi%20%26%20bye');
  });
});

describe('cake assistant', () => {
  const names = (text: string) => answer(text).cakes?.map((cake) => cake.slug) ?? [];

  it('answers every starter chip', () => {
    for (const chip of starterChips) expect(answer(chip).text.length).toBeGreaterThan(0);
  });

  it('filters by budget, occasion and flavour', () => {
    expect(answer('Cakes under ₹1500').cakes!.every((cake) => cake.price <= 1500)).toBe(true);
    expect(names('anniversary cake')).toEqual(['cake-anniversary-maroon', 'cake-anniversary-50']);
    expect(answer('Chocolate cakes').cakes!.length).toBeGreaterThan(0);
  });

  it('knows the most ordered cakes and the treat types', () => {
    expect(names('most ordered cake')).toContain('cake-choco-drip');
    expect(answer('do you have brownies?').treats?.[0]?.slug).toBe('brownies');
  });

  it('says so when it does not know', () => {
    expect(answer('what is the weather').text[0]).toMatch(/didn't catch/);
  });
});

describe('router', () => {
  it('matches paths with parameters', () => {
    expect(matchPath('/shop/:category/:item', '/shop/brownies/oreo-brownie')).toEqual({
      category: 'brownies',
      item: 'oreo-brownie',
    });
    expect(matchPath('/catalog/:cake', '/catalog')).toBeNull();
    expect(matchPath('/shop/:category', '/about/x')).toBeNull();
  });

  it('goes one level up for the back button when there is no previous page', () => {
    expect(parentPath('/shop/brownies/oreo-brownie')).toBe('/shop/brownies');
    expect(parentPath('/shop/brownies')).toBe('/shop');
    expect(parentPath('/catalog/cake-spiderman')).toBe('/catalog');
    // The cakes are a category of Cakes & Treats
    expect(parentPath('/catalog')).toBe('/shop');
    expect(parentPath('/shop')).toBe('/');
    expect(parentPath('/about')).toBe('/');
  });
});

describe('nav', () => {
  const current = (path: string) => navLinksFor(path).find((link) => link.current)?.label;

  it('has one link for cakes and treats, marked on every cake and treat page', () => {
    expect(navLinksFor('/').map((link) => link.label)).toEqual(['Cakes & Treats', 'Our story', 'How to order']);
    for (const path of ['/shop', '/shop/cookies', '/shop/brownies/oreo-brownie', '/catalog', '/catalog/cake-x']) {
      expect(current(path)).toBe('Cakes & Treats');
    }
    expect(current('/about')).toBe('Our story');
    expect(current('/')).toBeUndefined();
  });
});

describe('qtyLabel', () => {
  it('puts the unit in the singular for one', () => {
    expect(qtyLabel(1, 'jars')).toBe('1 jar');
    expect(qtyLabel(6, 'cupcakes')).toBe('6 cupcakes');
    expect(qtyLabel(250, 'grams')).toBe('250 grams');
  });
});
