import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import { cx } from '../../utils/cx';

export type ButtonVariant = 'primary' | 'secondary' | 'soft' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonOwnProps {
  /** `primary` is cherry and the only filled action color; use one per view. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** `circle` makes an icon-only round button (pass an `aria-label`). */
  shape?: 'pill' | 'circle';
  /** Adds a cocoa outline and a hard offset shadow that presses in on click. */
  sticker?: boolean;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Shows a baking-dots indicator and blocks clicks. */
  loading?: boolean;
  children?: ReactNode;
}

type NativeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  href?: undefined;
  ref?: Ref<HTMLButtonElement>;
};

type NativeAnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
  /** Renders an `<a>` instead of a `<button>`. */
  href: string;
  ref?: Ref<HTMLAnchorElement>;
};

export type ButtonProps = ButtonOwnProps & (NativeButtonProps | NativeAnchorProps);

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    shape = 'pill',
    sticker = false,
    fullWidth = false,
    leadingIcon,
    trailingIcon,
    loading = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cx(
    'bbm-button',
    `bbm-button--${variant}`,
    `bbm-button--${size}`,
    shape === 'circle' && 'bbm-button--circle',
    sticker && 'bbm-button--sticker',
    fullWidth && 'bbm-button--full',
    loading && 'bbm-button--loading',
    className,
  );

  const content = (
    <>
      {leadingIcon && (
        <span className="bbm-button__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {children != null && <span className="bbm-button__label">{children}</span>}
      {trailingIcon && (
        <span className="bbm-button__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
      {loading && (
        <span className="bbm-button__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      )}
    </>
  );

  if (rest.href !== undefined) {
    const anchorProps = rest as NativeAnchorProps;
    return (
      <a
        {...anchorProps}
        className={classes}
        aria-busy={loading || undefined}
        aria-disabled={loading || anchorProps['aria-disabled'] || undefined}
      >
        {content}
      </a>
    );
  }

  const { type = 'button', disabled, ...buttonProps } = rest as NativeButtonProps;
  return (
    <button
      {...buttonProps}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  );
}
