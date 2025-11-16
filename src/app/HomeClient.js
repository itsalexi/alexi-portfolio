"use client";

import { useState, useMemo } from "react";
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import BlogCard from "../components/BlogCard";
import ExperienceCard from "../components/ExperienceCard";
import CompanyExperienceGroup from "../components/CompanyExperienceGroup";
import TalkItem from "../components/TalkItem";
import ExperienceFilter from "../components/ExperienceFilter";
import { Spotlight } from "../components/ui/spotlight";
import { BackgroundBeams } from "../components/ui/background-beams";
import { Timeline } from "../components/ui/timeline";
import { Meteors } from "../components/ui/meteors";
import { GlowingEffect } from "../components/ui/glowing-effect";
import { TextHoverEffect } from "../components/ui/text-hover-effect";
import { motion } from "motion/react";
import experienceData from "../data/experience.json";
import { badgeConfig } from "../config/badges";
import { techStack } from "../lib/tech-stack";
import { socials } from "../config/socials";

export default function HomeClient({ talks, featuredProjects, recentBlogs }) {
  const [activeFilter, setActiveFilter] = useState("all");

  // Group experiences by company
  const groupedExperiences = useMemo(() => {
    return experienceData.experiences
      .map((yearData) => {
        const filteredItems = yearData.items.filter(
          (item) => activeFilter === "all" || item.type === activeFilter
        );

        // Group by company
        const companyGroups = {};
        filteredItems.forEach((item) => {
          if (!companyGroups[item.company]) {
            companyGroups[item.company] = {
              company: item.company,
              type: item.type,
              roles: [],
            };
          }
          companyGroups[item.company].roles.push({
            title: item.title,
            duration: item.duration,
            summary: item.summary,
            details: item.details,
          });
        });

        return {
          year: yearData.year,
          groups: Object.values(companyGroups),
        };
      })
      .filter((yearData) => yearData.groups.length > 0);
  }, [activeFilter]);

  return (
    <div className="relative flex flex-col min-h-screen items-center overflow-clip bg-transparent font-sans">
      {/* Meteors - appear at top on mobile, after hero on desktop */}
      <div className="pointer-events-none absolute inset-0 z-0 top-0 sm:top-[100vh]">
        <Meteors number={25} />
      </div>

      <main className="relative z-10 flex w-full max-w-5xl flex-col px-6 sm:px-12">
        <section
          aria-label="Hero"
          className="relative flex min-h-screen w-full items-center justify-center py-16"
        >
          <Spotlight
            className="left-0 top-0 hidden md:left-1/4 md:top-0 md:block"
            fill="#60a5fa"
          />
          <div className="relative z-10 w-full">
            <Hero />
          </div>
          <BackgroundBeams />
        </section>

        <section id="projects" aria-label="Featured Projects" className="py-20">
          <div className="mb-8">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-2">
                  Portfolio
                </p>
                <h2 className="text-3xl font-bold text-white">
                  Featured Projects
                </h2>
              </div>
              <a
                href="/projects"
                className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <span className="hidden sm:inline">View All Projects</span>
                <span className="sm:hidden">View All</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
            <p className="text-white/60 text-sm max-w-2xl">
              A selection of projects I've built, from web applications to side
              projects that solve real problems
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.tagline}
                image={project.image}
                link={`/projects/${project.slug}`}
                techStack={project.techStack}
              />
            ))}
          </div>
        </section>

        <section id="blog" aria-label="Recent Blog Posts" className="py-20">
          <div className="mb-8">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-2">
                  Writing
                </p>
                <h2 className="text-3xl font-bold text-white">
                  Recent Blog Posts
                </h2>
              </div>
              <a
                href="/blog"
                className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <span className="hidden sm:inline">View All Posts</span>
                <span className="sm:hidden">View All</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
            <p className="text-white/60 text-sm max-w-2xl">
              Insights on technology, development practices, and lessons learned
              from building software
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentBlogs.map((blog) => (
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
        </section>

        <section id="talks" aria-label="Talks & Workshops" className="py-20">
          <div className="mb-8">
            <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-2">
              Recent Talks
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Speaking Engagements
            </h2>
            <p className="text-white/60 text-sm max-w-2xl">
              Workshops and talks I've given on web development, sharing
              knowledge with the community
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {talks.map((talk, idx) => (
              <TalkItem
                key={idx}
                slug={talk.slug}
                title={talk.title}
                event={talk.event}
                date={talk.date}
              />
            ))}
          </div>
        </section>

        <section
          id="experience"
          aria-label="Experience & Education"
          className="py-20"
        >
          <div className="mb-8">
            <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-2">
              Timeline
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">My Journey</h2>
            <p className="text-white/60 text-sm max-w-2xl mb-6">
              From student to software engineer, founder, and leader. Here's my
              timeline of growth and experiences
            </p>
            <ExperienceFilter
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </div>
          <div className="-mx-6 sm:-mx-12">
            <Timeline
              key={activeFilter}
              data={groupedExperiences.map((yearData) => ({
                title: yearData.year,
                content: (
                  <div className="space-y-4">
                    {yearData.groups.map((group, index) =>
                      group.roles.length > 1 ? (
                        <CompanyExperienceGroup
                          key={index}
                          company={group.company}
                          roles={group.roles}
                          badge={
                            badgeConfig[group.type] || badgeConfig.experience
                          }
                        />
                      ) : (
                        <ExperienceCard
                          key={index}
                          badge={
                            badgeConfig[group.type] || badgeConfig.experience
                          }
                          title={group.roles[0].title}
                          company={`${group.company} • ${group.roles[0].duration}`}
                          summary={group.roles[0].summary}
                          details={group.roles[0].details}
                        />
                      )
                    )}
                  </div>
                ),
              }))}
            />
          </div>
        </section>

        <section id="tech-stack" aria-label="Tech Stack" className="py-20">
          <div className="mb-8">
            <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-2">
              Technologies
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">Tech Stack</h2>
            <p className="text-white/60 text-sm max-w-2xl">
              The technologies and tools I work with to build modern web
              applications
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {[
              "react",
              "nodejs",
              "nextjs",
              "python",
              "postgresql",
              "docker",
              "tailwind",
              "vercel",
              "firebase",
              "git",
              "cloudflare",
            ].map((tech) => (
              <div key={tech} className="group relative rounded-lg">
                <GlowingEffect
                  disabled={false}
                  proximity={64}
                  spread={50}
                  borderWidth={2}
                  glow={true}
                  inactiveZone={0.01}
                />
                <div className="relative z-10 flex flex-col items-center justify-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 overflow-hidden">
                  <div className="w-10 h-10 mb-2 flex items-center justify-center">
                    <img
                      src={techStack[tech].icon}
                      alt={techStack[tech].name}
                      className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all"
                    />
                  </div>
                  <span className="text-xs text-white/70 text-center font-medium">
                    {techStack[tech].name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Big CTA with TextHoverEffect - Full Width Outside Container */}
      <section className="relative py-8 md:py-32 px-6 overflow-visible w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center relative z-10"
        >
          <div className="h-80 md:h-96 w-full flex items-center justify-center mb-8">
            <div className="w-full max-w-6xl">
              <TextHoverEffect text="ALEXI" />
            </div>
          </div>

          <p className="text-white/60 text-xl mb-8 max-w-2xl mx-auto">
            Got an idea? Want to collaborate on something cool?
            <br />
            <span className="text-white">Let's make it happen.</span>
          </p>

          <a
            href={`mailto:${socials.email}`}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105"
          >
            Get in Touch
          </a>
        </motion.div>
      </section>
    </div>
  );
}
