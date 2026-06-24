"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function TalkItem({ slug, title, event, date }) {
  return (
    <Link href={`/talks/${slug}`} className="group block">
      <motion.div
        className="tap-scale grid gap-3 border-t border-white/[0.08] py-5 transition-[background-color] duration-200 ease-out hover:bg-white/[0.025] sm:grid-cols-[1fr_auto]"
        whileHover={{ x: 3 }}
        transition={{ type: "spring", duration: 0.3, bounce: 0 }}
      >
        <div>
          <h3 className="text-base font-medium tracking-[-0.018em] text-[var(--portfolio-ink)]">
            {title}
          </h3>
          <p className="mt-1 text-sm text-[var(--portfolio-ink-muted)]">
            {event} / {date}
          </p>
        </div>
        <IconArrowRight
          className="h-5 w-5 text-[var(--portfolio-ink-faint)] transition-[color,transform] duration-200 ease-out group-hover:translate-x-1 group-hover:text-[var(--portfolio-ink)]"
          stroke={1.7}
        />
      </motion.div>
    </Link>
  );
}
