import { createOgImageResponse, readMarkdownFrontmatter } from "@/lib/og-image";

export const runtime = "nodejs";

export async function GET(_request, { params }) {
  const { slug } = await params;
  const talk = readMarkdownFrontmatter("src/content/talks", slug);

  if (!talk) {
    return new Response("Talk not found", { status: 404 });
  }

  return createOgImageResponse({
    title: talk.title,
    description:
      talk.shortDescription ||
      `${talk.title} by Alexi Canamo at ${talk.event}.`,
    eyebrow: "talk",
    image: talk.images?.[0],
    imagePosition: talk.imagePosition,
  });
}
