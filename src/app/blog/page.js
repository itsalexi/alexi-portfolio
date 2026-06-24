import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import EditorialHeader from "@/components/EditorialHeader";
import { calculateReadingTime } from "@/lib/reading-time";
import BlogClient from "./BlogClient";

export const metadata = {
  title: "Blog",
  description:
    "Notes by Alexi Canamo on school, work, bugs, and projects he is figuring out.",
  openGraph: {
    title: "Blog - Alexi Canamo",
    description:
      "Notes from projects, classes, internships, and the parts that do not fit neatly into a portfolio card.",
    images: ["/og-image.png"],
  },
};

function BlogHeader() {
  return (
    <EditorialHeader
      eyebrow="Writing"
      title="Writing."
      body="Notes from school, work, bugs I found, and projects I’m still figuring out."
    />
  );
}

// This is a server component - statically generated at build time
export default function BlogPage() {
  const blogsDirectory = path.join(process.cwd(), "src/content/blogs");

  // Handle case where blogs directory doesn't exist (empty state)
  if (!fs.existsSync(blogsDirectory)) {
    return (
      <main className="min-h-screen pt-20 sm:pt-28">
        <div className="mx-auto max-w-[980px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          <BlogHeader />
          <div className="border-y border-white/[0.08] py-12">
            <p className="text-sm text-[var(--portfolio-ink-muted)]">
              No posts yet.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const files = fs.readdirSync(blogsDirectory);

  const blogs = files
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
    });

  return (
    <main className="min-h-screen pt-20 sm:pt-28">
      <div className="mx-auto max-w-[980px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <BlogHeader />

        {blogs.length > 0
          ? <BlogClient blogs={blogs} />
          : <div className="border-y border-white/[0.08] py-12">
              <p className="text-sm text-[var(--portfolio-ink-muted)]">
                No posts yet.
              </p>
            </div>}
      </div>
    </main>
  );
}
