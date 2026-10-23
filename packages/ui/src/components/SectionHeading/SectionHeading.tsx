import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { HeadingLevel } from '../../utils/types';

export type SectionHeadingVariant = 'default' | 'bubble' | 'ribbon' | 'stamp';

export interface SectionHeadingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * - `default`: serif title; wrap a word in `<em>` to swap it into script.
   * - `bubble`: one huge outlined bubble word, like GALLERY on pin 01. Once per page.
   * - `ribbon`: a big script title between two cherry ribbons (the "Fillings" title, pin 16).
   * - `stamp`: a heavy title overlapped by the same words in script (pin 16). Once per page.
   */
  variant?: SectionHeadingVariant;
  /** Small label above the title ("FRESH THIS WEEK"). */
  eyebrow?: ReactNode;
  /**
   * `text` = tracked caps; `pill` = a handwritten word in an outlined oval (pin 01);
   * `bracket` = caps in brackets, "(BAKED IN MOM'S KITCHEN)" (pin 15).
   */
  eyebrowStyle?: 'text' | 'pill' | 'bracket';
  /**
   * The heading. Wrap a word in <em> to swap it into script:
   * `title={<>Baked with <em>love</em></>}`.
   */
  title: ReactNode;
  /** A script second line, part of the heading. */
  script?: ReactNode;
  /** `ribbon` only: the phrase repeated along both ribbons. */
  ribbonText?: string;
  /** `stamp` only: the script words laid over the heavy title (decorative; defaults to the title). */
  overlay?: ReactNode;
  description?: ReactNode;
  align?: 'start' | 'center';
  level?: HeadingLevel;
  size?: 'xl' | 'lg' | 'md' | 'sm';
  /** `ink` (cocoa), `brand` (cherry) or `inverse` (cream on dark bands). */
  tone?: 'ink' | 'brand' | 'inverse';
}

/** Eyebrow + title + optional script line + lead paragraph, in the board's title styles. */
export function SectionHeading({
  variant = 'default',
  eyebrow,
  eyebrowStyle = 'text',
  title,
  script,
  ribbonText = 'fresh this week',
  overlay,
  description,
  align = variant === 'default' ? 'start' : 'center',
  level = 2,
  size = 'lg',
  tone = 'ink',
  className,
  ...rest
}: SectionHeadingProps) {
  const Heading = `h${level}` as const;

  let heading: ReactNode;
  if (variant === 'ribbon') {
    const ribbon = (
      <span className="bbm-heading__ribbon" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i}>{ribbonText} •</span>
        ))}
      </span>
    );
    heading = (
      <div className="bbm-heading__ribbon-row">
        {ribbon}
        <Heading className="bbm-heading__title">{title}</Heading>
        {ribbon}
      </div>
    );
  } else if (variant === 'stamp') {
    heading = (
      <Heading className="bbm-heading__title">
        <span className="bbm-heading__heavy">{title}</span>
        <span className="bbm-heading__overlay" aria-hidden="true">
          {overlay ?? title}
        </span>
      </Heading>
    );
  } else {
    heading = (
      <Heading className="bbm-heading__title">
        {title}
        {script && (
          <>
            {' '}
            <span className="bbm-heading__script">{script}</span>
          </>
        )}
      </Heading>
    );
  }

  return (
    <div
      {...rest}
      className={cx(
        'bbm-heading',
        `bbm-heading--${variant}`,
        `bbm-heading--${align}`,
        `bbm-heading--${size}`,
        `bbm-heading--${tone}`,
        className,
      )}
    >
      {eyebrow && (
        <p className={cx('bbm-heading__eyebrow', `bbm-heading__eyebrow--${eyebrowStyle}`)}>
          <span>{eyebrow}</span>
        </p>
      )}
      {heading}
      {description && <div className="bbm-heading__description">{description}</div>}
    </div>
  );
}
