"use client";

import Button from "./ui/Button";
import Badge from "./ui/Badge";
import StatPill from "./ui/StatPill";
import { Spotlight } from "./ui/spotlight";
import { Meteors } from "./ui/meteors";
import { FloatingDock } from "./ui/floating-dock";
import Link from "next/link";
import {
  IconFolder,
  IconNotebook,
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconDownload,
  IconCopy,
  IconCheck,
} from "@tabler/icons-react";
import { GlareCard } from "./ui/glare-card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import Typewriter from "typewriter-effect";
import { motion } from "motion/react";
import { socials } from "../config/socials";

export default function Hero() {
  const copyEmail = () => {
    navigator.clipboard.writeText(socials.email);
    toast.success("Email copied to clipboard!");
  };
  return (
    <div className="relative w-full">
      <Toaster position="bottom-center" richColors />
      <div className="relative z-10 flex w-full flex-col items-start">
        <motion.div
          className="mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Badge
            className="bg-linear-to-r from-blue-500/10 to-purple-500/10 ring-blue-500/20 text-2xl"
            aria-label="Intro badge"
          >
            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Open to work!
            </span>
          </Badge>
        </motion.div>

        <div className="relative z-20 flex w-full flex-col gap-8 sm:gap-10">
          <motion.div
            className="flex items-start gap-5 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                Hey, I'm Alexi —
              </h1>
              <div className="mt-3 flex items-baseline">
                <span className="text-2xl font-semibold text-white/80 sm:text-4xl md:text-5xl">
                  a&nbsp;
                </span>
                <div className="text-2xl font-semibold text-white/90 sm:text-4xl md:text-5xl">
                  <Typewriter
                    options={{
                      strings: [
                        "software engineer.",
                        "founder.",
                        "student leader.",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 30,
                      cursor: "|",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-blue-500/30 ring-offset-2 ring-offset-black sm:h-24 sm:w-24">
              <Image
                src="/avatar.webp"
                alt="Alexi avatar"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.p
            className="max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            CS student at Ateneo de Manila University. Software Engineer Intern
            at NextPay (YC W21). Building One Big Match and leading tech
            workshops at MISA.
          </motion.p>

          <motion.div
            className="flex w-full flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/blog"
              aria-label="Read Blog"
              className="hidden sm:block"
            >
              <Button
                variant="primary"
                className="h-14 px-8 text-base bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Read Blog
              </Button>
            </Link>
            <a
              href="/resume.pdf"
              aria-label="Download Resume"
              className="hidden sm:block"
            >
              <Button
                variant="outline"
                className="h-14 px-8 text-base border-blue-500/30 hover:bg-blue-500/10"
              >
                <IconDownload className="mr-2 h-5 w-5" /> Resume
              </Button>
            </a>

            <div className="ml-auto hidden items-center gap-3 border-l border-white/10 pl-8 sm:flex">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#24292e] transition-all hover:scale-105"
                aria-label="GitHub profile"
              >
                <IconBrandGithub className="h-6 w-6 text-white" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#0A66C2] transition-all hover:scale-105"
                aria-label="LinkedIn profile"
              >
                <IconBrandLinkedin className="h-6 w-6 text-white" />
              </a>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-lg bg-linear-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] transition-all hover:scale-105"
                aria-label="Instagram profile"
              >
                <IconBrandInstagram className="h-6 w-6 text-white" />
              </a>
              <button
                onClick={copyEmail}
                className="flex h-14 w-14 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-500 transition-all hover:scale-105"
                aria-label="Copy email address"
              >
                <IconMail className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="flex w-full items-center gap-3 sm:hidden">
              <a href="/resume.pdf" aria-label="Download Resume">
                <Button
                  variant="outline"
                  className="h-12 px-6 border-blue-500/30 hover:bg-blue-500/10"
                >
                  <IconDownload className="mr-2 h-4 w-4" /> Resume
                </Button>
              </a>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#24292e] transition-all hover:scale-105"
                aria-label="GitHub profile"
              >
                <IconBrandGithub className="h-5 w-5 text-white" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0A66C2] transition-all hover:scale-105"
                aria-label="LinkedIn profile"
              >
                <IconBrandLinkedin className="h-5 w-5 text-white" />
              </a>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] transition-all hover:scale-105"
                aria-label="Instagram profile"
              >
                <IconBrandInstagram className="h-5 w-5 text-white" />
              </a>
              <button
                onClick={copyEmail}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-500 transition-all hover:scale-105"
                aria-label="Copy email address"
              >
                <IconMail className="h-5 w-5 text-white" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute -top-24 left-1/2 z-0 h-72 w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(29,78,216,0.15),transparent)] blur-2xl" />
    </div>
  );
}
