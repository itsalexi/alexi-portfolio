import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { loadHackathonsForHome } from "@/lib/hackathons";
import { calculateReadingTime } from "@/lib/reading-time";
import { createMetadata, siteConfig } from "@/lib/seo";
import HomeClient from "./HomeClient";

export const metadata = createMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  image: "/og?page=home",
  absoluteTitle: true,
});

function loadTalks() {
  const talksDirectory = path.join(process.cwd(), "src/content/talks");

  if (!fs.existsSync(talksDirectory)) {
    return [];
  }

  const files = fs.readdirSync(talksDirectory);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(talksDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data: frontmatter } = matter(fileContents);
      return frontmatter;
    });
}

function loadProjects() {
  const projectsDirectory = path.join(process.cwd(), "src/content/projects");

  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(projectsDirectory);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(projectsDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data: frontmatter } = matter(fileContents);
      return frontmatter;
    })
    .sort((a, b) => {
      // Sort by order field (lower numbers first), then by title if order is not set
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return (a.title || "").localeCompare(b.title || "");
    });
}

function loadBlogs() {
  const blogsDirectory = path.join(process.cwd(), "src/content/blogs");

  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(blogsDirectory);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(blogsDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data: frontmatter, content } = matter(fileContents);
      return {
        slug: file.replace(".md", ""),
        ...frontmatter,
        readTime: calculateReadingTime(content),
      };
    })
    .sort((a, b) => {
      // Sort by date (newest first)
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    })
    .slice(0, 3); // Only return first 3 recent blogs
}

export default function Home() {
  const talks = loadTalks();
  const featuredProjects = loadProjects();
  const recentBlogs = loadBlogs();
  const hackathons = loadHackathonsForHome();

  return (
    <HomeClient
      talks={talks}
      featuredProjects={featuredProjects}
      recentBlogs={recentBlogs}
      hackathons={hackathons}
    />
  );
}
