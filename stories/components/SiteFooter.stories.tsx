import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteFooter } from '@bakesbymom/ui';
import { footerBottom, footerColumns } from '../assets/site';

const meta = {
  title: 'Components/Sections/SiteFooter',
  component: SiteFooter,
  args: {
    tagline: 'A home bakery run by Mom (and taste-tested by the whole family).',
    columns: footerColumns,
    newsletter: {
      title: 'The Sunday letter',
      description: 'One email a week: the menu, market dates and a recipe card.',
      onSubmit: () => new Promise<void>((resolve) => setTimeout(resolve, 600)),
    },
    bottom: footerBottom,
    edge: 'scallop',
  },
  argTypes: {
    edge: { control: 'inline-radio', options: ['scallop', 'wave', 'none'] },
    logo: { control: false },
    bottom: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A cocoa footer with a scalloped top edge, link columns, a newsletter sign-up (with loading and thank-you states) and small print for allergen and licensing notes.',
      },
    },
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WaveEdge: Story = { args: { edge: 'wave', newsletter: undefined } };
