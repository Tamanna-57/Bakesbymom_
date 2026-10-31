import { useEffect } from 'react';
import Lenis from 'lenis';

// The site's motion layer: smooth scrolling, sections that rise in as they scroll into view, and a light
// parallax on the decorations. Everything here is skipped for visitors who ask for reduced motion.

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

/** Jumps to a scroll position without the smooth glide (for page changes). */
export function jumpTo(top: number) {
  if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
  else window.scrollTo(0, top);
}

/** Glides to a scroll position (for in-page controls like the bake steps). */
export function glideTo(top: number) {
  if (lenis) lenis.scrollTo(top);
  else window.scrollTo({ top, behavior: reducedMotion() ? 'auto' : 'smooth' });
}

/** Smooth, weighted scrolling for the whole page (Lenis). Nested scrollers like the chat keep their own scroll. */
export function useSmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;
    lenis = new Lenis({
      lerp: 0.1,
      autoRaf: true,
      allowNestedScroll: true,
      anchors: { offset: -96 },
    });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

// Each item in these lists rises in on its own, a beat after the one before it.
const ITEM_SELECTORS = [
  '.home-features__list > li',
  '.home-flavours__grid > li',
  '.home-shop__row > li',
  '.home-occasions__list > li',
  '.home-crafted__tiles > li',
  '.site-menu__grid > li',
  '.site-tiles > li',
  '.site-values > *',
  '.bbm-accordion__item',
  '.bbm-steps > li',
];

// Whole blocks that rise in as one: section headings, cards and the like.
const BLOCK_SELECTORS = [
  '.site-section > .site-container > *',
  '.home-about__card',
  '.home-shop__head',
  '.home-occasions__title',
  '.home-quote__card',
  '.home-crafted__lockup',
  '.home-order-card',
  '.home-kitchen__copy > *',
];

/** Marks blocks below the fold so they rise in when scrolled to. Run again whenever the page changes. */
export function useReveal(path: string) {
  useEffect(() => {
    if (reducedMotion() || !('IntersectionObserver' in window)) return;
    const main = document.getElementById('main');
    if (!main) return;

    const items = ITEM_SELECTORS.flatMap((s) => [...main.querySelectorAll<HTMLElement>(s)]);
    const blocks = BLOCK_SELECTORS.flatMap((s) => [...main.querySelectorAll<HTMLElement>(s)]).filter(
      // A block that holds items is left still, so its items can stagger in.
      (block) => !items.some((item) => block.contains(item)),
    );
    // Anything already on screen when the page opens stays put: the hero has its own entrance.
    const fold = window.innerHeight * 0.92;
    const targets = [...new Set([...items, ...blocks])].filter((el) => el.getBoundingClientRect().top > fold);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add('is-revealed');
          observer.unobserve(el);
          // Once it has landed, hand the element back to its own styles and hover transitions.
          const delay = Number(el.style.getPropertyValue('--reveal-i')) * 80;
          window.setTimeout(() => {
            el.classList.remove('is-revealed');
            delete el.dataset.reveal;
          }, delay + 1100);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    for (const el of targets) {
      const siblings = el.parentElement ? [...el.parentElement.children] : [el];
      el.style.setProperty('--reveal-i', String(items.includes(el) ? siblings.indexOf(el) % 6 : 0));
      el.dataset.reveal = '';
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, [path]);
}

/**
 * Decorations marked `data-parallax="0.1"` drift against the scroll by that fraction of their distance from
 * the middle of the screen. Their CSS places them with `translate: 0 var(--parallax-y)`.
 */
export function useParallax(path: string) {
  useEffect(() => {
    if (reducedMotion()) return;
    const els = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
    if (!els.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      for (const el of els) {
        const speed = Number(el.dataset.parallax) || 0;
        const current = Number(el.dataset.parallaxY) || 0;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) continue;
        const y = Math.round((rect.top + rect.height / 2 - current - mid) * -speed * 10) / 10;
        el.dataset.parallaxY = String(y);
        el.style.setProperty('--parallax-y', `${y}px`);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [path]);
}
