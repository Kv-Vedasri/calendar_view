import { CalendarView } from '../components/Calendar/CalendarView';
import { CalendarEvent } from '../components/Calendar/CalendarView.types';

// Demo events
const demoEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Standup',
    description: 'Daily sync with development team',
    startDate: new Date(2024, 9, 29, 9, 0),
    endDate: new Date(2024, 9, 29, 9, 30),
    color: 'blue',
  },
  {
    id: '2',
    title: 'Design Review',
    description: 'Review new UI components',
    startDate: new Date(2024, 9, 29, 14, 0),
    endDate: new Date(2024, 9, 29, 15, 0),
    color: 'purple',
  },
  {
    id: '3',
    title: 'Project Deadline',
    startDate: new Date(2024, 9, 31, 17, 0),
    endDate: new Date(2024, 9, 31, 18, 0),
    color: 'red',
  },
  {
    id: '4',
    title: 'Client Meeting',
    description: 'Quarterly review',
    startDate: new Date(2024, 10, 1, 10, 0),
    endDate: new Date(2024, 10, 1, 11, 30),
    color: 'green',
  },
];

const Index = () => {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <header className="bg-card border-b border-border px-6 py-3 flex-none">
        <h1 className="text-xl font-bold text-foreground">
          Calendar View - Vedasri Uzence Assignment
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Built with React, TypeScript, Tailwind CSS, and Storybook
        </p>
      </header>
      
      <main className="flex-1 min-h-0">
        <CalendarView 
          events={demoEvents}
          onEventCreate={(event) => console.log('Created:', event)}
          onEventUpdate={(event) => console.log('Updated:', event)}
          onEventDelete={(id) => console.log('Deleted:', id)}
        />
      </main>
    </div>
  );
};

export default Index;
