import clsx from "clsx";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { AboutBanner } from "./AboutBanner";
import styles from "./About.module.css";

export function About() {
  const { story } = siteConfig.phones;

  return (
    <section
      className={clsx("section text-center", styles.about)}
      aria-labelledby="about-label"
      id="about"
    >
      <div className={clsx("container", styles.inner)}>
        <div className={styles.content}>
          <p className="label-2 section-subtitle" id="about-label">
            Our Story
          </p>

          <h2 className="headline-1">Every Flavor Tells a Story</h2>

          <p className={styles.text}>
            Lorem Ipsum is simply dummy text of the printingand typesetting industry lorem Ipsum
            has been the industrys standard dummy text ever since the when an unknown printer
            took a galley of type and scrambled it to make a type specimen book It has survived
            not only five centuries, but also the leap into.
          </p>

          <div className="contact-label">Book Through Call</div>

          <a href={story.href} className={clsx("body-1 contact-number hover-underline", styles.phone)}>
            {story.label}
          </a>

          <Button href="#" className={styles.readMore}>
            Read More
          </Button>
        </div>

        <AboutBanner />

        <Image
          src="/images/shape-3.png"
          width={197}
          height={194}
          alt=""
          className={clsx("shape", styles.shape)}
        />
      </div>
    </section>
  );
}
