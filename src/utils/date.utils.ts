import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  startOfDay,
  isWeekend,
  parse,
} from 'date-fns';

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
}

/**
 * Generate calendar grid for month view (42 cells)
 */
export function getMonthCalendarDays(date: Date): CalendarDay[] {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  return days.map((day) => ({
    date: day,
    isCurrentMonth: isSameMonth(day, date),
    isToday: isToday(day),
    isWeekend: isWeekend(day),
  }));
}

/**
 * Generate week days for week view
 */
export function getWeekDays(date: Date): Date[] {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 });
  return eachDayOfInterval({ start: weekStart, end: weekEnd });
}

/**
 * Generate hourly time slots for week view
 */
export function getHourlyTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const time = new Date(2024, 0, 1, hour, 0);
    slots.push(format(time, 'HH:mm'));
  }
  return slots;
}

/**
 * Format date for display
 */
export function formatDate(date: Date, formatStr: string): string {
  return format(date, formatStr);
}

/**
 * Check if two dates are the same day
 */
export function isSameDayUtil(date1: Date, date2: Date): boolean {
  return isSameDay(date1, date2);
}

/**
 * Navigation helpers
 */
export function goToNextMonth(date: Date): Date {
  return addMonths(date, 1);
}

export function goToPreviousMonth(date: Date): Date {
  return subMonths(date, 1);
}

export function goToNextWeek(date: Date): Date {
  return addWeeks(date, 1);
}

export function goToPreviousWeek(date: Date): Date {
  return subWeeks(date, 1);
}

export function goToToday(): Date {
  return startOfDay(new Date());
}

/**
 * Parse time string to Date
 */
export function parseTime(timeStr: string, baseDate: Date = new Date()): Date {
  return parse(timeStr, 'HH:mm', baseDate);
}
