import type { Meta, StoryObj } from '@storybook/react-vite';
import { Doodle, Marquee, TONES } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Content/Marquee',
  component: Marquee,
  args: {
    items: ['Cakes', 'Cookies', 'Pies', 'Breads', 'Little treats'],
    tone: 'cocoa',
    size: 'md',
    direction: 'forward',
    label: 'What we bake',
  },
  argTypes: {
    tone: { control: 'select', options: TONES },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    direction: { control: 'inline-radio', options: ['forward', 'reverse'] },
    separator: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The ribbon between sections, which appears in 9 of the 23 pins. Screen readers get the items once as a list; the moving copy is hidden. It pauses on hover and focus, has a pause button (WCAG 2.2.2), and stands still for people who prefer reduced motion.',
      },
    },
  },
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cocoa: Story = {};

export const Cherry: Story = {
  args: {
    tone: 'cherry',
    size: 'lg',
    items: ['Baked fresh daily', 'Order by Wednesday', 'Pick up Saturday'],
    separator: <Doodle name="heart" size="0.8em" />,
  },
};

export const SmallPromo: Story = {
  args: { tone: 'strawberry', size: 'sm', items: ['Free local delivery over $40', 'Gluten-free options available'] },
};

export const Double: Story = {
  render: (args) => (
    <div>
      <Marquee
        {...args}
        tone="blueberry"
        size="sm"
        items={['Old-school charm', 'Modern goodies', 'Hand-packed boxes']}
        label="Promises"
      />
      <Marquee
        {...args}
        tone="cocoa"
        size="sm"
        direction="reverse"
        items={['Small batches', 'Real butter', 'Made with love']}
        label="Ingredients"
      />
    </div>
  ),
};
