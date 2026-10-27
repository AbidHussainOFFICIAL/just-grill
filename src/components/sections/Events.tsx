import clsx from "clsx";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { events } from "@/data/events";
import { aspect } from "@/lib/cssVars";
import styles from "./Events.module.css";

export function Events() {
  return (
    <section className={clsx("section bg-black-10", styles.event)} aria-label="event">
      <div className={clsx("container", styles.inner)}>
        <p className="section-subtitle label-2 text-center">Recent Updates</p>

        <h2 className={clsx("headline-1 text-center", styles.title)}>Upcoming Event</h2>

        <ul className={clsx("grid-list", styles.grid)}>
          {events.map((event) => (
            <li key={event.id}>
              <div className={clsx("has-before hover-shine", styles.card)}>
                <div className={clsx("img-holder", styles.banner)} style={aspect(350, 450)}>
                  <Image
                    src={event.image}
                    width={350}
                    height={450}
                    sizes="(min-width: 992px) 350px, 100vw"
                    alt=""
                    className={clsx("img-cover", styles.image)}
                  />

                  <time className={clsx("label-2", styles.date)} dateTime={event.datetime}>
                    {event.displayDate}
                  </time>
                </div>

                <div className={styles.content}>
                  <p className={clsx("label-2 text-center", styles.subtitle)}>{event.subtitle}</p>

                  <h3 className="title-2 text-center">{event.title}</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Button href="#" className={styles.cta}>
          View Our Blog
        </Button>
      </div>
    </section>
  );
}
