"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CarouselControl = ({ title, handleClick, children }) => {
  return (
    <button
      type="button"
      className="tap-scale flex h-9 w-9 items-center justify-center rounded-[10px] bg-black/35 text-white/72 shadow-[0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur-md transition-[background-color,color,scale] duration-150 ease-out hover:bg-white/[0.14] hover:text-white"
      title={title}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

/**
 * Track width = n × parent width; each slide = 1/n of track;
 * translate by (100/n)% of track per index so exactly one slide fits the viewport.
 */
export default function Carousel({ slides, fit = "cover", className = "" }) {
  const [current, setCurrent] = useState(0);
  const n = slides?.length || 0;

  const slidesKey = slides.map((s) => s.src).join("|");

  useEffect(() => {
    if (slidesKey.length === 0) {
      setCurrent(0);
      return;
    }
    setCurrent(0);
  }, [slidesKey]);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? n - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === n ? 0 : next);
  };

  if (!n) return null;

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[18px] bg-white/[0.025] shadow-[var(--shadow-border)]",
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <div
          className="flex h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)]"
          style={{
            width: `${n * 100}%`,
            transform: `translateX(-${(current * 100) / n}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={`${slide.src}-${index}`}
              className="relative h-full shrink-0 overflow-hidden bg-white/[0.025]"
              style={{ width: `${100 / n}%` }}
            >
              <img
                src={slide.src}
                alt={slide.title}
                className="h-full w-full object-center"
                style={{ objectFit: fit }}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/70 via-black/18 to-transparent px-4 pb-4 pt-16">
          <figcaption className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/64">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(n).padStart(2, "0")}
          </figcaption>

          {n > 1 ? (
            <div className="pointer-events-auto flex items-center gap-3">
              <div className="hidden items-center gap-1.5 sm:flex">
                {slides.map((slide, index) => (
                  <button
                    key={`${slide.src}-dot`}
                    type="button"
                    aria-label={`Show slide ${index + 1}`}
                    aria-current={index === current}
                    onClick={() => setCurrent(index)}
                    className={cn(
                      "tap-scale h-1.5 rounded-full transition-[background-color,width,scale] duration-200 ease-[var(--ease-out-expo)]",
                      index === current
                        ? "w-6 bg-white/78"
                        : "w-1.5 bg-white/32 hover:bg-white/56",
                    )}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <CarouselControl
                  title="Go to previous slide"
                  handleClick={handlePreviousClick}
                >
                  <IconArrowLeft className="h-4 w-4" stroke={1.8} />
                </CarouselControl>
                <CarouselControl
                  title="Go to next slide"
                  handleClick={handleNextClick}
                >
                  <IconArrowRight className="h-4 w-4" stroke={1.8} />
                </CarouselControl>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </figure>
  );
}
