import clsx from "clsx";
import Image from "next/image";
import { features } from "@/data/features";
import styles from "./Features.module.css";

export function Features() {
  return (
    <section className={clsx("section text-center", styles.features)} aria-label="features">
      <div className="container">
        <p className="section-subtitle label-2">Why Choose Us</p>

        <h2 className={clsx("headline-1", styles.title)}>Our Strength</h2>

        <ul className={clsx("grid-list", styles.grid)}>
          {features.map((feature) => (
            <li key={feature.id} className={styles.item}>
              <div className={styles.card}>
                <div className={styles.icon}>
                  <Image src={feature.icon} width={100} height={80} alt="" />
                </div>

                <h3 className={clsx("title-2", styles.cardTitle)}>{feature.title}</h3>

                <p className={clsx("label-1", styles.cardText)}>{feature.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <Image
          src="/images/shape-7.png"
          width={208}
          height={178}
          alt=""
          className={clsx("shape", styles.shape1)}
        />
        <Image
          src="/images/shape-8.png"
          width={120}
          height={115}
          alt=""
          className={clsx("shape", styles.shape2)}
        />
      </div>
    </section>
  );
}
