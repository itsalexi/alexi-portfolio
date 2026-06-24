"use client";

import { IconExternalLink } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import EditorialHeader from "@/components/EditorialHeader";
import Carousel from "../../../components/ui/carousel";

export default function TalkContent({ talk }) {
  const slideData =
    talk.images?.map((image, index) => ({
      title: `Photo ${index + 1}`,
      src: image,
    })) || [];

  return (
    <main className="min-h-screen pt-20 sm:pt-28">
      <div className="mx-auto max-w-[980px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <EditorialHeader
          eyebrow="Talk"
          title={talk.title}
          body={talk.shortDescription}
          meta={[talk.event, talk.date, ...(talk.topics || [])]}
        />

        {slideData.length > 0
          ? <Carousel className="mb-12" fit="contain" slides={slideData} />
          : null}

        <article className="mx-auto max-w-[720px]">
          <ReactMarkdown
            components={{
              h2: ({ node, ...props }) => (
                <h2
                  className="mb-5 mt-12 border-t border-white/[0.08] pt-6 text-3xl font-semibold tracking-[-0.018em] text-[var(--portfolio-ink)]"
                  {...props}
                />
              ),
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
              a: ({ node, ...props }) => <a className="text-link" {...props} />,
            }}
          >
            {talk.fullDescription}
          </ReactMarkdown>
        </article>

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
