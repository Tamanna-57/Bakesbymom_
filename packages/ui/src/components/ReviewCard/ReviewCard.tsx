import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../utils/types';
import { Card, type CardProps } from '../Card/Card';

export interface ReviewCardProps extends Omit<CardProps, 'children' | 'tone' | 'frame'> {
  quote: ReactNode;
  author: string;
  /** What they ordered, shown in handwriting under the stars, e.g. "Birthday cupcakes". */
  detail?: string;
  /** Star rating from 0 to 5 (whole numbers). */
  rating?: number;
  tone?: Tone;
}

function Stars({ rating }: { rating: number }) {
  const value = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="bbm-review__stars" role="img" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true" focusable="false" data-filled={i < value || undefined}>
          <path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
        </svg>
      ))}
    </div>
  );
}

/** A customer review on a scalloped card with an offset shadow, after pin 01. */
export function ReviewCard({
  quote,
  author,
  detail,
  rating,
  tone = 'pink',
  shape = 'scallop',
  sticker = true,
  as = 'article',
  className,
  ...rest
}: ReviewCardProps) {
  return (
    <Card {...rest} as={as} tone={tone} shape={shape} sticker={sticker} className={cx('bbm-review', className)}>
      <p className="bbm-review__name">{author}</p>
      <blockquote className="bbm-review__quote">
        <p>{quote}</p>
      </blockquote>
      <div className="bbm-review__footer">
        {rating !== undefined && <Stars rating={rating} />}
        {detail && <p className="bbm-review__detail">{detail}</p>}
      </div>
    </Card>
  );
}
