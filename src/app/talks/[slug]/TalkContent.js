"use client";

import { IconExternalLink } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import ArticleTableOfContents from "@/components/ArticleTableOfContents";
import EditorialHeader from "@/components/EditorialHeader";
import { getReactNodeText } from "@/lib/react-node-text";
import {
  createHeadingIdResolver,
  extractMarkdownHeadings,
} from "@/lib/table-of-contents.mjs";
import Carousel from "../../../components/ui/carousel";

export default function TalkContent({ talk }) {
  const headings = extractMarkdownHeadings(talk.fullDescription);
  const resolveHeadingId = createHeadingIdResolver(headings);
  const slideData =
    talk.images?.map((image, index) => ({
      title: `Photo ${index + 1}`,
      src: image,
    })) || [];

  return (
    <main className="min-h-screen pt-20 sm:pt-28">
      <div className="mx-auto max-w-[980px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 xl:max-w-[1120px]">
        <EditorialHeader
          eyebrow="Talk"
          title={talk.title}
          body={talk.shortDescription}
          meta={[talk.event, talk.date, ...(talk.topics || [])]}
        />

        {slideData.length > 0
          ? <Carousel className="mb-12" fit="contain" slides={slideData} />
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
                a: ({ node, ...props }) => (
                  <a className="text-link" {...props} />
                ),
              }}
            >
              {talk.fullDescription}
            </ReactMarkdown>
          </article>
        </div>

        {talk.link
          ? <div className="mx-auto max-w-[720px]">
              <a
                href={talk.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link tap-scale mt-10 inline-flex min-h-10 items-center gap-1.5 text-sm"
              >
                View details
                <IconExternalLink className="h-4 w-4" stroke={1.8} />
              </a>
            </div>
          : null}
      </div>
    </main>
  );
}
