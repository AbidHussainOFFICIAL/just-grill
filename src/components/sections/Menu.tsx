import clsx from "clsx";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { menuItems } from "@/data/menu";
import { aspect } from "@/lib/cssVars";
import styles from "./Menu.module.css";

export function Menu() {
  return (
    <section className={clsx("section", styles.menu)} aria-label="menu" id="menu">
      <div className="container">
        <p className="section-subtitle text-center label-2">Special Selection</p>

        <h2 className={clsx("headline-1 text-center", styles.title)}>Delicious Menu</h2>

        <ul className={clsx("grid-list", styles.grid)}>
          {menuItems.map((item) => (
            <li key={item.id}>
              <div className={styles.card}>
                <figure className={clsx("img-holder", styles.banner)} style={aspect(100, 100)}>
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    sizes="100px"
                    alt=""
                    className={clsx("img-cover", styles.image)}
                  />
                </figure>

                <div>
                  <div className={styles.titleWrapper}>
                    <h3 className="title-3">
                      <a href="#" className={styles.cardTitle}>
                        {item.title}
                      </a>
                    </h3>

                    {item.badge && (
                      <span className={clsx("label-1", styles.badge)}>{item.badge}</span>
                    )}

                    <span className={clsx("title-2", styles.price)}>{item.price}</span>
                  </div>

                  <p className={clsx("label-1", styles.description)}>{item.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className={clsx("text-center", styles.menuText)}>
          During winter daily from <span className={styles.highlight}>7:00 pm</span> to{" "}
          <span className={styles.highlight}>9:00 pm</span>
        </p>

        <Button href="#" className={styles.cta}>
          View All Menu
        </Button>

        <Image
          src="/images/shape-5.png"
          width={921}
          height={1036}
          alt=""
          className={clsx("shape move-anim", styles.shapeTop)}
        />
        <Image
          src="/images/shape-6.png"
          width={343}
          height={345}
          alt=""
          className={clsx("shape move-anim", styles.shapeBottom)}
        />
      </div>
    </section>
  );
}
