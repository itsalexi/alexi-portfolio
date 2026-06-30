import { createOgImageResponse } from "@/lib/og-image";
import { siteConfig } from "@/lib/seo";

export const runtime = "nodejs";

const pagePresets = {
  home: {
    title: "Alexi Canamo",
    description: siteConfig.description,
    eyebrow: "portfolio",
    image: "/images/about/image (11).webp",
    imagePosition: "center",
  },
  about: {
    title: "About Alexi",
    description:
      "A founder and product engineer in Manila building tools for students, startups, and communities.",
    eyebrow: "about",
    image: "/images/about/image (3).webp",
    imagePosition: "center",
  },
  projects: {
    title: "Things I’ve built",
    description:
      "Campus tools, small apps, event sites, and experiments by Alexi Canamo.",
    eyebrow: "projects",
    image: "/images/projects/hati-featured.webp",
    imagePosition: "center",
  },
  blog: {
    title: "Writing",
    description:
      "Notes from school, work, bugs I found, and projects I’m still figuring out.",
    eyebrow: "writing",
    image: "/images/blogs/do-something-before-you-have-to/hero-cafe.webp",
    imagePosition: "top",
  },
  hackathons: {
    title: "Hackathon weekends",
    description:
      "Competition projects built with friends, usually on too little sleep.",
    eyebrow: "competitions",
    image: "/images/hackathons/salbar.jpeg",
    imagePosition: "center",
  },
  talks: {
    title: "Talks and workshops",
    description:
      "Sessions for students learning to build, ship, and start before they feel ready.",
    eyebrow: "teaching",
    image: "/images/projects/null-1762344837188.webp",
    imagePosition: "center",
  },
  contact: {
    title: "Say hi",
    description:
      "Email Alexi Canamo about projects, talks, student tools, events, or a quick hello.",
    eyebrow: "contact",
    image: "/images/blogs/do-something-before-you-have-to/quiet-cafe-work.webp",
    imagePosition: "center",
  },
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "home";
  const preset = pagePresets[page];

  if (!preset) {
    return new Response("OG page not found", { status: 404 });
  }

  return createOgImageResponse(preset);
}
