import { useState, type FormEvent, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../Button/Button';
import { Doodle } from '../Doodle/Doodle';
import { TextField } from '../Field/TextField';

export interface NewsletterValues {
  email: string;
  name?: string;
}

export interface NewsletterSignupProps extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'onSubmit'> {
  /**
   * - `card`: a paper card with a tilted sticker on its corner, name and email in one row (pin 03).
   * - `bar`: one pill-shaped line with an email field and button (pin 15).
   * - `inline`: a compact block for the footer, on cocoa.
   */
  variant?: 'card' | 'bar' | 'inline';
  title: ReactNode;
  /** One sentence saying exactly what arrives and how often. */
  description?: ReactNode;
  /** Also ask for a first name (`card` only). */
  askName?: boolean;
  buttonLabel?: string;
  /** Called on submit. Return a promise to show the sending state; reject to show `errorMessage`. */
  onSubmit?: (values: NewsletterValues) => void | Promise<void>;
  successMessage?: ReactNode;
  errorMessage?: ReactNode;
  /** `card` only: a sticker or badge tilted over the top-left corner. */
  sticker?: ReactNode;
}

/** Sign-up for Mom's Monday letter, in the board's card and bar styles. */
export function NewsletterSignup({
  variant = 'card',
  title,
  description,
  askName = variant === 'card',
  buttonLabel = 'Sign me up',
  onSubmit,
  successMessage = "You're on the list! Look out for Monday's letter.",
  errorMessage = "That didn't go through. Check the email address and try again.",
  sticker,
  className,
  ...rest
}: NewsletterSignupProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') ?? '');
    const name = data.get('name');
    setStatus('sending');
    try {
      await onSubmit?.({ email, ...(name ? { name: String(name) } : {}) });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  const Element = variant === 'card' ? 'section' : 'div';
  const sending = status === 'sending';

  return (
    <Element {...rest} className={cx('bbm-newsletter', `bbm-newsletter--${variant}`, className)}>
      {variant === 'card' && sticker && (
        <div className="bbm-newsletter__sticker" aria-hidden="true">
          {sticker}
        </div>
      )}
      {variant === 'card' && <Doodle name="sparkle" size={28} className="bbm-newsletter__sparkle" />}
      <div className="bbm-newsletter__text">
        <p className="bbm-newsletter__title">{title}</p>
        {description && <p className="bbm-newsletter__description">{description}</p>}
      </div>
      {status === 'done' ? (
        <p className="bbm-newsletter__done" role="status">
          <Doodle name="heart" size={22} />
          {successMessage}
        </p>
      ) : (
        <form className="bbm-newsletter__form" onSubmit={handleSubmit}>
          {askName && variant === 'card' && (
            <TextField label="First name" name="name" autoComplete="given-name" optional />
          )}
          <TextField
            label="Email address"
            hideLabel={variant === 'bar'}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            error={status === 'error' ? errorMessage : undefined}
          />
          <Button type="submit" variant={variant === 'inline' ? 'soft' : 'primary'} loading={sending}>
            {sending ? 'Signing you up…' : buttonLabel}
          </Button>
        </form>
      )}
    </Element>
  );
}
