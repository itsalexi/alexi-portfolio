import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }
  
  const blogsDirectory = path.join(process.cwd(), "src/content/blogs");
  
  if (!fs.existsSync(blogsDirectory)) {
    fs.mkdirSync(blogsDirectory, { recursive: true });
  }
  
  const files = fs.readdirSync(blogsDirectory);
  const blogs = files
    .filter(file => file.endsWith(".md"))
    .map(file => file.replace(".md", ""));
  
  return NextResponse.json(blogs);
}

