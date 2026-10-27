"use client";

import clsx from "clsx";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { personOptions, timeOptions } from "@/data/reservation";
import { siteConfig } from "@/data/site";
import styles from "./ReservationForm.module.css";

/**
 * Markup and styling only for now. Validation and submission are added in the
 * forms phase.
 */
export function ReservationForm() {
  const { booking } = siteConfig.phones;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={styles.left} onSubmit={handleSubmit}>
      <h2 className="headline-1 text-center">Online Reservation</h2>

      <p className={clsx("text-center", styles.text)}>
        Booking request{" "}
        <a href={booking.href} className={styles.link}>
          {booking.label}
        </a>{" "}
        or fill out the order form
      </p>

      <div className={styles.inputWrapper}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          aria-label="Your name"
          autoComplete="off"
          className="input-field"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          aria-label="Phone number"
          autoComplete="off"
          className="input-field"
        />
      </div>

      <div className={clsx(styles.inputWrapper, styles.threeCol)}>
        <div className="icon-wrapper">
          <Icon name="person-outline" />

          <select name="person" aria-label="Number of people" className="input-field">
            {personOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <Icon name="chevron-down" />
        </div>

        <div className={clsx("icon-wrapper", styles.dateWrapper)}>
          <Icon name="calendar-clear-outline" />

          <input
            type="date"
            name="reservation-date"
            aria-label="Reservation date"
            className={clsx("input-field", styles.date)}
          />

          <Icon name="chevron-down" />
        </div>

        <div className="icon-wrapper">
          <Icon name="time-outline" />

          <select name="time" aria-label="Reservation time" className="input-field">
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <Icon name="chevron-down" />
        </div>
      </div>

      <textarea
        name="message"
        placeholder="Message"
        aria-label="Message"
        autoComplete="off"
        className={clsx("input-field", styles.message)}
      />

      <Button type="submit" variant="secondary" className={styles.submit}>
        Book A Table
      </Button>
    </form>
  );
}
