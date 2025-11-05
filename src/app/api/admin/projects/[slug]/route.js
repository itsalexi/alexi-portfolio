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
  const projectsDirectory = path.join(process.cwd(), "src/content/projects");
  const filePath = path.join(projectsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);
  
  return NextResponse.json({
    frontmatter: {
      title: frontmatter.title || "",
      tagline: frontmatter.tagline || "",
      techStack: Array.isArray(frontmatter.techStack) 
        ? frontmatter.techStack.join(", ") 
        : "",
      liveUrl: frontmatter.liveUrl || "",
      githubUrl: frontmatter.githubUrl || "",
      image: frontmatter.image || "",
      featured: frontmatter.featured || false
    },
    content
  });
}

export async function POST(request, { params }) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }
  
  const { slug } = await params;
  const { frontmatter, content, newSlug } = await request.json();
  
  const projectsDirectory = path.join(process.cwd(), "src/content/projects");
  
  if (!fs.existsSync(projectsDirectory)) {
    fs.mkdirSync(projectsDirectory, { recursive: true });
  }
  
  // Convert tech stack string to array
  const techStackArray = frontmatter.techStack
    .split(",")
    .map(tech => tech.trim())
    .filter(tech => tech);
  
  // Determine final slug
  const finalSlug = newSlug || (slug === "new" ? frontmatter.title.toLowerCase().replace(/\s+/g, "-") : slug);
  
  // Build markdown file
  const fileContent = matter.stringify(content, {
    slug: finalSlug,
    title: frontmatter.title,
    tagline: frontmatter.tagline,
    techStack: techStackArray,
    liveUrl: frontmatter.liveUrl || null,
    githubUrl: frontmatter.githubUrl || null,
    image: frontmatter.image || null,
    featured: frontmatter.featured || false
  });
  
  const newFilePath = path.join(projectsDirectory, `${finalSlug}.md`);
  const oldFilePath = path.join(projectsDirectory, `${slug}.md`);
  
  // If slug changed and old file exists, delete it
  if (slug !== "new" && slug !== finalSlug && fs.existsSync(oldFilePath)) {
    fs.unlinkSync(oldFilePath);
  }
  
  // Write new file
  fs.writeFileSync(newFilePath, fileContent);
  
  return NextResponse.json({ success: true, slug: finalSlug });
}
