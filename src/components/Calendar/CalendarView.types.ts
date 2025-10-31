export type ViewMode = 'month' | 'week';

export type EventColor = 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'red';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color: EventColor;
  allDay?: boolean;
}

export interface CalendarViewProps {
  events?: CalendarEvent[];
  onEventCreate?: (event: CalendarEvent) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
  initialView?: ViewMode;
  initialDate?: Date;
  className?: string;
}

export interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  selectedDate: Date | null;
}

export interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onTimeSlotClick: (date: Date, hour: number) => void;
}

export interface CalendarCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isSelected: boolean;
  events: CalendarEvent[];
  onClick: (date: Date) => void;
}

export interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete?: (eventId: string) => void;
  event?: CalendarEvent;
  prefilledDate?: Date;
}
