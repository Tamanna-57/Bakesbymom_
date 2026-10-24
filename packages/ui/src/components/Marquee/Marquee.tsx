import { useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../utils/types';
import { Doodle } from '../Doodle/Doodle';

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  items: ReactNode[];
  /** Between items. Defaults to a sparkle doodle. */
  separator?: ReactNode;
  /** `band` is a solid ribbon; `bubble` is big outlined words with no band (pin 11). */
  variant?: 'band' | 'bubble';
  /** Band color (solid tone fill). Defaults to cocoa, or blue for the first of two rows. */
  tone?: Tone;
  /** Two ribbons in opposite colors moving in opposite directions (pin 02). */
  rows?: 1 | 2;
  /** Color of the second row when `rows={2}`. */
  secondTone?: Tone;
  /** Rotate the ribbon a few degrees so it crosses a section edge (pin 07). Keep within ±4. */
  tilt?: number;
  /** A decorative badge (a doodle in a circle) sitting in the middle of the ribbon (pin 04). */
  badge?: ReactNode;
  /** Uppercase for category words (default); turn off for sentence-case claims. */
  caps?: boolean;
  size?: 'sm' | 'md' | 'lg';
  direction?: 'forward' | 'reverse';
  /** Seconds per loop. Defaults to the `motion.duration.marquee` token (40s). */
  duration?: number;
  /** How many times the items repeat per half-track; raise it for short lists. */
  repeat?: number;
  /** Accessible name for the region, e.g. "What we bake". */
  label?: string;
  /** Show a pause/play button (WCAG 2.2.2). Turn off only for very short loops. */
  pausable?: boolean;
}

/**
 * A ribbon of repeating text between sections, the most common device on the
 * board (11 of 15 designs). Screen readers get the items once as a list; the
 * moving copy is hidden from them. Motion stops for users who prefer reduced
 * motion, and the pause button meets WCAG 2.2.2.
 */
export function Marquee({
  items,
  separator,
  variant = 'band',
  rows = 1,
  tone = rows === 2 ? 'blue' : 'brown',
  secondTone = 'brown',
  tilt,
  badge,
  caps = true,
  size = 'md',
  direction = 'forward',
  duration,
  repeat = 3,
  label,
  pausable = true,
  className,
  style,
  ...rest
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const sep = separator ?? <Doodle name="sparkle" size="0.9em" />;
  const vars: CSSProperties = { ...style };
  if (duration) (vars as Record<string, string>)['--_marquee-duration'] = `${duration}s`;
  if (tilt) vars.rotate = `${tilt}deg`;

  const group = (key: string) => (
    <div className="bbm-marquee__group" key={key}>
      {Array.from({ length: repeat }, (_, r) =>
        items.map((item, i) => (
          <span className="bbm-marquee__item" key={`${r}-${i}`}>
            {item}
            <span className="bbm-marquee__sep">{sep}</span>
          </span>
        )),
      )}
    </div>
  );

  const row = (rowTone: Tone, reverse: boolean, key: string) => (
    <div className={cx('bbm-marquee__row', reverse && 'bbm-marquee__row--reverse')} data-bbm-tone={rowTone} key={key}>
      <div className="bbm-marquee__track" aria-hidden="true">
        {group('a')}
        {group('b')}
      </div>
    </div>
  );

  return (
    <div
      {...rest}
      role={label ? 'region' : undefined}
      aria-label={label}
      className={cx(
        'bbm-marquee',
        `bbm-marquee--${variant}`,
        `bbm-marquee--${size}`,
        caps && 'bbm-marquee--caps',
        Boolean(tilt) && 'bbm-marquee--tilt',
        paused && 'bbm-marquee--paused',
        className,
      )}
      style={vars}
    >
      <ul className="bbm-visually-hidden">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      {row(tone, direction === 'reverse', 'first')}
      {rows === 2 && row(secondTone, direction !== 'reverse', 'second')}
      {badge && (
        <span className="bbm-marquee__badge" aria-hidden="true">
          {badge}
        </span>
      )}
      {pausable && (
        <button
          type="button"
          className="bbm-marquee__control"
          aria-pressed={paused}
          aria-label="Pause scrolling text"
          onClick={() => setPaused((p) => !p)}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            {paused ? (
              <path d="M5 3.5v9l7.5-4.5z" fill="currentColor" />
            ) : (
              <path d="M5 3.5v9M11 3.5v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      )}
    </div>
  );
}
