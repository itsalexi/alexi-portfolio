"use client";

import { IconArrowUpRight, IconCopy } from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { socials } from "../config/socials";
import { usePreloaderReady } from "../hooks/usePreloaderReady";

const heroLinks = [
  { label: "Work", href: "/projects" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: socials.resume, external: true },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function MagneticLink({ link }) {
  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className="tap-scale group inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[var(--portfolio-ink-muted)] transition-[color,scale] duration-150 ease-out hover:text-[var(--portfolio-ink)]"
    >
      {link.label}
      <IconArrowUpRight
        className="h-3.5 w-3.5 transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        stroke={1.8}
      />
    </a>
  );
}

export default function Hero() {
  const isReady = usePreloaderReady();

  const copyEmail = async () => {
    await navigator.clipboard.writeText(socials.email);
    toast.success("Email copied");
  };

  return (
    <>
      <Toaster position="bottom-center" richColors={false} />

      <motion.div
        variants={container}
        initial="hidden"
        animate={isReady ? "visible" : "hidden"}
        className="relative flex min-h-[calc(58dvh-4rem)] w-full flex-col justify-center py-12 sm:py-16"
      >
        <motion.div variants={item} className="mb-10 flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-white/[0.035]">
            <Image
              src="/avatar.webp"
              alt="Portrait of Alexi Canamo"
              fill
              priority
              className="object-cover object-center opacity-88"
              sizes="80px"
            />
          </div>
          <div>
            <p className="quiet-label mb-2">Alexi Canamo</p>
            <p className="text-sm text-[var(--portfolio-ink-muted)]">
              Manila / Ateneo / Bytespace
            </p>
          </div>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-[clamp(2.65rem,6vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.018em] text-[var(--portfolio-ink)]"
        >
          Hi, I’m Alexi.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-[clamp(1.25rem,2.15vw,1.8rem)] font-medium leading-[1.2] tracking-[-0.018em] text-[var(--portfolio-ink)]"
        >
          I’m a 19-year-old founder and product engineer in Manila, currently at
          Bytespace. I build tools that students, startups, and communities
          actually use.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          {heroLinks.map((link) => (
            <MagneticLink key={link.label} link={link} />
          ))}
          <button
            type="button"
            onClick={copyEmail}
            className="tap-scale group inline-flex min-h-10 items-center gap-2 text-sm text-[var(--portfolio-ink-muted)] transition-[color,scale] duration-150 ease-out hover:text-[var(--portfolio-ink)]"
          >
            <IconCopy className="h-4 w-4" stroke={1.8} />
            Copy email
          </button>
        </motion.div>
      </motion.div>
    </>
  );
}
