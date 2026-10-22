import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteHeader } from '@bakesbymom/ui';
import { headerActions, navLinks } from '../assets/site';

const meta = {
  title: 'Components/Sections/SiteHeader',
  component: SiteHeader,
  args: {
    links: navLinks,
    actions: headerActions,
    announcement: 'Free local delivery on orders over $40 · Order by Wednesday for Saturday',
    variant: 'bar',
    layout: 'center',
    scallop: true,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['bar', 'capsule'] },
    layout: { control: 'inline-radio', options: ['center', 'start'] },
    logo: { control: false },
    actions: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Announcement strip, logo, navigation and actions. `layout="center"` puts the logo in the middle (Puzzle Pantry); `variant="capsule"` floats the whole nav in an outlined pill (Emily Jane). Below 768px the links collapse into a menu button with `aria-expanded`.',
      },
    },
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CenteredBar: Story = {};

export const LogoStart: Story = { args: { layout: 'start', scallop: false } };

export const Capsule: Story = {
  args: { variant: 'capsule', layout: 'start', announcement: undefined, scallop: false },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  parameters: { docs: { description: { story: 'On narrow screens the links collapse behind the menu button.' } } },
};
