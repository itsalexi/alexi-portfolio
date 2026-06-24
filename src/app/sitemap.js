import fs from "node:fs";
import path from "node:path";

export default function sitemap() {
  const baseUrl = "https://alexi.life";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/talks`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hackathons`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.65,
    },
  ];

  // Dynamic project pages
  const projectsDirectory = path.join(process.cwd(), "src/content/projects");
  let projectPages = [];

  if (fs.existsSync(projectsDirectory)) {
    const projectFiles = fs.readdirSync(projectsDirectory);
    projectPages = projectFiles
      .filter((file) => file.endsWith(".md"))
      .map((file) => ({
        url: `${baseUrl}/projects/${file.replace(".md", "")}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      }));
  }

  // Dynamic talk pages
  const talksDirectory = path.join(process.cwd(), "src/content/talks");
  let talkPages = [];

  if (fs.existsSync(talksDirectory)) {
    const talkFiles = fs.readdirSync(talksDirectory);
    talkPages = talkFiles
      .filter((file) => file.endsWith(".md"))
      .map((file) => ({
        url: `${baseUrl}/talks/${file.replace(".md", "")}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      }));
  }

  // Dynamic blog pages
  const blogsDirectory = path.join(process.cwd(), "src/content/blogs");
  let blogPages = [];

  if (fs.existsSync(blogsDirectory)) {
    const blogFiles = fs.readdirSync(blogsDirectory);
    blogPages = blogFiles
      .filter((file) => file.endsWith(".md"))
      .map((file) => ({
        url: `${baseUrl}/blog/${file.replace(".md", "")}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      }));
  }

  const hackathonsDirectory = path.join(
    process.cwd(),
    "src/content/hackathons",
  );
  let hackathonPages = [];

  if (fs.existsSync(hackathonsDirectory)) {
    const hackathonFiles = fs.readdirSync(hackathonsDirectory);
    hackathonPages = hackathonFiles
      .filter((file) => file.endsWith(".md"))
      .map((file) => ({
        url: `${baseUrl}/hackathons/${file.replace(".md", "")}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      }));
  }

  return [
    ...staticPages,
    ...projectPages,
    ...talkPages,
    ...blogPages,
    ...hackathonPages,
  ];
}
