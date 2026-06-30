"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

function cleanSrc(src) {
  if (!src || typeof src !== "string") return "";
  return src.split("?")[0];
}

function imageObjectPosition(position = "") {
  const positions = {
    top: "center top",
    center: "center center",
    bottom: "center bottom",
    left: "left center",
    right: "right center",
  };

  return positions[position] || positions.center;
}

export default function BlogCard({
  slug,
  title,
  date,
  tags,
  readTime,
  image,
  imagePosition,
}) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <motion.article
        className="tap-scale grid gap-5 border-t border-white/[0.08] py-5 transition-[scale] duration-150 ease-out md:grid-cols-[1fr_13rem] md:items-center"
        whileHover={{ x: 3 }}
        transition={{ type: "spring", duration: 0.32, bounce: 0 }}
      >
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.13em] text-[var(--portfolio-ink-faint)]">
            <span>{date}</span>
            {readTime ? <span>{readTime}</span> : null}
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

          {tags?.length
            ? <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.66rem] uppercase tracking-[0.13em] text-[var(--portfolio-ink-faint)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            : null}
        </div>

        <div className="relative min-h-[11rem] overflow-hidden rounded-[16px] bg-white/[0.035] md:min-h-[9rem]">
          {image
            ? <Image
                src={cleanSrc(image)}
                alt={title}
                fill
                className="object-cover opacity-78 transition-[scale,opacity] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.035] group-hover:opacity-95"
                style={{ objectPosition: imageObjectPosition(imagePosition) }}
                sizes="(max-width: 768px) 100vw, 208px"
              />
            : <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-[0.16em] text-[var(--portfolio-ink-faint)]">
                Note
              </div>}
        </div>
      </motion.article>
    </Link>
  );
}
