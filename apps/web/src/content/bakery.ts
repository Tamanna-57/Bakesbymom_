// The bakery's own details, from the old site (bakesbymom.vercel.app).

export const bakery = {
  name: 'Bakes by Mom',
  place: 'Panipat, Haryana',
  whatsapp: '917206552667',
  whatsappDisplay: '+91 72065 52667',
  instagram: 'https://www.instagram.com/bakesbymom_/',
  instagramHandle: '@bakesbymom_',
  eggless: '100% eggless, like everything else that leaves this kitchen.',
  fssai:
    'Pure vegetarian. The green dot is the FSSAI mark for food with no egg or meat in it, and everything this kitchen bakes carries it.',
  notice: "Baked to order, so please give us a day's notice where you can, and more for the tiered cakes.",
};

/** Delivery and pickup times offered on every order. */
export const timeSlots = [
  'Morning (9am – 12pm)',
  'Afternoon (12pm – 4pm)',
  'Evening (4pm – 8pm)',
  'Night (8pm – 10pm)',
];

/** Cake sizes. The menu counts a pound as half a kilo; servings are only given where the old site gave them. */
export const cakeSizes: { kg: number; label: string; serves?: string }[] = [
  { kg: 0.5, label: '½ kg · 1 pound', serves: 'about 4–6 slices' },
  { kg: 1, label: '1 kg · 2 pound', serves: 'about 8–10 slices' },
  { kg: 1.5, label: '1½ kg · 3 pound' },
  { kg: 2, label: '2 kg · 4 pound', serves: 'a two-tier for a proper crowd' },
  { kg: 3, label: '3 kg · 6 pound' },
];

export const cakeFlavours = [
  'Chocolate truffle',
  'Vanilla',
  'Black forest',
  'Red velvet',
  'Butterscotch',
  'Pineapple',
  'Fresh fruit',
  'Rasmalai',
];

/** "Chocolate truffle" → "chocolate-truffle", for links like /catalog?flavour=chocolate-truffle. */
export const flavourSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** The flavour a link names (?flavour=chocolate-truffle), if it is one of ours. */
export const findFlavour = (slug: string | null) => cakeFlavours.find((name) => flavourSlug(name) === slug);

export const cakeAddons = ['Message piped on top', 'Candles', 'Name plaque', 'Fresh flowers', 'Photo print on top'];

export const giftAddons = ['Gift wrapping', 'Gift box', 'Greeting card note'];

/** The cakes that leave the kitchen most often, and Mom's own picks. */
export const mostOrdered = ['cake-choco-drip', 'cake-heart-pearl', 'cake-spiderman', 'cake-anniversary-maroon'];
export const chefsPicks = ['cake-maa-wings', 'cake-bride-to-be', 'cake-mom-flowerpot'];

const rupees = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

/** ₹1,450 */
export const inr = (amount: number) => rupees.format(amount);

/** "1 kg", "½ kg", "1½ kg" */
export const kgLabel = (kg: number) =>
  kg === 0.5 ? '½ kg' : Number.isInteger(kg) ? `${kg} kg` : `${Math.floor(kg)}½ kg`;

/** A wa.me link that opens WhatsApp with the message typed out. */
export const whatsappLink = (message: string) => `https://wa.me/${bakery.whatsapp}?text=${encodeURIComponent(message)}`;
