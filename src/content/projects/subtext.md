---
slug: subtext
title: Subtext
tagline: >-
  A Chrome extension for the messages you don't know how to answer. A quiet
  read of what they meant, and a reply in your own voice, inside Messenger and
  Instagram.
techStack:
  - typescript
  - chrome
  - openai
  - convex
  - nextjs
  - esbuild
liveUrl: 'https://getsubtext.chat'
githubUrl: null
image: /images/projects/subtext-featured.webp?v=20261003
featured: true
order: 2
---

## The gist

Subtext is a Chrome extension for Messenger and Instagram DMs, direct and group chats.

When a reply is hard to read, open its ⋯ menu and choose **Read with Subtext**. A small card appears under the message with a one-line read of what's going on and a reply written the way you text. If the first one isn't right, there are alternatives, including "no reply needed."

It never sends, edits, or reacts to a message. Copy puts the suggested text on your clipboard. Sending it is still you.

The site is at [getsubtext.chat](https://getsubtext.chat).

## Why I built it

Everyone has a message they've reread five times. "k." A "finally 😭" after you finally said the thing. A group chat with 80 unread and no idea if any of it is for you.

The usual move is to screenshot the chat and paste it into another app. That loses the thread, loses who said what, and the reply comes back sounding like a chatbot. I wanted the help to live inside the chat, read the whole conversation, and sound like me.

## What a reading actually is

A reading is an estimate, not knowledge of what someone meant.

Subtext reads the message in context: the last twelve messages by default, plus up to four recent photos. In group chats it keeps the speakers straight and preserves quoted replies, and it doesn't assume every message is addressed to you. For automatic readings it waits for a pause in typing, so it reads a finished thought instead of half of one.

Under the hood, an OpenAI model writes the interpretation and reply drafts with structured outputs, and TypeSafe's Jev model ranks the options. The reply matches your own sent messages: length, punctuation, emoji, and Taglish if that's how you text.

## Private by default

Most of the design went into what Subtext *doesn't* do.

- It only reads a conversation when you ask. Automatic help is a separate switch, per chat, and off unless you turn it on.
- It only reads messages the page has already loaded and images it can access. There are no private platform APIs.
- Chat memory stays in your browser. You can see what it remembers, clear one chat, or clear everything.
- Per-contact notes, per-site switches, a never-read list for people it should leave alone, and a one-hour pause.
- On the server, inputs are kept in encrypted temporary storage and expire after fifteen minutes; results after a day.

![The Subtext popup with privacy controls](/images/projects/subtext-popup.webp)

## How it's built

A Chrome MV3 extension in TypeScript, built with esbuild and plain DOM. Site adapters do read-only parsing of Messenger and Instagram markup; the content script renders the card in a shadow DOM; a service worker owns the pipeline, cache, and the trust boundary between tabs. The backend is Convex with Google sign-in, and the site is Next.js on Vercel.

Free is five readings a day. Plus is unlimited with automatic help in the chats you choose. There's a one-time lifetime option for the first two hundred people.

![A group chat where no reply is needed](/images/projects/subtext-group.webp)

## What I learned

The hard part wasn't the model. It was the page.

Messenger and Instagram don't expose stable message IDs, and their markup changes between a direct chat, a group, and a quoted reply. Most of the bugs were in reading the DOM correctly: a quote the adapter didn't recognize, a photo stored as a data URL instead of a CDN link, a reaction that changed a message's fingerprint and made it look new. Each one became a failing test first, then a fix.

The other lesson is about restraint. A reply helper that sends for you would be a worse product, not a more convenient one. Keeping a human on the send button is the feature.

Subtext is at [getsubtext.chat](https://getsubtext.chat).
