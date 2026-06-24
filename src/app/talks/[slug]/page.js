import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { use } from "react";
import { createMetadata, dateToIso } from "@/lib/seo";
import TalkContent from "./TalkContent";

// Generate metadata for each talk
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const talksDirectory = path.join(process.cwd(), "src/content/talks");
  const filePath = path.join(talksDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return {
      title: "Talk Not Found",
    };
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter } = matter(fileContents);
  const stats = fs.statSync(filePath);
  const description =
    frontmatter.shortDescription ||
    `${frontmatter.title} by Alexi Canamo at ${frontmatter.event}.`;
  const image =
    frontmatter.images && frontmatter.images.length > 0
      ? frontmatter.images[0]
      : "/og-image.png";

  return createMetadata({
    title: frontmatter.title,
    description,
    path: `/talks/${slug}`,
    image,
    type: "article",
    publishedTime: dateToIso(frontmatter.date),
    modifiedTime: stats.mtime.toISOString(),
  });
}

// Generate static params for all talks
export async function generateStaticParams() {
  const talksDirectory = path.join(process.cwd(), "src/content/talks");

  if (!fs.existsSync(talksDirectory)) {
    return [];
  }

  const files = fs.readdirSync(talksDirectory);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(".md", ""),
    }));
}

// Server component - reads file at build time
export default function TalkDetailPage({ params }) {
  const { slug } = use(params);

  const talksDirectory = path.join(process.cwd(), "src/content/talks");
  const filePath = path.join(talksDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Talk not found</p>
      </div>
    );
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);

  const talk = {
    ...frontmatter,
    fullDescription: content,
  };

  return <TalkContent talk={talk} />;
}
