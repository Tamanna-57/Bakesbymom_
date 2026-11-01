import {
  useEffect,
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
  /** `strips`: what sits above the strips, such as the heading and filter chips (it pins with them). */
  head?: ReactNode;
  /**
   * `strips`: pin the gallery under the header (`--bbm-gallery-pin-top`) and let the page's scroll open the strips
   * one after another, left to right, before the page carries on. Clicks, drags and arrows scroll the page to that
   * strip. Off with reduced motion, or on a screen under 500px tall.
   */
  pinOnScroll?: boolean;
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
  pinOnScroll = false,
  className,
  ...rest
}: GalleryProps) {
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

  return (
    <GalleryStrips
      {...rest}
      items={items}
      label={label}
      defaultIndex={defaultIndex}
      head={head}
      pinOnScroll={pinOnScroll}
      className={className}
    />
  );
}

const media = (query: string) =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function' ? window.matchMedia(query) : null;

/** How far the page scrolls to move the open strip on by one. */
const stepPx = () => Math.max(160, Math.round(window.innerHeight * 0.32));

/** Pin 01's strips. With `pinOnScroll`, the page's scroll picks the open strip (see GalleryProps). */
function GalleryStrips({
  items,
  label,
  defaultIndex,
  head,
  pinOnScroll,
  className,
  ...rest
}: Pick<GalleryProps, 'items' | 'label' | 'defaultIndex' | 'head' | 'pinOnScroll' | 'className'> &
  HTMLAttributes<HTMLDivElement>) {
  const middle = () => Math.min(defaultIndex ?? Math.floor(items.length / 2), items.length - 1);
  const [open, setOpen] = useState(middle);
  const [pinned, setPinned] = useState(false);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const outer = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);
  // A drag ends with a click on whichever strip is under the pointer; skip that click.
  const dragged = useRef(false);
  const captionId = `bbm-gallery-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  // Pin only when the visitor hasn't asked for reduced motion and the screen is tall enough for the panel.
  useEffect(() => {
    if (!pinOnScroll) return;
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
      setPinned(false);
    };
  }, [pinOnScroll]);

  /** Where the panel sticks, from its own `top`. */
  const stickTop = () => (panel.current ? parseFloat(getComputedStyle(panel.current).top) || 0 : 0);
  /** How far the page has scrolled into the gallery's runway. */
  const scrolled = () => (outer.current ? stickTop() - outer.current.getBoundingClientRect().top : 0);

  // Pinned: a runway of one step per strip; the page's scroll picks the open one.
  useEffect(() => {
    const o = outer.current;
    const p = panel.current;
    if (!pinned || !o || !p) return;
    let frame = 0;
    const pick = () => {
      frame = 0;
      const index = Math.min(items.length - 1, Math.max(0, Math.round(scrolled() / stepPx())));
      setOpen(index);
    };
    const measure = () => {
      o.style.height = `${p.offsetHeight + stepPx() * Math.max(0, items.length - 1)}px`;
      pick();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null;
    observer?.observe(p);
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      o.style.height = '';
    };
  }, [pinned, items.length]);

  // New photos (a filter changed): pinned, start again from the first strip; otherwise open the middle one.
  const photos = items.map((item) => item.src).join('|');
  const shownPhotos = useRef(photos);
  useEffect(() => {
    if (photos === shownPhotos.current) return;
    shownPhotos.current = photos;
    if (!pinned) {
      setOpen(middle());
      return;
    }
    const past = scrolled();
    if (past > 0) window.scrollTo({ top: window.scrollY - past });
    setOpen(0);
  }, [photos, pinned]);

  // On a phone the strips are a swipe row: keep the open one in view.
  useEffect(() => {
    if (!pinned) return;
    const button = buttons.current[open];
    const row = button?.parentElement;
    if (!button || !row || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: button.offsetLeft - (row.clientWidth - button.offsetWidth) / 2, behavior: 'smooth' });
  }, [open, pinned]);

  const select = (index: number, focus = false) => {
    // Pinned, the ends stop rather than wrap round (wrapping would throw the page back up the gallery).
    const next = pinned ? Math.min(items.length - 1, Math.max(0, index)) : (index + items.length) % items.length;
    if (focus) buttons.current[next]?.focus({ preventScroll: true });
    if (pinned) {
      // Scroll the page to where this strip opens; the scroll handler opens it.
      window.scrollTo({ top: window.scrollY - scrolled() + next * stepPx(), behavior: 'smooth' });
      return;
    }
    setOpen(next);
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
    <div
      {...rest}
      ref={outer}
      role="group"
      aria-label={label}
      className={cx('bbm-gallery', 'bbm-gallery--strips', pinned && 'bbm-gallery--pinned', className)}
    >
      <div ref={panel} className="bbm-gallery__panel">
        {head && <div className="bbm-gallery__head">{head}</div>}
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
                  <span className="bbm-gallery__chip-drag">{pinned ? 'Scroll' : 'Drag'}</span>
                  <span className="bbm-gallery__chip-swipe">{pinned ? 'Scroll' : 'Swipe'}</span>
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
    </div>
  );
}
