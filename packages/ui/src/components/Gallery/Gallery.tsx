import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
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
   * - `reel`: a row of photos that moves sideways as the page scrolls down. The panel pins under the header
   *   (`--bbm-gallery-reel-top`) until the last photo is in view. With reduced motion, or on a screen too short
   *   to pin, it is a row you swipe or scroll instead. Arrows step through it either way.
   */
  variant?: 'strips' | 'trio' | 'grid' | 'reel';
  /** Accessible name for the gallery. */
  label?: string;
  /** `strips`: the strip open on first render (defaults to the middle one). */
  defaultIndex?: number;
  /** `trio`: words for the bubble marquee across the top. */
  marquee?: string[];
  /** `grid`: link under the squares, e.g. `{ label: 'Follow @bakesbymom', href: '…' }`. */
  follow?: { label: string; href: string };
  /** `reel`: what sits above the row and pins with it, such as the heading and filter chips. */
  head?: ReactNode;
  /** `reel`: a last card at the end of the row, such as a link to see everything. */
  end?: ReactNode;
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
  head,
  end,
  className,
  ...rest
}: GalleryProps) {
  const [open, setOpen] = useState(() => Math.min(defaultIndex ?? Math.floor(items.length / 2), items.length - 1));
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const dragStart = useRef<number | null>(null);
  // A drag ends with a click on whichever strip is under the pointer; skip that click.
  const dragged = useRef(false);
  const captionId = `bbm-gallery-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  if (variant === 'reel') {
    return <GalleryReel {...rest} items={items} label={label} head={head} end={end} className={className} />;
  }

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

/* Reel ----------------------------------------------------------------------------------------------------- */

const media = (query: string) =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function' ? window.matchMedia(query) : null;

/**
 * The reel pins its panel while the page scrolls a distance equal to how far the row runs past the screen, and
 * slides the row by the same amount: one pixel down, one pixel sideways. Pins only when the visitor hasn't asked
 * for reduced motion and the screen is tall enough to hold the panel; otherwise the row scrolls on its own.
 */
function GalleryReel({
  items,
  label,
  head,
  end,
  className,
  ...rest
}: Pick<GalleryProps, 'items' | 'label' | 'head' | 'end' | 'className'> & HTMLAttributes<HTMLDivElement>) {
  const outer = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const view = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const distance = useRef(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const still = media('(prefers-reduced-motion: reduce)');
    const tall = media('(min-height: 500px)');
    if (!still || !tall) return;
    const update = () => setPinned(!still.matches && tall.matches);
    update();
    still.addEventListener('change', update);
    tall.addEventListener('change', update);
    return () => {
      still.removeEventListener('change', update);
      tall.removeEventListener('change', update);
    };
  }, []);

  /** Where the panel sticks, from its own `top`. */
  const stickTop = () => (panel.current ? parseFloat(getComputedStyle(panel.current).top) || 0 : 0);

  // Pinned: size the runway, then move the row with the page.
  useEffect(() => {
    const o = outer.current;
    const p = panel.current;
    const v = view.current;
    const t = track.current;
    if (!pinned || !o || !p || !v || !t) return;
    let frame = 0;
    const move = () => {
      frame = 0;
      const d = distance.current;
      const progress = d > 0 ? Math.min(1, Math.max(0, (stickTop() - o.getBoundingClientRect().top) / d)) : 0;
      t.style.transform = `translate3d(${(-progress * d).toFixed(1)}px, 0, 0)`;
      o.style.setProperty('--bbm-gallery-progress', progress.toFixed(4));
    };
    const measure = () => {
      distance.current = Math.max(0, t.offsetWidth - v.clientWidth);
      o.style.height = `${p.offsetHeight + distance.current}px`;
      move();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(move);
    };
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null;
    observer?.observe(p);
    observer?.observe(t);
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      o.style.height = '';
      o.style.removeProperty('--bbm-gallery-progress');
      t.style.transform = '';
    };
  }, [pinned]);

  // Not pinned: the progress bar follows the row's own scroll.
  useEffect(() => {
    const o = outer.current;
    const v = view.current;
    if (pinned || !o || !v) return;
    const onScroll = () => {
      const max = v.scrollWidth - v.clientWidth;
      o.style.setProperty('--bbm-gallery-progress', max > 0 ? (v.scrollLeft / max).toFixed(4) : '0');
    };
    onScroll();
    v.addEventListener('scroll', onScroll, { passive: true });
    return () => v.removeEventListener('scroll', onScroll);
  }, [pinned]);

  // New photos (a filter changed): start the row again from the first one.
  const photos = items.map((item) => item.src).join('|');
  const firstPhotos = useRef(photos);
  useEffect(() => {
    if (photos === firstPhotos.current) return;
    firstPhotos.current = photos;
    const o = outer.current;
    if (!pinned) {
      view.current?.scrollTo({ left: 0 });
      return;
    }
    const past = o ? stickTop() - o.getBoundingClientRect().top : 0;
    if (past > 0) window.scrollTo({ top: window.scrollY - past });
  }, [photos, pinned]);

  /** Scrolls the page (pinned) or the row so the row sits at `x`. */
  const goTo = (x: number, smooth: boolean) => {
    const o = outer.current;
    const v = view.current;
    if (!o || !v) return;
    const behavior: ScrollBehavior = smooth && !media('(prefers-reduced-motion: reduce)')?.matches ? 'smooth' : 'auto';
    if (pinned) {
      const clamped = Math.min(distance.current, Math.max(0, x));
      window.scrollTo({ top: window.scrollY + o.getBoundingClientRect().top - stickTop() + clamped, behavior });
    } else {
      v.scrollTo({ left: x, behavior });
    }
  };

  const position = () => {
    if (!pinned) return view.current?.scrollLeft ?? 0;
    const o = outer.current;
    return o ? Math.min(distance.current, Math.max(0, stickTop() - o.getBoundingClientRect().top)) : 0;
  };

  const step = (dir: 1 | -1) => {
    const card = track.current?.firstElementChild as HTMLElement | null;
    const gap = track.current ? parseFloat(getComputedStyle(track.current).columnGap) || 0 : 0;
    const width = (card?.offsetWidth ?? 240) + gap;
    goTo(Math.round(position() / width + dir) * width, true);
  };

  // Tabbing to a card off to the side brings it into view: the page scrolls to where the row shows it.
  const onFocus = (event: FocusEvent<HTMLUListElement>) => {
    const card = (event.target as HTMLElement).closest('li');
    const v = view.current;
    if (!pinned || !card || !v) return;
    const left = card.offsetLeft;
    const now = position();
    if (left >= now && left + card.offsetWidth <= now + v.clientWidth) return;
    goTo(left - (v.clientWidth - card.offsetWidth) / 2, false);
  };

  return (
    <div
      {...rest}
      ref={outer}
      role="group"
      aria-label={label}
      className={cx('bbm-gallery', 'bbm-gallery--reel', pinned && 'bbm-gallery--pinned', className)}
    >
      <div ref={panel} className="bbm-gallery__panel">
        {head && <div className="bbm-gallery__head">{head}</div>}
        <div ref={view} className="bbm-gallery__view">
          <ul ref={track} className="bbm-gallery__track" onFocus={onFocus}>
            {items.map((item, i) => (
              <li key={`${item.src}-${i}`}>
                <figure>
                  <img src={item.src} alt={item.alt} loading="lazy" draggable={false} />
                  {item.caption && <figcaption>{item.caption}</figcaption>}
                </figure>
              </li>
            ))}
            {end && <li className="bbm-gallery__end">{end}</li>}
          </ul>
        </div>
        <div className="bbm-gallery__footer">
          <div className="bbm-gallery__progress" aria-hidden="true" />
          <div className="bbm-gallery__controls">
            <button type="button" className="bbm-gallery__nav" aria-label="Previous photos" onClick={() => step(-1)}>
              <Arrow dir="prev" />
            </button>
            <button type="button" className="bbm-gallery__nav" aria-label="Next photos" onClick={() => step(1)}>
              <Arrow dir="next" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
