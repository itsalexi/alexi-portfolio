export default function Badge({
  variant = "default",
  className = "",
  children,
}) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1";
  const variants = {
    default: "bg-white/10 text-white ring-white/10",
    outline: "bg-transparent text-white ring-white/20",
    skeleton: "bg-white/5 text-transparent ring-white/10 animate-pulse",
  };
  const classes = `${base} ${
    variants[variant] || variants.default
  } ${className}`.trim();
  return <span className={classes}>{children}</span>;
}
