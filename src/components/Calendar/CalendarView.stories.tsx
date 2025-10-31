import type { Meta, StoryObj } from '@storybook/react';
import { CalendarView } from './CalendarView';
import { CalendarEvent } from './CalendarView.types';

// Sample events for stories
const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly sync with the team',
    startDate: new Date(2024, 9, 15, 10, 0),
    endDate: new Date(2024, 9, 15, 11, 0),
    color: 'blue',
  },
  {
    id: '2',
    title: 'Project Deadline',
    description: 'Submit final deliverables',
    startDate: new Date(2024, 9, 20, 17, 0),
    endDate: new Date(2024, 9, 20, 18, 0),
    color: 'red',
  },
  {
    id: '3',
    title: 'Lunch Break',
    startDate: new Date(2024, 9, 18, 12, 0),
    endDate: new Date(2024, 9, 18, 13, 0),
    color: 'green',
  },
  {
    id: '4',
    title: 'Client Presentation',
    description: 'Q3 Review',
    startDate: new Date(2024, 9, 22, 14, 0),
    endDate: new Date(2024, 9, 22, 15, 30),
    color: 'purple',
  },
  {
    id: '5',
    title: 'Code Review',
    startDate: new Date(2024, 9, 17, 15, 0),
    endDate: new Date(2024, 9, 17, 16, 0),
    color: 'orange',
  },
];

// Generate large dataset
const generateLargeDataset = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const colors: CalendarEvent['color'][] = ['blue', 'green', 'purple', 'orange', 'pink', 'red'];
  
  for (let i = 0; i < 25; i++) {
    const day = 10 + (i % 20);
    const hour = 9 + (i % 8);
    events.push({
      id: `event-${i}`,
      title: `Event ${i + 1}`,
      description: `Description for event ${i + 1}`,
      startDate: new Date(2024, 9, day, hour, 0),
      endDate: new Date(2024, 9, day, hour + 1, 0),
      color: colors[i % colors.length],
    });
  }
  
  return events;
};

const meta = {
  title: 'Components/CalendarView',
  component: CalendarView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A fully-featured calendar component with month and week views, event management, and keyboard navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    initialView: {
      control: 'radio',
      options: ['month', 'week'],
      description: 'Initial view mode',
    },
    events: {
      control: 'object',
      description: 'Array of calendar events',
    },
  },
} satisfies Meta<typeof CalendarView>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default calendar view with sample events
 */
export const Default: Story = {
  args: {
    events: sampleEvents,
    initialView: 'month',
    initialDate: new Date(2024, 9, 15),
  },
  parameters: {
    docs: {
      description: {
        story: 'The default calendar view showing a month with several sample events.',
      },
    },
  },
};

/**
 * Empty calendar with no events
 */
export const Empty: Story = {
  args: {
    events: [],
    initialView: 'month',
    initialDate: new Date(2024, 9, 15),
  },
  parameters: {
    docs: {
      description: {
        story: 'An empty calendar ready for users to add their first events.',
      },
    },
  },
};

/**
 * Week view showing hourly timeline
 */
export const WeekView: Story = {
  args: {
    events: sampleEvents,
    initialView: 'week',
    initialDate: new Date(2024, 9, 15),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar in week view with hourly time slots. Perfect for detailed scheduling.',
      },
    },
  },
};

/**
 * Calendar with many events
 */
export const LargeDataset: Story = {
  args: {
    events: generateLargeDataset(),
    initialView: 'month',
    initialDate: new Date(2024, 9, 15),
  },
  parameters: {
    docs: {
      description: {
        story: 'Testing performance with 25+ events spread across the month.',
      },
    },
  },
};

/**
 * Interactive demo with callbacks
 */
export const Interactive: Story = {
  args: {
    events: sampleEvents,
    initialView: 'month',
    initialDate: new Date(2024, 9, 15),
    onEventCreate: (event) => {
      console.log('Event created:', event);
    },
    onEventUpdate: (event) => {
      console.log('Event updated:', event);
    },
    onEventDelete: (eventId) => {
      console.log('Event deleted:', eventId);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive calendar with event creation, editing, and deletion. Check the console for event callbacks.',
      },
    },
  },
};
