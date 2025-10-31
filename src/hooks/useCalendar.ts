import { useState, useCallback } from 'react';
import {
  goToNextMonth,
  goToPreviousMonth,
  goToNextWeek,
  goToPreviousWeek,
  goToToday,
} from '../utils/date.utils';
import { ViewMode } from '../components/Calendar/CalendarView.types';

export function useCalendar(initialDate: Date = new Date(), initialView: ViewMode = 'month') {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const goNext = useCallback(() => {
    setCurrentDate((date) => (viewMode === 'month' ? goToNextMonth(date) : goToNextWeek(date)));
  }, [viewMode]);

  const goPrevious = useCallback(() => {
    setCurrentDate((date) => (viewMode === 'month' ? goToPreviousMonth(date) : goToPreviousWeek(date)));
  }, [viewMode]);

  const goTodayHandler = useCallback(() => {
    setCurrentDate(goToToday());
    setSelectedDate(goToToday());
  }, []);

  const changeView = useCallback((view: ViewMode) => {
    setViewMode(view);
  }, []);

  return {
    currentDate,
    viewMode,
    selectedDate,
    setSelectedDate,
    goNext,
    goPrevious,
    goToday: goTodayHandler,
    changeView,
  };
}
