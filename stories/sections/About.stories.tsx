import type { Meta, StoryObj } from '@storybook/react-vite';
import { MeetMomSection, OrbitSection, ValuesRow, AboutCardSection } from './blocks';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/About',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          "**Lead: pin 05 (Pretty OK Studios), \"Meet Elia\".** Mom's photo in a scalloped frame on a polka-dot square, beside a tilted note with a candy-stripe border, signed in script (the signature idea is pin 03's). The **orbit** from pin 01 tells the story on the About page; the **values** are pin 05's two cards; the **about card** with halftone cherries is pin 16's.",
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

/** Pin 01's orbit, for the About page. */
export const OurStory: Story = { render: () => <OrbitSection /> };

/** Pin 05's two value cards. */
export const Values: Story = {
  render: () => (
    <div className="sb-section">
      <div className="sb-container">
        <ValuesRow />
      </div>
    </div>
  ),
};

/** Pin 16's outlined card with a heavy + script title and halftone cherries. */
export const AboutCard: Story = { render: () => <AboutCardSection /> };
