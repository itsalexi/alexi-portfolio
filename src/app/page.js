"use client";

import { useState, useMemo } from "react";
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import ExperienceCard from "../components/ExperienceCard";
import CompanyExperienceGroup from "../components/CompanyExperienceGroup";
import TalkItem from "../components/TalkItem";
import ExperienceFilter from "../components/ExperienceFilter";
import { Spotlight } from "../components/ui/spotlight";
import { Meteors } from "../components/ui/meteors";
import { BackgroundBeams } from "../components/ui/background-beams";
import { Timeline } from "../components/ui/timeline";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { Modal, ModalTrigger, ModalBody, ModalContent } from "../components/ui/animated-modal";
import ClickParticles from "../components/ClickParticles";
import experienceData from "../data/experience.json";
import talksData from "../data/talks.json";
import { badgeConfig } from "../config/badges";
import { Code2, Lightbulb, Server, GraduationCap } from "lucide-react";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");

  const skillsData = [
    {
      title: "Frontend Development",
      description: "Building modern web apps with React, Next.js, and Tailwind CSS",
      icon: <Code2 className="w-8 h-8 text-blue-400" strokeWidth={1.5} />,
      gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))",
      details: [
        {
          title: "Tech Stack",
          items: [
            "React & Next.js for building fast, modern web apps",
            "Tailwind CSS for responsive, utility-first styling",
            "TypeScript for type-safe development",
            "Framer Motion for smooth animations"
          ]
        },
        {
          title: "What I Focus On",
          items: [
            "Clean component architecture that's easy to maintain",
            "Responsive designs that work on any device",
            "Smooth interactions and delightful UX",
            "Performance optimization and fast load times"
          ]
        }
      ]
    },
    {
      title: "Product Development",
      description: "Building One Big Match as a side project, learning product thinking along the way",
      icon: <Lightbulb className="w-8 h-8 text-purple-400" strokeWidth={1.5} />,
      gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))",
      details: [
        {
          title: "Working on One Big Match",
          items: [
            "Building a side project from scratch",
            "Figuring out what features to build first",
            "Learning product management as I go"
          ]
        },
        {
          title: "What I'm Learning",
          items: [
            "How to talk to users and get real feedback",
            "Balancing what's cool vs what's actually useful",
            "Shipping fast and iterating based on what works",
            "Making product decisions with limited time"
          ]
        }
      ]
    },
    {
      title: "Backend & APIs",
      description: "Building scalable backends with Node.js, PostgreSQL, and Cloudflare Workers",
      icon: <Server className="w-8 h-8 text-green-400" strokeWidth={1.5} />,
      gradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))",
      details: [
        {
          title: "Tech Stack",
          items: [
            "Node.js for building server-side applications",
            "PostgreSQL for reliable data storage",
            "Cloudflare Workers for edge computing",
            "Python for scripting and automation",
            "Docker for containerization"
          ]
        },
        {
          title: "What I Focus On",
          items: [
            "Designing APIs that are easy to use",
            "Writing clean, maintainable code",
            "Securing endpoints with proper auth",
            "Optimizing for performance and scale"
          ]
        }
      ]
    },
    {
      title: "Teaching & Mentorship",
      description: "Running web dev workshops at Ateneo MISA and helping students learn to code",
      icon: <GraduationCap className="w-8 h-8 text-orange-400" strokeWidth={1.5} />,
      gradient: "linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(239, 68, 68, 0.2))",
      details: [
        {
          title: "At MISA",
          items: [
            "Running workshops on web development basics",
            "Teaching students how to build their first projects",
            "Helping organize tech events and activities"
          ]
        },
        {
          title: "My Style",
          items: [
            "Making complex stuff easier to understand",
            "Using real examples instead of just theory",
            "Helping people debug when they're stuck",
            "Sharing mistakes I've made so others don't"
          ]
        }
      ]
    }
  ];


  // Group experiences by company
  const groupedExperiences = useMemo(() => {
    return experienceData.experiences.map(yearData => {
      const filteredItems = yearData.items.filter(
        item => activeFilter === "all" || item.type === activeFilter
      );

      // Group by company
      const companyGroups = {};
      filteredItems.forEach(item => {
        if (!companyGroups[item.company]) {
          companyGroups[item.company] = {
            company: item.company,
            type: item.type,
            roles: []
          };
        }
        companyGroups[item.company].roles.push({
          title: item.title,
          duration: item.duration,
          summary: item.summary,
          details: item.details
        });
      });

      return {
        year: yearData.year,
        groups: Object.values(companyGroups)
      };
    }).filter(yearData => yearData.groups.length > 0);
  }, [activeFilter]);
  return (
    <div className="relative flex min-h-screen items-stretch justify-center overflow-clip bg-zinc-50 font-sans dark:bg-black">
      <ClickParticles />
      <div className="pointer-events-none absolute inset-0">
        <Meteors number={5} />
      </div>
      <main className="relative z-10 flex w-full max-w-5xl flex-col px-6 sm:px-12">
        <section aria-label="Hero" className="relative flex min-h-screen w-full items-center justify-center py-16">
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
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-2">Portfolio</p>
              <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
            </div>
            <a
              href="/projects"
              className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
            >
              <span>View All Projects</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <ProjectCard
              title="Portfolio Website"
              description="A modern portfolio website built with Next.js, featuring smooth animations, responsive design, and interactive components."
              image={null}
              link="https://github.com"
                techStack={["nextjs", "react", "tailwind"]}
            />
            <ProjectCard
              title="Security Tool"
              description="An automated security scanning tool that helps identify vulnerabilities in web applications and APIs."
              image={null}
              link="https://github.com"
              techStack={["python", "docker"]}
            />
          </div>
        </section>
        
        <section id="experience" aria-label="Experience & Education" className="py-20">
          <div className="mb-8">
            <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-2">Timeline</p>
            <h2 className="text-3xl font-bold text-white mb-4">My Journey</h2>
            <p className="text-white/70 text-sm md:text-base max-w-2xl mb-6">
              From student to software engineer, founder, and leader. Here's my timeline of growth and experiences.
            </p>
            <ExperienceFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          </div>
          <div className="-mx-6 sm:-mx-12">
            <Timeline 
              key={activeFilter}
              data={groupedExperiences.map(yearData => ({
                title: yearData.year,
                content: (
                  <div className="space-y-4">
                    {yearData.groups.map((group, index) => (
                      group.roles.length > 1 ? (
                        <CompanyExperienceGroup
                          key={index}
                          company={group.company}
                          roles={group.roles}
                          badge={badgeConfig[group.type] || badgeConfig.experience}
                        />
                      ) : (
                        <ExperienceCard
                          key={index}
                          badge={badgeConfig[group.type] || badgeConfig.experience}
                          title={group.roles[0].title}
                          company={`${group.company} • ${group.roles[0].duration}`}
                          summary={group.roles[0].summary}
                          details={group.roles[0].details}
                        />
                      )
                    ))}
                  </div>
                ),
              }))} 
            />
          </div>
        </section>
        
        <section id="skills" aria-label="Skills & Tools" className="py-20">
          <div className="mb-8">
            <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-2">Expertise</p>
            <h2 className="text-3xl font-bold text-white mb-4">What I Do</h2>
          </div>
          <BentoGrid>
            {skillsData.map((skill, idx) => (
              <Modal key={idx}>
                <ModalTrigger className={idx === 0 || idx === 3 ? "md:col-span-2 w-full h-full p-0" : "w-full h-full p-0"}>
                  <BentoGridItem
                    title={skill.title}
                    description={skill.description}
                    header={
                      <div className="flex h-full min-h-[6rem] w-full items-center justify-center rounded-xl relative overflow-hidden group" style={{
                        backgroundImage: skill.gradient
                      }}>
                        {skill.icon}
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                      </div>
                    }
                    className="cursor-pointer h-full hover:scale-[1.02] transition-transform duration-300"
                  />
                </ModalTrigger>
                <ModalBody>
                  <ModalContent className="overflow-y-auto max-h-[65vh]">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0" style={{
                        backgroundImage: skill.gradient
                      }}>
                        {skill.icon}
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                        {skill.title}
                      </h3>
                    </div>

                    {/* Detailed content */}
                    <div className="space-y-5">
                      {skill.details.map((section, sectionIdx) => (
                        <div key={sectionIdx}>
                          <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                            {section.title}
                          </h4>
                          <ul className="space-y-1.5">
                            {section.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="text-neutral-700 dark:text-neutral-400 text-sm flex items-start gap-2">
                                <span className="text-blue-400 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </ModalContent>
                </ModalBody>
              </Modal>
            ))}
          </BentoGrid>
        </section>

        <section id="talks" aria-label="Talks & Workshops" className="py-20">
          <div className="mb-8">
            <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-2">Recent Talks</p>
            <h2 className="text-3xl font-bold text-white mb-4">Speaking Engagements</h2>
          </div>
          <div className="space-y-3">
            {talksData.talks.map((talk, idx) => (
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
      </main>

    </div>
  );
}
