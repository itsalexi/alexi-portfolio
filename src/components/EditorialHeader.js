export default function EditorialHeader({
  eyebrow,
  title,
  body,
  meta = [],
  className = "",
}) {
  const visibleMeta = meta.filter(Boolean);

  return (
    <header className={`mb-9 py-10 sm:py-14 ${className}`}>
      <p className="quiet-label mb-5">{eyebrow}</p>
      <h1 className="max-w-4xl text-balance text-[clamp(3.2rem,8vw,7rem)] font-semibold leading-[0.86] tracking-[-0.018em] text-[var(--portfolio-ink)]">
        {title}
      </h1>
      {body
        ? <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-[var(--portfolio-ink-muted)] sm:text-lg sm:leading-8">
            {body}
          </p>
        : null}
      {visibleMeta.length
        ? <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
            {visibleMeta.map((item) => (
              <span
                key={item}
                className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--portfolio-ink-faint)]"
              >
                {item}
              </span>
            ))}
          </div>
        : null}
    </header>
  );
}
