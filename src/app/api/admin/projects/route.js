import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }
  const projectsDirectory = path.join(process.cwd(), "src/content/projects");
  
  if (!fs.existsSync(projectsDirectory)) {
    fs.mkdirSync(projectsDirectory, { recursive: true });
  }
  
  const files = fs.readdirSync(projectsDirectory);
  const projects = files
    .filter(file => file.endsWith(".md"))
    .map(file => file.replace(".md", ""));
  
  return NextResponse.json(projects);
}
