"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useId, useEffect } from "react";

const CarouselControl = ({ type, title, handleClick }) => {
  return (
    <button
      type="button"
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

/**
 * Track width = n × parent width; each slide = 1/n of track;
 * translate by (100/n)% of track per index so exactly one slide fits the viewport.
 */
export default function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const id = useId();
  const n = slides?.length || 0;

  const slidesKey = slides.map((s) => s.src).join("|");

  useEffect(() => {
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

  const slidePct = 100 / n;

  return (
    <>
      <div
        className="relative mx-auto w-full max-w-[90vw] overflow-hidden md:max-w-5xl min-h-[50vmin] md:min-h-[55vmin]"
        aria-labelledby={`carousel-heading-${id}`}
      >
        <div
          className="flex h-[50vmin] w-full transition-transform duration-1000 ease-in-out md:h-[55vmin]"
          style={{
            width: `${n * 100}%`,
            transform: `translateX(-${current * slidePct}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={`${slide.src}-${index}`}
              role="button"
              tabIndex={0}
              onClick={() => index !== current && setCurrent(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  index !== current && setCurrent(index);
              }}
              className="h-full shrink-0 cursor-pointer overflow-hidden rounded-[1%] bg-[#1D1F2F] px-[3vmin] box-border outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
              style={{ width: `${slidePct}%` }}
            >
              <img
                src={slide.src}
                alt={slide.title}
                className="h-full w-full rounded-[1%] object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center w-full mt-6 relative z-50">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />
        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </>
  );
}
