import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './blocks';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/Footer',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          '**Lead: pin 03 (Emily Jane).** A cocoa band with links on the left, the stacked logo centered with socials and contact details (pin 04), and the newsletter on the right, under a wave edge (pin 06). The small print always carries the allergen statement.',
          ['03', '04', '06'],
          'footer.md',
        ),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The lead. */
export const Lead: Story = { render: () => <Footer /> };
