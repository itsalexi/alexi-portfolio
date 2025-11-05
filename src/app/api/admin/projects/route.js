import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(".md", "");
      const filePath = path.join(projectsDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data: frontmatter } = matter(fileContents);

      return {
        slug,
        title: frontmatter.title || slug,
        order: frontmatter.order ?? 999,
      };
    })
    .sort((a, b) => {
      // Sort by order, then by title
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      return a.title.localeCompare(b.title);
    });

  // Auto-assign sequential orders to projects without them
  const projectsToUpdate = [];
  let nextOrder = 1;

  projects.forEach((project) => {
    if (project.order === 999) {
      // Find the next available order number
      while (projects.some((p) => p !== project && p.order === nextOrder)) {
        nextOrder++;
      }
      project.order = nextOrder;
      projectsToUpdate.push(project.slug);
      nextOrder++;
    }
  });

  // Save projects that need order assignment
  for (const projectSlug of projectsToUpdate) {
    const filePath = path.join(projectsDirectory, `${projectSlug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter, content } = matter(fileContents);

    // Find the assigned order for this project
    const project = projects.find((p) => p.slug === projectSlug);
    if (project) {
      frontmatter.order = project.order;
      const newContent = matter.stringify(content, frontmatter);
      fs.writeFileSync(filePath, newContent, "utf8");
    }
  }

  return NextResponse.json(projects);
}
