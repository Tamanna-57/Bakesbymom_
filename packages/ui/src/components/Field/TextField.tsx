import type { InputHTMLAttributes, Ref, TextareaHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Field, type FieldBaseProps } from './Field';

type InputProps = FieldBaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    multiline?: false;
    ref?: Ref<HTMLInputElement>;
  };

type TextareaProps = FieldBaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    /** Renders a `<textarea>` (order notes, cake messages). */
    multiline: true;
    ref?: Ref<HTMLTextAreaElement>;
  };

export type TextFieldProps = InputProps | TextareaProps;

export function TextField(props: TextFieldProps) {
  const { label, hint, error, hideLabel, optional, wrapperClassName, id, className, ...rest } = props;

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
      {({ id: controlId, describedBy, invalid }) => {
        const shared = {
          id: controlId,
          'aria-describedby': describedBy,
          'aria-invalid': invalid || undefined,
        };
        if (rest.multiline) {
          const {
            multiline: _multiline,
            rows = 4,
            ...textareaProps
          } = rest as Omit<TextareaProps, keyof FieldBaseProps>;
          return (
            <textarea
              {...textareaProps}
              {...shared}
              rows={rows}
              className={cx('bbm-field__control', 'bbm-field__control--multiline', className)}
            />
          );
        }
        const { multiline: _multiline, type = 'text', ...inputProps } = rest as Omit<InputProps, keyof FieldBaseProps>;
        return <input {...inputProps} {...shared} type={type} className={cx('bbm-field__control', className)} />;
      }}
    </Field>
  );
}
