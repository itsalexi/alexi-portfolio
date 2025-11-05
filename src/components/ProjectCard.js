"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { techStack as techStackConfig } from "../lib/tech-stack";
import { normalizeEllipsis } from "../lib/text";

export default function ProjectCard({
  title,
  description,
  image,
  techStack,
  link,
}) {
  // Convert string keys to tech objects
  const techItems =
    techStack
      ?.map((key) => (typeof key === "string" ? techStackConfig[key] : key))
      .filter(Boolean) || [];
  return (
    <Link href={link} className="h-full block">
      <motion.div
        className="group relative h-full rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all overflow-hidden flex flex-col"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Project Image */}
        <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex-shrink-0">
          {image ? (
            <Image
              key={image}
              src={image.split("?")[0]}
              alt={title}
              fill
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-4xl font-bold text-white/20">
                {title[0]}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Title */}
          <h3
            className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3 overflow-hidden text-ellipsis break-words flex-grow"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {normalizeEllipsis(description)}
          </p>

          {/* Tech Stack */}
          {techItems && techItems.length > 0 && (
            <div className="mt-auto flex flex-wrap items-center gap-2">
              {techItems.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10"
                >
                  {tech.icon && (
                    <div className="relative h-4 w-4">
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span className="text-xs font-medium text-white/80">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
