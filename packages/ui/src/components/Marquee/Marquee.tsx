import { useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../utils/types';
import { Doodle } from '../Doodle/Doodle';

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  items: ReactNode[];
  /** Between items. Defaults to a sparkle doodle. */
  separator?: ReactNode;
  /** Band color (solid tone fill). */
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg';
  direction?: 'forward' | 'reverse';
  /** Seconds per loop. Defaults to the `motion.duration.marquee` token (36s). */
  duration?: number;
  /** How many times the items repeat per half-track; raise it for short lists. */
  repeat?: number;
  /** Accessible name for the region, e.g. "What we bake". */
  label?: string;
  /** Show a pause/play button (WCAG 2.2.2). Turn off only for very short loops. */
  pausable?: boolean;
}

/**
 * A ribbon of repeating text between sections. Screen readers get the items
 * once as a list; the moving copy is hidden from them. Motion stops for users
 * who prefer reduced motion, and the pause button meets WCAG 2.2.2.
 */
export function Marquee({
  items,
  separator,
  tone = 'cocoa',
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
  const vars = duration ? ({ ...style, '--_marquee-duration': `${duration}s` } as CSSProperties) : style;

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

  return (
    <div
      {...rest}
      role={label ? 'region' : undefined}
      aria-label={label}
      data-bbm-tone={tone}
      className={cx(
        'bbm-marquee',
        `bbm-marquee--${size}`,
        direction === 'reverse' && 'bbm-marquee--reverse',
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
      <div className="bbm-marquee__track" aria-hidden="true">
        {group('a')}
        {group('b')}
      </div>
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
