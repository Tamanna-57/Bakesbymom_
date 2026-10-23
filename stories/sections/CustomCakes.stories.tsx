import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomCakesSection, PackagesSection } from '../../apps/web/src/sections/blocks';
import { fromBoard } from './ref';

const meta = {
  title: 'Sections/Custom cakes',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: fromBoard(
          '**Lead: pin 15 (Nectar), the events section.** Occasions, a headline, three price shapes and one button; a taped, stickered photo on pink pinstripes. The package cards for the custom cakes page come from **pin 08**.',
          ['15', '08'],
          'custom-cakes.md',
        ),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The lead: price shapes and the taped photo panel. */
export const Lead: Story = { render: () => <CustomCakesSection /> };

/** Pin 08's key-tag package cards, for the custom cakes page. */
export const Packages: Story = { render: () => <PackagesSection /> };
