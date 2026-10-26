import { useEffect, useId, useRef, type CSSProperties, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export interface OrbitImage {
  src: string;
  /** Describe the photo, or pass "" for a decorative one. */
  alt: string;
}

export interface OrbitProps extends HTMLAttributes<HTMLDivElement> {
  /** The big center photo. */
  center: OrbitImage;
  /** Up to six small photos placed along the orbit. */
  satellites?: OrbitImage[];
  /** A sentence set on an arc above the center photo. */
  arcText?: string;
  /**
   * Sets the satellites circling the center, passing behind and in front of it. They can be dragged and
   * flung, and the layers lean toward the pointer. Off (a still layout) when the visitor asks for reduced motion.
   */
  animate?: boolean;
  /** Seconds for one trip around the orbit. */
  period?: number;
}

// Layout in a 1000 × 625 box: the center circle, the orbit ellipse and the arc above.
const W = 1000;
const H = 625;
const CX = 500;
const CY = 340;
const R = 225;
const ORBIT = { cx: 500, cy: 360, rx: 470, ry: 120, tilt: -6 };
// The faint outer ring the two moons ride on.
const HALO = { ...ORBIT, rx: 500, ry: 150 };
// Angles (degrees) and diameters for each satellite, uneven on purpose like pin 01.
const SLOTS = [
  { t: 168, d: 132 },
  { t: 205, d: 92 },
  { t: 140, d: 74 },
  { t: 12, d: 124 },
  { t: -22, d: 84 },
  { t: 42, d: 66 },
];
// Two little moons on the outer ring, running the other way.
const MOONS = [
  { t: 250, d: 18, speed: -1.7 },
  { t: 70, d: 12, speed: -1.3 },
];

type Ellipse = typeof ORBIT;

function onEllipse(e: Ellipse, deg: number) {
  const t = (deg * Math.PI) / 180;
  const phi = (e.tilt * Math.PI) / 180;
  const x = e.cx + e.rx * Math.cos(t) * Math.cos(phi) - e.ry * Math.sin(t) * Math.sin(phi);
  const y = e.cy + e.rx * Math.cos(t) * Math.sin(phi) + e.ry * Math.sin(t) * Math.cos(phi);
  // Lower half of the ellipse is nearer the viewer: 1 at the very front, -1 at the very back.
  return { x, y, depth: Math.sin(t) };
}

/** The half of an ellipse that runs behind (`back`) or in front of the center. */
function half(e: Ellipse, side: 'back' | 'front') {
  const a = onEllipse(e, 0);
  const b = onEllipse(e, 180);
  return `M${a.x} ${a.y} A${e.rx} ${e.ry} ${e.tilt} 0 ${side === 'front' ? 1 : 0} ${b.x} ${b.y}`;
}

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/** Places a body at its spot on the orbit for a given turn of the whole system. */
function place(el: HTMLElement, e: Ellipse, deg: number, d: number, scalePx: number) {
  const { x, y, depth } = onEllipse(e, deg);
  const near = (depth + 1) / 2;
  const size = d * scalePx;
  el.style.transform = `translate3d(${(x * scalePx - size / 2).toFixed(2)}px, ${(y * scalePx - size / 2).toFixed(2)}px, 0) scale(${(0.72 + 0.28 * near).toFixed(3)})`;
  el.style.zIndex = depth > 0 ? '5' : '1';
  el.style.setProperty('--_near', near.toFixed(3));
}

/**
 * The orbit showcase from pin 01: a center photo with a sentence on an arc,
 * a tilted orbit line and small photos of different sizes sitting on it, circling like Saturn's moons.
 */
export function Orbit({
  center,
  satellites = [],
  arcText,
  animate = true,
  period = 48,
  className,
  ...rest
}: OrbitProps) {
  const arcId = `bbm-orbit-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const arcR = R + 34;
  const root = useRef<HTMLDivElement>(null);
  const bodies = useRef<Array<HTMLElement | null>>([]);
  const moons = useRef<Array<HTMLElement | null>>([]);
  const shown = satellites.slice(0, SLOTS.length);

  useEffect(() => {
    const el = root.current;
    if (!el || !animate) return;
    // Stay still for reduced motion, and where the browser APIs it needs are missing (tests, old browsers).
    if (!window.matchMedia || !window.ResizeObserver || !window.IntersectionObserver) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.add('bbm-orbit--live');

    const cruise = 360 / period; // degrees per second when left alone
    let turn = 0; // how far the whole system has turned, in degrees
    let velocity = cruise;
    let hover = false;
    let visible = true;
    let scalePx = el.clientWidth / W;
    let last = performance.now();
    let frame = 0;
    let drag: { x: number; turn: number; t: number; lastX: number } | null = null;
    // Pointer position over the orbit, -1 to 1, eased toward its target each frame.
    const lean = { x: 0, y: 0, tx: 0, ty: 0 };

    const draw = () => {
      shown.forEach((_, i) => {
        const body = bodies.current[i];
        if (body) place(body, ORBIT, SLOTS[i]!.t + turn, SLOTS[i]!.d, scalePx);
      });
      MOONS.forEach((moon, i) => {
        const body = moons.current[i];
        if (body) place(body, HALO, moon.t + turn * moon.speed, moon.d, scalePx);
      });
      el.style.setProperty('--_lean-x', lean.x.toFixed(3));
      el.style.setProperty('--_lean-y', lean.y.toFixed(3));
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!drag) {
        // Ease back to a slow cruise (slower still under the pointer) after a fling.
        const target = hover ? cruise * 0.25 : cruise;
        velocity += (target - velocity) * Math.min(1, dt * 1.6);
        turn += velocity * dt;
      }
      lean.x += (lean.tx - lean.x) * Math.min(1, dt * 4);
      lean.y += (lean.ty - lean.y) * Math.min(1, dt * 4);
      draw();
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      hover = true;
    };
    const onLeave = () => {
      hover = false;
      lean.tx = 0;
      lean.ty = 0;
    };
    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      lean.tx = ((event.clientX - box.left) / box.width) * 2 - 1;
      lean.ty = ((event.clientY - box.top) / box.height) * 2 - 1;
      if (!drag) return;
      // A drag across the full width turns the system half way round.
      const now = performance.now();
      const dx = event.clientX - drag.lastX;
      turn = drag.turn + ((event.clientX - drag.x) / box.width) * 180;
      const dt = Math.max((now - drag.t) / 1000, 0.001);
      velocity = ((dx / box.width) * 180) / dt;
      drag.t = now;
      drag.lastX = event.clientX;
    };
    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      drag = { x: event.clientX, turn, t: performance.now(), lastX: event.clientX };
      el.classList.add('bbm-orbit--dragging');
    };
    const onUp = () => {
      if (!drag) return;
      drag = null;
      // Keep the fling, within reason.
      velocity = Math.max(-720, Math.min(720, velocity));
      el.classList.remove('bbm-orbit--dragging');
    };

    const resize = new ResizeObserver(() => {
      scalePx = el.clientWidth / W;
      draw();
    });
    resize.observe(el);
    // Only spin while it's on screen.
    const seen = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible) start();
    });
    seen.observe(el);

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    draw();
    start();

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      seen.disconnect();
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      el.classList.remove('bbm-orbit--live', 'bbm-orbit--dragging');
    };
  }, [animate, period, shown.length]);

  return (
    <div {...rest} ref={root} className={cx('bbm-orbit', className)}>
      <svg
        className="bbm-orbit__lines bbm-orbit__lines--back"
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden="true"
        focusable="false"
      >
        <path className="bbm-orbit__halo" d={half(HALO, 'back')} />
        <path className="bbm-orbit__path" d={half(ORBIT, 'back')} />
      </svg>
      <div className="bbm-orbit__planet" style={{ left: pct(CX - R, W), top: pct(CY - R, H), width: pct(R * 2, W) }}>
        <img className="bbm-orbit__center" src={center.src} alt={center.alt} loading="lazy" draggable={false} />
      </div>
      {arcText && (
        <svg className="bbm-orbit__arc" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
          <path id={arcId} d={`M${CX - arcR} ${CY} A${arcR} ${arcR} 0 0 1 ${CX + arcR} ${CY}`} fill="none" />
          <text className="bbm-orbit__arc-text">
            <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
              {arcText}
            </textPath>
          </text>
        </svg>
      )}
      {arcText && <p className="bbm-visually-hidden">{arcText}</p>}
      <svg
        className="bbm-orbit__lines bbm-orbit__lines--front"
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden="true"
        focusable="false"
      >
        <path className="bbm-orbit__halo" d={half(HALO, 'front')} />
        <path className="bbm-orbit__path" d={half(ORBIT, 'front')} />
      </svg>
      {MOONS.map((moon, i) => {
        const { x, y } = onEllipse(HALO, moon.t);
        return (
          <span
            key={`moon-${i}`}
            ref={(node) => {
              moons.current[i] = node;
            }}
            className="bbm-orbit__moon"
            aria-hidden="true"
            style={{ left: pct(x - moon.d / 2, W), top: pct(y - moon.d / 2, H), width: pct(moon.d, W) }}
          />
        );
      })}
      {shown.map((image, i) => {
        const slot = SLOTS[i]!;
        const { x, y, depth } = onEllipse(ORBIT, slot.t);
        return (
          <span
            key={i}
            ref={(node) => {
              bodies.current[i] = node;
            }}
            className="bbm-orbit__satellite"
            data-slot={i + 1}
            style={
              {
                left: pct(x - slot.d / 2, W),
                top: pct(y - slot.d / 2, H),
                width: pct(slot.d, W),
                zIndex: depth > 0 ? 5 : 1,
              } as CSSProperties
            }
          >
            <img src={image.src} alt={image.alt} loading="lazy" draggable={false} />
            {image.alt && (
              <span className="bbm-orbit__label" aria-hidden="true">
                {image.alt}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
