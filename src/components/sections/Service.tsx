import clsx from "clsx";
import Image from "next/image";
import { services } from "@/data/services";
import { aspect } from "@/lib/cssVars";
import styles from "./Service.module.css";

export function Service() {
  return (
    <section
      className={clsx("section bg-black-10 text-center", styles.service)}
      aria-label="service"
    >
      <div className={clsx("container", styles.inner)}>
        <p className="section-subtitle label-2">Flavors For Royalty</p>

        <h2 className={clsx("headline-1", styles.title)}>We Offer Top Notch</h2>

        <p className={styles.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum
          has been the industrys standard dummy text ever.
        </p>

        <ul className={clsx("grid-list", styles.grid)}>
          {services.map((service) => (
            <li key={service.id}>
              <div className={styles.card}>
                <a
                  href={service.href}
                  className={clsx("has-before hover-shine", styles.bannerLink)}
                >
                  <figure className={clsx("img-holder", styles.banner)} style={aspect(285, 336)}>
                    <Image
                      src={service.image}
                      width={285}
                      height={336}
                      sizes="285px"
                      alt={service.title}
                      className="img-cover"
                    />
                  </figure>
                </a>

                <div>
                  <h3 className={clsx("title-4", styles.cardTitle)}>
                    <a href={service.href}>{service.title}</a>
                  </h3>

                  <a href={service.href} className="btn-text hover-underline label-2">
                    View Menu
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Image
          src="/images/shape-1.png"
          width={246}
          height={412}
          alt=""
          className={clsx("shape move-anim", styles.shape1)}
        />
        <Image
          src="/images/shape-2.png"
          width={343}
          height={345}
          alt=""
          className={clsx("shape move-anim", styles.shape2)}
        />
      </div>
    </section>
  );
}
