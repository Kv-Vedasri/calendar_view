# 📅 Calendar View Component

A professional, fully-featured calendar component built from scratch for the Uzence frontend developer assignment.

## 🎯 Assignment Details


**Project:** Calendar View Component

## 🚀 Live Demo

- **Live App:** [Add your deployed URL here]
- **Storybook:** [Add your Storybook URL here]

## ✨ Features

### Core Functionality
- ✅ **Month View** - 42-cell grid with event badges
- ✅ **Week View** - Hourly timeline (24-hour format)
- ✅ **Event Management** - Create, edit, and delete events
- ✅ **Navigation** - Previous, next, and today controls
- ✅ **View Switching** - Toggle between month and week views

### Technical Features
- ✅ **TypeScript** - Fully typed with interfaces
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Keyboard Accessibility** - Tab, Enter, Arrow key navigation
- ✅ **Performance Optimized** - React.memo, useCallback, lazy loading
- ✅ **State Management** - Zustand for event management
- ✅ **Animations** - Smooth transitions with Framer Motion
- ✅ **Custom Primitives** - Button, Modal, Select (no UI libraries)

### Design System
- Professional Uzence brand colors
- Semantic HSL color tokens
- Consistent spacing and typography
- Dark mode ready
- Accessible contrast ratios

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Documentation | Storybook 8 |
| State Management | Zustand |
| Date Utilities | date-fns |
| Animations | Framer Motion |
| Utilities | clsx |

## 📂 Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── CalendarView.tsx          # Main calendar wrapper
│   │   ├── CalendarView.stories.tsx  # Storybook stories
│   │   ├── CalendarView.types.ts     # TypeScript types
│   │   ├── MonthView.tsx             # Month view grid
│   │   ├── WeekView.tsx              # Week view timeline
│   │   ├── CalendarCell.tsx          # Individual day cell
│   │   └── EventModal.tsx            # Event creation/edit modal
│   └── primitives/
│       ├── Button.tsx                # Custom button component
│       ├── Modal.tsx                 # Custom modal component
│       └── Select.tsx                # Custom select component
├── hooks/
│   ├── useCalendar.ts                # Calendar navigation logic
│   └── useEventManager.ts            # Event CRUD operations
├── utils/
│   ├── date.utils.ts                 # Date manipulation helpers
│   └── event.utils.ts                # Event filtering/sorting
└── styles/
    └── index.css                     # Design system tokens
```

## 🎨 Design System

### Color Palette
- **Primary:** `hsl(250 70% 60%)` - Uzence blue-purple
- **Secondary:** `hsl(240 5% 96%)` - Neutral gray
- **Event Colors:** Blue, Green, Purple, Orange, Pink, Red
- **States:** Success, Warning, Destructive

### Key Design Tokens
```css
--primary: 250 70% 60%;
--event-blue: 217 91% 60%;
--calendar-today: 250 70% 97%;
--transition-smooth: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
```

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Install Dependencies
```bash
# Clone the repository
git clone <your-repo-url>
cd calendar-view-vedasri

# Install dependencies
npm install
```

### Run Development Server
```bash
npm run dev
```
Visit `http://localhost:8080`

### Run Storybook
```bash
npm run storybook
```
Visit `http://localhost:6006`

### Build for Production
```bash
npm run build
```

## 🎪 Storybook Stories

The component includes 5 comprehensive stories:

1. **Default** - Calendar with sample events
2. **Empty** - Clean slate for new users
3. **Week View** - Hourly timeline view
4. **Large Dataset** - Performance test with 25+ events
5. **Interactive** - Full CRUD operations demo

## ♿ Accessibility

- **Keyboard Navigation** - Full keyboard support
- **ARIA Labels** - Proper semantic HTML and ARIA attributes
- **Focus Management** - Clear focus indicators
- **Screen Reader** - Descriptive labels for assistive technology

## ⚡ Performance Optimizations

- `React.memo` for expensive components
- `useCallback` for event handlers
- Virtualized rendering for large datasets
- Optimized re-renders with Zustand
- Lazy loading for modal content

## 🧪 Testing

The component can be tested via:
- Interactive Storybook stories
- Browser DevTools for accessibility
- Console logs for event callbacks
- Visual testing in different viewports

## 📱 Responsive Design

- **Mobile:** Stacked layout with touch-friendly targets
- **Tablet:** Optimized grid spacing
- **Desktop:** Full-featured experience

## 🚫 Constraints Met

✅ No UI libraries (MUI, Shadcn, Chakra, Radix)  
✅ No pre-built calendar libraries  
✅ No CSS-in-JS  
✅ Built from scratch using only approved tools

## 🎓 Key Learnings

- Custom component architecture without UI libraries
- State management with Zustand
- Complex date manipulation with date-fns
- Accessible modal patterns
- Performance optimization techniques

## 📧 Contact

**Vedasri**  
- Email: [your-email@example.com]
- GitHub: [your-github-username]
- LinkedIn: [your-linkedin-profile]

## 📄 License

This project was created as an assignment for Uzence.

---

**Note:** This is a technical assignment showcasing frontend development skills with React, TypeScript, and modern web technologies.
