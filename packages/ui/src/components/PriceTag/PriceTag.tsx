import type { CSSProperties, HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { scallopCirclePath } from '../../utils/shapes';
import type { Tone } from '../../utils/types';

export type PriceTagShape = 'flower' | 'cloud' | 'scallop' | 'circle' | 'tag';

export interface PriceTagProps extends HTMLAttributes<HTMLDivElement> {
  /** The price as displayed, e.g. "$38" or "From $24". */
  amount: string;
  /** Small caps line under the price, e.g. "per dozen". */
  label?: string;
  shape?: PriceTagShape;
  tone?: Tone;
  /** Diameter (or height, for `tag`) in px. */
  size?: number;
  /** Tilt in degrees. Keep it under ±15° so the price stays easy to read. */
  rotate?: number;
}

const SHAPES: Record<Exclude<PriceTagShape, 'tag'>, string> = {
  flower: scallopCirclePath(50, 50, 49, 9, 1.05),
  cloud: scallopCirclePath(50, 50, 49, 6, 1.25),
  circle: 'M50 1a49 49 0 1 1 0 98a49 49 0 1 1 0-98z',
  scallop: scallopSquarePath(),
};

/** A rounded square with a scalloped edge: the "$399 cart fee" shape on pin 15. */
function scallopSquarePath() {
  const bumps = 5;
  const lo = 6;
  const hi = 94;
  const step = (hi - lo) / bumps;
  const r = step / 2;
  const arc = (x: number, y: number) => `A${r} ${r} 0 0 1 ${x} ${y}`;
  let d = `M${lo} ${lo}`;
  for (let i = 1; i <= bumps; i++) d += arc(lo + step * i, lo);
  for (let i = 1; i <= bumps; i++) d += arc(hi, lo + step * i);
  for (let i = 1; i <= bumps; i++) d += arc(hi - step * i, hi);
  for (let i = 1; i <= bumps; i++) d += arc(lo, hi - step * i);
  return `${d}Z`;
}

// Hotel key tag: tapered end with a hole (even-odd cut-out) and a ring.
const KEY_TAG = 'M34 6H186a12 12 0 0 1 12 12V82a12 12 0 0 1-12 12H34L6 62V38Z M24 50a6 6 0 1 0 12 0a6 6 0 1 0-12 0Z';

/** A playful shaped price: flower, cloud and scalloped square (pin 15), coin, or key tag (pin 08). */
export function PriceTag({
  amount,
  label,
  shape = 'flower',
  tone = 'pink',
  size = 120,
  rotate = 0,
  className,
  style,
  ...rest
}: PriceTagProps) {
  const vars = { ...style, '--_tag-size': `${size}px`, '--_tag-rotate': `${rotate}deg` } as CSSProperties;
  const isKey = shape === 'tag';

  return (
    <div
      {...rest}
      data-bbm-tone={tone}
      className={cx('bbm-price-tag', `bbm-price-tag--${shape}`, className)}
      style={vars}
    >
      <svg
        className="bbm-price-tag__shape"
        viewBox={isKey ? '0 0 204 100' : '0 0 100 100'}
        aria-hidden="true"
        focusable="false"
      >
        <path d={isKey ? KEY_TAG : SHAPES[shape]} fillRule="evenodd" />
        {isKey && <circle className="bbm-price-tag__ring" cx="30" cy="50" r="12" />}
      </svg>
      <span className="bbm-price-tag__amount">{amount}</span>
      {label && <span className="bbm-price-tag__label">{label}</span>}
    </div>
  );
}
