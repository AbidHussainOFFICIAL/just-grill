"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { submitReservation } from "@/app/actions";
import { Button } from "@/components/ui/Button";
import { FormStatus, type FormState } from "@/components/ui/FormStatus";
import { Icon } from "@/components/ui/Icon";
import { personOptions, timeOptions } from "@/data/reservation";
import { siteConfig } from "@/data/site";
import { localDateISO } from "@/lib/date";
import { getReservationSchema, type ReservationInput } from "@/lib/validation";
import styles from "./ReservationForm.module.css";

const defaultValues: ReservationInput = {
  name: "",
  phone: "",
  person: personOptions[0]?.value ?? "",
  date: "",
  time: timeOptions[0]?.value ?? "",
  message: "",
  website: "",
};

export function ReservationForm() {
  const { booking } = siteConfig.phones;
  const [status, setStatus] = useState<FormState>({ type: "idle" });

  const schema = useMemo(() => getReservationSchema(localDateISO()), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationInput>({ resolver: zodResolver(schema), defaultValues });

  const invalid = (field: keyof ReservationInput) => (errors[field] ? true : undefined);

  const onValid = async (values: ReservationInput) => {
    setStatus({ type: "idle" });

    try {
      const result = await submitReservation(values);

      if (result.ok) {
        reset();
        setStatus({
          type: "success",
          message: "Thank you! Your reservation request has been sent. We'll contact you to confirm.",
        });
      } else {
        setStatus({ type: "error", message: result.message });
      }
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    }
  };

  const onInvalid = (fieldErrors: FieldErrors<ReservationInput>) => {
    const first = Object.values(fieldErrors)[0];
    setStatus({
      type: "error",
      message: typeof first?.message === "string" ? first.message : "Please check the highlighted fields.",
    });
  };

  return (
    <form className={styles.left} onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
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
          placeholder="Your Name"
          aria-label="Your name"
          aria-invalid={invalid("name")}
          autoComplete="off"
          className="input-field"
          {...register("name")}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          aria-label="Phone number"
          aria-invalid={invalid("phone")}
          autoComplete="off"
          className="input-field"
          {...register("phone")}
        />
      </div>

      <div className={clsx(styles.inputWrapper, styles.threeCol)}>
        <div className="icon-wrapper">
          <Icon name="person-outline" />

          <select
            aria-label="Number of people"
            aria-invalid={invalid("person")}
            className="input-field"
            {...register("person")}
          >
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
            aria-label="Reservation date"
            aria-invalid={invalid("date")}
            className={clsx("input-field", styles.date)}
            {...register("date")}
          />

          <Icon name="chevron-down" />
        </div>

        <div className="icon-wrapper">
          <Icon name="time-outline" />

          <select
            aria-label="Reservation time"
            aria-invalid={invalid("time")}
            className="input-field"
            {...register("time")}
          >
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
        placeholder="Message"
        aria-label="Message"
        aria-invalid={invalid("message")}
        autoComplete="off"
        className={clsx("input-field", styles.message)}
        {...register("message")}
      />

      <div className="hp-field" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <FormStatus state={status} className={clsx("text-center", styles.status)} />

      <Button type="submit" variant="secondary" disabled={isSubmitting} className={styles.submit}>
        Book A Table
      </Button>
    </form>
  );
}
