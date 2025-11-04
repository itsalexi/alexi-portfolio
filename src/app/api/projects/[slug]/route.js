import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET(request, { params }) {
  const { slug } = await params;
  const projectsDirectory = path.join(process.cwd(), "src/content/projects");
  const filePath = path.join(projectsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);
  
  return NextResponse.json({
    ...frontmatter,
    content
  });
}
