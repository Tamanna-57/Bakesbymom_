import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Accordion } from './Accordion';

const items = [
  { title: 'Do you deliver?', content: 'Yes, within 10 miles.' },
  { title: 'Can you make it gluten-free?', content: 'Most of the menu, yes.' },
];

describe('Accordion', () => {
  it('uses native details/summary disclosure', () => {
    const { container } = render(<Accordion items={items} defaultOpen={[1]} />);
    const details = container.querySelectorAll('details');
    expect(details).toHaveLength(2);
    expect(details[0]?.open).toBe(false);
    expect(details[1]?.open).toBe(true);
    expect(screen.getByText('Do you deliver?').closest('summary')).not.toBeNull();
  });

  it('groups items with a shared name when exclusive', () => {
    const { container } = render(<Accordion items={items} exclusive />);
    const names = [...container.querySelectorAll('details')].map((d) => d.getAttribute('name'));
    expect(names[0]).toBeTruthy();
    expect(new Set(names).size).toBe(1);
  });
});
