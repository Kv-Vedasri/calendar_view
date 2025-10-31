import { memo } from 'react';
import { clsx } from 'clsx';
import { formatDate } from '../../utils/date.utils';
import { CalendarCellProps } from './CalendarView.types';
import { getEventLightColorClass } from '../../utils/event.utils';

export const CalendarCell = memo<CalendarCellProps>(
  ({ date, isCurrentMonth, isToday, isWeekend, isSelected, events, onClick }) => {
    const dayNumber = formatDate(date, 'd');
    const displayedEvents = events.slice(0, 2); // Show max 2 events to fit without scroll
    const remainingCount = events.length - 2;

    return (
      <button
        onClick={() => onClick(date)}
        className={clsx(
          'h-full w-full p-1.5 border-r border-b border-border transition-fast text-left overflow-hidden',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:z-10',
          {
            'hover:bg-card-hover cursor-pointer': isCurrentMonth,
            'bg-calendar-weekend': isWeekend && isCurrentMonth,
            'bg-background': !isWeekend && isCurrentMonth,
            'bg-secondary/10 cursor-not-allowed': !isCurrentMonth,
            'bg-calendar-today ring-2 ring-inset ring-primary': isToday,
            'ring-2 ring-inset ring-primary/50': isSelected && !isToday,
          }
        )}
        aria-label={`${formatDate(date, 'MMMM d, yyyy')}, ${events.length} events`}
        role="gridcell"
        disabled={!isCurrentMonth}
      >
        {/* Day Number */}
        <div
          className={clsx('text-xs font-medium mb-1', {
            'text-muted-foreground/40': !isCurrentMonth,
            'text-foreground': isCurrentMonth && !isToday,
            'text-primary font-bold': isToday,
          })}
        >
          {dayNumber}
        </div>

        {/* Events - Only show for current month */}
        {isCurrentMonth && events.length > 0 && (
          <div className="space-y-0.5">
            {displayedEvents.map((event) => (
              <div
                key={event.id}
                className={clsx(
                  'text-[10px] px-1.5 py-0.5 rounded border truncate leading-tight',
                  getEventLightColorClass(event.color)
                )}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            
            {remainingCount > 0 && (
              <div className="text-[10px] text-muted-foreground px-1.5 font-medium">
                +{remainingCount} more
              </div>
            )}
          </div>
        )}
      </button>
    );
  }
);

CalendarCell.displayName = 'CalendarCell';
