"use client";

import clsx from "clsx";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "./NewsletterForm.module.css";

/**
 * Markup and styling only for now. Validation and submission are added in the
 * forms phase.
 */
export function NewsletterForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={clsx("icon-wrapper", styles.iconWrapper)}>
        <Icon name="mail-outline" />

        <input
          type="email"
          name="email_address"
          placeholder="Your email"
          autoComplete="off"
          className={clsx("input-field", styles.field)}
        />
      </div>

      <Button type="submit" variant="secondary" className={styles.submit}>
        Subscribe
      </Button>
    </form>
  );
}
