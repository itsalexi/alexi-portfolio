import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "@/lib/seo";

function fileModifiedAt(relativePath) {
  const filePath = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(filePath)) return new Date();
  return fs.statSync(filePath).mtime;
}

function staticPage(route, filePath, priority, changeFrequency = "monthly") {
  return {
    url: `${siteConfig.url}${route}`,
    lastModified: fileModifiedAt(filePath),
    changeFrequency,
    priority,
  };
}

function contentPages(contentDir, routePrefix, priority) {
  const directory = path.join(process.cwd(), contentDir);
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(".md", "");
      const filePath = path.join(directory, file);
      return {
        url: `${siteConfig.url}${routePrefix}/${slug}`,
        lastModified: fs.statSync(filePath).mtime,
        changeFrequency: "monthly",
        priority,
      };
    });
}

export default function sitemap() {
  return [
    staticPage("/", "src/app/page.js", 1, "weekly"),
    staticPage("/about", "src/app/about/page.js", 0.8),
    staticPage("/projects", "src/app/projects/page.js", 0.9, "weekly"),
    staticPage("/blog", "src/app/blog/page.js", 0.8, "weekly"),
    staticPage("/talks", "src/app/talks/page.js", 0.7),
    staticPage("/hackathons", "src/app/hackathons/page.js", 0.7),
    staticPage("/contact", "src/app/contact/page.js", 0.6),
    ...contentPages("src/content/projects", "/projects", 0.75),
    ...contentPages("src/content/blogs", "/blog", 0.65),
    ...contentPages("src/content/talks", "/talks", 0.6),
    ...contentPages("src/content/hackathons", "/hackathons", 0.65),
  ];
}
