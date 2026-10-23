import type { Meta, StoryObj } from '@storybook/react-vite';
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
import { art } from '../assets';
import { fromBoard } from '../sections/ref';
import './pages.css';

const cherry = 'var(--bbm-color-bg-brand-deep)';
const canvas = 'var(--bbm-color-bg-canvas)';

function LinkInBio() {
  return (
    <div className="pg-phone">
      {/* Hero: blue stripes, stamp card, cutout with floating pills (pin 08, section 1) */}
      <PatternSurface pattern="stripes" tone="blue" ground={canvas} className="pg-bio__hero">
        <Ticket variant="stamp" tone="beige" className="pg-bio__stamp">
          <Logo variant="stacked" size="md" />
          <p className="bbm-text-body-sm" style={{ margin: '8px 0 0' }}>
            Home-baked cakes, cookies and pies. Order by Wednesday, pick up Saturday.
          </p>
        </Ticket>
        <div className="pg-bio__photo">
          <Polaroid
            src={art.mom}
            alt="Mom in her apron"
            tape="cherry"
            rotate={-3}
            width={200}
            caption="hi, it's Mom!"
          />
          <Badge className="pg-bio__pill pg-bio__pill--a" tone="pink" variant="solid">
            cakes
          </Badge>
          <Badge className="pg-bio__pill pg-bio__pill--b" tone="butter" variant="solid">
            cookies
          </Badge>
          <Badge className="pg-bio__pill pg-bio__pill--c" tone="blue" variant="solid">
            pies
          </Badge>
        </div>
        <Button fullWidth size="lg" href="#order">
          Order a cake
        </Button>
      </PatternSurface>

      {/* Links: torn edge into a cherry band (section 2) */}
      <EdgeDivider shape="torn" color={cherry} background={canvas} />
      <div className="pg-bio__band">
        <Button fullWidth variant="secondary" href="#menu">
          This week's menu
        </Button>
        <Button fullWidth variant="secondary" href="#find-us">
          Where to find us Saturday
        </Button>
        <Button fullWidth variant="secondary" href="#club">
          Join the Bake Club
        </Button>
        <Ticket variant="stamp" tone="beige" rotate={-2}>
          <ul className="pg-bio__stats">
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
      <PatternSurface pattern="grid" tone="pink" ground={canvas} className="pg-bio__section">
        <h2 className="bbm-text-heading-md pg-bio__title">
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
      <div className="pg-bio__section">
        <div className="pg-bio__club">
          <p className="bbm-text-eyebrow" style={{ margin: 0 }}>
            Bake Club
          </p>
          <p className="bbm-text-heading-md" style={{ margin: '6px 0' }}>
            A treat box every month
          </p>
          <p className="bbm-text-body-sm" style={{ margin: 0 }}>
            Four seasonal bakes and a recipe card from Mom.
          </p>
          <PriceTag
            className="pg-bio__key"
            shape="tag"
            amount="$28"
            label="a month"
            tone="blue"
            size={64}
            rotate={-8}
          />
        </div>
      </div>

      {/* Pill FAQ (section 7) */}
      <div className="pg-bio__section">
        <h2 className="bbm-text-heading-md pg-bio__title">Quick questions</h2>
        <Accordion
          variant="pills"
          exclusive
          items={[
            { title: 'Do you deliver?', content: <p>Within 10 miles for orders over $40.</p> },
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
      <div className="pg-bio__band">
        <Ticket variant="stamp" tone="beige">
          <p style={{ margin: 0 }}>
            <strong>Not sure what to order?</strong> Write to Mom and she'll help you pick a cake and answer anything
            about allergies, dates or delivery.
          </p>
        </Ticket>
        <Button fullWidth variant="soft" href="#chat">
          <Doodle name="heart" size={16} /> Message Mom
        </Button>
      </div>
    </div>
  );
}

const meta = {
  title: 'Pages/Link in bio',
  component: LinkInBio,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          'The Instagram bio page, built the way **pin 08 (Digital Wave taplink)** builds its mobile pages: a stamp-edged card on blue stripes, full-width pill links on a torn cherry band, numbered folder tabs on grid paper, a key-tag price, pill FAQ rows and a support prompt at the bottom. Sized for a 390px phone.',
          ['08'],
        ),
      },
    },
  },
  tags: ['!autodocs'],
} satisfies Meta<typeof LinkInBio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Phone: Story = {};
