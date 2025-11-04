"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";

export default function TalkModal({ isOpen, onClose, title, event, date, description, topics, images }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-neutral-900 border border-white/10 rounded-xl overflow-hidden pointer-events-auto"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="overflow-y-auto max-h-[85vh] p-6 md:p-8">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {title}
                  </h2>
                  <p className="text-white/60 text-sm md:text-base">
                    {event} • {date}
                  </p>
                </div>

                {/* Topics */}
                {topics && topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {topics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description */}
                <div className="mb-6">
                  <p className="text-white/80 text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                </div>

                {/* Images */}
                {images && images.length > 0 && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {images.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden border border-white/10">
                        <img
                          src={image}
                          alt={`${title} screenshot ${index + 1}`}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
