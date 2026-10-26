import clsx from "clsx";
import styles from "./Button.module.css";

interface BaseProps {
  /** "primary" is the outlined gold button, "secondary" is the filled one. */
  variant?: "primary" | "secondary";
  /** Layout overrides from the parent section (margins, display, position). */
  className?: string;
  children: string;
}

interface LinkProps extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
}

interface ButtonProps extends BaseProps {
  href?: never;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export type Props = LinkProps | ButtonProps;

/**
 * The hover effect swaps two copies of the label, so the label is rendered
 * twice (the second one hidden from assistive tech).
 */
export function Button(props: Props) {
  const { variant = "primary", className, children } = props;
  const classes = clsx(styles.btn, variant === "secondary" && styles.secondary, className);

  const content = (
    <>
      <span className={clsx(styles.text, styles.text1)}>{children}</span>
      <span className={clsx(styles.text, styles.text2)} aria-hidden="true">
        {children}
      </span>
    </>
  );

  if (props.href !== undefined) {
    return (
      <a href={props.href} target={props.target} rel={props.rel} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      className={classes}
    >
      {content}
    </button>
  );
}
