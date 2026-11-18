/**
 * Our story, short, after three references:
 * - a letter from Mom on linen paper with red-and-olive flourishes, a script title, little photo squares,
 *   postage stamps and a wax seal (the "Dawning Drift" tri-fold flyer);
 * - painted dessert stickers on a silver tray over pink polka dots, with a lettered key in an oval on
 *   blue pinstripes (the "Sweet Rise Surprises" poster);
 * - her promises as a menu card on a red gingham border, with hairline rules and stickers for pictures
 *   (the "desserts & Pastries" menu).
 * The painted stickers (public/collage/paint-*.webp) are original art generated in Canva Dream Lab.
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

/** The flyer's thin eight-point sparkle: four long rays and four short ones. */
function Sparkle({ className }: { className: string }) {
  return (
    <svg className={`story-sparkle ${className}`} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 0l1.6 15.2L31 9l-6.2 9.4L40 20l-15.2 1.6L31 31l-9.4-6.2L20 40l-1.6-15.2L9 31l6.2-9.4L0 20l15.2-1.6L9 9l9.4 6.2z" />
    </svg>
  );
}

/** A puffy paper cloud, cut out like a sticker, for the title to sit on (the flyer's "Dawning"). */
function Cloud() {
  return (
    <svg className="story-cloud" viewBox="0 0 600 230" preserveAspectRatio="none" aria-hidden="true">
      <path d="M70 152C18 150 12 92 58 86 46 40 108 18 142 46c22-36 92-40 114-6 30-34 104-34 124 4 30-30 100-26 110 20 56-10 98 36 64 78 34 30-10 72-56 58-22 30-90 30-110 6-30 26-98 26-118 2-30 24-96 24-116 0-36 22-96 8-88-46z" />
      <path
        className="story-cloud__stitch"
        d="M84 146C42 144 38 100 72 96 62 58 112 40 142 62c22-30 84-32 106-2 28-28 94-28 114 4 28-24 88-20 98 18 48-6 82 30 54 64 28 24-8 56-46 44-20 24-80 24-98 4-28 22-88 22-106 2-28 20-86 20-104 0-32 18-84 6-76-40z"
      />
    </svg>
  );
}

/** An olive swash either side of the outlined words. */
function Swash({ flip = false }: { flip?: boolean }) {
  return (
    <svg className={`story-swash${flip ? ' story-swash--flip' : ''}`} viewBox="0 0 90 40" aria-hidden="true">
      <path d="M88 22C70 22 58 30 44 30 30 30 26 18 34 13c8-5 16 3 10 9-6 6-20 4-28-2C10 15 6 9 2 4" />
      <path d="M60 25c-4-8-12-10-16-6" />
    </svg>
  );
}

/** A little curl, for the line under the title. */
function Curl({ flip = false }: { flip?: boolean }) {
  return (
    <svg className={`story-curl${flip ? ' story-curl--flip' : ''}`} viewBox="0 0 48 16" aria-hidden="true">
      <path d="M47 8H22C14 8 8 4 10 1c2-2 6 0 5 3-1 4-7 6-11 4" />
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
      <Sparkle className="story-sparkle--d" />

      <div className="story-letter__head">
        <img className="story-photo story-photo--a" src="/photos/restaged/mom-flowerpot.jpg" alt="" />
        <img className="story-photo story-photo--b" src="/photos/restaged/bride-to-be.jpg" alt="" />
        <img className="story-photo story-photo--c" src="/photos/restaged/anniversary-maroon.jpg" alt="" />
        <h1 id="story-title" className="story-letter__title">
          <Cloud />
          <span className="story-letter__script">Our Story</span>
          <span className="story-letter__outline">
            <Swash />
            from Mom&rsquo;s kitchen
            <Swash flip />
          </span>
        </h1>
        <p className="story-letter__place">
          <Curl />
          {bakery.place}
          <Curl flip />
        </p>
        <p className="story-letter__since">~ eggless &middot; baked to order ~</p>
      </div>

      <div className="story-letter__envelope">
        <img className="story-letter__sticker" src="/collage/paint-cupcake.webp" alt="" />
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
  { key: 'A', sticker: 'paint-teacake', name: 'Vanilla tea cake', note: 'a strawberry on top' },
  { key: 'B', sticker: 'paint-cherry-slice', name: 'Chocolate cherry cake', note: 'by the slice' },
  { key: 'C', sticker: 'paint-shortcake', name: 'Strawberry cream cake', note: 'layered by hand' },
  { key: 'D', sticker: 'paint-jar-cake', name: 'Jar cakes', note: 'tied with a bow' },
  { key: 'E', sticker: 'paint-cupcake', name: 'Cupcakes', note: 'a cherry on each' },
];
const TILT = [-4, 3, -3, 4, -2];

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
          <svg viewBox="0 0 1000 230" role="img" aria-label="Fresh from Mom's oven">
            <path id="story-tray-arc" d="M40 215Q500 15 960 215" fill="none" />
            <text>
              <textPath href="#story-tray-arc" startOffset="50%" textAnchor="middle">
                Fresh from Mom&rsquo;s oven
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
                  <img src={`/collage/${cake.sticker}.webp`} alt={`${cake.name}, ${cake.note}`} loading="lazy" />
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
                What&rsquo;s on the tray today?
              </textPath>
            </text>
          </svg>
          <ol className="story-tray__list" aria-label="What's on the tray today?">
            {tray.map((cake) => (
              <li key={cake.key}>
                <span aria-hidden="true">{cake.key}.</span> {cake.name}, {cake.note}
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
        <img className="story-menu__art story-menu__art--a" src="/collage/paint-shortcake.webp" alt="" />
        <img className="story-menu__art story-menu__art--b" src="/collage/paint-jar-cake.webp" alt="" />
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
