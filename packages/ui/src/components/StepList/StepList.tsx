import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../utils/types';

export interface Step {
  title: ReactNode;
  description?: ReactNode;
  /** Replaces the default marker: a doodle sticker for `stack`, a check for `row`. */
  icon?: ReactNode;
}

export type StepListVariant = 'stack' | 'row' | 'tabs' | 'cards';

export interface StepListProps extends HTMLAttributes<HTMLOListElement> {
  steps: Step[];
  /**
   * - `stack`: tilted flavor cards with a sticker on the left (pin 02). The lead.
   * - `row`: checkboxes joined by a line (pin 04).
   * - `tabs`: numbered folder tabs that overlap downward (pin 08), for 5–7 steps.
   * - `cards`: paper cards with a "Step 1" tab on top (pin 10).
   */
  variant?: StepListVariant;
  /** Tones cycled through the steps. */
  tones?: Tone[];
  /** `stack` only: tilt per step in degrees, cycled. Keep within ±3. */
  tilts?: number[];
  /** `cards` only: the tab label; receives the 1-based step number. */
  tabLabel?: (n: number) => ReactNode;
}

const DEFAULT_TONES: Record<StepListVariant, Tone[]> = {
  stack: ['pink', 'brown', 'blue', 'butter'],
  row: ['pink'],
  tabs: ['cherry', 'beige', 'blue'],
  cards: ['pink'],
};

/** Dark tones are filled; light tones use their soft tint, so text stays AA either way. */
const fillFor = (tone: Tone) => (tone === 'cherry' || tone === 'brown' ? 'solid' : 'soft');

function Check() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M6 12.5l4 4 8-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** An ordered process ("Pick your bake → Choose a date → Pick it up warm"). */
export function StepList({
  steps,
  variant = 'stack',
  tones,
  tilts = [-2, 2, 0, 0],
  tabLabel = (n) => `Step ${n}`,
  className,
  ...rest
}: StepListProps) {
  const cycle = tones?.length ? tones : DEFAULT_TONES[variant];
  return (
    <ol {...rest} className={cx('bbm-steps', `bbm-steps--${variant}`, className)}>
      {steps.map((step, i) => {
        const tone = cycle[i % cycle.length]!;
        const style =
          variant === 'stack' ? ({ '--_tilt': `${tilts[i % tilts.length] ?? 0}deg` } as CSSProperties) : undefined;
        let marker: ReactNode;
        if (variant === 'row') marker = step.icon ?? <Check />;
        else if (variant === 'cards') marker = tabLabel(i + 1);
        else if (variant === 'tabs') marker = String(i + 1).padStart(2, '0');
        else marker = step.icon ?? i + 1;
        return (
          <li key={i} className="bbm-steps__item" data-bbm-tone={tone} data-fill={fillFor(tone)} style={style}>
            <span className="bbm-steps__marker" aria-hidden={variant === 'cards' ? undefined : 'true'}>
              {marker}
            </span>
            <div className="bbm-steps__content">
              <p className="bbm-steps__title">{step.title}</p>
              {step.description && <div className="bbm-steps__description">{step.description}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
