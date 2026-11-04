import { useEffect, useRef } from 'react';
import { onScrollVelocity } from '../motion';
import { finePointer, gsap, motionAllowed } from './gsap';
import './fx.css';

/* Sprinkles: a click or tap anywhere throws a pinch of sprinkles in the palette's colours --------------------- */

const SPRINKLE_TONES = ['cherry-500', 'pink-300', 'blue-300', 'butter-300', 'matcha-300', 'paper', 'brown-700'];

interface Sprinkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
  life: number;
  color: string;
  round: boolean;
}

export function Sprinkles() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx || !motionAllowed()) return;
    const styles = getComputedStyle(document.documentElement);
    const colors = SPRINKLE_TONES.map((t) => styles.getPropertyValue(`--bbm-color-${t}`).trim() || '#d02b2f');
    let sprinkles: Sprinkle[] = [];
    let frame = 0;
    let ratio = 1;

    const size = () => {
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      el.width = window.innerWidth * ratio;
      el.height = window.innerHeight * ratio;
    };
    const draw = () => {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      sprinkles = sprinkles.filter((s) => s.life > 0);
      for (const s of sprinkles) {
        s.vy += 0.32;
        s.vx *= 0.985;
        s.x += s.vx;
        s.y += s.vy;
        s.angle += s.spin;
        s.life -= 1;
        ctx.save();
        ctx.globalAlpha = Math.min(1, s.life / 20);
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        if (s.round) ctx.arc(0, 0, 3, 0, Math.PI * 2);
        else ctx.roundRect(-5.5, -1.75, 11, 3.5, 1.75);
        ctx.fill();
        ctx.restore();
      }
      frame = sprinkles.length ? requestAnimationFrame(draw) : 0;
    };
    const burst = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const target = e.target instanceof Element ? e.target : null;
      // Not while typing or choosing in a form
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
      const count = target?.closest('a, button') ? 26 : 16;
      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.3;
        const speed = 4 + Math.random() * 7;
        sprinkles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          angle: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.4,
          life: 50 + Math.random() * 40,
          color: colors[i % colors.length]!,
          round: Math.random() < 0.18,
        });
      }
      if (!frame) frame = requestAnimationFrame(draw);
    };
    size();
    window.addEventListener('resize', size);
    window.addEventListener('pointerdown', burst, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', size);
      window.removeEventListener('pointerdown', burst);
    };
  }, []);
  return <canvas ref={canvas} className="fx-sprinkles" aria-hidden="true" />;
}

/* Scroll progress: a candy-striped ribbon across the top of the screen --------------------------------------- */

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0})`;
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
  }, []);
  return <div ref={bar} className="fx-progress" aria-hidden="true" />;
}

/* The cursor label: a cherry sticker that follows the mouse and says what a card does ------------------------ */

/** What the label says over each kind of thing. `data-cursor="…"` on any element sets its own word. */
const CURSOR_WORDS: Array<[string, string]> = [
  ['[data-cursor]', ''],
  ['.home-wheel__stage', 'Drag'],
  ['.bbm-gallery, .site-gallery [class*="strip"]', 'Drag'],
  ['.site-menu__grid a, .home-craft-tile, .site-tiles a, .home-flavour, .treat-sig__grid a', 'Peek'],
];

export function CursorLabel() {
  const label = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = label.current;
    if (!el || !motionAllowed() || !finePointer()) return;
    const word = el.querySelector('span')!;
    const toX = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const toY = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
    let shown = '';
    const show = (text: string) => {
      if (text === shown) return;
      shown = text;
      if (text) word.textContent = text;
      gsap.to(el, {
        scale: text ? 1 : 0,
        rotate: text ? -8 : 20,
        duration: text ? 0.5 : 0.25,
        ease: text ? 'back.out(2.5)' : 'power2.in',
        overwrite: 'auto',
      });
    };
    const move = (e: PointerEvent) => {
      toX(e.clientX);
      toY(e.clientY);
      const target = e.target instanceof Element ? e.target : null;
      let text = '';
      for (const [selector, fallback] of CURSOR_WORDS) {
        const hit = target?.closest<HTMLElement>(selector);
        if (hit) {
          text = hit.dataset.cursor || fallback;
          break;
        }
      }
      show(text);
    };
    const hide = () => show('');
    gsap.set(el, { scale: 0, xPercent: -50, yPercent: -50, opacity: 1 });
    document.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    const offScroll = onScrollVelocity(() => {
      // While the page glides, the card under the label moves away: let it go until the mouse moves again
      if (shown) show('');
    });
    return () => {
      offScroll();
      document.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', hide);
    };
  }, []);
  return (
    <div ref={label} className="fx-cursor" aria-hidden="true">
      <span />
    </div>
  );
}
