import Image from "next/image";
import { services } from "@/data/services";

// The decorative pattern behind each photo flips when the card is hovered or focused.
const patternBehind =
  "before:absolute before:top-0 before:left-1/2 before:-z-1 before:h-full before:w-140 before:bg-[url('/images/img-pattern.svg')] before:bg-cover before:bg-center before:bg-repeat before:will-change-transform before:[transform:translateX(-50%)] before:trans-base before:delay-0 group-hover/card:before:delay-300 group-hover/card:before:[transform:rotateY(0.5turn)_translateX(50%)] group-focus-within/card:before:delay-300 group-focus-within/card:before:[transform:rotateY(0.5turn)_translateX(50%)]";

export function Service() {
  return (
    <section className="section bg-smoky-black-2 text-center" aria-label="service">
      <div className="container-x sm:mx-auto sm:max-w-[420px] md:max-w-[820px] lg:max-w-none xl:max-w-[1200px]">
        <p className="section-subtitle text-label-2">Flavors For Royalty</p>

        <h2 className="mb-16 font-forum text-headline-1">We Offer Top Notch</h2>

        <p className="mb-40 sm:mx-auto sm:max-w-[420px] xl:mb-75">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has
          been the industrys standard dummy text ever.
        </p>

        <ul className="grid gap-40 md:grid-cols-[1fr_1fr] lg:grid-cols-[repeat(3,1fr)] xl:gap-150">
          {services.map((service) => (
            <li
              key={service.id}
              className="md:last:col-[1/3] md:last:mx-auto md:last:w-[calc(50%-20px)] lg:last:col-auto lg:last:w-full xl:odd:-translate-y-160"
            >
              <div className="group/card overflow-hidden">
                <a
                  href={service.href}
                  className={`hover-shine relative z-1 mb-26 py-30 ${patternBehind}`}
                >
                  <figure className="aspect-[285/336] overflow-hidden bg-eerie-black-4 trans-base group-focus-within/card:scale-105 group-hover/card:scale-105">
                    <Image
                      src={service.image}
                      width={285}
                      height={336}
                      sizes="285px"
                      alt={service.title}
                      className="size-full object-cover"
                    />
                  </figure>
                </a>

                <div>
                  <h3 className="mb-12 font-forum text-title-4">
                    <a href={service.href}>{service.title}</a>
                  </h3>

                  <a
                    href={service.href}
                    className="hover-underline mx-auto pb-4 text-label-2 font-bold tracking-m text-gold uppercase trans-fast hover:text-white focus-visible:text-white"
                  >
                    View Menu
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Image
          src="/images/shape-1.png"
          width={246}
          height={412}
          alt=""
          className="absolute bottom-0 left-0 -z-1 hidden max-w-max animate-move lg:block"
        />
        <Image
          src="/images/shape-2.png"
          width={343}
          height={345}
          alt=""
          className="absolute top-0 right-0 -z-1 hidden max-w-max animate-move lg:block"
        />
      </div>
    </section>
  );
}
