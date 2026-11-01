// The cake assistant from the old site, rebuilt over the same catalog: it answers from the cakes,
// sizes and prices on the site and never makes anything up.
import { bakery, cakeSizes, chefsPicks, inr, mostOrdered } from './bakery';
import { cakes, findOccasion, occasions, type Cake } from './catalog';
import { treatCategories, type TreatCategory } from './treats';

export interface Answer {
  text: string[];
  cakes?: Cake[];
  treats?: TreatCategory[];
  chips?: string[];
}

export const starterChips = [
  'Cakes under ₹1500',
  'What sizes do you do?',
  'Most ordered cake',
  "Chef's recommendation",
  'Chocolate cakes',
  'Birthday cakes for kids',
];

const flavourFamilies = [
  { label: 'Chocolate', aliases: ['chocolate', 'choco', 'ganache', 'truffle', 'cocoa'] },
  { label: 'Vanilla & cream', aliases: ['vanilla', 'white cream', 'ivory', 'buttercream'] },
  { label: 'Red velvet', aliases: ['red velvet', 'velvet'] },
  { label: 'Butterscotch & caramel', aliases: ['butterscotch', 'caramel'] },
  { label: 'Pistachio', aliases: ['pistachio', 'pista'] },
  { label: 'Strawberry & berry', aliases: ['strawberry', 'berry', 'raspberry'] },
  { label: 'Pineapple', aliases: ['pineapple'] },
  { label: 'Fresh fruit', aliases: ['fruit', 'mango', 'blueberry'] },
];

const occasionPatterns: Array<[RegExp, string]> = [
  [/\b(kid|kids|child|children|cartoon|superhero|character)\b/, 'birthday-kids'],
  [/\b(mom|mum|mother|maa|dad|father|papa|parent)/, 'birthday-parents'],
  [/\b(wife|husband|partner|girlfriend|boyfriend|wifey|hubby)\b/, 'birthday-partner'],
  [/\b(engage|proposal|bride|roka)/, 'engagement'],
  [/\banniversar/, 'anniversary'],
  [/\b(farewell|send.?off|goodbye)\b/, 'farewell'],
  [/\b(festival|diwali|janmashtami|rakhi|raksha)\b/, 'festival'],
  [/\bteacher/, 'teachers-day'],
  [/\b(romantic|love|valentine)\b/, 'romantic'],
];

const byPrice = () => [...cakes].sort((a, b) => a.price - b.price);
const haystack = (cake: Cake) => {
  const occasion = findOccasion(cake.occasion);
  return `${cake.name} ${cake.description} ${occasion?.name ?? ''} ${occasion?.description ?? ''}`.toLowerCase();
};
const pick = (slugs: string[]) =>
  slugs.map((slug) => cakes.find((cake) => cake.slug === slug)).filter(Boolean) as Cake[];

/** "under 1500", "₹2k", "rs 1200" → rupees. Ignores weights like "500 g". */
function budget(text: string) {
  const t = text.replace(/,/g, '');
  const k = t.match(/(\d+(?:\.\d+)?)\s*k\b/);
  if (k) return Math.round(parseFloat(k[1]!) * 1000);
  const n = t.match(/(?:₹|rs\.?|inr)?\s*(\d{3,6})(?!\s*(?:g|gm|gms|gram|grams|kg|kgs)\b)/);
  return n ? parseInt(n[1]!, 10) : null;
}

/** "half kg", "1 kg", "500 g" → kilos. */
function weight(text: string) {
  if (/\bhalf\s*(?:a\s*)?kg\b|\b1\/2\s*kg\b|\b500\s*g(?:m|ms|rams)?\b/.test(text)) return 0.5;
  const kg = text.match(/(\d+(?:\.\d+)?)\s*kgs?\b/);
  if (kg) return parseFloat(kg[1]!);
  const g = text.match(/(\d{3,4})\s*g(?:m|ms|rams)?\b/);
  return g ? parseInt(g[1]!, 10) / 1000 : null;
}

const flavour = (text: string) => flavourFamilies.find((f) => f.aliases.some((alias) => text.includes(alias))) ?? null;

function occasion(text: string) {
  for (const [pattern, slug] of occasionPatterns) if (pattern.test(text)) return findOccasion(slug) ?? null;
  return (
    occasions.find((o) =>
      o.name
        .toLowerCase()
        .split(/[^a-z]+/)
        .filter((word) => word.length > 4)
        .some((word) => text.includes(word)),
    ) ?? null
  );
}

const treat = (text: string) =>
  treatCategories.find((category) => {
    const name = category.name.toLowerCase();
    const single = name.replace(/s\b/g, '');
    return text.includes(name) || text.includes(single) || text.includes(category.slug.replace('-', ' '));
  }) ?? null;

export function answer(input: string): Answer {
  const text = input.toLowerCase().trim();

  if (/^(hi|hey|hello|yo|namaste|hola)\b/.test(text) || /what can you do|\bhelp\b/.test(text)) {
    return {
      text: [
        "Hi! I'm the Bakes by Mom helper. I know every cake on the shelf: prices, sizes, flavours and who each one is for.",
        'Ask me something, or tap one of these:',
      ],
      chips: starterChips,
    };
  }

  if (/most (ordered|popular|bought|sold)|best ?seller|popular|favourite|favorite|trending/.test(text)) {
    return {
      text: ['These are the ones that leave the kitchen most often:'],
      cakes: pick(mostOrdered),
      chips: ["Chef's recommendation", 'What sizes do you do?'],
    };
  }

  if (/recommend|chef|suggest|what should i|pick for me/.test(text)) {
    return {
      text: ["The baker's own picks, the ones she takes her time over:"],
      cakes: pick(chefsPicks),
      chips: ['Most ordered cake', 'Cakes under ₹1500'],
    };
  }

  if (/\bsize|how (big|heavy)|how many (people|serves)|serves|slices/.test(text) && !weight(text)) {
    return {
      text: [
        `Cakes come in ${cakeSizes.map((size) => size.label.split(' · ')[0]).join(', ')}.`,
        'Half a kilo cuts into about 4–6 slices, a kilo does 8–10, and two kilos comes as a two-tier for a proper crowd.',
        'The price on each cake is for its listed weight; a bigger one is priced off the per-pound rate on its page.',
      ],
      chips: ['Cakes under ₹1500', 'Most ordered cake'],
    };
  }

  if (/what flavou?r|which flavou?r|flavou?rs\b/.test(text) && !flavour(text)) {
    return {
      text: [
        `The ones that come up most: ${flavourFamilies.map((f) => f.label.toLowerCase()).join(', ')}.`,
        "Everything is eggless. Name a flavour and I'll show you what we've got.",
      ],
      chips: ['Chocolate cakes', 'Red velvet', 'Pistachio'],
    };
  }

  if (/cheapest|lowest price|least expensive|budget|price range|how much/.test(text) && !budget(text) && cakes.length) {
    const list = byPrice();
    return {
      text: [
        `Cakes run from ${inr(list[0]!.price)} up to ${inr(list[list.length - 1]!.price)}, depending on size and how much handwork goes on top.`,
        'Here are the gentlest on the wallet:',
      ],
      cakes: list.slice(0, 3),
      chips: ['Cakes under ₹1500', 'What sizes do you do?'],
    };
  }

  if (/deliver|pickup|pick ?up|shipping|courier|send it/.test(text)) {
    return {
      text: [
        `You can pick up from the kitchen in ${bakery.place}, or choose delivery when you order; Mom sorts out the details with you on WhatsApp.`,
        "Nothing is pre-made, so a day's notice helps, and more for the tiered cakes.",
      ],
      chips: ['How do I order?', 'Most ordered cake'],
    };
  }

  if (/how (do i|to) order|order process|notice|lead time|\bbook\b|custom/.test(text)) {
    return {
      text: [
        'Open any cake or treat, pick the size, flavour and extras, and tap Order on WhatsApp. The order opens already typed out: read it and send it yourself.',
        "Everything is baked to order rather than pulled off a shelf, so give the kitchen a day's notice where you can, and more for the tiered ones.",
      ],
      chips: ['Most ordered cake', "Chef's recommendation"],
    };
  }

  if (/eggless|vegetarian|no egg|jain|egg/.test(text)) {
    return {
      text: [
        'Everything here is 100% eggless and pure vegetarian. It all carries the FSSAI green dot.',
        'So pick any cake you like.',
      ],
      chips: ['Most ordered cake', 'Cakes under ₹1500'],
    };
  }

  const treatMatch = treat(text);
  if (treatMatch) {
    return {
      text: [`${treatMatch.name}: ${treatMatch.blurb}`, `Smallest order: ${treatMatch.minQty} ${treatMatch.unit}.`],
      treats: [treatMatch],
      chips: ['What sizes do you do?', 'Most ordered cake'],
    };
  }

  const max = /under|below|less than|within|upto|up to|budget|cheap|₹|rs\b|inr|\d/.test(text) ? budget(text) : null;
  const kg = weight(text);
  const family = flavour(text);
  const occ = occasion(text);
  if (max || kg || family || occ) {
    let matches = cakes;
    const asked: string[] = [];
    if (occ) {
      matches = matches.filter((cake) => cake.occasion === occ.slug);
      asked.push(occ.name.toLowerCase());
    }
    if (family) {
      matches = matches.filter((cake) => family.aliases.some((alias) => haystack(cake).includes(alias)));
      asked.push(family.label.toLowerCase());
    }
    if (kg) {
      matches = matches.filter((cake) => Math.abs(cake.weightKg - kg) < 0.001);
      asked.push(`${kg} kg`);
    }
    if (max) {
      matches = matches.filter((cake) => cake.price <= max);
      asked.push(`under ${inr(max)}`);
    }
    const what = asked.join(', ');
    if (!matches.length) {
      const closest = byPrice()
        .filter((cake) => (occ ? cake.occasion === occ.slug : true))
        .slice(0, 3);
      return {
        text: [
          `Nothing on the shelf matches ${what} right now.`,
          closest.length ? 'The closest I can offer:' : 'Try a wider budget or a different occasion.',
        ],
        cakes: closest,
        chips: ['What sizes do you do?', 'Most ordered cake'],
      };
    }
    const sorted = [...matches].sort((a, b) => a.price - b.price);
    return {
      text: [
        `${sorted.length} ${sorted.length === 1 ? 'cake matches' : 'cakes match'} ${what}${sorted.length > 4 ? '. Here are the first few' : ''}:`,
      ],
      cakes: sorted.slice(0, 4),
      chips: ["Chef's recommendation", 'How do I order?'],
    };
  }

  const words = text.split(/[^a-z0-9]+/).filter((word) => word.length > 3);
  if (words.length) {
    const scored = cakes
      .map((cake) => ({ cake, score: words.filter((word) => haystack(cake).includes(word)).length }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score);
    if (scored.length) {
      return {
        text: ['Closest I can find:'],
        cakes: scored.slice(0, 4).map((entry) => entry.cake),
        chips: starterChips.slice(0, 3),
      };
    }
  }

  return {
    text: [
      "I didn't catch that one. I'm only good for cake questions.",
      'Try me on a budget, a size, a flavour or an occasion:',
    ],
    chips: starterChips,
  };
}
