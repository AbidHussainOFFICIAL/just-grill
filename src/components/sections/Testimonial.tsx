import clsx from "clsx";
import Image from "next/image";
import { testimonial } from "@/data/testimonial";
import styles from "./Testimonial.module.css";

export function Testimonial() {
  return (
    <section
      className={clsx("section text-center has-bg-image", styles.testi)}
      aria-label="testimonials"
    >
      <div className="container">
        <div className={styles.quote} aria-hidden="true">
          ”
        </div>

        <p className={clsx("headline-2", styles.text)}>{testimonial.quote}</p>

        <div className={styles.dots} aria-hidden="true">
          <div className={clsx("separator", styles.dot)} />
          <div className={clsx("separator", styles.dot)} />
          <div className={clsx("separator", styles.dot)} />
        </div>

        <div className={styles.profile}>
          <Image
            src={testimonial.avatar}
            width={100}
            height={100}
            alt={testimonial.name}
            className={styles.avatar}
          />

          <p className={clsx("label-2", styles.name)}>{testimonial.name}</p>
        </div>
      </div>
    </section>
  );
}
