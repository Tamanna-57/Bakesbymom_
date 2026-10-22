import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteHeader } from './SiteHeader';

describe('SiteHeader', () => {
  const links = [
    { label: 'Menu', href: '/menu', current: true },
    { label: 'Custom cakes', href: '/custom' },
  ];

  it('renders a labelled nav with the current page marked', () => {
    render(<SiteHeader links={links} />);
    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(nav).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Menu' }).getAttribute('aria-current')).toBe('page');
    expect(screen.getByRole('link', { name: 'Bakes by Mom' }).getAttribute('href')).toBe('/');
  });

  it('toggles the mobile menu with aria-expanded', () => {
    render(<SiteHeader links={links} />);
    const toggle = screen.getByRole('button', { name: 'Menu' });
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(toggle.getAttribute('aria-controls')).toBe(screen.getByRole('navigation').id);
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });
});
