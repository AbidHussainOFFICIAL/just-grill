"use client";

import clsx from "clsx";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { heroSlides } from "@/data/hero";
import { useHeroSlider } from "@/hooks/useHeroSlider";

// Diamond-shaped arrow buttons (44 x 44 touch target), shown from 768px up.
const sliderButton =
  "absolute top-1/2 z-raised hidden size-11 -translate-y-1/2 rotate-45 place-items-center border border-gold-400 text-gold-400 trans-fast hover:bg-gold-400 hover:text-surface-0 focus-visible:bg-gold-400 focus-visible:text-surface-0 md:grid [&_svg]:-rotate-45";

// The reveal animations use the `transform` property on purpose (not `translate-*`)
// so the animation's end state replaces the starting offset instead of adding to it.
const reveal = "opacity-0 [transform:translateY(30px)]";

export function Hero() {
  const { current, next, prev, pause, resume } = useHeroSlider(heroSlides.length);

  const sliderButtonProps = {
    onMouseEnter: pause,
    onMouseLeave: resume,
    onFocus: pause,
    onBlur: resume,
  };

  return (
    <section
      className="relative z-raised min-h-screen overflow-hidden py-hero text-center xl:h-220"
      aria-label="home"
      id="home"
    >
      <ul>
        {heroSlides.map((slide, index) => {
          const isActive = index === current;
          const Heading = index === 0 ? "h1" : "h2";

          return (
            <li
              key={slide.id}
              className={clsx(
                "absolute top-1/2 left-1/2 z-raised grid size-full -translate-x-1/2 -translate-y-1/2 place-content-center pt-24 trans-slow",
                isActive ? "visible opacity-100" : "invisible opacity-0",
              )}
            >
              <div
                className={clsx(
                  "pointer-events-none absolute inset-0 z-behind size-full [transform:scale(1.15)] select-none",
                  isActive && "animate-smooth-scale",
                )}
              >
                <Image
                  src={slide.image}
                  width={1880}
                  height={950}
                  alt=""
                  sizes="100vw"
                  className="size-full object-cover"
                  priority={index === 0}
                  loading={index === 0 ? undefined : "eager"}
                />
              </div>

              <p
                className={clsx(
                  "section-subtitle after:mt-3 after:mb-5",
                  reveal,
                  isActive && "animate-reveal-1",
                )}
              >
                {slide.subtitle}
              </p>

              <Heading className={clsx("t-display", reveal, isActive && "animate-reveal-2")}>
                {slide.titleLines[0]} <br />
                {slide.titleLines[1]}
              </Heading>

              <p className={clsx("mt-3 mb-10 t-lead", reveal, isActive && "animate-reveal-3")}>
                {slide.text}
              </p>

              <Button
                href="#menu"
                className={clsx("mx-auto", reveal, isActive && "animate-reveal-4")}
              >
                View Our Menu
              </Button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        className={clsx(sliderButton, "left-8")}
        aria-label="slide to previous"
        onClick={prev}
        {...sliderButtonProps}
      >
        <Icon name="chevron-left" size={24} />
      </button>

      <button
        type="button"
        className={clsx(sliderButton, "right-8")}
        aria-label="slide to next"
        onClick={next}
        {...sliderButtonProps}
      >
        <Icon name="chevron-right" size={24} />
      </button>

      <a
        href="#reservation"
        className="absolute right-4 bottom-4 z-raised size-28 scale-[0.6] bg-gold-400 p-3 after:absolute after:inset-0 after:animate-spin-15 after:border after:border-gold-400 sm:scale-[0.7] xl:right-12 xl:bottom-12 xl:scale-100"
      >
        <Image
          src="/images/hero-icon.png"
          width={48}
          height={48}
          alt="booking icon"
          className="mx-auto mb-2"
        />
        <span className="block text-center t-label text-surface-0">Book A Table</span>
      </a>
    </section>
  );
}
