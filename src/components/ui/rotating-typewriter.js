"use client";
import React from "react";

export default function RotatingTypewriter({
  words = [],
  typingSpeedMs = 60,
  deletingSpeedMs = 40,
  pauseMs = 900,
  className = "",
  cursorClassName = "bg-white",
}) {
  const [index, setIndex] = React.useState(0);
  const [display, setDisplay] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    if (words.length === 0) return;
    const full = words[index % words.length];

    if (!isDeleting) {
      if (display.length < full.length) {
        const id = setTimeout(
          () => setDisplay(full.slice(0, display.length + 1)),
          typingSpeedMs
        );
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(id);
    }

    if (display.length > 0) {
      const id = setTimeout(
        () => setDisplay(full.slice(0, display.length - 1)),
        deletingSpeedMs
      );
      return () => clearTimeout(id);
    }
    setIsDeleting(false);
    setIndex((i) => (i + 1) % words.length);
  }, [
    display,
    isDeleting,
    index,
    words,
    typingSpeedMs,
    deletingSpeedMs,
    pauseMs,
  ]);

  return (
    <span className={className}>
      {display}
      <span
        className={`inline-block w-[3px] h-[1em] align-[-0.15em] ${cursorClassName} animate-pulse`}
      />
    </span>
  );
}
