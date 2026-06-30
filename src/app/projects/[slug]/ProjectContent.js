"use client";

import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import ArticleTableOfContents from "@/components/ArticleTableOfContents";
import EditorialHeader from "@/components/EditorialHeader";
import { getReactNodeText } from "@/lib/react-node-text";
import {
  createHeadingIdResolver,
  extractMarkdownHeadings,
} from "@/lib/table-of-contents.mjs";
import { getProjectTechLabels } from "@/lib/tech-stack";

export default function ProjectContent({ project }) {
  const headings = extractMarkdownHeadings(project.content);
  const resolveHeadingId = createHeadingIdResolver(headings);

  return (
    <main className="min-h-screen pt-20 sm:pt-28">
      <div className="mx-auto max-w-[980px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 xl:max-w-[1120px]">
        <EditorialHeader
          eyebrow="Project"
          title={project.title}
          body={project.tagline}
          meta={getProjectTechLabels(project.techStack || [])}
        />

        {(project.liveUrl || project.githubUrl) && (
          <div className="-mt-5 mb-10 flex flex-wrap gap-5">
            {project.liveUrl
              ? <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link tap-scale inline-flex min-h-10 items-center gap-1.5 text-sm"
                >
                  Live site
                  <IconExternalLink className="h-4 w-4" stroke={1.8} />
                </a>
              : null}
            {project.githubUrl
              ? <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link tap-scale inline-flex min-h-10 items-center gap-1.5 text-sm"
                >
                  Code
                  <IconBrandGithub className="h-4 w-4" stroke={1.8} />
                </a>
              : null}
          </div>
        )}

        {project.image
          ? <div className="mb-12 overflow-hidden rounded-[18px] bg-white/[0.025] shadow-[var(--shadow-border)]">
              <img
                src={project.image}
                alt={project.title}
                className="h-[20rem] w-full object-cover object-top opacity-88 md:h-[26rem]"
              />
            </div>
          : null}

        <div className="mx-auto grid max-w-[720px] xl:max-w-[1040px] xl:grid-cols-[minmax(0,720px)_160px] xl:items-start xl:gap-16">
          <ArticleTableOfContents headings={headings} />
          <article className="min-w-0 xl:order-1">
            <ReactMarkdown
              components={{
                h2: ({ children }) => {
                  const id = resolveHeadingId(2, getReactNodeText(children));

                  return (
                    <h2
                      id={id}
                      className="scroll-mt-28 mb-5 mt-12 border-t border-white/[0.08] pt-6 text-3xl font-semibold tracking-[-0.018em] text-[var(--portfolio-ink)]"
                    >
                      {children}
                    </h2>
                  );
                },
                h3: ({ children }) => {
                  const id = resolveHeadingId(3, getReactNodeText(children));

                  return (
                    <h3
                      id={id}
                      className="scroll-mt-28 mb-4 mt-8 text-2xl font-medium tracking-[-0.018em] text-[var(--portfolio-ink)]"
                    >
                      {children}
                    </h3>
                  );
                },
                p: ({ node, ...props }) => (
                  <p
                    className="mb-5 text-base leading-8 text-[var(--portfolio-ink-muted)]"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="mb-7 space-y-3" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li
                    className="grid grid-cols-[0.75rem_1fr] gap-2 text-base leading-8 text-[var(--portfolio-ink-muted)]"
                    {...props}
                  >
                    <span className="mt-3.5 h-1 w-1 rounded-[2px] bg-[var(--portfolio-ink-faint)]" />
                    <span>{props.children}</span>
                  </li>
                ),
                strong: ({ node, ...props }) => (
                  <strong
                    className="font-medium text-[var(--portfolio-ink)]"
                    {...props}
                  />
                ),
                code: ({ node, ...props }) => (
                  <code
                    className="rounded-[6px] bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm text-[var(--portfolio-warm)]"
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a className="text-link" {...props} />
                ),
                img: ({ node, ...props }) => (
                  <img
                    {...props}
                    className="my-8 w-full rounded-[16px]"
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
    </main>
  );
}
