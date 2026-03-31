"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconArrowRight,
  IconTrophy,
} from "@tabler/icons-react";
import { GlowingEffect } from "./ui/glowing-effect";

function cleanSrc(url) {
  if (!url || typeof url !== "string") return "";
  return url.split("?")[0];
}

export default function HackathonCard({
  slug,
  name,
  date,
  event,
  result,
  organizer,
  details,
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

  const [idx, setIdx] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setIdx(0);
    setImageFailed(false);
  }, [gallery.join("|")]);

  const hasGallery = gallery.length > 0;
  const hasImage = hasGallery && !imageFailed;
  const currentSrc = gallery[idx] || "";
  const showControls = gallery.length > 1;

  const goPrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => (i - 1 + gallery.length) % gallery.length);
  };

  const goNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => (i + 1) % gallery.length);
  };

  const altForSlide = (i) =>
    gallery.length > 1
      ? `${imageAlt || name || "Hackathon"} — photo ${i + 1}`
      : imageAlt || `${name || "Hackathon"} — ${event || ""}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true, margin: "-40px" }}
      className="group relative rounded-xl"
    >
      <GlowingEffect
        disabled={false}
        proximity={80}
        spread={50}
        borderWidth={2}
        glow={true}
        inactiveZone={0.01}
      />
      <div className="relative z-10 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]">
        <div className="grid gap-0 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-stretch">
          <div className="relative aspect-[4/3] w-full bg-white/[0.04] md:aspect-auto md:min-h-[220px]">
            {hasImage ? (
              <div className="relative h-full min-h-[200px] w-full">
                <Image
                  key={`${slug || name || "card"}-${idx}-${currentSrc}`}
                  src={currentSrc}
                  alt={altForSlide(idx)}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx === 0}
                  unoptimized={currentSrc.startsWith("/images/hackathons/")}
                  onError={() => setImageFailed(true)}
                />

                {showControls && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                      aria-label="Previous photo"
                    >
                      <IconChevronLeft className="h-5 w-5" stroke={2} />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                      aria-label="Next photo"
                    >
                      <IconChevronRight className="h-5 w-5" stroke={2} />
                    </button>
                    <div
                      className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5 px-4"
                      role="tablist"
                      aria-label="Photo selection"
                    >
                      {gallery.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          role="tab"
                          aria-selected={i === idx}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIdx(i);
                          }}
                          className={`h-1.5 rounded-full transition-all ${
                            i === idx
                              ? "w-6 bg-white"
                              : "w-1.5 bg-white/40 hover:bg-white/60"
                          }`}
                          aria-label={`Show photo ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 p-8 text-white/35">
                <IconTrophy className="h-14 w-14" stroke={1.25} />
                <p className="text-center text-xs font-medium uppercase tracking-wider">
                  {imageFailed ? "Photo failed to load" : "Add photo"}
                  <br />
                  <span className="text-white/25 normal-case tracking-normal">
                    {currentSrc ||
                      (gallery.length
                        ? "Check image paths"
                        : "Add `images` in hackathon markdown frontmatter")}
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center p-5 md:p-6">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-400">
                Hackathon
              </span>
              <span className="text-white/40 text-xs">{date}</span>
            </div>
            <h3 className="text-lg font-bold tracking-tight text-white md:text-xl">
              {name}
            </h3>
            <p className="mt-1.5 text-sm leading-snug text-white/55 text-pretty">
              {event}
            </p>
            <div className="mt-3 space-y-0.5">
              <p className="text-sm font-semibold text-blue-400">{result}</p>
              {organizer ? (
                <p className="text-xs text-white/45">{organizer}</p>
              ) : null}
            </div>
            {details?.length > 0 && (
              <ul className="mt-4 space-y-2.5 border-t border-white/[0.08] pt-4">
                {details.map((line, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-xs leading-relaxed text-white/65 md:text-sm"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-400/50" />
                    <span className="text-pretty">{line}</span>
                  </li>
                ))}
              </ul>
            )}
            {href ? (
              <Link
                href={href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                View write-up
                <IconArrowRight className="h-4 w-4" stroke={2} />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
