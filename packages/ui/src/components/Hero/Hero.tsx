import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../utils/types';
import { Doodle } from '../Doodle/Doodle';
import { SectionHeading } from '../SectionHeading/SectionHeading';

export type HeroVariant = 'paper' | 'band' | 'stickers' | 'photo';

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * - `paper`: grid paper, headline left, cutout product right, a handwritten note with a loopy
   *   arrow and a few doodles (pin 15). The lead.
   * - `band`: a solid panel between two stripe bands, centered headline, two floating photos
   *   and a seal (pin 06). For seasonal campaigns.
   * - `stickers`: a cutout product on a blob covered in promise stickers (pin 07). For launches.
   * - `photo`: a full-bleed photo with the copy on a solid cocoa card (pin 13, with contrast fixed).
   */
  variant?: HeroVariant;
  /** Shown in brackets for `paper`, as on pin 15. */
  eyebrow?: ReactNode;
  /** Wrap a phrase in <em> to set it in script. */
  title: ReactNode;
  script?: ReactNode;
  description?: ReactNode;
  /** Buttons (one primary, one secondary at most). */
  actions?: ReactNode;
  /** The product: a cutout image for `paper` and `stickers`. */
  media?: ReactNode;
  /** `paper`: a short handwritten aside beside the product, e.g. "made with real butter!". Decorative. */
  note?: ReactNode;
  /** `paper`: scatter the cherry, heart, sparkle and cupcake doodles. */
  doodles?: boolean;
  /** Three sparkles across the bottom edge (pin 11). On by default for `paper`. */
  seam?: boolean;
  /** `band`: panel color (default cherry). `stickers`: blob color (default pink). */
  tone?: Tone;
  /** `band`: two photos that float off the panel's corners. */
  photos?: [ReactNode, ReactNode?];
  /** `band`: a seal overlapping the end of the headline. */
  seal?: ReactNode;
  /** `stickers`: up to five stickers placed around the product. */
  stickers?: ReactNode[];
  /** `photo`: the background photo. */
  image?: { src: string; alt: string };
}

const DARK: Tone[] = ['cherry', 'brown', 'blue'];

/** The opening statement of a page, in the board's four hero styles. */
export function Hero({
  variant = 'paper',
  eyebrow,
  title,
  script,
  description,
  actions,
  media,
  note,
  doodles = true,
  seam = variant === 'paper',
  tone = variant === 'band' ? 'cherry' : 'pink',
  photos,
  seal,
  stickers = [],
  image,
  className,
  ...rest
}: HeroProps) {
  const centered = variant === 'band';
  const inverse = (variant === 'band' && DARK.includes(tone)) || variant === 'photo';

  const copy = (
    <div className="bbm-hero__copy">
      <SectionHeading
        eyebrow={eyebrow}
        eyebrowStyle={variant === 'paper' ? 'bracket' : 'text'}
        title={title}
        script={script}
        description={description}
        level={1}
        size="xl"
        align={centered ? 'center' : 'start'}
        tone={inverse ? 'inverse' : 'ink'}
      />
      {variant === 'band' && seal && (
        <div className="bbm-hero__seal" aria-hidden="true">
          {seal}
        </div>
      )}
      {actions && <div className="bbm-hero__actions">{actions}</div>}
    </div>
  );

  const sparkles = seam && (
    <div className="bbm-hero__seam" aria-hidden="true">
      <Doodle name="sparkle" size={40} />
      <Doodle name="sparkle" size={52} />
      <Doodle name="sparkle" size={40} />
    </div>
  );

  if (variant === 'band') {
    return (
      <section {...rest} className={cx('bbm-hero', 'bbm-hero--band', className)}>
        <div className="bbm-hero__stripes bbm-pattern" data-pattern="stripes" data-bbm-tone="blue" aria-hidden="true" />
        <div className="bbm-hero__panel" data-bbm-tone={tone}>
          {photos?.[0] && <div className="bbm-hero__float bbm-hero__float--a">{photos[0]}</div>}
          {photos?.[1] && <div className="bbm-hero__float bbm-hero__float--b">{photos[1]}</div>}
          <div className="bbm-hero__inner">{copy}</div>
        </div>
        <div className="bbm-hero__stripes bbm-pattern" data-pattern="stripes" data-bbm-tone="blue" aria-hidden="true" />
        {sparkles}
      </section>
    );
  }

  if (variant === 'photo') {
    return (
      <section {...rest} className={cx('bbm-hero', 'bbm-hero--photo', className)}>
        {image && <img className="bbm-hero__bg" src={image.src} alt={image.alt} />}
        <div className="bbm-hero__inner">
          <div className="bbm-hero__card">{copy}</div>
        </div>
        {sparkles}
      </section>
    );
  }

  return (
    <section
      {...rest}
      className={cx('bbm-hero', `bbm-hero--${variant}`, variant === 'paper' && 'bbm-pattern', className)}
      data-pattern={variant === 'paper' ? 'grid' : undefined}
      data-scale={variant === 'paper' ? 'lg' : undefined}
      data-bbm-tone={variant === 'paper' ? 'pink' : undefined}
    >
      <div className="bbm-hero__inner">
        {copy}
        {media && (
          <div className="bbm-hero__media" data-bbm-tone={tone}>
            <div className="bbm-hero__blob" aria-hidden="true" />
            <div className="bbm-hero__product">{media}</div>
            {variant === 'paper' && note && (
              <p className="bbm-hero__note" aria-hidden="true">
                <Doodle name="arrow" size={88} className="bbm-hero__arrow" />
                <span>{note}</span>
              </p>
            )}
            {variant === 'stickers' &&
              stickers.slice(0, 5).map((sticker, i) => (
                <div key={i} className={`bbm-hero__sticker bbm-hero__sticker--${i + 1}`}>
                  {sticker}
                </div>
              ))}
          </div>
        )}
      </div>
      {variant === 'paper' && doodles && (
        <div className="bbm-hero__doodles" aria-hidden="true">
          <Doodle name="cherry" size={44} className="bbm-hero__doodle bbm-hero__doodle--1" />
          <Doodle name="heart" size={30} className="bbm-hero__doodle bbm-hero__doodle--2" />
          <Doodle name="sparkle" size={28} className="bbm-hero__doodle bbm-hero__doodle--3" />
          <Doodle name="cupcake" size={40} className="bbm-hero__doodle bbm-hero__doodle--4" />
        </div>
      )}
      {sparkles}
    </section>
  );
}
