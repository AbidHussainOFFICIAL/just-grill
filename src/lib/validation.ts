import { z } from "zod";
import { personOptions, timeOptions } from "@/data/reservation";

const personValues = personOptions.map((option) => option.value) as [string, ...string[]];
const timeValues = timeOptions.map((option) => option.value) as [string, ...string[]];

/**
 * `minDate` (YYYY-MM-DD) is the earliest bookable day. The browser passes the
 * visitor's local "today"; the server passes yesterday (UTC) so time zones
 * can never reject a valid same-day booking.
 */
export const getReservationSchema = (minDate: string) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your name.")
      .max(80, "Your name is too long."),
    phone: z
      .string()
      .trim()
      .regex(/^[+()\d][\d\s()+-]{5,19}$/, "Please enter a valid phone number.")
      .refine((value) => value.replace(/\D/g, "").length >= 7, "Please enter a valid phone number."),
    person: z.enum(personValues, { message: "Please choose the number of people." }),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date.")
      .refine((value) => value >= minDate, "Please choose today or a future date."),
    time: z.enum(timeValues, { message: "Please choose a time." }),
    message: z.string().trim().max(500, "Your message is too long (500 characters max)."),
    /** Honeypot: real visitors never see or fill this. */
    website: z.string().optional(),
  });

export type ReservationInput = z.infer<ReturnType<typeof getReservationSchema>>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  /** Honeypot, see above. */
  website: z.string().optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
