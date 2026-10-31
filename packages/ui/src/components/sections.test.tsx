import * as React from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Accordion } from './Accordion/Accordion';
import { ChatWidget, type ChatMessage } from './ChatWidget/ChatWidget';
import { FilterChips } from './FilterChips/FilterChips';
import { Gallery } from './Gallery/Gallery';
import { NewsletterSignup } from './NewsletterSignup/NewsletterSignup';
import { Orbit } from './Orbit/Orbit';
import { PricingCard } from './PricingCard/PricingCard';
import { SectionHeading } from './SectionHeading/SectionHeading';
import { StepList } from './StepList/StepList';
import { WeekSchedule } from './WeekSchedule/WeekSchedule';

const photos = ['Strawberry cake', 'Cookies', 'Pie', 'Bread', 'Cupcakes'].map((alt) => ({
  src: `${alt}.jpg`,
  alt,
  caption: `${alt} caption`,
}));

describe('Gallery (strips)', () => {
  it('opens the middle strip first and links its caption', () => {
    render(<Gallery items={photos} />);
    const open = screen.getByRole('button', { name: 'Pie', expanded: true });
    expect(open.getAttribute('aria-describedby')).toBeTruthy();
    expect(document.getElementById(open.getAttribute('aria-describedby')!)?.textContent).toBe('Pie caption');
    expect(screen.getAllByRole('button', { expanded: false })).toHaveLength(4);
  });

  it('opens a strip on click and steps with the next and previous buttons', () => {
    render(<Gallery items={photos} />);
    fireEvent.click(screen.getByRole('button', { name: 'Cookies' }));
    expect(screen.getByRole('button', { name: 'Cookies' }).getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: 'Next photo' }));
    expect(screen.getByRole('button', { name: 'Pie' }).getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: 'Previous photo' }));
    fireEvent.click(screen.getByRole('button', { name: 'Previous photo' }));
    expect(screen.getByRole('button', { name: 'Strawberry cake' }).getAttribute('aria-expanded')).toBe('true');
  });

  it('moves focus between strips with the arrow keys', () => {
    render(<Gallery items={photos} />);
    const first = screen.getByRole('button', { name: 'Strawberry cake' });
    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Cookies' }));
    fireEvent.keyDown(document.activeElement!, { key: 'End' });
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Cupcakes' }));
  });
});

describe('Gallery (strips, pinned on scroll)', () => {
  it('puts the head above the strips and keeps the strips as they are', () => {
    render(<Gallery items={photos} label="Cakes" head={<h2>Gallery</h2>} pinOnScroll />);
    const gallery = screen.getByRole('group', { name: 'Cakes' });
    expect(gallery.querySelector('.bbm-gallery__head h2')?.textContent).toBe('Gallery');
    expect(screen.getByRole('button', { name: 'Pie', expanded: true })).toBeTruthy();
    expect(screen.getAllByRole('button', { expanded: false })).toHaveLength(4);
  });

  it('only pins when it can move (jsdom has no matchMedia), so clicks still open strips', () => {
    render(<Gallery items={photos} label="Cakes" pinOnScroll />);
    expect(screen.getByRole('group', { name: 'Cakes' }).classList.contains('bbm-gallery--pinned')).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: 'Cookies' }));
    expect(screen.getByRole('button', { name: 'Cookies' }).getAttribute('aria-expanded')).toBe('true');
  });
});

describe('WeekSchedule', () => {
  const days = [
    { date: 'Mon 12', label: 'Monday 12 May', closed: true },
    { date: 'Wed 14', label: 'Wednesday 14 May', place: 'Porch pick-up', time: '4–6pm', today: true },
    {
      date: 'Sat 17',
      label: 'Saturday 17 May',
      place: "Farmers' market",
      href: 'https://maps.example',
      time: '8am–1pm',
    },
  ];

  it('is a list of days, each with a full-date heading', () => {
    render(<WeekSchedule days={days} />);
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('Where to find Mom this week');
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('heading', { level: 3, name: /Saturday 17 May/ })).toBeTruthy();
  });

  it('says closed and today in words and announces map links', () => {
    render(<WeekSchedule days={days} />);
    expect(screen.getByText('Closed')).toBeTruthy();
    expect(within(screen.getAllByRole('listitem')[1]!).getByText('Today')).toBeTruthy();
    const link = screen.getByRole('link', { name: "Farmers' market (opens map)" });
    expect(link.getAttribute('target')).toBe('_blank');
  });
});

describe('FilterChips', () => {
  const options = [
    { value: 'all', label: 'All' },
    { value: 'cakes', label: 'Cakes' },
    { value: 'cookies', label: 'Cookies' },
  ];

  it('is a labelled group of toggle buttons; single select by default', () => {
    const onChange = vi.fn();
    render(<FilterChips label="Filter the menu" options={options} defaultValue={['all']} onChange={onChange} />);
    expect(screen.getByRole('group', { name: 'Filter the menu' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Cakes' }));
    expect(screen.getByRole('button', { name: 'Cakes' }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('button', { name: 'All' }).getAttribute('aria-pressed')).toBe('false');
    expect(onChange).toHaveBeenLastCalledWith(['cakes']);
  });

  it('keeps several chips pressed in multiple mode', () => {
    render(<FilterChips label="Diet" options={options} multiple />);
    fireEvent.click(screen.getByRole('button', { name: 'Cakes' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cookies' }));
    expect(screen.getAllByRole('button', { pressed: true })).toHaveLength(2);
  });
});

describe('NewsletterSignup', () => {
  it('sends the email and name, then confirms', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<NewsletterSignup title="Mom's Monday letter" onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/First name/), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'ana@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign me up' }));
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain("You're on the list"));
    expect(onSubmit).toHaveBeenCalledWith({ email: 'ana@example.com', name: 'Ana' });
  });

  it('shows a linked error when sending fails', async () => {
    render(
      <NewsletterSignup variant="bar" title="Get the schedule" onSubmit={() => Promise.reject(new Error('no'))} />,
    );
    const email = screen.getByLabelText('Email address');
    fireEvent.change(email, { target: { value: 'bad@example.com' } });
    fireEvent.submit(email.closest('form')!);
    await waitFor(() => expect(email.getAttribute('aria-invalid')).toBe('true'));
    expect(document.getElementById(email.getAttribute('aria-describedby')!)?.textContent).toMatch(/didn't go through/);
  });
});

describe('ChatWidget', () => {
  function Demo() {
    const [messages, setMessages] = React.useState<ChatMessage[]>([]);
    return (
      <ChatWidget
        messages={messages}
        suggestions={['Do you deliver?']}
        onSend={(text) => setMessages((m) => [...m, { id: String(m.length), from: 'you', text }])}
      />
    );
  }

  it('opens a labelled dialog from the launcher and focuses the composer', () => {
    render(<Demo />);
    const launcher = screen.getByRole('button', { name: 'Ask Mom' });
    expect(launcher.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(launcher);
    const dialog = screen.getByRole('dialog', { name: 'Ask Mom' });
    expect(launcher.getAttribute('aria-controls')).toBe(dialog.id);
    expect(document.activeElement).toBe(screen.getByLabelText('Your question'));
    expect(screen.getByRole('log')).toBeTruthy();
  });

  it('sends quick questions and typed text, then hides the suggestions', () => {
    render(<Demo />);
    fireEvent.click(screen.getByRole('button', { name: 'Ask Mom' }));
    fireEvent.click(screen.getByRole('button', { name: 'Do you deliver?' }));
    expect(within(screen.getByRole('log')).getByText('Do you deliver?')).toBeTruthy();
    expect(screen.queryByRole('list', { name: 'Quick questions' })).toBeNull();
    fireEvent.change(screen.getByLabelText('Your question'), { target: { value: 'Gluten-free?' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(within(screen.getByRole('log')).getByText('Gluten-free?')).toBeTruthy();
  });

  it('closes on Escape and returns focus to the launcher', () => {
    render(<Demo />);
    const launcher = screen.getByRole('button', { name: 'Ask Mom' });
    fireEvent.click(launcher);
    act(() => {
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(launcher);
  });
});

describe('section building blocks', () => {
  it('PricingCard reads its price once and lists features', () => {
    render(<PricingCard title="Little cake" price="$45" features={['6-inch', 'Serves 8–10']} />);
    expect(screen.getByRole('heading', { name: 'Little cake' })).toBeTruthy();
    expect(screen.getByText('Price: $45')).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('StepList renders an ordered list for every variant', () => {
    for (const variant of ['stack', 'row', 'tabs', 'cards'] as const) {
      const { unmount } = render(<StepList variant={variant} steps={[{ title: 'Pick' }, { title: 'Bake' }]} />);
      expect(screen.getByRole('list').tagName).toBe('OL');
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
      unmount();
    }
    render(<StepList variant="cards" steps={[{ title: 'Pick' }]} />);
    expect(screen.getByText('Step 1')).toBeTruthy();
  });

  it('Accordion splits into two columns, each exclusive on its own', () => {
    const items = ['A', 'B', 'C', 'D'].map((t) => ({ title: t, content: `${t}!` }));
    const { container } = render(<Accordion items={items} columns={2} exclusive />);
    expect(container.querySelectorAll('.bbm-accordion__col')).toHaveLength(2);
    const names = [...container.querySelectorAll('details')].map((d) => d.getAttribute('name'));
    expect(names[0]).toBe(names[1]);
    expect(names[0]).not.toBe(names[2]);
  });

  it('SectionHeading stamp reads the title once', () => {
    render(<SectionHeading variant="stamp" title="About us" />);
    const heading = screen.getByRole('heading', { name: 'About us' });
    expect(heading.querySelector('[aria-hidden="true"]')?.textContent).toBe('About us');
  });

  it('Orbit keeps the arc sentence readable and the photos described', () => {
    render(
      <Orbit
        center={{ src: 'kitchen.jpg', alt: "Mom's kitchen" }}
        satellites={[{ src: 'pie.jpg', alt: 'Cherry pie' }]}
        arcText="Every bake is a little bit of home"
      />,
    );
    expect(screen.getByText('Every bake is a little bit of home', { selector: 'p' })).toBeTruthy();
    expect(screen.getByRole('img', { name: "Mom's kitchen" })).toBeTruthy();
    expect(screen.getByRole('img', { name: 'Cherry pie' })).toBeTruthy();
  });
});
