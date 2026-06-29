"use client";

import {
  IconArrowUpRight,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconCopy,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useState } from "react";
import { socials } from "../config/socials";
import { usePreloaderReady } from "../hooks/usePreloaderReady";

const links = [
  { label: "GitHub", href: socials.github, icon: IconBrandGithub },
  { label: "LinkedIn", href: socials.linkedin, icon: IconBrandLinkedin },
  { label: "Instagram", href: socials.instagram, icon: IconBrandInstagram },
  { label: "Discord", href: socials.discord, icon: IconBrandDiscord },
];

const reveal = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ContactCanvas({ compact = false, showHeader = true }) {
  const [copied, setCopied] = useState(false);
  const isReady = usePreloaderReady();

  const copyEmail = async () => {
    await navigator.clipboard.writeText(socials.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <motion.section
      id="contact"
      variants={reveal}
      initial="hidden"
      whileInView={isReady ? "visible" : "hidden"}
      viewport={{ once: true, margin: "-96px" }}
      className={compact ? "pb-14 sm:pb-20" : "py-16 sm:py-24"}
    >
      <motion.div variants={item} className="relative py-4 sm:py-6">
        {showHeader
          ? <div className="max-w-3xl">
              <p className="quiet-label mb-3">Contact</p>
              <h2 className="text-balance text-[clamp(2.9rem,8vw,6.8rem)] font-semibold leading-[0.88] tracking-[-0.018em] text-[var(--portfolio-ink)]">
                Say hi.
              </h2>
              <p className="mt-5 max-w-md text-pretty text-sm leading-6 text-[var(--portfolio-ink-muted)] sm:text-base">
                Projects, talks, student tools, event ideas, or a quick hello.
                Email is best.
              </p>
            </div>
          : null}

        <div
          className={`flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${
            showHeader ? "mt-10" : ""
          }`}
        >
          <a
            href={`mailto:${socials.email}`}
            className="group inline-flex max-w-full items-center gap-2 text-[clamp(1.35rem,3.2vw,2.45rem)] font-semibold leading-none tracking-[-0.018em] text-[var(--portfolio-ink)] transition-colors duration-150 hover:text-white"
          >
            <span className="truncate">{socials.email}</span>
            <IconArrowUpRight
              className="h-5 w-5 shrink-0 text-[var(--portfolio-ink-faint)] transition-[color,transform] duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--portfolio-ink)]"
              stroke={1.8}
            />
          </a>

          <button
            type="button"
            onClick={copyEmail}
            className="tap-scale inline-flex h-10 w-max items-center justify-center gap-2 rounded-full bg-white/[0.035] px-3 text-sm text-[var(--portfolio-ink-muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[background-color,color,scale] duration-150 ease-out hover:bg-white/[0.06] hover:text-[var(--portfolio-ink)]"
          >
            <IconCopy className="h-4 w-4" stroke={1.8} />
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
          <p className="text-sm text-[var(--portfolio-ink-faint)]">
            Manila / remote
          </p>
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link tap-scale group inline-flex min-h-10 items-center gap-2 text-sm text-[var(--portfolio-ink-muted)]"
              >
                <Icon className="h-4 w-4" stroke={1.8} />
                {link.label}
              </a>
            );
          })}
        </div>
      </motion.div>
    </motion.section>
  );
}
