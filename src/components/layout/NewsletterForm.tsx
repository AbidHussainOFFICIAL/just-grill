"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { subscribeNewsletter } from "@/app/actions";
import { Button } from "@/components/ui/Button";
import { FormStatus, type FormState } from "@/components/ui/FormStatus";
import { Icon } from "@/components/ui/Icon";
import { newsletterSchema, type NewsletterInput } from "@/lib/validation";
import styles from "./NewsletterForm.module.css";

export function NewsletterForm() {
  const [status, setStatus] = useState<FormState>({ type: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", website: "" },
  });

  const onValid = async (values: NewsletterInput) => {
    setStatus({ type: "idle" });

    try {
      const result = await subscribeNewsletter(values);

      if (result.ok) {
        reset();
        setStatus({ type: "success", message: "Thanks for subscribing!" });
      } else {
        setStatus({ type: "error", message: result.message });
      }
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    }
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
      <form className={styles.form} onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
        <div className={clsx("icon-wrapper", styles.iconWrapper)}>
          <Icon name="mail-outline" />

          <input
            type="email"
            placeholder="Your email"
            aria-label="Your email"
            aria-invalid={errors.email ? true : undefined}
            autoComplete="off"
            className={clsx("input-field", styles.field)}
            {...register("email")}
          />
        </div>

        <div className="hp-field" aria-hidden="true">
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <Button type="submit" variant="secondary" disabled={isSubmitting} className={styles.submit}>
          Subscribe
        </Button>
      </form>

      <FormStatus state={status} className={styles.status} />
    </>
  );
}
