import { useId, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { scallopCirclePath } from '../../utils/shapes';
import type { Tone } from '../../utils/types';

export interface SealProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Text set around the ring (end it with a separator so the loop reads well,
   * e.g. "Baked fresh daily • "). For `oval`, it's the centered text.
   */
  text: string;
  /** Center content (a doodle, a word, a number). */
  children?: ReactNode;
  /** Diameter in px (the oval is 1.5× wider). */
  size?: number;
  tone?: Tone;
  /** `scallop` = bottle-cap edge, `circle` = smooth, `oval` = outlined claim sticker. */
  shape?: 'scallop' | 'circle' | 'oval';
  /** Slowly rotate the ring text (disabled when the user prefers reduced motion). */
  spin?: boolean;
  /** Accessible name. Defaults to `text`. */
  label?: string;
}

const RING = 'M50 50m-35.5 0a35.5 35.5 0 1 1 71 0a35.5 35.5 0 1 1-71 0';
const RING_LENGTH = 2 * Math.PI * 35.5;
const SCALLOP = scallopCirclePath(50, 50, 49.5, 22, 1);

/** A circular sticker seal with text set on a ring, like a bakery stamp or bottle cap. */
export function Seal({
  text,
  children,
  size = 128,
  tone = 'cherry',
  shape = 'scallop',
  spin = false,
  label,
  className,
  style,
  ...rest
}: SealProps) {
  const ringId = `bbm-seal-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const vars = { ...style, '--_seal-size': `${size}px` } as CSSProperties;

  if (shape === 'oval') {
    return (
      <div
        {...rest}
        role="img"
        aria-label={label ?? text}
        data-bbm-tone={tone}
        className={cx('bbm-seal', 'bbm-seal--oval', className)}
        style={vars}
      >
        <span className="bbm-seal__oval-text" aria-hidden="true">
          {children ?? text}
        </span>
      </div>
    );
  }

  return (
    <div
      {...rest}
      role="img"
      aria-label={label ?? text}
      data-bbm-tone={tone}
      className={cx('bbm-seal', spin && 'bbm-seal--spin', className)}
      style={vars}
    >
      <svg className="bbm-seal__art" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        {shape === 'scallop' ? (
          <path className="bbm-seal__shape" d={SCALLOP} />
        ) : (
          <circle className="bbm-seal__shape" cx="50" cy="50" r="49" />
        )}
        <circle className="bbm-seal__inner" cx="50" cy="50" r="28.5" />
        <g className="bbm-seal__ring">
          <path id={ringId} d={RING} fill="none" />
          <text className="bbm-seal__text">
            <textPath href={`#${ringId}`} textLength={RING_LENGTH - 2} lengthAdjust="spacing">
              {text}
            </textPath>
          </text>
        </g>
      </svg>
      {children && (
        <span className="bbm-seal__center" aria-hidden="true">
          {children}
        </span>
      )}
    </div>
  );
}
