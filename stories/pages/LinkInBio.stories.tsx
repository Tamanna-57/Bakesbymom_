import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Accordion,
  Button,
  Card,
  EdgeDivider,
  Logo,
  Marquee,
  PatternSurface,
  Polaroid,
  PriceTag,
  SectionHeading,
  StepList,
} from '@bakesbymom/ui';
import { art } from '../assets';
import './pages.css';

function LinkInBio() {
  return (
    <div className="pg-phone">
      <PatternSurface
        pattern="stripes"
        tone="blueberry"
        style={{ padding: '28px 20px 8px', display: 'grid', justifyItems: 'center', gap: 16 }}
      >
        <Logo variant="seal" size="sm" />
        <Polaroid
          src={art.strawberryCake}
          alt="This week’s strawberry layer cake"
          width={210}
          tape="gingham"
          rotate={-3}
          caption="this week’s cake"
        />
      </PatternSurface>
      <EdgeDivider shape="torn" color="var(--bbm-color-blueberry-200)" background="var(--bbm-color-bg-canvas)" />

      <div style={{ padding: '8px 20px 28px', display: 'grid', gap: 20 }}>
        <SectionHeading
          align="center"
          size="md"
          title={
            <>
              Hi, it’s <em>Mom</em>!
            </>
          }
          description="Home-baked cakes, cookies and pies. Order by Wednesday, pick up Saturday."
        />

        <div style={{ display: 'grid', gap: 10 }}>
          <Button fullWidth size="lg" href="#order">
            Order a cake
          </Button>
          <Button fullWidth size="lg" variant="secondary" href="#menu">
            This week’s menu
          </Button>
          <Button fullWidth size="lg" variant="soft" href="#club">
            Join the bake club
          </Button>
          <Button fullWidth size="lg" variant="soft" href="#markets">
            Market dates
          </Button>
        </div>

        <Marquee
          size="sm"
          tone="cherry"
          items={['Small batches', 'Real butter', 'Made with love']}
          pausable={false}
          style={{ borderRadius: 999 }}
        />

        <SectionHeading size="sm" eyebrow="What’s cooking" title="The menu" />
        <StepList
          variant="numbered"
          steps={[
            { title: 'Celebration cakes' },
            { title: 'Cookies by the dozen' },
            { title: 'Pies & tarts' },
            { title: 'Sunday sourdough' },
          ]}
        />

        <Card outline tone="strawberry" style={{ position: 'relative', paddingBottom: 56 }}>
          <p className="bbm-text-eyebrow" style={{ margin: 0 }}>
            Bake club
          </p>
          <p className="bbm-text-heading-md" style={{ margin: '6px 0' }}>
            A treat box every month
          </p>
          <p className="bbm-text-body-sm" style={{ margin: 0 }}>
            Four seasonal bakes and a recipe card from Mom.
          </p>
          <PriceTag
            shape="tag"
            amount="$29/mo"
            tone="butter"
            size={64}
            rotate={-6}
            style={{ position: 'absolute', right: 12, bottom: 10 }}
          />
        </Card>

        <Accordion
          tone="blueberry"
          exclusive
          items={[
            { title: 'Do you deliver?', content: <p>Within 10 miles for orders over $40.</p> },
            { title: 'Gluten-free?', content: <p>Most cakes and cookies, yes. Just ask.</p> },
          ]}
        />
      </div>
    </div>
  );
}

const meta = {
  title: 'Pages/Link in Bio',
  component: LinkInBio,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The Instagram bio page (Digital Wave Taplink reference): full-width pill CTAs, numbered menu rows, a key-tag price and a short FAQ, sized for a 390px phone.',
      },
    },
  },
  tags: ['!autodocs'],
} satisfies Meta<typeof LinkInBio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Phone: Story = {};
