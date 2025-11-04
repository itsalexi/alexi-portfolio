# About Page - Personal & Fun 🎨

## Design Philosophy

**Personal, not professional.** This is about YOU - your interests, personality, and what makes you tick. Not a resume.

## Page Structure

### 1. **Hero Section**

Side-by-side introduction:

**Left:**

- Square profile photo
- Quick stats (age, location, school, scholar)

**Right:**

- "Hey, I'm Alexi! 👋"
- Personal intro - started at age 7
- Philosophy and beliefs
- Casual and friendly tone

### 2. **What I'm Into** (4 Interest Cards)

Your hobbies and interests with photos:

1. **☕ Coffee Enthusiast**

   - Photo of coffee/coding setup
   - Fun caption about unhealthy coffee ratio

2. **📷 Photography**

   - Photo of you with camera or shots you've taken
   - About capturing moments

3. **🎵 Music Curator**

   - Photo with headphones/music
   - Your coding playlists

4. **💻 Building Things**
   - Photo coding/building projects
   - The magic of creating

Each card: Image + Icon + Title + Personal description

### 3. **How It Started**

Your origin story:

- Age 7 beginning
- Current status
- Philosophy highlighted
- Beliefs highlighted
- Personal and authentic

### 4. **Life Lately** (8 Photo Grid)

Grid of snapshots showing your life:

- Teaching workshops
- At events
- Late night coding
- Campus life
- With friends
- Coffee runs
- Project demos
- Casual hangouts

Hover to see captions.

### 5. **What Drives Me** (3 Value Cards)

Your core beliefs:

- Build for Impact
- Just Ship It
- Keep Learning

### 6. **Big CTA**

- **TextHoverEffect** - "LET'S BUILD" (the cool big text!)
- Personal message
- Email button

## BackgroundEffects

✅ **Dot Grid** - Subtle background pattern
✅ **Gradient Background** - Animated gradients
✅ **Click Particles** - Interactive particles on click

All from the `BackgroundEffects` component!

## Images Needed

### Total: **13 Photos**

#### 1. Main Profile (Hero)

- **Path**: `/avatar.jpg`
- **Format**: Square (1:1)
- **Use**: Hero section profile photo

#### 2-5. Interest Cards (4 photos)

- **Coffee**: `/images/about/coffee.jpg` - You with coffee/coding
- **Photography**: `/images/about/photography.jpg` - You taking photos
- **Music**: `/images/about/music.jpg` - You with headphones
- **Building**: `/images/about/building.jpg` - You coding/building

#### 6-13. Life Snapshots (8 photos)

- **Teaching**: `/images/about/teaching.jpg`
- **Events**: `/images/about/events.jpg`
- **Late night**: `/images/about/latenight.jpg`
- **Campus**: `/images/about/campus.jpg`
- **Friends**: `/images/about/friends.jpg`
- **Coffee run**: `/images/about/coffeerun.jpg`
- **Demo**: `/images/about/demo.jpg`
- **Casual**: `/images/about/casual.jpg`

All currently using `/avatar.jpg` as placeholders.

## How to Update Images

### Interest Cards (lines ~120-220)

```javascript
<Image
  src="/images/about/coffee.jpg" // Update these
  alt="Coffee and code"
  fill
  className="object-cover"
/>
```

### Life Snapshots Grid (line ~305)

Update the image paths in the map (all currently `/avatar.jpg`).

## Customization

### Update Email

Line ~435:

```javascript
href = "mailto:your-email@example.com";
```

### Update Content

All super easy to edit:

- **Hero intro** (lines ~77-92): Your personal story
- **Interest descriptions** (lines ~130, 155, 180, 205): What you love
- **Origin story** (lines ~235-265): Your journey
- **Photo captions** (line ~305): What each photo shows
- **Values** (lines ~330-370): What drives you

## Why This Works

✅ **Personal** - About YOU, not work
✅ **Visual** - 13 photo spots showing your life
✅ **Interests** - Coffee, photography, music, building
✅ **Story** - Your journey from age 7
✅ **BackgroundEffects** - Dot grid + gradients + particles
✅ **TextHoverEffect** - The cool big text is back!
✅ **Natural** - Photos integrated throughout
✅ **Fun** - Casual, friendly tone

## Components Used

- `BackgroundEffects` - Dot grid, gradients, click particles
- `TextHoverEffect` - Big "LET'S BUILD" text
- `Image` (Next.js) - All photos
- `Framer Motion` - Scroll animations
- Tabler Icons - Interest icons

## Sections Breakdown

1. **Hero** - Who you are (1 photo)
2. **Interests** - What you love (4 photos)
3. **Story** - How you got here (no photo, just text)
4. **Life** - Random moments (8 photos)
5. **Values** - What drives you (no photos)
6. **CTA** - Let's build (TextHoverEffect!)

**Total: 13 photo spots to show off your personality!**

---

**This is YOU - authentic, personal, and real.** 🚀
