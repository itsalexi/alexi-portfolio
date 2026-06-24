"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { getProjectTechLabels } from "../lib/tech-stack";
import { normalizeEllipsis } from "../lib/text";

export default function ProjectCard({
  title,
  description,
  image,
  techStack,
  link,
  priority = false,
}) {
  const techLabels = getProjectTechLabels(techStack, { limit: 3 });

  return (
    <Link href={link} className="block">
      <motion.article
        className="tap-scale group grid gap-5 border-t border-white/[0.08] py-5 transition-[scale] duration-150 ease-out md:grid-cols-[1fr_15rem] md:items-center"
        whileHover={{ x: 3 }}
        transition={{ type: "spring", duration: 0.34, bounce: 0 }}
      >
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              {techLabels.length > 0
                ? <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium leading-5 text-[var(--portfolio-ink-faint)]">
                    {techLabels.map((tech, index) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-2"
                      >
                        <span>{tech}</span>
                        {index < techLabels.length - 1
                          ? <span className="text-[rgba(244,241,234,0.22)]">
                              /
                            </span>
                          : null}
                      </span>
                    ))}
                  </div>
                : null}
            </div>

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-white/[0.035] text-[var(--portfolio-ink-faint)] transition-[background-color,color,transform] duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white/[0.06] group-hover:text-[var(--portfolio-ink)]">
              <IconArrowUpRight className="h-5 w-5" stroke={1.8} />
            </span>
          </div>

          <div className="mt-5">
            <h3 className="max-w-3xl text-[clamp(1.9rem,4.4vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.018em] text-[var(--portfolio-ink)]">
              {title}
            </h3>
            {description
              ? <p className="mt-3 line-clamp-1 max-w-2xl text-sm leading-6 text-[var(--portfolio-ink-muted)]">
                  {normalizeEllipsis(description)}
                </p>
              : null}
          </div>
        </div>

        <div className="relative min-h-[11rem] overflow-hidden rounded-[16px] bg-white/[0.025] shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:min-h-[10rem]">
          {image
            ? <Image
                key={image}
                src={image.split("?")[0]}
                alt={title}
                fill
                fetchPriority={priority ? "high" : "auto"}
                loading={priority ? "eager" : "lazy"}
                priority={priority}
                unoptimized={image.startsWith("/")}
                className="object-cover object-top opacity-82 transition-[scale,opacity] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.025] group-hover:opacity-95"
                sizes="(max-width: 768px) 100vw, 288px"
              />
            : <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-[0.16em] text-[var(--portfolio-ink-faint)]">
                Project preview
              </div>}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/24 to-transparent" />
        </div>
      </motion.article>
    </Link>
  );
}
