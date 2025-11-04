import fs from "fs";
import path from "path";
import matter from "gray-matter";
import HomeClient from "./HomeClient";

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
    .slice(0, 2); // Only return first 2 featured projects
}

export default function Home() {
  const talks = loadTalks();
  const featuredProjects = loadProjects();

  return <HomeClient talks={talks} featuredProjects={featuredProjects} />;
}
