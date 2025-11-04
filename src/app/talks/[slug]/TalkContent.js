"use client";

import ReactMarkdown from "react-markdown";
import FloatingBackButton from "../../../components/FloatingBackButton";
import Carousel from "../../../components/ui/carousel";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TalkContent({ talk }) {
  const slideData =
    talk.images?.map((image, index) => ({
      title: `Photo ${index + 1}`,
      src: image,
    })) || [];

  return (
    <div className="min-h-screen bg-transparent">
      <FloatingBackButton />

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 pt-24">
        <Link
          href="/talks"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-6 pb-12">
        {/* Carousel */}
        {slideData.length > 0 && (
          <div className="relative w-full mb-12 overflow-hidden min-h-[60vmin]">
            <Carousel slides={slideData} />
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            {talk.title}
          </h1>
          <p className="text-white/60 text-sm md:text-base">
            {talk.event} • {talk.date}
          </p>
        </div>

        {/* Topics */}
        {talk.topics && talk.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {talk.topics.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Short Description */}
        {talk.shortDescription && (
          <div className="mb-8">
            <p className="text-white/80 text-lg leading-relaxed">
              {talk.shortDescription}
            </p>
          </div>
        )}

        {/* Full Description (Markdown) */}
        <article className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:pb-2 prose-h2:border-b prose-h2:border-white/10 prose-p:text-white/80 prose-p:leading-relaxed prose-p:text-base prose-ul:space-y-3 prose-li:text-white/80 prose-li:text-base prose-strong:text-white prose-strong:font-semibold prose-code:text-blue-400 prose-code:bg-blue-500/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl mb-12">
          <ReactMarkdown
            components={{
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl font-bold text-white mb-6 mt-12 pb-2 border-b border-white/10"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-white/80 leading-relaxed text-base mb-4"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="space-y-3 mb-6" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li
                  className="text-white/80 text-base flex items-start gap-2"
                  {...props}
                >
                  <span className="text-blue-400 mt-1">•</span>
                  <span>{props.children}</span>
                </li>
              ),
              strong: ({ node, ...props }) => (
                <strong className="text-white font-semibold" {...props} />
              ),
            }}
          >
            {talk.fullDescription}
          </ReactMarkdown>
        </article>

        {/* Link Button */}
        {talk.link && (
          <div>
            <a
              href={talk.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold text-sm transition-all hover:scale-105"
            >
              View Details
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
