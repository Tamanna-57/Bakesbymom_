import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { Badge, Doodle, Logo, PatternSurface, Polaroid, Seal, Ticket } from '@bakesbymom/ui';
import { art } from '../assets';
import './pages.css';

/** New flavor (Raspberry Macaron reference): butter + raspberry, outline type, NEW badge. */
function NewFlavor() {
  return (
    <div className="pg-post" style={{ background: 'var(--bbm-color-butter-100)' }}>
      <div
        className="bbm-text-outline"
        style={
          {
            position: 'absolute',
            left: 14,
            top: 18,
            writingMode: 'vertical-rl',
            rotate: '180deg',
            fontFamily: 'var(--bbm-font-family-display)',
            fontWeight: 900,
            fontSize: 64,
            lineHeight: 1,
            letterSpacing: '0.02em',
            '--bbm-outline-color': 'var(--bbm-color-strawberry-400)',
          } as CSSProperties
        }
      >
        MACARONS
      </div>
      <div style={{ marginLeft: 72, display: 'grid', gap: 10 }}>
        <Badge tone="cherry" variant="solid" shape="tape">
          New flavor
        </Badge>
        <div
          className="bbm-font-soft"
          style={{
            fontFamily: 'var(--bbm-font-family-display)',
            fontWeight: 900,
            fontSize: 54,
            lineHeight: 0.92,
            color: 'var(--bbm-color-cherry-700)',
          }}
        >
          Raspberry
          <br />
          rose
        </div>
        <p className="bbm-text-script-md" style={{ margin: 0, color: 'var(--bbm-color-strawberry-700)' }}>
          macarons
        </p>
      </div>
      <img
        src={art.macarons}
        alt=""
        className="bbm-sticker-cutout"
        style={{ width: 250, position: 'absolute', right: -10, bottom: 36, borderRadius: '50%' }}
      />
      <p
        className="bbm-text-eyebrow"
        style={{ position: 'absolute', left: 92, bottom: 28, margin: 0, color: 'var(--bbm-color-cocoa-700)' }}
      >
        This weekend only
      </p>
    </div>
  );
}

/** Weekend promo (Bolo de Morango reference): stripes, big word behind, script in front, edge tab. */
function WeekendPromo() {
  return (
    <PatternSurface
      pattern="stripes"
      tone="strawberry"
      className="pg-post"
      style={{
        boxShadow:
          'inset 0 0 0 12px var(--bbm-color-cream-50), inset 0 0 0 13.5px var(--bbm-color-cherry-600), var(--bbm-shadow-overlay)',
      }}
    >
      <div style={{ position: 'relative', textAlign: 'center', marginTop: 18 }}>
        <div
          className="bbm-font-soft"
          style={{
            fontFamily: 'var(--bbm-font-family-display)',
            fontWeight: 900,
            fontSize: 88,
            lineHeight: 0.9,
            color: 'var(--bbm-color-pistachio-300)',
            letterSpacing: '-0.03em',
          }}
        >
          PROMO
        </div>
        <div
          style={{
            position: 'absolute',
            inset: '28px 0 auto',
            fontFamily: 'var(--bbm-font-family-script)',
            fontSize: 62,
            color: 'var(--bbm-color-cherry-600)',
          }}
        >
          Strawberry cake
        </div>
      </div>
      <img
        src={art.strawberryCake}
        alt=""
        className="bbm-sticker-cutout"
        style={{ width: 280, margin: '0 auto', borderRadius: 32 }}
      />
      <Badge
        tone="cherry"
        variant="solid"
        shape="tab"
        style={{ position: 'absolute', left: 13.5, top: 300, fontSize: 18, minHeight: 44 }}
      >
        10% off
      </Badge>
      <Seal
        shape="oval"
        text="Impossible to eat just one slice"
        tone="strawberry"
        size={86}
        style={{ position: 'absolute', right: 26, bottom: 30, rotate: '-8deg' }}
      />
    </PatternSurface>
  );
}

/** New bake drop (Cloche Reveal reference): grid paper, polaroid, doodles, seal. */
function BakeDrop() {
  return (
    <PatternSurface
      pattern="grid"
      tone="strawberry"
      className="pg-post"
      ground="var(--bbm-color-strawberry-50)"
      style={{ alignItems: 'center', justifyContent: 'center', gap: 12 }}
    >
      <p className="bbm-text-eyebrow" style={{ margin: 0, color: 'var(--bbm-color-cherry-700)' }}>
        Drops Friday 8am
      </p>
      <Polaroid src={art.cherryPie} alt="" width={240} tape="gingham" rotate={-4} caption="something new…" />
      <span style={{ position: 'absolute', left: 40, top: 70, color: 'var(--bbm-color-cherry-500)' }}>
        <Doodle name="heart" size={34} />
      </span>
      <span style={{ position: 'absolute', right: 52, top: 120, color: 'var(--bbm-color-cherry-500)' }}>
        <Doodle name="sparkle" size={28} />
      </span>
      <Seal
        text="Sour cherry pie • Sour cherry pie • "
        size={104}
        tone="cherry"
        style={{ position: 'absolute', right: 22, bottom: 28 }}
      >
        <Doodle name="cherry" size={36} color="var(--bbm-color-cream-50)" />
      </Seal>
      <Logo size="sm" style={{ position: 'absolute', left: 26, bottom: 26 }} />
    </PatternSurface>
  );
}

/** Baking class (Spring Bouquet reference): clipped flyer + stamped date. */
function BakingClass() {
  return (
    <PatternSurface pattern="gingham" tone="pistachio" className="pg-post" style={{ justifyContent: 'center' }}>
      <div
        style={{
          position: 'relative',
          background: 'var(--bbm-color-bg-surface)',
          border: '1.5px solid var(--bbm-color-border-default)',
          borderRadius: 8,
          padding: 24,
          boxShadow: 'var(--bbm-shadow-sticker-md)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--bbm-font-family-display)',
            fontWeight: 700,
            fontSize: 30,
            lineHeight: 1,
            color: 'var(--bbm-color-pistachio-800)',
            textTransform: 'uppercase',
          }}
        >
          Cupcake
        </p>
        <p
          style={{
            margin: '-4px 0 8px',
            fontFamily: 'var(--bbm-font-family-script)',
            fontSize: 52,
            lineHeight: 1,
            color: 'var(--bbm-color-cherry-600)',
          }}
        >
          Workshop
        </p>
        <ul className="bbm-text-body-sm" style={{ margin: 0, paddingInlineStart: 18, maxWidth: 170 }}>
          <li>Mix, bake and pipe with Mom</li>
          <li>All tools and ingredients</li>
          <li>Take home a box of six</li>
        </ul>
        <p className="bbm-text-price" style={{ margin: '12px 0 0' }}>
          $45 · 8 seats
        </p>
        <Polaroid
          src={art.cupcake}
          alt=""
          width={112}
          rotate={6}
          tape="cherry"
          style={{ position: 'absolute', right: 14, bottom: 18 }}
        />
      </div>
      <Ticket variant="stamp" tone="butter" rotate={8} style={{ position: 'absolute', right: 18, top: 26, width: 150 }}>
        <p className="bbm-text-eyebrow" style={{ margin: 0 }}>
          Sun 8 March
        </p>
        <p className="bbm-text-heading-sm" style={{ margin: '4px 0 0' }}>
          10am–noon
        </p>
      </Ticket>
    </PatternSurface>
  );
}

/** Type sandwich (Strawberry Cheesecake reference): giant words top and bottom, checker band. */
function TypeSandwich() {
  const giant = {
    fontFamily: 'var(--bbm-font-family-display)',
    fontVariationSettings: 'var(--bbm-font-variation-soft)',
    fontWeight: 900,
    fontSize: 64,
    lineHeight: 0.9,
    color: 'var(--bbm-color-cherry-800)',
    margin: 0,
    textAlign: 'center',
  } as const;
  return (
    <div className="pg-post" style={{ background: 'var(--bbm-color-cream-200)', gap: 14 }}>
      <p style={giant}>CHERRY</p>
      <div style={{ position: 'relative', borderBlock: '2px solid var(--bbm-color-cherry-800)', paddingBlock: 10 }}>
        <PatternSurface pattern="checker" tone="cherry" scale="sm" style={{ height: 150 }} />
        <img
          src={art.cherryPie}
          alt=""
          className="bbm-sticker-cutout"
          style={{ position: 'absolute', right: 6, top: -6, width: 190, borderRadius: '50%' }}
        />
      </div>
      <p className="bbm-text-body-md" style={{ margin: 0, color: 'var(--bbm-color-cherry-800)' }}>
        Sour cherries, an all-butter lattice and a whisper of almond. Out of the oven every Saturday at nine.
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <Badge tone="cherry" variant="solid" shape="tape">
          Saturdays · 9am
        </Badge>
        <Logo size="sm" />
      </div>
      <p style={giant}>PIE DAY</p>
    </div>
  );
}

function SocialPosts() {
  return (
    <div className="pg-posts">
      <NewFlavor />
      <WeekendPromo />
      <BakeDrop />
      <BakingClass />
      <TypeSandwich />
    </div>
  );
}

const meta = {
  title: 'Pages/Social Posts',
  component: SocialPosts,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Instagram feed templates (4:5) built from system components, one per poster reference: New flavor (Raspberry Macaron), Weekend promo (Bolo de Morango), New bake drop (Cloche Reveal), Baking class (Spring Bouquet) and Type sandwich (Strawberry Cheesecake). Social posts may be busier than the website, but they still use one palette.',
      },
    },
  },
  tags: ['!autodocs'],
} satisfies Meta<typeof SocialPosts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Templates: Story = {};
