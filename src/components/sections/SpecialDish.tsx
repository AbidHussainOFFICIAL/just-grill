import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { specialDish } from "@/data/special-dish";

export function SpecialDish() {
  return (
    <section
      className="text-center lg:grid lg:grid-cols-[1fr_1fr] lg:text-left 2xl:relative"
      aria-labelledby="dish-label"
    >
      <div>
        <Image
          src={specialDish.image}
          width={940}
          height={900}
          sizes="(min-width: 992px) 50vw, 100vw"
          alt="special dish"
          className="size-full object-cover"
        />
      </div>

      {/* From 992px the text block is centred vertically next to the photo (no fixed padding). */}
      <div className="bg-surface-0 py-section lg:flex lg:flex-col lg:justify-center lg:pr-6 lg:pl-12 xl:pr-0 xl:pl-30">
        <div className="container-x lg:relative xl:mx-0 xl:max-w-narrow">
          <Image
            src="/images/badge-1.png"
            width={28}
            height={41}
            alt="badge"
            className="mx-auto mb-3 lg:absolute lg:top-3 lg:-left-10 lg:animate-move"
          />

          <p className="section-subtitle lg:after:mx-0" id="dish-label">
            Special Dish
          </p>

          <h2 className="t-heading">{specialDish.title}</h2>

          <p className="mt-4 mb-10">{specialDish.text}</p>

          <div className="mb-10 flex items-center justify-center gap-5 lg:justify-start">
            <del className="text-fg-faint line-through">{specialDish.oldPrice}</del>
            <span className="t-figure text-gold-400 tabular-nums">{specialDish.price}</span>
          </div>

          <Button href="#menu" className="mx-auto lg:mx-0">
            View All Menu
          </Button>
        </div>
      </div>

      <Image
        src="/images/shape-4.png"
        width={179}
        height={359}
        alt=""
        className="absolute z-behind hidden max-w-max 2xl:top-[45%] 2xl:right-0 2xl:z-raised 2xl:block"
      />
      <Image
        src="/images/shape-9.png"
        width={351}
        height={462}
        alt=""
        className="absolute z-behind hidden max-w-max 2xl:right-0 2xl:bottom-0 2xl:z-raised 2xl:block 2xl:w-max 2xl:translate-y-1/2"
      />
    </section>
  );
}
