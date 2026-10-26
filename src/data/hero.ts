import type { HeroSlide } from "@/types";

const text = "Come with family & feel the joy of mouthwatering food";

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    subtitle: "Traditional & Hygiene",
    titleLines: ["For the love of", "delicious food"],
    text,
    image: "/images/hero-slider-1.jpg",
  },
  {
    id: 2,
    subtitle: "delightful experience",
    titleLines: ["Flavors Inspired by", "the Seasons"],
    text,
    image: "/images/hero-slider-2.jpg",
  },
  {
    id: 3,
    subtitle: "amazing & delicious",
    titleLines: ["Where every flavor", "tells a story"],
    text,
    image: "/images/hero-slider-3.jpg",
  },
];
