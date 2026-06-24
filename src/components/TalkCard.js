"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function TalkCard({
  slug,
  title,
  event,
  date,
  location,
  topics,
  image,
}) {
  return (
    <Link href={`/talks/${slug}`} className="group block">
      <motion.article
        className="tap-scale grid gap-5 border-t border-white/[0.08] py-5 transition-[scale] duration-150 ease-out md:grid-cols-[13rem_1fr] md:items-center"
        whileHover={{ x: 3 }}
        transition={{ type: "spring", duration: 0.32, bounce: 0 }}
      >
        <div className="relative min-h-[11rem] overflow-hidden rounded-[16px] bg-white/[0.035] md:min-h-[9rem]">
          {image
            ? <Image
                src={image}
                alt={title}
                fill
                className="object-cover object-top opacity-78 transition-[scale,opacity] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.035] group-hover:opacity-95"
                sizes="(max-width: 768px) 100vw, 208px"
              />
            : <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-[0.16em] text-[var(--portfolio-ink-faint)]">
                Talk
              </div>}
        </div>

        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.13em] text-[var(--portfolio-ink-faint)]">
            <span>{date}</span>
            {location ? <span>{location}</span> : null}
          </div>

          <div className="flex items-start justify-between gap-4">
            <h3 className="max-w-3xl text-[clamp(1.8rem,4vw,3.5rem)] font-semibold leading-[0.96] tracking-[-0.018em] text-[var(--portfolio-ink)]">
              {title}
            </h3>
            <IconArrowUpRight
              className="mt-1 h-5 w-5 shrink-0 text-[var(--portfolio-ink-faint)] transition-[color,transform] duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--portfolio-ink)]"
              stroke={1.8}
            />
          </div>

          <p className="mt-3 text-sm text-[var(--portfolio-ink-muted)]">
            {event}
          </p>

          {topics?.length
            ? <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                {topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="font-mono text-[0.66rem] uppercase tracking-[0.13em] text-[var(--portfolio-ink-faint)]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            : null}
        </div>
      </motion.article>
    </Link>
  );
}
