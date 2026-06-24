# Momentum Ledger Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a clean editorial momentum ledger: startup/product work first, builder timeline second, student tools third, with quiet magazine moments only where useful.

**Architecture:** Keep the current Next.js App Router structure and content loaders. Rebuild the homepage around focused local components inside `HomeClient.js`, keep `Hero.js` as the first-screen composition, simplify Contact and About as standalone client components, and keep archive filtering visible and reliable.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS, motion/react, Tabler icons, local markdown/frontmatter content.

---

### Task 1: Rebuild Homepage Core

**Files:**
- Modify: `src/components/Hero.js`
- Modify: `src/app/HomeClient.js`

- [ ] Replace the hero with an editorial first screen: strong headline, one paragraph, direct links, compact current-signal note, no stat cards and no large photos.
- [ ] Replace homepage sections with: Product Work, Builder Timeline, Shipped Student Tools, Writing/Talks/Hackathons, About Strip, Contact.
- [ ] Use curated arrays inside `HomeClient.js` for product work and timeline ordering while pulling projects/blogs/talks/hackathons from existing props.
- [ ] Use medium visual panels only in the writing/talks/hackathons and shipped tools sections.
- [ ] Remove motion wrappers from filtered experience rows so one-item filters render visibly.

### Task 2: Fix Filters and Archive Hierarchy

**Files:**
- Modify: `src/app/projects/ProjectsClient.js`
- Modify: `src/app/talks/TalksClient.js`
- Modify: `src/app/projects/page.js`
- Modify: `src/app/talks/page.js`
- Modify: `src/app/blog/page.js`
- Modify: `src/app/hackathons/page.js`

- [ ] Keep visible chip filters with normalized matching.
- [ ] Remove dropdown reliance.
- [ ] Remove decorative stat strips from archive headers.
- [ ] Keep archive headers direct: title, one-line context, content.

### Task 3: Rebuild Cards as Editorial Items

**Files:**
- Modify: `src/components/ProjectCard.js`
- Modify: `src/components/BlogCard.js`
- Modify: `src/components/TalkCard.js`
- Modify: `src/components/HackathonCard.js`

- [ ] Use rows for archive cards.
- [ ] Use medium previews for blogs/talks/hackathons, not tiny thumbnails.
- [ ] Keep excerpts hidden or line-clamped to avoid text-heavy layouts.

### Task 4: Rebuild About and Contact

**Files:**
- Modify: `src/app/about/AboutClient.js`
- Modify: `src/components/ContactCanvas.js`
- Create/keep: `src/app/contact/page.js`

- [ ] About page uses bio-first editorial layout, compact carousel, concise origin story, links.
- [ ] Contact is direct email/copy/social links only.
- [ ] Remove draft starters, composer UI, prompt chips, and large contact photos.

### Task 5: Verify

**Commands:**
- `PATH=/Users/alexi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH ./node_modules/.bin/biome check --write <touched files>`
- `PATH=/Users/alexi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH ./node_modules/.bin/next build`
- Browser QA at desktop 1440x900 and narrow viewport.

**Browser checks:**
- Homepage first screen reads as young builder with momentum.
- Product work appears first after hero.
- Builder timeline filters show All, Work, Leadership, Startup, Education, including one-item states.
- Student tools section appears after timeline.
- Writing/Talks/Hackathons use medium images.
- About carousel controls scroll.
- Contact has no draft starter/composer UI.
- Projects and Talks filters work.
