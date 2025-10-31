import { memo } from 'react';
import { getMonthCalendarDays } from '../../utils/date.utils';
import { getEventsForDay } from '../../utils/event.utils';
import { CalendarCell } from './CalendarCell';
import { MonthViewProps } from './CalendarView.types';
import { isSameDayUtil } from '../../utils/date.utils';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MonthView = memo<MonthViewProps>(
  ({ currentDate, events, onDateClick, selectedDate }) => {
    const calendarDays = getMonthCalendarDays(currentDate);

    return (
      <div className="flex flex-col h-full">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 border-b-2 border-border bg-secondary/50 flex-none">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid - 6 rows that fill available space */}
        <div 
          className="grid grid-cols-7 grid-rows-6 flex-1"
          role="grid"
          aria-label="Calendar month view"
        >
          {calendarDays.map((day, index) => {
            const dayEvents = getEventsForDay(events, day.date);
            const isSelected = selectedDate ? isSameDayUtil(day.date, selectedDate) : false;

            return (
              <CalendarCell
                key={index}
                date={day.date}
                isCurrentMonth={day.isCurrentMonth}
                isToday={day.isToday}
                isWeekend={day.isWeekend}
                isSelected={isSelected}
                events={dayEvents}
                onClick={onDateClick}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

MonthView.displayName = 'MonthView';
