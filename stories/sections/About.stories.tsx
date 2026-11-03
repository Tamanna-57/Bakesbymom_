import type { Meta, StoryObj } from '@storybook/react-vite';
import { MeetMomSection, OrbitSection, ValuesRow, AboutCardSection } from '../../apps/web/src/sections/blocks';
import { StoryLetter, StoryMenu, StoryTray } from '../../apps/web/src/sections/story';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/About',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          "**Lead: pin 05 (Pretty OK Studios), \"Meet Elia\".** Mom's photo in a scalloped frame on a polka-dot square, beside a tilted note with a candy-stripe border, signed in script (the signature idea is pin 03's). The About page itself is `sections/story.tsx` (a letter, a tray of Mom's cakes and a menu card, after three posters); the **orbit** from pin 01 is kept here as an alternate; the **values** are pin 05's two cards; the **about card** with halftone cherries is pin 16's.",
          ['05', '01', '16', '03'],
          'about.md',
        ),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Our story, 1: a letter from Mom on linen, with flourishes, stamps and a wax seal (the "Dawning Drift" flyer). */
export const Letter: Story = { render: () => <StoryLetter /> };

/** Our story, 2: Mom's cakes as stickers on a silver tray, with the key in an oval (the "Sweet Rise" poster). */
export const Tray: Story = { render: () => <StoryTray /> };

/** Our story, 3: her promises as a menu card on red gingham (the "desserts & Pastries" menu). */
export const Menu: Story = { render: () => <StoryMenu /> };

/** The earlier Meet Mom, with the drawn portrait (no longer on the About page). */
export const MeetMom: Story = { render: () => <MeetMomSection /> };

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
