import clsx from "clsx";
import styles from "./FormStatus.module.css";

export type FormState =
  | { type: "idle" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

interface FormStatusProps {
  state: FormState;
  /** Spacing and alignment come from the parent form. */
  className?: string;
}

export function FormStatus({ state, className }: FormStatusProps) {
  if (state.type === "idle") return null;

  return (
    <p
      role={state.type === "error" ? "alert" : "status"}
      className={clsx("label-1", styles.status, state.type === "error" ? styles.error : styles.success, className)}
    >
      {state.message}
    </p>
  );
}
