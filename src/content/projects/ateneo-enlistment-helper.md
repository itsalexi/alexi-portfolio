---
slug: ateneo-enlistment-helper
title: Ateneo Enlistment Helper
tagline: >-
  A course scheduling platform to simplify the frustrating enlistment process
  for Ateneo students. The tool features a visual schedule builder, course
  search, and filtering, all powered by an automated web scraper that keeps
  class data up-to-date. It has been used by hundreds of students with over
  3,000 visits.
techStack:
  - nextjs
  - python
liveUrl: 'https://schedule.alexi.life'
githubUrl: 'https://github.com/itsalexi/Ateneo-Enlistment'
image: /images/projects/ateneo-enlistment-helper-featured.webp?v=1762343656588
featured: false
order: 4
---

#### **The Gist**

The Ateneo Enlistment Helper is a tool I made to fix the super frustrating process of planning class schedules. It's a web app that lets you search for courses, filter them however you want, and build your schedule visually. It started as a personal project, but it took off and has been used by hundreds of students with over 3,000 visits so far.

#### **Where It Came From**

Every semester, it was the same headache. The official university website for classes was old and a total pain to navigate. Finding classes that were open and fit your schedule felt like a huge chore.

Like everyone else, my solution was to copy-paste everything into a messy Google Sheet. I’d spend hours trying to piece together a schedule that worked, hoping I didn’t make any mistakes. I got tired of it and figured, why not just build something better?

![image_2025-11-05_194257924.png](/images/projects/new-1762342977951.webp)


#### **The Technical Hurdle: Getting the Data**

The biggest challenge was actually getting the course data. The university’s system was locked down, with no official way to access the class list.

So, I built a web scraper. I wrote a script to browse the portal like a student would, grabbing all the important info like schedules, professors, and open slots. The problem was, this data changed constantly as people signed up for classes.

To keep the Helper updated, I set up an automated job using GitHub Actions. It would re-run the scraper every few hours to pull the latest information. That was the key to making the whole tool reliable and actually useful.

![image_2025-11-05_194551939.png](/images/projects/new-1762343151965.webp)

#### **The Result: A Tool Students Liked**

Once I had the data figured out, I built a simple front-end with the features I always wanted: a good search, useful filters, and a visual schedule builder.

I shared it with a few friends, not expecting much, but it kind of blew up from there. Word got around, and soon tons of students were using it instead of their spreadsheets.

Seeing the visit count pass 3,000 was awesome. It was cool to see that something I built to solve my own problem ended up helping a bunch of other students get through the stress of enlistment.





![image_2025-11-05_194636488.png](/images/projects/new-1762343196515.webp)
