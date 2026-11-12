import { useEffect } from 'react';
import { onScrollVelocity } from '../motion';
import { finePointer, gsap, motionAllowed, scatter, SplitText } from './gsap';

// Effects every page shares, run again on each page change:
// - section titles burst in letter by letter (script words are written in instead, so their joins stay whole);
// - the marquee ribbons and the reviews row speed up with the scroll, run backwards when the visitor scrolls up,
//   and lean into the motion;
// - buttons pull toward the cursor, and cards tilt toward it.

/** Titles whose letters fly in. Sections marked `data-fx-own` animate their own titles. */
const TITLES = [
  '.bbm-heading__title',
  '.home-shop__title',
  '.home-kitchen__title',
  '.site-hero__title',
  '.story-title',
  '[data-fx-split]',
].join(',');

/** Parts of a title set in the script: written in whole, never split into letters. */
export const SCRIPT_PARTS = [
  'em',
  '.fx-script',
  '.home-script',
  '.home-hero__script',
  '.home-wheel__amp',
  '.bbm-heading__overlay',
  '.bbm-heading__script',
].join(',');

const isScript = (el: Element) => getComputedStyle(el).fontFamily.includes('Pinyon');

/** Writes a script word in from left to right, like the intro's name. */
export function writeIn(targets: Element | Element[], vars: gsap.TweenVars = {}) {
  return gsap.fromTo(
    targets,
    // Fully shut at first, swashes and all; open a little past both edges at the end, for the swashes
    { clipPath: 'inset(-30% 108% -30% -8%)', rotate: -6 },
    {
      clipPath: 'inset(-30% -8% -30% -8%)',
      rotate: 0,
      duration: 1.1,
      ease: 'power2.out',
      clearProps: 'clipPath,rotate',
      ...vars,
    },
  );
}

/** Splits a title into letters (keeping script parts whole) and returns the letters and the script parts. */
export function splitTitle(title: HTMLElement) {
  const split = SplitText.create(title, { type: 'words,chars', ignore: SCRIPT_PARTS, aria: 'auto' });
  const scripts = [...title.querySelectorAll<HTMLElement>(SCRIPT_PARTS)];
  return { split, chars: split.chars as HTMLElement[], scripts };
}

function titleBursts(main: HTMLElement) {
  const titles = [...main.querySelectorAll<HTMLElement>(TITLES)].filter((t) => !t.closest('[data-fx-own]'));
  for (const title of titles) {
    const trigger = { trigger: title, start: 'top 88%', once: true };
    if (isScript(title)) {
      writeIn(title, { scrollTrigger: trigger });
      continue;
    }
    const { chars, scripts } = splitTitle(title);
    const tl = gsap.timeline({ scrollTrigger: trigger });
    if (chars.length)
      tl.from(chars, {
        yPercent: 120,
        rotate: (i) => scatter(i, -40, 40, 3),
        scale: 0.3,
        opacity: 0,
        duration: 0.9,
        ease: 'back.out(2.4)',
        stagger: 0.028,
      });
    if (scripts.length) tl.add(writeIn(scripts), '-=0.55');
  }
}

/** Ribbons and the reviews row: faster with the scroll, backwards when scrolling up, leaning as they go. */
function scrollDrivenRibbons() {
  const tracks = [...document.querySelectorAll<HTMLElement>('.bbm-marquee__track, .site-reviews__track')];
  const rows = [...document.querySelectorAll<HTMLElement>('.bbm-marquee__row')];
  if (!tracks.length || typeof tracks[0]?.getAnimations !== 'function') return () => {};
  // Looked up once (asking every frame was the heaviest thing on a phone), and again only if a ribbon restarts
  let animations = tracks.flatMap((track) => track.getAnimations());
  const lean_ = finePointer();
  let lastRate = 1;
  let direction = 1;
  let boost = 0;
  let lean = 0;
  let leanTarget = 0;
  let resting = true;
  const off = onScrollVelocity((velocity) => {
    if (Math.abs(velocity) > 0.4) direction = Math.sign(velocity);
    boost = Math.max(boost, Math.min(Math.abs(velocity) * 0.5, 7));
    leanTarget = Math.max(-9, Math.min(9, velocity * 0.45));
    resting = false;
  });
  const tick = () => {
    if (resting) return;
    boost *= 0.93;
    leanTarget *= 0.88;
    lean += (leanTarget - lean) * 0.2;
    const rate = Math.round(direction * (1 + boost) * 20) / 20;
    if (rate !== lastRate) {
      if (animations.some((a) => a.playState === 'idle')) animations = tracks.flatMap((track) => track.getAnimations());
      for (const animation of animations) animation.playbackRate = rate;
      lastRate = rate;
    }
    // The lean is for a mouse or trackpad: on a phone, skewing the rows every frame costs a repaint each time
    if (lean_)
      for (const row of rows) row.style.transform = Math.abs(lean) > 0.05 ? `skewX(${(-lean).toFixed(2)}deg)` : '';
    // Settled: keep running the way the visitor last scrolled, at the usual speed
    if (boost < 0.01 && Math.abs(lean) < 0.05) resting = true;
  };
  gsap.ticker.add(tick);
  return () => {
    off();
    gsap.ticker.remove(tick);
    for (const animation of animations) animation.playbackRate = 1;
    for (const row of rows) row.style.transform = '';
  };
}

const MAGNETS = '.bbm-button, .site-icon-link, .home-wheel__arrow, .order-rail__tile-arrow';
const TILTS = [
  '.site-menu__grid > li > *',
  '.order-rail__tile',
  '.site-tiles > li > *',
  '.treat-sig__grid > li > *',
].join(',');

interface Follower {
  el: HTMLElement;
  x: number;
  y: number;
  tx: number;
  ty: number;
}

/**
 * Buttons drift toward the cursor and spring back; cards tilt toward it in 3D. Mouse and trackpad only. Delegated
 * from the document, so cards that arrive later (the catalog) join in too.
 */
function pointerToys() {
  if (!finePointer()) return () => {};
  const followers = new Map<HTMLElement, Follower & { kind: 'magnet' | 'tilt' }>();
  let magnet: HTMLElement | null = null;
  let tilt: HTMLElement | null = null;

  const grab = (el: HTMLElement, kind: 'magnet' | 'tilt') => {
    let f = followers.get(el);
    if (!f) {
      f = { el, kind, x: 0, y: 0, tx: 0, ty: 0 };
      followers.set(el, f);
    }
    return f;
  };
  const release = (el: HTMLElement | null) => {
    const f = el && followers.get(el);
    if (f) {
      f.tx = 0;
      f.ty = 0;
    }
  };

  const move = (e: PointerEvent) => {
    const target = e.target instanceof Element ? e.target : null;
    const nextMagnet = target?.closest<HTMLElement>(MAGNETS) ?? null;
    const nextTilt = target?.closest<HTMLElement>(TILTS) ?? null;
    if (nextMagnet !== magnet) release(magnet);
    if (nextTilt !== tilt) release(tilt);
    magnet = nextMagnet;
    tilt = nextTilt;
    if (magnet) {
      const f = grab(magnet, 'magnet');
      const r = magnet.getBoundingClientRect();
      f.tx = (e.clientX - (r.left + r.width / 2)) * 0.3;
      f.ty = (e.clientY - (r.top + r.height / 2)) * 0.4;
    }
    if (tilt) {
      const f = grab(tilt, 'tilt');
      const r = tilt.getBoundingClientRect();
      f.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      f.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    }
  };
  const leave = () => {
    release(magnet);
    release(tilt);
    magnet = tilt = null;
  };

  const tick = () => {
    for (const f of followers.values()) {
      if (!f.el.isConnected) {
        followers.delete(f.el);
        continue;
      }
      const still = f.kind === 'magnet' ? 0.05 : 0.002;
      if (Math.abs(f.tx - f.x) < still && Math.abs(f.ty - f.y) < still) {
        // Home again: hand the element back to its own styles
        if (!f.tx && !f.ty) {
          if (f.kind === 'magnet') f.el.style.translate = '';
          else f.el.style.transform = '';
          followers.delete(f.el);
        }
        continue;
      }
      if (f.kind === 'magnet') {
        f.x += (f.tx - f.x) * 0.18;
        f.y += (f.ty - f.y) * 0.18;
        f.el.style.translate = `${f.x.toFixed(2)}px ${f.y.toFixed(2)}px`;
      } else {
        f.x += (f.tx - f.x) * 0.14;
        f.y += (f.ty - f.y) * 0.14;
        f.el.style.transform = `perspective(900px) rotateX(${(-f.y * 7).toFixed(2)}deg) rotateY(${(f.x * 9).toFixed(2)}deg)`;
      }
    }
  };
  document.addEventListener('pointermove', move, { passive: true });
  document.documentElement.addEventListener('pointerleave', leave);
  gsap.ticker.add(tick);
  return () => {
    gsap.ticker.remove(tick);
    document.removeEventListener('pointermove', move);
    document.documentElement.removeEventListener('pointerleave', leave);
    for (const f of followers.values()) {
      if (f.kind === 'magnet') f.el.style.translate = '';
      else f.el.style.transform = '';
    }
  };
}

/** The shared effects, for the page at `path`. */
export function useSiteFx(path: string) {
  useEffect(() => {
    const main = document.getElementById('main');
    if (!main || !motionAllowed()) return;
    const ctx = gsap.context(() => titleBursts(main));
    const stopRibbons = scrollDrivenRibbons();
    const stopToys = pointerToys();
    return () => {
      stopToys();
      stopRibbons();
      ctx.revert();
    };
  }, [path]);
}
