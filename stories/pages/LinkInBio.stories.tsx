import type { Meta, StoryObj } from '@storybook/react-vite';
import { LinkInBioPage } from '../../apps/web/src/pages/LinkInBio';
import { fromBoard } from '../sections/ref';
import './pages.css';

// The live /links page (apps/web), in a phone frame.
function LinkInBio() {
  return (
    <div className="pg-phone">
      <LinkInBioPage />
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
