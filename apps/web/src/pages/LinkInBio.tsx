import {
  Accordion,
  Badge,
  Button,
  Doodle,
  EdgeDivider,
  Logo,
  PatternSurface,
  Polaroid,
  PriceTag,
  StepList,
  Ticket,
} from '@bakesbymom/ui';
import { art } from '../content';
import { bakery, cakeSizes, inr, whatsappLink } from '../content/bakery';
import { cakes, occasions } from '../content/catalog';
import { howToOrder, orderLink } from '../content/site';
import { treatCategories } from '../content/treats';
import './link-in-bio.css';

const external = { target: '_blank', rel: 'noreferrer' } as const;

const cherry = 'var(--bbm-color-bg-brand-deep)';
const canvas = 'var(--bbm-color-bg-canvas)';

/**
 * The Instagram bio page (/links), built the way pin 08 (Digital Wave taplink)
 * builds its mobile pages. A single column, centered on wider screens.
 */
export function LinkInBioPage() {
  const cheapest = Math.min(...cakes.map((cake) => cake.price));
  return (
    <main className="bio">
      {/* Hero: blue stripes, stamp card, cutout with floating pills (pin 08, section 1) */}
      <PatternSurface pattern="stripes" tone="blue" ground={canvas} className="bio__hero">
        <Ticket variant="stamp" tone="beige" className="bio__stamp">
          <h1 className="bio__logo">
            <Logo variant="stacked" size="md" />
          </h1>
          <p className="bbm-text-body-sm" style={{ margin: '8px 0 0' }}>
            A home bakery in {bakery.place}. Cakes, brownies, cookies and more, baked to order and 100% eggless.
          </p>
        </Ticket>
        <div className="bio__photo">
          <Polaroid
            src={art.mom}
            alt="Mom in her apron"
            tape="cherry"
            rotate={-3}
            width={200}
            caption="hi, it's Mom!"
          />
          <Badge className="bio__pill bio__pill--a" tone="pink" variant="solid">
            cakes
          </Badge>
          <Badge className="bio__pill bio__pill--b" tone="butter" variant="solid">
            cookies
          </Badge>
          <Badge className="bio__pill bio__pill--c" tone="blue" variant="solid">
            brownies
          </Badge>
        </div>
        <Button fullWidth size="lg" href={orderLink} {...external}>
          Order on WhatsApp
        </Button>
      </PatternSurface>

      {/* Links: torn edge into a cherry band (section 2) */}
      <EdgeDivider shape="torn" color={cherry} background={canvas} />
      <div className="bio__band">
        <Button fullWidth variant="secondary" href="/menu">
          Cakes by occasion
        </Button>
        <Button fullWidth variant="secondary" href="/menu#treats">
          Brownies, cookies & more
        </Button>
        <Button fullWidth variant="secondary" href={bakery.instagram} {...external}>
          This week's bakes on Instagram
        </Button>
        <Ticket variant="stamp" tone="beige" rotate={-2}>
          <ul className="bio__stats">
            <li>
              <strong>{occasions.length}</strong> occasions
            </li>
            <li>
              <strong>{treatCategories.length + 1}</strong> kinds of bakes
            </li>
            <li>
              <strong>100%</strong> eggless
            </li>
          </ul>
        </Ticket>
      </div>
      <EdgeDivider shape="torn" color={cherry} background={canvas} flip />

      {/* Folder tabs on grid paper (section 5) */}
      <PatternSurface pattern="grid" tone="pink" ground={canvas} className="bio__section">
        <h2 className="bbm-text-heading-md bio__title">
          How to order{' '}
          <Badge tone="cherry" variant="outline" size="sm">
            4 steps
          </Badge>
        </h2>
        <StepList variant="tabs" steps={howToOrder.map(({ title, description }) => ({ title, description }))} />
      </PatternSurface>

      {/* Key-tag price (section 6) */}
      <div className="bio__section">
        <a className="bio__club" href="/menu">
          <p className="bbm-text-eyebrow" style={{ margin: 0 }}>
            Cakes for every occasion
          </p>
          <p className="bbm-text-heading-md" style={{ margin: '6px 0' }}>
            Birthdays, anniversaries, festivals
          </p>
          <p className="bbm-text-body-sm" style={{ margin: 0 }}>
            {cakeSizes[0]!.label.split(' · ')[0]} to {cakeSizes[cakeSizes.length - 1]!.label.split(' · ')[0]}, in the
            flavour you want.
          </p>
          {cakes.length > 0 && (
            <PriceTag
              className="bio__key"
              shape="tag"
              amount={inr(cheapest)}
              label="from"
              tone="blue"
              size={64}
              rotate={-8}
            />
          )}
        </a>
      </div>

      {/* Pill FAQ (section 7) */}
      <div className="bio__section">
        <h2 className="bbm-text-heading-md bio__title">Quick questions</h2>
        <Accordion
          variant="pills"
          exclusive
          items={[
            {
              title: 'Is everything eggless?',
              content: <p>Yes, 100%. Every single thing carries the FSSAI green dot.</p>,
            },
            {
              title: 'How far ahead should I order?',
              content: <p>A day's notice where you can, and more for the tiered cakes.</p>,
            },
            {
              title: 'Pickup or delivery?',
              content: <p>Pick up from the kitchen in Panipat, or ask for delivery when you order.</p>,
            },
          ]}
        />
      </div>

      {/* Support prompt (section 8) */}
      <EdgeDivider shape="torn" color={cherry} background={canvas} />
      <div className="bio__band">
        <Ticket variant="stamp" tone="beige">
          <p style={{ margin: 0 }}>
            <strong>Not sure what to order?</strong> Write to Mom on WhatsApp and she'll help you pick a cake and answer
            anything about flavours, dates or delivery.
          </p>
        </Ticket>
        <Button fullWidth variant="soft" href={whatsappLink('Hello Bakes by Mom! I have a question 🙂')} {...external}>
          <Doodle name="heart" size={16} /> Message Mom on WhatsApp
        </Button>
      </div>
    </main>
  );
}
