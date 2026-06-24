"use client";

import { IconArrowUpRight, IconCopy } from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CompanyLogo from "../components/CompanyLogo";
import ExperienceFilter from "../components/ExperienceFilter";
import Hero from "../components/Hero";
import { socials } from "../config/socials";
import experienceData from "../data/experience.json";
import { cn } from "../lib/utils";

const reveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
  },
};

const productOrder = ["Bytespace", "NextPay (YC W21)", "Sip & Scale"];

const productCopy = {
  Bytespace: {
    role: "Product engineer",
    line: "Building core Bot0 agent-platform work across workflows, memory, and integrations. Shipped 8 improvements in under a month.",
  },
  "NextPay (YC W21)": {
    role: "Software engineer intern",
    line: "Shipping fintech dashboard and acquisition work for SMEs. Helped cut manual processing by 75%.",
  },
  "Sip & Scale": {
    role: "Product engineering",
    line: "Leading product engineering for a founder network across 20+ cities, 50+ events, and 1,000+ builders.",
  },
};

const featuredProjectOrder = ["hati", "one-big-match", "ateneo-qpi-calculator"];

const projectCopy = {
  hati: "200+ completed splits and 200k+ in shared expenses tracked after 156 downloads.",
  "one-big-match":
    "Led a 10-person team through 4 live event pilots and 80+ users.",
  "ateneo-qpi-calculator":
    "9,600+ sessions, 131,000+ interactions, and #2 on Google.",
  "ateneo-enlistment-helper":
    "Helped 500+ students plan schedules across 3,000+ enlistment-week visits.",
  "misa-registration-system":
    "Made event check-ins 75% faster for a 550-member org.",
  "tedx-admu": "The event website for TEDxAteneoDeManila.",
};

const projectLabels = {
  hati: "iOS app",
  "one-big-match": "Event product",
  "ateneo-qpi-calculator": "Campus tool",
  "misa-registration-system": "Org system",
};

const timelineCopy = {
  Bytespace:
    "Core Bot0 platform work: 8 product improvements in under a month, plus 5 reliability upgrades in one week.",
  "Sip & Scale":
    "Product systems for 1,000+ builders, 50+ events, and 20+ cities.",
  Crystal:
    "StartupQC finalist exploring shared team memory and faster context recovery.",
  Hakot:
    "1st runner-up out of 80+ participants with an AI-assisted logistics marketplace.",
  SALBAR:
    "Top 5 of 200+ teams; offline-first emergency guidance selected for LGU incubation.",
  "NextPay (YC W21)":
    "YC-backed fintech dashboard work that cut manual SME processing by 75%.",
  "Ateneo MISA": "20+ student devs trained; event check-ins made 75% faster.",
  "One Big Match":
    "10-person team, 4 live event pilots, and 80+ student users.",
  "You can just do things.":
    "First campus talk on building before the perfect plan exists.",
  "Ateneo de Manila University":
    "BS Computer Science, building alongside the degree.",
  TEDxAteneoDeManila: "Led a 3-person team shipping the 2025 TEDx event site.",
};

function timelineLogoKey(entry) {
  if (entry.title === "SALBAR") return "SALBAR";
  if (entry.organizer === "Build and Ship Philippines") {
    return "Build and Ship Philippines";
  }
  if (entry.title === "You can just do things.") return entry.title;
  return entry.company || entry.title;
}

function cleanSrc(src) {
  if (!src || typeof src !== "string") return "";
  return src.split("?")[0];
}

function allExperienceItems() {
  return experienceData.experiences.flatMap((yearData) =>
    yearData.items.map((item) => ({
      ...item,
      year: yearData.year,
    })),
  );
}

function SectionHeader({ eyebrow, title, body, action, align = "split" }) {
  return (
    <motion.div
      variants={revealItem}
      className={cn(
        "mb-7 flex flex-col gap-3",
        align === "split"
          ? "sm:flex-row sm:items-end sm:justify-between"
          : "max-w-3xl",
      )}
    >
      <div>
        <p className="quiet-label mb-3">{eyebrow}</p>
        <h2 className="max-w-3xl text-[clamp(1.9rem,3.8vw,3.3rem)] font-semibold leading-[0.95] tracking-[-0.018em] text-[var(--portfolio-ink)]">
          {title}
        </h2>
      </div>
      {body || action
        ? <div className="flex flex-col gap-4 sm:max-w-xs sm:flex-row sm:items-end sm:justify-between">
            {body
              ? <p className="max-w-xl text-sm leading-6 text-[var(--portfolio-ink-muted)]">
                  {body}
                </p>
              : null}
            {action}
          </div>
        : null}
    </motion.div>
  );
}

function Section({
  eyebrow,
  title,
  body,
  action,
  children,
  className = "",
  align = "split",
}) {
  return (
    <motion.section
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-96px" }}
      className={`py-12 sm:py-16 ${className}`}
    >
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        body={body}
        action={action}
        align={align}
      />
      {children}
    </motion.section>
  );
}

function TextLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-link tap-scale group inline-flex w-max items-center gap-2 whitespace-nowrap text-sm"
    >
      {children}
      <IconArrowUpRight
        className="h-3.5 w-3.5 transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        stroke={1.8}
      />
    </Link>
  );
}

function ArchiveLinks({ links, label }) {
  return (
    <nav
      aria-label={label}
      className="flex flex-wrap items-center gap-x-4 gap-y-2"
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-link tap-scale text-sm"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

function ProductWork() {
  const [activeCompany, setActiveCompany] = useState(productOrder[0]);
  const experiences = allExperienceItems();

  const productItems = productOrder
    .map((company) => {
      const experience = experiences.find((item) => item.company === company);
      if (!experience) return null;

      return {
        title: experience.company,
        role: productCopy[company].role,
        year: experience.year,
        line: productCopy[company].line,
        image: null,
        href: undefined,
        techStack: [],
      };
    })
    .filter(Boolean);

  if (!productItems.length) return null;

  return (
    <Section
      eyebrow="Now"
      title="What I’m working on."
      align="split"
      className="pt-4 sm:pt-6"
    >
      <motion.div variants={reveal} className="grid gap-0">
        {productItems.map((work) => {
          const active = activeCompany === work.title;
          const content = (
            <>
              <CompanyLogo company={work.title} size="lg" aria-hidden={false} />
              <div className="grid min-w-0 gap-2 md:grid-cols-[13rem_1fr] md:gap-7 md:pt-1">
                <div>
                  <h3 className="text-[1.55rem] font-semibold leading-none tracking-[-0.018em] text-[var(--portfolio-ink)]">
                    {work.title.replace(" (YC W21)", "")}
                  </h3>
                  <p className="quiet-label mt-2">{work.role}</p>
                </div>
                <p className="max-w-md text-sm leading-6 text-[var(--portfolio-ink-muted)] md:pt-0.5">
                  {work.line}
                </p>
              </div>
              {work.href
                ? <IconArrowUpRight
                    className="ml-auto mt-1 hidden h-4 w-4 shrink-0 text-[var(--portfolio-ink-faint)] transition-[color,transform] duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--portfolio-ink)] sm:block"
                    stroke={1.8}
                  />
                : null}
            </>
          );
          const tileClass = cn(
            "group flex w-full items-start gap-5 rounded-[18px] px-1 py-5 text-left transition-[background-color,opacity,scale] duration-200 ease-[var(--ease-out-expo)] sm:px-3",
            active
              ? "bg-white/[0.025] opacity-100"
              : "opacity-70 hover:bg-white/[0.02] hover:opacity-100",
          );

          return (
            <motion.div
              key={`${work.title}-${work.role}`}
              variants={revealItem}
              className="border-t border-white/[0.07] last:border-b"
            >
              {work.href
                ? <Link
                    href={work.href}
                    className={tileClass}
                    onMouseEnter={() => setActiveCompany(work.title)}
                    onFocus={() => setActiveCompany(work.title)}
                  >
                    {content}
                  </Link>
                : <button
                    type="button"
                    className={tileClass}
                    onClick={() => setActiveCompany(work.title)}
                    onMouseEnter={() => setActiveCompany(work.title)}
                    onFocus={() => setActiveCompany(work.title)}
                  >
                    {content}
                  </button>}
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}

function BuilderTimeline({ talks = [], hackathons = [] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const experiences = allExperienceItems();
  const findExperience = (company) =>
    experiences.find((item) => item.company === company);
  const findHackathon = (slug) =>
    hackathons.find((hackathon) => hackathon.slug === slug);
  const hackathonEntry = (slug, { thumbnail = false } = {}) => {
    const hackathon = findHackathon(slug);
    if (!hackathon) return null;
    const types =
      hackathon.organizer === "StartupQC"
        ? ["startup", "competition"]
        : ["competition"];

    return {
      type: types[0],
      types,
      year: hackathon.date.match(/\d{4}/)?.[0] || "2026",
      title: hackathon.title,
      company: hackathon.event,
      organizer: hackathon.organizer,
      duration: hackathon.result,
      summary:
        timelineCopy[hackathon.title] ||
        hackathon.highlights?.[0] ||
        hackathon.event,
      thumbnail: thumbnail ? hackathon.image : undefined,
      href: `/hackathons/${hackathon.slug}`,
    };
  };

  const timelineItems = [
    findExperience("Bytespace"),
    hackathonEntry("crystal"),
    hackathonEntry("salbar"),
    findExperience("Sip & Scale"),
    findExperience("NextPay (YC W21)"),
    hackathonEntry("hakot"),
    findExperience("Ateneo MISA"),
    findExperience("One Big Match"),
    talks[0]
      ? {
          type: "leadership",
          year: "2025",
          title: talks[0].title,
          company: talks[0].event,
          duration: talks[0].date,
          summary: timelineCopy[talks[0].title] || talks[0].event,
          thumbnail: talks[0].images?.[0],
          href: `/talks/${talks[0].slug}`,
        }
      : null,
    findExperience("Ateneo de Manila University"),
  ].filter(Boolean);

  const filteredItems = timelineItems.filter(
    (entry) =>
      activeFilter === "all" ||
      (entry.types || [entry.type]).includes(activeFilter),
  );

  const groupedYears = [];
  for (const entry of filteredItems) {
    const group = groupedYears.find((item) => item.year === entry.year);
    if (group) {
      group.items.push(entry);
    } else {
      groupedYears.push({ year: entry.year, items: [entry] });
    }
  }

  return (
    <Section eyebrow="Timeline" title="The longer trail.">
      <motion.div variants={revealItem}>
        <ExperienceFilter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </motion.div>

      <div className="grid gap-7">
        {groupedYears.map(({ year, items }) => (
          <div key={year} className="grid gap-4 md:grid-cols-[4rem_1fr]">
            <p className="font-mono text-sm tabular-nums text-[var(--portfolio-ink-faint)] md:pt-[1.45rem]">
              {year}
            </p>
            <div className="grid gap-1">
              {items.map((entry) => {
                const typeLabel = (entry.types || [entry.type])
                  .filter(Boolean)
                  .join(" + ");
                const metaLabel = [typeLabel, entry.duration]
                  .filter(Boolean)
                  .join(" / ");
                const row = (
                  <div
                    key={`${entry.year}-${entry.title}-${entry.company}-row`}
                    className="group grid gap-4 rounded-[18px] px-1 py-5 transition-[background-color,scale] duration-200 ease-[var(--ease-out-expo)] hover:bg-white/[0.02] sm:grid-cols-[3.4rem_1fr_13rem] sm:px-3"
                  >
                    <CompanyLogo
                      company={timelineLogoKey(entry)}
                      imageSrc={entry.thumbnail}
                      label={entry.title}
                      size="md"
                      aria-hidden={false}
                    />
                    <div>
                      <p className="quiet-label mb-2">{metaLabel}</p>
                      <h3 className="text-xl font-medium leading-tight tracking-[-0.018em] text-[var(--portfolio-ink)]">
                        {entry.title}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--portfolio-ink-muted)]">
                        {entry.company}
                      </p>
                    </div>
                    <p className="text-sm leading-6 text-[var(--portfolio-ink-muted)] sm:max-w-[13rem] sm:text-right">
                      {timelineCopy[entry.company] ||
                        timelineCopy[entry.title] ||
                        entry.summary}
                    </p>
                  </div>
                );

                return entry.href
                  ? <Link
                      key={`${entry.year}-${entry.title}-${entry.company}`}
                      href={entry.href}
                      className="tap-scale block border-t border-white/[0.06] first:border-t-0"
                    >
                      {row}
                    </Link>
                  : <div
                      key={`${entry.year}-${entry.title}-${entry.company}`}
                      className="border-t border-white/[0.06] first:border-t-0"
                    >
                      {row}
                    </div>;
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function BuiltProjects({ projects = [] }) {
  const featuredProjects = featuredProjectOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean);

  if (!featuredProjects.length) return null;

  return (
    <Section
      eyebrow="Projects"
      title="A few things I’ve built."
      action={<TextLink href="/projects">All projects</TextLink>}
    >
      <motion.div variants={reveal} className="grid gap-5 md:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.slug}
            variants={revealItem}
            className="border-t border-white/[0.08] pt-4"
          >
            <Link href={`/projects/${project.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-white/[0.035]">
                {project.image
                  ? <Image
                      src={cleanSrc(project.image)}
                      alt={project.title}
                      fill
                      priority={index === 0}
                      className="object-cover object-top opacity-80 transition-[scale,opacity] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03] group-hover:opacity-96"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  : <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-[0.16em] text-[var(--portfolio-ink-faint)]">
                      Project preview
                    </div>}
              </div>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="quiet-label mb-2">
                    {projectLabels[project.slug] || "Project"}
                  </p>
                  <h3 className="text-2xl font-medium leading-tight tracking-[-0.018em] text-[var(--portfolio-ink)]">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--portfolio-ink-muted)]">
                    {projectCopy[project.slug] || project.tagline}
                  </p>
                </div>
                <IconArrowUpRight
                  className="mt-1 h-4 w-4 shrink-0 text-[var(--portfolio-ink-faint)] transition-[color,transform] duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--portfolio-ink)]"
                  stroke={1.8}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function ActivityPanels({ recentBlogs = [], talks = [], hackathons = [] }) {
  const activities = [
    recentBlogs[0]
      ? {
          type: "Writing",
          title: recentBlogs[0].title,
          meta: [recentBlogs[0].date, recentBlogs[0].readTime]
            .filter(Boolean)
            .join(" / "),
          image: recentBlogs[0].image,
          href: `/blog/${recentBlogs[0].slug}`,
        }
      : null,
    talks[0]
      ? {
          type: "Talk",
          title: talks[0].title,
          meta: talks[0].event,
          image: talks[0].images?.[0],
          href: `/talks/${talks[0].slug}`,
        }
      : null,
    hackathons[0]
      ? {
          type: "Hackathon",
          title: hackathons[0].title,
          meta: [hackathons[0].result, hackathons[0].event]
            .filter(Boolean)
            .join(" / "),
          image: hackathons[0].image,
          href: `/hackathons/${hackathons[0].slug}`,
        }
      : null,
  ].filter(Boolean);

  if (!activities.length) return null;

  return (
    <Section
      eyebrow="Dispatches"
      title="Writing, talks, and weekends."
      action={
        <ArchiveLinks
          label="Dispatch archives"
          links={[
            { href: "/blog", label: "Writing" },
            { href: "/talks", label: "Talks" },
            { href: "/hackathons", label: "Hackathons" },
          ]}
        />
      }
    >
      <motion.div
        variants={reveal}
        className="grid gap-1 border-y border-white/[0.08] py-2"
      >
        {activities.map((activity) => (
          <motion.div
            key={activity.href}
            variants={revealItem}
            className="border-t border-white/[0.06] first:border-t-0"
          >
            <Link
              href={activity.href}
              className="tap-scale group grid grid-cols-[6rem_1fr] gap-4 rounded-[16px] px-1 py-5 transition-[background-color,scale] duration-200 ease-[var(--ease-out-expo)] hover:bg-white/[0.02] sm:grid-cols-[12.5rem_1fr_auto] sm:items-center sm:gap-6 sm:px-3"
            >
              <div className="relative row-span-2 aspect-[16/10] overflow-hidden rounded-[14px] bg-white/[0.035] sm:row-span-1">
                {activity.image
                  ? <Image
                      src={cleanSrc(activity.image)}
                      alt={activity.title}
                      fill
                      className="object-cover object-center opacity-80 transition-[scale,opacity] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03] group-hover:opacity-96"
                      sizes="(max-width: 640px) 96px, 200px"
                    />
                  : null}
                <span className="quiet-label absolute left-2 top-2 rounded-[7px] bg-black/40 px-2 py-1 text-[0.56rem] text-white/72 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-md">
                  {activity.type}
                </span>
              </div>
              <div className="min-w-0">
                <div>
                  <h3 className="text-xl font-medium leading-tight tracking-[-0.018em] text-[var(--portfolio-ink)] sm:text-2xl">
                    {activity.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--portfolio-ink-muted)]">
                    {activity.meta}
                  </p>
                </div>
              </div>
              <IconArrowUpRight
                className="hidden h-4 w-4 shrink-0 text-[var(--portfolio-ink-faint)] transition-[color,transform] duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--portfolio-ink)] sm:block"
                stroke={1.8}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function AboutContactStrip() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(socials.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <motion.section
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-96px" }}
      className="py-14 sm:py-20"
    >
      <motion.div
        variants={revealItem}
        className="grid gap-8 py-4 sm:grid-cols-[1fr_0.78fr] sm:items-end"
      >
        <div>
          <p className="quiet-label mb-3">About / contact</p>
          <h2 className="max-w-2xl text-balance text-[clamp(2.4rem,5.2vw,4.7rem)] font-semibold leading-[0.92] tracking-[-0.018em] text-[var(--portfolio-ink)]">
            Building tools for students, startups, and communities.
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          <p className="max-w-sm text-pretty text-sm leading-6 text-[var(--portfolio-ink-muted)]">
            Email is best if you’re building something, planning an event, or
            just want to compare ideas.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={`mailto:${socials.email}`}
              className="text-link tap-scale group inline-flex min-h-10 items-center gap-2 text-sm"
            >
              Email me
              <IconArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                stroke={1.8}
              />
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="tap-scale inline-flex min-h-10 items-center gap-2 text-sm text-[var(--portfolio-ink-muted)] transition-[color,scale] duration-150 ease-out hover:text-[var(--portfolio-ink)]"
            >
              <IconCopy className="h-4 w-4" stroke={1.8} />
              {copied ? "Copied" : "Copy email"}
            </button>

            <TextLink href="/about">Learn more about me</TextLink>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default function HomeClient({
  talks,
  featuredProjects: projects,
  recentBlogs,
  hackathons = [],
}) {
  return (
    <div className="relative min-h-screen overflow-clip">
      <main className="mx-auto flex w-full max-w-[980px] flex-col px-5 pt-8 sm:px-8 sm:pt-10 lg:px-10">
        <section aria-label="Hero">
          <Hero />
        </section>

        <ProductWork />

        <BuilderTimeline talks={talks} hackathons={hackathons} />

        <BuiltProjects projects={projects} />

        <ActivityPanels
          recentBlogs={recentBlogs}
          talks={talks}
          hackathons={hackathons}
        />

        <AboutContactStrip />
      </main>
    </div>
  );
}
