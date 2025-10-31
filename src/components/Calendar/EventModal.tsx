import { useState, useEffect, FormEvent } from 'react';
import { Modal } from '../primitives/Modal';
import { Button } from '../primitives/Button';
import { Select } from '../primitives/Select';
import { EventModalProps, EventColor } from './CalendarView.types';
import { formatDate } from '../../utils/date.utils';
import { validateEvent } from '../../utils/event.utils';
import { clsx } from 'clsx';

const EVENT_COLORS: { value: EventColor; label: string }[] = [
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
  { value: 'pink', label: 'Pink' },
  { value: 'red', label: 'Red' },
];

export const EventModal = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  event,
  prefilledDate,
}: EventModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('10:00');
  const [color, setColor] = useState<EventColor>('blue');
  const [errors, setErrors] = useState<string[]>([]);

  const isEditing = !!event;

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || '');
      setStartDate(formatDate(event.startDate, 'yyyy-MM-dd'));
      setStartTime(formatDate(event.startDate, 'HH:mm'));
      setEndDate(formatDate(event.endDate, 'yyyy-MM-dd'));
      setEndTime(formatDate(event.endDate, 'HH:mm'));
      setColor(event.color);
    } else if (prefilledDate) {
      const dateStr = formatDate(prefilledDate, 'yyyy-MM-dd');
      setStartDate(dateStr);
      setEndDate(dateStr);
    } else {
      const today = formatDate(new Date(), 'yyyy-MM-dd');
      setStartDate(today);
      setEndDate(today);
    }
  }, [event, prefilledDate, isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const newErrors: string[] = [];

    if (!title.trim()) {
      newErrors.push('Title is required');
    }

    if (!startDate || !endDate) {
      newErrors.push('Dates are required');
    }

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    if (start >= end) {
      newErrors.push('End date must be after start date');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const eventData = {
      id: event?.id || '',
      title: title.trim(),
      description: description.trim(),
      startDate: start,
      endDate: end,
      color,
    };

    if (validateEvent(eventData)) {
      onSave(eventData);
      handleClose();
    }
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
      handleClose();
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setStartDate('');
    setStartTime('09:00');
    setEndDate('');
    setEndTime('10:00');
    setColor('blue');
    setErrors([]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Edit Event' : 'Create Event'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3">
            {errors.map((error, index) => (
              <div key={index} className="text-sm">
                {error}
              </div>
            ))}
          </div>
        )}

        {/* Title */}
        <div>
          <label htmlFor="event-title" className="block text-sm font-medium text-foreground mb-1">
            Title *
          </label>
          <input
            id="event-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-input-focus transition-fast bg-background text-foreground"
            placeholder="Event title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="event-description" className="block text-sm font-medium text-foreground mb-1">
            Description
          </label>
          <textarea
            id="event-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-input-focus transition-fast bg-background text-foreground resize-none"
            placeholder="Event description"
            rows={3}
          />
        </div>

        {/* Start Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-foreground mb-1">
              Start Date *
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-input-focus transition-fast bg-background text-foreground"
              required
            />
          </div>
          <div>
            <label htmlFor="start-time" className="block text-sm font-medium text-foreground mb-1">
              Start Time *
            </label>
            <input
              id="start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-input-focus transition-fast bg-background text-foreground"
              required
            />
          </div>
        </div>

        {/* End Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-foreground mb-1">
              End Date *
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-input-focus transition-fast bg-background text-foreground"
              required
            />
          </div>
          <div>
            <label htmlFor="end-time" className="block text-sm font-medium text-foreground mb-1">
              End Time *
            </label>
            <input
              id="end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-input-focus transition-fast bg-background text-foreground"
              required
            />
          </div>
        </div>

        {/* Color */}
        <div>
          <label htmlFor="event-color" className="block text-sm font-medium text-foreground mb-1">
            Color
          </label>
          <Select
            id="event-color"
            value={color}
            onChange={(e) => setColor(e.target.value as EventColor)}
            options={EVENT_COLORS}
            fullWidth
          />
        </div>

        {/* Actions */}
        <div className={clsx('flex gap-2', isEditing ? 'justify-between' : 'justify-end')}>
          {isEditing && onDelete && (
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
