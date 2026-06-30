"use client";

import { useEffect, useMemo, useState } from "react";
import { hasArticleSections } from "@/lib/table-of-contents.mjs";

export default function ArticleTableOfContents({ headings = [] }) {
  const visibleHeadings = useMemo(
    () => headings.filter((heading) => heading.id && heading.text),
    [headings],
  );
  const firstHeadingId = visibleHeadings[0]?.id || "";
  const [activeId, setActiveId] = useState(firstHeadingId);

  useEffect(() => {
    setActiveId(firstHeadingId);
  }, [firstHeadingId]);

  useEffect(() => {
    if (visibleHeadings.length < 2) return undefined;

    const headingElements = visibleHeadings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean);

    if (!headingElements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          );

        if (visibleEntries[0]) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-22% 0px -68% 0px",
        threshold: [0, 1],
      },
    );

    headingElements.forEach((headingElement) => {
      observer.observe(headingElement);
    });

    return () => observer.disconnect();
  }, [visibleHeadings]);

  if (!hasArticleSections(visibleHeadings)) return null;

  return (
    <nav
      aria-label="Article sections"
      className="hidden xl:sticky xl:top-32 xl:order-2 xl:block xl:max-h-[calc(100dvh-9rem)]"
    >
      <ol className="space-y-2 border-l border-white/[0.08] pl-4">
        {visibleHeadings.map((heading) => {
          const isActive = activeId === heading.id;

          return (
            <li
              key={heading.id}
              className={heading.level === 3 ? "pl-3" : undefined}
            >
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActiveId(heading.id)}
                className={`group relative block py-1 text-left leading-5 transition-colors duration-200 ${
                  isActive
                    ? "text-[var(--portfolio-ink)]"
                    : "text-[var(--portfolio-ink-faint)] hover:text-[var(--portfolio-ink-muted)]"
                }`}
              >
                <span
                  className={`absolute -left-[17px] top-2 h-3 w-px transition-colors duration-200 ${
                    isActive
                      ? "bg-[var(--portfolio-warm)]"
                      : "bg-transparent group-hover:bg-white/[0.18]"
                  }`}
                />
                <span
                  className={`block max-w-[11rem] ${
                    heading.level === 3
                      ? "font-mono text-[0.68rem] uppercase tracking-[0.11em]"
                      : "text-[0.76rem]"
                  }`}
                >
                  {heading.text}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
