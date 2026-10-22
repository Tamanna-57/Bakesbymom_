import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EdgeDivider } from './EdgeDivider/EdgeDivider';
import { Logo } from './Logo/Logo';
import { PriceTag } from './PriceTag/PriceTag';
import { ProductCard } from './ProductCard/ProductCard';
import { ReviewCard } from './ReviewCard/ReviewCard';
import { Seal } from './Seal/Seal';
import { StepList } from './StepList/StepList';
import { Doodle } from './Doodle/Doodle';

describe('content components', () => {
  it('ProductCard renders a heading link that covers the card', () => {
    render(
      <ProductCard
        name="Strawberry layer cake"
        href="/cakes/strawberry"
        price="$38"
        image={{ src: 'cake.jpg', alt: 'A slice of strawberry cake' }}
      />,
    );
    const heading = screen.getByRole('heading', { level: 3, name: 'Strawberry layer cake' });
    expect(heading.querySelector('a')?.getAttribute('href')).toBe('/cakes/strawberry');
    expect(screen.getByRole('img', { name: 'A slice of strawberry cake' })).toBeTruthy();
    expect(screen.getByText('$38')).toBeTruthy();
  });

  it('ReviewCard announces the rating in words', () => {
    render(<ReviewCard quote="The best birthday cake we've ever had." author="Priya" rating={5} />);
    expect(screen.getByRole('img', { name: 'Rated 5 out of 5' })).toBeTruthy();
    expect(screen.getByText('Priya')).toBeTruthy();
  });

  it('Seal is a single labelled image', () => {
    render(<Seal text="Baked fresh daily • " label="Baked fresh daily" />);
    expect(screen.getByRole('img', { name: 'Baked fresh daily' })).toBeTruthy();
  });

  it('PriceTag keeps the price as real text', () => {
    render(<PriceTag amount="$399" label="Cart fee" />);
    expect(screen.getByText('$399')).toBeTruthy();
    expect(screen.getByText('Cart fee')).toBeTruthy();
  });

  it('EdgeDivider is decorative and uses a unique pattern id per instance', () => {
    const { container } = render(
      <>
        <EdgeDivider shape="scallop" />
        <EdgeDivider shape="wave" />
      </>,
    );
    const svgs = container.querySelectorAll('svg');
    svgs.forEach((svg) => expect(svg.getAttribute('aria-hidden')).toBe('true'));
    const ids = [...container.querySelectorAll('pattern')].map((p) => p.id);
    expect(new Set(ids).size).toBe(2);
    ids.forEach((id) => expect(id).toMatch(/^[a-zA-Z0-9_-]+$/));
  });

  it('Logo has one accessible name', () => {
    render(<Logo />);
    expect(screen.getByRole('img', { name: 'Bakes by Mom' })).toBeTruthy();
  });

  it('StepList is an ordered list', () => {
    render(
      <StepList steps={[{ title: 'Choose your bake' }, { title: 'Pick a date' }, { title: 'Collect it warm' }]} />,
    );
    expect(screen.getByRole('list').tagName).toBe('OL');
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('Doodle is decorative unless titled', () => {
    const { container } = render(<Doodle name="heart" />);
    expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
    render(<Doodle name="cherry" title="Cherry" />);
    expect(screen.getByRole('img', { name: 'Cherry' })).toBeTruthy();
  });
});
