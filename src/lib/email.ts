import { Resend } from "resend";
import type { ActionResult } from "@/types";

interface SendEmailOptions {
  subject: string;
  text: string;
  /** Shown to the visitor if sending fails. */
  failureMessage: string;
}

/**
 * Sends a notification email through Resend.
 *
 * Needs RESEND_API_KEY, BOOKING_TO_EMAIL and BOOKING_FROM_EMAIL (see .env.example).
 * - In development, a missing configuration just logs the message.
 * - In production, a missing configuration is reported as a failure so a
 *   booking is never silently lost.
 */
export async function sendEmail({ subject, text, failureMessage }: SendEmailOptions): Promise<ActionResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  const from = process.env.BOOKING_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[email not configured] ${subject}\n${text}`);
      return { ok: true };
    }

    console.error("Email is not configured: set RESEND_API_KEY, BOOKING_TO_EMAIL and BOOKING_FROM_EMAIL.");
    return { ok: false, message: failureMessage };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from, to, subject, text });

    if (error) {
      console.error("Resend error:", error);
      return { ok: false, message: failureMessage };
    }

    return { ok: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { ok: false, message: failureMessage };
  }
}
