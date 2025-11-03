export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-black";
  const variants = {
    primary: "bg-white text-black hover:bg-zinc-200 ring-white/20",
    outline: "border border-white/15 text-white hover:bg-white/5",
    ghost: "text-white/80 hover:text-white hover:bg-white/5",
    skeleton: "bg-white/5 text-transparent pointer-events-none animate-pulse",
  };
  const classes = `${base} ${
    variants[variant] || variants.primary
  } ${className}`.trim();
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
