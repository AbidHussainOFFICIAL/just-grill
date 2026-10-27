"use client";

import clsx from "clsx";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { heroSlides } from "@/data/hero";
import { useHeroSlider } from "@/hooks/useHeroSlider";
import styles from "./Hero.module.css";

export function Hero() {
  const { current, next, prev, pause, resume } = useHeroSlider(heroSlides.length);

  const sliderButtonProps = {
    onMouseEnter: pause,
    onMouseLeave: resume,
    onFocus: pause,
    onBlur: resume,
  };

  return (
    <section className={clsx("text-center", styles.hero)} aria-label="home" id="home">
      <ul>
        {heroSlides.map((slide, index) => {
          const Heading = index === 0 ? "h1" : "h2";

          return (
            <li
              key={slide.id}
              className={clsx(styles.slideItem, index === current && styles.active)}
            >
              <div className={styles.slideBg}>
                <Image
                  src={slide.image}
                  width={1880}
                  height={950}
                  alt=""
                  sizes="100vw"
                  className="img-cover"
                  priority={index === 0}
                  loading={index === 0 ? undefined : "eager"}
                />
              </div>

              <p className={clsx("label-2 section-subtitle", styles.reveal, styles.subtitle)}>
                {slide.subtitle}
              </p>

              <Heading className={clsx("display-1", styles.reveal, styles.title)}>
                {slide.titleLines[0]} <br />
                {slide.titleLines[1]}
              </Heading>

              <p className={clsx("body-2", styles.reveal, styles.text)}>{slide.text}</p>

              <Button href="#menu" className={clsx(styles.reveal, styles.cta)}>
                View Our Menu
              </Button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        className={clsx(styles.sliderBtn, styles.prev)}
        aria-label="slide to previous"
        onClick={prev}
        {...sliderButtonProps}
      >
        <Icon name="chevron-back" />
      </button>

      <button
        type="button"
        className={clsx(styles.sliderBtn, styles.next)}
        aria-label="slide to next"
        onClick={next}
        {...sliderButtonProps}
      >
        <Icon name="chevron-forward" />
      </button>

      <a href="#reservation" className={clsx("has-after", styles.heroBtn)}>
        <Image src="/images/hero-icon.png" width={48} height={48} alt="booking icon" />
        <span className={clsx("label-2 text-center", styles.bookLabel)}>Book A Table</span>
      </a>
    </section>
  );
}
