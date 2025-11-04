"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsClient({ projects: initialProjects = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("all");

  // Get all unique tech stack items
  const allTechStack = useMemo(() => {
    const techSet = new Set();
    initialProjects.forEach((project) => {
      project.techStack?.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [initialProjects]);

  // Filter projects based on search and tech filter
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTech =
        selectedTech === "all" || project.techStack?.includes(selectedTech);

      return matchesSearch && matchesTech;
    });
  }, [initialProjects, searchQuery, selectedTech]);

  return (
    <>
      {/* Search and Filter Controls */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
          />
        </div>

        {/* Tech Filter */}
        <div className="relative min-w-[200px]">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Technologies</option>
            {allTechStack.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      {(searchQuery || selectedTech !== "all") && (
        <div className="mb-6 text-sm text-white/60">
          Showing {filteredProjects.length} of {initialProjects.length} projects
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              description={project.tagline}
              image={project.image}
              techStack={project.techStack}
              link={`/projects/${project.slug}`}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white/5 rounded-lg p-12 text-center border border-white/10">
          <p className="text-white/60 mb-2">No projects found</p>
          <p className="text-white/40 text-sm">
            Try adjusting your search or filter
          </p>
        </div>
      )}
    </>
  );
}

