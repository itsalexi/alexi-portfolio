# Blog Module Documentation

## Overview

The Blog module provides a content management system for blog posts. It includes admin panel integration for creating and editing blog posts, public-facing pages for displaying blogs, and markdown-based content storage.

## Content Structure

Blog posts are stored as markdown files in `src/content/blogs/` with frontmatter metadata.

### Blog Markdown Format

```markdown
---
slug: example-blog-post
title: Example Blog Post
date: Nov 4, 2025
excerpt: A brief description of the blog post
tags:
  - React
  - Next.js
  - Web Development
image: /images/blogs/example-featured.webp
author: Alexi Shua
readTime: 5 min read
featured: true
---

## Introduction

Your blog content here in Markdown format...

## Section Title

More content...
```

### Frontmatter Fields

| Field      | Type    | Required | Description                                                   |
| ---------- | ------- | -------- | ------------------------------------------------------------- |
| `slug`     | string  | Yes      | URL-friendly identifier (auto-generated from title)           |
| `title`    | string  | Yes      | Blog post title                                               |
| `date`     | string  | Yes      | Publication date (human-readable format)                      |
| `excerpt`  | string  | Yes      | Brief description for blog list and SEO                       |
| `tags`     | array   | No       | Array of topic tags                                           |
| `image`    | string  | No       | Path to featured image                                        |
| `author`   | string  | No       | Author name (defaults to "Alexi Canamo")                      |
| `readTime` | string  | Auto     | Automatically calculated based on word count (~200 words/min) |
| `featured` | boolean | No       | Whether to feature this post on homepage                      |

## API Routes

All admin API routes are **development-only** (return 403 in production).

### List All Blogs

**Endpoint:** `GET /api/admin/blogs`

**Authentication:** Development environment only

**Description:** Returns a list of all blog slugs.

**Response:**

```json
[
  "getting-started-with-nextjs",
  "building-scalable-apis",
  "javascript-best-practices"
]
```

**Status Codes:**

- `200` - Success
- `403` - Forbidden (production environment)

---

### Get Blog by Slug

**Endpoint:** `GET /api/admin/blogs/[slug]`

**Authentication:** Development environment only

**Parameters:**

- `slug` (path parameter) - The blog post slug

**Description:** Returns the blog post data including metadata and content.

**Response:**

```json
{
  "title": "Getting Started with Next.js",
  "date": "Nov 4, 2025",
  "excerpt": "Learn the fundamentals of Next.js and build your first application",
  "tags": "React, Next.js, Tutorial",
  "image": "/images/blogs/nextjs-featured.webp",
  "author": "Alexi Canamo",
  "featured": false,
  "content": "## Introduction\n\nNext.js is a powerful React framework..."
}
```

**Note:** Reading time is not returned in the API response as it's calculated dynamically when rendering.

**Status Codes:**

- `200` - Success
- `404` - Blog post not found
- `403` - Forbidden (production environment)

---

### Create/Update Blog

**Endpoint:** `POST /api/admin/blogs/[slug]`

**Authentication:** Development environment only

**Parameters:**

- `slug` (path parameter) - The blog slug or "new" for creating

**Request Body:**

```json
{
  "title": "Getting Started with Next.js",
  "date": "Nov 4, 2025",
  "excerpt": "Learn the fundamentals of Next.js",
  "tags": "React, Next.js, Tutorial",
  "image": "/images/blogs/nextjs-featured.webp",
  "author": "Alexi Canamo",
  "featured": false,
  "content": "## Introduction\n\nYour blog content..."
}
```

**Description:** Creates a new blog post or updates an existing one. Tags should be comma-separated string.

**Response:**

```json
{
  "success": true,
  "slug": "getting-started-with-nextjs"
}
```

**Behavior:**

- When `slug` is "new", generates slug from title
- Converts tags string to array in frontmatter
- **Automatically calculates reading time** based on word count (~200 words/min)
- Creates blog directory if it doesn't exist
- Overwrites existing file with same slug

**Status Codes:**

- `200` - Success
- `403` - Forbidden (production environment)

## Public Routes

### Blog List Page

**Route:** `/blog`

**Description:** Displays all blog posts in a grid layout, sorted by date (newest first).

**Features:**

- Responsive grid (1 column mobile, 2 tablet, 3 desktop)
- Blog card preview with featured image, title, excerpt, tags
- Metadata (date, read time, author)
- Empty state when no blogs exist
- SEO metadata

**Data Source:** Reads from `src/content/blogs/` directory

---

### Blog Detail Page

**Route:** `/blog/[slug]`

**Description:** Displays a single blog post with full content.

**Features:**

- Full markdown rendering with syntax highlighting
- Featured image display
- Blog metadata (date, read time, author, tags)
- **Floating back button** that appears on scroll (desktop only)
- **Automatic reading time calculation** based on content length
- SEO metadata from frontmatter
- Responsive typography

**Static Generation:** Uses `generateStaticParams` to pre-render all blog pages at build time.

## Admin Panel Integration

### Blog Editor Interface

**Access:** `/admin` → "Blogs" tab (development only)

**Features:**

1. **Blog List Sidebar**

   - Lists all existing blog posts
   - Click to load for editing
   - "New Blog" button to create

2. **Blog Metadata Form**

   - Title (text input)
   - Date (text input, free format)
   - Author (text input, defaults to "Alexi Canamo")
   - Excerpt (textarea)
   - Tags (comma-separated input)
   - Featured Image upload
   - Featured checkbox
   - **Note:** Reading time is automatically calculated based on content length

3. **Content Editor**

   - Markdown editor with live preview
   - Image upload functionality
   - Syntax highlighting

4. **Actions**
   - Save Changes button (creates/updates markdown file)
   - Preview button (opens blog post in new tab)

### Creating a New Blog

1. Navigate to `/admin`
2. Click "Blogs" tab
3. Click "+ New Blog" button
4. Fill in metadata fields
5. Write content in markdown editor
6. Upload featured image (optional)
7. Click "Save Changes"
8. Blog is created as markdown file with slug generated from title

### Editing Existing Blog

1. Navigate to `/admin`
2. Click "Blogs" tab
3. Select blog from sidebar
4. Metadata and content load into editor
5. Make changes
6. Click "Save Changes"
7. Markdown file is updated

## Utilities

### Reading Time Calculator

**Location:** `src/lib/reading-time.js`

**Function:** `calculateReadingTime(text, wordsPerMinute = 200)`

**Description:** Automatically calculates estimated reading time based on word count.

**Features:**

- Removes markdown syntax before counting
- Excludes code blocks, images, and links from word count
- Defaults to 200 words per minute (average reading speed)
- Returns formatted string (e.g., "5 min read")
- Minimum: "1 min read"

**Usage:**

```javascript
import { calculateReadingTime } from "@/lib/reading-time";

const content = "## Hello\n\nThis is a blog post...";
const readTime = calculateReadingTime(content);
// Returns: "1 min read"
```

## Components

### BlogCard

**Location:** `src/components/BlogCard.js`

**Props:**

```javascript
{
  slug: string,        // Blog slug for link
  title: string,       // Blog title
  date: string,        // Publication date
  excerpt: string,     // Brief description
  tags: array,         // Array of tag strings
  image: string,       // Featured image URL
  author: string,      // Author name
  readTime: string     // Reading time estimate
}
```

**Features:**

- Hover animations (scale, border color)
- Featured image display
- Metadata badges (date, read time)
- Tag pills
- Responsive design
- Link to blog detail page

### BlogContent

**Location:** `src/app/blog/[slug]/BlogContent.js`

**Props:**

```javascript
{
  blog: {
    title: string,
    date: string,
    excerpt: string,
    tags: array,
    image: string,
    author: string,
    readTime: string,
    content: string     // Markdown content
  }
}
```

**Features:**

- Full markdown rendering with custom components
- Code syntax highlighting
- Responsive images
- Tables, lists, blockquotes support
- Back navigation button
- Metadata display

## File Upload

Blog images use the shared upload endpoint:

**Endpoint:** `POST /api/admin/upload`

**Usage in Blog Editor:**

- Featured image upload → sets `blogData.image`
- Content image upload → inserts markdown `![](url)` into editor

**Storage:** Images are uploaded to `public/images/` directory

## Styling

All blog components use:

- Tailwind CSS utility classes
- Dark mode design (black background)
- Custom color palette (blue accents)
- Framer Motion animations
- Responsive breakpoints (md, lg)

## Data Flow

### Creating/Editing Flow

1. User loads admin panel
2. Client fetches `/api/admin/blogs` (list)
3. User selects blog or creates new
4. Client fetches `/api/admin/blogs/[slug]` (if editing)
5. User edits in form
6. User clicks "Save"
7. Client POSTs to `/api/admin/blogs/[slug]`
8. Server writes markdown file to `src/content/blogs/`
9. Client shows success message

### Public Display Flow

1. User visits `/blog`
2. Server reads all markdown files from `src/content/blogs/`
3. Server parses frontmatter and sorts by date
4. Server renders blog grid with BlogCard components
5. User clicks blog card
6. Server loads individual markdown file
7. Server renders BlogContent with parsed markdown

## SEO Optimization

### Blog List Page

- Title: "Blog - Alexi Shua"
- Description: "Thoughts on technology, web development, and building products"

### Blog Detail Page

- Title: `{blog.title} - Alexi Shua`
- Description: From `blog.excerpt` or fallback

## Best Practices

1. **Writing Blogs**

   - Use clear, descriptive titles
   - Write compelling excerpts (150-200 characters)
   - Add relevant tags for categorization
   - Include featured image for better engagement
   - Use markdown headings (##, ###) for structure

2. **Images**

   - Optimize images before upload (WebP format recommended)
   - Use descriptive alt text
   - Featured images should be landscape (16:9 ratio works well)

3. **Tags**

   - Use consistent tag naming (e.g., "React" not "react" or "ReactJS")
   - Limit to 3-5 relevant tags per post
   - Common tags: React, Next.js, JavaScript, TypeScript, Web Development, Tutorial

4. **Dates**

   - Use consistent format: "Nov 4, 2025"
   - Update date when making significant revisions

5. **Read Time**
   - **Automatically calculated** - no manual input needed
   - Calculation: ~200 words per minute
   - Format: "X min read" (e.g., "1 min read", "5 min read")

## Troubleshooting

### Blog Not Appearing

- Check markdown file exists in `src/content/blogs/`
- Verify frontmatter is valid YAML
- Ensure `slug` field matches filename

### Image Not Loading

- Verify image path is correct (relative to `public/`)
- Check file was uploaded successfully
- Ensure image format is supported (jpg, png, webp)

### Markdown Not Rendering

- Check for valid markdown syntax
- Ensure content field has actual content
- Verify ReactMarkdown is processing correctly

### Save Failing in Admin

- Check you're in development environment
- Verify all required fields are filled
- Check console for error messages
- Ensure file system permissions allow writing

## Future Enhancements

Potential features for future development:

- [ ] Blog categories/filtering
- [ ] Search functionality
- [ ] Related posts suggestions
- [ ] Comments system
- [ ] Social media sharing
- [ ] RSS feed
- [ ] Blog analytics
- [ ] Draft/publish status
- [ ] Scheduled publishing
- [ ] Multi-author support
