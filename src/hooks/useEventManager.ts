import { create } from 'zustand';
import { CalendarEvent } from '../components/Calendar/CalendarView.types';
import { generateEventId } from '../utils/event.utils';

interface EventStore {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (eventId: string) => void;
  setEvents: (events: CalendarEvent[]) => void;
}

export const useEventManager = create<EventStore>((set) => ({
  events: [],
  
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, { ...event, id: generateEventId() }],
    })),
  
  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      ),
    })),
  
  deleteEvent: (eventId) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== eventId),
    })),
  
  setEvents: (events) => set({ events }),
}));
