import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { events } from "@/data/events";

export function Events() {
  return (
    <section className="section bg-smoky-black-2" aria-label="event">
      <div className="container-x sm:mx-auto sm:max-w-[420px] md:max-w-[820px] lg:max-w-none xl:max-w-[1200px]">
        <p className="section-subtitle text-center text-label-2">Recent Updates</p>

        <h2 className="mb-40 text-center font-forum text-headline-1">Upcoming Event</h2>

        <ul className="grid gap-40 md:grid-cols-[1fr_1fr] lg:grid-cols-[repeat(3,1fr)]">
          {events.map((event) => (
            <li
              key={event.id}
              className="md:last:col-[1/3] md:last:mx-auto md:last:w-[calc(50%-20px)] lg:last:col-auto lg:last:w-full"
            >
              <div className="group hover-shine relative z-1 overflow-hidden">
                <div className="relative aspect-[350/450] overflow-hidden bg-eerie-black-4">
                  <Image
                    src={event.image}
                    width={350}
                    height={450}
                    sizes="(min-width: 992px) 350px, 100vw"
                    alt=""
                    className="size-full object-cover trans-base group-focus-within:scale-105 group-hover:scale-105"
                  />

                  <time
                    className="absolute top-30 left-25 bg-black px-10 py-5 text-label-2 leading-[14px] font-bold tracking-s text-gold"
                    dateTime={event.datetime}
                  >
                    {event.displayDate}
                  </time>
                </div>

                <div className="absolute bottom-0 w-full bg-[linear-gradient(to_top,hsla(0,0%,0%,0.9),hsla(0,0%,0%,0.7),transparent)] px-35 pt-35 pb-25">
                  <p className="mb-5 text-center text-label-2 font-bold tracking-xl text-gold uppercase">
                    {event.subtitle}
                  </p>

                  <h3 className="text-center font-forum text-title-2 xl:text-[2.5rem]">
                    {event.title}
                  </h3>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Button href="#" className="mx-auto mt-40">
          View Our Blog
        </Button>
      </div>
    </section>
  );
}
