import { Button, type FooterColumn, type NavLink } from '@bakesbymom/ui';

export const navLinks: NavLink[] = [
  { label: 'Menu', href: '#menu' },
  { label: 'Custom cakes', href: '#custom' },
  { label: 'Bake club', href: '#club' },
  { label: 'Find us', href: '#find-us' },
  { label: 'Our story', href: '#story' },
];

export const headerActions = (
  <Button size="sm" href="#order">
    Order now
  </Button>
);

export const footerColumns: FooterColumn[] = [
  {
    title: 'Shop',
    links: [
      { label: 'This week’s menu', href: '#menu' },
      { label: 'Celebration cakes', href: '#custom' },
      { label: 'Bake club', href: '#club' },
      { label: 'Gift cards', href: '#gift' },
    ],
  },
  {
    title: 'Hello',
    links: [
      { label: 'Our story', href: '#story' },
      { label: 'Markets & pick-up', href: '#find-us' },
      { label: 'Allergens', href: '#allergens' },
      { label: 'Instagram', href: '#instagram' },
    ],
  },
];

export const footerBottom = (
  <span>
    © 2026 Bakes by Mom · Baked in a home kitchen that also handles nuts, dairy, eggs and wheat. Made with love (and
    real butter).
  </span>
);
