import { describe, expect, it } from 'vitest';
import { matchPath, parentPath } from '../router';
import { answer, starterChips } from './assistant';
import { inr, kgLabel, whatsappLink } from './bakery';
import { cakes, findCake, occasions, toOccasions, type ApiCake } from './catalog';
import { boxes, cakeOrderMessage, cakePrice, treatOrderMessage } from './order';
import { findTreatCategory, treatCategories } from './treats';

describe('catalog data from D1 (catalog.json)', () => {
  it('has every occasion and cake, each with a photo', () => {
    expect(occasions).toHaveLength(11);
    expect(cakes).toHaveLength(21);
    for (const cake of cakes) expect(cake.photos.length).toBeGreaterThan(0);
  });

  it('keeps the old URLs and prices', () => {
    const spiderman = findCake('cake-spiderman')!;
    expect(spiderman).toMatchObject({ perPound: 800, weightKg: 1, price: 1450 });
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
});

describe('live catalog from the API', () => {
  const row = (id: string, cover: string | null): ApiCake => ({
    id,
    category_id: 'cat-anniversary',
    name: id,
    description: null,
    per_pound_price: 760,
    weight_kg: 1,
    fixed_price: 1400,
    sort_order: 1,
    cover_url: cover,
  });
  const [occasion] = toOccasions(
    [
      {
        id: 'cat-anniversary',
        name: 'Anniversary',
        description: null,
        sort_order: 6,
        cakes: [
          row('cake-heart-pearl', '/api/photos/uploads/IMG-20260206-WA0062.png'),
          row('cake-choco-drip', '/api/photos/cake-choco-drip/new.webp'),
          row('a-new-cake', null),
        ],
      },
    ],
    cakes,
  );
  const [heart, drip, fresh] = occasion!.cakes;

  it('uses the old occasion slugs and the new prices', () => {
    expect(occasion!.slug).toBe('anniversary');
    expect(heart).toMatchObject({ occasion: 'anniversary', price: 1400, perPound: 760, description: '' });
  });

  it('keeps the cut-outs and extra photos while the cover is the same, and shows new photos as uploaded', () => {
    expect(heart!.photos.map((photo) => photo.src)).toEqual([
      '/photos/heart-pearl-1.webp',
      '/photos/heart-pearl-2.webp',
      '/photos/heart-pearl-3.webp',
    ]);
    expect(drip!.photos).toEqual([{ src: '/api/photos/cake-choco-drip/new.webp' }]);
    expect(fresh!.photos).toEqual([]);
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
    expect(parentPath('/catalog')).toBe('/');
    expect(parentPath('/about')).toBe('/');
  });
});
