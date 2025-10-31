import { memo } from 'react';
import { clsx } from 'clsx';
import { getWeekDays, getHourlyTimeSlots, formatDate } from '../../utils/date.utils';
import { getEventsForDay, sortEventsByTime, getEventColorClass } from '../../utils/event.utils';
import { WeekViewProps } from './CalendarView.types';

export const WeekView = memo<WeekViewProps>(
  ({ currentDate, events, onEventClick, onTimeSlotClick }) => {
    const weekDays = getWeekDays(currentDate);
    const timeSlots = getHourlyTimeSlots();

    return (
      <div className="flex flex-col h-full overflow-auto">
        {/* Week Header */}
        <div className="grid grid-cols-8 border-b border-border bg-secondary/50 sticky top-0 z-10">
          <div className="py-3 px-2 text-sm font-semibold text-muted-foreground border-r border-border">
            Time
          </div>
          {weekDays.map((day, index) => (
            <div
              key={index}
              className="py-3 px-2 text-center border-r border-border last:border-r-0"
            >
              <div className="text-sm font-semibold text-foreground">
                {formatDate(day, 'EEE')}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDate(day, 'MMM d')}
              </div>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="flex-1">
          {timeSlots.map((time, timeIndex) => (
            <div key={timeIndex} className="grid grid-cols-8 border-b border-border">
              {/* Time Label */}
              <div className="py-3 px-2 text-xs text-muted-foreground border-r border-border">
                {time}
              </div>

              {/* Day Cells */}
              {weekDays.map((day, dayIndex) => {
                const dayEvents = getEventsForDay(events, day);
                const sortedEvents = sortEventsByTime(dayEvents);
                const hour = parseInt(time.split(':')[0]);
                const relevantEvents = sortedEvents.filter(
                  (event) => event.startDate.getHours() === hour
                );

                return (
                  <button
                    key={dayIndex}
                    onClick={() => onTimeSlotClick(day, hour)}
                    className={clsx(
                      'min-h-[60px] p-2 border-r border-border last:border-r-0',
                      'hover:bg-card-hover transition-fast text-left',
                      'focus:outline-none focus:ring-2 focus:ring-primary focus:z-10'
                    )}
                    aria-label={`${formatDate(day, 'MMMM d')} at ${time}`}
                  >
                    {relevantEvents.map((event) => (
                      <button
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event);
                        }}
                        className={clsx(
                          'w-full text-left text-xs px-2 py-1 rounded mb-1 truncate',
                          'hover:opacity-90 transition-fast',
                          getEventColorClass(event.color)
                        )}
                        title={event.title}
                      >
                        {event.title}
                      </button>
                    ))}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

WeekView.displayName = 'WeekView';
