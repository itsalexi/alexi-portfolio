export default function StatPill({
  className = "",
  children,
  skeleton = false,
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-3 h-8 text-sm ring-1";
  const style = skeleton
    ? "bg-white/5 text-transparent ring-white/10 animate-pulse"
    : "bg-white/5 text-white ring-white/10";
  const classes = `${base} ${style} ${className}`.trim();
  return <span className={classes}>{children}</span>;
}
