/**
 * A drawn cross-section of a cake for the flavour cards: the layer cake slices on pin 16's "Fillings"
 * grid, in the house illustration style (cocoa outline, flat fills) instead of photos.
 */
import type { ReactNode } from 'react';

type Topping = 'ganache' | 'rosettes' | 'forest' | 'crumbs' | 'praline' | 'pineapple' | 'fruit' | 'rasmalai';

interface Layers {
  /** What's inside, for the card. */
  inside: string;
  sponge: string;
  filling: string;
  frosting: string;
  topping: Topping;
}

const INK = '#32180b';
const CREAM = '#fffdf6';
const VANILLA = '#f0e1b6';

export const flavourLayers: Record<string, Layers> = {
  'Chocolate truffle': {
    inside: 'Chocolate sponge, layered and covered in dark chocolate ganache.',
    sponge: '#643725',
    filling: '#32180b',
    frosting: '#4a2717',
    topping: 'ganache',
  },
  Vanilla: {
    inside: 'Soft vanilla sponge with whipped vanilla cream.',
    sponge: VANILLA,
    filling: CREAM,
    frosting: CREAM,
    topping: 'rosettes',
  },
  'Black forest': {
    inside: 'Chocolate sponge, whipped cream, cherries and chocolate shavings.',
    sponge: '#4a2717',
    filling: CREAM,
    frosting: CREAM,
    topping: 'forest',
  },
  'Red velvet': {
    inside: 'Cocoa-red sponge with a cream cheese frosting.',
    sponge: '#b22137',
    filling: CREAM,
    frosting: CREAM,
    topping: 'crumbs',
  },
  Butterscotch: {
    inside: 'Vanilla sponge with butterscotch cream and crunchy praline.',
    sponge: VANILLA,
    filling: '#d1bb70',
    frosting: '#f2db87',
    topping: 'praline',
  },
  Pineapple: {
    inside: 'Vanilla sponge with whipped cream and pineapple pieces.',
    sponge: VANILLA,
    filling: '#f2db87',
    frosting: CREAM,
    topping: 'pineapple',
  },
  'Fresh fruit': {
    inside: 'Vanilla sponge with whipped cream and the season’s fruit.',
    sponge: VANILLA,
    filling: CREAM,
    frosting: CREAM,
    topping: 'fruit',
  },
  Rasmalai: {
    inside: 'Saffron sponge with rasmalai cream, pistachios and cardamom.',
    sponge: '#f2db87',
    filling: '#f8f1d9',
    frosting: '#fcf9ea',
    topping: 'rasmalai',
  },
};

const repeat = (n: number, draw: (i: number) => ReactNode) => Array.from({ length: n }, (_, i) => draw(i));

function toppingArt(topping: Topping): ReactNode {
  switch (topping) {
    case 'ganache':
      return (
        <>
          <path
            d="M0 30h200v10c-8 0-8 12-16 12s-6-12-14-12-8 18-16 18-6-18-14-18-8 10-16 10-6-10-14-10-8 16-16 16-6-16-14-16-8 12-16 12-6-12-14-12-8 8-16 8-6-8-14-8z"
            fill="#32180b"
          />
          {repeat(6, (i) => (
            <rect
              key={i}
              x={14 + i * 32}
              y={18}
              width={16}
              height={7}
              rx={3.5}
              fill="#8f5b38"
              stroke={INK}
              strokeWidth={2}
            />
          ))}
        </>
      );
    case 'rosettes':
      return repeat(7, (i) => (
        <g key={i}>
          <path d={`M${8 + i * 28} 30c0-10 6-15 12-15s12 5 12 15z`} fill={CREAM} stroke={INK} strokeWidth={2.5} />
          <rect
            x={14 + i * 28}
            y={8 + (i % 2) * 4}
            width={7}
            height={3}
            rx={1.5}
            fill={i % 2 ? '#ed8c8b' : '#a0b6cd'}
          />
        </g>
      ));
    case 'forest':
      return (
        <>
          {repeat(9, (i) => (
            <rect key={`s${i}`} x={6 + i * 22} y={22 + (i % 2) * 3} width={12} height={5} rx={2} fill="#4a2717" />
          ))}
          {repeat(4, (i) => (
            <g key={i}>
              <path
                d={`M${34 + i * 44} 14q4-10 10-12`}
                fill="none"
                stroke={INK}
                strokeWidth={2.5}
                strokeLinecap="round"
              />
              <circle cx={34 + i * 44} cy={20} r={9} fill="#d02b2f" stroke={INK} strokeWidth={2.5} />
            </g>
          ))}
        </>
      );
    case 'crumbs':
      return repeat(16, (i) => (
        <circle
          key={i}
          cx={8 + i * 12.4}
          cy={24 + (i % 3) * 2}
          r={3 + (i % 2)}
          fill="#b22137"
          stroke={INK}
          strokeWidth={1.5}
        />
      ));
    case 'praline':
      return (
        <>
          <path
            d="M4 34l12-8 12 8 12-8 12 8 12-8 12 8 12-8 12 8 12-8 12 8 12-8 12 8 12-8 12 8 12-8 8 6"
            fill="none"
            stroke="#a56f41"
            strokeWidth={4}
            strokeLinejoin="round"
          />
          {repeat(10, (i) => (
            <path
              key={i}
              d={`M${10 + i * 19} 24l5-6 5 6z`}
              fill="#d1bb70"
              stroke={INK}
              strokeWidth={2}
              strokeLinejoin="round"
            />
          ))}
        </>
      );
    case 'pineapple':
      return (
        <>
          {repeat(6, (i) => (
            <rect
              key={i}
              x={10 + i * 32}
              y={18 + (i % 2) * 3}
              width={14}
              height={10}
              rx={3}
              fill="#f2db87"
              stroke={INK}
              strokeWidth={2.5}
            />
          ))}
          <circle cx={100} cy={18} r={9} fill="#d02b2f" stroke={INK} strokeWidth={2.5} />
        </>
      );
    case 'fruit':
      return (
        <>
          <circle cx={36} cy={22} r={11} fill="#aea65e" stroke={INK} strokeWidth={2.5} />
          <circle cx={36} cy={22} r={4} fill="#edeed2" />
          <path d="M80 30c-8-6-8-18 4-18s12 12 4 18z" fill="#d02b2f" stroke={INK} strokeWidth={2.5} />
          <path d="M112 30a14 14 0 0 1 28 0z" fill="#f2a65a" stroke={INK} strokeWidth={2.5} />
          <circle cx={166} cy={22} r={10} fill="#aea65e" stroke={INK} strokeWidth={2.5} />
          <circle cx={166} cy={22} r={3.5} fill="#edeed2" />
          <circle cx={188} cy={24} r={6} fill="#859bb2" stroke={INK} strokeWidth={2} />
          <circle cx={60} cy={26} r={5} fill="#859bb2" stroke={INK} strokeWidth={2} />
        </>
      );
    case 'rasmalai':
      return (
        <>
          {repeat(8, (i) => (
            <rect
              key={`p${i}`}
              x={8 + i * 24}
              y={22 + (i % 2) * 3}
              width={11}
              height={4}
              rx={2}
              fill="#aea65e"
              transform={`rotate(${i % 2 ? 20 : -20} ${13 + i * 24} ${24})`}
            />
          ))}
          {repeat(4, (i) => (
            <path
              key={`r${i}`}
              d={`M${28 + i * 48} 26c-6-8 2-14 8-8 6-6 14 0 8 8z`}
              fill="#f3c5c8"
              stroke={INK}
              strokeWidth={2}
            />
          ))}
          {repeat(6, (i) => (
            <path key={`s${i}`} d={`M${18 + i * 33} 16l4 8`} stroke="#d97a2b" strokeWidth={2} strokeLinecap="round" />
          ))}
        </>
      );
  }
}

/** The cross-section for one flavour from bakery.cakeFlavours. Decorative: the card names the flavour. */
export function FlavourSlice({ flavour }: { flavour: string }) {
  const layers = flavourLayers[flavour] ?? flavourLayers.Vanilla!;
  const { sponge, filling, frosting, topping } = layers;
  return (
    <svg className="home-flavour__slice" viewBox="0 0 200 120" aria-hidden="true" focusable="false">
      <rect width="200" height="120" fill="#fcedf2" />
      <rect y="30" width="200" height="14" fill={frosting} />
      <rect y="44" width="200" height="22" fill={sponge} />
      <rect y="66" width="200" height="9" fill={filling} />
      <rect y="75" width="200" height="20" fill={sponge} />
      <rect y="95" width="200" height="9" fill={filling} />
      <rect y="104" width="200" height="16" fill={sponge} />
      <path d="M0 30h200M0 44h200M0 66h200M0 75h200M0 95h200M0 104h200" stroke={INK} strokeWidth="2.5" />
      {toppingArt(topping)}
    </svg>
  );
}
