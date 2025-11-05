"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { techStack as techStackConfig } from "../lib/tech-stack";
import { CardContainer, CardBody } from "./ui/3d-card";
import { GlowingEffect } from "./ui/glowing-effect";

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
    <CardContainer containerClassName="py-0">
      <CardBody className="w-full h-full">
        <Link href={link} className="h-full block">
          <motion.div
            className="group relative rounded-xl h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlowingEffect
              disabled={false}
              proximity={80}
              spread={50}
              borderWidth={2}
              glow={true}
              inactiveZone={0.01}
            />
            <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
              {/* Project Image */}
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex-shrink-0">
                {image ? (
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
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
              <div className="flex flex-1 flex-col p-6">
                {/* Title */}
                <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
                  {title}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-white/70 flex-grow">
                  {description}
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

              {/* Hover Effect Overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:from-blue-500/5 group-hover:to-purple-500/5 group-hover:opacity-100" />
            </div>
          </motion.div>
        </Link>
      </CardBody>
    </CardContainer>
  );
}
