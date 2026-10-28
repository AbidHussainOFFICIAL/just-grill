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

      <div className="bg-smoky-black-2 py-70 lg:pr-25 lg:pl-50 xl:py-225 xl:pr-0 xl:pl-120">
        <div className="container-x lg:relative xl:mx-0 xl:max-w-[460px]">
          <Image
            src="/images/badge-1.png"
            width={28}
            height={41}
            alt="badge"
            className="mx-auto mb-12 lg:absolute lg:top-10 lg:-left-40 lg:animate-move"
          />

          <p className="section-subtitle text-label-2 lg:after:mx-0" id="dish-label">
            Special Dish
          </p>

          <h2 className="font-forum text-headline-1">{specialDish.title}</h2>

          <p className="mt-16 mb-40">{specialDish.text}</p>

          <div className="mb-40 flex items-center justify-center gap-20 lg:justify-start">
            <del className="text-body-3 text-davys-grey no-underline">{specialDish.oldPrice}</del>
            <span className="text-body-1 text-gold">{specialDish.price}</span>
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
        className="absolute -z-1 hidden max-w-max 2xl:top-[45%] 2xl:right-0 2xl:z-1 2xl:block"
      />
      <Image
        src="/images/shape-9.png"
        width={351}
        height={462}
        alt=""
        className="absolute -z-1 hidden max-w-max 2xl:right-0 2xl:bottom-0 2xl:z-1 2xl:block 2xl:w-max 2xl:translate-y-1/2"
      />
    </section>
  );
}
