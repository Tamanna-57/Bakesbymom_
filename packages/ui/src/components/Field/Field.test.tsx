import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Select } from './Select';
import { TextField } from './TextField';

describe('TextField', () => {
  it('associates the label, hint and error with the control', () => {
    render(<TextField label="Name on the cake" hint="Up to 20 letters" error="Please add a name" />);
    const input = screen.getByLabelText('Name on the cake');
    expect(input.tagName).toBe('INPUT');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    const describedBy = input.getAttribute('aria-describedby')?.split(' ') ?? [];
    expect(describedBy).toHaveLength(2);
    expect(document.getElementById(describedBy[0]!)?.textContent).toBe('Up to 20 letters');
    expect(document.getElementById(describedBy[1]!)?.textContent).toBe('Please add a name');
  });

  it('renders a textarea when multiline', () => {
    render(<TextField multiline label="Order notes" />);
    expect(screen.getByLabelText('Order notes').tagName).toBe('TEXTAREA');
  });

  it('keeps a visually hidden label accessible', () => {
    render(<TextField label="Email" hideLabel type="email" />);
    const input = screen.getByLabelText('Email');
    expect(input.getAttribute('type')).toBe('email');
    expect(input.getAttribute('aria-invalid')).toBeNull();
  });
});

describe('Select', () => {
  it('renders options with a disabled placeholder selected by default', () => {
    render(
      <Select
        label="Cake size"
        placeholder="Choose a size"
        options={[
          { value: '6', label: '6 inch, serves 8' },
          { value: '8', label: '8 inch, serves 14' },
        ]}
      />,
    );
    const select = screen.getByLabelText('Cake size') as HTMLSelectElement;
    expect(select.value).toBe('');
    expect(select.options).toHaveLength(3);
    expect(select.options[0]?.disabled).toBe(true);
  });
});
