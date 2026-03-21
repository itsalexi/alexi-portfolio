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
    >
      <defs>
        <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path
        className="loader-path"
        pathLength="100"
        d="M 15 65 C 15 75, 25 80, 30 70 C 35 50, 48 18, 50 18 C 52 18, 65 50, 70 70 C 72 85, 88 85, 85 70 C 83 60, 75 60, 65 60 C 50 60, 30 58, 15 55"
      />
    </svg>
  );
}
