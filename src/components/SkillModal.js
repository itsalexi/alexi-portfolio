"use client";

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export default function SkillModal({ isOpen, onClose, skill }) {
  if (!skill) return null;

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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>

              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br mb-6" style={{
                backgroundImage: skill.gradient
              }}>
                {skill.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {skill.title}
              </h3>

              {/* Short description */}
              <p className="text-white/60 text-sm mb-6">
                {skill.description}
              </p>

              {/* Detailed content */}
              <div className="space-y-6">
                {skill.details.map((section, idx) => (
                  <div key={idx}>
                    <h4 className="text-white font-semibold mb-3">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-white/70 text-sm flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
