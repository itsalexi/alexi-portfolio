"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { normalizeEllipsis } from "../lib/text";

export default function BlogCard({
  slug,
  title,
  date,
  excerpt,
  tags,
  image,
  author,
  readTime,
}) {
  return (
    <Link href={`/blog/${slug}`} className="h-full block">
      <motion.article
        className="group relative h-full rounded-xl bg-white/3 border border-white/8 hover:border-white/20 hover:bg-white/6 transition-all overflow-hidden flex flex-col"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Featured Image */}
        {image && (
          <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-white/60 mb-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{date}</span>
            </div>
            {readTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{readTime}</span>
              </div>
            )}
          </div>

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

          {/* Excerpt */}
          {excerpt && (
            <p
              className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3 overflow-hidden text-ellipsis flex-grow"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {normalizeEllipsis(excerpt)}
            </p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Author */}
          {author && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">By {author}</p>
            </div>
          )}
        </div>
      </motion.article>
    </Link>
  );
}
