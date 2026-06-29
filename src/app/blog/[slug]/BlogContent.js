"use client";

import { Children, isValidElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import EditorialHeader from "@/components/EditorialHeader";

function getText(children) {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }

      if (isValidElement(child)) {
        return getText(child.props.children);
      }

      return "";
    })
    .join("");
}

function isWhitespace(child) {
  return typeof child === "string" && child.trim() === "";
}

function isImageElement(child) {
  return (
    isValidElement(child) &&
    (child.type === ArticleImage || child.type === "img" || child.props?.src)
  );
}

function isImageOnly(children) {
  const content = Children.toArray(children).filter(
    (child) => !isWhitespace(child),
  );
  return content.length === 1 && isImageElement(content[0]);
}

function isStandaloneEmphasis(children) {
  const content = Children.toArray(children).filter(
    (child) => !isWhitespace(child),
  );
  return (
    content.length === 1 &&
    isValidElement(content[0]) &&
    content[0].type === "em"
  );
}

function isLearningTrailText(text = "") {
  return text.startsWith("Visual Basic → Wix websites → IcyFox");
}

function isMessageScreenshot(src = "") {
  return /\/images\/blogs\/do-something-before-you-have-to\/(?:cold-outreach|feedback|nextpay)-/.test(
    src,
  );
}

const articleImageRatios = {
  "/images/blogs/do-something-before-you-have-to/builder-workshop-group.webp":
    "1600 / 900",
  "/images/blogs/do-something-before-you-have-to/cold-outreach-internship.webp":
    "642 / 382",
  "/images/blogs/do-something-before-you-have-to/feedback-schedule-maker.webp":
    "694 / 718",
  "/images/blogs/do-something-before-you-have-to/hati-laptop.webp":
    "1500 / 1100",
  "/images/blogs/do-something-before-you-have-to/leni-robredo-qtrzip.webp":
    "1400 / 1050",
  "/images/blogs/do-something-before-you-have-to/naga-hackathon-pitch.webp":
    "1500 / 950",
  "/images/blogs/do-something-before-you-have-to/nextpay-invite.webp":
    "682 / 304",
  "/images/blogs/do-something-before-you-have-to/qpi-calculator-room.webp":
    "1600 / 762",
  "/images/blogs/do-something-before-you-have-to/quiet-cafe-work.webp":
    "940 / 760",
  "/images/blogs/do-something-before-you-have-to/sip-scale-room.webp":
    "1600 / 900",
  "/images/blogs/do-something-before-you-have-to/visible-work-impressions.webp":
    "1094 / 684",
};

function getArticleImageRatio(src = "") {
  return articleImageRatios[src.split("?")[0]];
}

function LearningTrail({ text }) {
  const items = text.split("→").map((item) => item.trim());

  return (
    <div className="my-8 overflow-hidden rounded-[18px] border border-white/[0.08] bg-white/[0.035] p-4 shadow-[var(--shadow-border)]">
      <div className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <span key={item} className="contents">
            <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--portfolio-ink-muted)]">
              {item}
            </span>
            {index < items.length - 1
              ? <span className="font-mono text-xs text-[var(--portfolio-ink-faint)]">
                  →
                </span>
              : null}
          </span>
        ))}
      </div>
    </div>
  );
}

function ArticleImage({ src, alt, title }) {
  const isMessage = isMessageScreenshot(src);
  const aspectRatio = getArticleImageRatio(src);

  return (
    <figure
      className={
        isMessage ? "my-10 mx-auto max-w-[min(100%,34rem)]" : "my-10 w-full"
      }
    >
      <div
        style={aspectRatio ? { aspectRatio } : undefined}
        className={
          isMessage
            ? "overflow-hidden rounded-[18px] border border-white/[0.08] bg-white/[0.035] p-2 shadow-[var(--shadow-border)]"
            : "overflow-hidden rounded-[18px] border border-white/[0.06] bg-white/[0.025] shadow-[var(--shadow-border)]"
        }
      >
        <img
          src={src}
          alt={alt}
          className={
            isMessage
              ? "h-full w-full rounded-[12px] object-contain"
              : aspectRatio
                ? "h-full w-full rounded-[18px] object-cover"
                : "w-full rounded-[18px]"
          }
          loading="lazy"
        />
      </div>
      {title
        ? <figcaption className="mt-3 border-l border-white/[0.12] pl-3 font-mono text-[0.68rem] uppercase tracking-[0.13em] text-[var(--portfolio-ink-faint)]">
            {title}
          </figcaption>
        : null}
    </figure>
  );
}

export default function BlogContent({ blog }) {
  return (
    <main className="min-h-screen pt-20 sm:pt-28">
      <article className="mx-auto max-w-[980px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <EditorialHeader
          eyebrow="Writing"
          title={blog.title}
          body={blog.subtitle || blog.excerpt}
          meta={[
            blog.date,
            blog.readTime,
            blog.author,
            ...(blog.tags || []).slice(0, 3),
          ]}
        />

        {blog.image
          ? <figure className="mb-12">
              <div className="overflow-hidden rounded-[18px] border border-white/[0.06] bg-white/[0.025] shadow-[var(--shadow-border)]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-72 w-full object-cover object-center opacity-92 sm:h-96 lg:h-[30rem]"
                />
              </div>
              {blog.subtitle
                ? <figcaption className="mt-3 border-l border-white/[0.12] pl-3 font-mono text-[0.68rem] uppercase tracking-[0.13em] text-[var(--portfolio-ink-faint)]">
                    entering junior year.
                  </figcaption>
                : null}
            </figure>
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
              p: ({ children }) => {
                if (isImageOnly(children)) {
                  return <>{children}</>;
                }

                const text = getText(children).trim();

                if (isLearningTrailText(text)) {
                  return <LearningTrail text={text} />;
                }

                if (isStandaloneEmphasis(children)) {
                  return (
                    <p className="mb-6 font-mono text-[0.72rem] uppercase tracking-[0.13em] text-[var(--portfolio-ink-faint)]">
                      {text}
                    </p>
                  );
                }

                return (
                  <p className="mb-5 text-base leading-8 text-[var(--portfolio-ink-muted)]">
                    {children}
                  </p>
                );
              },
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
              img: ArticleImage,
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
