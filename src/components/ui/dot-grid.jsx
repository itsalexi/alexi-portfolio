"use client";

export const DotGrid = ({
  className = "",
  dotColor = "rgba(255, 255, 255, 0.08)",
  dotSize = 1,
  spacing = 30,
}) => {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        backgroundPosition: "0 0",
      }}
      aria-hidden="true"
    />
  );
};
