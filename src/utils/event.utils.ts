import { isSameDay, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { CalendarEvent } from '../components/Calendar/CalendarView.types';

/**
 * Get events for a specific day
 */
export function getEventsForDay(events: CalendarEvent[], date: Date): CalendarEvent[] {
  return events.filter((event) => {
    const eventStart = startOfDay(event.startDate);
    const eventEnd = startOfDay(event.endDate);
    const targetDate = startOfDay(date);

    return (
      isSameDay(eventStart, targetDate) ||
      isSameDay(eventEnd, targetDate) ||
      isWithinInterval(targetDate, { start: eventStart, end: eventEnd })
    );
  });
}

/**
 * Sort events by start time
 */
export function sortEventsByTime(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}

/**
 * Check if event is in time range
 */
export function isEventInTimeRange(
  event: CalendarEvent,
  startHour: number,
  endHour: number
): boolean {
  const eventHour = event.startDate.getHours();
  return eventHour >= startHour && eventHour < endHour;
}

/**
 * Get event color class
 */
export function getEventColorClass(color: CalendarEvent['color']): string {
  const colorMap: Record<CalendarEvent['color'], string> = {
    blue: 'bg-event-blue text-white',
    green: 'bg-event-green text-white',
    purple: 'bg-event-purple text-white',
    orange: 'bg-event-orange text-white',
    pink: 'bg-event-pink text-white',
    red: 'bg-event-red text-white',
  };

  return colorMap[color] || colorMap.blue;
}

/**
 * Get lighter event color class for backgrounds
 */
export function getEventLightColorClass(color: CalendarEvent['color']): string {
  const colorMap: Record<CalendarEvent['color'], string> = {
    blue: 'bg-event-blue/10 text-event-blue border-event-blue/20',
    green: 'bg-event-green/10 text-event-green border-event-green/20',
    purple: 'bg-event-purple/10 text-event-purple border-event-purple/20',
    orange: 'bg-event-orange/10 text-event-orange border-event-orange/20',
    pink: 'bg-event-pink/10 text-event-pink border-event-pink/20',
    red: 'bg-event-red/10 text-event-red border-event-red/20',
  };

  return colorMap[color] || colorMap.blue;
}

/**
 * Generate unique event ID
 */
export function generateEventId(): string {
  return `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate event data
 */
export function validateEvent(event: Partial<CalendarEvent>): boolean {
  if (!event.title || event.title.trim() === '') return false;
  if (!event.startDate || !event.endDate) return false;
  if (event.startDate >= event.endDate) return false;
  return true;
}
