import type { CSSProperties, ReactNode, SVGAttributes } from 'react';
import { cx } from '../../utils/cx';

/**
 * Sticker icons: filled, two- or three-tone icons with a bold cocoa outline, drawn for this system after the chunky
 * shop icons on a cookie site on Pinterest (The Crumb Culture). Where a Doodle is a line drawn in one ink, a sticker
 * icon is colored in, for header actions and feature rows.
 */
export type StickerIconName =
  'instagram' | 'whatsapp' | 'search' | 'bag' | 'cookie' | 'sprout' | 'flour' | 'mitt' | 'bowl' | 'gift';

export const STICKER_ICONS: readonly StickerIconName[] = [
  'instagram',
  'whatsapp',
  'search',
  'bag',
  'cookie',
  'sprout',
  'flour',
  'mitt',
  'bowl',
  'gift',
];

export interface StickerIconProps extends Omit<SVGAttributes<SVGSVGElement>, 'name'> {
  name: StickerIconName;
  /** Width and height in px or any CSS length. */
  size?: number | string;
  /** Override the fills: main, second and third. Any CSS color or token var. */
  tones?: [string?, string?, string?];
  /** Outline color. Defaults to the cocoa ink. */
  ink?: string;
  /** Accessible name. Omit when the icon sits beside a label or inside a labelled link (the default). */
  title?: string;
}

const c = (name: string) => `var(--bbm-color-${name})`;

/** The fills each icon is drawn in, from the board palette. */
const TONES: Record<StickerIconName, [string, string, string]> = {
  instagram: [c('pink-300'), c('cherry-500'), c('paper')],
  whatsapp: [c('butter-300'), c('cherry-600'), c('paper')],
  search: [c('brown-200'), c('cherry-600'), c('paper')],
  bag: [c('butter-300'), c('cherry-500'), c('pink-300')],
  cookie: [c('brown-200'), c('brown-700'), c('paper')],
  sprout: [c('brown-500'), c('matcha-400'), c('matcha-300')],
  flour: [c('beige-100'), c('butter-400'), c('cherry-500')],
  mitt: [c('pink-300'), c('cherry-500'), c('paper')],
  bowl: [c('pink-300'), c('butter-300'), c('blue-300')],
  gift: [c('pink-300'), c('cherry-500'), c('butter-300')],
};

const f1 = { fill: 'var(--_f1)' };
const f2 = { fill: 'var(--_f2)' };
const f3 = { fill: 'var(--_f3)' };
const ink = { fill: 'var(--_ink)', stroke: 'none' };
const none = { fill: 'none' };

const ART: Record<StickerIconName, ReactNode> = {
  instagram: (
    <>
      <rect x="15" y="6" width="13" height="7" rx="2.5" style={f2} />
      <rect x="5" y="10" width="38" height="31" rx="10" style={f1} />
      <circle cx="24" cy="26" r="9.5" style={f3} />
      <circle cx="24" cy="26" r="4.5" style={f2} />
      <circle cx="35.5" cy="17" r="2" style={ink} />
      <path d="M10 20c0-3 1.5-5 4-5.5" style={none} strokeWidth="2" opacity="0.6" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M24 6a17 17 0 1 1-8.6 31.7L7 40.5l2.6-8A17 17 0 0 1 24 6z" style={f1} />
      <path
        d="M17.5 15.5c1-1 2.5-.7 3 .4l1.4 3c.4.8.1 1.7-.5 2.2l-1 .8c1 2.2 2.6 3.8 4.8 4.8l.8-1c.5-.6 1.4-.9 2.2-.5l3 1.4c1.1.5 1.4 2 .4 3l-1.1 1.1c-1.5 1.5-3.9 1.7-5.7.6a22 22 0 0 1-8-8c-1.1-1.8-.9-4.2.6-5.7z"
        style={f2}
        strokeWidth="2"
      />
    </>
  ),
  search: (
    <>
      <path d="M29.5 29.5l9.5 9.5" strokeWidth="9" />
      <path d="M29.5 29.5l9.5 9.5" style={{ stroke: 'var(--_f2)' }} strokeWidth="4.6" />
      <circle cx="20" cy="20" r="13.5" style={f1} />
      <ellipse cx="15" cy="16" rx="2.4" ry="1.9" style={ink} />
      <ellipse cx="24" cy="14" rx="2" ry="1.6" style={ink} />
      <ellipse cx="25" cy="24" rx="2.4" ry="1.9" style={ink} />
      <ellipse cx="16" cy="25" rx="2" ry="1.6" style={ink} />
      <path d="M11.5 18a9 9 0 0 1 5-6" style={{ fill: 'none', stroke: 'var(--_f3)' }} strokeWidth="2.4" />
    </>
  ),
  bag: (
    <>
      <path d="M17 19v-5a7 7 0 0 1 14 0v5" style={none} />
      <path d="M8.5 17h31l-2.6 23.2a3 3 0 0 1-3 2.8H14.1a3 3 0 0 1-3-2.8z" style={f1} />
      <path d="M8.5 17h31l-.6 5.5H9.1z" style={f3} />
      <path d="M24 37c-5-3.2-6.8-6-5.6-8 1-1.6 3.6-1.6 5.6.6 2-2.2 4.6-2.2 5.6-.6 1.2 2-.6 4.8-5.6 8z" style={f2} />
    </>
  ),
  cookie: (
    <>
      <path
        d="M38 12.5a5 5 0 0 1-3.5 6.5 4.5 4.5 0 0 1 5.6 4.4A17 17 0 1 1 26.5 7.2a4.6 4.6 0 0 0 5.2 5.7 4.8 4.8 0 0 0 6.3-.4z"
        style={f1}
      />
      <ellipse cx="17" cy="19" rx="3" ry="2.4" style={f2} strokeWidth="1.6" />
      <ellipse cx="28" cy="22" rx="2.6" ry="2.1" style={f2} strokeWidth="1.6" />
      <ellipse cx="18.5" cy="31" rx="2.8" ry="2.2" style={f2} strokeWidth="1.6" />
      <ellipse cx="30" cy="33" rx="2.4" ry="2" style={f2} strokeWidth="1.6" />
      <circle cx="24" cy="26" r="1.1" style={ink} />
    </>
  ),
  sprout: (
    <>
      <path d="M24 32V19" style={none} />
      <path d="M24 23c-2-7.5-8.5-9.8-15-8.6.2 6.8 5.6 11 15 8.6z" style={f2} />
      <path d="M24 20c1.2-7.6 7.6-10.6 15-9.6-.4 7.4-6.6 11.6-15 9.6z" style={f3} />
      <path d="M7 41c2-7.4 9-10.5 17-10.5S39 33.6 41 41z" style={f1} />
      <circle cx="17" cy="37" r="1" style={ink} />
      <circle cx="29" cy="36" r="1" style={ink} />
      <circle cx="33" cy="38.5" r="1" style={ink} />
    </>
  ),
  flour: (
    <>
      <path
        d="M16.5 14c-4 6-7.4 14.5-6.6 22.6.4 4 4.3 6.4 14.1 6.4s13.7-2.4 14.1-6.4c.8-8.1-2.6-16.6-6.6-22.6z"
        style={f1}
      />
      <path d="M17 14.5c-1-5.5 3.5-9 7-7.4 3.5-1.6 8 1.9 7 7.4" style={f1} />
      <path d="M16.5 14.5c3.8 1.6 11.2 1.6 15 0" style={none} />
      <path d="M22.5 15.5l-3 4M25.5 15.5l3 4" style={{ fill: 'none', stroke: 'var(--_f3)' }} strokeWidth="2.6" />
      <path d="M24 39V24" style={none} strokeWidth="1.8" />
      <ellipse cx="21.4" cy="27" rx="2.2" ry="3.4" transform="rotate(-30 21.4 27)" style={f2} strokeWidth="1.6" />
      <ellipse cx="26.6" cy="27" rx="2.2" ry="3.4" transform="rotate(30 26.6 27)" style={f2} strokeWidth="1.6" />
      <ellipse cx="21.4" cy="32.5" rx="2.2" ry="3.4" transform="rotate(-30 21.4 32.5)" style={f2} strokeWidth="1.6" />
      <ellipse cx="26.6" cy="32.5" rx="2.2" ry="3.4" transform="rotate(30 26.6 32.5)" style={f2} strokeWidth="1.6" />
      <ellipse cx="24" cy="23" rx="1.8" ry="3" style={f2} strokeWidth="1.6" />
    </>
  ),
  mitt: (
    <>
      <path d="M13 37V19a9.5 9.5 0 0 1 19 0v6.5l3.6-4.4a4.2 4.2 0 0 1 6.4 5.4L34 37z" style={f1} />
      <rect x="11" y="35.5" width="25" height="7.5" rx="2.5" style={f2} />
      <path
        d="M22.5 30c-4-2.6-5.4-4.8-4.4-6.4.8-1.3 2.9-1.3 4.4.5 1.5-1.8 3.6-1.8 4.4-.5 1 1.6-.4 3.8-4.4 6.4z"
        style={f2}
        strokeWidth="1.8"
      />
      <path d="M17 13.5a6 6 0 0 1 4-3" style={{ fill: 'none', stroke: 'var(--_f3)' }} strokeWidth="2.4" />
    </>
  ),
  bowl: (
    <>
      <path d="M30 23l6-17" style={none} strokeWidth="2.6" />
      <path d="M30.5 22c-3-4-2-12 4-15 4.4 3 4.2 11 .4 15.6" style={none} strokeWidth="2" />
      <path d="M29.2 21.2c.4-4.2 2.6-8.6 5.2-10.6" style={none} strokeWidth="1.6" />
      <path d="M5 24h38c0 10.5-8.5 18-19 18S5 34.5 5 24z" style={f1} />
      <ellipse cx="24" cy="24" rx="19" ry="4.5" style={f2} />
      <path d="M11 31c1.4 3 3.6 5 6.4 6.2" style={{ fill: 'none', stroke: 'var(--_f3)' }} strokeWidth="2.4" />
    </>
  ),
  gift: (
    <>
      <path d="M24 14c-3-6-11-7.4-11.6-3-.4 3.4 5 4 11.6 3zM24 14c3-6 11-7.4 11.6-3 .4 3.4-5 4-11.6 3z" style={f2} />
      <rect x="9" y="21" width="30" height="21" rx="2.5" style={f1} />
      <rect x="6.5" y="14" width="35" height="8" rx="2.5" style={f1} />
      <rect x="21" y="14" width="6" height="28" style={f2} />
      <path d="M12 26v12" style={{ fill: 'none', stroke: 'var(--_f3)' }} strokeWidth="2.4" />
    </>
  ),
};

/** A filled sticker icon (see StickerIconName). */
export function StickerIcon({
  name,
  size = 32,
  tones,
  ink: inkColor,
  title,
  className,
  style,
  ...rest
}: StickerIconProps) {
  const [a, b, d] = TONES[name];
  const width = typeof size === 'number' ? `${size}px` : size;
  const vars = {
    '--_f1': tones?.[0] ?? a,
    '--_f2': tones?.[1] ?? b,
    '--_f3': tones?.[2] ?? d,
    '--_ink': inkColor ?? c('brown-900'),
    width,
    height: width,
    ...style,
  } as CSSProperties;
  return (
    <svg
      {...rest}
      viewBox="0 0 48 48"
      className={cx('bbm-sticker-icon', `bbm-sticker-icon--${name}`, className)}
      style={vars}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <g style={{ stroke: 'var(--_ink)' }} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {ART[name]}
      </g>
    </svg>
  );
}
