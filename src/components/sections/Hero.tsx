"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRef, type CSSProperties, type PointerEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { heroSlides } from "@/data/hero";
import { HERO_INTERVAL_MS, useHeroSlider } from "@/hooks/useHeroSlider";

// Diamond-shaped arrow buttons (44 x 44 touch target), shown from 768px up.
const sliderButton =
  "absolute top-1/2 z-raised hidden size-11 -translate-y-1/2 rotate-45 place-items-center border border-gold-400 text-gold-400 trans-fast hover:bg-gold-400 hover:text-surface-0 focus-visible:bg-gold-400 focus-visible:text-surface-0 md:grid [&_svg]:-rotate-45";

// The reveal animations use the `transform` property on purpose (not `translate-*`)
// so the animation's end state replaces the starting offset instead of adding to it.
const reveal = "opacity-0 [transform:translateY(20px)]";

// How far a finger must travel sideways to change the slide.
const SWIPE_DISTANCE = 50;

const durationStyle: CSSProperties = { animationDuration: `${HERO_INTERVAL_MS}ms` };

export function Hero() {
  const slider = useHeroSlider(heroSlides.length);
  const { current, hasAdvanced, canAutoplay, isRunning, userPaused } = slider;
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const total = heroSlides.length;

  // Pointer over the controls pauses autoplay; keyboard focus anywhere in the hero does too.
  const hoverPause = {
    onMouseEnter: () => slider.setHoverPaused(true),
    onMouseLeave: () => slider.setHoverPaused(false),
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") swipeStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    if (Math.abs(dx) >= SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) slider.next();
      else slider.prev();
    }
  };

  return (
    <section
      className="relative z-raised min-h-[max(100svh,56rem)] overflow-hidden py-hero text-center"
      aria-roledescription="carousel"
      aria-label="Featured dishes"
      id="home"
      // The first slide waits for the preloader to lift; later slides reveal at once.
      style={{ "--hero-delay": hasAdvanced ? "0ms" : "700ms" } as CSSProperties}
      onFocus={(event) => {
        if (event.target.matches(":focus-visible")) slider.setFocusPaused(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) slider.setFocusPaused(false);
      }}
    >
      <div
        aria-live={isRunning ? "off" : "polite"}
        className="absolute inset-0 touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
      >
        {heroSlides.map((slide, index) => {
          const isActive = index === current;
          const Heading = index === 0 ? "h1" : "h2";

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${total}`}
              className={clsx(
                "absolute top-1/2 left-1/2 z-raised grid size-full -translate-x-1/2 -translate-y-1/2 place-content-center pt-24 pb-28 trans-slow sm:pt-36 sm:pb-20",
                isActive ? "visible opacity-100" : "invisible opacity-0",
              )}
            >
              {/* Slow zoom over the slide's time; it pauses with the slider. */}
              <div
                style={isActive ? durationStyle : undefined}
                className={clsx(
                  "pointer-events-none absolute inset-0 z-behind size-full [transform:scale(1.08)] select-none",
                  isActive && "animate-smooth-scale",
                  isActive && !isRunning && "[animation-play-state:paused]",
                )}
              >
                {/* Only the first photo is high priority; the others load after it. */}
                <Image
                  src={slide.image}
                  width={1880}
                  height={950}
                  alt=""
                  sizes="100vw"
                  className="size-full object-cover"
                  priority={index === 0}
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
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className={clsx(sliderButton, "left-8")}
        aria-label="Previous slide"
        onClick={slider.prev}
        {...hoverPause}
      >
        <Icon name="chevron-left" size={24} />
      </button>

      <button
        type="button"
        className={clsx(sliderButton, "right-8")}
        aria-label="Next slide"
        onClick={slider.next}
        {...hoverPause}
      >
        <Icon name="chevron-right" size={24} />
      </button>

      {/* Bottom row: the pause button and one progress line per slide (left on phones, centred
          from 575px). The Book A Table badge sits to the right of it. */}
      <div className="absolute inset-x-0 bottom-0 z-raised px-4 pb-6 text-left sm:px-8 sm:pb-8 xl:px-12 xl:pb-12">
        <div className="flex items-center justify-start sm:justify-center" {...hoverPause}>
          {canAutoplay && (
            <button
              type="button"
              onClick={slider.toggleAutoplay}
              aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
              className="grid size-11 place-items-center text-fg-body trans-fast hover:text-gold-400 focus-visible:text-gold-400"
            >
              <Icon name={userPaused ? "play" : "pause"} size={16} />
            </button>
          )}

          <div role="group" aria-label="Choose a slide" className="flex">
            {heroSlides.map((slide, index) => {
              const state = index === current ? "active" : index < current ? "done" : "todo";

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => slider.goTo(index)}
                  aria-label={`Show slide ${index + 1} of ${total}`}
                  aria-current={state === "active" ? "true" : undefined}
                  className="grid h-11 w-10 items-center"
                >
                  <span className="relative mx-1 block h-0.5 overflow-hidden bg-fg-strong/30">
                    <span
                      style={state === "active" && canAutoplay ? durationStyle : undefined}
                      onAnimationEnd={state === "active" ? slider.onProgressEnd : undefined}
                      className={clsx(
                        "absolute inset-0 origin-left bg-gold-400",
                        state === "todo" && "[transform:scaleX(0)]",
                        state === "done" && "[transform:scaleX(1)]",
                        state === "active" &&
                          (canAutoplay
                            ? clsx(
                                "animate-hero-progress",
                                !isRunning && "[animation-play-state:paused]",
                              )
                            : "[transform:scaleX(1)]"),
                      )}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Book a table: a quiet 80px square on phones (no spinning outline, smaller label), the full
          112px badge with its turning outline from 575px. */}
      <a
        href="#reservation"
        className="absolute right-4 bottom-6 z-raised grid size-20 place-content-center justify-items-center gap-1 bg-gold-400 p-2 text-surface-0 trans-fast after:pointer-events-none after:absolute after:inset-0 after:hidden after:animate-spin-15 after:border after:border-gold-400 hover:bg-gold-300 focus-visible:bg-gold-300 sm:right-8 sm:bottom-8 sm:size-28 sm:gap-2 sm:p-3 sm:after:block xl:right-12 xl:bottom-12"
      >
        <Image
          src="/images/hero-icon.png"
          width={48}
          height={48}
          alt=""
          className="size-6 sm:size-12"
        />
        <span className="block text-center text-[1.1rem] leading-[1.2] font-semibold tracking-[0.1em] uppercase sm:t-label">
          Book A Table
        </span>
      </a>
    </section>
  );
}
