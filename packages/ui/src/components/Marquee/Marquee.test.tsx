import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Marquee } from './Marquee';

describe('Marquee', () => {
  it('exposes each item once to assistive tech and hides the moving copies', () => {
    const { container } = render(<Marquee label="What we bake" items={['Cakes', 'Cookies', 'Pies']} />);
    expect(screen.getByRole('region', { name: 'What we bake' })).toBeTruthy();
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['Cakes', 'Cookies', 'Pies']);
    expect(container.querySelector('.bbm-marquee__track')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('can be paused (WCAG 2.2.2)', () => {
    const { container } = render(<Marquee items={['Cakes']} />);
    const toggle = screen.getByRole('button', { name: 'Pause scrolling text' });
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(container.firstElementChild?.className).toContain('bbm-marquee--paused');
  });
});
