// Building blocks shared by the cake and treat pages: breadcrumbs, the eggless note and the order form fields.
import { useId, type ReactNode } from 'react';
import { Button, FilterChips, Select, TextField } from '@bakesbymom/ui';
import { bakery, timeSlots } from '../content/bakery';
import type { Fulfilment } from '../content/order';
import './shop.css';

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="shop-crumbs">
      <ol>
        {items.map((item, i) =>
          item.href && i < items.length - 1 ? (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ) : (
            <li key={item.label} aria-current="page">
              {item.label}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

export function EgglessNote() {
  return (
    <p className="shop-veg">
      <span className="site-veg-dot" aria-hidden="true" />
      <span>{bakery.fssai}</span>
    </p>
  );
}

/** A labelled group of fields inside the order form. */
export function OrderGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="order-group">
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
}

export function Chips({
  label,
  options,
  value,
  onChange,
  multiple = false,
}: {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  multiple?: boolean;
}) {
  return (
    <FilterChips
      label={label}
      multiple={multiple}
      options={options.map((option) => ({ value: option, label: option }))}
      value={value}
      onChange={onChange}
    />
  );
}

/** − [ 9 ] + with the smallest order as the floor. */
export function QuantityStepper({
  label,
  hint,
  value,
  min,
  step,
  unit,
  onChange,
}: {
  label: string;
  hint?: ReactNode;
  value: number;
  min: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <div className="order-stepper">
      <Button
        variant="secondary"
        shape="circle"
        aria-label={`Fewer ${unit}`}
        aria-controls={id}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - step))}
      >
        −
      </Button>
      <TextField
        id={id}
        label={label}
        hint={hint}
        type="number"
        inputMode="numeric"
        min={min}
        step={step}
        value={Number.isFinite(value) ? value : ''}
        onChange={(event) => onChange(Number(event.target.value))}
        onBlur={() => onChange(Math.max(min, Number.isFinite(value) ? value : min))}
        wrapperClassName="order-stepper__field"
      />
      <Button
        variant="secondary"
        shape="circle"
        aria-label={`More ${unit}`}
        aria-controls={id}
        onClick={() => onChange(Math.max(min, value + step))}
      >
        +
      </Button>
    </div>
  );
}

const today = () => new Date().toISOString().slice(0, 10);

export interface WhenWhere {
  date: string;
  slot: string;
  fulfilment: Fulfilment;
}

/** Needed on, time slot, and pickup or delivery. */
export function WhenWhereFields({ value, onChange }: { value: WhenWhere; onChange: (value: WhenWhere) => void }) {
  return (
    <OrderGroup title="When and where">
      <div className="order-row">
        <TextField
          label="Needed on"
          type="date"
          min={today()}
          value={value.date}
          onChange={(event) => onChange({ ...value, date: event.target.value })}
        />
        <Select
          label="Time"
          value={value.slot}
          onChange={(event) => onChange({ ...value, slot: event.target.value })}
          options={[{ value: '', label: 'Any time' }, ...timeSlots.map((slot) => ({ value: slot, label: slot }))]}
        />
      </div>
      <Chips
        label="Pickup or delivery"
        options={['Pickup', 'Delivery']}
        value={[value.fulfilment.method]}
        onChange={(next) =>
          onChange({
            ...value,
            fulfilment: { ...value.fulfilment, method: next[0] === 'Delivery' ? 'Delivery' : 'Pickup' },
          })
        }
      />
      {value.fulfilment.method === 'Delivery' ? (
        <TextField
          label="Delivery area"
          hint="Mom confirms delivery and any charge with you on WhatsApp."
          value={value.fulfilment.area ?? ''}
          onChange={(event) => onChange({ ...value, fulfilment: { ...value.fulfilment, area: event.target.value } })}
        />
      ) : (
        <p className="order-hint">Pick up from the kitchen in {bakery.place}.</p>
      )}
    </OrderGroup>
  );
}

/** Opens WhatsApp with the order typed out. */
export function WhatsAppOrder({ href }: { href: string }) {
  return (
    <div className="order-send">
      <Button size="lg" fullWidth href={href} target="_blank" rel="noreferrer">
        Order on WhatsApp
      </Button>
      <p className="order-hint">
        This opens WhatsApp with your order already typed out. Read it, change anything, and send it yourself: nothing
        leaves this page on its own.
      </p>
    </div>
  );
}
