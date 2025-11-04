"use client";

import { use } from "react";
import { motion } from "motion/react";
import talksData from "../../../data/talks.json";
import Carousel from "../../../components/ui/carousel";
import FloatingBackButton from "../../../components/FloatingBackButton";

export default function TalkDetailPage({ params }) {
  const { slug } = use(params);
  const talk = talksData.talks.find(t => t.slug === slug);

  if (!talk) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Talk not found</p>
      </div>
    );
  }

  const slideData = talk.images?.map((image, index) => ({
    title: `Photo ${index + 1}`,
    src: image,
  })) || [];

  return (
    <div className="min-h-screen bg-black">
      <FloatingBackButton />
      
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Carousel */}
        {slideData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative w-full mb-12 overflow-x-hidden"
          >
            <Carousel slides={slideData} />
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            {talk.title}
          </h1>
          <p className="text-white/60 text-sm md:text-base">
            {talk.event} • {talk.date}
          </p>
        </motion.div>

        {/* Topics */}
        {talk.topics && talk.topics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {talk.topics.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
              >
                {topic}
              </span>
            ))}
          </motion.div>
        )}

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <p className="text-white/70 text-sm md:text-base leading-relaxed whitespace-pre-line">
            {talk.fullDescription}
          </p>
        </motion.div>


        {/* Link Button */}
        {talk.link && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href={talk.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold text-sm transition-all hover:scale-105"
            >
              {talk.link.label}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
