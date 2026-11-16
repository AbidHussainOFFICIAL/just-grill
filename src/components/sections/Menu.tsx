import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { menuItems } from "@/data/menu";

export function Menu() {
  return (
    <section className="section" aria-label="menu" id="menu">
      <div className="container-x">
        <p className="section-subtitle text-center">Special Selection</p>

        <h2 className="mb-10 text-center t-heading">Delicious Menu</h2>

        <ul className="mb-12 grid gap-10 md:grid-cols-[1fr_1fr] lg:relative lg:gap-x-24 lg:before:absolute lg:before:top-0 lg:before:left-1/2 lg:before:h-full lg:before:border-l lg:before:border-line-subtle xl:mb-14 xl:gap-x-50 xl:gap-y-14">
          {menuItems.map((item) => (
            <li key={item.id}>
              <div className="group flex items-start gap-5">
                <figure className="aspect-square shrink-0 overflow-hidden rounded-card bg-gold-400">
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
                  <div className="sm:flex sm:items-center sm:justify-start sm:gap-4">
                    <h3 className="t-item-title">
                      <a
                        href="#"
                        className="trans-fast hover:text-gold-400 focus-visible:text-gold-400"
                      >
                        {item.title}
                      </a>
                    </h3>

                    {item.badge && (
                      <span className="mt-3 max-w-max bg-gold-400 px-3 t-label text-surface-0 sm:mt-0">
                        {item.badge}
                      </span>
                    )}

                    <span className="my-3 t-item-title text-gold-400 tabular-nums sm:relative sm:flex sm:grow sm:items-center sm:gap-4 sm:before:h-2 sm:before:grow sm:before:border-y sm:before:border-line-subtle">
                      {item.price}
                    </span>
                  </div>

                  <p className="t-small text-fg-muted">{item.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="text-center">
          During winter daily from <span className="inline-block text-gold-400">7:00 pm</span> to{" "}
          <span className="inline-block text-gold-400">9:00 pm</span>
        </p>

        <Button href="#" className="mx-auto mt-6">
          View All Menu
        </Button>

        <Image
          src="/images/shape-5.png"
          width={921}
          height={1036}
          alt=""
          className="absolute top-0 left-0 z-behind block w-[70%] max-w-max animate-move"
        />
        <Image
          src="/images/shape-6.png"
          width={343}
          height={345}
          alt=""
          className="absolute right-0 bottom-0 z-behind block w-[70%] max-w-max animate-move"
        />
      </div>
    </section>
  );
}
