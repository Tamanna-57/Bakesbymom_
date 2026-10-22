import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { HeadingLevel } from '../../utils/types';

export interface SectionHeadingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Small mono label above the title ("FRESH THIS WEEK"). */
  eyebrow?: ReactNode;
  /** `text` = tracked mono caps; `pill` = outlined label sitting on a rule (Berloga). */
  eyebrowStyle?: 'text' | 'pill';
  /**
   * The heading. Wrap a word in <em> to swap it into script:
   * `title={<>Baked with <em>love</em></>}`.
   */
  title: ReactNode;
  /** A script second line, part of the heading (Fraunces + Pinyon lockup). */
  script?: ReactNode;
  description?: ReactNode;
  align?: 'start' | 'center';
  level?: HeadingLevel;
  size?: 'xl' | 'lg' | 'md' | 'sm';
  /** `ink` (cocoa), `brand` (cherry) or `inverse` (cream on dark bands). */
  tone?: 'ink' | 'brand' | 'inverse';
}

/** Eyebrow + display title + optional script line + lead paragraph. */
export function SectionHeading({
  eyebrow,
  eyebrowStyle = 'text',
  title,
  script,
  description,
  align = 'start',
  level = 2,
  size = 'lg',
  tone = 'ink',
  className,
  ...rest
}: SectionHeadingProps) {
  const Heading = `h${level}` as const;
  return (
    <div
      {...rest}
      className={cx('bbm-heading', `bbm-heading--${align}`, `bbm-heading--${size}`, `bbm-heading--${tone}`, className)}
    >
      {eyebrow && (
        <p className={cx('bbm-heading__eyebrow', eyebrowStyle === 'pill' && 'bbm-heading__eyebrow--pill')}>
          <span>{eyebrow}</span>
        </p>
      )}
      <Heading className="bbm-heading__title">
        {title}
        {script && (
          <>
            {' '}
            <span className="bbm-heading__script">{script}</span>
          </>
        )}
      </Heading>
      {description && <div className="bbm-heading__description">{description}</div>}
    </div>
  );
}
