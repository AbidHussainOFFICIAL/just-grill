"use server";

import { yesterdayUTC } from "@/lib/date";
import { sendEmail } from "@/lib/email";
import { getReservationSchema, newsletterSchema } from "@/lib/validation";
import type { ActionResult } from "@/types";

const GENERIC_ERROR = "Please check the form and try again.";

export async function submitReservation(input: unknown): Promise<ActionResult> {
  const parsed = getReservationSchema(yesterdayUTC()).safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
  }

  const data = parsed.data;

  // Honeypot filled in: pretend everything worked, send nothing.
  if (data.website) return { ok: true };

  return sendEmail({
    subject: `New table reservation: ${data.name}`,
    text: [
      "New table reservation request",
      "",
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `People: ${data.person}`,
      `Date: ${data.date}`,
      `Time: ${data.time}`,
      `Message: ${data.message || "-"}`,
    ].join("\n"),
    failureMessage: "We couldn't send your request right now. Please call us to book.",
  });
}

export async function subscribeNewsletter(input: unknown): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
  }

  if (parsed.data.website) return { ok: true };

  return sendEmail({
    subject: "New newsletter subscriber",
    text: `New newsletter subscriber: ${parsed.data.email}`,
    failureMessage: "We couldn't subscribe you right now. Please try again later.",
  });
}
