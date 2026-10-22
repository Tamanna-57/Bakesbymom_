import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import {
  Accordion,
  Badge,
  Button,
  Card,
  Doodle,
  EdgeDivider,
  Hero,
  Marquee,
  Polaroid,
  PriceTag,
  ProductCard,
  ReviewCard,
  Seal,
  SectionHeading,
  SiteFooter,
  SiteHeader,
  StepList,
  Ticket,
} from '@bakesbymom/ui';
import { art, menu } from '../assets';
import { footerBottom, footerColumns, headerActions, navLinks } from '../assets/site';
import './pages.css';

const band = (color: string) => ({ '--pg-band': color }) as CSSProperties;

const markets = [
  { day: 'Wed 12', place: 'Porch pick-up', time: '4pm–6pm', note: 'Pre-orders only' },
  { day: 'Fri 14', place: 'Riverside farmers’ market', time: '8am–1pm', note: 'Stall 14, look for the awning' },
  { day: 'Sat 15', place: 'Porch pick-up', time: '9am–1pm', note: 'Cakes, pies and bread' },
  { day: 'Sun 16', place: 'St. Mary’s school fair', time: '11am–3pm', note: 'Cupcakes & cookies only' },
];

function HomePage() {
  return (
    <div>
      <SiteHeader
        links={navLinks}
        actions={headerActions}
        announcement="Free local delivery on orders over $40 · Order by Wednesday for Saturday"
        scallop
      />

      <Hero
        eyebrow="Home-baked · small batch · made to order"
        title={
          <>
            Baked with <span className="bbm-squiggle">love</span>, by <em>Mom</em>
          </>
        }
        description="Celebration cakes, cookies by the dozen and Sunday sourdough, made in a home kitchen and ready for Saturday pick-up."
        actions={
          <>
            <Button size="lg" href="#menu">
              See this week’s menu
            </Button>
            <Button size="lg" variant="secondary" href="#custom">
              Order a custom cake
            </Button>
          </>
        }
        pattern="stripes"
        accent="strawberry"
        media={
          <div style={{ position: 'relative', width: 340, height: 360 }}>
            <Polaroid
              src={art.strawberryCake}
              alt="Strawberry layer cake"
              rotate={-5}
              width={230}
              tape="gingham"
              style={{ position: 'absolute', left: 0, top: 10 }}
            />
            <Polaroid
              src={art.cookies}
              alt="Chocolate chip cookies"
              rotate={6}
              width={190}
              caption="fresh today"
              style={{ position: 'absolute', right: 0, bottom: 0 }}
            />
            <Seal
              text="Baked fresh daily • Made with love • "
              size={104}
              spin
              style={{ position: 'absolute', right: -6, top: -14 }}
            >
              <Doodle name="heart" size={30} />
            </Seal>
          </div>
        }
      />

      <Marquee
        label="What we bake"
        items={['Celebration cakes', 'Cookies', 'Pies', 'Sunday sourdough', 'Little treats']}
      />

      {/* This week's bakes */}
      <section id="menu" className="pg-section">
        <div className="bbm-container pg-stack">
          <div className="pg-row">
            <SectionHeading
              eyebrow="Fresh this week"
              title={
                <>
                  This week’s <em>bakes</em>
                </>
              }
              description="Everything is baked to order. Order by Wednesday for Saturday pick-up."
            />
            <Button variant="secondary" href="#full-menu">
              Full menu →
            </Button>
          </div>
          <ul className="pg-grid">
            {menu.slice(0, 4).map((item) => (
              <ProductCard
                key={item.name}
                as="li"
                name={item.name}
                image={{ src: item.image, alt: item.alt }}
                description={item.description}
                price={item.price}
                href={`#${item.name}`}
                badge={
                  item.badge && (
                    <Badge
                      size="sm"
                      variant="solid"
                      tone={item.badge === 'New' ? 'pistachio' : item.badge === 'Bestseller' ? 'cherry' : 'butter'}
                    >
                      {item.badge}
                    </Badge>
                  )
                }
              />
            ))}
          </ul>
        </div>
      </section>

      {/* How ordering works */}
      <EdgeDivider shape="scallop" flip color="var(--bbm-color-bg-blush)" />
      <section id="order" className="pg-section pg-band" style={band('var(--bbm-color-bg-blush)')}>
        <div className="bbm-container pg-stack">
          <SectionHeading
            align="center"
            eyebrow="special orders"
            eyebrowStyle="pill"
            title="Ordering is easy as pie"
            style={{ '--bbm-heading-pill-bg': 'var(--bbm-color-bg-blush)' } as CSSProperties}
          />
          <StepList
            steps={[
              { title: 'Choose your bake', description: 'Pick from the menu, or describe your dream cake.' },
              { title: 'Pick a date', description: 'Three days ahead for menu items, two weeks for custom cakes.' },
              { title: 'Collect it warm', description: 'From the porch on Saturday morning, or at the market stall.' },
            ]}
          />
        </div>
      </section>
      <EdgeDivider shape="scallop" color="var(--bbm-color-bg-blush)" />

      {/* Meet Mom */}
      <section id="story" className="pg-section">
        <div className="bbm-container pg-split">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Polaroid
              src={art.mixingBowl}
              alt="Mom’s mixing bowl and whisk"
              frame="scallop"
              tone="blueberry"
              rotate={-3}
              width={300}
              caption="the famous yellow bowl"
            />
          </div>
          <Card frame="stripes" tone="butter" rotate={1.5} padding="lg">
            <SectionHeading size="md" eyebrow="Your new favorite baker" title="Meet Mom" />
            <p className="bbm-text-body-lg" style={{ margin: '16px 0 0' }}>
              Thirty years of birthday cakes, one very loved recipe box, and a kitchen that always smells like butter.
              Bakes by Mom started when the neighbors kept asking for “that strawberry cake”. Now it’s a tiny bakery run
              from home, still made the same way, one batch at a time.
            </p>
            <p className="pg-signature">with love, Mom</p>
          </Card>
        </div>
      </section>

      {/* Find us this week */}
      <section id="find-us" className="pg-section pg-band" style={band('var(--bbm-color-bg-sunken)')}>
        <div className="bbm-container pg-stack">
          <SectionHeading
            eyebrow="Where to find us"
            title={
              <>
                This <em>week</em>
              </>
            }
            description="Markets, fairs and porch pick-ups. Follow along on Instagram for last-minute drops."
          />
          <ul className="pg-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(13rem, 100%), 1fr))' }}>
            {markets.map((m, i) => (
              <Card key={m.day} as="li" outline tone={i === 1 ? 'strawberry' : 'paper'} sticker={i === 1}>
                <div className="pg-day">
                  <Badge shape="tape" variant="solid" tone={i === 1 ? 'cherry' : 'cocoa'} size="sm">
                    {m.day}
                  </Badge>
                  <p className="bbm-text-heading-sm">{m.place}</p>
                  <p className="bbm-text-price">{m.time}</p>
                  <p className="bbm-text-body-sm" style={{ color: 'var(--bbm-color-text-secondary)' }}>
                    {m.note}
                  </p>
                </div>
              </Card>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <section className="pg-section">
        <div className="bbm-container pg-stack">
          <SectionHeading
            align="center"
            eyebrow="Kind words"
            title={
              <>
                Not a <em>crumb</em> left
              </>
            }
          />
          <ul className="pg-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(15rem, 100%), 1fr))' }}>
            <ReviewCard
              as="li"
              rating={5}
              author="Priya S."
              detail="Strawberry layer cake"
              quote="Tasted exactly like the one my grandmother used to make."
            />
            <ReviewCard
              as="li"
              rating={5}
              tone="blueberry"
              author="Marcus T."
              detail="Birthday cupcakes"
              quote="Twenty-four kids, zero leftovers. Mom is a legend."
            />
            <ReviewCard
              as="li"
              rating={5}
              tone="butter"
              author="Ana & Luis"
              detail="Cinnamon rolls"
              quote="We pre-order every Saturday now. Dangerous."
            />
            <ReviewCard
              as="li"
              rating={5}
              tone="pistachio"
              author="Hannah K."
              detail="Gluten-free wedding cake"
              quote="Nobody could tell it was gluten-free. Nobody."
            />
          </ul>
        </div>
      </section>

      {/* Bake club */}
      <section id="club" className="pg-section pg-band" style={band('var(--bbm-color-bg-lavender)')}>
        <div className="bbm-container pg-split">
          <div className="pg-stack" style={{ gap: 'var(--bbm-space-6)' }}>
            <SectionHeading
              eyebrow="Monthly subscription"
              title={
                <>
                  Join the <em>bake</em> club
                </>
              }
              description="Four seasonal treats and a handwritten recipe card from Mom, delivered by the 6th of every month. Skip or pause anytime."
            />
            <div className="pg-row" style={{ justifyContent: 'flex-start' }}>
              <Button size="lg" sticker>
                Join the club
              </Button>
              <Button size="lg" variant="ghost">
                Gift a box
              </Button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            <Ticket tone="lavender" stub="No. 001 · Bake club" style={{ maxWidth: 360 }}>
              <p className="bbm-text-eyebrow" style={{ margin: 0 }}>
                This month’s box
              </p>
              <p className="bbm-text-heading-md" style={{ margin: '6px 0' }}>
                Cherry season
              </p>
              <p className="bbm-text-body-sm" style={{ margin: 0 }}>
                Cherry hand pies, almond cookies, a jar of jam and Mom’s clafoutis recipe.
              </p>
            </Ticket>
            <PriceTag shape="tag" amount="$29/mo" label="Free delivery" tone="strawberry" size={84} rotate={-8} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pg-section">
        <div className="bbm-container bbm-container--narrow pg-stack">
          <SectionHeading align="center" eyebrow="FAQ" title="Good questions" />
          <Accordion
            exclusive
            items={[
              {
                title: 'How far ahead should I order?',
                content: <p>Three days for menu items, two weeks for custom celebration cakes.</p>,
                icon: <Doodle name="cupcake" />,
              },
              {
                title: 'Gluten-free or vegan?',
                content: (
                  <p>
                    Most cakes and cookies can be made gluten-free; vegan on request. Everything is made in a home
                    kitchen that also handles nuts, dairy and eggs.
                  </p>
                ),
                icon: <Doodle name="daisy" />,
              },
              {
                title: 'Do you deliver?',
                content: <p>Within 10 miles for orders over $40.</p>,
                icon: <Doodle name="heart" color="var(--bbm-color-cherry-500)" />,
              },
            ]}
          />
        </div>
      </section>

      <SiteFooter
        tagline="A home bakery run by Mom (and taste-tested by the whole family)."
        columns={footerColumns}
        newsletter={{
          title: 'The Sunday letter',
          description: 'One email a week: the menu, market dates and a recipe card.',
        }}
        bottom={footerBottom}
      />
    </div>
  );
}

const meta = {
  title: 'Pages/Home',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The homepage assembled only from system components. Section order follows the small-maker structure from September Sun (collections → story → markets → reviews → club → FAQ), with Nectar’s weekly schedule and Hopf Haus’s three-step ordering.',
      },
    },
  },
  tags: ['!autodocs'],
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {};
