import { use } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ProjectContent from "./ProjectContent";

// Generate metadata for each project
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const projectsDirectory = path.join(process.cwd(), "src/content/projects");
  const filePath = path.join(projectsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return {
      title: "Project Not Found",
    };
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter } = matter(fileContents);

  return {
    title: `Project | ${frontmatter.title}`,
    description:
      frontmatter.shortDescription ||
      frontmatter.description ||
      `${frontmatter.title} - Project by Alexi Canamo`,
    openGraph: {
      title: `Project | ${frontmatter.title}`,
      description:
        frontmatter.shortDescription || frontmatter.description || "",
      images: frontmatter.image ? [frontmatter.image] : ["/og-image.png"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Project | ${frontmatter.title}`,
      description:
        frontmatter.shortDescription || frontmatter.description || "",
      images: frontmatter.image ? [frontmatter.image] : ["/og-image.png"],
    },
  };
}

// Generate static params for all projects
export async function generateStaticParams() {
  const projectsDirectory = path.join(process.cwd(), "src/content/projects");

  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(projectsDirectory);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(".md", ""),
    }));
}

// Server component - reads file at build time
export default function ProjectDetailPage({ params }) {
  const { slug } = use(params);

  const projectsDirectory = path.join(process.cwd(), "src/content/projects");
  const filePath = path.join(projectsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Project not found</p>
      </div>
    );
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);

  const project = {
    ...frontmatter,
    content,
  };

  return <ProjectContent project={project} />;
}
