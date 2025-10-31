# 🚀 Setup Guide - Calendar View Project

## Quick Start Commands

```bash
# Install all dependencies
npm install

# Run development server
npm run dev
# Visit: http://localhost:8080

# Run Storybook
npm run storybook
# Visit: http://localhost:6006

# Build for production
npm run build
```

## 📋 Step-by-Step Setup

### 1. Verify Installation
After running `npm install`, verify these packages are installed:
- ✅ React 18 + TypeScript
- ✅ Vite
- ✅ Tailwind CSS
- ✅ Storybook 8
- ✅ date-fns
- ✅ zustand
- ✅ framer-motion
- ✅ clsx

### 2. Development Workflow

**Option A: View in Browser**
```bash
npm run dev
```
- Opens calendar at `localhost:8080`
- Hot reload enabled
- Full calendar functionality

**Option B: View in Storybook**
```bash
npm run storybook
```
- Opens Storybook at `localhost:6006`
- Interactive component documentation
- 5 different story variations
- Component props playground

### 3. Testing the Calendar

#### In Browser (`npm run dev`):
1. Click dates to create events
2. Click "New Event" button
3. Switch between Month/Week views
4. Use Previous/Next/Today navigation
5. Edit/delete existing events

#### In Storybook (`npm run storybook`):
1. Navigate to "Components/CalendarView"
2. Try different stories:
   - **Default**: Sample events
   - **Empty**: No events
   - **Week View**: Hourly timeline
   - **Large Dataset**: Performance test
   - **Interactive**: Full CRUD operations

### 4. Keyboard Accessibility Testing

- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and cells
- **Escape**: Close modals
- **Arrow Keys**: Navigate calendar grid

### 5. Responsive Testing

Test in different viewports:
- Mobile: 375px width
- Tablet: 768px width
- Desktop: 1280px+ width

## 📦 Build Scripts

```bash
# Development
npm run dev              # Start dev server
npm run storybook        # Start Storybook

# Production
npm run build            # Build for production
npm run preview          # Preview production build
npm run build-storybook  # Build Storybook static site
```

## 🌐 Deployment

### Deploy Main App (Vercel/Netlify)
```bash
npm run build
# Upload 'dist' folder to hosting platform
```

### Deploy Storybook (Chromatic/Vercel)
```bash
npm run build-storybook
# Upload 'storybook-static' folder
```

### Chromatic Deployment (Recommended for Storybook)
```bash
npx chromatic --project-token=<your-token>
```

## 🔍 Project Checklist

### ✅ Required Features
- [x] Month view (42-cell grid)
- [x] Week view (hourly timeline)
- [x] Event creation modal
- [x] Event editing
- [x] Event deletion
- [x] Navigation controls (prev/next/today)
- [x] View switching (month/week)
- [x] Responsive design
- [x] Keyboard accessibility
- [x] TypeScript types
- [x] Storybook documentation

### ✅ Technical Requirements
- [x] No UI libraries (MUI, Shadcn, etc.)
- [x] No pre-built calendar libraries
- [x] No CSS-in-JS
- [x] Custom primitives (Button, Modal, Select)
- [x] Performance optimizations (memo, callbacks)
- [x] State management (Zustand)
- [x] Date utilities (date-fns only)

### ✅ Design Requirements
- [x] Professional Uzence brand colors
- [x] Semantic HSL color tokens
- [x] Consistent spacing/typography
- [x] Smooth animations
- [x] Accessible contrast ratios

## 📝 Common Issues & Solutions

### Issue: Storybook won't start
**Solution:** 
```bash
rm -rf node_modules package-lock.json
npm install
npm run storybook
```

### Issue: TypeScript errors
**Solution:** All types are defined in `CalendarView.types.ts`

### Issue: Events not showing
**Solution:** Check date format - must be JavaScript Date objects

### Issue: Styles not applying
**Solution:** Verify `index.css` is imported in `main.tsx`

## 🎯 Next Steps

1. **Test Everything**: Try all features in both dev and Storybook
2. **Deploy**: Push to GitHub and deploy to Vercel/Netlify
3. **Document**: Add deployed URLs to README.md
4. **Submit**: Share GitHub repo + live links with Uzence

## 📞 Need Help?

Check these resources:
- [Storybook Docs](https://storybook.js.org/docs)
- [date-fns Docs](https://date-fns.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Docs](https://docs.pmnd.rs/zustand)

---

**Good luck with your Uzence assignment, Vedasri! 🎉**
