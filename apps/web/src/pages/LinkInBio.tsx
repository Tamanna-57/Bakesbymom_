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
import './link-in-bio.css';

const cherry = 'var(--bbm-color-bg-brand-deep)';
const canvas = 'var(--bbm-color-bg-canvas)';

/**
 * The Instagram bio page (/links), built the way pin 08 (Digital Wave taplink)
 * builds its mobile pages. A single column, centered on wider screens.
 */
export function LinkInBioPage() {
  return (
    <main className="bio">
      {/* Hero: blue stripes, stamp card, cutout with floating pills (pin 08, section 1) */}
      <PatternSurface pattern="stripes" tone="blue" ground={canvas} className="bio__hero">
        <Ticket variant="stamp" tone="beige" className="bio__stamp">
          <h1 className="bio__logo">
            <Logo variant="stacked" size="md" />
          </h1>
          <p className="bbm-text-body-sm" style={{ margin: '8px 0 0' }}>
            Home-baked cakes, cookies and pies. Order by Wednesday, pick up Saturday.
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
            pies
          </Badge>
        </div>
        <Button fullWidth size="lg" href="/#custom">
          Order a cake
        </Button>
      </PatternSurface>

      {/* Links: torn edge into a cherry band (section 2) */}
      <EdgeDivider shape="torn" color={cherry} background={canvas} />
      <div className="bio__band">
        <Button fullWidth variant="secondary" href="/menu">
          This week's menu
        </Button>
        <Button fullWidth variant="secondary" href="/#find-us">
          Where to find us Saturday
        </Button>
        <Button fullWidth variant="secondary" href="/#club">
          Join the Bake Club
        </Button>
        <Ticket variant="stamp" tone="beige" rotate={-2}>
          <ul className="bio__stats">
            <li>
              <strong>30</strong> years of baking
            </li>
            <li>
              <strong>12</strong> bakes a week
            </li>
            <li>
              <strong>1</strong> kitchen
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
        <StepList
          variant="tabs"
          steps={[
            { title: 'Pick a bake', description: 'From the menu, or ask for a custom cake.' },
            { title: 'Choose a date', description: 'Order by Wednesday for Saturday.' },
            { title: 'Mom confirms', description: 'By email, with your pick-up time.' },
            { title: 'Pick it up', description: 'At the market or the kitchen door.' },
          ]}
        />
      </PatternSurface>

      {/* Key-tag price (section 6) */}
      <div className="bio__section">
        <div className="bio__club">
          <p className="bbm-text-eyebrow" style={{ margin: 0 }}>
            Bake Club
          </p>
          <p className="bbm-text-heading-md" style={{ margin: '6px 0' }}>
            A treat box every month
          </p>
          <p className="bbm-text-body-sm" style={{ margin: 0 }}>
            Four seasonal bakes and a recipe card from Mom.
          </p>
          <PriceTag className="bio__key" shape="tag" amount="$28" label="a month" tone="blue" size={64} rotate={-8} />
        </div>
      </div>

      {/* Pill FAQ (section 7) */}
      <div className="bio__section">
        <h2 className="bbm-text-heading-md bio__title">Quick questions</h2>
        <Accordion
          variant="pills"
          exclusive
          items={[
            { title: 'Do you deliver?', content: <p>Within 5 miles for $8; free on orders over $60.</p> },
            { title: 'Can it be gluten-free?', content: <p>Most cakes and cookies, yes. Just ask.</p> },
            {
              title: 'How far ahead should I order?',
              content: <p>A week for custom cakes, Wednesday for everything else.</p>,
            },
          ]}
        />
      </div>

      {/* Support prompt (section 8) */}
      <EdgeDivider shape="torn" color={cherry} background={canvas} />
      <div className="bio__band">
        <Ticket variant="stamp" tone="beige">
          <p style={{ margin: 0 }}>
            <strong>Not sure what to order?</strong> Write to Mom and she'll help you pick a cake and answer anything
            about allergies, dates or delivery.
          </p>
        </Ticket>
        <Button fullWidth variant="soft" href="mailto:hello@bakesbymom.com">
          <Doodle name="heart" size={16} /> Message Mom
        </Button>
      </div>
    </main>
  );
}
