"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Upload } from "lucide-react";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function AdminPage() {
  const [contentType, setContentType] = useState("projects"); // "projects", "talks", or "blogs"
  const [projects, setProjects] = useState([]);
  const [talks, setTalks] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTalk, setSelectedTalk] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [content, setContent] = useState("");
  const [frontmatter, setFrontmatter] = useState({
    title: "",
    tagline: "",
    techStack: "",
    liveUrl: "",
    githubUrl: "",
    image: "",
  });
  const [talkData, setTalkData] = useState({
    title: "",
    event: "",
    date: "",
    shortDescription: "",
    topics: "",
    link: "",
    images: [],
  });
  const [blogData, setBlogData] = useState({
    title: "",
    date: "",
    excerpt: "",
    tags: "",
    image: "",
    author: "Alexi Canamo",
    featured: false,
  });
  const [uploading, setUploading] = useState(false);
  const [techSearch, setTechSearch] = useState("");

  useEffect(() => {
    // Load projects list
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));

    // Load talks list
    fetch("/api/admin/talks")
      .then((res) => res.json())
      .then((data) => setTalks(data))
      .catch((err) => console.error(err));

    // Load blogs list
    fetch("/api/admin/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));
  }, []);

  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Not available in production</p>
      </div>
    );
  }

  const loadProject = async (slug) => {
    const res = await fetch(`/api/admin/projects/${slug}`);
    const data = await res.json();
    setSelectedProject(slug);
    setSelectedTalk(null);
    setSelectedBlog(null);
    setFrontmatter(data.frontmatter);
    setContent(data.content);
  };

  const loadTalk = async (slug) => {
    const res = await fetch(`/api/admin/talks/${slug}`);
    const data = await res.json();
    setSelectedTalk(slug);
    setSelectedProject(null);
    setSelectedBlog(null);
    setTalkData({
      title: data.title || "",
      event: data.event || "",
      date: data.date || "",
      shortDescription: data.shortDescription || "",
      topics: data.topics || "",
      link: data.link || "",
      images: data.images || [],
    });
    setContent(data.fullDescription || "");
  };

  const loadBlog = async (slug) => {
    const res = await fetch(`/api/admin/blogs/${slug}`);
    const data = await res.json();
    setSelectedBlog(slug);
    setSelectedProject(null);
    setSelectedTalk(null);
    setBlogData({
      title: data.title || "",
      date: data.date || "",
      excerpt: data.excerpt || "",
      tags: data.tags || "",
      image: data.image || "",
      author: data.author || "Alexi Canamo",
      featured: data.featured || false,
    });
    setContent(data.content || "");
  };

  const saveProject = async () => {
    await fetch(`/api/admin/projects/${selectedProject}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ frontmatter, content }),
    });
    alert("Saved!");
  };

  const saveTalk = async () => {
    await fetch(`/api/admin/talks/${selectedTalk}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...talkData, fullDescription: content }),
    });
    alert("Saved!");
  };

  const saveBlog = async () => {
    await fetch(`/api/admin/blogs/${selectedBlog}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...blogData, content }),
    });
    alert("Saved!");
    // Reload blogs list
    const res = await fetch("/api/admin/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  const createNew = () => {
    if (contentType === "projects") {
      setSelectedProject("new");
      setSelectedTalk(null);
      setSelectedBlog(null);
      setFrontmatter({
        title: "",
        tagline: "",
        techStack: "",
        liveUrl: "",
        githubUrl: "",
      });
      setContent("## Overview\n\nYour content here...");
    } else if (contentType === "talks") {
      setSelectedTalk("new");
      setSelectedProject(null);
      setSelectedBlog(null);
      setTalkData({
        title: "",
        event: "",
        date: "",
        shortDescription: "",
        topics: "",
        link: "",
        images: [],
      });
      setContent("## Talk Description\n\nYour talk details here...");
    } else if (contentType === "blogs") {
      setSelectedBlog("new");
      setSelectedProject(null);
      setSelectedTalk(null);
      setBlogData({
        title: "",
        date: "",
        excerpt: "",
        tags: "",
        image: "",
        author: "Alexi Canamo",
        featured: false,
      });
      setContent("## Introduction\n\nYour blog content here...");
    }
  };

  const handleImageUpload = async (e, isFeatured = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("project", selectedProject);
    formData.append("featured", isFeatured.toString());

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (isFeatured) {
        // Set as featured image
        setFrontmatter({ ...frontmatter, image: data.url });
        alert("Featured image set!");
      } else {
        // Insert image markdown at cursor
        const imageMarkdown = `\n![${file.name}](${data.url})\n`;
        setContent(content + imageMarkdown);
        alert("Image uploaded!");
      }
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const availableTech = [
    "nextjs",
    "react",
    "vue",
    "tailwind",
    "typescript",
    "javascript",
    "nodejs",
    "python",
    "go",
    "rust",
    "express",
    "fastapi",
    "postgresql",
    "mongodb",
    "redis",
    "mysql",
    "docker",
    "kubernetes",
    "git",
    "github",
    "aws",
    "vercel",
    "graphql",
    "firebase",
    "supabase",
  ];

  const toggleTech = (tech) => {
    const currentTechs = frontmatter.techStack
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    if (currentTechs.includes(tech)) {
      // Remove
      const newTechs = currentTechs.filter((t) => t !== tech);
      setFrontmatter({ ...frontmatter, techStack: newTechs.join(", ") });
    } else {
      // Add
      setFrontmatter({
        ...frontmatter,
        techStack: [...currentTechs, tech].join(", "),
      });
    }
  };

  const getSelectedTechs = () => {
    return frontmatter.techStack
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);
  };

  const getFilteredTech = () => {
    if (!techSearch) return availableTech;
    return availableTech.filter((tech) =>
      tech.toLowerCase().includes(techSearch.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Content Editor</h1>

        {/* Content Type Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            type="button"
            onClick={() => setContentType("projects")}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              contentType === "projects"
                ? "bg-blue-500 text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            Projects
          </button>
          <button
            type="button"
            onClick={() => setContentType("talks")}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              contentType === "talks"
                ? "bg-blue-500 text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            Talks
          </button>
          <button
            type="button"
            onClick={() => setContentType("blogs")}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              contentType === "blogs"
                ? "bg-blue-500 text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            Blogs
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <button
              type="button"
              onClick={createNew}
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg mb-4 transition-colors"
            >
              + New{" "}
              {contentType === "projects"
                ? "Project"
                : contentType === "talks"
                ? "Talk"
                : "Blog"}
            </button>

            <div className="space-y-2">
              {contentType === "projects"
                ? projects.map((project) => (
                    <button
                      key={project}
                      type="button"
                      onClick={() => loadProject(project)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedProject === project
                          ? "bg-white/20"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      {project}
                    </button>
                  ))
                : contentType === "talks"
                ? talks.map((talk) => (
                    <button
                      key={talk}
                      type="button"
                      onClick={() => loadTalk(talk)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedTalk === talk
                          ? "bg-white/20"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      {talk}
                    </button>
                  ))
                : blogs.map((blog) => (
                    <button
                      key={blog}
                      type="button"
                      onClick={() => loadBlog(blog)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedBlog === blog
                          ? "bg-white/20"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      {blog}
                    </button>
                  ))}
            </div>
          </div>

          {/* Editor */}
          <div className="md:col-span-3">
            {selectedProject ? (
              <div className="space-y-6">
                {/* Frontmatter */}
                <div className="bg-white/5 rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-bold mb-4">Metadata</h2>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={frontmatter.title}
                      onChange={(e) =>
                        setFrontmatter({
                          ...frontmatter,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={frontmatter.tagline}
                      onChange={(e) =>
                        setFrontmatter({
                          ...frontmatter,
                          tagline: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Tech Stack
                    </label>

                    {/* Selected Tags */}
                    <div className="flex flex-wrap gap-2 mb-3 min-h-[40px] p-2 bg-white/5 rounded-lg border border-white/10">
                      {getSelectedTechs().length > 0 ? (
                        getSelectedTechs().map((tech) => (
                          <button
                            key={tech}
                            type="button"
                            onClick={() => toggleTech(tech)}
                            className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition-colors flex items-center gap-1"
                          >
                            {tech}
                            <span className="text-xs">×</span>
                          </button>
                        ))
                      ) : (
                        <span className="text-white/40 text-sm">
                          Click tags below to add
                        </span>
                      )}
                    </div>

                    {/* Search Input */}
                    <input
                      type="text"
                      value={techSearch}
                      onChange={(e) => setTechSearch(e.target.value)}
                      placeholder="Search tech stack..."
                      className="w-full px-4 py-2 mb-3 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none text-sm"
                    />

                    {/* Available Tags */}
                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                      {getFilteredTech().map((tech) => (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => {
                            toggleTech(tech);
                            setTechSearch("");
                          }}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            getSelectedTechs().includes(tech)
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                              : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                          }`}
                        >
                          {tech}
                        </button>
                      ))}
                      {getFilteredTech().length === 0 && (
                        <span className="text-white/40 text-sm">
                          No matches found
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        Live URL
                      </label>
                      <input
                        type="text"
                        value={frontmatter.liveUrl}
                        onChange={(e) =>
                          setFrontmatter({
                            ...frontmatter,
                            liveUrl: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        GitHub URL
                      </label>
                      <input
                        type="text"
                        value={frontmatter.githubUrl}
                        onChange={(e) =>
                          setFrontmatter({
                            ...frontmatter,
                            githubUrl: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Featured Image (for project card)
                    </label>
                    <div className="flex items-center gap-4">
                      {frontmatter.image && (
                        <img
                          src={frontmatter.image}
                          alt="Featured"
                          className="w-32 h-20 object-cover rounded-lg border border-white/20"
                        />
                      )}
                      <label className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg cursor-pointer transition-colors">
                        <Upload className="w-4 h-4" />
                        <span className="text-sm">
                          {uploading ? "Uploading..." : "Upload Featured Image"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, true)}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={frontmatter.featured || false}
                        onChange={(e) =>
                          setFrontmatter({
                            ...frontmatter,
                            featured: e.target.checked,
                          })
                        }
                        className="w-5 h-5 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                      />
                      <div>
                        <span className="text-sm text-white font-medium">
                          Featured Project
                        </span>
                        <p className="text-xs text-white/60">
                          Show this project on the homepage (max 2)
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Content Editor */}
                <div className="bg-white/5 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Content (Markdown)</h2>
                    <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">
                        {uploading ? "Uploading..." : "Upload Image"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  <div data-color-mode="dark">
                    <MDEditor
                      value={content}
                      onChange={(val) => setContent(val || "")}
                      height={500}
                      preview="live"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={saveProject}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
                  >
                    Save Changes
                  </button>
                  <a
                    href={`/projects/${selectedProject}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors"
                  >
                    Preview
                  </a>
                </div>
              </div>
            ) : selectedTalk ? (
              <div className="space-y-6">
                {/* Talk Metadata */}
                <div className="bg-white/5 rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-bold mb-4">Talk Details</h2>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={talkData.title}
                      onChange={(e) =>
                        setTalkData({ ...talkData, title: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        Event
                      </label>
                      <input
                        type="text"
                        value={talkData.event}
                        onChange={(e) =>
                          setTalkData({ ...talkData, event: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        Date
                      </label>
                      <input
                        type="text"
                        value={talkData.date}
                        onChange={(e) =>
                          setTalkData({ ...talkData, date: e.target.value })
                        }
                        placeholder="Oct 15, 2024"
                        className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Short Description
                    </label>
                    <textarea
                      value={talkData.shortDescription}
                      onChange={(e) =>
                        setTalkData({
                          ...talkData,
                          shortDescription: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Topics (comma separated)
                    </label>
                    <input
                      type="text"
                      value={talkData.topics}
                      onChange={(e) =>
                        setTalkData({ ...talkData, topics: e.target.value })
                      }
                      placeholder="React, Next.js, TypeScript"
                      className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Link URL
                    </label>
                    <input
                      type="text"
                      value={talkData.link}
                      onChange={(e) =>
                        setTalkData({ ...talkData, link: e.target.value })
                      }
                      placeholder="https://..."
                      className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Carousel Images
                    </label>
                    <div className="space-y-3">
                      {/* Image Preview Grid */}
                      {talkData.images && talkData.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {talkData.images.map((img, idx) => (
                            <div key={idx} className="relative group">
                              <img
                                src={img}
                                alt={`Carousel ${idx + 1}`}
                                className="w-full h-24 object-cover rounded-lg border border-white/20"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setTalkData({
                                    ...talkData,
                                    images: talkData.images.filter(
                                      (_, i) => i !== idx
                                    ),
                                  })
                                }
                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Upload Button */}
                      <label className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg cursor-pointer transition-colors w-fit">
                        <Upload className="w-4 h-4" />
                        <span className="text-sm">
                          {uploading
                            ? "Uploading..."
                            : "Upload Carousel Images"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={async (e) => {
                            const files = Array.from(e.target.files || []);
                            if (files.length === 0) return;

                            setUploading(true);
                            const uploadedUrls = [];

                            // Upload files sequentially
                            for (const file of files) {
                              const formData = new FormData();
                              formData.append("file", file);

                              try {
                                const res = await fetch("/api/admin/upload", {
                                  method: "POST",
                                  body: formData,
                                });
                                const data = await res.json();
                                if (data.url) {
                                  uploadedUrls.push(data.url);
                                }
                              } catch (err) {
                                console.error(err);
                              }
                            }

                            // Add all uploaded URLs to images array
                            if (uploadedUrls.length > 0) {
                              setTalkData({
                                ...talkData,
                                images: [
                                  ...(talkData.images || []),
                                  ...uploadedUrls,
                                ],
                              });
                            }

                            setUploading(false);
                            e.target.value = "";
                          }}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>

                      {/* Manual URL Input */}
                      <details className="text-sm">
                        <summary className="cursor-pointer text-white/60 hover:text-white/80">
                          Or enter URLs manually
                        </summary>
                        <textarea
                          value={
                            Array.isArray(talkData.images)
                              ? talkData.images.join("\n")
                              : ""
                          }
                          onChange={(e) =>
                            setTalkData({
                              ...talkData,
                              images: e.target.value
                                .split("\n")
                                .filter((url) => url.trim()),
                            })
                          }
                          rows={3}
                          placeholder="/images/talks/photo1.webp&#10;/images/talks/photo2.webp"
                          className="w-full px-3 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none font-mono text-xs mt-2"
                        />
                      </details>
                    </div>
                  </div>
                </div>

                {/* Full Description Editor */}
                <div className="bg-white/5 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Full Description (Markdown)
                  </h2>
                  <div data-color-mode="dark">
                    <MDEditor
                      value={content}
                      onChange={(val) => setContent(val || "")}
                      height={500}
                      preview="live"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={saveTalk}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
                  >
                    Save Changes
                  </button>
                  <a
                    href={`/talks/${selectedTalk}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors"
                  >
                    Preview
                  </a>
                </div>
              </div>
            ) : selectedBlog ? (
              <div className="space-y-6">
                {/* Blog Metadata */}
                <div className="bg-white/5 rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-bold mb-4">Blog Details</h2>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={blogData.title}
                      onChange={(e) =>
                        setBlogData({ ...blogData, title: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        Date
                      </label>
                      <input
                        type="text"
                        value={blogData.date}
                        onChange={(e) =>
                          setBlogData({ ...blogData, date: e.target.value })
                        }
                        placeholder="Nov 4, 2025"
                        className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        Author
                      </label>
                      <input
                        type="text"
                        value={blogData.author}
                        onChange={(e) =>
                          setBlogData({ ...blogData, author: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      value={blogData.excerpt}
                      onChange={(e) =>
                        setBlogData({ ...blogData, excerpt: e.target.value })
                      }
                      rows={2}
                      placeholder="A brief description that appears in the blog list"
                      className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={blogData.tags}
                      onChange={(e) =>
                        setBlogData({ ...blogData, tags: e.target.value })
                      }
                      placeholder="React, Next.js, Web Development"
                      className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Featured Image
                    </label>
                    <div className="flex items-center gap-4">
                      {blogData.image && (
                        <img
                          src={blogData.image}
                          alt="Featured"
                          className="w-32 h-20 object-cover rounded-lg border border-white/20"
                        />
                      )}
                      <label className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg cursor-pointer transition-colors">
                        <Upload className="w-4 h-4" />
                        <span className="text-sm">
                          {uploading ? "Uploading..." : "Upload Featured Image"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            setUploading(true);
                            const formData = new FormData();
                            formData.append("file", file);

                            try {
                              const res = await fetch("/api/admin/upload", {
                                method: "POST",
                                body: formData,
                              });
                              const data = await res.json();
                              setBlogData({ ...blogData, image: data.url });
                              alert("Featured image uploaded!");
                            } catch (err) {
                              alert("Upload failed: " + err.message);
                            } finally {
                              setUploading(false);
                            }
                          }}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={blogData.featured || false}
                        onChange={(e) =>
                          setBlogData({
                            ...blogData,
                            featured: e.target.checked,
                          })
                        }
                        className="w-5 h-5 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                      />
                      <div>
                        <span className="text-sm text-white font-medium">
                          Featured Blog
                        </span>
                        <p className="text-xs text-white/60">
                          Show this blog post on the homepage
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Content Editor */}
                <div className="bg-white/5 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Content (Markdown)</h2>
                    <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">
                        {uploading ? "Uploading..." : "Upload Image"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          setUploading(true);
                          const formData = new FormData();
                          formData.append("file", file);

                          try {
                            const res = await fetch("/api/admin/upload", {
                              method: "POST",
                              body: formData,
                            });
                            const data = await res.json();

                            const imageMarkdown = `\n![${file.name}](${data.url})\n`;
                            setContent(content + imageMarkdown);
                            alert("Image uploaded!");
                          } catch (err) {
                            alert("Upload failed: " + err.message);
                          } finally {
                            setUploading(false);
                          }
                        }}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  <div data-color-mode="dark">
                    <MDEditor
                      value={content}
                      onChange={(val) => setContent(val || "")}
                      height={500}
                      preview="live"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={saveBlog}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
                  >
                    Save Changes
                  </button>
                  <a
                    href={`/blog/${selectedBlog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors"
                  >
                    Preview
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 rounded-lg p-12 text-center text-white/60">
                Select a{" "}
                {contentType === "projects"
                  ? "project"
                  : contentType === "talks"
                  ? "talk"
                  : "blog"}{" "}
                or create a new one to start editing
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
