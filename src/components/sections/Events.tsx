import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { events } from "@/data/events";

export function Events() {
  return (
    <section className="section bg-surface-0" aria-label="event">
      <div className="container-x sm:mx-auto sm:max-w-phone md:max-w-tablet lg:max-w-none xl:max-w-page">
        <p className="section-subtitle text-center">Recent Updates</p>

        <h2 className="mb-10 text-center t-heading">Upcoming Event</h2>

        <ul className="grid gap-10 md:grid-cols-[1fr_1fr] lg:grid-cols-[repeat(3,1fr)]">
          {events.map((event) => (
            <li
              key={event.id}
              className="md:last:col-[1/3] md:last:mx-auto md:last:w-[calc(50%-20px)] lg:last:col-auto lg:last:w-full"
            >
              <div className="group hover-shine relative z-raised overflow-hidden">
                <div className="relative aspect-[350/450] overflow-hidden bg-surface-3">
                  <Image
                    src={event.image}
                    width={350}
                    height={450}
                    sizes="(min-width: 992px) 350px, 100vw"
                    alt=""
                    className="size-full object-cover trans-base group-focus-within:scale-105 group-hover:scale-105"
                  />

                  <time
                    className="absolute top-8 left-6 bg-surface-0 px-3 py-1 t-label text-gold-400"
                    dateTime={event.datetime}
                  >
                    {event.displayDate}
                  </time>
                </div>

                <div className="caption-scrim absolute bottom-0 w-full px-8 pt-8 pb-6">
                  <p className="mb-1 text-center t-overline text-gold-400">{event.subtitle}</p>

                  <h3 className="text-center t-item-title">{event.title}</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Button href="#" className="mx-auto mt-10">
          View Our Blog
        </Button>
      </div>
    </section>
  );
}
