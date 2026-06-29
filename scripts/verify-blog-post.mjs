import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import matter from "gray-matter";

const slug = process.argv[2];

if (!slug) {
  throw new Error("Usage: node scripts/verify-blog-post.mjs <slug>");
}

const root = process.cwd();
const postPath = path.join(root, "src/content/blogs", `${slug}.md`);

if (!fs.existsSync(postPath)) {
  throw new Error(`Missing blog post: ${postPath}`);
}

const source = fs.readFileSync(postPath, "utf8");
const { data, content } = matter(source);

const requiredFields = ["slug", "title", "date", "excerpt", "tags", "author"];

for (const field of requiredFields) {
  if (
    !data[field] ||
    (Array.isArray(data[field]) && data[field].length === 0)
  ) {
    throw new Error(`Missing required frontmatter field: ${field}`);
  }
}

if (data.slug !== slug) {
  throw new Error(
    `Frontmatter slug "${data.slug}" does not match file slug "${slug}"`,
  );
}

if (/\[insert\b/i.test(content)) {
  throw new Error(
    "Post still contains unresolved [insert ...] placeholder text",
  );
}

if (/`[^`]+`\s*→/.test(content)) {
  throw new Error("Post uses inline-code arrows for a timeline");
}

if (/^1\. Visual Basic$/m.test(content)) {
  throw new Error("Post uses a numbered list for the learning timeline");
}

const localImagePaths = new Set();
const markdownImagePattern = /!\[[^\]]*]\((\/[^)\s]+)(?:\s+"([^"]+)")?\)/g;
let match;

if (typeof data.image === "string" && data.image.startsWith("/")) {
  localImagePaths.add(data.image.split("?")[0]);
}

match = markdownImagePattern.exec(content);

while (match !== null) {
  localImagePaths.add(match[1].split("?")[0]);
  if (!match[2]) {
    throw new Error(`Image ${match[1]} is missing a title caption`);
  }
  match = markdownImagePattern.exec(content);
}

for (const publicPath of localImagePaths) {
  const diskPath = path.join(root, "public", publicPath);
  if (!fs.existsSync(diskPath)) {
    throw new Error(`Missing local image asset: ${publicPath}`);
  }
}

console.log(
  `Verified blog post "${slug}" with ${localImagePaths.size} local images.`,
);
