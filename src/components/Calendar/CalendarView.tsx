import { useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '../primitives/Button';
import { Select } from '../primitives/Select';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { EventModal } from './EventModal';
import { useCalendar } from '../../hooks/useCalendar';
import { useEventManager } from '../../hooks/useEventManager';
import { formatDate } from '../../utils/date.utils';
import { CalendarViewProps, CalendarEvent, ViewMode } from './CalendarView.types';

const VIEW_OPTIONS = [
  { value: 'month', label: 'Month' },
  { value: 'week', label: 'Week' },
];

export const CalendarView = ({
  events: initialEvents = [],
  onEventCreate,
  onEventUpdate,
  onEventDelete,
  initialView = 'month',
  initialDate = new Date(),
  className,
}: CalendarViewProps) => {
  const { currentDate, viewMode, selectedDate, setSelectedDate, goNext, goPrevious, goToday, changeView } =
    useCalendar(initialDate, initialView);

  const { events, addEvent, updateEvent, deleteEvent, setEvents } = useEventManager();

  // Initialize events
  useState(() => {
    if (initialEvents.length > 0) {
      setEvents(initialEvents);
    }
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | undefined>(undefined);
  const [prefilledDate, setPrefilledDate] = useState<Date | undefined>(undefined);

  const handleDateClick = useCallback((date: Date) => {
    setSelectedDate(date);
    setPrefilledDate(date);
    setEditingEvent(undefined);
    setIsModalOpen(true);
  }, [setSelectedDate]);

  const handleEventClick = useCallback((event: CalendarEvent) => {
    setEditingEvent(event);
    setPrefilledDate(undefined);
    setIsModalOpen(true);
  }, []);

  const handleTimeSlotClick = useCallback((date: Date, hour: number) => {
    const slotDate = new Date(date);
    slotDate.setHours(hour, 0, 0, 0);
    setPrefilledDate(slotDate);
    setEditingEvent(undefined);
    setIsModalOpen(true);
  }, []);

  const handleSaveEvent = useCallback(
    (event: CalendarEvent) => {
      if (editingEvent) {
        updateEvent(event);
        onEventUpdate?.(event);
      } else {
        addEvent(event);
        onEventCreate?.(event);
      }
    },
    [editingEvent, addEvent, updateEvent, onEventCreate, onEventUpdate]
  );

  const handleDeleteEvent = useCallback(
    (eventId: string) => {
      deleteEvent(eventId);
      onEventDelete?.(eventId);
    },
    [deleteEvent, onEventDelete]
  );

  return (
    <div className={clsx('flex flex-col h-full bg-background overflow-hidden', className)}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-border bg-card flex-none">
        {/* Navigation */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={goPrevious}
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={goNext}
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={goToday}
            className="ml-2"
          >
            Today
          </Button>
        </div>

        {/* Current Date Display */}
        <h1 className="text-lg font-bold text-foreground">
          {viewMode === 'month'
            ? formatDate(currentDate, 'MMMM yyyy')
            : `Week of ${formatDate(currentDate, 'MMM d, yyyy')}`}
        </h1>

        {/* View Selector & Create Button */}
        <div className="flex items-center gap-2">
          <Select
            value={viewMode}
            onChange={(e) => changeView(e.target.value as ViewMode)}
            options={VIEW_OPTIONS}
            size="sm"
            aria-label="View mode"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setEditingEvent(undefined);
              setPrefilledDate(undefined);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1.5"
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            New Event
          </Button>
        </div>
      </header>

      {/* Calendar Content */}
      <main className="flex-1 min-h-0">
        {viewMode === 'month' ? (
          <MonthView
            currentDate={currentDate}
            events={events}
            onDateClick={handleDateClick}
            selectedDate={selectedDate}
          />
        ) : (
          <WeekView
            currentDate={currentDate}
            events={events}
            onEventClick={handleEventClick}
            onTimeSlotClick={handleTimeSlotClick}
          />
        )}
      </main>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={editingEvent ? handleDeleteEvent : undefined}
        event={editingEvent}
        prefilledDate={prefilledDate}
      />
    </div>
  );
};
