import { useEffect, useState, type CSSProperties } from 'react';
import './intro.css';

// The home page opens on "Bakes by Mom" written across a cream screen. After a beat, bands in the palette's
// colours sweep up from the bottom, carry the name away and uncover the page (after the Sweet Tape site's intro).

/** The bands, top to bottom: cherry, pink frosting, caramel and latte from the cocoa scale, then the hero's blues. */
const BANDS = ['cherry-500', 'pink-300', 'brown-400', 'brown-200', 'blue-200', 'blue-700'];

const WRITE_MS = 1000; // the name writes in, left to right
const HOLD_MS = 700; // then rests before the sweep
const SWEEP_MS = 1400;

/** The class on <html> that holds the hero's entrance until the bands uncover it (home.css). */
const HOLD_CLASS = 'bbm-intro-on';

/** Plays on a fresh load of the home page, unless the visitor asks for reduced motion or a link points at a section. */
export function shouldPlayIntro(path: string) {
  if (path !== '/' || window.location.hash) return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

type Stage = 'waiting' | 'writing' | 'sweeping';

export function Intro({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<Stage>('waiting');

  // index.html keeps the page hidden until its fonts arrive; start writing once it shows.
  useEffect(() => {
    const root = document.documentElement;
    const start = () => setStage((s) => (s === 'waiting' ? 'writing' : s));
    if (!root.classList.contains('fonts-pending')) {
      start();
      return;
    }
    const observer = new MutationObserver(() => {
      if (root.classList.contains('fonts-pending')) return;
      observer.disconnect();
      start();
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (stage !== 'writing') return;
    const timer = window.setTimeout(() => setStage('sweeping'), WRITE_MS + HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [stage]);

  // A click, tap, key or scroll skips ahead to the sweep. Scrolling is held until the page is uncovered.
  useEffect(() => {
    const skip = () => setStage('sweeping');
    const hold = (event: Event) => {
      event.preventDefault();
      event.stopImmediatePropagation(); // keeps Lenis from scrolling the page underneath
      skip();
    };
    const options = { capture: true, passive: false };
    window.addEventListener('pointerdown', skip, true);
    window.addEventListener('keydown', skip, true);
    window.addEventListener('wheel', hold, options);
    window.addEventListener('touchmove', hold, options);
    return () => {
      window.removeEventListener('pointerdown', skip, true);
      window.removeEventListener('keydown', skip, true);
      window.removeEventListener('wheel', hold, options);
      window.removeEventListener('touchmove', hold, options);
    };
  }, []);

  // Hold the hero's entrance, then let it play as the last band clears it.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add(HOLD_CLASS);
    return () => root.classList.remove(HOLD_CLASS);
  }, []);

  useEffect(() => {
    if (stage !== 'sweeping') return;
    const reveal = window.setTimeout(() => document.documentElement.classList.remove(HOLD_CLASS), SWEEP_MS * 0.5);
    // In case animationend never arrives (an interrupted animation), finish anyway.
    const fallback = window.setTimeout(onDone, SWEEP_MS + 500);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(fallback);
    };
  }, [stage, onDone]);

  return (
    <div
      className={`bbm-intro is-${stage}`}
      aria-hidden="true"
      style={{ '--intro-write': `${WRITE_MS}ms`, '--intro-sweep': `${SWEEP_MS}ms` } as CSSProperties}
    >
      <div
        className="bbm-intro__track"
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) onDone();
        }}
      >
        <div className="bbm-intro__screen" style={{ zIndex: BANDS.length + 1 }}>
          <p className="bbm-intro__name">Bakes by Mom</p>
        </div>
        {BANDS.map((color, i) => (
          <div
            key={color}
            className="bbm-intro__band"
            style={{ '--band': `var(--bbm-color-${color})`, zIndex: BANDS.length - i } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
