import { useLayoutEffect, type DependencyList, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// The site's big motion: GSAP with ScrollTrigger (pinned and scrubbed scenes) and SplitText (letters that fly in).
// Lenis keeps the smooth scroll and drives ScrollTrigger (motion.ts). Every effect is skipped for visitors who ask
// for reduced motion, so each section's CSS is also its still, finished look.

gsap.registerPlugin(ScrollTrigger, SplitText);

// On phones the address bar slides in and out as you scroll, changing the screen's height. Recalculating every pinned
// and scrubbed scene each time makes the page jump, so those height-only changes are ignored.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText };

/** False for visitors who ask for reduced motion, and where there is no browser (tests). */
export function motionAllowed() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** A mouse or trackpad (hover effects and the cursor label), as opposed to a finger. */
export function finePointer() {
  return typeof window.matchMedia === 'function' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/** Phone-sized screens get shorter pins and smaller moves. */
export function narrowScreen() {
  return typeof window.matchMedia === 'function' && window.matchMedia('(max-width: 639.98px)').matches;
}

/**
 * Runs a section's animations in a GSAP context scoped to `scope`, and reverts all of them (tweens, scroll
 * triggers, pins and split text) when the section unmounts. Nothing runs for reduced motion.
 */
export function useFx(
  scope: RefObject<HTMLElement | null>,
  setup: (root: HTMLElement) => void | (() => void),
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root || !motionAllowed()) return;
    let cleanup: void | (() => void);
    const ctx = gsap.context(() => {
      cleanup = setup(root);
    }, root);
    return () => {
      cleanup?.();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** A repeatable pseudo-random number in [min, max) for item `i`, so scattered things land the same way each visit. */
export function scatter(i: number, min: number, max: number, seed = 1) {
  const x = Math.sin((i + 1) * 12.9898 * seed + seed * 78.233) * 43758.5453;
  return min + (x - Math.floor(x)) * (max - min);
}
