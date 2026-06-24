"use client";

import { IconSearch, IconX } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import FilterRail from "@/components/FilterRail";
import ProjectCard from "@/components/ProjectCard";
import { getTechLabel } from "@/lib/tech-stack";

const normalize = (value = "") => value.toString().trim().toLowerCase();

export default function ProjectsClient({ projects: initialProjects = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("all");

  const normalizedSearch = normalize(searchQuery);

  const techOptions = useMemo(() => {
    const techMap = new Map();

    initialProjects.forEach((project) => {
      project.techStack?.forEach((tech) => {
        const label = getTechLabel(tech);
        const key = normalize(label);

        if (label && !techMap.has(key)) {
          techMap.set(key, label);
        }
      });
    });

    return [
      { value: "all", label: "All" },
      ...Array.from(techMap.entries())
        .sort(([, labelA], [, labelB]) => labelA.localeCompare(labelB))
        .map(([value, label]) => ({ value, label })),
    ];
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const techNames = project.techStack?.map(getTechLabel) || [];
      const searchable = [
        project.title,
        project.tagline,
        ...techNames,
        ...(project.techStack || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch === "" || searchable.includes(normalizedSearch);

      const projectTech = (project.techStack || []).map((tech) =>
        normalize(getTechLabel(tech)),
      );
      const matchesTech =
        selectedTech === "all" || projectTech.includes(selectedTech);

      return matchesSearch && matchesTech;
    });
  }, [initialProjects, normalizedSearch, selectedTech]);

  const hasFilters = searchQuery || selectedTech !== "all";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedTech("all");
  };

  return (
    <>
      <div className="mb-8 border-b border-white/[0.08] pb-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search projects</span>
            <IconSearch
              className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--portfolio-ink-faint)]"
              stroke={1.8}
            />
            <input
              type="search"
              placeholder="Search projects"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-11 w-full bg-transparent pl-7 pr-3 text-sm text-[var(--portfolio-ink)] transition-colors duration-150 ease-out placeholder:text-[var(--portfolio-ink-faint)] focus:outline-none"
            />
          </label>

          <div className="flex min-h-10 items-center gap-3 text-sm text-[var(--portfolio-ink-faint)]">
            <span>{filteredProjects.length} shown</span>
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
          ariaLabel="Project technology filters"
          className="mt-4"
          layoutId="project-active-filter"
          onChange={setSelectedTech}
          options={techOptions}
          value={selectedTech}
        />
      </div>

      {filteredProjects.length > 0
        ? <div className="grid gap-1">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.tagline}
                image={project.image}
                techStack={project.techStack}
                link={`/projects/${project.slug}`}
                priority={index === 0}
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
