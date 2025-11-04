import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ProjectsClient from "./ProjectsClient";

export const metadata = {
  title: "Projects",
  description:
    "Portfolio of software projects by Alexi Canamo including Enlistment Helper, QPI Calculator, One Big Match, and more tools used by thousands of Ateneo students.",
  openGraph: {
    title: "Projects - Alexi Canamo",
    description:
      "Browse my portfolio of web applications and tools including Enlistment Helper, QPI Calculator, and One Big Match - helping thousands of students.",
    images: ["/og-image.png"],
  },
};

// This is a server component - statically generated at build time
export default function ProjectsPage() {
  const projectsDirectory = path.join(process.cwd(), "src/content/projects");

  // Handle case where projects directory doesn't exist (empty state)
  if (!fs.existsSync(projectsDirectory)) {
    return (
      <main className="min-h-screen bg-transparent text-white pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
            <p className="text-white/60 text-lg">
              Building solutions that solve real problems and create value
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-12 text-center border border-white/10">
            <p className="text-white/60">No projects yet. Check back soon!</p>
          </div>
        </div>
      </main>
    );
  }

  const files = fs.readdirSync(projectsDirectory);

  const projects = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(projectsDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data: frontmatter } = matter(fileContents);

      return {
        slug: file.replace(".md", ""),
        ...frontmatter,
      };
    });

  return (
    <main className="min-h-screen bg-transparent text-white pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-white/60 text-lg">
            Building solutions that solve real problems and create value
          </p>
        </div>

        {projects.length > 0 ? (
          <ProjectsClient projects={projects} />
        ) : (
          <div className="bg-white/5 rounded-lg p-12 text-center border border-white/10">
            <p className="text-white/60">No projects yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}
