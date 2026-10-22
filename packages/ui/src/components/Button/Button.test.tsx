import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders a type="button" by default so it never submits forms by accident', () => {
    render(<Button>Order now</Button>);
    const button = screen.getByRole('button', { name: 'Order now' });
    expect(button.getAttribute('type')).toBe('button');
    expect(button.className).toContain('bbm-button--primary');
  });

  it('renders a link when given an href', () => {
    render(
      <Button href="/menu" variant="secondary">
        See the menu
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'See the menu' });
    expect(link.getAttribute('href')).toBe('/menu');
    expect(link.className).toContain('bbm-button--secondary');
  });

  it('is disabled and busy while loading, and ignores clicks', () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Placing order
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Placing order' });
    expect(button).toHaveProperty('disabled', true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('hides decorative icons from assistive technology', () => {
    render(<Button leadingIcon={<svg data-testid="icon" />}>Add</Button>);
    expect(screen.getByTestId('icon').parentElement?.getAttribute('aria-hidden')).toBe('true');
  });

  it('forwards refs (React 19 ref-as-prop)', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
