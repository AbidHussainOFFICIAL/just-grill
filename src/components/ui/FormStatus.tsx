import clsx from "clsx";

export type FormState =
  { type: "idle" } | { type: "success"; message: string } | { type: "error"; message: string };

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
      className={clsx(
        "text-label-1 leading-[1.5em]",
        state.type === "error" ? "text-error" : "text-gold",
        className,
      )}
    >
      {state.message}
    </p>
  );
}
