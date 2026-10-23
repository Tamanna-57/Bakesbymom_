/**
 * Section compositions from design/board/sections/, built only from library
 * components. Used by the Sections stories and assembled into Pages / Landing page.
 */
import { useMemo, useState, type ReactNode } from 'react';
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
} from '@bakesbymom/ui';
import { art, menu } from '../assets';
import {
  faqItems,
  footerBottom,
  footerColumns,
  footerContact,
  footerNewsletter,
  footerSocials,
  galleryItems,
  howToOrder,
  reviews,
  scheduleDays,
} from '../assets/site';
import './sections.css';

const Band = ({ children, className, id }: { children: ReactNode; className?: string; id?: string }) => (
  <section id={id} className={['sb-section', className].filter(Boolean).join(' ')}>
    <div className="sb-container">{children}</div>
  </section>
);

/* Marquee (pin 02) -------------------------------------------------- */

export function DoubleRibbon() {
  return (
    <Marquee
      rows={2}
      caps={false}
      label="What Mom bakes"
      items={['Baked this morning', "Made in Mom's kitchen", 'Real butter, real eggs', 'Order by Wednesday']}
      separator={<Doodle name="heart" size="0.95em" />}
    />
  );
}

/* Menu (pin 16, filters from pin 13) --------------------------------- */

const CATEGORIES = ['All', 'Cakes', 'Cookies', 'Pies', 'Breads', 'Little treats'] as const;

export function MenuSection({ level = 2 }: { level?: 1 | 2 }) {
  const [filter, setFilter] = useState<string[]>(['All']);
  const items = useMemo(() => menu.filter((item) => filter[0] === 'All' || item.category === filter[0]), [filter]);
  return (
    <Band id="menu" className="sb-section--blue">
      <SectionHeading variant="ribbon" level={level} title="Menu" ribbonText="fresh this week" />
      <div className="sb-menu__filters">
        <FilterChips
          label="Filter the menu"
          options={CATEGORIES.map((c) => ({ value: c, label: c }))}
          value={filter}
          onChange={setFilter}
        />
        <p className="bbm-visually-hidden" aria-live="polite">
          Showing {items.length} bakes
        </p>
      </div>
      <ul className="sb-menu__grid">
        {items.map((item, i) => (
          <li key={item.name}>
            <ProductCard
              as="div"
              variant="menu"
              name={item.name}
              image={{ src: item.image, alt: item.alt }}
              description={item.description}
              price={item.price}
              href="#item"
              tone={(['pink', 'blue', 'beige', 'butter'] as const)[i % 4]}
              badge={
                item.badge && (
                  <Badge tone={item.badge === 'New' ? 'blue' : 'cherry'} variant="solid">
                    {item.badge}
                  </Badge>
                )
              }
              soldOut={item.name === 'Macaron box'}
            />
          </li>
        ))}
      </ul>
      <p className="sb-menu__note">
        <Doodle name="sparkle" size={18} color="var(--bbm-color-cherry-500)" />
        Most bakes can be made gluten-, dairy- or nut-free. Just ask Mom.
      </p>
    </Band>
  );
}

/** Cherry category tiles (pin 16). */
export function CategoryTiles() {
  const tiles = [
    { label: 'Celebration cakes', image: art.strawberryCake },
    { label: 'Cookie boxes', image: art.cookies },
    { label: 'Pies', image: art.cherryPie },
    { label: 'Bread', image: art.sourdough },
  ];
  return (
    <ul className="sb-tiles">
      {tiles.map((tile) => (
        <li key={tile.label}>
          <a className="sb-tile" href="#menu">
            <img src={tile.image} alt="" />
            <span className="sb-tile__label">{tile.label}</span>
            <span className="sb-tile__arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/* Process (pin 02) --------------------------------------------------- */

export function ProcessSection() {
  return (
    <PatternSurface
      as="section"
      pattern="stripes"
      tone="pink"
      scale="xl"
      ground="var(--bbm-color-bg-canvas)"
      className="sb-section"
    >
      <div className="sb-container sb-narrow">
        <div className="sb-process__card">
          <SectionHeading title="How to order" align="center" />
          <StepList variant="stack" steps={howToOrder} />
        </div>
      </div>
    </PatternSurface>
  );
}

/* Find us (pin 15) --------------------------------------------------- */

export function FindUsSection() {
  return (
    <section id="find-us" className="sb-section sb-section--cherry">
      <div className="sb-container">
        <WeekSchedule days={scheduleDays} action={<Button>Get directions</Button>} />
        <NewsletterSignup
          variant="bar"
          className="sb-find__bar"
          title="Psst! Get Mom's schedule every Monday"
          buttonLabel="Sign up"
          onSubmit={() => new Promise((resolve) => setTimeout(resolve, 600))}
        />
      </div>
    </section>
  );
}

/* Custom cakes (pin 15, packages from pin 08) ------------------------ */

export function CustomCakesSection() {
  return (
    <Band id="custom" className="sb-custom">
      <div className="sb-custom__copy">
        <SectionHeading
          eyebrow="Birthdays · Weddings · Showers"
          title={
            <>
              Your party called. It wants <em>cake!</em>
            </>
          }
          description="Custom cakes in any flavor on the menu, decorated your way."
        />
        <div className="sb-custom__prices">
          <PriceTag shape="scallop" tone="pink" amount="$45" label="6-inch cake" size={128} rotate={-4} />
          <PriceTag shape="flower" tone="cherry" amount="$4" label="per cupcake" size={128} rotate={3} />
          <PriceTag shape="cloud" tone="blue" amount="$15" label="custom message" size={128} rotate={-2} />
        </div>
        <Button size="lg">Plan your cake</Button>
      </div>
      <PatternSurface pattern="pinstripe" tone="pink" className="sb-custom__panel">
        <Polaroid
          src={art.chocolateCake}
          alt="Chocolate cake with ganache drip and strawberries"
          tape="cherry"
          rotate={4}
          width={300}
        />
        <Seal className="sb-custom__seal" text="Designed to delight • Designed to delight • " size={104} tone="cherry">
          <Doodle name="heart" size={24} color="var(--bbm-color-pink-300)" />
        </Seal>
        <PriceTag
          className="sb-custom__tag"
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

export function PackagesSection() {
  return (
    <Band className="sb-section--beige">
      <SectionHeading
        align="center"
        title={
          <>
            Pick your <em>cake</em>
          </>
        }
      />
      <div className="sb-packages">
        <PricingCard
          title="Little cake"
          price="$45"
          features={['6-inch, 2 layers', 'Serves 8–10', 'Message in buttercream']}
          action={<Button fullWidth>Choose this cake</Button>}
        />
        <PricingCard
          title="Party cake"
          price="$70"
          features={['8-inch, 3 layers', 'Serves 16–20', 'Piped flowers or sprinkles']}
          action={<Button fullWidth>Choose this cake</Button>}
        />
        <PricingCard
          featured
          title="Celebration tier"
          price="$140"
          features={['Two tiers', 'Serves 40', 'A design sketched with Mom', 'Delivery included']}
          action={<Button fullWidth>Choose this cake</Button>}
        />
      </div>
    </Band>
  );
}

/* About (pin 05, orbit from pin 01, values from pin 05) --------------- */

export function MeetMomSection() {
  return (
    <Band id="story" className="sb-meet">
      <PatternSurface pattern="dots" tone="brown" ground="var(--bbm-color-bg-blue)" className="sb-meet__photo">
        <Polaroid frame="scallop" src={art.mom} alt="Mom in her apron, smiling" rotate={0} />
        <Doodle
          name="sparkle"
          size={64}
          color="var(--bbm-color-blue-400)"
          className="sb-meet__spark sb-meet__spark--a"
        />
        <Doodle
          name="sparkle"
          size={48}
          color="var(--bbm-color-blue-400)"
          className="sb-meet__spark sb-meet__spark--b"
        />
      </PatternSurface>
      <Card frame="stripes" tone="cherry" rotate={-2} padding="lg" className="sb-meet__note">
        <SectionHeading
          eyebrow="The baker behind it all"
          title="Hi, I'm Mom."
          size="md"
          description={
            <>
              <p>
                I've been baking for our family for thirty years. Birthday cakes, Sunday bread, cookies for every bake
                sale. Now I bake for yours too.
              </p>
              <p>Everything is made to order in my kitchen, with real butter and fruit from the market.</p>
            </>
          }
        />
        <p className="sb-signature">with love, Mom</p>
        <Button variant="secondary">Read our story</Button>
      </Card>
    </Band>
  );
}

export function OrbitSection() {
  return (
    <Band className="sb-orbit">
      <Orbit
        center={{ src: art.kitchen, alt: "Mom's kitchen with jars on the shelf and a cake on a stand" }}
        satellites={[
          { src: art.cookies, alt: 'Cookies' },
          { src: art.cherryPie, alt: 'Cherry pie' },
          { src: art.cupcake, alt: 'A cupcake' },
          { src: art.sourdough, alt: 'Sourdough' },
          { src: art.macarons, alt: 'Macarons' },
          { src: art.cinnamonRoll, alt: 'A cinnamon roll' },
        ]}
        arcText="Every bake is a little bit of home"
      />
      <p className="sb-orbit__text">
        Bakes by Mom started at our kitchen table. Every order is still baked there, one cake at a time.
      </p>
      <div className="sb-center">
        <Button>Find us this week</Button>
      </div>
    </Band>
  );
}

export function ValuesRow() {
  return (
    <div className="sb-values">
      <Card tone="blue" outline padding="lg">
        <Doodle name="whisk" size={56} />
        <p className="bbm-text-heading-md">Made from scratch</p>
        <p>No mixes, no shortcuts: flour, butter, sugar, time.</p>
      </Card>
      <Card tone="pink" outline padding="lg">
        <Doodle name="heart" size={56} color="var(--bbm-color-cherry-500)" />
        <p className="bbm-text-heading-md">Real butter, real eggs</p>
        <p>The same ingredients Mom uses at home.</p>
      </Card>
    </div>
  );
}

export function AboutCardSection() {
  return (
    <Band>
      <Card outline="brand" padding="lg" className="sb-about-card">
        <Doodle
          name="cherries-halftone"
          size={180}
          color="var(--bbm-color-cherry-700)"
          className="sb-about-card__cherries"
        />
        <SectionHeading variant="stamp" align="start" title="About us" overlay="About us" />
        <p className="bbm-text-heading-sm">What makes it different?</p>
        <p className="sb-about-card__quote">
          “Cakes are more than dessert. They're the part of the party people remember. I bake every one like it's for my
          own family, because for thirty years it was.”
        </p>
      </Card>
    </Band>
  );
}

/* Gallery (pin 01) ---------------------------------------------------- */

export function GallerySection() {
  return (
    <Band>
      <SectionHeading variant="bubble" title="Gallery" />
      <Gallery items={galleryItems} label="Photos from Mom's kitchen" />
    </Band>
  );
}

/* Reviews (pin 01) ---------------------------------------------------- */

export function ReviewsSection() {
  return (
    <Band>
      <SectionHeading eyebrow="reviews" eyebrowStyle="pill" title="Kind words" align="center" />
      <ul className="sb-reviews">
        {reviews.map((review) => (
          <li key={review.author}>
            <ReviewCard {...review} />
          </li>
        ))}
      </ul>
    </Band>
  );
}

/* Bake Club (pin 01 band, pin 10 ticket) ------------------------------ */

export function BakeClubSection() {
  return (
    <section id="club" className="sb-club">
      <div className="sb-club__mascot" aria-hidden="true">
        <Doodle name="cupcake" size={96} />
      </div>
      <EdgeDivider shape="scallop" flip color="var(--bbm-color-bg-pink)" outline size="lg" />
      <div className="sb-club__band">
        <div className="sb-container sb-narrow">
          <SectionHeading eyebrow="bake club" eyebrowStyle="pill" title="Dear neighbors," align="center" />
          <p className="sb-club__letter">
            Every month I bake a box of four seasonal treats, just for the Bake Club. You get first pick of holiday
            orders too, and a recipe card from my kitchen.
          </p>
          <Ticket tone="blue" stub={<span>June ’26</span>} className="sb-club__ticket">
            <p className="sb-club__perks-title">Bake Club · member perks</p>
            <ul className="sb-club__perks">
              <li>A box of 4 seasonal treats</li>
              <li>First pick of holiday orders</li>
              <li>Mom's recipe card every month</li>
            </ul>
          </Ticket>
          <div className="sb-club__cta">
            <p>
              <strong>$28 a month</strong> · skip or pause anytime
            </p>
            <Button size="lg">Join the club</Button>
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
    <Band id="faq">
      <SectionHeading
        align="center"
        title={
          <>
            Questions? Mom's got <em>answers</em>.
          </>
        }
      />
      <Accordion items={faqItems} columns={2} exclusive className="sb-faq" />
    </Band>
  );
}

/* Newsletter (pin 03) -------------------------------------------------- */

export function NewsletterSection() {
  return (
    <section className="sb-news">
      <EdgeDivider shape="scallop" flip color="var(--bbm-color-bg-butter)" />
      <PatternSurface
        pattern="dots"
        tone="brown"
        ground="var(--bbm-color-bg-butter)"
        className="sb-news__band"
        scale="sm"
      >
        <NewsletterSignup
          title="Mom's Monday letter"
          description="This week's menu, the market schedule and one recipe card, every Monday."
          sticker={
            <Badge shape="tape" tone="cherry" variant="solid">
              Bake Club news
            </Badge>
          }
          onSubmit={() => new Promise((resolve) => setTimeout(resolve, 700))}
        />
      </PatternSurface>
    </section>
  );
}

/* Journal (pin 01) ----------------------------------------------------- */

export function JournalSection() {
  const posts = [
    { kicker: 'Recipe', title: "Mom's brown butter cookies", date: '12 May', image: art.cookies },
    { kicker: 'News', title: "We're at the Saturday market", date: '8 May', image: art.kitchen },
    { kicker: 'Recipe', title: 'The 3-ingredient shortbread', date: '1 May', image: art.macarons },
  ];
  return (
    <Band>
      <SectionHeading eyebrow="journal" eyebrowStyle="pill" title="From Mom's notebook" align="center" />
      <ul className="sb-journal">
        {posts.map((post) => (
          <li key={post.title}>
            <ProductCard
              as="div"
              name={post.title}
              imageShape="arch"
              image={{ src: post.image, alt: '' }}
              href="#journal"
              description={
                <>
                  <span className="sb-journal__kicker">{post.kicker}</span> · {post.date}
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
  return (
    <SiteFooter
      columns={footerColumns}
      socials={footerSocials}
      contact={footerContact}
      newsletter={footerNewsletter}
      bottom={footerBottom}
    />
  );
}

/* Chatbot (pins 08, 10, 01, 15) ---------------------------------------- */

const ANSWERS: Array<[RegExp, string]> = [
  [/ahead|when|order by|how long/i, 'Order by Wednesday for Saturday pick-up. Custom cakes need about a week.'],
  [
    /gluten|dairy|nut|vegan|allerg/i,
    'Most bakes can be made gluten-, dairy- or nut-free. My kitchen also handles nuts, dairy, eggs and wheat, so I can’t promise it’s allergen-free.',
  ],
  [
    /deliver|ship|pick/i,
    'I deliver within 5 miles for $8, free over $60. Or pick up from the porch on Saturday, 9am–1pm.',
  ],
  [
    /custom|design|wedding|birthday/i,
    'Yes! Tell me the date, how many people and a photo or idea. I’ll sketch it with you. Prices start at $45.',
  ],
  [/club|subscri/i, 'The Bake Club is $28 a month for a box of four seasonal treats. Skip or pause any time.'],
];

/** A demo bot that answers from the FAQ, so the chat can be tried in Storybook. */
export function ChatDemo({ inline = true, defaultOpen = true }: { inline?: boolean; defaultOpen?: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'hello', from: 'mom', text: 'Hi! I’m Mom. What can I help you with?' },
  ]);
  const [typing, setTyping] = useState(false);

  const onSend = (text: string) => {
    setMessages((m) => [...m, { id: `you-${m.length}`, from: 'you', text }]);
    setTyping(true);
    const answer =
      ANSWERS.find(([pattern]) => pattern.test(text))?.[1] ??
      "Good question! I'll get back to you by email, or you can call me on (512) 555-0134.";
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: `mom-${m.length}`, from: 'mom', text: answer }]);
    }, 700);
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
            <strong>Not sure what to order?</strong>
          </p>
          <p>Ask Mom anything about cakes, dates, allergies or delivery.</p>
        </>
      }
      suggestions={['How far ahead should I order?', 'Do you do gluten-free?', 'Can I order a custom cake?']}
      handoff={{ label: 'Talk to a real person', href: '#contact' }}
    />
  );
}
