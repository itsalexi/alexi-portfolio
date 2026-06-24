import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import EditorialHeader from "@/components/EditorialHeader";
import { createMetadata } from "@/lib/seo";
import ProjectsClient from "./ProjectsClient";

export const metadata = createMetadata({
  title: "Projects",
  description:
    "Projects by Alexi Canamo, including Hati, One Big Match, the Ateneo QPI Calculator, Enlistment Helper, and event tools.",
  path: "/projects",
});

function ProjectsHeader() {
  return (
    <EditorialHeader
      eyebrow="Projects"
      title="Things I’ve built."
      body="Campus tools, small apps, event sites, and experiments. Search by name or filter by stack."
    />
  );
}

// This is a server component - statically generated at build time
export default function ProjectsPage() {
  const projectsDirectory = path.join(process.cwd(), "src/content/projects");

  // Handle case where projects directory doesn't exist (empty state)
  if (!fs.existsSync(projectsDirectory)) {
    return (
      <main className="min-h-screen pt-20 sm:pt-28">
        <div className="mx-auto max-w-[980px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          <ProjectsHeader />
          <div className="border-y border-white/[0.08] py-12">
            <p className="text-sm text-[var(--portfolio-ink-muted)]">
              No projects yet.
            </p>
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

  return (
    <main className="min-h-screen pt-20 sm:pt-28">
      <div className="mx-auto max-w-[980px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <ProjectsHeader />

        {projects.length > 0
          ? <ProjectsClient projects={projects} />
          : <div className="border-y border-white/[0.08] py-12">
              <p className="text-sm text-[var(--portfolio-ink-muted)]">
                No projects yet.
              </p>
            </div>}
      </div>
    </main>
  );
}
