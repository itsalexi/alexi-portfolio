"use client";

export function SvgLoader({ className, size = 64 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-label="Loading"
      role="img"
      color="var(--portfolio-ink)"
    >
      <path
        className="loader-path"
        pathLength="100"
        d="M 15 65 C 15 75, 25 80, 30 70 C 35 50, 48 18, 50 18 C 52 18, 65 50, 70 70 C 72 85, 88 85, 85 70 C 83 60, 75 60, 65 60 C 50 60, 30 58, 15 55"
      />
    </svg>
  );
}
