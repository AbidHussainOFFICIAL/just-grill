import clsx from "clsx";
import { Icon, type IconName } from "./Icon";

export type FormState =
  | { type: "idle" }
  | { type: "success"; message: string }
  | { type: "warning"; message: string }
  | { type: "error"; message: string }
  | { type: "info"; message: string };

type Tone = Exclude<FormState["type"], "idle">;

interface FormStatusProps {
  state: FormState;
  /** Spacing and width come from the parent form. */
  className?: string;
}

/** Status tokens from the colour kit: tinted fill, border, text and icon colour, plus an icon. */
const tones: Record<
  Tone,
  { icon: IconName; box: string; iconColor: string; role: "status" | "alert" }
> = {
  success: {
    icon: "check",
    box: "border-success-border bg-success-tint text-success-text",
    iconColor: "text-success-solid",
    role: "status",
  },
  warning: {
    icon: "alert",
    box: "border-warning-border bg-warning-tint text-warning-text",
    iconColor: "text-warning-solid",
    role: "status",
  },
  error: {
    icon: "error",
    box: "border-error-border bg-error-tint text-error-text",
    iconColor: "text-error-solid",
    role: "alert",
  },
  info: {
    icon: "info",
    box: "border-info-border bg-info-tint text-info-text",
    iconColor: "text-info-solid",
    role: "status",
  },
};

/** Always icon plus words: colour alone fails some viewers. */
export function FormStatus({ state, className }: FormStatusProps) {
  if (state.type === "idle") return null;

  const tone = tones[state.type];

  return (
    <p
      role={tone.role}
      className={clsx(
        "flex items-start gap-3 border px-3 py-2 text-left t-small",
        tone.box,
        className,
      )}
    >
      <Icon name={tone.icon} size={20} className={clsx("mt-0.5 shrink-0", tone.iconColor)} />
      <span>{state.message}</span>
    </p>
  );
}
