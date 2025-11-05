import fs from "fs";
import path from "path";
import matter from "gray-matter";
import HomeClient from "./HomeClient";
import { calculateReadingTime } from "@/lib/reading-time";

export const metadata = {
  title: "Home",
  description:
    "18-year-old software developer from Manila, Philippines. Computer Science sophomore at Ateneo de Manila University and DOST Merit Scholar. Building tools like Enlistment Helper, QPI Calculator, and One Big Match that help thousands of students.",
  openGraph: {
    title: "Alexi Canamo",
    description:
      "Building tools that help thousands of students. CS student at Ateneo, DOST Scholar, AVP at MISA, intern at NextPay.",
    images: ["/og-image.png"],
  },
};

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
    .filter((project) => project.featured === true)
al
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

  return (
    <HomeClient
      talks={talks}
      featuredProjects={featuredProjects}
      recentBlogs={recentBlogs}
    />
  );
}
