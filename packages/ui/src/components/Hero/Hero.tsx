import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../utils/types';
import { EdgeDivider } from '../EdgeDivider/EdgeDivider';
import type { Pattern } from '../PatternSurface/PatternSurface';
import { SectionHeading } from '../SectionHeading/SectionHeading';

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: ReactNode;
  /** Wrap a word in <em> for script, or in <span className="bbm-squiggle"> for an underline. */
  title: ReactNode;
  script?: ReactNode;
  description?: ReactNode;
  /** Buttons (one primary, one secondary at most). */
  actions?: ReactNode;
  /** Photo, polaroid stack or illustration shown beside the copy. */
  media?: ReactNode;
  /** Pattern panel behind the media. */
  pattern?: Pattern;
  /** Section background tone; omit for the canvas. */
  tone?: Tone;
  /** Tone of the pattern panel and awning. */
  accent?: Tone;
  align?: 'start' | 'center';
  /** Red-and-cream awning along the top edge (Lilli Pilli, strawberry poster). */
  awning?: boolean;
}

/** The opening statement of a page: eyebrow, display title, script accent, lead, actions and media. */
export function Hero({
  eyebrow,
  title,
  script,
  description,
  actions,
  media,
  pattern,
  tone,
  accent = 'strawberry',
  align = 'start',
  awning = false,
  className,
  ...rest
}: HeroProps) {
  return (
    <section
      {...rest}
      data-bbm-tone={tone}
      className={cx('bbm-hero', tone && 'bbm-hero--toned', media ? 'bbm-hero--split' : 'bbm-hero--solo', className)}
    >
      {awning && (
        <EdgeDivider
          shape="awning"
          size="lg"
          color={`var(--bbm-color-tone-${accent === 'cream' ? 'cherry' : accent}-solid)`}
          className="bbm-hero__awning"
        />
      )}
      <div className={cx('bbm-hero__inner', `bbm-hero__inner--${align}`)}>
        <div className="bbm-hero__copy">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            script={script}
            description={description}
            level={1}
            size="xl"
            align={align}
          />
          {actions && <div className="bbm-hero__actions">{actions}</div>}
        </div>
        {media && (
          <div className="bbm-hero__media" data-bbm-tone={accent}>
            {pattern && <div className="bbm-hero__backdrop bbm-pattern" data-pattern={pattern} aria-hidden="true" />}
            <div className="bbm-hero__media-content">{media}</div>
          </div>
        )}
      </div>
    </section>
  );
}
