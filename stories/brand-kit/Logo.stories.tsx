import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from '@bakesbymom/ui';

const meta = {
  title: 'Brand kit/Logo',
  component: Logo,
  args: { variant: 'horizontal', size: 'md', tone: 'brand' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['horizontal', 'stacked', 'seal', 'monogram'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    tone: { control: 'inline-radio', options: ['brand', 'ink', 'inverse'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The wordmark from the brand kit: **Bakes** in Fraunces 700 with `SOFT 100`, **by Mom** in Pinyon Script, and a heart, all cherry. `horizontal` is the primary lockup (nav, documents); `stacked` overlaps the two words like the heavy + script lockups of pins 10 and 16 (footer, avatars); `seal` puts it inside ring text like the seals of pins 03 and 10 (box stickers, the chat launcher); `monogram` is "BM" on a cherry circle like pin 12\'s footer mark (favicons). Announced once as "Bakes by Mom".',
      },
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const Stacked: Story = { args: { variant: 'stacked', size: 'lg' } };
export const SealMark: Story = { args: { variant: 'seal', size: 'lg' } };
export const Monogram: Story = { args: { variant: 'monogram', size: 'lg' } };
export const OnCocoa: Story = { args: { tone: 'inverse' }, globals: { backgrounds: { value: 'cocoa' } } };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16, justifyItems: 'start' }}>
      <Logo {...args} size="sm" />
      <Logo {...args} size="md" />
      <Logo {...args} size="lg" />
    </div>
  ),
};
