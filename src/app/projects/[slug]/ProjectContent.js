"use client";

import ReactMarkdown from "react-markdown";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectContent({ project }) {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        {/* Featured Image */}
        {project.image && (
          <div className="mb-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[400px] object-cover object-top"
            />
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {project.title}
          </h1>
          <p className="text-lg text-white/60 mb-4">{project.tagline}</p>

          {/* Tech Stack & Links */}
          <div className="flex flex-wrap items-center gap-3">
            {project.techStack &&
              project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                >
                  {tech}
                </span>
              ))}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs transition-colors ml-auto"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Markdown Content */}
        <article className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:pb-2 prose-h2:border-b prose-h2:border-white/10 prose-p:text-white/80 prose-p:leading-relaxed prose-p:text-base prose-ul:space-y-3 prose-li:text-white/80 prose-li:text-base prose-strong:text-white prose-strong:font-semibold prose-code:text-blue-400 prose-code:bg-blue-500/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl">
          <ReactMarkdown
            components={{
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl font-bold text-white mb-6 mt-12 pb-2 border-b border-white/10"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-white/80 leading-relaxed text-base mb-4"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="space-y-3 mb-6" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li
                  className="text-white/80 text-base flex items-start gap-2"
                  {...props}
                >
                  <span className="text-blue-400 mt-1">•</span>
                  <span>{props.children}</span>
                </li>
              ),
              strong: ({ node, ...props }) => (
                <strong className="text-white font-semibold" {...props} />
              ),
              code: ({ node, ...props }) => (
                <code
                  className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded text-sm"
                  {...props}
                />
              ),
              img: ({ node, ...props }) => (
                <img
                  {...props}
                  className="w-full my-8 rounded-xl border border-white/10 shadow-2xl"
                  loading="lazy"
                  alt={props.alt || "Project image"}
                />
              ),
            }}
          >
            {project.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
