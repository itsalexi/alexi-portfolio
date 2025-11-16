"use client";

import { Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogContent({ blog }) {
  return (
    <div className="min-h-screen bg-transparent text-white pt-20">
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-6 py-6">
        {/* Featured Image */}
        {blog.image && (
          <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-white/60 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{blog.date}</span>
          </div>
          {blog.readTime && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime}</span>
            </div>
          )}
          {blog.author && <span className="ml-auto">By {blog.author}</span>}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-white/10">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg font-bold mt-6 mb-3">{children}</h4>
              ),
              p: ({ children }) => (
                <p className="text-white/80 leading-relaxed mb-4">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-2 text-white/80">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-2 text-white/80">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-white/80">{children}</li>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              code: ({ inline, children }) =>
                inline ? (
                  <code className="px-1.5 py-0.5 rounded bg-white/10 text-blue-400 text-sm font-mono">
                    {children}
                  </code>
                ) : (
                  <code className="block p-4 rounded-lg bg-white/5 border border-white/10 text-sm font-mono overflow-x-auto mb-4">
                    {children}
                  </code>
                ),
              pre: ({ children }) => <pre className="mb-4">{children}</pre>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-white/70 my-4">
                  {children}
                </blockquote>
              ),
              img: ({ src, alt }) => (
                <img src={src} alt={alt} className="rounded-lg my-6 w-full" />
              ),
              hr: () => <hr className="border-white/10 my-8" />,
              table: ({ children }) => (
                <div className="overflow-x-auto my-6">
                  <table className="min-w-full border border-white/10">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-white/10 px-4 py-2 bg-white/5 text-left font-semibold">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-white/10 px-4 py-2 text-white/80">
                  {children}
                </td>
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
