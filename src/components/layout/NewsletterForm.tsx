"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { FormStatus, type FormState } from "@/components/ui/FormStatus";
import { Icon } from "@/components/ui/Icon";
import { simulateRequest } from "@/lib/demo";
import { newsletterSchema, type NewsletterInput } from "@/lib/validation";

/** Demo form: it validates the email, but nothing is sent anywhere. */
export function NewsletterForm() {
  const [status, setStatus] = useState<FormState>({ type: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onValid = async () => {
    setStatus({ type: "idle" });
    await simulateRequest();
    reset();
    setStatus({
      type: "success",
      message: "Thanks! This is a demo site, so nothing was actually subscribed.",
    });
  };

  const onInvalid = (fieldErrors: FieldErrors<NewsletterInput>) => {
    const message = fieldErrors.email?.message;
    setStatus({
      type: "error",
      message: typeof message === "string" ? message : "Please enter a valid email address.",
    });
  };

  return (
    <>
      <form className="sm:relative" onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
        <div className="icon-wrapper">
          <Icon name="mail-outline" />

          <input
            type="email"
            placeholder="Your email"
            aria-label="Your email"
            aria-invalid={errors.email ? true : undefined}
            autoComplete="off"
            className="input-field cursor-text sm:pr-205"
            {...register("email")}
          />
        </div>

        <Button
          type="submit"
          variant="secondary"
          disabled={isSubmitting}
          className="min-w-full sm:absolute sm:inset-y-0 sm:right-0 sm:min-w-max"
        >
          Subscribe
        </Button>
      </form>

      <FormStatus state={status} className="mt-12" />
    </>
  );
}
