import { createOgImageResponse, readMarkdownFrontmatter } from "@/lib/og-image";

export const runtime = "nodejs";

export async function GET(_request, { params }) {
  const { slug } = await params;
  const project = readMarkdownFrontmatter("src/content/projects", slug);

  if (!project) {
    return new Response("Project not found", { status: 404 });
  }

  return createOgImageResponse({
    title: project.title,
    description:
      project.tagline ||
      project.shortDescription ||
      project.description ||
      `${project.title} is a project by Alexi Canamo.`,
    eyebrow: "project",
    image: project.image,
    imagePosition: project.imagePosition,
  });
}
