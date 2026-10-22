import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Select, TextField } from '@bakesbymom/ui';

// TextField's props are a union (input | textarea), so stories are typed against the component.
const meta: Meta<typeof TextField> = {
  title: 'Components/Primitives/TextField',
  component: TextField,
  args: {
    label: 'Name on the cake',
    placeholder: 'Happy birthday, June!',
    hint: 'Up to 24 letters, piped in buttercream.',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Pill inputs on raised white. Labels are always present (visually hidden with `hideLabel` if you must), and hints and errors are linked with `aria-describedby`. Pass `multiline` for a textarea.',
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
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    hint: undefined,
    error: 'Please enter an email so we can confirm your order.',
  },
};

export const Multiline: Story = {
  args: {
    multiline: true,
    label: 'Order notes',
    optional: true,
    placeholder: 'Allergies, colors, a theme…',
    hint: undefined,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Saturday 9am – 1pm',
    label: 'Pick-up window',
    hint: 'Set by the order date.',
    readOnly: true,
  },
};

export const OrderForm: Story = {
  render: () => (
    <form style={{ display: 'grid', gap: 16 }} onSubmit={(e) => e.preventDefault()}>
      <TextField label="Your name" autoComplete="name" />
      <TextField label="Email" type="email" autoComplete="email" />
      <Select
        label="Cake"
        placeholder="Pick a cake"
        options={[
          { value: 'strawberry', label: 'Strawberry layer cake' },
          { value: 'chocolate', label: 'Chocolate fudge cake' },
        ]}
      />
      <TextField label="Pick-up date" type="date" />
      <TextField multiline label="Message on the cake" optional rows={2} />
      <Button type="submit" fullWidth>
        Request this cake
      </Button>
    </form>
  ),
};
