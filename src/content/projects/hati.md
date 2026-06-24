---
slug: hati
title: Hati
tagline: >-
  A KKB receipt splitter that tracked 200k+ in shared expenses across 200+
  completed splits after 156 downloads.
techStack:
  - swiftui
  - swiftdata
  - storekit
  - convex
  - nextjs
liveUrl: 'https://hati.me/download'
githubUrl: null
image: /images/projects/hati-featured.webp?v=20260624
featured: true
order: 1
---

## The gist

Hati is a bill splitter for KKB meals. The main idea is simple: **only one person needs the app**.

The organizer creates the split, adds receipt items, assigns who shared what, and sends one link. Everyone else opens that link in their browser to check their amount and mark paid. No accounts, no forcing the whole group to download another app, and no messy group-chat arithmetic.

## Why I built it

Splitting bills after eating out is one of those small local problems that becomes annoying fast.

People order different things. Some food is shared. Service charge shows up at the end. Someone paid first. Someone already sent a partial payment. Then one person has to turn the receipt into a fair breakdown while everyone is still in the chat asking, "Magkano ako?"

I wanted Hati to feel like a table utility: open it, add the receipt, share the breakdown, move on.

## The product decision

The important constraint was not "make another finance app." It was to keep the organizer flow fast while making the participant flow almost frictionless.

That led to the link-first model:

- The organizer uses the native app.
- The group opens the shared web page.
- Each person sees their own amount.
- Paid status can be tracked without creating accounts.

The app does not move money. It just computes the breakdown clearly and makes collection less awkward.

## What shipped

Hati launched as my first Apple app on the App Store. Since launch, it has reached **156 downloads**, handled **200+ completed splits**, and tracked **200k+ in shared expenses**.

The iOS app is built with SwiftUI and SwiftData for the local organizer flow. StoreKit powers Hati AI purchases for receipt import. Convex handles shared splits, participant links, file storage, and backend receipt parsing. The web companion is a Next.js app so friends can view their share without installing anything.

![Hati App Store launch artwork](/images/projects/hati-featured.webp)

## What I learned

Shipping an App Store app made the work feel different from a web project. There were more product edges to close: privacy copy, StoreKit, share links, local state, cloud state, review flows, and the awkward little details around money without actually touching payments.

The biggest lesson was that a small product can still have a lot of surface area when it sits inside a real-life social moment. The table, the receipt, the group chat, and the person collecting money all matter.

Hati is live at [hati.me/download](https://hati.me/download).
