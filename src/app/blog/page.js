import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogCard from "@/components/BlogCard";
import { calculateReadingTime } from "@/lib/reading-time";

export const metadata = {
  title: "Blog",
  description:
    "Technical articles, development insights, and lessons learned from building software. Read about web development, React, Next.js, and my journey as a CS student.",
  openGraph: {
    title: "Blog - Alexi Canamo",
    description:
      "Technical articles and insights about software development, web technologies, and my journey as a Computer Science student at Ateneo.",
    images: ["/og-image.png"],
  },
};

// This is a server component - statically generated at build time
export default function BlogPage() {
  const blogsDirectory = path.join(process.cwd(), "src/content/blogs");

  // Handle case where blogs directory doesn't exist (empty state)
  if (!fs.existsSync(blogsDirectory)) {
    return (
      <main className="min-h-screen bg-transparent text-white pt-24">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-white/60 text-lg">
              Insights on technology, development practices, and lessons learned
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-12 text-center">
            <p className="text-white/60">No blog posts yet. Check back soon!</p>
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
    <main className="min-h-screen bg-transparent text-white pt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-white/60 text-lg">
            Insights on technology, development practices, and lessons learned
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.slug}
                slug={blog.slug}
                title={blog.title}
                date={blog.date}
                excerpt={blog.excerpt}
                tags={blog.tags}
                image={blog.image}
                author={blog.author}
                readTime={blog.readTime}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white/5 rounded-lg p-12 text-center">
            <p className="text-white/60">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}
