# About Page Documentation

## Overview

The About page is the most creative and visually stunning page of the portfolio, showcasing personality, journey, and fun facts through various interactive Aceternity UI components.

## Features

### 1. **Hero Section with Spotlight**

- Large animated heading with sparkles effect
- Profile photo with decorative ring
- Personal introduction text
- Spotlight effect for visual impact

### 2. **Bento Grid - "What Makes Me Tick"**

- Four interactive cards showcasing:
  - Builder at Heart (passion for creating)
  - Community First (teaching and mentorship)
  - Forever Learning (continuous growth)
  - Beyond Code (hobbies and interests)
- Responsive grid layout (1 column mobile, 3 columns desktop)
- Hover effects and smooth transitions

### 3. **Photo Gallery with Lens Effect**

- Interactive image zoom on hover
- Three photo sections:
  - Working on a project
  - At a tech event
  - Coffee and code
- Responsive grid layout

### 4. **Personal Timeline**

- Shows journey from early days to present
- Three main periods:
  - 2025: Full Stack Journey
  - 2024: University Life Begins
  - Growing Up: The Early Days
- Smooth scroll animations

### 5. **Fun Facts - 3D Cards**

- Three interactive 3D cards:
  - Coffee Addict ☕
  - Night Owl 🦉
  - Playlist Curator 🎵
- Perspective tilt effect on hover
- Gradient backgrounds

### 6. **Closing Statement**

- Large text hover effect with "LET'S BUILD"
- Call to action with email link
- Centered and impactful

## Images Required

### Current Setup

The page currently uses placeholder images. You need to replace them with actual photos:

### Required Images

1. **Profile Photo** (Already exists)

   - Path: `/avatar.jpg`
   - Used in: Hero section (large circular photo)
   - Recommended size: 512x512px minimum
   - Format: JPG or WebP

2. **Photo Gallery Images** (Need to add)

   - **Photo 1 - Working on Project**

     - Path: `/images/about/working.jpg`
     - Description: Photo of you coding, working on laptop, or at desk
     - Recommended size: 800x600px minimum
     - Format: JPG or WebP

   - **Photo 2 - Tech Event**

     - Path: `/images/about/event.jpg`
     - Description: Photo from workshop, hackathon, or tech meetup
     - Recommended size: 800x600px minimum
     - Format: JPG or WebP

   - **Photo 3 - Coffee and Code**
     - Path: `/images/about/coffee-code.jpg`
     - Description: Casual photo showing personality (coffee, setup, hobby, etc.)
     - Recommended size: 800x600px minimum
     - Format: JPG or WebP

### How to Update Images

1. **Add your photos** to `public/images/about/`
2. **Update the photo array** in `src/app/about/AboutClient.js` (around line 270):

```javascript
const photos = [
  { src: "/images/about/working.jpg", alt: "Working on a project" },
  { src: "/images/about/event.jpg", alt: "At a tech event" },
  { src: "/images/about/coffee-code.jpg", alt: "Coffee and code" },
];
```

3. Replace the placeholder array in the component:

```javascript
{photos.map((photo, i) => (
  <motion.div key={i} ...>
    <Lens>
      <div className="relative h-80 w-full rounded-lg overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
        />
      </div>
    </Lens>
  </motion.div>
))}
```

## Customization Guide

### Personal Information

Update the following sections in `src/app/about/AboutClient.js`:

1. **Hero Section Text** (line ~165-175)

   - Main description
   - Short version text

2. **Bento Grid Items** (line ~78-127)

   - Customize the 4 cards to match your personality
   - Update titles, descriptions, and icons

3. **Timeline Data** (line ~25-75)

   - Add/modify timeline entries
   - Update years and descriptions to match your journey

4. **Fun Facts** (line ~130-145)
   - Replace with your own quirks and personality traits
   - Update titles, descriptions, and gradient colors

### Contact Email

Update the email link in the closing section (line ~411):

```javascript
<a
  href="mailto:your-email@example.com"
  className="text-blue-400 hover:text-blue-300 transition-colors underline"
>
  Let's connect.
</a>
```

## UI Components Used

### Aceternity UI Components

- `AuroraBackground` - Animated gradient background
- `BentoGrid` & `BentoGridItem` - Grid layout for personality cards
- `Timeline` - Personal journey timeline
- `Lens` - Interactive image zoom effect
- `CardContainer`, `CardBody`, `CardItem` - 3D card effects
- `TextHoverEffect` - Large animated text
- `Sparkles` - Decorative sparkle effect
- `Spotlight` - Spotlight effect on hero

### Icons (Tabler Icons)

- `IconCode` - Building/coding
- `IconRocket` - Projects/launches
- `IconHeart` - Community/passion
- `IconBulb` - Learning/ideas
- `IconUsers` - Community
- `IconBrain` - Thinking/learning
- `IconCamera`, `IconMusic`, `IconCoffee`, `IconMountain` - Hobbies

## Animations

All sections use Framer Motion for smooth animations:

- **Fade in** on scroll (viewport detection)
- **Scale and opacity** transitions
- **Staggered animations** for grids
- **3D tilt effects** on cards
- **Lens zoom** on hover

## Responsive Design

- **Mobile**: Single column layouts, smaller text, stacked elements
- **Tablet**: 2-column grids where appropriate
- **Desktop**: Full 3-column grids, larger spacing, all effects enabled

## Best Practices

1. **Keep it personal** - This page should feel authentic and showcase your personality
2. **Use quality images** - High-resolution photos that represent you well
3. **Be creative** - Don't be afraid to customize colors, animations, and content
4. **Update regularly** - Keep timeline and achievements current
5. **Test interactions** - Ensure all hover effects and animations work smoothly

## File Structure

```
src/app/about/
├── page.js           # Main page with metadata
└── AboutClient.js    # Client component with all the content

src/components/ui/
├── aurora-background.jsx
├── bento-grid.jsx
├── timeline.jsx
├── lens.jsx
├── sparkles.jsx
├── 3d-card.jsx
├── text-hover-effect.jsx
└── spotlight.jsx

public/images/about/
├── working.jpg       # (to add)
├── event.jpg         # (to add)
└── coffee-code.jpg   # (to add)
```

## Performance Notes

- All images use Next.js `Image` component for optimization
- Animations use GPU acceleration via Framer Motion
- Viewport detection prevents animations from running until visible
- Lazy loading for all non-critical content

---

**Note**: This is your chance to stand out! Make sure the content authentically represents you and your journey. The effects are there to enhance your story, not replace it.
