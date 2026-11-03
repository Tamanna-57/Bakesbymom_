/**
 * Our story, short, after three references:
 * - a letter from Mom on linen paper with red-and-olive flourishes, a script title, little photo squares,
 *   postage stamps and a wax seal (the "Dawning Drift" tri-fold flyer);
 * - her cakes as die-cut stickers on a silver tray over pink polka dots, with a lettered key in an oval
 *   on blue pinstripes (the "Sweet Rise Surprises" poster);
 * - her promises as a menu card on a red gingham border, with hairline rules and stickers for pictures
 *   (the "desserts & Pastries" menu).
 * The watercolour stickers are Mom's own cakes (and two stock bakes), painted from their cut-out photos by
 * python scripts/collage.py watercolour.
 */
import { Button, Doodle } from '@bakesbymom/ui';
import { bakery } from '../content/bakery';
import { orderLink } from '../content/site';
import './story.css';

const external = { target: '_blank', rel: 'noreferrer' } as const;
const town = bakery.place.split(',')[0];

/* Ornaments --------------------------------------------------------------- */

/** An art-nouveau corner, stitched in cherry with an olive echo (the flyer's frame). */
function Flourish({ className }: { className: string }) {
  return (
    <svg className={`story-flourish ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <g className="story-flourish__red">
        <path d="M10 64C10 28 26 10 62 10c34 0 58 12 88 8 20-3 34-9 46-14" />
        <path d="M62 10C40 22 38 46 56 51c14 3 20-12 10-18-8-4-14 4-8 8" />
        <path d="M10 64c4 40-4 80-6 132" />
        <path d="M10 64c12-18 34-20 38-4 3 12-10 16-14 8" />
        <path d="M112 15c8 14 26 16 30 6 3-8-6-12-10-6" />
        <path d="M8 122c14 4 20 20 12 28-6 6-14-2-8-8" />
      </g>
      <g className="story-flourish__olive">
        <path d="M22 76c2-32 18-48 50-50 30-2 54 8 92 4" />
        <path d="M22 76c4 38-2 74-4 112" />
        <path d="M150 30c12-14 30-12 40-4-14 10-28 10-40 4z" />
        <path d="M24 150c-14 10-14 28-6 38 8-12 10-26 6-38z" />
      </g>
    </svg>
  );
}

/** The flyer's four-point sparkle. */
function Sparkle({ className }: { className: string }) {
  return (
    <svg className={`story-sparkle ${className}`} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 0c1.4 11 5 16.6 20 20-15 3.4-18.6 9-20 20-1.4-11-5-16.6-20-20C15 16.6 18.6 11 20 0z" />
    </svg>
  );
}

/* 1. The letter ---------------------------------------------------------- */

export function StoryLetter() {
  return (
    <section className="story-letter" aria-labelledby="story-title">
      <Flourish className="story-flourish--tl" />
      <Flourish className="story-flourish--tr" />
      <Flourish className="story-flourish--bl" />
      <Flourish className="story-flourish--br" />
      <Sparkle className="story-sparkle--a" />
      <Sparkle className="story-sparkle--b" />
      <Sparkle className="story-sparkle--c" />

      <div className="story-letter__head">
        <img className="story-photo story-photo--a" src="/photos/restaged/mom-flowerpot.jpg" alt="" />
        <img className="story-photo story-photo--b" src="/photos/restaged/bride-to-be.jpg" alt="" />
        <img className="story-photo story-photo--c" src="/photos/restaged/anniversary-maroon.jpg" alt="" />
        <h1 id="story-title" className="story-letter__title">
          <span className="story-letter__script">Our Story</span>
          <span className="story-letter__outline">from Mom&rsquo;s kitchen</span>
        </h1>
        <p className="story-letter__place">{bakery.place}</p>
      </div>

      <div className="story-letter__envelope">
        <img className="story-letter__sticker" src="/collage/wc-heart.webp" alt="" />
        <article className="story-letter__card">
          <span className="story-stamp story-stamp--a">
            <img src="/photos/restaged/mom-photo-clothesline.jpg" alt="" />
          </span>
          <span className="story-stamp story-stamp--b">
            <img src="/photos/restaged/engaged-hands.jpg" alt="" />
          </span>
          <div className="story-letter__text">
            <p className="story-letter__dear">Dear you,</p>
            <p>
              I never set out to run a bakery. I baked for the people I love: a birthday cake here, a tray of brownies
              there, and the kitchen quietly learned my hands.
            </p>
            <p>
              One order became two, two became a weekend booked out. Every cake is still eggless, baked to order and
              finished by hand, right here in {town}.
            </p>
            <p className="story-letter__sign">with love, Mom</p>
          </div>
          <div className="story-letter__art">
            <div className="story-heart">
              <img
                src="/photos/restaged/mom-butterfly.jpg"
                alt="A white HBD Mom cake with pink roses and butterflies"
              />
              <svg viewBox="0 0 100 90" aria-hidden="true">
                <path d="M50 87C20 66 3 48 3 28 3 13 14 3 28 3c10 0 18 6 22 14 4-8 12-14 22-14 14 0 25 10 25 25 0 20-17 38-47 59z" />
              </svg>
            </div>
            <span className="story-seal" aria-hidden="true">
              M
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}

/* 2. The tray ------------------------------------------------------------- */

const tray = [
  { key: 'A', sticker: 'wc-papa', name: 'Super Dad', who: 'for Papa' },
  { key: 'B', sticker: 'wc-yatharth', name: 'Spider-Man', who: 'for Yatharth' },
  { key: 'C', sticker: 'wc-maa', name: 'Angel wings', who: 'for Maa' },
  { key: 'D', sticker: 'wc-janmashtami', name: 'Little Krishna', who: 'for Janmashtami' },
  { key: 'E', sticker: 'wc-teacher', name: 'Yellow roses', who: "for Teacher's Day" },
  { key: 'F', sticker: 'wc-wifey', name: 'A portrait', who: 'for a wife' },
];
const TILT = [-4, 3, -2, 4, -3, 2];

/** Sprinkles on the paper: [left %, top %, turn, colour]. */
const SPRINKLES: [number, number, number, string][] = [
  [8, 6, 30, 'pink'],
  [30, 3, -20, 'blue'],
  [55, 8, 60, 'butter'],
  [76, 4, 10, 'pink'],
  [94, 18, -40, 'blue'],
  [20, 47, 80, 'butter'],
  [48, 50, -30, 'pink'],
  [72, 46, 20, 'blue'],
  [96, 62, 70, 'butter'],
  [4, 86, -10, 'blue'],
  [34, 94, 40, 'pink'],
  [62, 92, -60, 'butter'],
  [86, 95, 15, 'pink'],
];

export function StoryTray() {
  return (
    <section className="story-tray" aria-labelledby="tray-title">
      <div className="story-tray__top">
        <h2 id="tray-title" className="story-tray__title">
          <svg viewBox="0 0 1000 230" role="img" aria-label="Every cake has a name">
            <path id="story-tray-arc" d="M40 215Q500 15 960 215" fill="none" />
            <text>
              <textPath href="#story-tray-arc" startOffset="50%" textAnchor="middle">
                Every cake has a name
              </textPath>
            </text>
          </svg>
        </h2>
        <div className="story-tray__tray">
          <div className="story-tray__paper">
            {SPRINKLES.map(([x, y, r, tone]) => (
              <span
                key={`${x}-${y}`}
                className={`story-tray__sprinkle story-tray__sprinkle--${tone}`}
                style={{ left: `${x}%`, top: `${y}%`, rotate: `${r}deg` }}
                aria-hidden="true"
              />
            ))}
            <ul className="story-tray__cakes">
              {tray.map((cake, i) => (
                <li key={cake.key} style={{ rotate: `${TILT[i]}deg` }}>
                  <img src={`/collage/${cake.sticker}.webp`} alt={`${cake.name} cake, ${cake.who}`} loading="lazy" />
                  <span className="story-tray__key" aria-hidden="true">
                    {cake.key}.
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="story-tray__bottom">
        <div className="story-tray__oval">
          <svg className="story-tray__ask" viewBox="0 0 800 110" aria-hidden="true">
            <path id="story-oval-arc" d="M60 100Q400 0 740 100" fill="none" />
            <text>
              <textPath href="#story-oval-arc" startOffset="50%" textAnchor="middle">
                Who Mom baked them for
              </textPath>
            </text>
          </svg>
          <ol className="story-tray__list" aria-label="Who Mom baked them for">
            {tray.map((cake) => (
              <li key={cake.key}>
                <span aria-hidden="true">{cake.key}.</span> {cake.name}, {cake.who}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* 3. The menu card ---------------------------------------------------------- */

const promises = [
  {
    heading: 'In every cake',
    rows: [
      ['Eggs', 'never, ever'],
      ['Baked', 'to order'],
      ['Iced', 'by hand'],
    ],
  },
  {
    heading: 'To order',
    rows: [
      ['WhatsApp', bakery.whatsappDisplay],
      ['Notice', 'a day ahead'],
      ['Pickup', town],
    ],
  },
];

export function StoryMenu() {
  return (
    <section className="story-menu" aria-labelledby="menu-title">
      <div className="story-menu__card">
        <img className="story-menu__art story-menu__art--a" src="/collage/wc-cherry-cake.webp" alt="" />
        <img className="story-menu__art story-menu__art--b" src="/collage/wc-jar-cakes.webp" alt="" />
        <span className="story-menu__doodle story-menu__doodle--a" aria-hidden="true">
          <Doodle name="star" size={30} color="var(--bbm-color-cherry-600)" />
        </span>
        <span className="story-menu__doodle story-menu__doodle--b" aria-hidden="true">
          <Doodle name="heart" size={26} color="var(--bbm-color-cherry-400)" />
        </span>
        <span className="story-menu__doodle story-menu__doodle--c" aria-hidden="true">
          <Doodle name="sparkle" size={28} color="var(--bbm-color-cherry-600)" />
        </span>

        <h2 id="menu-title" className="story-menu__title">
          <span className="story-menu__script">Mom&rsquo;s</span>
          <span className="story-menu__caps">Promises</span>
        </h2>
        {promises.map((group) => (
          <div key={group.heading} className="story-menu__group">
            <h3>{group.heading}</h3>
            <dl>
              {group.rows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
        <div className="story-menu__action">
          <Button href={orderLink} {...external}>
            Order on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
