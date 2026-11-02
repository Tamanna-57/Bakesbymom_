import type { Meta, StoryObj } from '@storybook/react-vite';
import { BakeWithMomSection } from '../../apps/web/src/sections/bake';
import { MeetMomSection, OrbitSection, ValuesRow, AboutCardSection } from '../../apps/web/src/sections/blocks';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/About',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          "**Lead: pin 05 (Pretty OK Studios), \"Meet Elia\".** Mom's photo in a scalloped frame on a polka-dot square, beside a tilted note with a candy-stripe border, signed in script (the signature idea is pin 03's). On the About page the story is **Bake it with Mom** (`sections/bake.tsx`); the **orbit** from pin 01 is kept here as an alternate; the **values** are pin 05's two cards; the **about card** with halftone cherries is pin 16's.",
          ['05', '01', '16', '03'],
          'about.md',
        ),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The lead: Meet Mom. */
export const MeetMom: Story = { render: () => <MeetMomSection /> };

/**
 * The About page's story: bake a cake with Mom. Scrolling walks through six steps while the light moves from
 * sunrise to night; tap the egg, type a name for the cake, and the last step opens WhatsApp with it.
 */
export const BakeWithMom: Story = { render: () => <BakeWithMomSection /> };

/** Pin 01's orbit, an alternate story block (no longer on the About page). */
export const OurStory: Story = { render: () => <OrbitSection /> };

/** Pin 05's two value cards. */
export const Values: Story = {
  render: () => (
    <div className="site-section">
      <div className="site-container">
        <ValuesRow />
      </div>
    </div>
  ),
};

/** Pin 16's outlined card with a heavy + script title and halftone cherries. */
export const AboutCard: Story = { render: () => <AboutCardSection /> };
