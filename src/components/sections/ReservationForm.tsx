"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { FormStatus, type FormState } from "@/components/ui/FormStatus";
import { Icon } from "@/components/ui/Icon";
import { personOptions, timeOptions } from "@/data/reservation";
import { siteConfig } from "@/data/site";
import { localDateISO } from "@/lib/date";
import { simulateRequest } from "@/lib/demo";
import { getReservationSchema, type ReservationInput } from "@/lib/validation";

const defaultValues: ReservationInput = {
  name: "",
  phone: "",
  person: personOptions[0]?.value ?? "",
  date: "",
  time: timeOptions[0]?.value ?? "",
  message: "",
};

/** Demo form: it validates everything, but nothing is sent anywhere. */
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

  const onValid = async () => {
    setStatus({ type: "idle" });
    await simulateRequest();
    reset();
    setStatus({
      type: "success",
      message: "Thank you! This is a demo site, so your reservation request was not actually sent.",
    });
  };

  const onInvalid = (fieldErrors: FieldErrors<ReservationInput>) => {
    const first = Object.values(fieldErrors)[0];
    setStatus({
      type: "error",
      message:
        typeof first?.message === "string" ? first.message : "Please check the highlighted fields.",
    });
  };

  return (
    <form
      className="px-5 pt-10 pb-8 xl:px-16 xl:pt-18 xl:pb-18"
      onSubmit={handleSubmit(onValid, onInvalid)}
      noValidate
    >
      <h2 className="text-center t-heading">Online Reservation</h2>

      <p className="mb-10 text-center">
        Booking request{" "}
        <a href={booking.href} className="link-inline">
          {booking.label}
        </a>{" "}
        or fill out the order form
      </p>

      <div className="md:grid md:grid-cols-[1fr_1fr] md:gap-x-5">
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

      <div className="md:grid md:grid-cols-[repeat(3,1fr)] md:gap-x-5">
        <div className="icon-wrapper">
          <Icon name="user" size={16} />

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

          <Icon name="chevron-down" size={16} />
        </div>

        <div className="icon-wrapper">
          <Icon name="calendar" size={16} />

          <input
            type="date"
            aria-label="Reservation date"
            aria-invalid={invalid("date")}
            className="input-field uppercase [&::-webkit-calendar-picker-indicator]:opacity-0"
            {...register("date")}
          />

          <Icon name="chevron-down" size={16} />
        </div>

        <div className="icon-wrapper">
          <Icon name="clock" size={16} />

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

          <Icon name="chevron-down" size={16} />
        </div>
      </div>

      <textarea
        placeholder="Message"
        aria-label="Message"
        aria-invalid={invalid("message")}
        autoComplete="off"
        className="input-field h-36 resize-none py-5"
        {...register("message")}
      />

      <FormStatus state={status} className="mb-5" />

      <Button
        type="submit"
        variant="secondary"
        disabled={isSubmitting}
        className="w-full max-w-full"
      >
        Book A Table
      </Button>
    </form>
  );
}
