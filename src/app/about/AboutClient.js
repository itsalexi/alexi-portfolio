"use client";

import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { socials } from "../../config/socials";
import { usePreloaderReady } from "../../hooks/usePreloaderReady";

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

const lifeImages = [
  "/images/about/image (12).webp",
  "/images/about/image (1).webp",
  "/images/about/image (2).webp",
  "/images/about/image (3).webp",
  "/images/about/image (4).webp",
  "/images/about/image (5).webp",
  "/images/about/image (6).webp",
  "/images/about/image (7).webp",
  "/images/about/image (8).webp",
  "/images/about/image (9).webp",
  "/images/about/image (10).webp",
  "/images/about/image (11).webp",
];

const introFacts = [
  "19 / Manila",
  "CS @ Ateneo",
  "Product engineer @ Bytespace",
];

const story = [
  "I was 7 when I first saw my aunts and uncles working on a Visual Basic project. They had three radio buttons, and clicking one changed a picture on screen. To me, that felt like magic.",
  "My family showed me how to make websites with Wix, so I started making pages about games and toys I liked. Soon after, I made a little web browser called IcyFox. It was basically my Firefox copy, but I made seven versions because each one taught me something.",
  "During the pandemic, The Odin Project helped me understand what I had been copying. I built a calculator, a sketchpad, rock-paper-scissors, and a lot of half-finished things that made the basics stick.",
  "Now I’m at Ateneo studying Computer Science. The work still starts the same way: a messy enlistment week, a grade what-if, a room full of strangers, a receipt nobody wants to split by hand.",
];

const principles = [
  {
    title: "Code for others",
    body: [
      "Ateneo talks a lot about being a person for others. That clicked for me through software. I like when the work is close to someone’s day: a student planning classes, an org checking people in, a team trying to move a little faster.",
      "The QPI Calculator and Enlistment Helper were small tools, but the thank-yous during finals and enlistment week stuck with me.",
    ],
  },
  {
    title: "We can just do things",
    body: [
      "If something should exist, I’d rather try making a rough first version than keep talking about it forever.",
      "A lot of attempts are messy or too early, but starting usually teaches me what the next version should be.",
    ],
  },
];

const bionote = [
  "Alexi Cañamo is a 19-year-old founder and product engineer in Manila, studying Computer Science at Ateneo de Manila University as a DOST Merit Scholar.",
  "He builds software around problems he has seen up close: enlistment, grades, event operations, fintech dashboards, and team workflows.",
  "His work includes Ateneo's QPI Calculator, Enlistment Helper, Hati, and One Big Match, plus projects with Bytespace, NextPay, Sip & Scale, Ateneo MISA, TEDxAteneoDeManila, and StartupQC.",
];

const links = [
  { name: "GitHub", href: socials.github },
  { name: "LinkedIn", href: socials.linkedin },
  { name: "Instagram", href: socials.instagram },
  { name: "Discord", href: socials.discord },
];

function Section({ eyebrow, title, body, children, className = "" }) {
  const isReady = usePreloaderReady();

  return (
    <motion.section
      variants={reveal}
      initial="hidden"
      whileInView={isReady ? "visible" : "hidden"}
      viewport={{ once: true, margin: "-96px" }}
      className={`py-10 sm:py-14 ${className}`}
    >
      <motion.div variants={item} className="mb-8">
        <p className="quiet-label mb-3">{eyebrow}</p>
        <h2 className="max-w-3xl text-balance text-[clamp(2.1rem,4.6vw,4.1rem)] font-semibold leading-[0.9] tracking-[-0.018em] text-[var(--portfolio-ink)]">
          {title}
        </h2>
        {body
          ? <p className="mt-5 max-w-xl text-pretty text-sm leading-6 text-[var(--portfolio-ink-muted)] sm:text-base">
              {body}
            </p>
          : null}
      </motion.div>
      {children}
    </motion.section>
  );
}

function TextLink({ href, children, external = false }) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      {...externalProps}
      className="text-link tap-scale group inline-flex min-h-10 items-center gap-2 text-sm"
    >
      {children}
      <IconArrowUpRight
        className="h-3.5 w-3.5 transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        stroke={1.8}
      />
    </a>
  );
}

function PhotoCarousel() {
  const railRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const carouselImages = [0, 1].flatMap((copy) =>
    lifeImages.map((photo, photoIndex) => ({
      id: `${copy}-${photo}`,
      src: photo,
      altIndex: photoIndex + 1,
      isDuplicate: copy === 1,
    })),
  );

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      const rail = railRef.current;

      if (rail && !prefersReducedMotion && !isPaused && !isDragging) {
        const halfway = rail.scrollWidth / 2;
        rail.scrollLeft += 0.42;

        if (rail.scrollLeft >= halfway) {
          rail.scrollLeft -= halfway;
        }
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [isPaused, isDragging, prefersReducedMotion]);

  const scroll = (direction) => {
    setIsPaused(true);
    railRef.current?.scrollBy({
      left: direction * 340,
      behavior: "smooth",
    });
    window.setTimeout(() => setIsPaused(false), 1200);
  };

  const startDrag = (event) => {
    const rail = railRef.current;
    if (!rail) return;

    rail.setPointerCapture(event.pointerId);
    dragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: rail.scrollLeft,
    };
    setIsDragging(true);
    setIsPaused(true);
  };

  const moveDrag = (event) => {
    const rail = railRef.current;
    if (!rail || !dragRef.current.active) return;

    const delta = event.clientX - dragRef.current.startX;
    rail.scrollLeft = dragRef.current.scrollLeft - delta;
  };

  const stopDrag = () => {
    if (!dragRef.current.active) return;

    dragRef.current.active = false;
    setIsDragging(false);
    window.setTimeout(() => setIsPaused(false), 900);
  };

  return (
    <motion.div variants={item}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="quiet-label">Camera roll</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="tap-scale flex h-10 w-10 items-center justify-center rounded-[12px] bg-white/[0.035] text-[var(--portfolio-ink-muted)] transition-[background-color,color,scale] duration-150 ease-out hover:bg-white/[0.06] hover:text-[var(--portfolio-ink)]"
            aria-label="Scroll photos left"
          >
            <IconArrowLeft className="h-4 w-4" stroke={1.8} />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            className="tap-scale flex h-10 w-10 items-center justify-center rounded-[12px] bg-white/[0.035] text-[var(--portfolio-ink-muted)] transition-[background-color,color,scale] duration-150 ease-out hover:bg-white/[0.06] hover:text-[var(--portfolio-ink)]"
            aria-label="Scroll photos right"
          >
            <IconArrowRight className="h-4 w-4" stroke={1.8} />
          </button>
        </div>
      </div>

      <div className="relative">
        <section
          ref={railRef}
          aria-label="Moving camera roll"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!dragRef.current.active) setIsPaused(false);
          }}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          className={`flex select-none gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {carouselImages.map((photo) => {
            return (
              <figure
                key={photo.id}
                aria-hidden={photo.isDuplicate}
                className="group w-44 shrink-0 sm:w-52"
              >
                <div className="relative h-56 overflow-hidden rounded-[16px] bg-white/[0.035] shadow-[0_0_0_1px_rgba(255,255,255,0.08)] sm:h-64">
                  <Image
                    src={photo.src}
                    alt={
                      photo.isDuplicate
                        ? ""
                        : `Alexi camera roll ${photo.altIndex}`
                    }
                    fill
                    draggable={false}
                    className="object-cover object-center opacity-84 transition-[opacity,scale] duration-300 ease-[var(--ease-out-expo)] group-hover:scale-[1.015] group-hover:opacity-100"
                    sizes="(max-width: 640px) 176px, 208px"
                  />
                </div>
              </figure>
            );
          })}
        </section>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[var(--portfolio-bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--portfolio-bg)] to-transparent" />
      </div>
    </motion.div>
  );
}

export default function AboutClient() {
  const isReady = usePreloaderReady();

  return (
    <main className="mx-auto min-h-screen max-w-[1040px] px-5 pt-24 sm:px-8 sm:pt-28 lg:px-10">
      <motion.section
        variants={reveal}
        initial="hidden"
        animate={isReady ? "visible" : "hidden"}
        className="grid gap-10 py-10 sm:grid-cols-[17rem_1fr] sm:items-center sm:py-14 md:min-h-[calc(66dvh-4rem)] md:grid-cols-[19rem_1fr]"
      >
        <motion.div
          variants={item}
          className="order-2 max-w-[17rem] space-y-4 sm:order-none sm:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-white/[0.035]">
            <Image
              src="/avatar.webp"
              alt="Portrait of Alexi Canamo"
              fill
              priority
              className="object-cover object-center opacity-88 transition-opacity duration-300 ease-[var(--ease-out-expo)] hover:opacity-100"
              sizes="(max-width: 640px) 288px, 360px"
            />
          </div>

          <div className="grid gap-1.5 text-sm leading-5 text-[var(--portfolio-ink-muted)] sm:max-w-[15rem]">
            {introFacts.map((fact) => (
              <p key={fact}>{fact}</p>
            ))}
          </div>
        </motion.div>

        <div className="order-1 sm:order-none">
          <motion.p variants={item} className="quiet-label mb-4">
            About
          </motion.p>
          <motion.h1
            variants={item}
            className="max-w-4xl text-balance text-[clamp(3.25rem,7.2vw,6.4rem)] font-semibold leading-[0.86] tracking-[-0.018em] text-[var(--portfolio-ink)]"
          >
            Hey, I’m Alexi.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-pretty text-[clamp(1.15rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.018em] text-[var(--portfolio-ink)]"
          >
            I’m a 19-year-old founder and product engineer in Manila. Most of my
            work starts from problems I’ve seen up close: student workflows,
            event operations, fintech dashboards, and teams trying to move
            faster.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-5">
            <TextLink href="/projects">See the work</TextLink>
            <TextLink href={`mailto:${socials.email}`}>Send a note</TextLink>
          </motion.div>
        </div>
      </motion.section>

      <Section
        eyebrow="Life"
        title="Coffee, code, cameras, friends."
        body="Small pieces outside the projects."
      >
        <PhotoCarousel />
      </Section>

      <Section
        eyebrow="Origin"
        title="The first hook was a picture changing on screen."
      >
        <motion.div
          variants={reveal}
          className="grid gap-8 md:grid-cols-[1fr_17rem]"
        >
          <div className="grid gap-5">
            {story.map((paragraph) => (
              <motion.p
                key={paragraph}
                variants={item}
                className="text-base leading-7 text-[var(--portfolio-ink-muted)] sm:text-lg sm:leading-8"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            variants={item}
            className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-white/[0.035] md:mt-1"
          >
            <Image
              src="/images/about/baby.webp"
              alt="Alexi as a child"
              fill
              className="object-cover object-center opacity-84"
              sizes="(max-width: 768px) 100vw, 272px"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="quiet-label absolute bottom-4 left-4 text-white/70">
              Where it started
            </p>
          </motion.div>
        </motion.div>
      </Section>

      <Section eyebrow="Why" title="Two ideas I keep coming back to.">
        <motion.div variants={reveal} className="grid gap-8 md:grid-cols-2">
          {principles.map((principle) => (
            <motion.div
              key={principle.title}
              variants={item}
              className="grid gap-4"
            >
              <h3 className="text-2xl font-semibold leading-none tracking-[-0.018em] text-[var(--portfolio-ink)]">
                {principle.title}
              </h3>
              <div className="grid gap-4">
                {principle.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-2xl text-base leading-7 text-[var(--portfolio-ink-muted)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section eyebrow="Bio" title="The short version.">
        <motion.div
          variants={item}
          className="grid gap-7 py-2 md:grid-cols-[1fr_0.7fr]"
        >
          <div className="grid gap-4">
            {bionote.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-2xl text-base leading-7 text-[var(--portfolio-ink-muted)]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-5 md:items-end md:justify-between md:text-right">
            <TextLink href={`mailto:${socials.email}`}>Send a note</TextLink>
            <nav
              aria-label="Social links"
              className="flex flex-wrap gap-x-4 gap-y-1 md:justify-end"
            >
              {links.map((link) => (
                <TextLink key={link.name} href={link.href} external>
                  {link.name}
                </TextLink>
              ))}
            </nav>
          </div>
        </motion.div>
      </Section>
    </main>
  );
}
