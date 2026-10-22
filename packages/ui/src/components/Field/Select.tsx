import type { ReactNode, Ref, SelectHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Field, type FieldBaseProps } from './Field';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends FieldBaseProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Options to render. Alternatively pass `<option>` children. */
  options?: SelectOption[];
  /** Adds a disabled first option, such as "Choose a size". */
  placeholder?: string;
  children?: ReactNode;
  ref?: Ref<HTMLSelectElement>;
}

/** A styled native `<select>`: accessible, mobile-friendly and form-compatible. */
export function Select({
  label,
  hint,
  error,
  hideLabel,
  optional,
  wrapperClassName,
  id,
  className,
  options,
  placeholder,
  children,
  ...rest
}: SelectProps) {
  return (
    <Field
      id={id}
      label={label}
      hint={hint}
      error={error}
      hideLabel={hideLabel}
      optional={optional}
      wrapperClassName={wrapperClassName}
    >
      {({ id: controlId, describedBy, invalid }) => (
        <div className="bbm-field__select">
          <select
            {...rest}
            id={controlId}
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
            defaultValue={
              rest.value === undefined && rest.defaultValue === undefined && placeholder ? '' : rest.defaultValue
            }
            className={cx('bbm-field__control', 'bbm-field__control--select', className)}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options?.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
            {children}
          </select>
          <svg className="bbm-field__chevron" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path
              d="M3.5 6 8 10.5 12.5 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </Field>
  );
}
