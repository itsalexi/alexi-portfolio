import { use } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogContent from "./BlogContent";
import { calculateReadingTime } from "@/lib/reading-time";

// Generate static params for all blogs
export async function generateStaticParams() {
  const blogsDirectory = path.join(process.cwd(), "src/content/blogs");

  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(blogsDirectory);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(".md", ""),
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const blogsDirectory = path.join(process.cwd(), "src/content/blogs");
  const filePath = path.join(blogsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return {
      title: "Blog Not Found",
    };
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter } = matter(fileContents);

  return {
    title: frontmatter.title,
    description: frontmatter.excerpt || "Blog post by Alexi Canamo",
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt || "Blog post by Alexi Canamo",
      images: frontmatter.coverImage
        ? [frontmatter.coverImage]
        : ["/og-image.png"],
      type: "article",
      publishedTime: frontmatter.date,
      authors: ["Alexi Canamo"],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.excerpt || "Blog post by Alexi Canamo",
      images: frontmatter.coverImage
        ? [frontmatter.coverImage]
        : ["/og-image.png"],
    },
  };
}

// Server component - reads file at build time
export default function BlogDetailPage({ params }) {
  const { slug } = use(params);

  const blogsDirectory = path.join(process.cwd(), "src/content/blogs");
  const filePath = path.join(blogsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Blog post not found</p>
      </div>
    );
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);

  const blog = {
    ...frontmatter,
    content,
    readTime: calculateReadingTime(content),
  };

  return <BlogContent blog={blog} />;
}
