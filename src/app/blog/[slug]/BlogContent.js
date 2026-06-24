"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import EditorialHeader from "@/components/EditorialHeader";

export default function BlogContent({ blog }) {
  return (
    <main className="min-h-screen pt-20 sm:pt-28">
      <article className="mx-auto max-w-[980px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <EditorialHeader
          eyebrow="Writing"
          title={blog.title}
          body={blog.excerpt}
          meta={[
            blog.date,
            blog.readTime,
            blog.author,
            ...(blog.tags || []).slice(0, 3),
          ]}
        />

        {blog.image
          ? <div className="mb-12 overflow-hidden rounded-[18px] bg-white/[0.025] shadow-[var(--shadow-border)]">
              <img
                src={blog.image}
                alt={blog.title}
                className="h-72 w-full object-cover object-top opacity-88 md:h-96"
              />
            </div>
          : null}

        <div className="mx-auto max-w-[720px]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="mb-5 mt-10 text-4xl font-semibold tracking-[-0.018em] text-[var(--portfolio-ink)]">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mb-5 mt-12 border-t border-white/[0.08] pt-6 text-3xl font-semibold tracking-[-0.018em] text-[var(--portfolio-ink)]">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-4 mt-8 text-2xl font-medium tracking-[-0.018em] text-[var(--portfolio-ink)]">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="mb-3 mt-7 text-xl font-medium text-[var(--portfolio-ink)]">
                  {children}
                </h4>
              ),
              p: ({ children }) => (
                <p className="mb-5 text-base leading-8 text-[var(--portfolio-ink-muted)]">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="mb-7 space-y-3">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-7 list-decimal space-y-3 pl-5 text-[var(--portfolio-ink-muted)]">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-base leading-8 text-[var(--portfolio-ink-muted)]">
                  {children}
                </li>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              code: ({ inline, children }) =>
                inline
                  ? <code className="rounded-[6px] bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm text-[var(--portfolio-warm)]">
                      {children}
                    </code>
                  : <code className="block overflow-x-auto rounded-[14px] bg-white/[0.045] p-4 font-mono text-sm leading-7 text-[var(--portfolio-ink-muted)]">
                      {children}
                    </code>,
              pre: ({ children }) => <pre className="mb-6">{children}</pre>,
              blockquote: ({ children }) => (
                <blockquote className="my-7 border-l border-white/[0.16] pl-5 text-[var(--portfolio-ink-muted)]">
                  {children}
                </blockquote>
              ),
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt}
                  className="my-8 w-full rounded-[16px]"
                />
              ),
              hr: () => <hr className="my-10 border-white/[0.08]" />,
              table: ({ children }) => (
                <div className="my-7 overflow-x-auto">
                  <table className="min-w-full text-sm text-[var(--portfolio-ink-muted)]">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-white/[0.08] bg-white/[0.035] px-4 py-2 text-left font-medium text-[var(--portfolio-ink)]">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-white/[0.08] px-4 py-2">
                  {children}
                </td>
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
