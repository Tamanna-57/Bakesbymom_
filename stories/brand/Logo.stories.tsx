import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from '@bakesbymom/ui';

const meta = {
  title: 'Brand/Logo',
  component: Logo,
  args: { variant: 'horizontal', size: 'md', tone: 'brand' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['horizontal', 'stacked', 'seal'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    tone: { control: 'inline-radio', options: ['brand', 'ink', 'inverse'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The wordmark: **Bakes** in puffy Fraunces (`SOFT 100`) and **by Mom** in a copperplate signature, plus a heart. Use `horizontal` in headers, `stacked` in square spaces (social avatars) and `seal` on stickers, boxes and packaging. The logo is announced once as "Bakes by Mom".',
      },
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const Stacked: Story = { args: { variant: 'stacked', size: 'lg' } };
export const SealMark: Story = { args: { variant: 'seal', size: 'lg' } };
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
