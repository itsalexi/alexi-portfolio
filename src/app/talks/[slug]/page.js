import { use } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import TalkContent from "./TalkContent";

// Generate static params for all talks
export async function generateStaticParams() {
  const talksDirectory = path.join(process.cwd(), "src/content/talks");
  
  if (!fs.existsSync(talksDirectory)) {
    return [];
  }
  
  const files = fs.readdirSync(talksDirectory);
  
  return files
    .filter(file => file.endsWith(".md"))
    .map(file => ({
      slug: file.replace(".md", "")
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
    fullDescription: content
  };

  return <TalkContent talk={talk} />;
}
