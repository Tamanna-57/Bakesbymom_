import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../utils/types';

export interface Step {
  title: ReactNode;
  description?: ReactNode;
  /** Replaces the default check (row) or number (numbered). */
  icon?: ReactNode;
}

export interface StepListProps extends HTMLAttributes<HTMLOListElement> {
  steps: Step[];
  /**
   * `row` = check icons joined by a line (Hopf Haus);
   * `stack` = letters stacked at jaunty angles (Pretty OK);
   * `numbered` = big numbered tabs (Taplink).
   */
  variant?: 'row' | 'stack' | 'numbered';
  /** Tones cycled through for `stack` and `numbered`. */
  tones?: Tone[];
}

const DEFAULT_TONES: Record<NonNullable<StepListProps['variant']>, Tone[]> = {
  row: ['cherry'],
  stack: ['strawberry', 'cocoa', 'butter', 'blueberry'],
  numbered: ['cherry', 'blueberry'],
};

const TILTS = [-2, 1.5, -1, 2];

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

/** An ordered process ("Choose your bake → Pick a date → Collect it warm"). */
export function StepList({ steps, variant = 'row', tones, className, ...rest }: StepListProps) {
  const cycle = tones?.length ? tones : DEFAULT_TONES[variant];
  return (
    <ol {...rest} className={cx('bbm-steps', `bbm-steps--${variant}`, className)}>
      {steps.map((step, i) => {
        const tone = cycle[i % cycle.length];
        const style =
          variant === 'stack' ? ({ '--_tilt': `${TILTS[i % TILTS.length]}deg` } as CSSProperties) : undefined;
        return (
          <li key={i} className="bbm-steps__item" data-bbm-tone={tone} style={style}>
            <span className="bbm-steps__marker" aria-hidden="true">
              {step.icon ?? (variant === 'row' ? <Check /> : String(i + 1).padStart(2, '0'))}
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
