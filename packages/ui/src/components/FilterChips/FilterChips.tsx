import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../utils/types';

export interface FilterChipOption {
  value: string;
  label: ReactNode;
  /** Unpressed fill (pin 13 shows each filter in its own soft color). Defaults to paper. */
  tone?: Tone;
}

export interface FilterChipsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  options: FilterChipOption[];
  /** Accessible name of the group, e.g. "Filter the menu". */
  label: string;
  /** Selected values (controlled). */
  value?: string[];
  /** Selected values on first render (uncontrolled). */
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  /** Allow several chips to be pressed at once. Single-select by default. */
  multiple?: boolean;
}

/**
 * Filter pills for the menu (pin 13). Each chip is a toggle button with
 * `aria-pressed`; the pressed chip turns cherry with white text.
 */
export function FilterChips({
  options,
  label,
  value,
  defaultValue = [],
  onChange,
  multiple = false,
  className,
  ...rest
}: FilterChipsProps) {
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const selected = value ?? internal;

  const toggle = (chip: string) => {
    let next: string[];
    if (multiple) next = selected.includes(chip) ? selected.filter((v) => v !== chip) : [...selected, chip];
    else next = [chip];
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <div {...rest} role="group" aria-label={label} className={cx('bbm-chips', className)}>
      {options.map((option) => {
        const pressed = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            className="bbm-chips__chip"
            data-bbm-tone={option.tone}
            aria-pressed={pressed}
            onClick={() => toggle(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
