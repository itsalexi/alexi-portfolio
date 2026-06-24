"use client";

import { IconSearch, IconX } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import BlogCard from "@/components/BlogCard";
import FilterRail from "@/components/FilterRail";

const normalize = (value = "") => value.toString().trim().toLowerCase();

export default function BlogClient({ blogs: initialBlogs = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const normalizedSearch = normalize(searchQuery);

  const tagOptions = useMemo(() => {
    const tagSet = new Set();

    initialBlogs.forEach((blog) => {
      blog.tags?.forEach((tag) => {
        tagSet.add(tag);
      });
    });

    return [
      { value: "all", label: "All" },
      ...Array.from(tagSet)
        .sort((a, b) => a.localeCompare(b))
        .map((tag) => ({ value: tag, label: tag })),
    ];
  }, [initialBlogs]);

  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const searchable = [
        blog.title,
        blog.excerpt,
        blog.date,
        blog.author,
        ...(blog.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch === "" || searchable.includes(normalizedSearch);
      const blogTags = (blog.tags || []).map(normalize);
      const matchesTag =
        selectedTag === "all" || blogTags.includes(normalize(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [initialBlogs, normalizedSearch, selectedTag]);

  const hasFilters = searchQuery || selectedTag !== "all";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedTag("all");
  };

  return (
    <>
      <div className="mb-8 border-b border-white/[0.08] pb-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search writing</span>
            <IconSearch
              className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--portfolio-ink-faint)]"
              stroke={1.8}
            />
            <input
              type="search"
              placeholder="Search writing"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-11 w-full bg-transparent pl-7 pr-3 text-sm text-[var(--portfolio-ink)] transition-colors duration-150 ease-out placeholder:text-[var(--portfolio-ink-faint)] focus:outline-none"
            />
          </label>

          <div className="flex min-h-10 items-center gap-3 text-sm text-[var(--portfolio-ink-faint)]">
            <span>{filteredBlogs.length} shown</span>
            {hasFilters
              ? <button
                  type="button"
                  onClick={resetFilters}
                  className="tap-scale inline-flex h-9 items-center gap-1.5 rounded-[9px] bg-white/[0.035] px-3 text-xs text-[var(--portfolio-ink-muted)] transition-[background-color,color,scale] duration-150 ease-out hover:bg-white/[0.06] hover:text-[var(--portfolio-ink)]"
                >
                  <IconX className="h-3.5 w-3.5" stroke={1.8} />
                  Reset
                </button>
              : null}
          </div>
        </div>

        <FilterRail
          ariaLabel="Writing tag filters"
          className="mt-4"
          layoutId="blog-active-filter"
          onChange={setSelectedTag}
          options={tagOptions}
          value={selectedTag}
        />
      </div>

      {filteredBlogs.length > 0
        ? <div className="grid gap-4">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.slug}
                slug={blog.slug}
                title={blog.title}
                date={blog.date}
                excerpt={blog.excerpt}
                tags={blog.tags}
                image={blog.image}
                author={blog.author}
                readTime={blog.readTime}
              />
            ))}
          </div>
        : <div className="border-y border-white/[0.08] py-12 text-center">
            <p className="mb-2 text-[var(--portfolio-ink-muted)]">
              Nothing matches that filter.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="text-link tap-scale text-sm"
            >
              Clear filters
            </button>
          </div>}
    </>
  );
}
