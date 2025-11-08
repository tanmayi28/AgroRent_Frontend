# AgroRent - React + Tailwind Homepage

This is a modern, redesigned homepage for AgroRent built with React and Tailwind CSS.

## Features Implemented

✅ **Visual Hierarchy**
- Dark gradient overlay on background video for better text readability
- Soft drop shadows and subtle scaling hover effects on cards
- Improved contrast and visual depth

✅ **Typography & Readability**
- Clean modern sans-serif fonts (Inter/Poppins)
- Increased tagline font size and contrast
- Bold, clear headings

✅ **Navbar Refinement**
- Logo on left, links centered/right-aligned
- Improved spacing and proper capitalization ("How It Works")
- Subtle hover underline animations

✅ **Buttons & CTAs**
- High-contrast buttons:
  - Green (#22c55e) for "Browse Equipment"
  - Orange (#f97316) for "List Your Equipment"
- Hover animations (scale + color darken)
- Equal width buttons, clearly clickable

✅ **Layout Adjustments**
- Hero section vertically centered
- Mobile: cards stack vertically with good spacing and full width
- Fully responsive on all breakpoints

✅ **Trust & Engagement**
- Trust section with icons:
  - ✅ 100+ verified owners
  - 🔒 Secure rentals
  - 🌾 Serving farmers nationwide

✅ **Code Quality**
- React functional components with hooks
- Tailwind CSS for styling
- Semantic class names
- Clean, commented JSX
- Production-ready code

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
├── HomePage.jsx          # Main homepage component
├── App.js               # App router setup
├── App.css              # Global styles + Tailwind imports
├── index.js             # React entry point
├── tailwind.config.js   # Tailwind configuration
├── package.json         # Dependencies
└── public/
    └── index.html       # HTML template
```

## Key Components

### HomePage Component
- Responsive navigation bar with dropdown menus
- Hero section with video background
- Equipment cards with hover effects
- Trust section
- Login state management

## Styling

The component uses Tailwind CSS utility classes for all styling:
- Responsive design with breakpoints (sm, md, lg)
- Custom colors matching brand guidelines
- Smooth transitions and animations
- Glassmorphic effects with backdrop blur

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- Make sure to place your video file at `/public/assets/Hero page video.mp4`
- Place logo image at `/public/assets/hero text.png`
- Update routes in `App.js` as needed for other pages

