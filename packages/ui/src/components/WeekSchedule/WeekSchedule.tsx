import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface ScheduleDay {
  /** Short label shown in the cell, e.g. "Sat 17". */
  date: string;
  /** Full date for assistive tech, e.g. "Saturday 17 May". */
  label: string;
  /** Where Mom is that day. */
  place?: string;
  /** A map link for the place; opens in a new tab. */
  href?: string;
  time?: string;
  /** A doodle or small icon. */
  icon?: ReactNode;
  /** Nothing on this day. */
  closed?: boolean;
  /** Highlights the cell and adds the word "Today". */
  today?: boolean;
}

export interface WeekScheduleProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  days: ScheduleDay[];
  /** Caps line above the title. */
  eyebrow?: ReactNode;
  /** Script title. */
  title?: ReactNode;
  /** A button under the grid, e.g. "Get directions". */
  action?: ReactNode;
  closedLabel?: string;
  todayLabel?: string;
}

/**
 * "Where to find Mom this week" (pin 15): seven days on a notebook card,
 * each with the place, the time, or "Closed". Built as a real list of days.
 */
export function WeekSchedule({
  days,
  eyebrow = 'Where to find Mom',
  title = 'this week',
  action,
  closedLabel = 'Closed',
  todayLabel = 'Today',
  className,
  ...rest
}: WeekScheduleProps) {
  return (
    <section {...rest} className={cx('bbm-week', className)}>
      <div className="bbm-week__holes" aria-hidden="true" />
      <h2 className="bbm-week__header">
        {eyebrow && <span className="bbm-week__eyebrow">{eyebrow}</span>}{' '}
        {title && <span className="bbm-week__title">{title}</span>}
      </h2>
      <ol className="bbm-week__days">
        {days.map((day) => (
          <li
            key={day.label}
            className={cx('bbm-week__day', day.closed && 'bbm-week__day--closed', day.today && 'bbm-week__day--today')}
          >
            <h3 className="bbm-week__date">
              <span aria-hidden="true">{day.date}</span>
              <span className="bbm-visually-hidden">{day.label}</span>
              {day.today && <span className="bbm-week__today">{todayLabel}</span>}
            </h3>
            {day.closed ? (
              <p className="bbm-week__closed">{closedLabel}</p>
            ) : (
              <div className="bbm-week__details">
                {day.icon && (
                  <span className="bbm-week__icon" aria-hidden="true">
                    {day.icon}
                  </span>
                )}
                {day.place && (
                  <p className="bbm-week__place">
                    {day.href ? (
                      <a href={day.href} target="_blank" rel="noopener noreferrer">
                        {day.place} <span className="bbm-visually-hidden">(opens map)</span>
                      </a>
                    ) : (
                      day.place
                    )}
                  </p>
                )}
                {day.time && <p className="bbm-week__time">{day.time}</p>}
              </div>
            )}
          </li>
        ))}
      </ol>
      {action && <div className="bbm-week__action">{action}</div>}
    </section>
  );
}
