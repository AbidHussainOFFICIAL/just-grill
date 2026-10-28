"use client";

import clsx from "clsx";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { heroSlides } from "@/data/hero";
import { useHeroSlider } from "@/hooks/useHeroSlider";

// Diamond-shaped arrow buttons, shown from 768px up.
const sliderButton =
  "absolute top-1/2 z-1 hidden size-45 -translate-y-1/2 rotate-45 place-items-center border border-gold text-[2.4rem] text-gold trans-fast hover:bg-gold hover:text-black focus-visible:bg-gold focus-visible:text-black md:grid [&_svg]:-rotate-45";

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
      className="relative z-1 min-h-screen overflow-hidden py-120 text-center xl:h-[880px]"
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
                "absolute top-1/2 left-1/2 z-1 grid size-full -translate-x-1/2 -translate-y-1/2 place-content-center pt-100 trans-slow",
                isActive ? "visible opacity-100" : "invisible opacity-0",
              )}
            >
              <div
                className={clsx(
                  "pointer-events-none absolute inset-0 -z-1 size-full [transform:scale(1.15)] select-none",
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
                  "section-subtitle text-label-2 after:mt-14 after:mb-20",
                  reveal,
                  isActive && "animate-reveal-1",
                )}
              >
                {slide.subtitle}
              </p>

              <Heading
                className={clsx(
                  "font-forum text-display-1",
                  reveal,
                  isActive && "animate-reveal-2",
                )}
              >
                {slide.titleLines[0]} <br />
                {slide.titleLines[1]}
              </Heading>

              <p
                className={clsx(
                  "mt-10 mb-40 text-body-2 sm:text-[2rem]",
                  reveal,
                  isActive && "animate-reveal-3",
                )}
              >
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
        className={clsx(sliderButton, "left-30")}
        aria-label="slide to previous"
        onClick={prev}
        {...sliderButtonProps}
      >
        <Icon name="chevron-back" />
      </button>

      <button
        type="button"
        className={clsx(sliderButton, "right-30")}
        aria-label="slide to next"
        onClick={next}
        {...sliderButtonProps}
      >
        <Icon name="chevron-forward" />
      </button>

      <a
        href="#reservation"
        className="absolute right-15 bottom-15 z-2 size-110 scale-[0.6] bg-gold p-12 after:absolute after:inset-0 after:animate-spin-15 after:border after:border-gold sm:scale-[0.7] xl:right-50 xl:bottom-50 xl:scale-100"
      >
        <Image
          src="/images/hero-icon.png"
          width={48}
          height={48}
          alt="booking icon"
          className="mx-auto mb-6"
        />
        <span className="block text-center text-label-2 leading-[1.5em] font-bold tracking-s text-black uppercase">
          Book A Table
        </span>
      </a>
    </section>
  );
}
