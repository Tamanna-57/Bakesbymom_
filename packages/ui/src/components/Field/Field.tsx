import { useId, type ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface FieldBaseProps {
  /** Visible label. Required for accessibility; use `hideLabel` to hide it visually. */
  label: ReactNode;
  hint?: ReactNode;
  /** Error message. Marks the control invalid and links the message to it. */
  error?: ReactNode;
  hideLabel?: boolean;
  /** Appends "(optional)" to the label. */
  optional?: boolean;
  /** Class for the outer wrapper (the control gets `className`). */
  wrapperClassName?: string;
}

interface FieldRenderProps {
  id: string;
  describedBy: string | undefined;
  invalid: boolean;
}

interface FieldProps extends FieldBaseProps {
  id?: string;
  children: (props: FieldRenderProps) => ReactNode;
}

/** Shared label/hint/error layout for TextField and Select. */
export function Field({ id: idProp, label, hint, error, hideLabel, optional, wrapperClassName, children }: FieldProps) {
  const autoId = useId();
  const id = idProp ?? `bbm-field-${autoId}`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  const invalid = Boolean(error);

  return (
    <div className={cx('bbm-field', invalid && 'bbm-field--invalid', wrapperClassName)}>
      <label htmlFor={id} className={cx('bbm-field__label', hideLabel && 'bbm-visually-hidden')}>
        {label}
        {optional && <span className="bbm-field__optional"> (optional)</span>}
      </label>
      {children({ id, describedBy, invalid })}
      {hint && (
        <p id={hintId} className="bbm-field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="bbm-field__error">
          {error}
        </p>
      )}
    </div>
  );
}
