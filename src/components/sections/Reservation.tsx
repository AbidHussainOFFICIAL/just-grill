import clsx from "clsx";
import { siteConfig } from "@/data/site";
import { ReservationForm } from "./ReservationForm";
import styles from "./Reservation.module.css";

export function Reservation() {
  const { address, phones, hours } = siteConfig;

  return (
    <section id="reservation">
      <div className="container">
        <div className={clsx("bg-black-10", styles.layout)}>
          <ReservationForm />

          <div className={clsx("text-center", styles.right)}>
            <h2 className={clsx("headline-1 text-center", styles.title)}>Contact Us</h2>

            <p className={clsx("contact-label", styles.label)}>Booking Request</p>

            <a href={phones.booking.href} className="body-1 contact-number hover-underline">
              {phones.booking.label}
            </a>

            <div className={clsx("separator", styles.divider)} />

            <p className={clsx("contact-label", styles.label)}>Location</p>

            <address className={clsx("body-4", styles.info)}>
              {address.lines[0]} <br />
              {address.lines[1]}
            </address>

            <p className={clsx("contact-label", styles.label)}>Lunch Time</p>

            <p className={clsx("body-4", styles.info)}>
              {hours.lunch.days} <br />
              {hours.lunch.time}
            </p>

            <p className={clsx("contact-label", styles.label)}>Dinner Time</p>

            <p className={clsx("body-4", styles.info)}>
              {hours.dinner.days} <br />
              {hours.dinner.time}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
