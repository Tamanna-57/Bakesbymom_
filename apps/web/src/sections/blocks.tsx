/**
 * Page sections, built only from library components and filled with the bakery's real content
 * (src/content). The website assembles them into pages; Storybook's Sections stories show the same files.
 */
import { useState, type ReactNode } from 'react';
import {
  Accordion,
  Badge,
  Button,
  Card,
  ChatWidget,
  Doodle,
  EdgeDivider,
  FilterChips,
  Gallery,
  Marquee,
  NewsletterSignup,
  Orbit,
  PatternSurface,
  Polaroid,
  PriceTag,
  PricingCard,
  ProductCard,
  ReviewCard,
  Seal,
  SectionHeading,
  SiteFooter,
  StepList,
  Ticket,
  WeekSchedule,
  type ChatMessage,
  type DoodleName,
  type EdgeShape,
  type GalleryItem,
  type HeadingLevel,
} from '@bakesbymom/ui';
import { art, stock, treatArt } from '../content';
import { answer, starterChips, type Answer } from '../content/assistant';
import { bakery, chefsPicks, giftAddons, inr, kgLabel, mostOrdered, timeSlots, whatsappLink } from '../content/bakery';
import { cakes, catalogStatus, findCake, occasions, type Cake } from '../content/catalog';
import { journalPosts, scheduleDays } from '../content/samples';
import {
  faqItems,
  footerBottom,
  footerColumns,
  footerContact,
  footerSocials,
  howToOrder,
  orderLink,
  reviews,
} from '../content/site';
import { treatCategories } from '../content/treats';
import './sections.css';

/**
 * Scallops or waves along the top of a section, in the section's own color, rising into the one above.
 * Sections sit flush, so the page reads as one run of colored bands with no bare background between them.
 */
export function SectionEdge({ color, shape = 'scallop' }: { color: string; shape?: EdgeShape }) {
  return <EdgeDivider className="site-edge" shape={shape} color={color} flip outline size="md" />;
}

const Band = ({
  children,
  className,
  id,
  edge,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /** The color of this band, to draw its top edge (see SectionEdge). */
  edge?: { color: string; shape?: EdgeShape };
}) => (
  <section id={id} className={['site-section', edge && 'site-section--edged', className].filter(Boolean).join(' ')}>
    {edge && <SectionEdge {...edge} />}
    <div className="site-container">{children}</div>
  </section>
);

const TONES = ['pink', 'blue', 'beige', 'butter'] as const;
const external = { target: '_blank', rel: 'noreferrer' } as const;

/** Most-ordered first, then the chef's picks, then the rest of the catalog. */
const featured = () =>
  [
    ...mostOrdered,
    ...chefsPicks,
    ...cakes.map((cake) => cake.slug).filter((slug) => !mostOrdered.includes(slug) && !chefsPicks.includes(slug)),
  ]
    .map(findCake)
    .filter(Boolean) as Cake[];

/* Marquee (pin 02) -------------------------------------------------- */

export function DoubleRibbon() {
  return (
    <Marquee
      rows={2}
      caps={false}
      label="About the bakery"
      items={['Baked to order', '100% eggless', "Made in Mom's kitchen", bakery.place]}
      separator={<Doodle name="heart" size="0.95em" />}
    />
  );
}

/* Cakes by occasion (pin 16 menu cards, filters from pin 13) ---------- */

export function CakeCard({
  cake,
  index = 0,
  headingLevel = 3,
  flavour,
}: {
  cake: Cake;
  index?: number;
  headingLevel?: HeadingLevel;
  /** A flavour slug: the cake's page opens with that flavour picked. */
  flavour?: string;
}) {
  return (
    <ProductCard
      as="div"
      variant="menu"
      className={cake.photos[0]?.backdrop ? 'site-cake-card site-cake-card--backdrop' : 'site-cake-card'}
      name={cake.name}
      image={{ src: cake.photos[0]?.thumb ?? art.strawberryCake, alt: '' }}
      description={cake.description}
      price={inr(cake.price)}
      href={flavour ? `/catalog/${cake.slug}?flavour=${flavour}` : `/catalog/${cake.slug}`}
      tone={TONES[index % TONES.length]}
      headingLevel={headingLevel}
      badge={
        <span className="site-cake-card__badges">
          <Badge tone="beige" variant="solid" size="sm">
            {kgLabel(cake.weightKg)}
          </Badge>
          {mostOrdered.includes(cake.slug) && (
            <Badge tone="cherry" variant="solid" size="sm">
              Most ordered
            </Badge>
          )}
        </span>
      }
    />
  );
}

export const occasionOptions = () => [
  { value: 'all', label: 'All' },
  ...occasions.map((occasion) => ({ value: occasion.slug, label: occasion.name })),
];

/** What a cake shelf says before the catalog arrives, or if it couldn't be loaded. */
export function CatalogNote() {
  const status = catalogStatus();
  if (status === 'ready') return null;
  return (
    <p className="site-center" role="status">
      {status === 'loading'
        ? 'Bringing the cakes out of the kitchen…'
        : "The cakes didn't load. Please refresh the page, or ask Mom on WhatsApp."}
    </p>
  );
}

/** The cake shelf, filterable by occasion. On the home page it shows the first few with a link to the rest. */
export function MenuSection({ level = 2, limit }: { level?: 1 | 2; limit?: number }) {
  const [filter, setFilter] = useState<string[]>(['all']);
  const slug = filter[0] ?? 'all';
  const list = slug === 'all' ? featured() : cakes.filter((cake) => cake.occasion === slug);
  const shown = limit ? list.slice(0, limit) : list;
  return (
    <Band id="cakes" className="site-section--blue">
      <SectionHeading variant="ribbon" level={level} title="Cakes" ribbonText="baked to order" />
      <div className="site-menu__filters">
        <FilterChips label="Filter cakes by occasion" options={occasionOptions()} value={filter} onChange={setFilter} />
        <p className="bbm-visually-hidden" aria-live="polite">
          Showing {shown.length} of {list.length} cakes
        </p>
      </div>
      <CatalogNote />
      <ul className="site-menu__grid">
        {shown.map((cake, i) => (
          <li key={cake.slug}>
            <CakeCard cake={cake} index={i} headingLevel={level === 1 ? 2 : 3} />
          </li>
        ))}
      </ul>
      {limit && list.length > shown.length && (
        <div className="site-center">
          <Button size="lg" variant="secondary" href={slug === 'all' ? '/catalog' : `/catalog?occasion=${slug}`}>
            See all {list.length} cakes
          </Button>
        </div>
      )}
      <p className="site-menu__note">
        <span className="site-veg-dot" aria-hidden="true" />
        Everything is 100% eggless. Prices are for the listed weight, and Mom confirms on WhatsApp.
      </p>
    </Band>
  );
}

/** Cherry tiles for every kind of bake (pin 16). */
export function CategoryTiles() {
  const tiles = [
    { label: 'Cakes', href: '/catalog', image: stock.occasions.src },
    ...treatCategories.map((category) => ({
      label: category.name,
      href: `/shop/${category.slug}`,
      image: treatArt[category.slug]?.src ?? stock.cupcakes.src,
    })),
  ];
  return (
    <ul className="site-tiles">
      {tiles.map((tile) => (
        <li key={tile.label}>
          <a className="site-tile" href={tile.href}>
            <img src={tile.image} alt="" />
            <span className="site-tile__label">{tile.label}</span>
            <span className="site-tile__arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function TreatsSection() {
  return (
    <Band id="treats">
      <SectionHeading
        align="center"
        eyebrow="what we bake"
        eyebrowStyle="pill"
        title={
          <>
            A whole <em>dessert table</em>
          </>
        }
        description="Cakes for every occasion, and brownies, cookies, jar cakes, tea cakes, cupcakes, bentos and combos by the box."
      />
      <CategoryTiles />
    </Band>
  );
}

/* Process (pin 02) --------------------------------------------------- */

export function ProcessSection() {
  return (
    <PatternSurface
      as="section"
      id="order"
      pattern="stripes"
      tone="pink"
      scale="xl"
      ground="var(--bbm-color-bg-canvas)"
      className="site-section"
    >
      <div className="site-container site-narrow">
        <div className="site-process__card">
          <SectionHeading title="How to order" align="center" />
          <StepList variant="stack" steps={howToOrder} />
        </div>
      </div>
    </PatternSurface>
  );
}

/* Order on WhatsApp (pin 15's cherry band) --------------------------- */

export function OrderBandSection() {
  return (
    <section id="whatsapp" className="site-section site-section--cherry">
      <div className="site-container">
        <div className="site-order-band">
          <SectionHeading
            eyebrow="order on whatsapp"
            title={
              <>
                Tell Mom what you'd like, <em>she'll bake it</em>
              </>
            }
            description="Every order on this site opens in WhatsApp already typed out. Read it, change anything, and send it yourself: nothing leaves the page on its own."
          />
          <div className="site-order-band__slots">
            <p className="bbm-text-eyebrow">Pick a time</p>
            <ul>
              {timeSlots.map((slot) => {
                const [name, hours] = slot.replace(')', '').split(' (');
                return (
                  <li key={slot}>
                    <strong>{name}</strong>
                    <span>{hours}</span>
                  </li>
                );
              })}
            </ul>
            <p>
              Pick up from the kitchen in {bakery.place}, or ask for delivery when you order. {bakery.notice}
            </p>
          </div>
          <div className="site-order-band__cta">
            <Button size="lg" href={orderLink} {...external}>
              Order on WhatsApp
            </Button>
            <p>WhatsApp {bakery.whatsappDisplay}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Storybook demo of pin 15's week schedule (sample content; not on the website). */
export function FindUsSection() {
  return (
    <section id="find-us" className="site-section site-section--cherry">
      <div className="site-container">
        <WeekSchedule
          days={scheduleDays}
          action={
            <Button href={orderLink} {...external}>
              Order on WhatsApp
            </Button>
          }
        />
        <NewsletterSignup
          variant="bar"
          className="site-find__bar"
          title="Psst! Get this week's bakes first"
          buttonLabel="Sign up"
          onSubmit={() => new Promise((resolve) => setTimeout(resolve, 600))}
        />
      </div>
    </section>
  );
}

/* Custom cakes (pin 15) and sizes (pin 08 packages) ------------------- */

export function CustomCakesSection() {
  const showcase = findCake('cake-anniversary-50') ?? cakes.find((cake) => cake.photos.length);
  if (!showcase) return null;
  const cheapest = Math.min(...cakes.map((cake) => cake.price));
  const lowestRate = Math.min(...cakes.map((cake) => cake.perPound));
  return (
    <Band id="custom" className="site-custom">
      <div className="site-custom__copy">
        <SectionHeading
          eyebrow="Birthdays · Anniversaries · Festivals"
          title={
            <>
              Your party called. It wants <em>cake!</em>
            </>
          }
          description="Any cake in the catalog, in the flavour, size and finish you want: a message piped on top, a name plaque, fresh flowers or a photo print."
        />
        <div className="site-custom__prices">
          <PriceTag shape="scallop" tone="pink" amount={inr(cheapest)} label="cakes from" size={128} rotate={-4} />
          <PriceTag shape="flower" tone="cherry" amount="½–3 kg" label="any size" size={128} rotate={3} />
          <PriceTag shape="cloud" tone="blue" amount={inr(lowestRate)} label="per pound from" size={128} rotate={-2} />
        </div>
        <Button size="lg" href={whatsappLink("Hello Bakes by Mom! I'd like to plan a custom cake 🎂")} {...external}>
          Plan your cake
        </Button>
      </div>
      <PatternSurface pattern="pinstripe" tone="pink" className="site-custom__panel">
        <Polaroid
          src={showcase.photos[0]?.thumb ?? art.strawberryCake}
          alt={`${showcase.name}: ${showcase.description}`}
          tape="cherry"
          rotate={4}
          width={300}
          aspect="4/5"
          className={showcase.photos[0]?.backdrop ? undefined : 'site-cutout'}
        />
        <Seal className="site-custom__seal" text="Baked to order • 100% eggless • " size={104} tone="cherry">
          <Doodle name="heart" size={24} color="var(--bbm-color-pink-300)" />
        </Seal>
        <PriceTag
          className="site-custom__tag"
          shape="tag"
          tone="butter"
          amount="Baked for:"
          label="your big day"
          size={60}
          rotate={-14}
        />
      </PatternSurface>
    </Band>
  );
}

const fromPrice = (kg: number) => {
  const prices = cakes.filter((cake) => cake.weightKg === kg).map((cake) => cake.price);
  return prices.length ? `from ${inr(Math.min(...prices))}` : 'ask';
};

export function PackagesSection() {
  const action = (
    <Button fullWidth href="/catalog">
      See the cakes
    </Button>
  );
  return (
    <Band className="site-section--beige">
      <SectionHeading
        align="center"
        title={
          <>
            Pick your <em>size</em>
          </>
        }
        description="Prices are for the sizes the cakes are listed in. Any cake can be baked bigger or smaller, priced off its per-pound rate."
      />
      <div className="site-packages">
        <PricingCard
          title="½ kg · 1 pound"
          price={fromPrice(0.5)}
          features={['About 4–6 slices', 'A message piped on top', 'Any flavour on the menu']}
          action={action}
        />
        <PricingCard
          title="1 kg · 2 pound"
          price={fromPrice(1)}
          features={['About 8–10 slices', 'The usual birthday size', 'Photo print or name plaque']}
          action={action}
        />
        <PricingCard
          featured
          title="2 kg · 4 pound"
          price={fromPrice(2)}
          features={[
            'A two-tier for a proper crowd',
            'Anniversaries and big birthdays',
            'Fresh flowers or gold toppers',
          ]}
          action={action}
        />
      </div>
    </Band>
  );
}

/* About (pin 05, orbit from pin 01, values from pin 05) --------------- */

/** `action={false}` drops the "Read our story" button, for when the visitor is already on the story page. */
export function MeetMomSection({ action = true }: { action?: boolean }) {
  return (
    <Band id="story" className="site-meet site-section--beige">
      <PatternSurface pattern="dots" tone="brown" ground="var(--bbm-color-bg-blue)" className="site-meet__photo">
        <Polaroid frame="scallop" src={art.mom} alt="Mom in her apron, smiling" rotate={0} />
        <Doodle
          name="sparkle"
          size={64}
          color="var(--bbm-color-blue-400)"
          className="site-meet__spark site-meet__spark--a"
        />
        <Doodle
          name="sparkle"
          size={48}
          color="var(--bbm-color-blue-400)"
          className="site-meet__spark site-meet__spark--b"
        />
      </PatternSurface>
      <Card frame="stripes" tone="cherry" rotate={-2} padding="lg" className="site-meet__note">
        <SectionHeading
          eyebrow="The baker behind it all"
          title="Hi, I'm Mom."
          size="md"
          description={
            <>
              <p>
                I never set out to run a bakery. I baked for the people I love, a birthday cake here, a tray of brownies
                there, and the kitchen quietly learned my hands.
              </p>
              <p>
                One order became two, two became a weekend booked out. Everything is still mixed, baked to order and
                finished by hand, in batches small enough to taste the care.
              </p>
            </>
          }
        />
        <p className="site-signature">with love, Mom</p>
        {action && (
          <Button variant="secondary" href="/about">
            Read our story
          </Button>
        )}
      </Card>
    </Band>
  );
}

export function OrbitSection() {
  const satellites = [
    'cake-spiderman',
    'cake-mom-flowerpot',
    'cake-heart-pearl',
    'cake-janmashtami',
    'cake-choco-drip',
    'cake-hbd-wifey',
  ]
    .map(findCake)
    .filter((cake) => cake?.photos.length)
    .map((cake) => ({ src: cake!.photos[0]!.thumb, alt: cake!.name }));
  return (
    <Band className="site-orbit site-section--pink">
      {/* A pink sky of twinkling sparkles behind the orbit (pin 01) */}
      <div className="site-orbit__sky" aria-hidden="true">
        {Array.from({ length: 7 }, (_, i) => (
          <Doodle key={i} name="sparkle" size={[56, 28, 40, 22, 64, 30, 36][i]} color="var(--bbm-color-paper)" />
        ))}
      </div>
      <Orbit
        center={{ src: art.kitchen, alt: "Mom's kitchen with jars on the shelf and a cake on a stand" }}
        satellites={satellites}
        arcText="Every cake, cookie and brownie on this table"
      />
      <p className="site-orbit__text">
        What began as a hobby in a home kitchen is now every cake, cookie and brownie on this table, still mixed, baked
        to order and finished by hand.
      </p>
      <div className="site-center">
        <Button href="/catalog">Explore the catalog</Button>
      </div>
    </Band>
  );
}

export function ValuesRow() {
  return (
    <div className="site-values">
      <Card tone="matcha" outline padding="lg">
        <span className="site-veg-dot site-veg-dot--lg" aria-hidden="true" />
        <p className="bbm-text-heading-md">100% eggless</p>
        <p>Pure vegetarian. Everything this kitchen bakes carries the FSSAI green dot.</p>
      </Card>
      <Card tone="blue" outline padding="lg">
        <Doodle name="whisk" size={56} />
        <p className="bbm-text-heading-md">Baked to order</p>
        <p>Never off a shelf. Small batches, mixed and baked for your date.</p>
      </Card>
      <Card tone="pink" outline padding="lg">
        <Doodle name="heart" size={56} color="var(--bbm-color-cherry-500)" />
        <p className="bbm-text-heading-md">Iced by hand</p>
        <p>Finished the morning it goes out, with whatever the occasion asks for.</p>
      </Card>
    </div>
  );
}

export function AboutCardSection() {
  return (
    <Band className="site-section--blue" edge={{ color: 'var(--bbm-color-bg-blue)' }}>
      <Card outline="brand" padding="lg" className="site-about-card">
        <Doodle
          name="cherries-halftone"
          size={180}
          color="var(--bbm-color-cherry-700)"
          className="site-about-card__cherries"
        />
        <SectionHeading variant="stamp" align="start" title="About us" overlay="with love" />
        <p className="bbm-text-heading-sm">Passion, patience, perfection</p>
        <p className="site-about-card__quote">
          “Three things go into every box that leaves this kitchen. We pour the passion in at the mixing bowl, give the
          batter the patience it asks for, and keep fussing over the piping until the last rose sits right.”
        </p>
      </Card>
    </Band>
  );
}

/* Gallery (pin 01) ---------------------------------------------------- */

const photoItems = (list: Cake[], firstOnly = false): GalleryItem[] =>
  list.flatMap((cake) =>
    (firstOnly ? cake.photos.slice(0, 1) : cake.photos).map((photo, i) => ({
      src: photo.thumb,
      alt: i === 0 ? `${cake.name}: ${cake.description}` : `${cake.name}, another view`,
      caption: (
        <>
          {cake.name} · <a href={`/catalog/${cake.slug}`}>Order this cake</a>
        </>
      ),
    })),
  );

/** Each occasion's doodle, on its filter chip in the gallery. */
export const occasionIcons: Record<string, { name: DoodleName; color: string }> = {
  'birthday-kids': { name: 'star', color: 'var(--bbm-color-butter-400)' },
  'birthday-parents': { name: 'daisy', color: 'var(--bbm-color-pink-500)' },
  'birthday-partner': { name: 'heart', color: 'var(--bbm-color-cherry-500)' },
  'birthday-classic': { name: 'cupcake', color: 'var(--bbm-color-pink-500)' },
  engagement: { name: 'sparkle', color: 'var(--bbm-color-butter-400)' },
  anniversary: { name: 'bow', color: 'var(--bbm-color-cherry-500)' },
  'parents-day': { name: 'heart', color: 'var(--bbm-color-pink-500)' },
  romantic: { name: 'cherry', color: 'var(--bbm-color-cherry-500)' },
  farewell: { name: 'daisy', color: 'var(--bbm-color-blue-600)' },
  festival: { name: 'sparkle', color: 'var(--bbm-color-cherry-500)' },
  teachers: { name: 'star', color: 'var(--bbm-color-blue-600)' },
};

/**
 * The gallery, and the home page's one place for occasions: pick an occasion, then keep scrolling and the strips
 * open one after another, left to right (Gallery's `pinOnScroll`).
 */
export function GallerySection() {
  const withPhotos = occasionOptions()
    .filter(
      (option) => option.value === 'all' || cakes.some((cake) => cake.occasion === option.value && cake.photos.length),
    )
    .map((option) => {
      const icon = occasionIcons[option.value];
      return icon
        ? {
            ...option,
            label: (
              <>
                <Doodle name={icon.name} size="1.15em" color={icon.color} className="site-gallery__chip-icon" />
                {option.label}
              </>
            ),
          }
        : option;
    });
  const [filter, setFilter] = useState<string[]>(['all']);
  const slug = filter[0] ?? 'all';
  const items =
    slug === 'all' ? photoItems(featured().slice(0, 9), true) : photoItems(cakes.filter((c) => c.occasion === slug));
  return (
    <Band id="gallery" className="site-gallery site-section--cocoa" edge={{ color: 'var(--bbm-color-bg-inverse)' }}>
      <CatalogNote />
      {items.length > 0 && (
        <Gallery
          items={items}
          label="Photos of cakes from Mom's kitchen"
          pinOnScroll
          head={
            <>
              <SectionHeading variant="bubble" title="Gallery" />
              <FilterChips
                label="Show cakes for"
                options={withPhotos}
                value={filter}
                onChange={setFilter}
                className="site-gallery__filters"
              />
            </>
          }
        />
      )}
    </Band>
  );
}

/* Reviews (pin 01) ---------------------------------------------------- */

export function ReviewsSection() {
  return (
    <Band className="site-section--pink site-reviews-band" edge={{ color: 'var(--bbm-color-bg-pink)', shape: 'wave' }}>
      <SectionHeading
        eyebrow="kind words"
        eyebrowStyle="pill"
        title="What the neighbourhood says"
        description="Every box leaves the kitchen warm and comes back as a message on the phone. A few of the ones we kept."
        align="center"
      />
      {/* A slow, endless row: the second copy only fills the loop, so screen readers skip it */}
      <div className="site-reviews">
        {[0, 1].map((copy) => (
          <ul key={copy} className="site-reviews__track" aria-hidden={copy === 1 || undefined}>
            {reviews.map((review) => (
              <li key={review.author}>
                <ReviewCard {...review} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </Band>
  );
}

/* Gifting (pin 01 band, pin 10 ticket) -------------------------------- */

export function GiftSection() {
  return (
    <section id="gifts" className="site-club">
      <div className="site-club__mascot" aria-hidden="true">
        <Doodle name="bow" size={96} color="var(--bbm-color-cherry-500)" />
      </div>
      <EdgeDivider shape="scallop" flip color="var(--bbm-color-bg-pink)" outline size="lg" />
      <div className="site-club__band">
        <div className="site-container site-narrow">
          <SectionHeading eyebrow="gifting" eyebrowStyle="pill" title="Sending it to someone?" align="center" />
          <p className="site-club__letter">
            Any cake or box can go out wrapped and ready to hand over, with a note in your words and a message piped on
            top.
          </p>
          <Ticket tone="blue" stub={<span>with love</span>} className="site-club__ticket">
            <p className="site-club__perks-title">Add to any order</p>
            <ul className="site-club__perks">
              {giftAddons.map((addon) => (
                <li key={addon}>{addon}</li>
              ))}
              <li>A message piped on the cake</li>
            </ul>
          </Ticket>
          <div className="site-club__cta">
            <Button
              size="lg"
              href={whatsappLink("Hello Bakes by Mom! I'd like to send a cake as a gift 🎁")}
              {...external}
            >
              Send a gift on WhatsApp
            </Button>
          </div>
        </div>
      </div>
      <EdgeDivider shape="scallop" color="var(--bbm-color-bg-pink)" outline size="lg" />
    </section>
  );
}

/* FAQ (pin 02) -------------------------------------------------------- */

export function FaqSection() {
  return (
    <Band id="faq" className="site-section--blue" edge={{ color: 'var(--bbm-color-bg-blue)' }}>
      <SectionHeading
        align="center"
        title={
          <>
            Questions? Mom's got <em>answers</em>.
          </>
        }
      />
      <Accordion items={faqItems} columns={2} exclusive className="site-faq" />
    </Band>
  );
}

/* Instagram (pin 12's grid) -------------------------------------------- */

export function InstagramSection() {
  return (
    <Band className="site-insta">
      <SectionHeading
        align="center"
        eyebrow={bakery.instagramHandle}
        eyebrowStyle="pill"
        title={
          <>
            See this week's <em>bakes</em>
          </>
        }
        description="New cakes go up on Instagram as they leave the kitchen."
      />
      <Gallery
        variant="grid"
        items={photoItems(featured().slice(0, 6), true)}
        label="Recent cakes"
        follow={{ label: `Follow ${bakery.instagramHandle}`, href: bakery.instagram }}
      />
    </Band>
  );
}

/** Storybook demo of pin 03's newsletter card (sample content; not on the website). */
export function NewsletterSection() {
  return (
    <section className="site-news">
      <EdgeDivider shape="scallop" flip color="var(--bbm-color-bg-butter)" />
      <PatternSurface
        pattern="dots"
        tone="brown"
        ground="var(--bbm-color-bg-butter)"
        className="site-news__band"
        scale="sm"
      >
        <NewsletterSignup
          title="Mom's letter"
          description="New cakes, festival boxes and the odd recipe, once a week."
          sticker={
            <Badge shape="tape" tone="cherry" variant="solid">
              New bakes
            </Badge>
          }
          onSubmit={() => new Promise((resolve) => setTimeout(resolve, 700))}
        />
      </PatternSurface>
    </section>
  );
}

/* Journal (pin 01) ----------------------------------------------------- */

/** Storybook demo of pin 01's journal row (sample content; not on the website). */
export function JournalSection() {
  const images = [art.cookies, art.teaCake, art.jarCake];
  return (
    <Band>
      <SectionHeading eyebrow="journal" eyebrowStyle="pill" title="From Mom's notebook" align="center" />
      <ul className="site-journal">
        {journalPosts.map((post, i) => (
          <li key={post.title}>
            <ProductCard
              as="div"
              name={post.title}
              imageShape="arch"
              image={{ src: images[i % images.length]!, alt: '' }}
              href="#journal"
              description={
                <>
                  <span className="site-journal__kicker">{post.kicker}</span> · {post.date}
                </>
              }
            />
          </li>
        ))}
      </ul>
    </Band>
  );
}

/* Footer (pin 03) ------------------------------------------------------ */

export function Footer() {
  return <SiteFooter columns={footerColumns} socials={footerSocials} contact={footerContact} bottom={footerBottom} />;
}

/* Cake assistant (pins 08, 10, 01, 15) --------------------------------- */

function AnswerBody({ reply }: { reply: Answer }) {
  return (
    <>
      {reply.text.map((line) => (
        <p key={line}>{line}</p>
      ))}
      {reply.cakes && reply.cakes.length > 0 && (
        <ul className="site-chat__list">
          {reply.cakes.map((cake) => (
            <li key={cake.slug}>
              <a href={`/catalog/${cake.slug}`}>{cake.name}</a> · {inr(cake.price)} · {kgLabel(cake.weightKg)}
            </li>
          ))}
        </ul>
      )}
      {reply.treats && (
        <ul className="site-chat__list">
          {reply.treats.map((category) => (
            <li key={category.slug}>
              <a href={`/shop/${category.slug}`}>See all {category.name.toLowerCase()}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/** "Ask Mom": the old site's cake assistant, answering from the catalog. */
export function ChatDemo({ inline = true, defaultOpen = true }: { inline?: boolean; defaultOpen?: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'hello',
      from: 'mom',
      text: 'Hi! I know every cake on the shelf: prices, sizes, flavours and who each one is for. What are you baking for?',
    },
  ]);
  const [chips, setChips] = useState<string[]>(starterChips);
  const [typing, setTyping] = useState(false);

  const onSend = (text: string) => {
    setMessages((m) => [...m, { id: `you-${m.length}`, from: 'you', text }]);
    setTyping(true);
    const reply = answer(text);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: `mom-${m.length}`, from: 'mom', text: <AnswerBody reply={reply} /> }]);
      if (reply.chips) setChips(reply.chips);
    }, 500);
  };

  return (
    <ChatWidget
      inline={inline}
      defaultOpen={defaultOpen}
      messages={messages}
      onSend={onSend}
      typing={typing}
      intro={
        <>
          <p>
            <strong>Not sure which cake?</strong>
          </p>
          <p>Ask about sizes, flavours, prices or what to gift.</p>
        </>
      }
      placeholder="Ask about a cake…"
      suggestions={chips}
      handoff={{ label: 'Order on WhatsApp', href: orderLink }}
    />
  );
}
