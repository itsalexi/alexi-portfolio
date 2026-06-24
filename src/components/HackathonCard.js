"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import CompanyLogo from "./CompanyLogo";

function cleanSrc(url) {
  if (!url || typeof url !== "string") return "";
  return url.split("?")[0];
}

export default function HackathonCard({
  name,
  date,
  event,
  result,
  organizer,
  image,
  images,
  imageAlt,
  href,
}) {
  const gallery = useMemo(() => {
    if (Array.isArray(images) && images.length > 0) {
      return images.map(cleanSrc).filter(Boolean);
    }
    if (image) return [cleanSrc(image)].filter(Boolean);
    return [];
  }, [images, image]);

  const currentSrc = gallery[0] || "";
  const organizerLogos = ["StartupQC", "Build and Ship Philippines"];
  const logoCompany = organizerLogos.includes(organizer)
    ? organizer
    : ["SALBAR", "Crystal"].includes(name)
      ? name
      : "";

  const article = (
    <motion.article
      className="tap-scale group grid gap-5 border-t border-white/[0.08] py-5 transition-[scale] duration-150 ease-out md:grid-cols-[13rem_1fr] md:items-center"
      whileHover={{ x: 3 }}
      transition={{ type: "spring", duration: 0.32, bounce: 0 }}
    >
      <div className="relative min-h-[11rem] overflow-hidden rounded-[16px] bg-white/[0.035] md:min-h-[9rem]">
        {currentSrc
          ? <Image
              src={currentSrc}
              alt={imageAlt || name}
              fill
              className="object-cover object-center opacity-78 transition-[scale,opacity] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.035] group-hover:opacity-95"
              sizes="(max-width: 768px) 100vw, 208px"
              unoptimized={currentSrc.startsWith("/images/hackathons/")}
            />
          : <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-[0.16em] text-[var(--portfolio-ink-faint)]">
              Build
            </div>}
      </div>

      <div className="min-w-0">
        <div className="mb-4 flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.13em] text-[var(--portfolio-ink-faint)]">
          {logoCompany
            ? <CompanyLogo
                company={logoCompany}
                size="xs"
                aria-hidden={false}
              />
            : null}
          <span>{date}</span>
          {organizer ? <span>{organizer}</span> : null}
        </div>

        <div className="flex items-start justify-between gap-4">
          <h3 className="max-w-3xl text-[clamp(1.9rem,4.2vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.018em] text-[var(--portfolio-ink)]">
            {name}
          </h3>
          {href
            ? <IconArrowUpRight
                className="mt-1 h-5 w-5 shrink-0 text-[var(--portfolio-ink-faint)] transition-[color,transform] duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--portfolio-ink)]"
                stroke={1.8}
              />
            : null}
        </div>

        <p className="mt-3 text-sm text-[var(--portfolio-ink-muted)]">
          {[result, event].filter(Boolean).join(" / ")}
        </p>
      </div>
    </motion.article>
  );

  if (!href) return article;

  return (
    <Link href={href} className="block">
      {article}
    </Link>
  );
}
