import { getHackathonBySlug } from "@/lib/hackathons";
import { createOgImageResponse } from "@/lib/og-image";

export const runtime = "nodejs";

export async function GET(_request, { params }) {
  const { slug } = await params;
  const hackathon = getHackathonBySlug(slug);

  if (!hackathon) {
    return new Response("Hackathon not found", { status: 404 });
  }

  return createOgImageResponse({
    title: hackathon.title,
    description:
      hackathon.highlights?.[0] || `${hackathon.event} / ${hackathon.result}`,
    eyebrow: "hackathon",
    image: hackathon.images?.[0] || hackathon.image,
    imagePosition: hackathon.imagePosition,
  });
}
