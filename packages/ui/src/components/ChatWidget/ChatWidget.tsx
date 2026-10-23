import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import { Doodle } from '../Doodle/Doodle';
import { EdgeDivider } from '../EdgeDivider/EdgeDivider';
import { Seal } from '../Seal/Seal';

export interface ChatMessage {
  id: string;
  from: 'mom' | 'you';
  text: ReactNode;
}

export interface ChatWidgetProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  messages: ChatMessage[];
  /** Called with the text the customer sends (typed or a quick question). */
  onSend: (text: string) => void;
  /** Quick questions shown as pills until the customer sends their first message. */
  suggestions?: string[];
  /** Panel title. */
  title?: string;
  /** The stamp-edged opening card (pin 08). */
  intro?: ReactNode;
  /** Shows Mom's typing dots. */
  typing?: boolean;
  /** A way to reach a real person. */
  handoff?: { label: string; href: string };
  placeholder?: string;
  /** Launcher accessible name. */
  launcherLabel?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Render in the page flow instead of fixed to the corner (docs and previews). */
  inline?: boolean;
}

function SendIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M3 10h12M10 4.5 15.5 10 10 15.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * "Ask Mom": a chat panel assembled from board pieces (no pin shows a chatbot):
 * a seal launcher (pin 10), a stamp-edged opening card and pill quick questions
 * (pin 08), outlined paper bubbles (pin 01) and cherry pills for the customer.
 * The answers come from whatever the host app connects to `onSend`.
 */
export function ChatWidget({
  messages,
  onSend,
  suggestions = [],
  title = 'Ask Mom',
  intro,
  typing = false,
  handoff,
  placeholder = 'Type your question…',
  launcherLabel = 'Ask Mom',
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  inline = false,
  className,
  ...rest
}: ChatWidgetProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = openProp ?? internalOpen;
  const [draft, setDraft] = useState('');
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const panelId = `bbm-chat-${uid}`;
  const titleId = `${panelId}-title`;
  const asked = messages.some((m) => m.from === 'you');

  const setOpen = (next: boolean) => {
    if (openProp === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, typing]);

  const close = () => {
    setOpen(false);
    launcherRef.current?.focus();
  };

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    onSend(clean);
    setDraft('');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(draft);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      close();
    }
  };

  return (
    <div {...rest} className={cx('bbm-chat', inline && 'bbm-chat--inline', open && 'bbm-chat--open', className)}>
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-labelledby={titleId}
          className="bbm-chat__panel"
          onKeyDown={onKeyDown}
        >
          <div className="bbm-chat__header">
            <div className="bbm-chat__bar">
              <span className="bbm-chat__avatar" aria-hidden="true">
                <Doodle name="heart" size={18} />
              </span>
              <p id={titleId} className="bbm-chat__title">
                {title}
              </p>
              <button type="button" className="bbm-chat__close" aria-label="Close chat" onClick={close}>
                <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                  <path d="M5 5l10 10M15 5 5 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <EdgeDivider shape="scallop" size="sm" color="var(--bbm-color-bg-pink)" />
          </div>
          <div ref={logRef} className="bbm-chat__log" role="log" aria-live="polite" aria-label="Conversation">
            {intro && <div className="bbm-chat__intro">{intro}</div>}
            {!asked && suggestions.length > 0 && (
              <ul className="bbm-chat__suggestions" aria-label="Quick questions">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button type="button" onClick={() => send(s)}>
                      <span>{s}</span>
                      <span className="bbm-chat__suggestion-arrow" aria-hidden="true">
                        <SendIcon />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {messages.map((message) => (
              <div key={message.id} className={cx('bbm-chat__message', `bbm-chat__message--${message.from}`)}>
                <span className="bbm-chat__from">{message.from === 'mom' ? 'Mom' : 'You'}</span>
                <div className="bbm-chat__bubble">{message.text}</div>
              </div>
            ))}
            {typing && (
              <div className="bbm-chat__message bbm-chat__message--mom">
                <span className="bbm-chat__from">Mom</span>
                <div className="bbm-chat__bubble bbm-chat__typing">
                  <span className="bbm-visually-hidden">Mom is typing</span>
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                </div>
              </div>
            )}
          </div>
          <form className="bbm-chat__composer" onSubmit={onSubmit}>
            <label className="bbm-visually-hidden" htmlFor={`${panelId}-input`}>
              Your question
            </label>
            <input
              ref={inputRef}
              id={`${panelId}-input`}
              className="bbm-chat__input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={placeholder}
              autoComplete="off"
            />
            <button type="submit" className="bbm-chat__send" aria-label="Send">
              <SendIcon />
            </button>
          </form>
          {handoff && (
            <a className="bbm-chat__handoff" href={handoff.href}>
              {handoff.label}
            </a>
          )}
        </div>
      )}
      <button
        ref={launcherRef}
        type="button"
        className="bbm-chat__launcher"
        aria-label={launcherLabel}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => (open ? close() : setOpen(true))}
      >
        <Seal text="Ask Mom • Ask Mom • Ask Mom • " size={88} spin aria-hidden="true">
          <Doodle name="heart" size={26} />
        </Seal>
      </button>
    </div>
  );
}
