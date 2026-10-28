import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { menuItems } from "@/data/menu";

export function Menu() {
  return (
    <section className="section" aria-label="menu" id="menu">
      <div className="container-x">
        <p className="section-subtitle text-center text-label-2">Special Selection</p>

        <h2 className="mb-40 text-center font-forum text-headline-1">Delicious Menu</h2>

        <ul className="mb-50 grid gap-40 md:grid-cols-[1fr_1fr] lg:relative lg:gap-x-90 lg:before:absolute lg:before:top-0 lg:before:left-1/2 lg:before:h-full lg:before:border-l lg:before:border-white-a20 xl:mb-55 xl:gap-x-200 xl:gap-y-55">
          {menuItems.map((item) => (
            <li key={item.id}>
              <div className="group flex items-start gap-20">
                <figure className="aspect-square shrink-0 overflow-hidden rounded-card bg-gold">
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    sizes="100px"
                    alt=""
                    className="size-full object-cover trans-base group-focus-within:scale-105 group-focus-within:opacity-70 group-hover:scale-105 group-hover:opacity-70"
                  />
                </figure>

                <div>
                  <div className="sm:flex sm:items-center sm:justify-start sm:gap-15">
                    <h3 className="font-forum text-title-3">
                      <a href="#" className="trans-fast hover:text-gold focus-visible:text-gold">
                        {item.title}
                      </a>
                    </h3>

                    {item.badge && (
                      <span className="mt-10 max-w-max bg-gold px-10 font-forum text-label-1 leading-[1.4em] text-eerie-black-1 uppercase sm:mt-0">
                        {item.badge}
                      </span>
                    )}

                    <span className="my-10 font-forum text-title-2 text-gold sm:relative sm:flex sm:grow sm:items-center sm:gap-15 sm:before:h-6 sm:before:grow sm:before:border-y sm:before:border-white-a20 xl:text-[2.5rem]">
                      {item.price}
                    </span>
                  </div>

                  <p className="text-label-1 leading-[1.6em] text-quick-silver">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="text-center">
          During winter daily from <span className="inline-block text-gold">7:00 pm</span> to{" "}
          <span className="inline-block text-gold">9:00 pm</span>
        </p>

        <Button href="#" className="mx-auto mt-26">
          View All Menu
        </Button>

        <Image
          src="/images/shape-5.png"
          width={921}
          height={1036}
          alt=""
          className="absolute top-0 left-0 -z-1 block w-[70%] max-w-max animate-move"
        />
        <Image
          src="/images/shape-6.png"
          width={343}
          height={345}
          alt=""
          className="absolute right-0 bottom-0 -z-1 block w-[70%] max-w-max animate-move"
        />
      </div>
    </section>
  );
}
