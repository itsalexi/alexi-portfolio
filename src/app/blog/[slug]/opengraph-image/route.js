import { createOgImageResponse, readMarkdownFrontmatter } from "@/lib/og-image";
import { seoDescription } from "@/lib/seo";

export const runtime = "nodejs";

export async function GET(_request, { params }) {
  const { slug } = await params;
  const blog = readMarkdownFrontmatter("src/content/blogs", slug);

  if (!blog) {
    return new Response("Blog not found", { status: 404 });
  }

  return createOgImageResponse({
    title: blog.title,
    description: blog.subtitle || seoDescription(blog.excerpt),
    eyebrow: "writing",
    image: blog.image,
    imagePosition: blog.imagePosition,
  });
}
