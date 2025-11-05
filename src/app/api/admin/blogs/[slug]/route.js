import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime } from "@/lib/reading-time";

export async function GET(request, { params }) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }

  const { slug } = await params;
  const blogsDirectory = path.join(process.cwd(), "src/content/blogs");
  const filePath = path.join(blogsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);

  return NextResponse.json({
    title: frontmatter.title || "",
    date: frontmatter.date || "",
    excerpt: frontmatter.excerpt || "",
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.join(", ") : "",
    image: frontmatter.image || "",
    author: frontmatter.author || "",
    featured: frontmatter.featured || false,
    content,
  });
}

export async function POST(request, { params }) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }

  const { slug } = await params;
  const blogData = await request.json();
  const { newSlug } = blogData;

  const blogsDirectory = path.join(process.cwd(), "src/content/blogs");

  if (!fs.existsSync(blogsDirectory)) {
    fs.mkdirSync(blogsDirectory, { recursive: true });
  }

  // Convert tags string to array
  const tagsArray = blogData.tags
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t);

  // Calculate reading time automatically
  const readTime = calculateReadingTime(blogData.content);

  // Determine final slug
  const finalSlug = newSlug || (slug === "new" ? blogData.title.toLowerCase().replace(/\s+/g, "-") : slug);

  // Build markdown file
  const fileContent = matter.stringify(blogData.content, {
    slug: finalSlug,
    title: blogData.title,
    date: blogData.date,
    excerpt: blogData.excerpt,
    tags: tagsArray,
    image: blogData.image || null,
    author: blogData.author || "Alexi Canamo",
    readTime: readTime,
    featured: blogData.featured || false,
  });

  const newFilePath = path.join(blogsDirectory, `${finalSlug}.md`);
  const oldFilePath = path.join(blogsDirectory, `${slug}.md`);

  // If slug changed and old file exists, delete it
  if (slug !== "new" && slug !== finalSlug && fs.existsSync(oldFilePath)) {
    fs.unlinkSync(oldFilePath);
  }

  // Write new file
  fs.writeFileSync(newFilePath, fileContent);

  return NextResponse.json({
    success: true,
    slug: finalSlug,
  });
}
