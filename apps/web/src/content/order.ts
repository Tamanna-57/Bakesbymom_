// The WhatsApp order messages, in the same shape as the old site's.
import { cakeSizes, inr } from './bakery';
import type { Cake } from './catalog';
import type { Treat, TreatCategory } from './treats';

export interface Fulfilment {
  /** "Pickup" or "Delivery". */
  method: 'Pickup' | 'Delivery';
  /** Delivery area, when delivering. */
  area?: string;
}

export interface CommonOrder {
  date: string;
  slot: string;
  fulfilment: Fulfilment;
  name: string;
  notes: string;
}

export interface CakeOrder extends CommonOrder {
  weightKg: number;
  flavour: string;
  addons: string[];
  message: string;
}

export interface TreatOrder extends CommonOrder {
  quantity: number;
  choice: string;
  extras: string[];
}

/**
 * The price for a size: exact for the listed weight, otherwise worked out from the per-pound rate. Flavours and
 * add-ons set for the cake in the admin panel add their price on top.
 */
export function cakePrice(cake: Cake, weightKg: number, picks: { flavour?: string; addons?: string[] } = {}) {
  const extra = [
    cake.flavours.find((option) => option.name === picks.flavour),
    ...cake.addons.filter((option) => picks.addons?.includes(option.name)),
  ].reduce((sum, option) => sum + (option?.priceDelta ?? 0), 0);
  if (weightKg === cake.weightKg) return { amount: cake.price + extra, exact: true };
  return { amount: Math.round(cake.perPound * weightKg * 2) + extra, exact: false };
}

/** "Sat 25 Oct 2026" */
const dateLabel = (iso: string) =>
  iso
    ? new Date(`${iso}T12:00:00`).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

function commonLines(order: CommonOrder) {
  const lines: string[] = [];
  const when = [dateLabel(order.date), order.slot].filter(Boolean).join(' · ');
  if (when) lines.push(`• Needed on: ${when}`);
  lines.push(
    order.fulfilment.method === 'Delivery'
      ? `• Delivery to: ${order.fulfilment.area?.trim() || 'address to share'}`
      : '• Pickup: from the kitchen',
  );
  return lines;
}

function closingLines(order: CommonOrder) {
  const lines: string[] = [];
  if (order.name.trim() || order.notes.trim()) lines.push('');
  if (order.name.trim()) lines.push(`From: ${order.name.trim()}`);
  if (order.notes.trim()) lines.push(`Notes: ${order.notes.trim()}`);
  return lines;
}

export function cakeOrderMessage(cake: Cake, occasion: string, order: CakeOrder) {
  const size = cakeSizes.find((s) => s.kg === order.weightKg)?.label ?? `${order.weightKg} kg`;
  const price = cakePrice(cake, order.weightKg, order);
  const lines = [
    "Hello Bakes by Mom! I'd like to place an order 🎂",
    '',
    `• Cake: ${cake.name}`,
    `• Occasion: ${occasion}`,
    `• Size: ${size}`,
  ];
  if (order.flavour) lines.push(`• Flavour: ${order.flavour}`);
  if (order.addons.length) lines.push(`• Add-ons: ${order.addons.join(', ')}`);
  if (order.message.trim()) lines.push(`• Message on the cake: "${order.message.trim()}"`);
  lines.push(...commonLines(order));
  lines.push(`• Price on the site: ${price.exact ? '' : 'about '}${inr(price.amount)}, please confirm`);
  lines.push(...closingLines(order));
  return lines.join('\n');
}

/** "1 box of 9", "2 boxes of 9 plus 3 loose" */
export function boxes(quantity: number, perBox: number) {
  const full = Math.floor(quantity / perBox);
  const loose = quantity % perBox;
  const boxed = `${full} box${full === 1 ? '' : 'es'} of ${perBox}`;
  if (!loose) return boxed;
  return full ? `${boxed} plus ${loose} loose` : `${loose} loose`;
}

export function treatOrderMessage(category: TreatCategory, treat: Treat, order: TreatOrder) {
  const lines = [
    `Hello Bakes by Mom! I'd like to order ${treat.name} 🍪`,
    '',
    `• Item: ${treat.name} (${category.name})`,
  ];
  if (category.choiceLabel && order.choice) lines.push(`• ${category.choiceLabel}: ${order.choice}`);
  lines.push(`• Quantity: ${order.quantity} ${category.unit}`);
  if (category.perBox) lines.push(`• That's ${boxes(order.quantity, category.perBox)}`);
  if (order.extras.length) lines.push(`• Make it yours: ${order.extras.join(', ')}`);
  lines.push(...commonLines(order));
  lines.push(...closingLines(order));
  return lines.join('\n');
}
