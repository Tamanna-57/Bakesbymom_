import {
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import { Marquee } from '../Marquee/Marquee';

export interface GalleryItem {
  src: string;
  /** Say what's in the photo. */
  alt: string;
  caption?: ReactNode;
}

export interface GalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /**
   * - `strips`: tall strips, one open in color and the rest narrow and greyscale (pin 01). The lead.
   * - `trio`: three photos on a cocoa band, the middle one taller, under a bubble marquee (pin 11).
   * - `grid`: six squares edge to edge with a follow link (pin 12).
   */
  variant?: 'strips' | 'trio' | 'grid';
  /** Accessible name for the gallery. */
  label?: string;
  /** `strips`: the strip open on first render (defaults to the middle one). */
  defaultIndex?: number;
  /** `trio`: words for the bubble marquee across the top. */
  marquee?: string[];
  /** `grid`: link under the squares, e.g. `{ label: 'Follow @bakesbymom', href: '…' }`. */
  follow?: { label: string; href: string };
}

function Arrow({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path
        d={dir === 'prev' ? 'M10 3 5 8l5 5' : 'M6 3l5 5-5 5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A photo gallery in the board's three styles. */
export function Gallery({
  items,
  variant = 'strips',
  label = 'Gallery',
  defaultIndex,
  marquee,
  follow,
  className,
  ...rest
}: GalleryProps) {
  const [open, setOpen] = useState(() => Math.min(defaultIndex ?? Math.floor(items.length / 2), items.length - 1));
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const dragStart = useRef<number | null>(null);
  // A drag ends with a click on whichever strip is under the pointer; skip that click.
  const dragged = useRef(false);
  const captionId = `bbm-gallery-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  if (variant === 'trio') {
    return (
      <div {...rest} role="group" aria-label={label} className={cx('bbm-gallery', 'bbm-gallery--trio', className)}>
        {marquee && <Marquee variant="bubble" items={marquee} />}
        <ul className="bbm-gallery__trio">
          {items.slice(0, 3).map((item, i) => (
            <li key={i}>
              <figure>
                <img src={item.src} alt={item.alt} loading="lazy" />
                {item.caption && <figcaption>{item.caption}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div {...rest} role="group" aria-label={label} className={cx('bbm-gallery', 'bbm-gallery--grid', className)}>
        <ul className="bbm-gallery__grid">
          {items.slice(0, 6).map((item, i) => (
            <li key={i}>
              <img src={item.src} alt={item.alt} loading="lazy" />
            </li>
          ))}
        </ul>
        {follow && (
          <a className="bbm-gallery__follow" href={follow.href}>
            {follow.label}
          </a>
        )}
      </div>
    );
  }

  const select = (index: number, focus = false) => {
    const next = (index + items.length) % items.length;
    setOpen(next);
    if (focus) buttons.current[next]?.focus();
    buttons.current[next]?.scrollIntoView?.({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = buttons.current.findIndex((b) => b === document.activeElement);
    if (current < 0) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      buttons.current[(current + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length]?.focus();
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      buttons.current[event.key === 'Home' ? 0 : items.length - 1]?.focus();
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientX;
    dragged.current = false;
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    const dx = event.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 40) {
      dragged.current = true;
      select(open + (dx < 0 ? 1 : -1));
    }
  };

  const current = items[open];

  return (
    <div {...rest} role="group" aria-label={label} className={cx('bbm-gallery', 'bbm-gallery--strips', className)}>
      <div className="bbm-gallery__row" onKeyDown={onKeyDown} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        {items.map((item, i) => (
          <button
            key={i}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            type="button"
            className={cx('bbm-gallery__strip', i === open && 'bbm-gallery__strip--open')}
            aria-expanded={i === open}
            aria-describedby={i === open && current?.caption ? captionId : undefined}
            onClick={() => {
              if (dragged.current) {
                dragged.current = false;
                return;
              }
              select(i);
            }}
          >
            <img src={item.src} alt={item.alt} loading="lazy" draggable={false} />
            {i === open && (
              <span className="bbm-gallery__chip" aria-hidden="true">
                <span className="bbm-gallery__chip-drag">Drag</span>
                <span className="bbm-gallery__chip-swipe">Swipe</span>
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="bbm-gallery__footer">
        <p id={captionId} className="bbm-gallery__caption">
          {current?.caption}
        </p>
        <div className="bbm-gallery__controls">
          <button
            type="button"
            className="bbm-gallery__nav"
            aria-label="Previous photo"
            onClick={() => select(open - 1)}
          >
            <Arrow dir="prev" />
          </button>
          <button type="button" className="bbm-gallery__nav" aria-label="Next photo" onClick={() => select(open + 1)}>
            <Arrow dir="next" />
          </button>
        </div>
      </div>
    </div>
  );
}
