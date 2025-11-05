import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET(request, { params }) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }
  
  const { slug } = await params;
  const talksDirectory = path.join(process.cwd(), "src/content/talks");
  const filePath = path.join(talksDirectory, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);
  
  return NextResponse.json({
    title: frontmatter.title || "",
    event: frontmatter.event || "",
    date: frontmatter.date || "",
    shortDescription: frontmatter.shortDescription || "",
    topics: Array.isArray(frontmatter.topics) ? frontmatter.topics.join(", ") : "",
    link: frontmatter.link || "",
    images: frontmatter.images || [],
    fullDescription: content
  });
}

export async function POST(request, { params }) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }
  
  const { slug } = await params;
  const talkData = await request.json();
  const { newSlug } = talkData;
  
  const talksDirectory = path.join(process.cwd(), "src/content/talks");
  
  if (!fs.existsSync(talksDirectory)) {
    fs.mkdirSync(talksDirectory, { recursive: true });
  }
  
  // Convert topics string to array
  const topicsArray = talkData.topics
    .split(",")
    .map(t => t.trim())
    .filter(t => t);
  
  // Determine final slug
  const finalSlug = newSlug || (slug === "new" ? talkData.title.toLowerCase().replace(/\s+/g, "-") : slug);
  
  // Build markdown file
  const fileContent = matter.stringify(talkData.fullDescription, {
    slug: finalSlug,
    title: talkData.title,
    event: talkData.event,
    date: talkData.date,
    shortDescription: talkData.shortDescription,
    topics: topicsArray,
    link: talkData.link || null,
    images: talkData.images || []
  });
  
  const newFilePath = path.join(talksDirectory, `${finalSlug}.md`);
  const oldFilePath = path.join(talksDirectory, `${slug}.md`);
  
  // If slug changed and old file exists, delete it
  if (slug !== "new" && slug !== finalSlug && fs.existsSync(oldFilePath)) {
    fs.unlinkSync(oldFilePath);
  }
  
  // Write new file
  fs.writeFileSync(newFilePath, fileContent);
  
  return NextResponse.json({ success: true, slug: finalSlug });
}
