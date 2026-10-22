import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from '@bakesbymom/ui';

const meta = {
  title: 'Components/Primitives/Select',
  component: Select,
  args: {
    label: 'Cake size',
    placeholder: 'Choose a size',
    hint: 'Prices include a handwritten message.',
    options: [
      { value: '6', label: '6 inch · serves 8 · $38' },
      { value: '8', label: '8 inch · serves 14 · $54' },
      { value: '10', label: '10 inch · serves 22 · $72' },
      { value: 'tier', label: 'Two tiers · ask Mom', disabled: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        component:
          'A styled native `<select>`, so it stays accessible, mobile-friendly and form-compatible. It shares its label, hint and error layout with TextField.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: 'Please choose a size.', hint: undefined },
};
