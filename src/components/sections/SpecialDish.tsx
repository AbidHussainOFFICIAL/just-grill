import clsx from "clsx";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { specialDish } from "@/data/special-dish";
import styles from "./SpecialDish.module.css";

export function SpecialDish() {
  return (
    <section className={styles.special} aria-labelledby="dish-label">
      <div>
        <Image
          src={specialDish.image}
          width={940}
          height={900}
          sizes="(min-width: 992px) 50vw, 100vw"
          alt="special dish"
          className="img-cover"
        />
      </div>

      <div className={clsx("bg-black-10", styles.content)}>
        <div className={clsx("container", styles.inner)}>
          <Image
            src="/images/badge-1.png"
            width={28}
            height={41}
            alt="badge"
            className={styles.badge}
          />

          <p className="section-subtitle label-2" id="dish-label">
            Special Dish
          </p>

          <h2 className="headline-1">{specialDish.title}</h2>

          <p className={styles.text}>{specialDish.text}</p>

          <div className={styles.prices}>
            <del className={clsx("body-3", styles.oldPrice)}>{specialDish.oldPrice}</del>
            <span className={clsx("body-1", styles.price)}>{specialDish.price}</span>
          </div>

          <Button href="#menu" className={styles.cta}>
            View All Menu
          </Button>
        </div>
      </div>

      <Image
        src="/images/shape-4.png"
        width={179}
        height={359}
        alt=""
        className={clsx("shape", styles.shape1)}
      />
      <Image
        src="/images/shape-9.png"
        width={351}
        height={462}
        alt=""
        className={clsx("shape", styles.shape2)}
      />
    </section>
  );
}
