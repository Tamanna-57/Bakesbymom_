import { useRef } from 'react';
import { Button, Card, Doodle, SectionHeading } from '@bakesbymom/ui';
import { whatsappLink } from '../content/bakery';
import { cakes } from '../content/catalog';
import { orderLink } from '../content/site';
import { qtyLabel, treatCategories } from '../content/treats';
import { ComboCollage, ShopCollage, StepCollage } from '../collage/scenes';
import { SectionEdge } from '../sections/blocks';
import { Layout } from './Layout';
import { Breadcrumbs, EgglessNote } from './order';

const customLink = whatsappLink("Hello Bakes by Mom! I'd like to plan a custom cake or box 🎂");

const STEPS = [
  {
    scene: 'message' as const,
    title: 'Message Mom',
    body: "Tell her the treat, how many and the day on WhatsApp. A day's notice helps, more for tiered cakes.",
  },
  {
    scene: 'bake' as const,
    title: 'Baked to order',
    body: 'Nothing is pre-made or pulled off a shelf. Your box is baked for you, eggless like everything else.',
  },
  {
    scene: 'box' as const,
    title: 'Boxed and tied',
    body: 'Pick it up from the kitchen in Panipat, or choose delivery and Mom sorts out the details with you.',
  },
];

interface ShelfItem {
  name: string;
  href: string;
  meta: string;
  /** One or two stickers (paths in public/collage); two stand side by side, as for the combos. */
  stickers: string[];
}

/** Every category with its die-cut sticker, cakes first. */
const shelf: ShelfItem[] = [
  {
    name: 'Cakes',
    href: '/catalog',
    meta: 'By occasion',
    stickers: ['sticker-drip-cake'],
  },
  ...treatCategories.map((category) => ({
    name: category.name,
    href: `/shop/${category.slug}`,
    meta: `From ${qtyLabel(category.minQty, category.unit)}`,
    stickers: (
      {
        brownies: ['sticker-brownies'],
        cookies: ['sticker-gift-box'],
        'jar-cakes': ['sticker-jar-cakes'],
        'dry-cakes': ['paint-teacake'],
        cupcakes: ['paint-cupcake'],
        'bento-cakes': ['sticker-bento'],
        combos: ['sticker-cherry-cake', 'paint-cupcake'],
      } as Record<string, string[]>
    )[category.slug] ?? ['paint-cupcake'],
  })),
];

/**
 * The categories as a shelf of white cards on a caramel panel, each with its bake as a die-cut sticker standing up
 * out of the top (after a dessert shop's "Explore our delicious taste" on Pinterest, in the site's palette and type).
 * The row scrolls sideways under a finger or with the arrows; the page itself scrolls as usual.
 */
function ShopShelf() {
  const row = useRef<HTMLUListElement>(null);
  const step = (dir: 1 | -1) => {
    const el = row.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: still ? 'auto' : 'smooth' });
  };
  return (
    <div className="shop-shelf">
      <svg className="shop-shelf__swirl" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20 150 C 180 40, 320 200, 520 110 S 860 20, 1000 120 S 1180 180, 1220 90" />
      </svg>
      <div className="shop-shelf__head">
        <SectionHeading
          level={2}
          align="start"
          title={
            <>
              Something for <em>every craving</em>
            </>
          }
        />
        <p className="shop-shelf__lead">
          Open one to see the bakes, the sizes and what they cost, then send your order to Mom.
        </p>
      </div>
      <div className="shop-shelf__stage">
        <button type="button" className="shop-shelf__arrow" aria-label="Previous categories" onClick={() => step(-1)}>
          ←
        </button>
        <ul ref={row} className="shop-shelf__row" aria-label="Cakes and treats">
          {shelf.map((item) => (
            <li key={item.href} className="shop-shelf__item">
              <article className="shop-shelf__card">
                <a className="shop-shelf__art" href={item.href} tabIndex={-1} aria-hidden="true">
                  {item.stickers.map((src, i) => (
                    <img
                      key={src}
                      className={`shop-shelf__sticker shop-shelf__sticker--${item.stickers.length > 1 ? i + 1 : 0}`}
                      src={`/collage/${src}.webp`}
                      alt=""
                      loading="lazy"
                      draggable={false}
                    />
                  ))}
                </a>
                <h3 className="shop-shelf__name">{item.name}</h3>
                <p className="shop-shelf__meta">
                  {item.href === '/catalog' && cakes.length ? `${cakes.length} cakes` : item.meta}
                </p>
                <Button size="sm" href={item.href} className="shop-shelf__cta">
                  Order {item.name === 'Cakes' ? 'a cake' : 'now'}
                </Button>
              </article>
            </li>
          ))}
        </ul>
        <button type="button" className="shop-shelf__arrow" aria-label="Next categories" onClick={() => step(1)}>
          →
        </button>
      </div>
    </div>
  );
}

/**
 * Cakes & Treats: the one place to order from. Every category, cakes first; each opens its own page (the cakes by
 * occasion, or a treat type), where you pick a bake, make it yours and send the order on WhatsApp. For anything not
 * on the menu, a custom order goes straight to Mom. Around the menu: an illustrated hero, how an order works, and
 * the combo.
 */
export function ShopPage() {
  return (
    <Layout path="/shop">
      <section className="site-section site-section--pink shop-hero">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cakes & Treats' }]} />
          <div className="shop-hero__grid">
            <div className="shop-hero__copy">
              <SectionHeading
                level={1}
                size="xl"
                eyebrow="order here"
                eyebrowStyle="pill"
                title={
                  <>
                    Cakes & <em>treats</em>
                  </>
                }
                description="Pick a category, choose a cake or a treat, make it yours, and send the order on WhatsApp. Cakes for every occasion, and brownies, cookies, jar cakes, tea cakes, cupcakes, bentos and combos by the box, all baked to order."
              />
              <div className="shop-hero__actions">
                <Button href="#menu">See the menu</Button>
                <Button variant="secondary" href={orderLink} target="_blank" rel="noreferrer">
                  Order on WhatsApp
                </Button>
              </div>
              <ul className="shop-hero__facts" aria-label="At a glance">
                <li>
                  <strong>{treatCategories.length + 1}</strong> categories
                </li>
                <li>
                  <strong>100%</strong> eggless
                </li>
                <li>
                  <strong>0</strong> days on a shelf
                </li>
              </ul>
            </div>
            <div className="shop-hero__art">
              <ShopCollage />
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="site-section site-section--edged site-section--beige">
        <SectionEdge color="var(--bbm-color-bg-beige)" shape="scallop" />
        <div className="site-container">
          <ShopShelf />
          <EgglessNote />
          <Card tone="beige" outline padding="md" className="shop-custom">
            <Doodle name="sparkle" size={40} color="var(--bbm-color-cherry-500)" />
            <div>
              <h2 className="shop-custom__title">Something of your own?</h2>
              <p>
                A theme, a photo, a size or a box that isn't on the menu: tell Mom the idea and the date, and she'll
                plan it with you.
              </p>
            </div>
            <Button href={customLink} target="_blank" rel="noreferrer">
              Plan a custom order
            </Button>
          </Card>
        </div>
      </section>

      <section
        className="site-section site-section--edged site-section--blue shop-steps"
        aria-labelledby="shop-steps-title"
      >
        <SectionEdge color="var(--bbm-color-bg-blue)" shape="wave" />
        <div className="site-container">
          <SectionHeading
            id="shop-steps-title"
            align="center"
            eyebrow="how it works"
            eyebrowStyle="pill"
            title={
              <>
                From a message <em>to a ribbon</em>
              </>
            }
          />
          <ol className="shop-steps__list">
            {STEPS.map((step, i) => (
              <li key={step.scene} className="shop-step">
                <div className="shop-step__art">
                  <StepCollage step={step.scene} />
                </div>
                <p className="shop-step__num" aria-hidden="true">
                  0{i + 1}
                </p>
                <h3 className="shop-step__title">{step.title}</h3>
                <p className="shop-step__body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="site-section site-section--edged site-section--cocoa shop-combo">
        <SectionEdge color="var(--bbm-color-bg-inverse)" shape="scallop" />
        <div className="site-container">
          <div className="shop-combo__art">
            <ComboCollage />
          </div>
          <div className="shop-combo__copy">
            <p className="shop-combo__kicker">can't pick one?</p>
            <h2 className="shop-combo__title">
              Make it a <em>combo</em>
            </h2>
            <p>
              A cake and a set of cupcakes iced to match, in one box. Tell Mom the occasion and the colours, she'll do
              the rest.
            </p>
            <div className="shop-hero__actions">
              <Button href="/shop/combos">See the combos</Button>
              <Button variant="ghost" href={orderLink} target="_blank" rel="noreferrer" className="shop-combo__ghost">
                Ask Mom on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
