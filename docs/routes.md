## Portfolio Routes Overview

This document outlines the sitemap and purpose of each page route in the portfolio.

### Sitemap

```
/
├── /projects
│    ├── /projects/[slug]
│
├── /talks
│    ├── /talks/[slug]
│
├── /security
│    ├── /security/[slug]
│
├── /blog
│    ├── /blog/[slug]
│
└── /about
```

### Route Purposes

- **/**: Homepage with hero and a summary view of all sections.
- **/projects**: Projects index with filters/tabs and project cards.
- **/projects/[slug]**: Detailed project case study.
- **/talks**: Talks & workshops index with filters.
- **/talks/[slug]**: Individual talk/workshop details.
- **/security**: Security research timeline/table.
- **/security/[slug]**: Individual disclosure/write-up.
- **/blog**: Blog index with search/tags.
- **/blog/[slug]**: Blog post.
- **/about**: About page with bio, timeline, roles, and values.

### Documentation Checklist Compliance

- New routes added: documented here and in module-specific files below.
- No schema/database changes at this stage.
- No API endpoints introduced at this stage.

### Module Docs

See:

- `docs/projects.md`
- `docs/talks.md`
- `docs/security.md`
- `docs/blog.md`
- `docs/about.md`
